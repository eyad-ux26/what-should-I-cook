import { ArticleShell } from "../ArticleShell";
import { H2, H3, P, Strong, InternalLink, IdeaBlock as Idea, Callout, ArticleTable } from "../components";

export function CookWithEggs() {
  return (
    <ArticleShell slug="what-can-i-cook-with-eggs">
      <P>
        Eggs are the ingredient people reach for when there's "nothing to cook" — and they're
        often enough, because an egg is protein, fat, and a binder in one cheap, quick-cooking
        package. The only real limit is imagination: most people stop at scrambled. These are
        seven meals that work for breakfast, lunch, or later in the day, plus a few small
        techniques that make eggs turn out better every time.
      </P>

      <H2>Why eggs are such a reliable base</H2>
      <P>
        Eggs cook in minutes, work with almost any vegetable or starch, and turn leftovers into
        something new. Add a starch (rice, bread, potatoes), a vegetable, and a sauce or seasoning,
        and you have a complete meal. That's the same framework from{" "}
        <InternalLink href="/blog/what-can-i-cook-with-what-i-have">what can I cook with what I have</InternalLink>
        , with the egg as the protein.
      </P>

      <H2>Seven meals to make with eggs</H2>

      <H3>1. Egg fried rice</H3>
      <Idea
        ingredients={["eggs", "cooked rice", "frozen vegetables", "soy sauce", "garlic or spring onion"]}
        time="~10 minutes"
        variation="add leftover chicken, tofu, or a spoon of chili sauce"
      >
        Scramble the eggs in a hot pan, push them aside, then add cold cooked rice and frozen
        vegetables and toss with soy sauce. Day-old rice works best because it's drier and fries
        instead of steaming. It's the fastest full meal on this list.
      </Idea>

      <H3>2. Vegetable frittata</H3>
      <Idea
        ingredients={["6 eggs", "any cooked or soft vegetables", "cheese", "olive oil", "salt and pepper"]}
        time="~20 minutes"
        variation="add cooked potatoes or pasta to make it more filling"
      >
        Soften vegetables in an oven-safe pan, pour over beaten eggs with cheese, cook on the
        stovetop until the edges set, then finish in the oven (or under the grill) until the top is
        set. Serve warm or cold, in wedges, with a salad or bread. It's also a good way to use up
        small amounts of leftover vegetables.
      </Idea>

      <H3>3. Shakshuka-style skillet</H3>
      <Idea
        ingredients={["eggs", "canned tomatoes", "onion", "garlic", "cumin and paprika"]}
        time="~25 minutes"
        variation="stir in chickpeas or spinach, and finish with crumbled cheese"
      >
        Simmer canned tomatoes with onion, garlic, and spices until thickened, make small wells,
        and crack in the eggs. Cover and cook gently until the whites are set. Scoop it up with
        bread. It's a filling meal that costs very little and works for lunch or at the end of the
        day.
      </Idea>

      <H3>4. Egg salad sandwich or wrap</H3>
      <Idea
        ingredients={["hard-boiled eggs", "mayonnaise or yogurt", "mustard", "bread or wraps", "lettuce or cucumber"]}
        time="~15 minutes plus boiling"
        variation="add chopped pickles, herbs, or a little curry powder"
      >
        Chop hard-boiled eggs and mix with mayonnaise or yogurt and a little mustard. Add salt,
        pepper, and anything crunchy for texture. It's a good make-ahead lunch that keeps well in
        the fridge for a day or two.
      </Idea>

      <H3>5. Egg drop soup</H3>
      <Idea
        ingredients={["eggs", "stock or water", "soy sauce", "spring onion", "frozen peas or corn"]}
        time="~10 minutes"
        variation="thicken lightly with a little cornflour mixed with water"
      >
        Bring seasoned stock to a gentle simmer, then slowly pour in beaten eggs while stirring so
        they form soft ribbons. Add vegetables and a splash of soy sauce. It's warming, light, and
        ready in minutes, and it works well next to rice.
      </Idea>

      <H3>6. Potato and egg skillet</H3>
      <Idea
        ingredients={["potatoes", "eggs", "onion", "olive oil", "paprika"]}
        time="~30 minutes, or ~15 with leftover potatoes"
        variation="top with cheese or serve with a spoon of yogurt"
      >
        Pan-fry diced potatoes with onion until golden and tender, then make gaps and cook eggs in
        them, or scramble the eggs through the potatoes. Using leftover boiled or roasted potatoes
        makes this much faster.
      </Idea>

      <H3>7. Egg on toast, built up</H3>
      <Idea
        ingredients={["eggs", "bread", "avocado, cheese, or beans", "tomato", "olive oil"]}
        time="~10 minutes"
        variation="swap the toast for warm rice or a baked potato"
      >
        A fried or soft-boiled egg on toast becomes a real meal with something on the toast first:
        mashed avocado, warmed beans, cheese, or sliced tomato. It's the easiest option when you
        want something light for lunch.
      </Idea>

      <H2>Techniques that make eggs better</H2>
      <ArticleTable
        head={["If you want...", "Do this"]}
        rows={[
          ["Soft, creamy scrambled eggs", "Cook on low to medium heat, stir gently, and take them off the heat while still slightly glossy"],
          ["Crisp-edged fried eggs", "Heat the oil first, add the egg, and cook on medium-high heat without moving it"],
          ["Soft or jammy boiled eggs", "Lower eggs into simmering water for roughly 6–7 minutes, then cool in cold water"],
          ["Fully set boiled eggs", "Roughly 10–12 minutes in simmering water, then cool in cold water so they peel easily"],
          ["A fluffier omelet or frittata", "Beat the eggs well and don't overcook — they keep setting from residual heat"],
        ]}
      />
      <P>
        Cooking times vary with egg size and how cold the eggs are when they go into the pan or
        pot, so treat the numbers above as a starting point and adjust to your own stove.
      </P>

      <Callout variant="tip">
        Keep eggs refrigerated and check the date on the carton. Cook them until the whites are
        fully set and the yolks are firm if you're serving young children, older adults, pregnant
        people, or anyone with a weakened immune system, and follow your local food-safety guidance
        for raw or lightly cooked eggs.
      </Callout>

      <H2>What to do with a few eggs and not much else</H2>
      <P>
        If all you have is eggs and one other thing, the pairing usually decides the meal: eggs
        with rice give you fried rice; eggs with tomatoes give you a shakshuka-style skillet;
        eggs with potatoes give you a skillet or a frittata; eggs with bread give you toast or
        a sandwich. If you'd rather not decide, <Strong>What Should I Cook</Strong> can take your
        eggs plus whatever else you have and suggest a direction. For meals with no meat at all,
        see{" "}
        <InternalLink href="/blog/easy-vegetarian-meals">easy vegetarian meals from pantry staples</InternalLink>.
      </P>

      <H2>The bottom line</H2>
      <P>
        Eggs don't have to mean scrambled eggs. With rice, tomatoes, potatoes, bread, or a bit of
        stock, they become fried rice, a skillet, a soup, or a sandwich in about the time it takes
        to decide.
      </P>
    </ArticleShell>
  );
}
