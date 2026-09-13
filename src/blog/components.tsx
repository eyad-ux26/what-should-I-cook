import type { ReactNode } from "react";
import { CATEGORIES, ARTICLES, type ArticleMeta } from "./data";
import { ArrowIcon, ClockIcon, CATEGORY_ICONS } from "./icons";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-hover">{children}</p>
  );
}

/** Decorative editorial header banner — a large watermark icon over a soft
 * category-tinted panel. Relates visually to the article's topic without
 * needing (or faking) real photography. */
export function CategoryBanner({ category }: { category: ArticleMeta["category"] }) {
  const info = CATEGORIES[category];
  const Icon = CATEGORY_ICONS[category];
  return (
    <div
      aria-hidden="true"
      className="relative mt-8 flex h-40 items-center justify-center overflow-hidden rounded-3xl border border-border sm:h-48"
      style={{ background: `linear-gradient(135deg, ${info.gradient.match(/#[0-9a-f]{3,6}/gi)?.[0]}14, var(--color-bg))` }}
    >
      <Icon className="h-20 w-20 -rotate-6 text-text opacity-[0.08] sm:h-28 sm:w-28" />
      <span
        className="absolute -bottom-8 -end-8 h-32 w-32 rounded-full opacity-[0.12] sm:h-40 sm:w-40"
        style={{ background: info.gradient }}
      />
      <span
        className="absolute -start-6 -top-6 h-20 w-20 rounded-full opacity-[0.1]"
        style={{ background: info.gradient }}
      />
    </div>
  );
}

export function CategoryBadge({ category }: { category: ArticleMeta["category"] }) {
  const info = CATEGORIES[category];
  const Icon = CATEGORY_ICONS[category];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
      style={{ background: info.gradient }}
    >
      <Icon className="h-3 w-3" />
      {info.label}
    </span>
  );
}

export function ArticleMetaRow({ article }: { article: ArticleMeta }) {
  const date = new Date(article.datePublished + "T00:00:00");
  const formatted = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return (
    <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
      <ClockIcon className="h-3.5 w-3.5" />
      <span>{article.readingMinutes} min read</span>
      <span aria-hidden="true">·</span>
      <time dateTime={article.datePublished}>{formatted}</time>
    </div>
  );
}

/* ---------- Article prose primitives ---------- */

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-2 text-[22px] font-extrabold leading-tight text-text sm:text-2xl">{children}</h2>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-1 text-lg font-bold text-text">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[16px] leading-[1.75] text-text-muted">{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 ps-5 text-[16px] leading-[1.75] text-text-muted">{children}</ul>;
}

export function Ol({ children }: { children: ReactNode }) {
  return <ol className="list-decimal space-y-2 ps-5 text-[16px] leading-[1.75] text-text-muted">{children}</ol>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-text">{children}</strong>;
}

export function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="font-semibold text-accent-hover underline underline-offset-2 hover:opacity-75">
      {children}
    </a>
  );
}

/** Simple responsive table wrapper — horizontal scroll on narrow screens, never overflow. */
export function ArticleTable({ head, rows }: { head: string[]; rows: (string | ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="bg-bg">
            {head.map((h) => (
              <th key={h} className="border-b border-border px-3.5 py-2.5 text-start font-semibold text-text">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-3.5 py-2.5 align-top text-text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Compact "idea" block: description, ingredient chips, time + variation line. Used for scannable idea lists (easy/quick dinner articles). */
export function IdeaBlock({
  ingredients,
  time,
  variation,
  children,
}: {
  ingredients: string[];
  time: string;
  variation: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <P>{children}</P>
      <IngredientChips items={ingredients} />
      <p className="text-sm text-text-muted">
        <Strong>Time:</Strong> {time} · <Strong>Easy variation:</Strong> {variation}
      </p>
    </div>
  );
}

export function IngredientChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-medium text-text">
          {item}
        </span>
      ))}
    </div>
  );
}

/* ---------- Callouts ---------- */

const CALLOUT_STYLES = {
  tip: { label: "Good to know", accent: "#14b8a6", soft: "#e4f9f5" },
  try: { label: "Try this", accent: "#ff6a3d", soft: "var(--color-accent-soft)" },
} as const;

export function Callout({ variant, children }: { variant: "tip" | "try"; children: ReactNode }) {
  const style = CALLOUT_STYLES[variant];
  return (
    <div
      className="flex flex-col gap-1 rounded-2xl border px-5 py-4"
      style={{ borderColor: style.accent + "33", background: style.soft }}
    >
      <p className="text-xs font-bold uppercase tracking-wide" style={{ color: style.accent }}>
        {style.label}
      </p>
      <div className="text-[15px] leading-relaxed text-text">{children}</div>
    </div>
  );
}

/** "Protein + Carb + Vegetable + Flavor" style formula block. */
export function FormulaBlock({ title, parts }: { title: string; parts: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <Eyebrow>{title}</Eyebrow>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {parts.map((part, i) => (
          <span key={part} className="contents">
            <span className="rounded-xl bg-bg px-3.5 py-2 text-sm font-bold text-text">{part}</span>
            {i < parts.length - 1 && (
              <span className="text-lg font-bold text-accent" aria-hidden="true">
                +
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Numbered "quick decision" box. */
export function QuickDecisionBox({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <Eyebrow>{title}</Eyebrow>
      <ol className="mt-3 flex flex-col gap-2.5">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-text">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent-hover">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Tasteful CTA back to the generator — a helpful next step, not an ad. */
export function GeneratorCta({ prompt = "Still not sure what to make?" }: { prompt?: string }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-accent/20 bg-accent-soft px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <p className="font-bold text-text">{prompt}</p>
        <p className="mt-0.5 text-sm text-text-muted">
          Tell us what ingredients you have and we'll help you find an idea.
        </p>
      </div>
      <a
        href="/"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        What should I cook?
        <ArrowIcon className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

export function KeepExploring({ currentSlug }: { currentSlug: string }) {
  const related = ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, 3);
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow>Keep exploring</Eyebrow>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {related.map((a) => {
          const info = CATEGORIES[a.category];
          return (
            <a
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span
                className="h-1.5 w-8 rounded-full"
                style={{ background: info.gradient }}
                aria-hidden="true"
              />
              <span className="text-sm font-bold leading-snug text-text">{a.title}</span>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-accent-hover">
                Read article
                <ArrowIcon className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
