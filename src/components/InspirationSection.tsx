import { useLanguage } from "../i18n";

/**
 * Editorial "content" section for the homepage: how the generator works,
 * tips, and an FAQ. Deliberately self-contained (own icons, own card
 * markup) so it doesn't share or risk touching styles used by the recipe
 * generator, header, or footer. Cards are native <details>/<summary> —
 * real, crawlable content regardless of open/closed state, keyboard- and
 * screen-reader-accessible for free, no JS state needed.
 */

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v17H6.5A2.5 2.5 0 0 1 4 17.5v-12ZM20 5.5A2.5 2.5 0 0 0 17.5 3H12v17h5.5a2.5 2.5 0 0 0 2.5-2.5v-12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M9 18h6M10 21h4M7.5 14.5A6 6 0 1 1 16.5 14.5C15.5 15.6 15 16.4 15 18H9c0-1.6-.5-2.4-1.5-3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuestionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.35-1 .9-1 1.7v.5M12 17h.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CARD_CLASS =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(26,18,12,0.04),0_16px_32px_-22px_rgba(26,18,12,0.25)] transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const SUMMARY_CLASS =
  "flex cursor-pointer list-none items-start gap-3.5 p-5 marker:content-none [&::-webkit-details-marker]:hidden sm:p-6 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50";

function ExploreToggle({ exploreLabel, collapseLabel }: { exploreLabel: string; collapseLabel: string }) {
  return (
    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-hover">
      <span className="group-open:hidden">{exploreLabel}</span>
      <span className="hidden group-open:inline">{collapseLabel}</span>
      <ChevronIcon className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
    </span>
  );
}

export function InspirationSection() {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col gap-6 pt-14 sm:pt-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-text sm:text-[28px]">
          {t.inspirationTitle}
        </h2>
        <p className="max-w-xl text-[15px] leading-relaxed text-text-muted">{t.inspirationIntro}</p>
      </div>

      <details open className={CARD_CLASS}>
        <div aria-hidden="true" className="h-[3px] w-full bg-[linear-gradient(90deg,#ffb27a,#ff6a3d)]" />
        <summary className={SUMMARY_CLASS}>
          <span className="icon-badge badge-sunset mt-0.5 h-11 w-11 shrink-0 text-white">
            <BookIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-bold text-text sm:text-xl">{t.howItWorksTitle}</span>
            <span className="mt-1 block text-sm leading-relaxed text-text-muted">{t.howItWorksTeaser}</span>
            <ExploreToggle exploreLabel={t.exploreLabel} collapseLabel={t.collapseLabel} />
          </span>
        </summary>
        <div className="flex flex-col gap-3 border-t border-border px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:ps-[4.75rem]">
          {t.howItWorksParagraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-text-muted">
              {p}
            </p>
          ))}
        </div>
      </details>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start">
        <details className={`${CARD_CLASS} h-fit`}>
          <div aria-hidden="true" className="h-[3px] w-full bg-[linear-gradient(90deg,#6ee7d8,#14b8a6)]" />
          <summary className={SUMMARY_CLASS}>
            <span className="icon-badge badge-teal mt-0.5 h-10 w-10 shrink-0 text-white">
              <BulbIcon className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-text sm:text-lg">{t.tipsTitle}</span>
              <span className="mt-1 block text-sm leading-relaxed text-text-muted">{t.tipsTeaser}</span>
              <ExploreToggle exploreLabel={t.exploreLabel} collapseLabel={t.collapseLabel} />
            </span>
          </summary>
          <div className="border-t border-border px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
            <ul className="list-disc space-y-1.5 ps-5 text-sm leading-relaxed text-text-muted">
              {t.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </details>

        <details className={`${CARD_CLASS} h-fit`}>
          <div aria-hidden="true" className="h-[3px] w-full bg-[linear-gradient(90deg,#b39dff,#7c5cff)]" />
          <summary className={SUMMARY_CLASS}>
            <span className="icon-badge badge-violet mt-0.5 h-10 w-10 shrink-0 text-white">
              <QuestionIcon className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-text sm:text-lg">{t.faqTitle}</span>
              <span className="mt-1 block text-sm leading-relaxed text-text-muted">{t.faqTeaser}</span>
              <ExploreToggle exploreLabel={t.exploreLabel} collapseLabel={t.collapseLabel} />
            </span>
          </summary>
          <div className="flex flex-col divide-y divide-border border-t border-border px-5 sm:px-6">
            {t.faqItems.map((item, i) => (
              <div key={i} className="py-4">
                <p className="text-sm font-semibold text-text">{item.q}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
