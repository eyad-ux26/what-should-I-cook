import { useLanguage, type Lang } from "../i18n";
import type { CategorySlug } from "./data";

interface BlogStrings {
  home: string;
  blog: string;
  breadcrumb: string;
  eyebrow: string;
  indexTitle: string;
  indexIntro: string;
  featured: string;
  latest: string;
  readArticle: string;
  keepExploring: string;
  minRead: (n: number) => string;
  tip: string;
  tryThis: string;
  time: string;
  easyVariation: string;
  ctaPrompt: string;
  ctaBody: string;
  ctaButton: string;
  categories: Record<CategorySlug, string>;
  dateLocale: string;
  siteName: string;
}

const en: BlogStrings = {
  home: "Home",
  blog: "Blog",
  breadcrumb: "Breadcrumb",
  eyebrow: "Cooking Inspiration",
  indexTitle: "Good food starts with a good idea.",
  indexIntro: "Practical cooking ideas, simple meal inspiration, and ways to make more from what you already have.",
  featured: "Featured Article",
  latest: "Latest Cooking Ideas",
  readArticle: "Read article",
  keepExploring: "Keep exploring",
  minRead: (n) => `${n} min read`,
  tip: "Good to know",
  tryThis: "Try this",
  time: "Time:",
  easyVariation: "Easy variation:",
  ctaPrompt: "Still not sure what to make?",
  ctaBody: "Tell us what ingredients you have and we'll help you find an idea.",
  ctaButton: "What should I cook?",
  categories: {
    decide: "Dinner Decisions",
    easy: "Easy Meals",
    pantry: "Pantry Cooking",
    quick: "Quick Dinners",
    leftovers: "Leftovers",
    staples: "Ingredient Guides",
    vegetarian: "Vegetarian",
  },
  dateLocale: "en-US",
  siteName: "What Should I Cook",
};

const ar: BlogStrings = {
  home: "الرئيسية",
  blog: "المدونة",
  breadcrumb: "مسار التنقل",
  eyebrow: "إلهام للطبخ",
  indexTitle: "الأكل الجيد يبدأ بفكرة جيدة.",
  indexIntro: "أفكار طبخ عملية، وإلهام لوجبات بسيطة، وطرق لتستفيد أكثر مما لديك بالفعل.",
  featured: "مقال مميز",
  latest: "أحدث أفكار الطبخ",
  readArticle: "اقرأ المقال",
  keepExploring: "تابع الاستكشاف",
  minRead: (n) => `${n} ${n <= 10 ? "دقائق" : "دقيقة"} للقراءة`,
  tip: "من المفيد أن تعرف",
  tryThis: "جرّب هذا",
  time: "الوقت:",
  easyVariation: "تنويعة سهلة:",
  ctaPrompt: "ما زلت لا تعرف ماذا تطبخ؟",
  ctaBody: "أخبرنا بالمكونات التي لديك وسنساعدك في إيجاد فكرة.",
  ctaButton: "ماذا أطبخ؟",
  categories: {
    decide: "قرارات العشاء",
    easy: "وجبات سهلة",
    pantry: "الطبخ من المخزن",
    quick: "عشاء سريع",
    leftovers: "بقايا الطعام",
    staples: "أدلة المكونات",
    vegetarian: "نباتي",
  },
  dateLocale: "ar-u-nu-latn",
  siteName: "ماذا أطبخ",
};

export const BLOG_STRINGS: Record<Lang, BlogStrings> = { en, ar };

export function useBlogStrings(): BlogStrings {
  return BLOG_STRINGS[useLanguage().lang];
}
