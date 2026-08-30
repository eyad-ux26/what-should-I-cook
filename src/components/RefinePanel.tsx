import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../i18n";
import type { AllergyTag, CuisineTag, DietTag, TimeBudget } from "../types";

interface RefinePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeBudget: TimeBudget;
  onTimeBudgetChange: (value: TimeBudget) => void;
  diet: DietTag[];
  onDietChange: (value: DietTag[]) => void;
  cuisine: CuisineTag | null;
  onCuisineChange: (value: CuisineTag | null) => void;
  customCuisine: string;
  onCustomCuisineChange: (value: string) => void;
  allergies: AllergyTag[];
  onAllergiesChange: (value: AllergyTag[]) => void;
  customAllergy: string;
  onCustomAllergyChange: (value: string) => void;
  craving: string;
  onCravingChange: (value: string) => void;
}

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
  open,
  onOpenChange,
  timeBudget,
  onTimeBudgetChange,
  diet,
  onDietChange,
  cuisine,
  onCuisineChange,
  customCuisine,
  onCustomCuisineChange,
  allergies,
  onAllergiesChange,
  customAllergy,
  onCustomAllergyChange,
  craving,
  onCravingChange,
}: RefinePanelProps) {
  const { t } = useLanguage();

  const toggleDiet = (value: DietTag) => {
    onDietChange(diet.includes(value) ? diet.filter((d) => d !== value) : [...diet, value]);
  };

  const selectCuisine = (value: CuisineTag) => {
    if (cuisine === value) {
      onCuisineChange(null);
      if (value === "other") onCustomCuisineChange("");
    } else {
      onCuisineChange(value);
      if (value !== "other") onCustomCuisineChange("");
    }
  };

  const toggleAllergy = (value: AllergyTag) => {
    if (allergies.includes(value)) {
      onAllergiesChange(allergies.filter((a) => a !== value));
      if (value === "other") onCustomAllergyChange("");
    } else {
      onAllergiesChange([...allergies, value]);
    }
  };

  const activeCount =
    (timeBudget !== "any" ? 1 : 0) +
    diet.length +
    (cuisine ? 1 : 0) +
    allergies.length +
    (craving.trim() ? 1 : 0);

  return (
    <div className="group rounded-2xl border border-border bg-bg transition-colors hover:border-accent/35">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3.5 text-start transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
      >
        <span className="text-sm font-semibold text-text">
          {t.refineLabel}
          <span className="ms-1.5 font-normal text-text-muted">{t.refineOptional}</span>
          {activeCount > 0 && (
            <span className="ms-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-soft px-1.5 text-xs font-semibold text-accent-hover">
              {activeCount}
            </span>
          )}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.15 }}
          viewBox="0 0 16 16"
          fill="none"
          className={`h-4 w-4 shrink-0 transition-colors ${open ? "text-accent-hover" : "text-text-muted"}`}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t.timeAvailable}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.timeOptions.map((opt) => (
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
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t.dietaryNeeds}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.dietOptions.map((opt) => (
                    <Pill key={opt.value} active={diet.includes(opt.value)} onClick={() => toggleDiet(opt.value)}>
                      {opt.label}
                    </Pill>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t.cuisineLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.cuisineOptions.map((opt) => (
                    <Pill key={opt.value} active={cuisine === opt.value} onClick={() => selectCuisine(opt.value)}>
                      {opt.label}
                    </Pill>
                  ))}
                </div>
                <AnimatePresence initial={false}>
                  {cuisine === "other" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <input
                        type="text"
                        maxLength={80}
                        value={customCuisine}
                        onChange={(e) => onCustomCuisineChange(e.target.value)}
                        placeholder={t.cuisineOtherPlaceholder}
                        className="mt-2.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-4 focus:ring-accent-soft"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {t.allergiesLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.allergyOptions.map((opt) => (
                    <Pill
                      key={opt.value}
                      active={allergies.includes(opt.value)}
                      onClick={() => toggleAllergy(opt.value)}
                    >
                      {opt.label}
                    </Pill>
                  ))}
                </div>
                <AnimatePresence initial={false}>
                  {allergies.includes("other") && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <input
                        type="text"
                        maxLength={80}
                        value={customAllergy}
                        onChange={(e) => onCustomAllergyChange(e.target.value)}
                        placeholder={t.allergyOtherPlaceholder}
                        className="mt-2.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-4 focus:ring-accent-soft"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="craving" className="mb-2 block text-xs font-medium uppercase tracking-wide text-text-muted">
                  {t.moodLabel}
                </label>
                <input
                  id="craving"
                  type="text"
                  maxLength={200}
                  value={craving}
                  onChange={(e) => onCravingChange(e.target.value)}
                  placeholder={t.moodPlaceholder}
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
