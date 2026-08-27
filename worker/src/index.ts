export interface Env {
  MISTRAL_API_KEY: string;
}

type TimeBudget = "any" | "15" | "30" | "60";
type DietTag = "vegetarian" | "vegan" | "gluten-free" | "dairy-free";
type Difficulty = "easy" | "medium" | "hard";

interface CookPreferences {
  ingredients: string[];
  timeBudget: TimeBudget;
  diet: DietTag[];
  craving: string;
}

interface RecipeResult {
  id: string;
  title: string;
  hook: string;
  timeMinutes: number;
  difficulty: Difficulty;
  matchedIngredients: string[];
  extraIngredients: string[];
  steps: string[];
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

function buildPrompt(prefs: CookPreferences): string {
  const parts = [
    `Ingredients available: ${prefs.ingredients.join(", ")}.`,
    `Time constraint: ${TIME_LABEL[prefs.timeBudget]}.`,
  ];
  if (prefs.diet.length > 0) parts.push(`Dietary requirements: ${prefs.diet.join(", ")}.`);
  if (prefs.craving.trim()) parts.push(`Craving / mood: ${prefs.craving.trim()}.`);

  return `You are a helpful cooking assistant. Suggest exactly 3 distinct recipes using mainly the ingredients listed below. Prefer recipes that need few, if any, extra ingredients beyond common pantry staples (salt, pepper, oil, butter, garlic).

${parts.join("\n")}

Respond with ONLY a JSON object of this exact shape, no markdown, no commentary:
{
  "recipes": [
    {
      "title": "string, short and appetizing",
      "hook": "string, one enticing sentence about the dish",
      "timeMinutes": number,
      "difficulty": "easy" | "medium" | "hard",
      "matchedIngredients": ["ingredients from the provided list actually used"],
      "extraIngredients": ["any additional ingredients needed beyond the provided list and common staples"],
      "steps": ["step 1", "step 2", "..."]
    }
  ]
}`;
}

function normalizeRecipe(raw: unknown, index: number): RecipeResult | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.title !== "string" || typeof r.hook !== "string") return null;

  const difficulty: Difficulty =
    r.difficulty === "easy" || r.difficulty === "medium" || r.difficulty === "hard"
      ? r.difficulty
      : "medium";

  const toStringArray = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

  return {
    id: `${index}-${Date.now()}`,
    title: r.title,
    hook: r.hook,
    timeMinutes: typeof r.timeMinutes === "number" ? r.timeMinutes : 30,
    difficulty,
    matchedIngredients: toStringArray(r.matchedIngredients),
    extraIngredients: toStringArray(r.extraIngredients),
    steps: toStringArray(r.steps),
  };
}

async function generateRecipes(prefs: CookPreferences, apiKey: string): Promise<RecipeResult[]> {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "ministral-3b-2512",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: buildPrompt(prefs) }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Mistral API error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("No content in model response");

  const parsed = JSON.parse(content) as { recipes?: unknown[] };
  const recipes = Array.isArray(parsed.recipes) ? parsed.recipes : [];
  const normalized = recipes
    .map((r, i) => normalizeRecipe(r, i))
    .filter((r): r is RecipeResult => r !== null);

  if (normalized.length === 0) throw new Error("Model returned no usable recipes");
  return normalized;
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

    let prefs: CookPreferences;
    try {
      const body = (await request.json()) as Partial<CookPreferences>;
      if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) {
        return json({ error: "ingredients is required" }, 400, origin);
      }
      prefs = {
        ingredients: body.ingredients.filter((i): i is string => typeof i === "string"),
        timeBudget: (body.timeBudget as TimeBudget) ?? "any",
        diet: Array.isArray(body.diet) ? (body.diet as DietTag[]) : [],
        craving: typeof body.craving === "string" ? body.craving : "",
      };
    } catch {
      return json({ error: "Invalid JSON body" }, 400, origin);
    }

    try {
      const recipes = await generateRecipes(prefs, env.MISTRAL_API_KEY);
      return json(recipes, 200, origin);
    } catch (err) {
      console.error(err);
      return json({ error: "Failed to generate recipes" }, 502, origin);
    }
  },
};
