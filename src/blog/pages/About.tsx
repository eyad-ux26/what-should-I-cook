import { JsonLd } from "../JsonLd";
import { BlogLayout } from "../BlogLayout";
import { ABOUT_SEO, blogBase, homePath } from "../data";
import { H2, P, Strong, InternalLink, Eyebrow } from "../components";
import { useSeo, siteUrl } from "../seo";
import { useLanguage } from "../../i18n";
import { useBlogStrings } from "../strings";

const CONTACT_EMAIL = "what.shi.cook@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/eyad-mahmoud";
const BEHANCE_URL = "https://www.behance.net/eyadesign";

const CONTENT = {
  en: {
    eyebrow: "About",
    title: "About What Should I Cook",
    intro:
      "What Should I Cook is a free tool and cooking blog that helps you decide what to make from the ingredients you already have — in English and Arabic.",
    whatTitle: "What it does",
    what: "Type in what's in your kitchen, then optionally set a time limit, dietary needs, allergies, a preferred cuisine, or a mood. You get recipe ideas built around your ingredients, each showing how many extra ingredients you'd need, and you can open any idea to see the steps. There are no accounts and nothing to install.",
    howTitle: "How it works",
    how1: "Your ingredients and preferences are sent to an AI model (Mistral AI) that suggests the recipe ideas. Ideas that need the fewest extra ingredients are listed first within each set of results.",
    how2a: "AI can make mistakes. The recipes are not reviewed by a chef or a nutritionist, so always check ingredients, allergens, and food safety before you cook. See the",
    how2Link: "AI & Recipe Disclaimer",
    how2b: "and the",
    how2Link2: "Privacy Policy",
    how2c: "for details.",
    blogTitle: "The blog",
    blog: "The articles are practical guides to everyday cooking questions: deciding what to make, cooking from the pantry, using up leftovers and vegetables, and building easy meals around common ingredients. They are general cooking guidance, not medical or dietary advice.",
    blogLink: "Browse the blog",
    whoTitle: "Who's behind it",
    who: "Hi, I'm Eyad Mahmoud, a UI/UX designer. I design, build, and maintain What Should I Cook as an independent project, with the aim of making the everyday question of what to cook a little easier to answer.",
    linkedin: "LinkedIn",
    behance: "Behance portfolio",
    contactTitle: "Get in touch",
    contact: "Questions, feedback, bug reports, or privacy requests are all welcome at",
  },
  ar: {
    eyebrow: "من نحن",
    title: "عن «ماذا أطبخ»",
    intro:
      "«ماذا أطبخ» أداة مجانية ومدونة طبخ تساعدك على أن تقرر ماذا تصنع من المكونات التي لديك بالفعل — بالعربية والإنجليزية.",
    whatTitle: "ماذا يفعل",
    what: "اكتب ما في مطبخك، ثم حدّد اختياريًا حدًّا للوقت، أو احتياجات غذائية، أو حساسية، أو مطبخًا مفضلًا، أو مزاجًا معينًا. تحصل على أفكار وصفات مبنية على مكوناتك، تُظهر كل منها عدد المكونات الإضافية التي ستحتاجها، ويمكنك فتح أي فكرة لرؤية الخطوات. لا توجد حسابات ولا شيء لتثبيته.",
    howTitle: "كيف يعمل",
    how1: "تُرسَل مكوناتك وتفضيلاتك إلى نموذج ذكاء اصطناعي (Mistral AI) يقترح أفكار الوصفات. وتُعرض الأفكار الأقل احتياجًا لمكونات إضافية أولًا ضمن كل مجموعة من النتائج.",
    how2a: "قد يخطئ الذكاء الاصطناعي. لا تتم مراجعة الوصفات من قبل طاهٍ أو أخصائي تغذية، لذا تحقق دائمًا من المكونات ومسببات الحساسية وسلامة الطعام قبل الطبخ. راجع",
    how2Link: "إخلاء مسؤولية الوصفات والذكاء الاصطناعي",
    how2b: "و",
    how2Link2: "سياسة الخصوصية",
    how2c: "للتفاصيل.",
    blogTitle: "المدونة",
    blog: "المقالات أدلة عملية لأسئلة الطبخ اليومية: كيف تقرر ماذا تصنع، والطبخ من المخزن، واستهلاك البقايا والخضار، وبناء وجبات سهلة حول مكونات شائعة. إنها إرشادات طبخ عامة، وليست نصيحة طبية أو غذائية.",
    blogLink: "تصفّح المدونة",
    whoTitle: "من يقف وراءه",
    who: "أنا إياد محمود، مصمم واجهات وتجربة مستخدم (UI/UX). أصمم «ماذا أطبخ» وأطوّره وأديره كمشروع مستقل، بهدف أن يصبح سؤال «ماذا أطبخ؟» اليومي أسهل قليلًا في الإجابة.",
    linkedin: "لينكدإن",
    behance: "معرض أعمال على بيهانس",
    contactTitle: "تواصل معنا",
    contact: "نرحب بالأسئلة والملاحظات وبلاغات الأخطاء وطلبات الخصوصية على",
  },
} as const;

export function About() {
  const { lang } = useLanguage();
  const bs = useBlogStrings();
  const c = CONTENT[lang];
  const { title, description } = ABOUT_SEO[lang];
  const path = lang === "ar" ? "/ar/about" : "/about";

  useSeo({
    title,
    description,
    path,
    type: "website",
    alternates: [
      ["en", siteUrl("/about")],
      ["ar", siteUrl("/ar/about")],
      ["x-default", siteUrl("/about")],
    ],
  });
  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: c.title,
      description,
      inLanguage: lang,
      url: siteUrl(path),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: bs.home, item: siteUrl(homePath(lang)) },
        { "@type": "ListItem", position: 2, name: c.eyebrow, item: siteUrl(path) },
      ],
    },
  ];

  return (
    <BlogLayout breadcrumb={[{ label: bs.home, href: homePath(lang) }, { label: c.eyebrow }]}>
      <JsonLd data={jsonLd} />
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-5 px-4 pb-20 pt-6 sm:px-6">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1 className="text-[30px] font-extrabold leading-[1.15] tracking-tight text-text sm:text-[40px] rtl:leading-[1.35] rtl:tracking-normal">
          {c.title}
        </h1>
        <p className="text-lg leading-relaxed text-text-muted">{c.intro}</p>

        <H2>{c.whatTitle}</H2>
        <P>{c.what}</P>

        <H2>{c.howTitle}</H2>
        <P>{c.how1}</P>
        <P>
          {c.how2a} <InternalLink href="/disclaimer">{c.how2Link}</InternalLink> {c.how2b}{" "}
          <InternalLink href="/privacy">{c.how2Link2}</InternalLink> {c.how2c}
        </P>

        <H2>{c.blogTitle}</H2>
        <P>{c.blog}</P>
        <P>
          <InternalLink href={blogBase(lang)}>{c.blogLink}</InternalLink>
        </P>

        <H2>{c.whoTitle}</H2>
        <P>{c.who}</P>
        <P>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent-hover underline underline-offset-2 hover:opacity-75"
          >
            {c.linkedin}
          </a>
          {" · "}
          <a
            href={BEHANCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent-hover underline underline-offset-2 hover:opacity-75"
          >
            {c.behance}
          </a>
        </P>

        <H2>{c.contactTitle}</H2>
        <P>
          {c.contact}{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-accent-hover underline underline-offset-2 hover:opacity-75"
          >
            <Strong>{CONTACT_EMAIL}</Strong>
          </a>
          .
        </P>
      </div>
    </BlogLayout>
  );
}
