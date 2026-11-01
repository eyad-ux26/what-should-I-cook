import type { ReactNode } from "react";
import { LogoMark } from "../components/LogoMark";
import { Footer } from "../components/Footer";
import { LanguageSwitch } from "../components/LanguageSwitch";
import { useLanguage } from "../i18n";
import { homePath } from "./data";
import { useBlogStrings } from "./strings";

interface BlogLayoutProps {
  children: ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}

/**
 * Shared chrome for /blog and every article page, in English ("/blog/...")
 * or Arabic ("/ar/blog/..."). Direction and font follow the page language.
 */
export function BlogLayout({ children, breadcrumb }: BlogLayoutProps) {
  const { t, lang } = useLanguage();
  const bs = useBlogStrings();
  const home = homePath(lang);

  return (
    <div dir={t.dir} lang={lang} className="relative bg-bg" style={{ fontFamily: t.fontFamily }}>
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between gap-2.5 px-4 pt-8 sm:px-6 sm:pt-10">
        <a href={home} className="flex min-w-0 items-center gap-2.5">
          <LogoMark />
          <span className="truncate text-sm font-semibold uppercase tracking-[0.14em] text-text-muted rtl:tracking-normal">
            {bs.siteName}
          </span>
        </a>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={home}
            className="hidden text-sm font-semibold text-accent-hover transition-opacity hover:opacity-75 sm:inline"
          >
            {t.backToApp}
          </a>
          <LanguageSwitch variant="light" />
        </div>
      </header>

      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label={bs.breadcrumb} className="mx-auto w-full max-w-5xl px-4 pt-5 sm:px-6">
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
