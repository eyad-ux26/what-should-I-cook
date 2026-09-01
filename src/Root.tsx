import { useCallback, useEffect, useState } from "react";
import App from "./App";
import { PrivacyPolicy } from "./pages/legal/PrivacyPolicy";
import { TermsOfUse } from "./pages/legal/TermsOfUse";
import { Disclaimer } from "./pages/legal/Disclaimer";
import { Contact } from "./pages/legal/Contact";

/**
 * Real path-based routing (no hash) — clean, crawlable URLs like /privacy
 * instead of /#/privacy. GitHub Pages can't do server-side rewrites, so
 * direct loads/refreshes on those paths are handled by public/404.html +
 * public/spa-redirect.js (the standard GitHub Pages SPA redirect trick).
 * In-app navigation uses pushState via a single document-level click
 * listener, so internal links never trigger a full page reload.
 */
function usePathRoute(): string {
  const [route, setRoute] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

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
      window.history.pushState(null, "", anchor.pathname + anchor.search + anchor.hash);
      setRoute(anchor.pathname);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [onClick]);

  return route;
}

export function Root() {
  const route = usePathRoute();

  switch (route) {
    case "/privacy":
      return <PrivacyPolicy />;
    case "/terms":
      return <TermsOfUse />;
    case "/disclaimer":
      return <Disclaimer />;
    case "/contact":
      return <Contact />;
    default:
      return <App />;
  }
}
