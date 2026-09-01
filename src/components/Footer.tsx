import { useLanguage } from "../i18n";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mx-auto w-full max-w-xl px-4 pb-8 pt-2 sm:px-6">
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-medium text-text-muted">
        <a href="/privacy" className="transition-colors hover:text-text">
          {t.footerPrivacy}
        </a>
        <a href="/terms" className="transition-colors hover:text-text">
          {t.footerTerms}
        </a>
        <a href="/disclaimer" className="transition-colors hover:text-text">
          {t.footerDisclaimer}
        </a>
        <a href="/contact" className="transition-colors hover:text-text">
          {t.footerContact}
        </a>
      </nav>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-text-muted/70">
        {t.footerTagline}
        <br />
        &copy; {year} What Should I Cook
      </p>
    </footer>
  );
}
