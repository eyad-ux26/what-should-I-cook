import type { ReactNode } from "react";
import { LogoMark } from "../../components/LogoMark";
import { Footer } from "../../components/Footer";
import { useLanguage } from "../../i18n";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

/**
 * Shared chrome for the legal/transparency pages. Content is authored in
 * English only (legal accuracy matters more than bilingual coverage here),
 * so this wrapper is deliberately locked to LTR regardless of the app's
 * current language — mixing RTL page direction with long English paragraphs
 * would hurt readability, not help it.
 */
export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  const { t } = useLanguage();

  return (
    <div dir="ltr" className="relative min-h-screen bg-bg">
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col px-4 pb-4 pt-8 sm:px-6 sm:pt-10">
        <div className="mb-8 flex items-center justify-between gap-2.5">
          <a href="#/" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">
              What Should I Cook
            </span>
          </a>
          <a href="#/" className="text-sm font-semibold text-accent-hover transition-opacity hover:opacity-75">
            {t.backToApp}
          </a>
        </div>

        <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-text sm:text-[34px]">
          {title}
        </h1>
        <p className="mt-1.5 text-sm text-text-muted">Last updated: {lastUpdated}</p>

        <div className="panel mt-6 flex flex-col gap-5 p-5 text-[15px] leading-relaxed text-text-muted sm:p-8">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}
