import { useEffect } from "react";

const SITE_URL = "https://what-should-i-cook.com";
const SITE_IMAGE = `${SITE_URL}/og-image.png`;

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

function upsertMeta(attr: "name" | "property", key: string, content: string): () => void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const existed = !!el;
  const previous = el?.getAttribute("content") ?? null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return () => {
    if (!existed) {
      el?.remove();
    } else if (previous !== null) {
      el?.setAttribute("content", previous);
    }
  };
}

function upsertCanonical(href: string): () => void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const existed = !!el;
  const previous = el?.getAttribute("href") ?? null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return () => {
    if (!existed) {
      el?.remove();
    } else if (previous !== null) {
      el?.setAttribute("href", previous);
    }
  };
}

/**
 * Sets document title + meta description/canonical/OG/Twitter tags for the
 * lifetime of the mounted page, restoring whatever was there before on
 * unmount. Safe for a client-rendered SPA with no per-route server render —
 * every cleanup restores the previous value (or removes the tag if it
 * didn't exist), so navigating between pages never leaks stale metadata.
 */
export function useSeo({ title, description, path, type = "article" }: SeoOptions): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    const url = `${SITE_URL}${path}`;

    const cleanups = [
      upsertMeta("name", "description", description),
      upsertCanonical(url),
      upsertMeta("property", "og:type", type),
      upsertMeta("property", "og:url", url),
      upsertMeta("property", "og:title", title),
      upsertMeta("property", "og:description", description),
      upsertMeta("property", "og:image", SITE_IMAGE),
      upsertMeta("name", "twitter:title", title),
      upsertMeta("name", "twitter:description", description),
    ];

    return () => {
      document.title = previousTitle;
      cleanups.forEach((fn) => fn());
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
