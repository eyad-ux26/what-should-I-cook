import { useEffect } from "react";
import { HOME_SEO } from "./blog/data";

const SITE_URL = "https://what-should-i-cook.com";

const ALTERNATES: { hreflang: string; href: string }[] = [
  { hreflang: "en", href: `${SITE_URL}/` },
  { hreflang: "ar", href: `${SITE_URL}/ar` },
  { hreflang: "x-default", href: `${SITE_URL}/` },
];

function upsertLink(selector: string, attrs: Record<string, string>): void {
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
}

/** Title + description (and their Open Graph / Twitter copies) for one homepage language. */
function setTitleAndDescription({ title, description }: { title: string; description: string }): void {
  document.title = title;
  const set = (selector: string, value: string) => document.head.querySelector(selector)?.setAttribute("content", value);
  set('meta[name="description"]', description);
  set('meta[property="og:title"]', title);
  set('meta[property="og:description"]', description);
  set('meta[name="twitter:title"]', title);
  set('meta[name="twitter:description"]', description);
}

/**
 * Keeps the title, description, canonical URL and en/ar/x-default alternates correct for the two
 * homepage routes ("/" and "/ar") across client-side navigation. The first
 * page load already has these tags in its static HTML (see
 * scripts/prerender-routes.mjs); this updates the same elements in place
 * rather than adding more, and removes them when leaving the homepage so
 * other pages never inherit them.
 */
export function useHomepageLinks(path: string): void {
  useEffect(() => {
    if (path !== "/" && path !== "/ar") return;
    const url = path === "/ar" ? `${SITE_URL}/ar` : `${SITE_URL}/`;

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: url });
    for (const { hreflang, href } of ALTERNATES) {
      upsertLink(`link[rel="alternate"][hreflang="${hreflang}"]`, { rel: "alternate", hreflang, href });
    }
    document.head.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    setTitleAndDescription(HOME_SEO[path === "/ar" ? "ar" : "en"]);

    return () => {
      setTitleAndDescription(HOME_SEO.en);
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
      document.head.querySelector('meta[property="og:url"]')?.setAttribute("content", `${SITE_URL}/`);
    };
  }, [path]);
}
