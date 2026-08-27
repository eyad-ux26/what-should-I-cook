export type TimeBudget = "any" | "15" | "30" | "60";

export type DietTag = "vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "low-calorie";

export type CuisineTag = "italian" | "asian" | "mexican" | "indian" | "middle-eastern" | "other";

export type AllergyTag = "nuts" | "dairy" | "eggs" | "gluten" | "other";

export interface CookPreferences {
  ingredients: string[];
  timeBudget: TimeBudget;
  diet: DietTag[];
  cuisine: CuisineTag | null;
  customCuisine: string;
  allergies: AllergyTag[];
  customAllergy: string;
  craving: string;
  language: "en" | "ar";
}

export type Difficulty = "easy" | "medium" | "hard";

export interface RecipeStep {
  title: string;
  detail: string;
}

export interface RecipeResult {
  id: string;
  title: string;
  hook: string;
  timeMinutes: number;
  difficulty: Difficulty;
  cuisine: string;
  matchedIngredients: string[];
  extraIngredients: string[];
  steps?: RecipeStep[];
}

export interface RecipeSummary {
  title: string;
  hook: string;
  cuisine: string;
  timeMinutes: number;
  difficulty: Difficulty;
  matchedIngredients: string[];
  extraIngredients: string[];
}

export type AppStage = "input" | "loading" | "results" | "error";
