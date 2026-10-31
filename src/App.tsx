import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IngredientInput } from "./components/IngredientInput";
import { RefinePanel } from "./components/RefinePanel";
import { PrimaryButton } from "./components/PrimaryButton";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { RecipeCard } from "./components/RecipeCard";
import { BackgroundIcons } from "./components/BackgroundIcons";
import { InspirationSection } from "./components/InspirationSection";
import { generateRecipes, generateRecipeDetails } from "./api/generateRecipes";
import { LogoMark } from "./components/LogoMark";
import { Footer } from "./components/Footer";
import { useLanguage } from "./i18n";
import { usePathname } from "./routing";
import { useHomepageLinks } from "./useHomepageLinks";
import { mergeIngredients, splitIngredients } from "./ingredients";
import type {
  AllergyTag,
  AppStage,
  CookPreferences,
  CuisineTag,
  DietTag,
  RecipeResult,
  TimeBudget,
} from "./types";

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

/** Real links between the two homepage URLs ("/" and "/ar"); client-side navigation is handled by Root. */
function LanguageSwitch() {
  const { t, lang } = useLanguage();
  const target = lang === "ar" ? "en" : "ar";
  return (
    <a
      href={target === "ar" ? "/ar" : "/"}
      hrefLang={target}
      lang={target}
      className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      {t.languageToggle}
    </a>
  );
}

function HeaderBlogLink() {
  const { t } = useLanguage();
  return (
    <a
      href="/blog"
      hrefLang="en"
      className="inline-flex min-h-10 items-center rounded-full px-3 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      {t.headerBlog}
    </a>
  );
}

/** Bound how many previously-shown recipes we send back as exclusions, to keep prompt size in check. */
const MAX_EXCLUDE_HISTORY = 9;
/** The first generation returns 3; "generate more" adds 3 once, then 1 at a time, up to this total. */
const FIRST_BATCH = 3;
const BIG_BATCH_UNTIL = 6;
const MAX_RECIPES = 9;

const BOTTOM_BAR_CLASS =
  "fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white/85 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(26,18,12,0.1)] backdrop-blur sm:px-6";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function App() {
  const { t, lang } = useLanguage();
  const path = usePathname();
  useHomepageLinks(path);
  const [stage, setStage] = useState<AppStage>("input");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [timeBudget, setTimeBudget] = useState<TimeBudget>("any");
  const [diet, setDiet] = useState<DietTag[]>([]);
  const [cuisine, setCuisine] = useState<CuisineTag | null>(null);
  const [customCuisine, setCustomCuisine] = useState("");
  const [allergies, setAllergies] = useState<AllergyTag[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");
  const [noExtraIngredients, setNoExtraIngredients] = useState(false);
  const [craving, setCraving] = useState("");
  const [results, setResults] = useState<RecipeResult[]>([]);
  const [moreStatus, setMoreStatus] = useState<"idle" | "loading" | "error">("idle");
  const [announcement, setAnnouncement] = useState("");
  const [refineOpen, setRefineOpen] = useState(false);
  const refineSectionRef = useRef<HTMLDivElement>(null);
  const inFlightRef = useRef(false);
  // Bumped whenever results are reset, so a response from a superseded request is ignored.
  const requestIdRef = useRef(0);
  const scrollToHeaderRef = useRef(false);
  const scrollToRecipeIdRef = useRef<string | null>(null);

  // Text typed but not yet added still counts: "Find recipes" adds it first.
  const hasPendingIngredient = splitIngredients(draft).length > 0;
  const canSubmit = (ingredients.length > 0 || hasPendingIngredient) && stage !== "loading";

  const atLimit = results.length >= MAX_RECIPES;
  const nextBatchSize = Math.min(results.length < BIG_BATCH_UNTIL ? 3 : 1, MAX_RECIPES - results.length);

  // Both stages with a fixed bottom bar: Find recipes (input) and Generate more / Start over (results).
  const showBar = stage === "input" || stage === "results";

  // Keep focused controls clear of the fixed bar when the browser scrolls them into view.
  useEffect(() => {
    if (!showBar) return;
    const root = document.documentElement;
    root.style.scrollPaddingBottom = "7rem";
    return () => {
      root.style.scrollPaddingBottom = "";
    };
  }, [showBar]);

  // Scroll to and focus the results header only when a fresh set of results appears.
  const resultsHeaderRef = useCallback((el: HTMLHeadingElement | null) => {
    if (!el || !scrollToHeaderRef.current) return;
    scrollToHeaderRef.current = false;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }, []);

  // After "generate more", bring the first newly added card into view.
  useEffect(() => {
    const id = scrollToRecipeIdRef.current;
    if (!id) return;
    scrollToRecipeIdRef.current = null;
    document
      .getElementById(`recipe-${id}`)
      ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }, [results]);

  const buildPrefs = (ingredientsOverride?: string[]): CookPreferences => ({
    ingredients: ingredientsOverride ?? ingredients,
    timeBudget,
    diet,
    cuisine,
    customCuisine,
    allergies,
    customAllergy,
    craving,
    noExtraIngredients,
    language: lang,
  });

  /** A fresh set of 3 with a clean history. A superseding request (e.g. language switch) cancels any request in flight. */
  const runGeneration = async (options: { ingredients?: string[]; supersede?: boolean } = {}) => {
    if (inFlightRef.current && !options.supersede) return;
    inFlightRef.current = true;
    const requestId = ++requestIdRef.current;
    setMoreStatus("idle");
    setAnnouncement("");
    setStage("loading");
    try {
      const recipes = (await generateRecipes(buildPrefs(options.ingredients), [], FIRST_BATCH)).slice(0, FIRST_BATCH);
      if (requestId !== requestIdRef.current) return;
      scrollToHeaderRef.current = true;
      setResults(recipes);
      setStage("results");
    } catch {
      if (requestId === requestIdRef.current) setStage("error");
    } finally {
      if (requestId === requestIdRef.current) inFlightRef.current = false;
    }
  };

  const handleSubmit = () => {
    if (!canSubmit || inFlightRef.current) return;
    // Use the merged list for this request directly instead of waiting for state to update.
    const finalIngredients = mergeIngredients(ingredients, draft);
    setIngredients(finalIngredients);
    setDraft("");
    void runGeneration({ ingredients: finalIngredients });
  };

  /** Appends new recipes below the existing ones; existing cards are untouched. */
  const handleGenerateMore = async () => {
    if (inFlightRef.current || atLimit || stage !== "results") return;
    inFlightRef.current = true;
    const requestId = requestIdRef.current;
    const count = nextBatchSize;
    setMoreStatus("loading");
    try {
      const history = results.slice(-MAX_EXCLUDE_HISTORY);
      const fetched = (await generateRecipes(buildPrefs(), history, count)).slice(0, count);
      if (requestId !== requestIdRef.current) return;
      const usedIds = new Set(results.map((r) => r.id));
      const added = fetched.map((r, i) => {
        let id = r.id;
        while (usedIds.has(id)) id = `${r.id}-${i}-${usedIds.size}`;
        usedIds.add(id);
        return { ...r, id };
      });
      scrollToRecipeIdRef.current = added[0].id;
      setResults([...results, ...added]);
      setMoreStatus("idle");
      setAnnouncement(t.newRecipesAdded(added.length));
    } catch {
      if (requestId === requestIdRef.current) setMoreStatus("error");
    } finally {
      if (requestId === requestIdRef.current) inFlightRef.current = false;
    }
  };

  const handleEditIngredients = () => {
    setStage("input");
  };

  /** Back to unrestricted defaults for every preference; ingredients and pending text are untouched. */
  const handleClearPreferences = () => {
    setTimeBudget("any");
    setDiet([]);
    setCuisine(null);
    setCustomCuisine("");
    setAllergies([]);
    setCustomAllergy("");
    setNoExtraIngredients(false);
    setCraving("");
  };

  const handleStartOver = () => {
    requestIdRef.current++;
    inFlightRef.current = false;
    setMoreStatus("idle");
    setAnnouncement("");
    setResults([]);
    setIngredients([]);
    setDraft("");
    handleClearPreferences();
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
        void runGeneration({ supersede: true });
      }
    }
  }, [lang]);

  return (
    <div
      className={`relative bg-bg ${
        stage === "input" ? "pb-24 sm:pb-28" : stage === "results" ? (atLimit ? "pb-44" : "pb-32") : ""
      }`}
      style={{ fontFamily: t.fontFamily }}
    >
      <BackgroundIcons />
      <section className="hero-band relative z-10 px-4 pb-28 pt-8 sm:px-6 sm:pb-32 sm:pt-10">
        <div className="hero-glow h-72 w-72 bg-orange-400/30" style={{ top: "-40px", insetInlineStart: "-60px" }} />
        <div className="hero-glow h-80 w-80 bg-pink-500/20" style={{ top: "-60px", insetInlineEnd: "-80px" }} />
        <div className="relative mx-auto w-full max-w-xl">
          <div className="mb-6 flex items-center justify-between gap-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <LogoMark />
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                {t.brand}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <HeaderBlogLink />
              <LanguageSwitch />
            </div>
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

      <div className="relative z-10 mx-auto -mt-20 flex w-full max-w-xl flex-col px-4 pb-10 sm:-mt-24 sm:px-6">
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
                <IngredientInput
                  ingredients={ingredients}
                  onChange={setIngredients}
                  draft={draft}
                  onDraftChange={setDraft}
                />
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
                    noExtraIngredients={noExtraIngredients}
                    onNoExtraIngredientsChange={setNoExtraIngredients}
                    craving={craving}
                    onCravingChange={setCraving}
                    onClear={handleClearPreferences}
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

              <InspirationSection />
            </motion.div>
          )}

          {stage === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingState />
            </motion.div>
          )}

          {stage === "error" && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ErrorState onRetry={() => void runGeneration({ supersede: true })} />
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
                  <h2
                    ref={resultsHeaderRef}
                    tabIndex={-1}
                    className="scroll-mt-4 text-sm font-semibold text-text outline-none focus:outline-none"
                  >
                    {t.resultsCount(results.length)}
                  </h2>
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
                <div key={recipe.id} id={`recipe-${recipe.id}`} className="scroll-mt-4">
                  <RecipeCard recipe={recipe} accentIndex={i} onFetchDetails={handleFetchDetails} />
                </div>
              ))}
              {moreStatus === "loading" && <LoadingState compact />}
              {moreStatus === "error" && (
                <div role="alert" className="panel flex flex-col items-center gap-3 px-5 py-5 text-center">
                  <div>
                    <p className="text-sm font-semibold text-text">{t.errorTitle}</p>
                    <p className="mt-0.5 text-sm text-text-muted">{t.errorSubtitle}</p>
                  </div>
                  <PrimaryButton onClick={() => void handleGenerateMore()} className="px-5 py-2.5 text-sm">
                    {t.tryAgain}
                  </PrimaryButton>
                </div>
              )}
              <div className="sr-only" role="status" aria-live="polite">
                {announcement}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />

      {stage === "input" && (
        <div className={BOTTOM_BAR_CLASS}>
          <div className="mx-auto w-full max-w-xl">
            <PrimaryButton onClick={handleSubmit} disabled={!canSubmit} className="w-full">
              {canSubmit ? t.findRecipes : t.submitEmpty}
            </PrimaryButton>
          </div>
        </div>
      )}

      {stage === "results" && (
        <div className={BOTTOM_BAR_CLASS}>
          <div className="mx-auto w-full max-w-xl">
            {atLimit && <p className="mb-2 text-center text-xs leading-snug text-text-muted">{t.limitReached}</p>}
            <div className="flex items-center gap-2">
              <PrimaryButton
                onClick={() => void handleGenerateMore()}
                disabled={atLimit || moreStatus === "loading"}
                className="min-w-0 flex-1 whitespace-nowrap px-3 text-sm sm:px-6 sm:text-base"
              >
                {results.length < BIG_BATCH_UNTIL ? t.generateMoreThree : t.generateMoreOne}
              </PrimaryButton>
              <button
                type="button"
                onClick={handleStartOver}
                className="min-h-12 shrink-0 rounded-full border border-border bg-surface px-3.5 text-sm font-semibold text-text-muted transition-colors hover:border-accent/40 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                {t.startOver}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
