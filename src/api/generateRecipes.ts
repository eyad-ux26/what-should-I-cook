import type { CookPreferences, RecipeResult } from "../types";

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
