import { ArticleShell } from "../ArticleShell";
import { getArticle } from "../data";
import { H2, H3, P, Strong, InternalLink, IdeaBlock as Idea, Callout } from "../components";

const article = getArticle("easy-dinner-ideas")!;

export function EasyDinnerIdeas() {
  return (
    <ArticleShell article={article}>
      <P>
        "Easy" means different things depending on the night. Sometimes it means fast. Sometimes
        it means one pan to wash. Sometimes it just means you don't want to think too hard. This is
        a short collection of reliable dinners sorted by situation, not a giant recipe list — pick
        the section that matches tonight and go from there.
      </P>

      <H2>15-minute ideas</H2>
      <H3>Garlic butter pasta, loaded up</H3>
      <Idea
        ingredients={["pasta", "butter", "garlic", "parmesan", "any vegetable"]}
        time="~15 minutes"
        variation="stir in canned tuna or white beans for protein"
      >
        This works because pasta water does most of the flavor-building for you — a splash of the
        starchy cooking water loosens melted butter and garlic into a light sauce that clings to
        the noodles without any separate sauce-making step. Toss in whatever vegetable needs using,
        raw and thinly sliced or quickly wilted in at the end.
      </Idea>

      <H2>One-pan ideas</H2>
      <H3>Sheet-pan sausage and vegetables</H3>
      <Idea
        ingredients={["sausage links", "potatoes or vegetables", "olive oil", "salt & pepper"]}
        time="~30 minutes, mostly hands-off"
        variation="swap sausage for chicken thighs or chickpeas"
      >
        Everything roasts on one tray at the same high heat, so there's no juggling multiple pans
        or timing — cut everything to a similar size, toss with oil, and let the oven do the work
        while you do something else. One pan in, one pan to wash.
      </Idea>

      <H2>Pantry-based meals</H2>
      <H3>Canned bean and tomato skillet</H3>
      <Idea
        ingredients={["canned beans", "canned tomatoes", "onion or garlic", "spices"]}
        time="~20 minutes"
        variation="crack an egg into it near the end, or serve over rice"
      >
        Canned beans are already cooked, so this is really just building a quick sauce — soften
        onion or garlic, add canned tomatoes and drained beans, season, and simmer until it
        thickens slightly. It holds up on its own, over rice, or scooped up with bread.
      </Idea>

      <H2>Easy pasta meals</H2>
      <H3>Aglio e olio, but flexible</H3>
      <Idea
        ingredients={["pasta", "olive oil", "garlic", "chili flakes (optional)"]}
        time="~15 minutes"
        variation="add sautéed mushrooms, spinach, or leftover roasted vegetables"
      >
        The classic version is just pasta, good olive oil, and garlic — but it's really a template.
        Once the base is right, almost anything cooked and cut small can be folded in without
        throwing off the dish.
      </Idea>

      <H2>Easy rice meals</H2>
      <H3>Rice bowl with a fried egg</H3>
      <Idea
        ingredients={["cooked rice", "egg", "soy sauce or salt", "anything crisp"]}
        time="~10 minutes if rice is already cooked"
        variation="add canned corn, quick-pickled vegetables, or leftover roasted meat"
      >
        A bowl of warm rice, a fried or soft-boiled egg on top, a savory sauce, and something with
        texture (raw cucumber, toasted nuts, crushed chips) covers protein, carbs, and contrast in
        one bowl with almost no active cooking.
      </Idea>

      <H2>Easy vegetarian meals</H2>
      <H3>Loaded baked potatoes</H3>
      <Idea
        ingredients={["potatoes", "cheese", "butter or sour cream", "any vegetable or beans"]}
        time="~10 minutes active, longer to bake or microwave"
        variation="top with black beans and salsa for a Tex-Mex direction"
      >
        A baked potato is a blank, filling base — the microwave gets it done in under 10 minutes if
        the oven feels like too much. Split it, fluff the inside, and load it with whatever's on
        hand; cheese and a starch alone already make a satisfying dinner.
      </Idea>

      <H2>Easy chicken meals</H2>
      <H3>Pan-seared chicken thighs with a two-minute sauce</H3>
      <Idea
        ingredients={["boneless chicken thighs", "butter", "stock or water", "lemon or mustard"]}
        time="~20 minutes"
        variation="use chicken breast and reduce the cooking time slightly"
      >
        Chicken thighs are forgiving and hard to overcook. Sear them well, then use the same pan to
        build a quick sauce — a splash of stock or water, a knob of butter, and a squeeze of lemon
        or spoon of mustard, scraped up off the pan — turns a plain sear into something that tastes
        finished.
      </Idea>

      <Callout variant="tip">
        None of these need a shopping trip if your kitchen has the basics: pasta or rice, a couple
        of proteins, canned beans or tomatoes, and a few aromatics. That overlap is what makes them
        genuinely easy on a random weeknight rather than only when you've planned ahead.
      </Callout>

      <H2>If tonight is tighter on time</H2>
      <P>
        Every idea above fits inside about 30 minutes, but if you need something closer to 10, it's
        worth reading{" "}
        <InternalLink href="/blog/quick-dinner-ideas">quick dinner ideas for busy weeknights</InternalLink>
        , which is organized purely around exact time available rather than dish type. And if
        nothing above matches what's actually in your kitchen right now, <Strong>What Should I Cook</Strong>{" "}
        can take your specific ingredients and suggest something built around them directly.
      </P>
    </ArticleShell>
  );
}
