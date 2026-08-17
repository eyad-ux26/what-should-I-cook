import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DietTag, TimeBudget } from "../types";

interface RefinePanelProps {
  timeBudget: TimeBudget;
  onTimeBudgetChange: (value: TimeBudget) => void;
  diet: DietTag[];
  onDietChange: (value: DietTag[]) => void;
  craving: string;
  onCravingChange: (value: string) => void;
}

const TIME_OPTIONS: { value: TimeBudget; label: string }[] = [
  { value: "any", label: "Any time" },
  { value: "15", label: "Under 15 min" },
  { value: "30", label: "Under 30 min" },
  { value: "60", label: "Under 1 hr" },
];

const DIET_OPTIONS: { value: DietTag; label: string }[] = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "dairy-free", label: "Dairy-free" },
];

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-accent bg-accent text-white"
          : "border-border bg-surface text-text-muted hover:border-accent/40 hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}

export function RefinePanel({
  timeBudget,
  onTimeBudgetChange,
  diet,
  onDietChange,
  craving,
  onCravingChange,
}: RefinePanelProps) {
  const [open, setOpen] = useState(false);

  const toggleDiet = (value: DietTag) => {
    onDietChange(diet.includes(value) ? diet.filter((d) => d !== value) : [...diet, value]);
  };

  const activeCount = (timeBudget !== "any" ? 1 : 0) + diet.length + (craving.trim() ? 1 : 0);

  return (
    <div
      className="rounded-lg border border-amber-200/80 bg-[#fff3b0] shadow-[0_10px_18px_-10px_rgba(74,47,34,0.5)]"
      style={{ transform: "rotate(0.8deg)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left"
      >
        <span className="font-hand text-xl font-semibold text-text">
          Refine
          <span className="ml-1.5 font-normal text-text-muted">(optional)</span>
          {activeCount > 0 && (
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-soft px-1.5 text-xs font-semibold text-accent-hover">
              {activeCount}
            </span>
          )}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.15 }}
          viewBox="0 0 16 16"
          fill="none"
          className="h-4 w-4 text-text-muted"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-5 px-4 pb-5 pt-1">
              <div>
                <p className="font-note mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                  Time available
                </p>
                <div className="flex flex-wrap gap-2">
                  {TIME_OPTIONS.map((opt) => (
                    <Pill
                      key={opt.value}
                      active={timeBudget === opt.value}
                      onClick={() => onTimeBudgetChange(opt.value)}
                    >
                      {opt.label}
                    </Pill>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-note mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                  Dietary needs
                </p>
                <div className="flex flex-wrap gap-2">
                  {DIET_OPTIONS.map((opt) => (
                    <Pill key={opt.value} active={diet.includes(opt.value)} onClick={() => toggleDiet(opt.value)}>
                      {opt.label}
                    </Pill>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="craving" className="mb-2 block text-xs font-medium uppercase tracking-wide text-text-muted">
                  In the mood for...
                </label>
                <input
                  id="craving"
                  type="text"
                  value={craving}
                  onChange={(e) => onCravingChange(e.target.value)}
                  placeholder="e.g. something spicy, comfort food"
                  className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-4 focus:ring-accent-soft"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
