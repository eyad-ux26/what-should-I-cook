import { BlogLayout } from "../BlogLayout";
import { ARTICLES, CATEGORIES } from "../data";
import { CATEGORY_ICONS, ArrowIcon } from "../icons";
import { CategoryBadge, ArticleMetaRow, Eyebrow } from "../components";
import { useSeo, useJsonLd, siteUrl } from "../seo";

const TITLE = "Cooking Ideas & Dinner Inspiration | What Should I Cook?";
const DESCRIPTION =
  "Practical cooking ideas, simple dinner inspiration, and ways to make more from what you already have — from a quick decision framework to pantry and leftover meals.";

const [featured, highlight, ...rest] = ARTICLES;

export function BlogIndex() {
  useSeo({ title: TITLE, description: DESCRIPTION, path: "/blog", type: "website" });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "What Should I Cook — Cooking Inspiration",
    description: DESCRIPTION,
    url: siteUrl("/blog"),
    blogPost: ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: siteUrl(`/blog/${a.slug}`),
      datePublished: a.datePublished,
    })),
  });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: siteUrl("/blog") },
    ],
  });

  return (
    <BlogLayout>
      <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <div className="max-w-2xl">
          <Eyebrow>Cooking Inspiration</Eyebrow>
          <h1 className="mt-2 text-[34px] font-extrabold leading-[1.1] tracking-tight text-text sm:text-[44px]">
            Good food starts with a good idea.
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-text-muted">
            Practical cooking ideas, simple meal inspiration, and ways to make more from what you
            already have.
          </p>
        </div>

        {/* Featured article — the flagship piece, given a distinct hero treatment */}
        <a
          href={`/blog/${featured.slug}`}
          className="hero-band group relative mt-10 block overflow-hidden rounded-[28px] px-6 py-10 transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-10 sm:py-14"
        >
          <div className="relative z-10 flex max-w-xl flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white/90 backdrop-blur">
              Featured Article
            </span>
            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-[32px]">
              {featured.title}
            </h2>
            <p className="text-[15px] leading-relaxed text-white/70 sm:text-base">{featured.dek}</p>
            <div className="flex items-center gap-3 text-xs font-medium text-white/60">
              <span>{featured.readingMinutes} min read</span>
            </div>
            <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-ink transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none">
              Read article
              <ArrowIcon className="h-3.5 w-3.5" />
            </span>
          </div>
        </a>

        <h2 className="mt-14 text-xl font-extrabold text-text sm:text-2xl">Latest Cooking Ideas</h2>

        {/* Highlight card — a second, slightly larger card for visual variety */}
        <a
          href={`/blog/${highlight.slug}`}
          className="group mt-5 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
        >
          <span
            className="icon-badge flex h-14 w-14 shrink-0 items-center justify-center text-white"
            style={{ background: CATEGORIES[highlight.category].gradient }}
          >
            {(() => {
              const Icon = CATEGORY_ICONS[highlight.category];
              return <Icon className="h-7 w-7" />;
            })()}
          </span>
          <div className="flex-1">
            <CategoryBadge category={highlight.category} />
            <h3 className="mt-2.5 text-xl font-extrabold leading-tight text-text">{highlight.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-text-muted">{highlight.excerpt}</p>
            <div className="mt-3 flex items-center gap-3">
              <ArticleMetaRow article={highlight} />
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-hover">
                Read article
                <ArrowIcon className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            </div>
          </div>
        </a>

        {/* Remaining articles — standard grid */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {rest.map((a) => {
            const Icon = CATEGORY_ICONS[a.category];
            return (
              <a
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span
                  className="icon-badge flex h-10 w-10 items-center justify-center text-white"
                  style={{ background: CATEGORIES[a.category].gradient }}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <CategoryBadge category={a.category} />
                  <h3 className="mt-2.5 text-base font-bold leading-snug text-text">{a.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{a.excerpt}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <ArticleMetaRow article={a} />
                  <ArrowIcon className="h-3.5 w-3.5 text-accent-hover transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </BlogLayout>
  );
}
