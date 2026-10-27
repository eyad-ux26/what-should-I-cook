// Post-build step: GitHub Pages answers unknown paths with HTTP 404 (it only
// serves 404.html, which then redirects client-side). Search engines may not
// index pages that return 404, so give every public route its own real
// <route>.html file — GitHub Pages serves it at the extensionless URL with
// a 200. The app still renders client-side; this just fixes the status code
// and puts route-specific head tags (title/description/canonical, and for the
// two homepage routes: html lang/dir, canonical and hreflang) in the static HTML.
//
// Keep ROUTES in sync with src/Root.tsx and src/blog/data.ts.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const SITE = "https://what-should-i-cook.com";
const DIST = "dist";

const ROUTES = [
  { path: "/privacy" },
  { path: "/terms" },
  { path: "/disclaimer" },
  { path: "/contact" },
  {
    path: "/blog",
    title: "Cooking Ideas & Dinner Inspiration | What Should I Cook?",
    description:
      "Practical cooking ideas, simple dinner inspiration, and ways to make more from what you already have — from a quick decision framework to pantry and leftover meals.",
  },
  {
    path: "/blog/what-should-i-cook-for-dinner",
    title: "What Should I Cook for Dinner? A Simple Way to Decide | What Should I Cook",
    description:
      "Stuck on what to cook for dinner? A practical, five-question framework — based on what you have, your time, and what you're craving — to help you decide tonight.",
  },
  {
    path: "/blog/easy-dinner-ideas",
    title: "Easy Dinner Ideas When You Don't Know What to Cook | What Should I Cook",
    description:
      "A practical collection of easy dinner ideas sorted by situation: 15-minute meals, one-pan dinners, pantry staples, easy pasta, rice, vegetarian, and chicken meals.",
  },
  {
    path: "/blog/what-can-i-cook-with-what-i-have",
    title: "What Can I Cook With What I Have? A Guide to Pantry and Fridge Meals | What Should I Cook",
    description:
      "What can you cook with what's already in your kitchen? A practical framework built around eggs, rice, pasta, potatoes, chicken, beans, and other common staples.",
  },
  {
    path: "/blog/quick-dinner-ideas",
    title: "Quick Dinner Ideas for Busy Weeknights | What Should I Cook",
    description:
      "Quick dinner ideas organized by time — 10 to 30 minutes — plus practical habits for cooking faster on busy weeknights.",
  },
  {
    path: "/blog/leftover-dinner-ideas",
    title: "How to Turn Leftovers Into a New Dinner | What Should I Cook",
    description:
      "Practical ideas for turning leftover chicken, rice, vegetables, and potatoes into a completely different dinner, plus safe storage and reheating guidance.",
  },
];

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

for (const { path, title, description } of ROUTES) {
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
      .replace("</head>", `    <link rel="canonical" href="${url}" />\n  </head>`);
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
