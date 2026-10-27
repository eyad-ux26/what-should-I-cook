import { useEffect } from "react";

const SITE_URL = "https://what-should-i-cook.com";
const SITE_IMAGE = `${SITE_URL}/og-image.png`;

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

const DEFAULT_TITLE = "What Should I Cook?";
const DEFAULT_DESCRIPTION =
  "List your ingredients, tell us your preferences, and get AI-generated recipe ideas built around what you already have.";

// Homepage values from index.html. Pages are served with their own
// prerendered <head> (see scripts/prerender-routes.mjs), so "restore whatever
// was there before" would leak a blog page's tags onto the homepage —
// restore these fixed defaults instead.
const DEFAULT_META: [attr: "name" | "property", key: string, content: string][] = [
  ["name", "description", DEFAULT_DESCRIPTION],
  ["property", "og:type", "website"],
  ["property", "og:url", `${SITE_URL}/`],
  ["property", "og:title", DEFAULT_TITLE],
  ["property", "og:description", DEFAULT_DESCRIPTION],
  ["property", "og:image", SITE_IMAGE],
  ["name", "twitter:title", DEFAULT_TITLE],
  ["name", "twitter:description", DEFAULT_DESCRIPTION],
];

function setMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string | null): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (href === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets document title + meta description/canonical/OG/Twitter tags for the
 * lifetime of the mounted page, and puts the homepage defaults back on
 * unmount (the next routed page that calls this hook overrides them again).
 */
export function useSeo({ title, description, path, type = "article" }: SeoOptions): void {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setCanonical(url);
    setMeta("name", "description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", SITE_IMAGE);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    return () => {
      document.title = DEFAULT_TITLE;
      setCanonical(null);
      for (const [attr, key, content] of DEFAULT_META) setMeta(attr, key, content);
    };
  }, [title, description, path, type]);
}

/**
 * Injects a JSON-LD <script> for the lifetime of the mounted page. Only
 * ever describes what's actually visible on the page — no invented
 * ratings, authors, or images.
 */
export function useJsonLd(data: object): void {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [data]);
}

export function siteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export { SITE_URL, SITE_IMAGE };
