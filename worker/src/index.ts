export interface Env {
  MISTRAL_API_KEY: string;
}

type TimeBudget = "any" | "15" | "30" | "60";
type DietTag = "vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "low-calorie";
type CuisineTag = "italian" | "asian" | "mexican" | "indian" | "middle-eastern" | "other";
type AllergyTag = "nuts" | "dairy" | "eggs" | "gluten" | "other";
type Difficulty = "easy" | "medium" | "hard";
type Language = "en" | "ar";

interface CookPreferences {
  ingredients: string[];
  timeBudget: TimeBudget;
  diet: DietTag[];
  cuisine: CuisineTag | null;
  customCuisine: string;
  allergies: AllergyTag[];
  customAllergy: string;
  craving: string;
  language: Language;
}

interface RecipeResult {
  id: string;
  title: string;
  hook: string;
  timeMinutes: number;
  difficulty: Difficulty;
  cuisine: string;
  matchedIngredients: string[];
  extraIngredients: string[];
}

interface RecipeStep {
  title: string;
  detail: string;
}

interface RecipeSummary {
  title: string;
  hook: string;
  cuisine: string;
  timeMinutes: number;
  difficulty: Difficulty;
  matchedIngredients: string[];
  extraIngredients: string[];
}

const ALLOWED_ORIGINS = new Set([
  "https://eyad-ux26.github.io",
  "http://localhost:5199",
  "http://localhost:5173",
]);

function corsHeaders(origin: string | null): Record<string, string> {
  const allowOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(data: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

const TIME_LABEL: Record<TimeBudget, string> = {
  any: "no particular time limit",
  "15": "ready in under 15 minutes",
  "30": "ready in under 30 minutes",
  "60": "ready in under 1 hour",
};

const ALLERGY_LABEL: Record<Exclude<AllergyTag, "other">, string> = {
  nuts: "nuts (including peanuts and tree nuts)",
  dairy: "milk and dairy products",
  eggs: "eggs",
  gluten: "wheat and gluten",
};

function languageInstruction(language: Language, fields: string): string {
  return language === "ar"
    ? `Write these fields in Modern Standard Arabic: ${fields}. Keep the "difficulty" field value as exactly one of the untranslated English words: easy, medium, hard.`
    : `Write these fields in English: ${fields}.`;
}

/** Preference/constraint lines shared by both the list and detail prompts. */
function buildConstraintLines(prefs: CookPreferences): string[] {
  const lines: string[] = [];

  const dietLabels = prefs.diet.filter((d) => d !== "low-calorie");
  if (dietLabels.length > 0) lines.push(`Dietary requirements: ${dietLabels.join(", ")}.`);
  if (prefs.diet.includes("low-calorie")) {
    lines.push(
      "Prefer relatively lower-calorie preparations (e.g. baking or grilling instead of deep-frying, lighter sauces/portions) without making medical or nutritional claims.",
    );
  }

  const cuisineText = prefs.cuisine === "other" ? prefs.customCuisine.trim() : prefs.cuisine;
  if (cuisineText) lines.push(`Preferred cuisine style: ${cuisineText}.`);

  if (prefs.craving.trim()) lines.push(`Craving / mood: ${prefs.craving.trim()}.`);

  const allergyTerms = [
    ...prefs.allergies.filter((a): a is Exclude<AllergyTag, "other"> => a !== "other").map((a) => ALLERGY_LABEL[a]),
    ...(prefs.allergies.includes("other") && prefs.customAllergy.trim() ? [prefs.customAllergy.trim()] : []),
  ];
  if (allergyTerms.length > 0) {
    lines.push(
      `STRICT ALLERGY EXCLUSIONS (non-negotiable, overrides every other instruction including "use the ingredients provided"): the user is allergic to ${allergyTerms.join(", ")}. Never include these, or any dish/sauce/garnish that hides or derives from them, in any recipe, ingredient list, or step — even if one of them happens to appear in the user's own ingredient list below. If an allergen is in the user's ingredient list, silently skip it and build the recipe from their other ingredients instead.`,
    );
  }

  return lines;
}

function buildListPrompt(prefs: CookPreferences): string {
  const parts = [
    `Ingredients available: ${prefs.ingredients.join(", ")}.`,
    `Time constraint: ${TIME_LABEL[prefs.timeBudget]}.`,
    ...buildConstraintLines(prefs),
  ];

  return `You are a helpful cooking assistant. Suggest exactly 3 distinct recipes using mainly the ingredients listed below. Prefer recipes that need few, if any, extra ingredients beyond common pantry staples (salt, pepper, oil, butter, garlic). Do NOT write step-by-step cooking instructions yet — only the summary fields below.

${parts.join("\n")}
${languageInstruction(prefs.language, "title, hook, cuisine, matchedIngredients, extraIngredients")}

Respond with ONLY a JSON object of this exact shape, no markdown, no commentary:
{
  "recipes": [
    {
      "title": "string, short and appetizing",
      "hook": "string, one enticing sentence about the dish",
      "timeMinutes": number,
      "difficulty": "easy" | "medium" | "hard",
      "cuisine": "short cuisine style label, e.g. Italian, Asian, Mexican, Indian, Middle Eastern, or Fusion",
      "matchedIngredients": ["ingredients from the provided list actually used, one per array item"],
      "extraIngredients": ["any additional ingredients needed beyond the provided list and common staples, one per array item — never combine several into one string"]
    }
  ]
}`;
}

function buildDetailPrompt(prefs: CookPreferences, recipe: RecipeSummary): string {
  const parts = [
    `Recipe: ${recipe.title}`,
    `Description: ${recipe.hook}`,
    `Cuisine: ${recipe.cuisine}`,
    `Difficulty: ${recipe.difficulty}, approx. ${recipe.timeMinutes} minutes.`,
    `Ingredients on hand: ${recipe.matchedIngredients.join(", ") || "none listed"}.`,
    `Additional ingredients needed: ${recipe.extraIngredients.join(", ") || "none"}.`,
    ...buildConstraintLines(prefs),
  ];

  return `You are a helpful cooking assistant. Write clear, concise step-by-step cooking instructions for the single recipe described below. Do not invent a different dish and do not introduce ingredients that conflict with the constraints.

${parts.join("\n")}
${languageInstruction(prefs.language, "each step's title and detail")}

Respond with ONLY a JSON object of this exact shape, no markdown, no commentary:
{
  "steps": [
    { "title": "short action phrase summarizing the step, e.g. Season the chicken", "detail": "one or two practical sentences for that step" }
  ]
}
Use between 4 and 7 steps.`;
}

async function callMistral(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Mistral API error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("No content in model response");
  return content;
}

const toStringArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

// Models sometimes bundle multiple ingredients into one comma-separated
// string instead of separate array items (e.g. "salt, pepper, oil") —
// split those back out so counts/badges in the UI stay accurate. Only
// applied to ingredient lists: step text legitimately contains commas.
const toIngredientArray = (v: unknown): string[] =>
  toStringArray(v)
    .flatMap((s) => s.split(","))
    .map((s) => s.trim())
    .filter(Boolean);

function normalizeRecipe(raw: unknown, index: number): RecipeResult | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.title !== "string" || typeof r.hook !== "string") return null;

  const difficulty: Difficulty =
    r.difficulty === "easy" || r.difficulty === "medium" || r.difficulty === "hard"
      ? r.difficulty
      : "medium";

  return {
    id: `${index}-${Date.now()}`,
    title: r.title,
    hook: r.hook,
    timeMinutes: typeof r.timeMinutes === "number" ? r.timeMinutes : 30,
    difficulty,
    cuisine: typeof r.cuisine === "string" && r.cuisine.trim() ? r.cuisine.trim() : "Fusion",
    matchedIngredients: toIngredientArray(r.matchedIngredients),
    extraIngredients: toIngredientArray(r.extraIngredients),
  };
}

function normalizeStep(raw: unknown): RecipeStep | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.title !== "string" || typeof r.detail !== "string") return null;
  if (!r.title.trim() || !r.detail.trim()) return null;
  return { title: r.title.trim(), detail: r.detail.trim() };
}

function parsePrefs(body: Partial<CookPreferences>): CookPreferences | null {
  if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) return null;
  return {
    ingredients: body.ingredients.filter((i): i is string => typeof i === "string"),
    timeBudget: (body.timeBudget as TimeBudget) ?? "any",
    diet: Array.isArray(body.diet) ? (body.diet as DietTag[]) : [],
    cuisine: (body.cuisine as CuisineTag) ?? null,
    customCuisine: typeof body.customCuisine === "string" ? body.customCuisine : "",
    allergies: Array.isArray(body.allergies) ? (body.allergies as AllergyTag[]) : [],
    customAllergy: typeof body.customAllergy === "string" ? body.customAllergy : "",
    craving: typeof body.craving === "string" ? body.craving : "",
    language: body.language === "ar" ? "ar" : "en",
  };
}

async function handleList(request: Request, env: Env, origin: string | null): Promise<Response> {
  let prefs: CookPreferences;
  try {
    const body = (await request.json()) as Partial<CookPreferences>;
    const parsed = parsePrefs(body);
    if (!parsed) return json({ error: "ingredients is required" }, 400, origin);
    prefs = parsed;
  } catch {
    return json({ error: "Invalid JSON body" }, 400, origin);
  }

  try {
    const content = await callMistral(buildListPrompt(prefs), env.MISTRAL_API_KEY);
    const parsed = JSON.parse(content) as { recipes?: unknown[] };
    const recipes = Array.isArray(parsed.recipes) ? parsed.recipes : [];
    const normalized = recipes
      .map((r, i) => normalizeRecipe(r, i))
      .filter((r): r is RecipeResult => r !== null);

    if (normalized.length === 0) throw new Error("Model returned no usable recipes");
    return json(normalized, 200, origin);
  } catch (err) {
    console.error(err);
    return json({ error: "Failed to generate recipes" }, 502, origin);
  }
}

async function handleDetails(request: Request, env: Env, origin: string | null): Promise<Response> {
  let prefs: CookPreferences;
  let recipe: RecipeSummary;
  try {
    const body = (await request.json()) as { prefs?: Partial<CookPreferences>; recipe?: Partial<RecipeSummary> };
    const parsedPrefs = parsePrefs(body.prefs ?? {});
    if (!parsedPrefs) return json({ error: "prefs.ingredients is required" }, 400, origin);
    if (!body.recipe || typeof body.recipe.title !== "string" || typeof body.recipe.hook !== "string") {
      return json({ error: "recipe is required" }, 400, origin);
    }
    prefs = parsedPrefs;
    recipe = {
      title: body.recipe.title,
      hook: body.recipe.hook,
      cuisine: typeof body.recipe.cuisine === "string" ? body.recipe.cuisine : "Fusion",
      timeMinutes: typeof body.recipe.timeMinutes === "number" ? body.recipe.timeMinutes : 30,
      difficulty:
        body.recipe.difficulty === "easy" || body.recipe.difficulty === "medium" || body.recipe.difficulty === "hard"
          ? body.recipe.difficulty
          : "medium",
      matchedIngredients: Array.isArray(body.recipe.matchedIngredients) ? body.recipe.matchedIngredients : [],
      extraIngredients: Array.isArray(body.recipe.extraIngredients) ? body.recipe.extraIngredients : [],
    };
  } catch {
    return json({ error: "Invalid JSON body" }, 400, origin);
  }

  try {
    const content = await callMistral(buildDetailPrompt(prefs, recipe), env.MISTRAL_API_KEY);
    const parsed = JSON.parse(content) as { steps?: unknown[] };
    const steps = Array.isArray(parsed.steps) ? parsed.steps : [];
    const normalized = steps.map(normalizeStep).filter((s): s is RecipeStep => s !== null);

    if (normalized.length === 0) throw new Error("Model returned no usable steps");
    return json({ steps: normalized }, 200, origin);
  } catch (err) {
    console.error(err);
    return json({ error: "Failed to generate recipe details" }, 502, origin);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, origin);
    }

    const { pathname } = new URL(request.url);
    if (pathname === "/details") return handleDetails(request, env, origin);
    return handleList(request, env, origin);
  },
};
