import { useCallback, useEffect } from "react";
import App from "./App";
import { PrivacyPolicy } from "./pages/legal/PrivacyPolicy";
import { TermsOfUse } from "./pages/legal/TermsOfUse";
import { Disclaimer } from "./pages/legal/Disclaimer";
import { Contact } from "./pages/legal/Contact";
import { BlogIndex } from "./blog/pages/BlogIndex";
import { DinnerDecision } from "./blog/pages/DinnerDecision";
import { EasyDinnerIdeas } from "./blog/pages/EasyDinnerIdeas";
import { PantryMeals } from "./blog/pages/PantryMeals";
import { QuickDinners } from "./blog/pages/QuickDinners";
import { Leftovers } from "./blog/pages/Leftovers";
import { navigate, usePathname } from "./routing";

/**
 * Real path-based routing (no hash) — clean, crawlable URLs like /privacy
 * instead of /#/privacy. GitHub Pages can't do server-side rewrites, so
 * direct loads/refreshes on those paths are handled by prerendered
 * <route>.html files (scripts/prerender-routes.mjs) with public/404.html +
 * public/spa-redirect.js as the fallback for anything else.
 * In-app navigation uses pushState via a single document-level click
 * listener, so internal links never trigger a full page reload.
 */
function useRoute(): string {
  const route = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  const onClick = useCallback((e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const anchor = (e.target as HTMLElement | null)?.closest("a");
    if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
    if (anchor.origin !== window.location.origin) return;

    e.preventDefault();
    if (anchor.pathname !== window.location.pathname) {
      navigate(anchor.pathname + anchor.search + anchor.hash);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [onClick]);

  return route;
}

export function Root() {
  const route = useRoute();

  switch (route) {
    case "/privacy":
      return <PrivacyPolicy />;
    case "/terms":
      return <TermsOfUse />;
    case "/disclaimer":
      return <Disclaimer />;
    case "/contact":
      return <Contact />;
    case "/blog":
      return <BlogIndex />;
    case "/blog/what-should-i-cook-for-dinner":
      return <DinnerDecision />;
    case "/blog/easy-dinner-ideas":
      return <EasyDinnerIdeas />;
    case "/blog/what-can-i-cook-with-what-i-have":
      return <PantryMeals />;
    case "/blog/quick-dinner-ideas":
      return <QuickDinners />;
    case "/blog/leftover-dinner-ideas":
      return <Leftovers />;
    // "/" and "/ar" render the same component; the URL decides the language
    // (see LanguageProvider), and keeping one element here preserves the
    // form state when switching between them.
    case "/ar":
    default:
      return <App />;
  }
}
