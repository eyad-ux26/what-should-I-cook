import type { CookPreferences, RecipeResult } from "../types";

const PANTRY_STAPLES = ["salt", "pepper", "olive oil", "garlic", "butter"];

const TEMPLATES: Array<{
  title: (main: string) => string;
  hook: string;
  difficulty: RecipeResult["difficulty"];
  time: number;
  extra: string[];
  steps: (main: string) => string[];
}> = [
  {
    title: (main) => `Garlic Butter ${cap(main)} Skillet`,
    hook: "A one-pan weeknight staple with a rich, savory finish.",
    difficulty: "easy",
    time: 20,
    extra: ["lemon", "fresh parsley"],
    steps: (main) => [
      `Pat the ${main} dry and season generously with salt and pepper.`,
      "Melt butter with garlic in a hot skillet until fragrant.",
      `Add the ${main} and sear until golden, turning once.`,
      "Finish with a squeeze of lemon and chopped parsley, then serve hot.",
    ],
  },
  {
    title: (main) => `${cap(main)} & Rice Bowl`,
    hook: "A comforting, balanced bowl you can customize as you go.",
    difficulty: "easy",
    time: 30,
    extra: ["rice", "soy sauce", "green onion"],
    steps: (main) => [
      "Cook rice according to package instructions.",
      `Season and cook the ${main} in a hot pan with a little oil until done through.`,
      "Slice or flake the cooked ingredient and arrange over the rice.",
      "Drizzle with soy sauce and top with sliced green onion.",
    ],
  },
  {
    title: (main) => `Roasted ${cap(main)} with Herbs`,
    hook: "Low-effort oven cooking that lets the flavors do the work.",
    difficulty: "medium",
    time: 40,
    extra: ["dried thyme", "onion"],
    steps: (main) => [
      "Preheat the oven to 400°F (200°C).",
      `Toss the ${main} with olive oil, salt, pepper, and thyme.`,
      "Spread in a single layer on a baking sheet with sliced onion.",
      "Roast until tender and lightly browned, about 25-30 minutes.",
    ],
  },
];

function cap(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function normalize(list: string[]): string[] {
  return Array.from(
    new Set(list.map((item) => item.trim().toLowerCase()).filter(Boolean)),
  );
}

/**
 * Placeholder for the real AI-generation call. Same shape/contract as the
 * eventual backend response so swapping it in later doesn't touch the UI.
 */
export async function generateRecipes(
  prefs: CookPreferences,
): Promise<RecipeResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 1400 + Math.random() * 600));

  const ingredients = normalize(prefs.ingredients);
  const main = ingredients[0] ?? "seasonal vegetables";
  const haveExtra = new Set([...ingredients, ...PANTRY_STAPLES]);

  return TEMPLATES.map((template, i) => {
    const extraIngredients = template.extra.filter((item) => !haveExtra.has(item));
    return {
      id: `${i}-${main}`,
      title: template.title(main),
      hook: template.hook,
      timeMinutes: template.time,
      difficulty: template.difficulty,
      matchedIngredients: ingredients.slice(0, 6),
      extraIngredients,
      steps: template.steps(main),
    };
  });
}
