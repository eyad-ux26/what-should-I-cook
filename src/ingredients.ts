export const MAX_INGREDIENTS = 25;
export const MAX_INGREDIENT_LENGTH = 60;

/** English comma, Arabic comma, and line breaks all separate ingredients. */
export const SEPARATOR_PATTERN = /[,،\n\r]/;

/** Splits free text into trimmed, non-empty, length-capped entries. */
export function splitIngredients(text: string): string[] {
  return text
    .split(/[,،\n\r]+/)
    .map((part) => part.trim().slice(0, MAX_INGREDIENT_LENGTH))
    .filter(Boolean);
}

/**
 * Adds every entry in `text` to `current`, skipping case-insensitive
 * duplicates (including duplicates within `text` itself) and stopping at the
 * ingredient limit. Returns `current` unchanged (same reference) if nothing
 * was added.
 */
export function mergeIngredients(current: string[], text: string): string[] {
  const next = [...current];
  for (const entry of splitIngredients(text)) {
    if (next.length >= MAX_INGREDIENTS) break;
    if (next.some((existing) => existing.toLowerCase() === entry.toLowerCase())) continue;
    next.push(entry);
  }
  return next.length === current.length ? current : next;
}
