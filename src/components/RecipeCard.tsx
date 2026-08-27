import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../i18n";
import { CopyButton } from "./CopyButton";
import type { RecipeResult, RecipeStep } from "../types";

interface RecipeCardProps {
  recipe: RecipeResult;
  accentIndex?: number;
  onFetchDetails: (recipe: RecipeResult) => Promise<RecipeStep[]>;
}

const ACCENTS = [
  { bar: "linear-gradient(90deg, #ffb27a, #ff6a3d)", badge: "badge-sunset" },
  { bar: "linear-gradient(90deg, #b39dff, #7c5cff)", badge: "badge-violet" },
  { bar: "linear-gradient(90deg, #6ee7d8, #14b8a6)", badge: "badge-teal" },
  { bar: "linear-gradient(90deg, #ff8fa8, #e84393)", badge: "badge-berry" },
];

function ChefHatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 10.5a4 4 0 0 1 1.2-7.8A4.5 4.5 0 0 1 12 1a4.5 4.5 0 0 1 3.8 1.7A4 4 0 0 1 17 10.5M6.5 10h11v6a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-6ZM9 20h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type DetailsStatus = "idle" | "loading" | "loaded" | "error";

export function RecipeCard({ recipe, accentIndex = 0, onFetchDetails }: RecipeCardProps) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<DetailsStatus>("idle");
  const [steps, setSteps] = useState<RecipeStep[]>([]);
  const [open, setOpen] = useState(false);
  const accent = ACCENTS[accentIndex % ACCENTS.length];

  const handleDetailsClick = async () => {
    if (status === "loaded") {
      setOpen((o) => !o);
      return;
    }
    if (status === "loading") return;

    setStatus("loading");
    try {
      const result = await onFetchDetails(recipe);
      setSteps(result);
      setStatus("loaded");
      setOpen(true);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="recipe-card overflow-hidden" style={{ ["--card-accent" as string]: accent.bar }}>
      <div className="flex flex-col gap-3 px-5 py-5">
        <div className="flex items-start gap-3">
          <div className={`icon-badge ${accent.badge} mt-0.5 h-9 w-9 text-white`}>
            <ChefHatIcon className="h-[18px] w-[18px]" />
          </div>
          <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
            <h3 className="flex-1 text-lg font-semibold leading-snug text-text">{recipe.title}</h3>
            <CopyButton text={recipe.title} label={t.copyTitle} />
          </div>
        </div>

        <div className="flex items-start justify-between gap-2 ps-12">
          <p className="flex-1 text-sm text-text-muted">{recipe.hook}</p>
          <CopyButton text={recipe.hook} label={t.copyHook} />
        </div>

        <div className="flex flex-wrap items-center gap-2 ps-12 text-xs font-medium text-text-muted">
          <span className="inline-flex items-center gap-1 rounded-full bg-bg px-2.5 py-1">
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
              <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 4.5V8l2.5 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {t.minUnit(recipe.timeMinutes)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-bg px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.difficultyLabel[recipe.difficulty]}
          </span>
          <span className="rounded-full bg-bg px-2.5 py-1">{recipe.cuisine}</span>
          {recipe.extraIngredients.length > 0 ? (
            <span className="rounded-full bg-bg px-2.5 py-1">
              {t.moreNeeded(recipe.extraIngredients.length)}
            </span>
          ) : (
            <span className="rounded-full bg-success-soft px-2.5 py-1 text-success">
              {t.haveEverything}
            </span>
          )}
        </div>

        {recipe.extraIngredients.length > 0 && (
          <div className="ps-12">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
              {t.youllAlsoNeed}
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

        <div className="ps-12">
          <button
            type="button"
            onClick={() => void handleDetailsClick()}
            disabled={status === "loading"}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-hover transition-opacity hover:opacity-75 disabled:opacity-60"
          >
            {status === "loading" ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-accent-soft border-t-accent-hover" />
            ) : (
              <motion.svg
                animate={{ rotate: open && status === "loaded" ? 180 : 0 }}
                transition={{ duration: 0.15 }}
                viewBox="0 0 16 16"
                fill="none"
                className="h-3.5 w-3.5"
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            )}
            {status === "loaded" ? (open ? t.hideDetails : t.showDetails) : t.showDetails}
          </button>
          {status === "error" && <p className="mt-1.5 text-xs text-accent-hover">{t.detailsError}</p>}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && status === "loaded" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="px-5 py-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-muted">
                {t.stepsLabel}
              </p>
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-relaxed text-text">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-hover">
                      {index + 1}
                    </span>
                    <span>
                      <span className="font-semibold text-text">{step.title}: </span>
                      <span className="text-text-muted">{step.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
