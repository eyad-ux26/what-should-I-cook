// Post-build step: GitHub Pages answers unknown paths with HTTP 404 (it only
// serves 404.html, which then redirects client-side). Search engines may not
// index pages that return 404, so give every public route its own real
// <route>.html file — GitHub Pages serves it at the extensionless URL with
// a 200. The app still renders client-side; this just fixes the status code
// and puts route-specific head tags (title/description/canonical/hreflang, and
// html lang/dir for Arabic pages) in the static HTML.
//
// Blog routes come from src/blog/articles.json; keep the static routes in sync
// with src/Root.tsx.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const SITE = "https://what-should-i-cook.com";
const DIST = "dist";

// Blog metadata lives in one JSON file shared with the app (src/blog/data.ts),
// so titles/descriptions here can't drift from what the pages render.
const blog = JSON.parse(readFileSync("src/blog/articles.json", "utf8"));
const SITE_NAME = { en: "What Should I Cook", ar: "ماذا أطبخ" };

/** [hreflang, absolute URL] pairs for a page that exists in both languages. */
const alternatesFor = (enPath, arPath) => [
  ["en", `${SITE}${enPath}`],
  ["ar", `${SITE}${arPath}`],
  ["x-default", `${SITE}${enPath}`],
];

const blogRoutes = [
  ...["en", "ar"].map((lang) => ({
    path: lang === "ar" ? "/ar/blog" : "/blog",
    title: blog.index[lang].title,
    description: blog.index[lang].description,
    lang,
    alternates: alternatesFor("/blog", "/ar/blog"),
  })),
  ...blog.articles.flatMap((a) =>
    ["en", "ar"].map((lang) => ({
      path: lang === "ar" ? `/ar/blog/${a.slug}` : `/blog/${a.slug}`,
      title: `${a[lang].title} | ${SITE_NAME[lang]}`,
      description: a[lang].description,
      lang,
      alternates: alternatesFor(`/blog/${a.slug}`, `/ar/blog/${a.slug}`),
    })),
  ),
];

const aboutRoutes = ["en", "ar"].map((lang) => ({
  path: lang === "ar" ? "/ar/about" : "/about",
  title: blog.about[lang].title,
  description: blog.about[lang].description,
  lang,
  alternates: alternatesFor("/about", "/ar/about"),
}));

const ROUTES = [{ path: "/privacy" }, { path: "/terms" }, { path: "/disclaimer" }, { path: "/contact" }, ...aboutRoutes, ...blogRoutes];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

// Read the untouched template once; every output is derived from it so the
// homepage-only tags below never leak into the other routes.
const template = readFileSync(join(DIST, "index.html"), "utf8");

function write(path, html) {
  const out = join(DIST, path === "/" ? "index.html" : `${path}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`prerendered ${path} -> ${out}`);
}

const alternateLinks = (alternates) =>
  alternates.map(([lang, href]) => `    <link rel="alternate" hreflang="${lang}" href="${href}" />`).join("\n");

for (const { path, title, description, lang, alternates } of ROUTES) {
  let html = template;
  if (title && description) {
    const url = `${SITE}${path}`;
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(description)}"`)
      .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
      .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
      .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(description)}"`)
      .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(title)}"`)
      .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(description)}"`)
      .replace("</head>", `    <link rel="canonical" href="${url}" />\n${alternates ? alternateLinks(alternates) + "\n" : ""}  </head>`);
  }
  if (lang === "ar") {
    html = html.replace(/<html lang="[^"]*"( dir="[^"]*")?>/, '<html lang="ar" dir="rtl">');
  }
  write(path, html);
}

// The two homepage routes: same page and copy, different language. Each is
// self-canonical and both list the other as an alternate (plus x-default).
const HOME_ALTERNATES = [
  ["en", `${SITE}/`],
  ["ar", `${SITE}/ar`],
  ["x-default", `${SITE}/`],
]
  .map(([lang, href]) => `    <link rel="alternate" hreflang="${lang}" href="${href}" />`)
  .join("\n");

function homepage(canonical, { lang, dir }) {
  return template
    .replace(/<html lang="[^"]*"( dir="[^"]*")?>/, `<html lang="${lang}" dir="${dir}">`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${canonical}"`)
    .replace("</head>", `    <link rel="canonical" href="${canonical}" />\n${HOME_ALTERNATES}\n  </head>`);
}

write("/ar", homepage(`${SITE}/ar`, { lang: "ar", dir: "rtl" }));
write("/", homepage(`${SITE}/`, { lang: "en", dir: "ltr" }));
