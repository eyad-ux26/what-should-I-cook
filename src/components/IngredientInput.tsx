import { useEffect, useRef, useState, type ClipboardEvent, type ChangeEvent, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../i18n";
import { mergeIngredients, splitIngredients, MAX_INGREDIENT_LENGTH, SEPARATOR_PATTERN } from "../ingredients";

interface IngredientInputProps {
  ingredients: string[];
  onChange: (ingredients: string[]) => void;
  /** Text typed but not yet added as an ingredient. Owned by the parent so "Find recipes" can include it. */
  draft: string;
  onDraftChange: (draft: string) => void;
}

const TYPE_SPEED_MS = 55;
const DELETE_SPEED_MS = 30;
const HOLD_MS = 1300;
const GAP_MS = 400;

function useTypewriter(examples: string[], enabled: boolean): string {
  const [text, setText] = useState("");
  const reducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!enabled || examples.length === 0) {
      setText("");
      return;
    }
    if (reducedMotion.current) {
      setText(examples[0]);
      return;
    }

    let exampleIndex = 0;
    let charIndex = 0;
    let phase: "typing" | "holding" | "deleting" | "gap" = "typing";
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = examples[exampleIndex];

      if (phase === "typing") {
        charIndex++;
        setText(current.slice(0, charIndex));
        if (charIndex >= current.length) {
          phase = "holding";
          timeoutId = setTimeout(tick, HOLD_MS);
        } else {
          timeoutId = setTimeout(tick, TYPE_SPEED_MS);
        }
        return;
      }

      if (phase === "holding") {
        phase = "deleting";
        timeoutId = setTimeout(tick, DELETE_SPEED_MS);
        return;
      }

      if (phase === "deleting") {
        charIndex--;
        setText(current.slice(0, charIndex));
        if (charIndex <= 0) {
          phase = "gap";
          exampleIndex = (exampleIndex + 1) % examples.length;
          timeoutId = setTimeout(tick, GAP_MS);
        } else {
          timeoutId = setTimeout(tick, DELETE_SPEED_MS);
        }
        return;
      }

      // gap
      phase = "typing";
      timeoutId = setTimeout(tick, TYPE_SPEED_MS);
    };

    timeoutId = setTimeout(tick, TYPE_SPEED_MS);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, examples]);

  return text;
}

export function IngredientInput({
  ingredients,
  onChange,
  draft,
  onDraftChange,
}: IngredientInputProps) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const animatedExample = useTypewriter(t.typingExamples, ingredients.length === 0 && draft === "");
  const canAdd = splitIngredients(draft).length > 0;

  /** Adds everything in the input (it may hold several comma-separated entries), clears it, keeps focus. */
  const commitDraft = () => {
    if (!canAdd) return;
    onChange(mergeIngredients(ingredients, draft));
    onDraftChange("");
    inputRef.current?.focus();
  };

  const removeIngredient = (index: number) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" || e.key === "," || e.key === "،") {
      e.preventDefault();
      commitDraft();
    } else if (e.key === "Backspace" && draft === "" && ingredients.length > 0) {
      removeIngredient(ingredients.length - 1);
    }
  };

  // Some mobile keyboards don't report a usable key for "," / "،" on keydown,
  // so a separator can also arrive through the input value itself.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!SEPARATOR_PATTERN.test(value)) {
      onDraftChange(value);
      return;
    }
    const parts = value.split(SEPARATOR_PATTERN);
    const remainder = parts.pop() ?? "";
    onChange(mergeIngredients(ingredients, parts.join(",")));
    onDraftChange(remainder.trimStart());
  };

  // Pasting "tomato, cucumber" (or Arabic "طماطم، خيار") adds each entry as its
  // own ingredient. Plain pastes without a separator behave normally.
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text");
    if (!SEPARATOR_PATTERN.test(pasted)) return;
    e.preventDefault();
    const el = e.currentTarget;
    const before = draft.slice(0, el.selectionStart ?? draft.length);
    const after = draft.slice(el.selectionEnd ?? draft.length);
    onChange(mergeIngredients(ingredients, before + pasted + after));
    onDraftChange("");
  };

  const suggestions = t.examples
    .filter((item) => !ingredients.some((i) => i.toLowerCase() === item.toLowerCase()))
    .slice(0, 4);

  const placeholder =
    ingredients.length === 0
      ? t.ingredientsPlaceholderFirst.replace("{example}", animatedExample)
      : t.ingredientsPlaceholderMore;

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
              className="flex items-center gap-1 rounded-full bg-accent-soft py-1.5 ps-3 pe-2 text-sm font-medium text-text"
            >
              <bdi>{ingredient}</bdi>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                aria-label={t.removeIngredient(ingredient)}
                className="flex h-5 w-5 items-center justify-center rounded-full text-text/70 transition-colors hover:bg-accent/20 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
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
          ref={inputRef}
          id="ingredient-input"
          type="text"
          inputMode="text"
          maxLength={MAX_INGREDIENT_LENGTH}
          value={draft}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          aria-describedby="ingredient-help"
          className="min-w-24 flex-1 bg-transparent py-1.5 text-base text-text outline-none placeholder:text-text-muted"
        />
        <button
          type="button"
          onClick={commitDraft}
          disabled={!canAdd}
          className="ms-auto shrink-0 rounded-full bg-accent-soft px-4 py-1.5 text-sm font-semibold text-text transition-colors hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-accent-soft"
        >
          {t.addIngredient}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onChange(mergeIngredients(ingredients, item))}
              className="suggestion-chip rounded-full px-3 py-1.5 text-xs font-medium"
            >
              + {item}
            </button>
          ))}
        </div>
      )}

      <p id="ingredient-help" className="mt-3 text-xs leading-relaxed text-text-muted">
        {t.ingredientsHelp}
      </p>
    </div>
  );
}
