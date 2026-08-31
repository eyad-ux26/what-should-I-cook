import { useEffect, useState } from "react";
import App from "./App";
import { PrivacyPolicy } from "./pages/legal/PrivacyPolicy";
import { TermsOfUse } from "./pages/legal/TermsOfUse";
import { Disclaimer } from "./pages/legal/Disclaimer";
import { Contact } from "./pages/legal/Contact";

/**
 * Minimal hash-based router — no extra dependency needed for four static
 * pages, and hash routes work on GitHub Pages without any server rewrite
 * configuration (direct links and refreshes just work).
 */
function useHashRoute(): string {
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, "") || "/");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return route;
}

export function Root() {
  const route = useHashRoute();

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
