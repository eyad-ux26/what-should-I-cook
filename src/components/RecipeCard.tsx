import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { RecipeResult } from "../types";

interface RecipeCardProps {
  recipe: RecipeResult;
  defaultOpen?: boolean;
}

const DIFFICULTY_LABEL: Record<RecipeResult["difficulty"], string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function RecipeCard({ recipe, defaultOpen = false }: RecipeCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full flex-col items-start gap-3 px-5 py-5 text-left"
      >
        <div className="flex w-full items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug text-text">{recipe.title}</h3>
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.15 }}
            viewBox="0 0 16 16"
            fill="none"
            className="mt-1 h-4 w-4 shrink-0 text-text-muted"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>
        <p className="text-sm text-text-muted">{recipe.hook}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-text-muted">
          <span className="inline-flex items-center gap-1 rounded-full bg-bg px-2.5 py-1">
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
              <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 4.5V8l2.5 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {recipe.timeMinutes} min
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-bg px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {DIFFICULTY_LABEL[recipe.difficulty]}
          </span>
          {recipe.extraIngredients.length > 0 ? (
            <span className="rounded-full bg-bg px-2.5 py-1">
              {recipe.extraIngredients.length} more ingredient
              {recipe.extraIngredients.length > 1 ? "s" : ""} needed
            </span>
          ) : (
            <span className="rounded-full bg-success-soft px-2.5 py-1 text-success">
              You have everything
            </span>
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="space-y-5 px-5 py-5">
              {recipe.extraIngredients.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                    You'll also need
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {recipe.extraIngredients.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-text"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                  Steps
                </p>
                <ol className="space-y-3">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex gap-3 text-sm leading-relaxed text-text">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-hover">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
