export type TimeBudget = "any" | "15" | "30" | "60";

export type DietTag = "vegetarian" | "vegan" | "gluten-free" | "dairy-free";

export interface CookPreferences {
  ingredients: string[];
  timeBudget: TimeBudget;
  diet: DietTag[];
  craving: string;
}

export type Difficulty = "easy" | "medium" | "hard";

export interface RecipeResult {
  id: string;
  title: string;
  hook: string;
  timeMinutes: number;
  difficulty: Difficulty;
  matchedIngredients: string[];
  extraIngredients: string[];
  steps: string[];
}

export type AppStage = "input" | "loading" | "results" | "error";
