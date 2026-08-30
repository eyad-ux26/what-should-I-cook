import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AllergyTag, CuisineTag, DietTag, Difficulty, TimeBudget } from "./types";

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
  typingExamples: string[];
  refineLabel: string;
  refineOptional: string;
  timeAvailable: string;
  timeOptions: { value: TimeBudget; label: string }[];
  dietaryNeeds: string;
  dietOptions: { value: DietTag; label: string }[];
  cuisineLabel: string;
  cuisineOptions: { value: CuisineTag; label: string }[];
  cuisineOtherPlaceholder: string;
  allergiesLabel: string;
  allergyOptions: { value: AllergyTag; label: string }[];
  allergyOtherPlaceholder: string;
  moodLabel: string;
  moodPlaceholder: string;
  submitEmpty: string;
  submitReady: string;
  steps: { label: string; desc: string }[];
  loadingMessages: string[];
  loadingHeadline: string;
  errorTitle: string;
  errorSubtitle: string;
  tryAgain: string;
  resultsCount: (n: number) => string;
  editIngredients: string;
  generateMore: string;
  startOver: string;
  difficultyLabel: Record<Difficulty, string>;
  minUnit: (n: number) => string;
  moreNeeded: (n: number) => string;
  haveEverything: string;
  youllAlsoNeed: string;
  stepsLabel: string;
  showDetails: string;
  hideDetails: string;
  copyTitle: string;
  copyHook: string;
  copied: string;
  detailsError: string;
  languageToggle: string;
}

const en: Strings = {
  dir: "ltr",
  brand: "What Should I Cook",
  headlinePrefix: "What's in your kitchen?",
  headlineAccent: "Let's cook.",
  subtitle:
    "List your ingredients, tell us your constraints, and get recipe ideas built around what you already have.",
  ingredientsLabel: "What's in your kitchen?",
  ingredientsPlaceholderFirst: "e.g. {example}",
  ingredientsPlaceholderMore: "Add another...",
  ingredientsHelp: "Press Enter or comma to add each ingredient.",
  removeIngredient: (name) => `Remove ${name}`,
  examples: ["chicken thighs", "rice", "bell pepper", "eggs", "spinach", "canned tomatoes"],
  typingExamples: [
    "chicken, rice, onions",
    "eggs, tomatoes, cheese",
    "chicken thighs, potatoes, garlic",
    "pasta, mushrooms, cream",
  ],
  refineLabel: "Set preferences",
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
    { value: "low-calorie", label: "Low calories" },
  ],
  cuisineLabel: "Cuisine",
  cuisineOptions: [
    { value: "italian", label: "Italian 🇮🇹" },
    { value: "asian", label: "Asian 🌏" },
    { value: "mexican", label: "Mexican 🇲🇽" },
    { value: "indian", label: "Indian 🇮🇳" },
    { value: "middle-eastern", label: "Middle Eastern 🌿" },
    { value: "other", label: "Other" },
  ],
  cuisineOtherPlaceholder: "What cuisine are you in the mood for?",
  allergiesLabel: "Allergies",
  allergyOptions: [
    { value: "nuts", label: "Nuts" },
    { value: "dairy", label: "Milk / Dairy" },
    { value: "eggs", label: "Eggs" },
    { value: "gluten", label: "Wheat / Gluten" },
    { value: "other", label: "Other" },
  ],
  allergyOtherPlaceholder: "Other allergy...",
  moodLabel: "In the mood for...",
  moodPlaceholder: "e.g. something spicy, comfort food, something quick",
  submitEmpty: "Add an ingredient to start",
  submitReady: "Find something to cook",
  steps: [
    { label: "Add ingredients", desc: "Whatever's in the fridge" },
    { label: "Set preferences", desc: "Time, dietary needs, and more" },
    { label: "Get recipes", desc: "Matched to your pantry" },
  ],
  loadingMessages: [
    "Thinking about what pairs well...",
    "Checking a few flavor combos...",
    "Almost got something good...",
  ],
  loadingHeadline: "Turning your ingredients into recipe ideas...",
  errorTitle: "Couldn't come up with anything",
  errorSubtitle: "Something went wrong on our end. Give it another try.",
  tryAgain: "Try again",
  resultsCount: (n) => `${n} idea${n !== 1 ? "s" : ""} based on what you've got`,
  editIngredients: "Edit ingredients",
  generateMore: "Generate 3 more recipes",
  startOver: "Start over",
  difficultyLabel: { easy: "Easy", medium: "Medium", hard: "Hard" },
  minUnit: (n) => `${n} min`,
  moreNeeded: (n) => `${n} more ingredient${n > 1 ? "s" : ""} needed`,
  haveEverything: "You have everything",
  youllAlsoNeed: "You'll also need",
  stepsLabel: "Steps",
  showDetails: "Show recipe details",
  hideDetails: "Hide recipe details",
  copyTitle: "Copy title",
  copyHook: "Copy description",
  copied: "Copied",
  detailsError: "Couldn't load details. Try again.",
  languageToggle: "العربية",
};

const ar: Strings = {
  dir: "rtl",
  fontFamily: "'Cairo', ui-sans-serif, system-ui, sans-serif",
  brand: "ماذا أطبخ",
  headlinePrefix: "عندك مكونات؟",
  headlineAccent: "يلا نطبخ!",
  subtitle: "اذكر مكوناتك، وأخبرنا بقيودك، واحصل على أفكار وصفات مبنية على ما تملكه بالفعل.",
  ingredientsLabel: "ماذا يوجد في مطبخك؟",
  ingredientsPlaceholderFirst: "مثال: {example}",
  ingredientsPlaceholderMore: "أضف مكونًا آخر...",
  ingredientsHelp: "اضغط Enter أو الفاصلة لإضافة كل مكوّن.",
  removeIngredient: (name) => `إزالة ${name}`,
  examples: ["أفخاذ دجاج", "أرز", "فلفل رومي", "بيض", "سبانخ", "طماطم معلبة"],
  typingExamples: [
    "دجاج، أرز، بصل",
    "بيض، طماطم، جبنة",
    "أفخاذ دجاج، بطاطس، ثوم",
    "مكرونة، فطر، كريمة",
  ],
  refineLabel: "حدد التفضيلات",
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
    { value: "low-calorie", label: "منخفض السعرات" },
  ],
  cuisineLabel: "المطبخ",
  cuisineOptions: [
    { value: "italian", label: "إيطالي 🇮🇹" },
    { value: "asian", label: "آسيوي 🌏" },
    { value: "mexican", label: "مكسيكي 🇲🇽" },
    { value: "indian", label: "هندي 🇮🇳" },
    { value: "middle-eastern", label: "شرق أوسطي 🌿" },
    { value: "other", label: "أخرى" },
  ],
  cuisineOtherPlaceholder: "ما نوع المطبخ الذي تفضله؟",
  allergiesLabel: "الحساسية الغذائية",
  allergyOptions: [
    { value: "nuts", label: "المكسرات" },
    { value: "dairy", label: "الحليب / الألبان" },
    { value: "eggs", label: "البيض" },
    { value: "gluten", label: "القمح / الغلوتين" },
    { value: "other", label: "أخرى" },
  ],
  allergyOtherPlaceholder: "حساسية أخرى...",
  moodLabel: "ماذا تشتهي؟",
  moodPlaceholder: "مثال: شيء حار، أكل مريح، شيء سريع",
  submitEmpty: "أضف مكونًا للبدء",
  submitReady: "ابحث عن طبخة",
  steps: [
    { label: "أضف المكونات", desc: "أي شيء في الثلاجة" },
    { label: "حدد التفضيلات", desc: "الوقت، الاحتياجات الغذائية، والمزيد" },
    { label: "احصل على وصفات", desc: "مطابقة لما لديك" },
  ],
  loadingMessages: [
    "نفكر في مكونات تتناسب مع بعضها...",
    "نتحقق من بعض التوليفات الشهية...",
    "أوشكنا على إيجاد شيء رائع...",
  ],
  loadingHeadline: "نحوّل مكوناتك إلى أفكار وصفات...",
  errorTitle: "لم نتمكن من إيجاد شيء",
  errorSubtitle: "حدث خطأ من جانبنا. حاول مرة أخرى.",
  tryAgain: "حاول مرة أخرى",
  resultsCount: (n) => `${n} فكرة بناءً على ما لديك`,
  editIngredients: "تعديل المكونات",
  generateMore: "أعطني 3 وصفات جديدة",
  startOver: "البدء من جديد",
  difficultyLabel: { easy: "سهل", medium: "متوسط", hard: "صعب" },
  minUnit: (n) => `${n} دقيقة`,
  moreNeeded: (n) => `${n} مكوّن إضافي مطلوب`,
  haveEverything: "لديك كل شيء",
  youllAlsoNeed: "ستحتاج أيضًا إلى",
  stepsLabel: "الخطوات",
  showDetails: "عرض تفاصيل الوصفة",
  hideDetails: "إخفاء تفاصيل الوصفة",
  copyTitle: "نسخ العنوان",
  copyHook: "نسخ الوصف",
  copied: "تم النسخ",
  detailsError: "تعذّر تحميل التفاصيل. حاول مرة أخرى.",
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
