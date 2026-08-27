import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IngredientInput } from "./components/IngredientInput";
import { RefinePanel } from "./components/RefinePanel";
import { PrimaryButton } from "./components/PrimaryButton";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { RecipeCard } from "./components/RecipeCard";
import { AmbientBackdrop } from "./components/AmbientBackdrop";
import { generateRecipes } from "./mock/generateRecipes";
import type { AppStage, CookPreferences, DietTag, RecipeResult, TimeBudget } from "./types";

function LogoMark() {
  return (
    <div className="icon-badge h-10 w-10 bg-accent text-white shadow-sm">
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M6 3v6.5A2.5 2.5 0 0 0 8.5 12v9M6 3v4M9 3v4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 3c-2.2 1-3.5 3.4-3.5 6 0 2.1 1.1 3.6 2.5 4v8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

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
    <div className="relative min-h-screen">
      <AmbientBackdrop />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 pb-10 pt-10 sm:px-6 sm:pt-14">
        <header className="mb-8">
          <div className="mb-5 flex items-center gap-3">
            <LogoMark />
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">
              What Should I Cook
            </span>
          </div>
          <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-tight text-text sm:text-[42px]">
            Turn what's in your kitchen
            <br />
            into <span className="font-display text-accent">something worth eating</span>
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-text-muted">
            List your ingredients, tell us your constraints, and get recipe ideas built
            around what you already have.
          </p>
        </header>

        <AnimatePresence mode="wait">
          {stage === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="panel flex flex-col gap-5 p-5 pb-28 sm:p-6"
            >
              <IngredientInput ingredients={ingredients} onChange={setIngredients} />
              <RefinePanel
                timeBudget={timeBudget}
                onTimeBudgetChange={setTimeBudget}
                diet={diet}
                onDietChange={setDiet}
                craving={craving}
                onCravingChange={setCraving}
              />
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
              <p className="text-sm font-medium text-text-muted">
                {results.length} idea{results.length !== 1 ? "s" : ""} based on what you've got
              </p>
              {results.map((recipe, i) => (
                <RecipeCard key={recipe.id} recipe={recipe} defaultOpen={i === 0} />
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
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white/85 px-4 py-3 shadow-[0_-8px_24px_rgba(32,26,21,0.08)] backdrop-blur sm:px-6">
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
