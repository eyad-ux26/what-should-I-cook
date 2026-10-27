import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import type { AllergyTag, CuisineTag, DietTag, Difficulty, TimeBudget } from "./types";
import { usePathname } from "./routing";

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
  addIngredient: string;
  findRecipes: string;
  headerBlog: string;
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
  customCuisineLabel: string;
  allergiesLabel: string;
  allergyOptions: { value: AllergyTag; label: string }[];
  allergyOtherPlaceholder: string;
  customAllergyLabel: string;
  clearFilters: string;
  noExtraIngredientsLabel: string;
  noExtraIngredientsHint: string;
  moodLabel: string;
  moodPlaceholder: string;
  submitEmpty: string;
  steps: { label: string; desc: string }[];
  inspirationTitle: string;
  inspirationIntro: string;
  howItWorksTitle: string;
  howItWorksTeaser: string;
  howItWorksParagraphs: string[];
  tipsTitle: string;
  tipsTeaser: string;
  tips: string[];
  faqTitle: string;
  faqTeaser: string;
  faqItems: { q: string; a: string }[];
  exploreLabel: string;
  collapseLabel: string;
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
  footerBlog: string;
  footerPrivacy: string;
  footerTerms: string;
  footerDisclaimer: string;
  footerContact: string;
  footerTagline: string;
  backToApp: string;
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
  ingredientsHelp:
    "Type an ingredient and press Enter or tap “Add ingredient”. To add several at once, separate them with commas (, or ،) or paste a list.",
  addIngredient: "Add ingredient",
  findRecipes: "Find recipes",
  headerBlog: "Blog",
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
  customCuisineLabel: "Other cuisine",
  allergiesLabel: "Allergies",
  allergyOptions: [
    { value: "nuts", label: "Nuts" },
    { value: "dairy", label: "Milk / Dairy" },
    { value: "eggs", label: "Eggs" },
    { value: "gluten", label: "Wheat / Gluten" },
    { value: "other", label: "Other" },
  ],
  allergyOtherPlaceholder: "Other allergy...",
  customAllergyLabel: "Other allergy",
  clearFilters: "Clear filters",
  noExtraIngredientsLabel: "Only use what I listed",
  noExtraIngredientsHint: "No extra ingredients — not even pantry staples like oil or salt.",
  moodLabel: "In the mood for...",
  moodPlaceholder: "e.g. something spicy, comfort food, something quick",
  submitEmpty: "Add an ingredient to start",
  steps: [
    { label: "Add ingredients", desc: "Whatever's in the fridge" },
    { label: "Set preferences", desc: "Time, dietary needs, and more" },
    { label: "Get recipes", desc: "Matched to your pantry" },
  ],
  inspirationTitle: "Cooking Inspiration",
  inspirationIntro:
    "A closer look at how it all works, plus practical tips and answers to the questions people ask most.",
  howItWorksTitle: "How What Should I Cook Works",
  howItWorksTeaser:
    "See exactly how typing in a few ingredients turns into AI-generated recipe ideas — and how preferences shape the results.",
  howItWorksParagraphs: [
    "Type in whatever ingredients you have on hand — as many or as few as you like — and press Enter or a comma after each one. There's no sign-up and nothing to install; the tool works entirely in your browser.",
    "Behind the scenes, your ingredient list and any preferences you set are sent to an AI model, which suggests a handful of recipe ideas built around what you already have. Each suggestion shows how many extra ingredients (if any) you'd need, and results are ordered so the recipes needing the fewest extra ingredients come first.",
    "Want something more specific? Open \"Set preferences\" to add a time limit, dietary needs, a preferred cuisine, allergies to avoid, a mood or craving, or turn on \"Only use what I listed\" to rule out extra ingredients entirely.",
  ],
  tipsTitle: "Tips for Better Results",
  tipsTeaser:
    "Practical ways to phrase your ingredients and use the preferences panel so you get more relevant, ready-to-cook ideas.",
  tips: [
    "Be specific: \"chicken thighs\" or \"canned chickpeas\" gives the AI more to work with than just \"chicken\" or \"beans.\"",
    "List everything you're willing to use, even basics like eggs, rice, or bread — the more you list, the more options the AI has.",
    "Turn on \"Only use what I listed\" if you don't want to run to the store for anything extra.",
    "Not feeling the results? Use \"Generate 3 more recipes\" to get new ideas without changing your ingredients or preferences.",
    "Set allergies and dietary needs before generating — they're applied to every recipe idea, not just filtered afterward.",
  ],
  faqTitle: "Frequently Asked Questions",
  faqTeaser: "Straight answers about accounts, ingredient accuracy, allergies, data storage, and language support.",
  faqItems: [
    {
      q: "Do I need to create an account?",
      a: "No. What Should I Cook doesn't have accounts, logins, or a saved history — you can start using it immediately.",
    },
    {
      q: "Will the recipes only use the ingredients I list?",
      a: "The AI tries to minimize extra ingredients by default, and results are sorted so recipes needing the fewest extras appear first. If you want a hard guarantee, turn on \"Only use what I listed\" in the preferences panel before generating.",
    },
    {
      q: "Can I set allergies or dietary restrictions?",
      a: "Yes. Open \"Set preferences\" to select common allergies, dietary needs (like vegetarian, vegan, or gluten-free), a preferred cuisine, a time limit, and even a mood or craving.",
    },
    {
      q: "Are the recipes reviewed by a chef or nutritionist?",
      a: "No — every recipe is generated by an AI model and isn't reviewed by a human before it's shown to you. Always check ingredients and food safety before cooking; see our AI & Recipe Disclaimer for details.",
    },
    {
      q: "Is my ingredient list stored anywhere?",
      a: "No. Requests aren't saved to a database — see our Privacy Policy for the full details on what technical information is processed.",
    },
    {
      q: "Does it support languages other than English?",
      a: "Yes — use the language toggle in the top-right corner to switch to Arabic.",
    },
  ],
  exploreLabel: "Explore",
  collapseLabel: "Show less",
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
  footerBlog: "Blog",
  footerPrivacy: "Privacy Policy",
  footerTerms: "Terms of Use",
  footerDisclaimer: "AI & Recipe Disclaimer",
  footerContact: "Contact",
  footerTagline: "Recipes are AI-generated — always check ingredients and food safety before cooking.",
  backToApp: "← Back to the recipe generator",
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
  ingredientsHelp:
    "اكتب مكوّنًا واضغط Enter أو اضغط «إضافة مكوّن». لإضافة عدة مكوّنات معًا، افصل بينها بفاصلة (, أو ،) أو الصق قائمة.",
  addIngredient: "إضافة مكوّن",
  findRecipes: "اعثر على وصفات",
  headerBlog: "المدونة",
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
  customCuisineLabel: "مطبخ آخر",
  allergiesLabel: "الحساسية الغذائية",
  allergyOptions: [
    { value: "nuts", label: "المكسرات" },
    { value: "dairy", label: "الحليب / الألبان" },
    { value: "eggs", label: "البيض" },
    { value: "gluten", label: "القمح / الغلوتين" },
    { value: "other", label: "أخرى" },
  ],
  allergyOtherPlaceholder: "حساسية أخرى...",
  customAllergyLabel: "حساسية أخرى",
  clearFilters: "مسح التفضيلات",
  noExtraIngredientsLabel: "استخدم فقط ما أدرجته",
  noExtraIngredientsHint: "بلا أي مكونات إضافية — حتى الأساسيات كالزيت أو الملح.",
  moodLabel: "ماذا تشتهي؟",
  moodPlaceholder: "مثال: شيء حار، أكل مريح، شيء سريع",
  submitEmpty: "أضف مكونًا للبدء",
  steps: [
    { label: "أضف المكونات", desc: "أي شيء في الثلاجة" },
    { label: "حدد التفضيلات", desc: "الوقت، الاحتياجات الغذائية، والمزيد" },
    { label: "احصل على وصفات", desc: "مطابقة لما لديك" },
  ],
  inspirationTitle: "إلهام للطبخ",
  inspirationIntro: "نظرة أقرب على كيفية عمل التطبيق، بالإضافة إلى نصائح عملية وإجابات لأكثر الأسئلة شيوعًا.",
  howItWorksTitle: "كيف يعمل تطبيق ماذا أطبخ",
  howItWorksTeaser: "شاهد كيف يتحول إدراج بضعة مكونات إلى أفكار وصفات مُولَّدة بالذكاء الاصطناعي — وكيف تُشكِّل التفضيلات النتائج.",
  howItWorksParagraphs: [
    "اكتب أي مكونات متوفرة لديك — بقدر ما تريد — واضغط Enter أو الفاصلة بعد كل مكوّن. لا حاجة للتسجيل ولا لتثبيت أي شيء؛ يعمل التطبيق بالكامل من متصفحك.",
    "خلف الكواليس، تُرسل قائمة مكوناتك وأي تفضيلات حددتها إلى نموذج ذكاء اصطناعي، يقترح عليك عددًا من أفكار الوصفات المبنية على ما تملكه بالفعل. تُظهر كل وصفة عدد المكونات الإضافية (إن وجدت) التي ستحتاجها، وتُرتَّب النتائج بحيث تظهر الوصفات الأقل احتياجًا لمكونات إضافية أولاً.",
    "تريد نتائج أكثر تحديدًا؟ افتح \"حدد التفضيلات\" لإضافة وقت محدد، احتياجات غذائية، مطبخ مفضل، حساسية تريد تجنبها، أو مزاج معين، أو فعّل خيار \"استخدم فقط ما أدرجته\" لاستبعاد أي مكونات إضافية تمامًا.",
  ],
  tipsTitle: "نصائح للحصول على نتائج أفضل",
  tipsTeaser: "طرق عملية لصياغة مكوناتك واستخدام لوحة التفضيلات للحصول على أفكار أكثر ملاءمة وجاهزة للطبخ مباشرة.",
  tips: [
    "كن محددًا: \"أفخاذ دجاج\" أو \"حمص معلب\" يعطي الذكاء الاصطناعي معلومات أدق من مجرد \"دجاج\" أو \"بقوليات\".",
    "أدرج كل ما لديك، حتى الأساسيات مثل البيض أو الأرز أو الخبز — كلما أدرجت أكثر، زادت الخيارات.",
    "فعّل \"استخدم فقط ما أدرجته\" إن كنت لا تريد الذهاب لشراء أي شيء إضافي.",
    "لم تعجبك النتائج؟ استخدم \"أعطني 3 وصفات جديدة\" للحصول على أفكار جديدة دون تغيير مكوناتك أو تفضيلاتك.",
    "حدد الحساسية والاحتياجات الغذائية قبل التوليد — تُطبَّق على كل الوصفات المقترحة، وليس فقط تُصفّى لاحقًا.",
  ],
  faqTitle: "الأسئلة الشائعة",
  faqTeaser: "إجابات واضحة حول الحسابات، دقة المكونات، الحساسية الغذائية، تخزين البيانات، ودعم اللغة.",
  faqItems: [
    {
      q: "هل أحتاج إلى إنشاء حساب؟",
      a: "لا. لا يحتوي \"ماذا أطبخ\" على حسابات أو تسجيل دخول أو سجل محفوظ — يمكنك البدء فورًا.",
    },
    {
      q: "هل ستستخدم الوصفات فقط المكونات التي أدرجتها؟",
      a: "يحاول الذكاء الاصطناعي تقليل المكونات الإضافية افتراضيًا، وتُرتَّب النتائج بحيث تظهر الوصفات الأقل احتياجًا للمكونات الإضافية أولاً. إذا أردت ضمانًا كاملاً، فعّل خيار \"استخدم فقط ما أدرجته\" في لوحة التفضيلات قبل التوليد.",
    },
    {
      q: "هل يمكنني تحديد الحساسية أو القيود الغذائية؟",
      a: "نعم. افتح \"حدد التفضيلات\" لاختيار الحساسية الشائعة، الاحتياجات الغذائية (مثل نباتي، نباتي صرف، أو خالٍ من الغلوتين)، مطبخ مفضل، وقت محدد، وحتى مزاج أو رغبة معينة.",
    },
    {
      q: "هل تتم مراجعة الوصفات من قبل طاهٍ أو أخصائي تغذية؟",
      a: "لا — كل وصفة يولّدها نموذج ذكاء اصطناعي ولا تتم مراجعتها من قبل إنسان قبل عرضها عليك. تحقق دائمًا من المكونات وسلامة الطعام قبل الطهي؛ راجع إخلاء مسؤولية الوصفات والذكاء الاصطناعي للتفاصيل.",
    },
    {
      q: "هل يتم تخزين قائمة مكوناتي في أي مكان؟",
      a: "لا. لا تُحفظ الطلبات في قاعدة بيانات — راجع سياسة الخصوصية لمعرفة التفاصيل الكاملة حول المعلومات التقنية التي تتم معالجتها.",
    },
    {
      q: "هل يدعم التطبيق لغات أخرى غير الإنجليزية؟",
      a: "نعم — استخدم مبدّل اللغة في الزاوية العلوية لتبديل الواجهة إلى العربية.",
    },
  ],
  exploreLabel: "استكشف",
  collapseLabel: "عرض أقل",
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
  footerBlog: "المدونة",
  footerPrivacy: "سياسة الخصوصية",
  footerTerms: "شروط الاستخدام",
  footerDisclaimer: "إخلاء مسؤولية الوصفات والذكاء الاصطناعي",
  footerContact: "تواصل معنا",
  footerTagline: "الوصفات مُولَّدة بالذكاء الاصطناعي — تحقق دائمًا من المكونات وسلامة الطعام قبل الطهي.",
  backToApp: "→ العودة إلى مولّد الوصفات",
};

const STRINGS: Record<Lang, Strings> = { en, ar };

interface LanguageContextValue {
  lang: Lang;
  t: Strings;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** The homepage language is decided by the URL: "/" is English, "/ar" is Arabic. */
function langForPath(path: string): Lang | null {
  if (path === "/ar") return "ar";
  if (path === "/") return "en";
  return null;
}

/** Other routes (legal pages, blog) fall back to the last homepage language shown. */
function getStoredLang(): Lang {
  try {
    const stored = localStorage.getItem("lang");
    return stored === "ar" || stored === "en" ? stored : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const path = usePathname();
  const urlLang = langForPath(path);
  const lang: Lang = urlLang ?? getStoredLang();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = STRINGS[lang].dir;
    if (urlLang) {
      try {
        localStorage.setItem("lang", urlLang);
      } catch {
        // Storage unavailable (private mode etc.) — the URL still decides the language.
      }
    }
  }, [lang, urlLang]);

  const value = useMemo<LanguageContextValue>(() => ({ lang, t: STRINGS[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
