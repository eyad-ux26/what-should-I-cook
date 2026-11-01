import { useLanguage } from "../i18n";
import { counterpartPath, usePathname } from "../routing";
import { GlobeIcon } from "../blog/icons";

const VARIANTS = {
  /** On the dark hero band of the homepage. */
  dark: "border-white/25 bg-white/10 text-white/90 backdrop-blur hover:bg-white/20 focus-visible:ring-white/70",
  /** On the light blog header. */
  light: "border-border bg-surface text-text hover:border-accent/40 focus-visible:ring-accent/60",
} as const;

/** A real link to the same page in the other language; client-side navigation is handled by Root. */
export function LanguageSwitch({ variant = "dark" }: { variant?: keyof typeof VARIANTS }) {
  const { t, lang } = useLanguage();
  const path = usePathname();
  const target = lang === "ar" ? "en" : "ar";
  return (
    <a
      href={counterpartPath(path)}
      hrefLang={target}
      lang={target}
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 ${VARIANTS[variant]}`}
    >
      <GlobeIcon className="h-3.5 w-3.5 shrink-0" />
      {t.languageToggle}
    </a>
  );
}
