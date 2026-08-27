import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DietTag, Difficulty, TimeBudget } from "./types";

export type Lang = "en" | "ar";

interface Strings {
  dir: "ltr" | "rtl";
  fontFamily?: string;
  brand: string;
  headlinePrefix: string;
  headlineAccent: string;
  subtitle: string;
  ingredientsLabel: string;
  ingredientsPlaceholderFirst: string;
  ingredientsPlaceholderMore: string;
  ingredientsHelp: string;
  removeIngredient: (name: string) => string;
  examples: string[];
  refineLabel: string;
  refineOptional: string;
  timeAvailable: string;
  timeOptions: { value: TimeBudget; label: string }[];
  dietaryNeeds: string;
  dietOptions: { value: DietTag; label: string }[];
  moodLabel: string;
  moodPlaceholder: string;
  submitEmpty: string;
  submitReady: string;
  steps: { label: string; desc: string }[];
  loadingMessages: string[];
  errorTitle: string;
  errorSubtitle: string;
  tryAgain: string;
  resultsCount: (n: number) => string;
  showDifferent: string;
  startOver: string;
  difficultyLabel: Record<Difficulty, string>;
  minUnit: (n: number) => string;
  moreNeeded: (n: number) => string;
  haveEverything: string;
  youllAlsoNeed: string;
  stepsLabel: string;
  languageToggle: string;
}

const en: Strings = {
  dir: "ltr",
  brand: "What Should I Cook",
  headlinePrefix: "Turn what's in your kitchen into",
  headlineAccent: "something worth eating",
  subtitle:
    "List your ingredients, tell us your constraints, and get recipe ideas built around what you already have.",
  ingredientsLabel: "What's in your kitchen?",
  ingredientsPlaceholderFirst: "e.g. {example}",
  ingredientsPlaceholderMore: "Add another...",
  ingredientsHelp: "Press Enter or comma to add each ingredient.",
  removeIngredient: (name) => `Remove ${name}`,
  examples: ["chicken thighs", "rice", "bell pepper", "eggs", "spinach", "canned tomatoes"],
  refineLabel: "Refine",
  refineOptional: "(optional)",
  timeAvailable: "Time available",
  timeOptions: [
    { value: "any", label: "Any time" },
    { value: "15", label: "Under 15 min" },
    { value: "30", label: "Under 30 min" },
    { value: "60", label: "Under 1 hr" },
  ],
  dietaryNeeds: "Dietary needs",
  dietOptions: [
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "gluten-free", label: "Gluten-free" },
    { value: "dairy-free", label: "Dairy-free" },
  ],
  moodLabel: "In the mood for...",
  moodPlaceholder: "e.g. something spicy, comfort food, Italian cuisine",
  submitEmpty: "Add an ingredient to start",
  submitReady: "Find something to cook",
  steps: [
    { label: "Add ingredients", desc: "Whatever's in the fridge" },
    { label: "Set preferences", desc: "Time, diet, cravings" },
    { label: "Get recipes", desc: "Matched to your pantry" },
  ],
  loadingMessages: [
    "Thinking about what pairs well...",
    "Checking a few flavor combos...",
    "Almost got something good...",
  ],
  errorTitle: "Couldn't come up with anything",
  errorSubtitle: "Something went wrong on our end. Give it another try.",
  tryAgain: "Try again",
  resultsCount: (n) => `${n} idea${n !== 1 ? "s" : ""} based on what you've got`,
  showDifferent: "Show different ideas",
  startOver: "Start over",
  difficultyLabel: { easy: "Easy", medium: "Medium", hard: "Hard" },
  minUnit: (n) => `${n} min`,
  moreNeeded: (n) => `${n} more ingredient${n > 1 ? "s" : ""} needed`,
  haveEverything: "You have everything",
  youllAlsoNeed: "You'll also need",
  stepsLabel: "Steps",
  languageToggle: "العربية",
};

const ar: Strings = {
  dir: "rtl",
  fontFamily: "'Cairo', ui-sans-serif, system-ui, sans-serif",
  brand: "ماذا أطبخ",
  headlinePrefix: "حوّل ما هو موجود في مطبخك إلى",
  headlineAccent: "وجبة تستحق الأكل",
  subtitle: "اذكر مكوناتك، وأخبرنا بقيودك، واحصل على أفكار وصفات مبنية على ما تملكه بالفعل.",
  ingredientsLabel: "ماذا يوجد في مطبخك؟",
  ingredientsPlaceholderFirst: "مثال: {example}",
  ingredientsPlaceholderMore: "أضف مكونًا آخر...",
  ingredientsHelp: "اضغط Enter أو الفاصلة لإضافة كل مكوّن.",
  removeIngredient: (name) => `إزالة ${name}`,
  examples: ["أفخاذ دجاج", "أرز", "فلفل رومي", "بيض", "سبانخ", "طماطم معلبة"],
  refineLabel: "تخصيص",
  refineOptional: "(اختياري)",
  timeAvailable: "الوقت المتاح",
  timeOptions: [
    { value: "any", label: "أي وقت" },
    { value: "15", label: "أقل من 15 دقيقة" },
    { value: "30", label: "أقل من 30 دقيقة" },
    { value: "60", label: "أقل من ساعة" },
  ],
  dietaryNeeds: "احتياجات غذائية",
  dietOptions: [
    { value: "vegetarian", label: "نباتي" },
    { value: "vegan", label: "نباتي صرف" },
    { value: "gluten-free", label: "خالٍ من الغلوتين" },
    { value: "dairy-free", label: "خالٍ من الألبان" },
  ],
  moodLabel: "ماذا تشتهي؟",
  moodPlaceholder: "مثال: شيء حار، أكل مريح، مطبخ إيطالي",
  submitEmpty: "أضف مكونًا للبدء",
  submitReady: "ابحث عن طبخة",
  steps: [
    { label: "أضف المكونات", desc: "أي شيء في الثلاجة" },
    { label: "حدد التفضيلات", desc: "الوقت، النظام الغذائي، الرغبة" },
    { label: "احصل على وصفات", desc: "مطابقة لما لديك" },
  ],
  loadingMessages: [
    "نفكر في مكونات تتناسب مع بعضها...",
    "نتحقق من بعض التوليفات الشهية...",
    "أوشكنا على إيجاد شيء رائع...",
  ],
  errorTitle: "لم نتمكن من إيجاد شيء",
  errorSubtitle: "حدث خطأ من جانبنا. حاول مرة أخرى.",
  tryAgain: "حاول مرة أخرى",
  resultsCount: (n) => `${n} فكرة بناءً على ما لديك`,
  showDifferent: "أظهر أفكارًا مختلفة",
  startOver: "البدء من جديد",
  difficultyLabel: { easy: "سهل", medium: "متوسط", hard: "صعب" },
  minUnit: (n) => `${n} دقيقة`,
  moreNeeded: (n) => `${n} مكوّن إضافي مطلوب`,
  haveEverything: "لديك كل شيء",
  youllAlsoNeed: "ستحتاج أيضًا إلى",
  stepsLabel: "الخطوات",
  languageToggle: "English",
};

const STRINGS: Record<Lang, Strings> = { en, ar };

interface LanguageContextValue {
  lang: Lang;
  t: Strings;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Lang {
  const stored = localStorage.getItem("lang");
  return stored === "ar" || stored === "en" ? stored : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = STRINGS[lang].dir;
    localStorage.setItem("lang", lang);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: STRINGS[lang],
      toggleLang: () => setLang((l) => (l === "en" ? "ar" : "en")),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
