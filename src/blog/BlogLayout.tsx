import type { ReactNode } from "react";
import { LogoMark } from "../components/LogoMark";
import { Footer } from "../components/Footer";
import { useLanguage } from "../i18n";

interface BlogLayoutProps {
  children: ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}

/**
 * Shared chrome for /blog and every article page. English-only content
 * (same reasoning as the legal pages: this is written, SEO-targeted prose,
 * not app UI), so — like LegalLayout — it's locked to LTR regardless of
 * the app's current language setting.
 */
export function BlogLayout({ children, breadcrumb }: BlogLayoutProps) {
  const { t } = useLanguage();

  return (
    <div dir="ltr" className="relative bg-bg">
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between gap-2.5 px-4 pt-8 sm:px-6 sm:pt-10">
        <a href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">
            What Should I Cook
          </span>
        </a>
        <a href="/" className="text-sm font-semibold text-accent-hover transition-opacity hover:opacity-75">
          {t.backToApp}
        </a>
      </header>

      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-5xl px-4 pt-5 sm:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-text-muted">
            {breadcrumb.map((item, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {item.href ? (
                  <a href={item.href} className="transition-colors hover:text-text">
                    {item.label}
                  </a>
                ) : (
                  <span aria-current="page" className="text-text">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <main className="relative z-10">{children}</main>

      <Footer />
    </div>
  );
}
