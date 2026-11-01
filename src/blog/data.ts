import type { Lang } from "../i18n";
import raw from "./articles.json";

export interface CategoryInfo {
  gradient: string;
}

export const CATEGORIES = {
  decide: { gradient: "linear-gradient(135deg, #ffb27a, #ff6a3d)" },
  easy: { gradient: "linear-gradient(135deg, #b39dff, #7c5cff)" },
  pantry: { gradient: "linear-gradient(135deg, #6ee7d8, #14b8a6)" },
  quick: { gradient: "linear-gradient(135deg, #ff8fa8, #e84393)" },
  leftovers: { gradient: "linear-gradient(135deg, #ffd76a, #f5a623)" },
  staples: { gradient: "linear-gradient(135deg, #ffc48a, #e8742c)" },
  vegetarian: { gradient: "linear-gradient(135deg, #a3e635, #16a34a)" },
} as const satisfies Record<string, CategoryInfo>;

export type CategorySlug = keyof typeof CATEGORIES;

interface LocalizedFields {
  title: string;
  /** Longer teaser for the featured-article treatment. */
  dek: string;
  /** Shorter teaser for grid cards / keep-exploring links. */
  excerpt: string;
  description: string;
  keyword: string;
}

/** One article in one language — the shape every blog component consumes. */
export interface ArticleMeta extends LocalizedFields {
  slug: string;
  category: CategorySlug;
  readingMinutes: number;
  datePublished: string;
}

interface RawArticle {
  slug: string;
  category: CategorySlug;
  readingMinutes: number;
  datePublished: string;
  en: LocalizedFields;
  ar: LocalizedFields;
}

// Metadata lives in articles.json so scripts/prerender-routes.mjs reads the
// exact same titles/descriptions that the pages use.
const RAW_ARTICLES = raw.articles as RawArticle[];

export const ARTICLE_SLUGS = RAW_ARTICLES.map((a) => a.slug);

export function getArticles(lang: Lang): ArticleMeta[] {
  return RAW_ARTICLES.map(({ en, ar, ...shared }) => ({ ...shared, ...(lang === "ar" ? ar : en) }));
}

export function getArticle(slug: string, lang: Lang): ArticleMeta | undefined {
  return getArticles(lang).find((a) => a.slug === slug);
}

export function getRelated(slug: string, lang: Lang, count = 3): ArticleMeta[] {
  return getArticles(lang)
    .filter((a) => a.slug !== slug)
    .slice(0, count);
}

export const BLOG_INDEX_SEO: Record<Lang, { title: string; description: string }> = raw.index;

/** Base path of the blog in a language: "/blog" or "/ar/blog". */
export function blogBase(lang: Lang): string {
  return lang === "ar" ? "/ar/blog" : "/blog";
}

export function homePath(lang: Lang): string {
  return lang === "ar" ? "/ar" : "/";
}
