import type { CookPreferences, RecipeResult, RecipeStep, RecipeSummary } from "../types";

const API_URL = "https://what-should-i-cook-api.what-should-i-cook-api.workers.dev";

export async function generateRecipes(prefs: CookPreferences): Promise<RecipeResult[]> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prefs),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = (await response.json()) as RecipeResult[];
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No recipes returned");
  }
  return data;
}

export async function generateRecipeDetails(
  prefs: CookPreferences,
  recipe: RecipeSummary,
): Promise<RecipeStep[]> {
  const response = await fetch(`${API_URL}/details`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prefs, recipe }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { steps: RecipeStep[] };
  if (!Array.isArray(data.steps) || data.steps.length === 0) {
    throw new Error("No steps returned");
  }
  return data.steps;
}
