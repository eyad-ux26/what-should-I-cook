import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface IngredientInputProps {
  ingredients: string[];
  onChange: (ingredients: string[]) => void;
}

const EXAMPLES = ["chicken thighs", "rice", "bell pepper", "eggs"];

export function IngredientInput({ ingredients, onChange }: IngredientInputProps) {
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

  return (
    <div className="paper-note px-4 pb-4 pt-6 sm:px-6">
      <span
        className="washi-tape -top-3 left-6 -rotate-6 bg-[repeating-linear-gradient(135deg,#f6a19a,#f6a19a_8px,#f2897f_8px,#f2897f_16px)]"
        aria-hidden="true"
      />
      <span
        className="washi-tape -right-2 top-2 rotate-12 bg-[repeating-linear-gradient(135deg,#9fd0a8,#9fd0a8_8px,#89c295_8px,#89c295_16px)] hidden sm:block"
        aria-hidden="true"
      />
      <label htmlFor="ingredient-input" className="font-hand mb-1 block text-2xl font-semibold text-text">
        What's in your kitchen?
      </label>
      <div className="flex min-h-14 flex-wrap items-center gap-2 rounded-xl border border-transparent bg-transparent px-1 py-2 transition-colors focus-within:border-accent/40">
        <AnimatePresence initial={false}>
          {ingredients.map((ingredient, index) => (
            <motion.span
              key={ingredient}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="font-note flex items-center gap-1 rounded-full bg-accent-soft py-1.5 pl-3 pr-2 text-base font-medium text-accent-hover"
            >
              {ingredient}
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                aria-label={`Remove ${ingredient}`}
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
          placeholder={ingredients.length === 0 ? `e.g. ${EXAMPLES[0]}` : "Add another..."}
          className="font-note min-w-24 flex-1 bg-transparent py-1.5 text-lg text-text outline-none placeholder:text-text-muted"
        />
      </div>
      <p className="font-note mt-1 text-sm text-text-muted">
        Press Enter or comma to add each ingredient.
      </p>
    </div>
  );
}
