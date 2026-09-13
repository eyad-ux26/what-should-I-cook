import type { ReactNode } from "react";
import { BlogLayout } from "./BlogLayout";
import type { ArticleMeta } from "./data";
import { CategoryBadge, ArticleMetaRow, CategoryBanner, GeneratorCta, KeepExploring } from "./components";
import { useSeo, useJsonLd, siteUrl, SITE_IMAGE } from "./seo";

export function ArticleShell({ article, children }: { article: ArticleMeta; children: ReactNode }) {
  const path = `/blog/${article.slug}`;
  const title = `${article.title} | What Should I Cook`;

  useSeo({ title, description: article.description, path });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url: siteUrl(path),
    mainEntityOfPage: siteUrl(path),
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    image: SITE_IMAGE,
    author: { "@type": "Organization", name: "What Should I Cook", url: siteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: "What Should I Cook",
      logo: { "@type": "ImageObject", url: `${siteUrl("/")}logo-256.png` },
    },
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: siteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: article.title, item: siteUrl(path) },
    ],
  });

  return (
    <BlogLayout breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: article.title }]}>
      <article className="mx-auto w-full max-w-[720px] px-4 pb-20 pt-6 sm:px-6">
        <CategoryBadge category={article.category} />
        <h1 className="mt-3 text-[30px] font-extrabold leading-[1.15] tracking-tight text-text sm:text-[40px]">
          {article.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-text-muted">{article.dek}</p>
        <div className="mt-4">
          <ArticleMetaRow article={article} />
        </div>

        <CategoryBanner category={article.category} />

        <div className="mt-9 flex flex-col gap-5">{children}</div>

        <div className="mt-14">
          <GeneratorCta />
        </div>

        <div className="mt-14 border-t border-border pt-10">
          <KeepExploring currentSlug={article.slug} />
        </div>
      </article>
    </BlogLayout>
  );
}
