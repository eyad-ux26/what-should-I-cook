import { renderToString } from "react-dom/server";
import { Root } from "./Root";
import { LanguageProvider } from "./i18n";
import { setServerPath } from "./routing";

/** Renders the app's HTML for one route. Used only by scripts/prerender-routes.mjs at build time. */
export function render(path: string): string {
  setServerPath(path);
  return renderToString(
    <LanguageProvider>
      <Root />
    </LanguageProvider>,
  );
}
