export interface CategoryInfo {
  label: string;
  gradient: string;
}

export const CATEGORIES = {
  decide: { label: "Dinner Decisions", gradient: "linear-gradient(135deg, #ffb27a, #ff6a3d)" },
  easy: { label: "Easy Meals", gradient: "linear-gradient(135deg, #b39dff, #7c5cff)" },
  pantry: { label: "Pantry Cooking", gradient: "linear-gradient(135deg, #6ee7d8, #14b8a6)" },
  quick: { label: "Quick Dinners", gradient: "linear-gradient(135deg, #ff8fa8, #e84393)" },
  leftovers: { label: "Leftovers", gradient: "linear-gradient(135deg, #ffd76a, #f5a623)" },
} as const satisfies Record<string, CategoryInfo>;

export type CategorySlug = keyof typeof CATEGORIES;

export interface ArticleMeta {
  slug: string;
  category: CategorySlug;
  title: string;
  /** Longer teaser for the featured-article treatment. */
  dek: string;
  /** Shorter teaser for grid cards / keep-exploring links. */
  excerpt: string;
  description: string;
  keyword: string;
  readingMinutes: number;
  datePublished: string;
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "what-should-i-cook-for-dinner",
    category: "decide",
    title: "What Should I Cook for Dinner? A Simple Way to Decide",
    dek: "A five-question framework for cutting through decision fatigue and actually landing on something to make tonight.",
    excerpt: "A five-question framework for getting from “I have no idea” to a real plan for tonight.",
    description:
      "Stuck on what to cook for dinner? A practical, five-question framework — based on what you have, your time, and what you're craving — to help you decide tonight.",
    keyword: "what should I cook for dinner",
    readingMinutes: 8,
    datePublished: "2026-09-13",
  },
  {
    slug: "easy-dinner-ideas",
    category: "easy",
    title: "Easy Dinner Ideas When You Don't Know What to Cook",
    dek: "A situation-sorted collection of low-effort dinners — by pan, by pantry, and by how much time you actually have.",
    excerpt: "Low-effort dinner ideas sorted by situation — one-pan, pantry-only, quick pasta, and more.",
    description:
      "A practical collection of easy dinner ideas sorted by situation: 15-minute meals, one-pan dinners, pantry staples, easy pasta, rice, vegetarian, and chicken meals.",
    keyword: "easy dinner ideas",
    readingMinutes: 9,
    datePublished: "2026-09-13",
  },
  {
    slug: "what-can-i-cook-with-what-i-have",
    category: "pantry",
    title: "What Can I Cook With What I Have? A Guide to Pantry and Fridge Meals",
    dek: "A practical framework — protein + carb + vegetable + sauce — plus meal directions for the ten ingredients most kitchens already have.",
    excerpt: "A protein + carb + vegetable + sauce framework, built around ten ingredients most kitchens already have.",
    description:
      "What can you cook with what's already in your kitchen? A practical framework built around eggs, rice, pasta, potatoes, chicken, beans, and other common staples.",
    keyword: "what can I cook with what I have",
    readingMinutes: 10,
    datePublished: "2026-09-13",
  },
  {
    slug: "quick-dinner-ideas",
    category: "quick",
    title: "Quick Dinner Ideas for Busy Weeknights",
    dek: "Dinners organized by exactly how much time you have — from a 10-minute scramble to a 30-minute sheet-pan meal — plus six habits that actually save time.",
    excerpt: "Dinners organized by exactly how much time you have, plus six habits that genuinely save time.",
    description:
      "Quick dinner ideas organized by time — 10 to 30 minutes — plus practical habits for cooking faster on busy weeknights.",
    keyword: "quick dinner ideas",
    readingMinutes: 8,
    datePublished: "2026-09-13",
  },
  {
    slug: "leftover-dinner-ideas",
    category: "leftovers",
    title: "How to Turn Leftovers Into a New Dinner",
    dek: "Leftover chicken, rice, vegetables, and potatoes each have four or five different second lives — plus how to store and reheat them safely.",
    excerpt: "Leftover chicken, rice, vegetables, and potatoes each have several different second lives.",
    description:
      "Practical ideas for turning leftover chicken, rice, vegetables, and potatoes into a completely different dinner, plus safe storage and reheating guidance.",
    keyword: "leftover dinner ideas",
    readingMinutes: 8,
    datePublished: "2026-09-13",
  },
];

export function getArticle(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelated(slug: string, count = 3): ArticleMeta[] {
  return ARTICLES.filter((a) => a.slug !== slug).slice(0, count);
}
