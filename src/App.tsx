import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IngredientInput } from "./components/IngredientInput";
import { RefinePanel } from "./components/RefinePanel";
import { PrimaryButton } from "./components/PrimaryButton";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { RecipeCard } from "./components/RecipeCard";
import { generateRecipes } from "./mock/generateRecipes";
import type { AppStage, CookPreferences, DietTag, RecipeResult, TimeBudget } from "./types";

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

const STEPS: { label: string; desc: string; badge: string; icon: React.ReactNode }[] = [
  {
    label: "Add ingredients",
    desc: "Whatever's in the fridge",
    badge: "badge-sunset",
    icon: (
      <>
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
      </>
    ),
  },
  {
    label: "Set preferences",
    desc: "Time, diet, cravings",
    badge: "badge-violet",
    icon: (
      <path
        d="M4 6h16M4 12h10M4 18h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
  {
    label: "Get recipes",
    desc: "Matched to your pantry",
    badge: "badge-teal",
    icon: (
      <path
        d="M12 3v18M4 8l8-5 8 5M4 8v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

function App() {
  const [stage, setStage] = useState<AppStage>("input");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [timeBudget, setTimeBudget] = useState<TimeBudget>("any");
  const [diet, setDiet] = useState<DietTag[]>([]);
  const [craving, setCraving] = useState("");
  const [results, setResults] = useState<RecipeResult[]>([]);

  const canSubmit = ingredients.length > 0 && stage !== "loading";

  const runGeneration = async (prefs: CookPreferences) => {
    setStage("loading");
    try {
      const recipes = await generateRecipes(prefs);
      setResults(recipes);
      setStage("results");
    } catch {
      setStage("error");
    }
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    void runGeneration({ ingredients, timeBudget, diet, craving });
  };

  const handleStartOver = () => {
    setResults([]);
    setStage("input");
  };

  const handleRetry = () => {
    void runGeneration({ ingredients, timeBudget, diet, craving });
  };

  return (
    <div className="min-h-screen bg-bg">
      <section className="hero-band px-4 pb-28 pt-8 sm:px-6 sm:pb-32 sm:pt-10">
        <div className="hero-glow h-72 w-72 bg-orange-400/30" style={{ top: "-40px", left: "-60px" }} />
        <div className="hero-glow h-80 w-80 bg-pink-500/20" style={{ top: "-60px", right: "-80px" }} />
        <div className="relative mx-auto w-full max-w-xl">
          <div className="mb-6 flex items-center gap-2.5">
            <LogoMark />
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
              What Should I Cook
            </span>
          </div>
          <h1 className="text-[36px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[46px]">
            Turn what's in your kitchen into{" "}
            <span className="font-display gradient-text">something worth eating</span>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
            List your ingredients, tell us your constraints, and get recipe ideas built
            around what you already have.
          </p>
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
                <RefinePanel
                  timeBudget={timeBudget}
                  onTimeBudgetChange={setTimeBudget}
                  diet={diet}
                  onDietChange={setDiet}
                  craving={craving}
                  onCravingChange={setCraving}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {STEPS.map((step) => (
                  <div key={step.label} className="panel flex flex-col gap-2.5 p-4">
                    <div className={`icon-badge ${step.badge} h-8 w-8 text-white`}>
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        {step.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text">{step.label}</p>
                      <p className="mt-0.5 text-xs leading-snug text-text-muted">{step.desc}</p>
                    </div>
                  </div>
                ))}
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
              <ErrorState onRetry={handleRetry} />
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
              <div className="console-card flex items-center justify-between gap-3 px-5 py-4">
                <p className="text-sm font-semibold text-text">
                  {results.length} idea{results.length !== 1 ? "s" : ""} based on what you've got
                </p>
              </div>
              {results.map((recipe, i) => (
                <RecipeCard key={recipe.id} recipe={recipe} defaultOpen={i === 0} accentIndex={i} />
              ))}
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="flex-1 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-text shadow-sm transition-colors hover:border-accent/40"
                >
                  Show different ideas
                </button>
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="flex-1 rounded-full px-5 py-3 text-sm font-semibold text-text-muted transition-colors hover:text-text"
                >
                  Start over
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
              {ingredients.length === 0 ? "Add an ingredient to start" : "Find something to cook"}
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
