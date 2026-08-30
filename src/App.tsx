import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IngredientInput } from "./components/IngredientInput";
import { RefinePanel } from "./components/RefinePanel";
import { PrimaryButton } from "./components/PrimaryButton";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { RecipeCard } from "./components/RecipeCard";
import { BackgroundIcons } from "./components/BackgroundIcons";
import { generateRecipes, generateRecipeDetails } from "./api/generateRecipes";
import { useLanguage } from "./i18n";
import type {
  AllergyTag,
  AppStage,
  CookPreferences,
  CuisineTag,
  DietTag,
  RecipeResult,
  TimeBudget,
} from "./types";

function LogoMark() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo-256.png`}
      alt="What Should I Cook"
      className="h-9 w-9 rounded-[10px] shadow-sm"
      width={36}
      height={36}
    />
  );
}

const STEP_BADGES = ["badge-sunset", "badge-violet", "badge-teal"];

const STEP_ICONS: React.ReactNode[] = [
  <Fragment key="ingredients">
    <path
      d="M5 10h14l-1.4 8.4a2 2 0 0 1-2 1.6H8.4a2 2 0 0 1-2-1.6L5 10Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 10h17M9 10 8 6M15 10l1-4M10.2 13.5v4M13.8 13.5v4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </Fragment>,
  <path key="prefs" d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  <path
    key="recipes"
    d="M12 3v18M4 8l8-5 8 5M4 8v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
];

function LanguageToggle() {
  const { t, toggleLang } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLang}
      className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur transition-colors hover:bg-white/20"
    >
      {t.languageToggle}
    </button>
  );
}

/** Bound how many previously-shown recipes we send back as exclusions, to keep prompt size in check. */
const MAX_EXCLUDE_HISTORY = 9;

function App() {
  const { t, lang } = useLanguage();
  const [stage, setStage] = useState<AppStage>("input");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [timeBudget, setTimeBudget] = useState<TimeBudget>("any");
  const [diet, setDiet] = useState<DietTag[]>([]);
  const [cuisine, setCuisine] = useState<CuisineTag | null>(null);
  const [customCuisine, setCustomCuisine] = useState("");
  const [allergies, setAllergies] = useState<AllergyTag[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");
  const [craving, setCraving] = useState("");
  const [results, setResults] = useState<RecipeResult[]>([]);
  const [shownRecipes, setShownRecipes] = useState<RecipeResult[]>([]);
  const [refineOpen, setRefineOpen] = useState(false);
  const refineSectionRef = useRef<HTMLDivElement>(null);

  const canSubmit = ingredients.length > 0 && stage !== "loading";

  const buildPrefs = (): CookPreferences => ({
    ingredients,
    timeBudget,
    diet,
    cuisine,
    customCuisine,
    allergies,
    customAllergy,
    craving,
    language: lang,
  });

  const runGeneration = async (options: { resetHistory?: boolean } = {}) => {
    setStage("loading");
    const history = options.resetHistory ? [] : shownRecipes.slice(-MAX_EXCLUDE_HISTORY);
    try {
      const recipes = await generateRecipes(buildPrefs(), history);
      setResults(recipes);
      setShownRecipes([...history, ...recipes]);
      setStage("results");
    } catch {
      setStage("error");
    }
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    void runGeneration({ resetHistory: true });
  };

  const handleGenerateMore = () => {
    void runGeneration();
  };

  const handleEditIngredients = () => {
    setStage("input");
  };

  const handleStartOver = () => {
    setResults([]);
    setShownRecipes([]);
    setIngredients([]);
    setTimeBudget("any");
    setDiet([]);
    setCuisine(null);
    setCustomCuisine("");
    setAllergies([]);
    setCustomAllergy("");
    setCraving("");
    setRefineOpen(false);
    setStage("input");
  };

  const handleFetchDetails = (recipe: RecipeResult) => generateRecipeDetails(buildPrefs(), recipe);

  const handleAddIngredientsCardClick = () => {
    const input = document.getElementById("ingredient-input") as HTMLInputElement | null;
    if (!input) return;
    input.focus({ preventScroll: true });
    input.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSetPreferencesCardClick = () => {
    setRefineOpen(true);
    refineSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // The generated recipes are plain text in whatever language was active at
  // request time. If the user switches language after results are already
  // showing, regenerate so the content actually matches the new language.
  const prevLangRef = useRef(lang);
  useEffect(() => {
    if (prevLangRef.current !== lang) {
      prevLangRef.current = lang;
      if (stage === "results") {
        void runGeneration({ resetHistory: true });
      }
    }
  }, [lang]);

  return (
    <div className="relative min-h-screen bg-bg" style={{ fontFamily: t.fontFamily }}>
      <BackgroundIcons />
      <section className="hero-band relative z-10 px-4 pb-28 pt-8 sm:px-6 sm:pb-32 sm:pt-10">
        <div className="hero-glow h-72 w-72 bg-orange-400/30" style={{ top: "-40px", insetInlineStart: "-60px" }} />
        <div className="hero-glow h-80 w-80 bg-pink-500/20" style={{ top: "-60px", insetInlineEnd: "-80px" }} />
        <div className="relative mx-auto w-full max-w-xl">
          <div className="mb-6 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                {t.brand}
              </span>
            </div>
            <LanguageToggle />
          </div>
          <h1 className="text-[36px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-[46px]">
            {t.headlinePrefix}{" "}
            <span
              className={`gradient-text ${lang === "en" ? "font-display" : "font-extrabold"}`}
              style={{ fontSize: "1.12em" }}
            >
              {t.headlineAccent}
            </span>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">{t.subtitle}</p>
        </div>
      </section>

      <div
        className={`relative z-10 mx-auto -mt-20 flex w-full max-w-xl flex-col px-4 sm:-mt-24 sm:px-6 ${
          stage === "input" ? "pb-32 sm:pb-36" : "pb-10"
        }`}
      >
        <AnimatePresence mode="wait">
          {stage === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div className="console-card flex flex-col gap-5 p-5 sm:p-6">
                <IngredientInput ingredients={ingredients} onChange={setIngredients} />
                <div ref={refineSectionRef}>
                  <RefinePanel
                    open={refineOpen}
                    onOpenChange={setRefineOpen}
                    timeBudget={timeBudget}
                    onTimeBudgetChange={setTimeBudget}
                    diet={diet}
                    onDietChange={setDiet}
                    cuisine={cuisine}
                    onCuisineChange={setCuisine}
                    customCuisine={customCuisine}
                    onCustomCuisineChange={setCustomCuisine}
                    allergies={allergies}
                    onAllergiesChange={setAllergies}
                    customAllergy={customAllergy}
                    onCustomAllergyChange={setCustomAllergy}
                    craving={craving}
                    onCravingChange={setCraving}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {t.steps.map((step, i) => {
                  const onClick =
                    i === 0
                      ? handleAddIngredientsCardClick
                      : i === 1
                        ? handleSetPreferencesCardClick
                        : undefined;
                  return (
                    <button
                      key={step.label}
                      type="button"
                      onClick={onClick}
                      disabled={!onClick}
                      className={`panel flex flex-col gap-2.5 p-4 text-start transition-colors ${
                        onClick ? "cursor-pointer hover:border-accent/35 hover:bg-surface" : "cursor-default"
                      }`}
                    >
                      <div className={`icon-badge ${STEP_BADGES[i]} h-8 w-8 text-white`}>
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                          {STEP_ICONS[i]}
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text">{step.label}</p>
                        <p className="mt-0.5 text-xs leading-snug text-text-muted">{step.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {stage === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingState />
            </motion.div>
          )}

          {stage === "error" && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ErrorState onRetry={handleGenerateMore} />
            </motion.div>
          )}

          {stage === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3"
            >
              <div className="console-card flex flex-col gap-3 px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-text">{t.resultsCount(results.length)}</p>
                  <button
                    type="button"
                    onClick={handleEditIngredients}
                    className="text-sm font-semibold text-accent-hover transition-opacity hover:opacity-75"
                  >
                    {t.editIngredients}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-hover"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
              {results.map((recipe, i) => (
                <RecipeCard key={recipe.id} recipe={recipe} accentIndex={i} onFetchDetails={handleFetchDetails} />
              ))}
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleGenerateMore}
                  className="flex-1 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-text shadow-sm transition-colors hover:border-accent/40"
                >
                  {t.generateMore}
                </button>
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="flex-1 rounded-full px-5 py-3 text-sm font-semibold text-text-muted transition-colors hover:text-text"
                >
                  {t.startOver}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {stage === "input" && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white/85 px-4 py-3 shadow-[0_-8px_24px_rgba(26,18,12,0.1)] backdrop-blur sm:px-6">
          <div className="mx-auto w-full max-w-xl">
            <PrimaryButton onClick={handleSubmit} disabled={!canSubmit} className="w-full">
              {ingredients.length === 0 ? t.submitEmpty : t.submitReady}
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
