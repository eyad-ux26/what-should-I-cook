import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../i18n";

interface IngredientInputProps {
  ingredients: string[];
  onChange: (ingredients: string[]) => void;
}

export function IngredientInput({ ingredients, onChange }: IngredientInputProps) {
  const { t } = useLanguage();
  const [draft, setDraft] = useState("");

  const addIngredient = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    if (ingredients.some((i) => i.toLowerCase() === value.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...ingredients, value]);
    setDraft("");
  };

  const removeIngredient = (index: number) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient(draft);
    } else if (e.key === "Backspace" && draft === "" && ingredients.length > 0) {
      removeIngredient(ingredients.length - 1);
    }
  };

  const suggestions = t.examples
    .filter((item) => !ingredients.some((i) => i.toLowerCase() === item.toLowerCase()))
    .slice(0, 4);

  return (
    <div>
      <label htmlFor="ingredient-input" className="mb-2 block text-sm font-semibold text-text">
        {t.ingredientsLabel}
      </label>
      <div className="flex min-h-14 flex-wrap items-center gap-2 rounded-2xl border border-border bg-bg px-3 py-2.5 transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent-soft">
        <AnimatePresence initial={false}>
          {ingredients.map((ingredient, index) => (
            <motion.span
              key={ingredient}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1 rounded-full bg-accent-soft py-1.5 ps-3 pe-2 text-sm font-medium text-accent-hover"
            >
              {ingredient}
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                aria-label={t.removeIngredient(ingredient)}
                className="flex h-5 w-5 items-center justify-center rounded-full text-accent-hover/70 transition-colors hover:bg-accent/20 hover:text-accent-hover"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          id="ingredient-input"
          type="text"
          inputMode="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addIngredient(draft)}
          placeholder={
            ingredients.length === 0
              ? t.ingredientsPlaceholderFirst.replace("{example}", t.examples[0])
              : t.ingredientsPlaceholderMore
          }
          className="min-w-24 flex-1 bg-transparent py-1.5 text-base text-text outline-none placeholder:text-text-muted"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => addIngredient(item)}
              className="suggestion-chip rounded-full px-3 py-1.5 text-xs font-medium"
            >
              + {item}
            </button>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-text-muted">{t.ingredientsHelp}</p>
    </div>
  );
}
