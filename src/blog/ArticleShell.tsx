import type { ReactNode } from "react";
import { BlogLayout } from "./BlogLayout";
import { blogBase, getArticle, homePath } from "./data";
import { CategoryBadge, ArticleMetaRow, CategoryBanner, GeneratorCta, KeepExploring } from "./components";
import { useSeo, useJsonLd, siteUrl, SITE_IMAGE } from "./seo";
import { useLanguage } from "../i18n";
import { useBlogStrings } from "./strings";

export function ArticleShell({ slug, children }: { slug: string; children: ReactNode }) {
  const { lang } = useLanguage();
  const bs = useBlogStrings();
  const article = getArticle(slug, lang)!;
  const path = `${blogBase(lang)}/${article.slug}`;
  const title = `${article.title} | ${bs.siteName}`;
  const homeUrl = siteUrl(lang === "ar" ? "/ar" : "/");

  useSeo({
    title,
    description: article.description,
    path,
    alternates: [
      ["en", siteUrl(`/blog/${slug}`)],
      ["ar", siteUrl(`/ar/blog/${slug}`)],
      ["x-default", siteUrl(`/blog/${slug}`)],
    ],
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    inLanguage: lang,
    url: siteUrl(path),
    mainEntityOfPage: siteUrl(path),
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    image: SITE_IMAGE,
    author: { "@type": "Organization", name: bs.siteName, url: homeUrl },
    publisher: {
      "@type": "Organization",
      name: bs.siteName,
      logo: { "@type": "ImageObject", url: `${siteUrl("/")}logo-256.png` },
    },
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: bs.home, item: homeUrl },
      { "@type": "ListItem", position: 2, name: bs.blog, item: siteUrl(blogBase(lang)) },
      { "@type": "ListItem", position: 3, name: article.title, item: siteUrl(path) },
    ],
  });

  return (
    <BlogLayout
      breadcrumb={[
        { label: bs.home, href: homePath(lang) },
        { label: bs.blog, href: blogBase(lang) },
        { label: article.title },
      ]}
    >
      <article className="mx-auto w-full max-w-[720px] px-4 pb-20 pt-6 sm:px-6">
        <CategoryBadge category={article.category} />
        <h1 className="mt-3 text-[30px] font-extrabold leading-[1.15] tracking-tight text-text sm:text-[40px] rtl:leading-[1.35] rtl:tracking-normal">
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
