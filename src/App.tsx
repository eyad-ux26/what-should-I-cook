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
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 pb-8 pt-8 sm:px-6">
        <header className="mb-6">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-text sm:text-[32px]">
            What should I cook?
          </h1>
          <p className="mt-1.5 text-[15px] text-text-muted">
            Tell us what's in your kitchen and we'll figure out dinner.
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
              className="flex flex-col gap-4 pb-24"
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
              <p className="text-sm text-text-muted">
                {results.length} idea{results.length !== 1 ? "s" : ""} based on what you've got
              </p>
              {results.map((recipe, i) => (
                <RecipeCard key={recipe.id} recipe={recipe} defaultOpen={i === 0} />
              ))}
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="flex-1 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-accent/40"
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
        <div className="fixed inset-x-0 bottom-0 border-t border-border bg-bg/95 px-4 py-3 backdrop-blur sm:px-6">
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
