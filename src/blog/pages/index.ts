import type { ComponentType } from "react";
import type { Lang } from "../../i18n";
import { DinnerDecision } from "./DinnerDecision";
import { EasyDinnerIdeas } from "./EasyDinnerIdeas";
import { PantryMeals } from "./PantryMeals";
import { QuickDinners } from "./QuickDinners";
import { Leftovers } from "./Leftovers";
import { ChickenAndRice } from "./ChickenAndRice";
import { CookWithEggs } from "./CookWithEggs";
import { VegetarianMeals } from "./VegetarianMeals";
import { DinnerDecisionAr } from "./ar/DinnerDecisionAr";
import { EasyDinnerIdeasAr } from "./ar/EasyDinnerIdeasAr";
import { PantryMealsAr } from "./ar/PantryMealsAr";
import { QuickDinnersAr } from "./ar/QuickDinnersAr";
import { LeftoversAr } from "./ar/LeftoversAr";
import { ChickenAndRiceAr } from "./ar/ChickenAndRiceAr";
import { CookWithEggsAr } from "./ar/CookWithEggsAr";
import { VegetarianMealsAr } from "./ar/VegetarianMealsAr";

/** Article slug -> the page component for each language. Slugs must match articles.json. */
export const ARTICLE_PAGES: Record<string, Record<Lang, ComponentType>> = {
  "what-should-i-cook-for-dinner": { en: DinnerDecision, ar: DinnerDecisionAr },
  "easy-dinner-ideas": { en: EasyDinnerIdeas, ar: EasyDinnerIdeasAr },
  "what-can-i-cook-with-what-i-have": { en: PantryMeals, ar: PantryMealsAr },
  "quick-dinner-ideas": { en: QuickDinners, ar: QuickDinnersAr },
  "leftover-dinner-ideas": { en: Leftovers, ar: LeftoversAr },
  "what-to-cook-with-chicken-and-rice": { en: ChickenAndRice, ar: ChickenAndRiceAr },
  "what-can-i-cook-with-eggs": { en: CookWithEggs, ar: CookWithEggsAr },
  "easy-vegetarian-meals": { en: VegetarianMeals, ar: VegetarianMealsAr },
};
