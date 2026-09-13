import { ArticleShell } from "../ArticleShell";
import { getArticle } from "../data";
import { H2, P, Ol, Strong, InternalLink, IdeaBlock, Callout } from "../components";

const article = getArticle("quick-dinner-ideas")!;

export function QuickDinners() {
  return (
    <ArticleShell article={article}>
      <P>
        On a genuinely busy night, "easy" isn't specific enough — what matters is exactly how many
        minutes you have. These ideas are grouped by real time budgets, plus a handful of habits
        that shave minutes off almost anything you cook, not just the recipes below.
      </P>

      <H2>10–15 minutes</H2>
      <IdeaBlock
        ingredients={["eggs", "leftover or instant rice", "soy sauce", "frozen peas or corn"]}
        time="~10 minutes"
        variation="stir in leftover cooked meat if you have it"
      >
        <Strong>Egg and vegetable fried rice.</Strong> Scramble eggs quickly, push to the side of
        the pan, add already-cooked rice and frozen vegetables straight from the freezer, and toss
        with soy sauce over high heat. Nothing here needs to cook from raw, which is what keeps it
        under 10 minutes.
      </IdeaBlock>

      <H2>15–20 minutes</H2>
      <IdeaBlock
        ingredients={["pasta", "canned tomatoes", "garlic", "parmesan"]}
        time="~18 minutes"
        variation="add canned tuna or white beans for protein"
      >
        <Strong>Simple tomato pasta.</Strong> Start the pasta water first — while it boils and
        cooks, simmer canned tomatoes with garlic in a separate pan. Both finish at roughly the
        same time, so there's no dead waiting in the middle.
      </IdeaBlock>

      <H2>20–30 minutes</H2>
      <IdeaBlock
        ingredients={["chicken thighs or sausage", "mixed vegetables", "olive oil", "sheet pan"]}
        time="~25 minutes, mostly hands-off"
        variation="swap in whatever vegetables need using up"
      >
        <Strong>Sheet-pan dinner.</Strong> Toss everything with oil and seasoning, spread on one
        tray, and roast at high heat. It takes slightly longer than a stovetop meal, but almost all
        of that time is hands-off — enough to set the table or wind down instead of standing over
        a pan.
      </IdeaBlock>

      <H2>Six habits that actually save time</H2>
      <P>
        Beyond picking a fast recipe, these habits compound — they make everything you cook a
        little quicker, not just the ideas above.
      </P>
      <Ol>
        <li>
          <Strong>Prep ingredients efficiently.</Strong> Chop everything before turning on any
          heat. Cooking with the stove already on and nothing ready is where most wasted time
          actually goes.
        </li>
        <li>
          <Strong>Use frozen vegetables.</Strong> No washing, peeling, or chopping, and they cook
          from frozen in most stir-fries, soups, and sheet-pan meals without a separate thaw step.
        </li>
        <li>
          <Strong>Keep a few fast staples stocked.</Strong> Canned beans, canned tomatoes, and rice
          or pasta mean a real dinner is always possible without a store run.
        </li>
        <li>
          <Strong>Choose quick-cooking proteins.</Strong> Eggs, thin chicken cutlets, shrimp, and
          canned beans are all ready in well under 15 minutes, compared to cuts that need low, slow
          cooking to be tender.
        </li>
        <li>
          <Strong>Cook once, reuse ingredients.</Strong> Roast extra vegetables or cook extra rice
          on a night you have time, then reuse them cold or reheated in a faster meal later in the
          week.
        </li>
        <li>
          <Strong>Use simple sauces.</Strong> Butter and an acid, soy sauce and sesame oil, or olive
          oil and garlic each come together in the time it takes to plate — no separate
          sauce-making step required.
        </li>
      </Ol>

      <Callout variant="tip">
        The single biggest time-saver is starting the slowest-cooking thing first — pasta water,
        rice, or an oven preheating — and prepping everything else while it works, rather than
        doing every step one at a time in sequence.
      </Callout>

      <H2>When you want more direction</H2>
      <P>
        These three time bands cover most weeknight situations, but if you want ideas organized by
        dish type instead of minutes, <InternalLink href="/blog/easy-dinner-ideas">easy dinner ideas when you don't know what to cook</InternalLink>{" "}
        goes wider. And if tonight's constraint is really "I don't know what's even usable in my
        kitchen," <Strong>What Should I Cook</Strong> can turn your specific ingredients into a
        suggestion in seconds — useful when even picking from a list feels like one decision too
        many.
      </P>
    </ArticleShell>
  );
}
