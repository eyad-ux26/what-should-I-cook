import { ArticleShell } from "../ArticleShell";
import { H2, H3, P, Strong, InternalLink, Callout, ArticleTable, Ul } from "../components";

export function BuildAPantry() {
  return (
    <ArticleShell slug="build-a-pantry-for-easy-meals">
      <P>
        A good pantry isn't a pile of food; it's a small set of ingredients chosen so they combine
        in many ways. With the right twenty or so items, a real meal is always possible, even on a
        night when the fridge is nearly empty. This guide covers what's worth keeping, how to
        build it gradually without spending a lot at once, and how to rotate it so it doesn't
        quietly expire.
      </P>

      <H2>Start with categories, not a shopping list</H2>
      <P>
        Think in the same four parts as any meal: something filling, something with protein, a
        way to add vegetables, and flavor. A pantry that covers all four lets you improvise.
        The goal is overlap — items that work in many dishes — not variety for its own sake.
      </P>

      <H2>A practical starter list</H2>

      <H3>Grains and starches</H3>
      <Ul>
        <li>Rice (one everyday type)</li>
        <li>Pasta in one or two shapes</li>
        <li>Bread or tortillas (the freezer keeps them longer)</li>
        <li>Potatoes and onions, stored somewhere cool, dry, and dark</li>
        <li>Oats or couscous, if you eat them</li>
      </Ul>

      <H3>Protein that keeps</H3>
      <Ul>
        <li>Canned beans and chickpeas</li>
        <li>Dried lentils (red lentils cook fastest)</li>
        <li>Eggs, in the fridge</li>
        <li>Canned tuna or sardines, if you eat fish</li>
        <li>Peanut butter, nuts, or seeds</li>
      </Ul>

      <H3>Canned and jarred</H3>
      <Ul>
        <li>Canned tomatoes (whole, chopped, or passata)</li>
        <li>Tomato paste, which adds a lot of flavor for little volume</li>
        <li>Stock cubes or powder</li>
        <li>Canned corn, and a jar of something pickled for sharpness</li>
      </Ul>

      <H3>Flavor makers</H3>
      <Ul>
        <li>Salt, black pepper, olive or vegetable oil, and vinegar or lemon juice</li>
        <li>Soy sauce</li>
        <li>A few spices you actually use: cumin, paprika, chili flakes, curry powder, or whatever your cooking leans toward</li>
        <li>Garlic and, if you like it, dried herbs</li>
      </Ul>

      <H3>Freezer</H3>
      <Ul>
        <li>Frozen vegetables (peas, corn, spinach, mixed)</li>
        <li>A protein or two, such as chicken pieces, kept in portions</li>
        <li>Bread, and cooked rice in small containers</li>
      </Ul>

      <H2>How to build it without a big bill</H2>
      <P>
        Don't buy everything at once. Each week, add one or two items on top of your normal
        shopping, starting with whatever you already use most. Buy what you will actually eat,
        and prefer items that combine with several others over novelty items that suit only a
        single recipe. Larger bags of rice, pasta, and dried lentils usually cost less per
        serving, but only buy a size you'll use before it gets stale.
      </P>

      <H2>What a pantry meal looks like</H2>
      <ArticleTable
        head={["From these...", "You can make"]}
        rows={[
          ["Pasta + canned tomatoes + garlic", "A simple tomato pasta"],
          ["Rice + egg + frozen vegetables + soy sauce", "Fried rice"],
          ["Canned beans + canned tomatoes + onion + spices", "A bean skillet over rice or bread"],
          ["Red lentils + onion + stock + spices", "A thick lentil soup"],
          ["Tortillas + beans + cheese", "Quesadillas"],
          ["Potatoes + eggs + onion", "A potato and egg skillet"],
        ]}
      />
      <P>
        For more detail on combining items like these, see{" "}
        <InternalLink href="/blog/meals-without-going-shopping">meals you can make without going shopping</InternalLink>{" "}
        and{" "}
        <InternalLink href="/blog/easy-vegetarian-meals">easy vegetarian meals from pantry staples</InternalLink>.
      </P>

      <H2>Keeping it fresh: simple rotation</H2>
      <Ul>
        <li><Strong>First in, first out.</Strong> Put newly bought items behind older ones.</li>
        <li><Strong>Check the dates.</Strong> Look over the shelf every month or two, and use anything approaching its date first.</li>
        <li><Strong>Store properly.</Strong> Keep dry goods in sealed containers somewhere cool and dry, and refrigerate opened cans' contents in a clean container rather than in the can.</li>
        <li><Strong>Label.</Strong> A date on anything you decant or freeze saves guessing later.</li>
      </Ul>

      <Callout variant="tip">
        If an item is past its date, use your judgment and food-safety guidance. A "best before"
        date is about quality, but when a food looks, smells, or feels wrong, or the packaging is
        swollen or damaged, don't eat it.
      </Callout>

      <H2>Using it day to day</H2>
      <P>
        Once the pantry is stocked, the question changes from "what do I buy?" to "what do I make
        with this?" That's what <Strong>What Should I Cook</Strong> is for: list what's on your
        shelf and get ideas built around it. And when fresh vegetables are what's running out, see{" "}
        <InternalLink href="/blog/use-up-vegetables-before-they-spoil">how to use up vegetables before they spoil</InternalLink>.
      </P>

      <H2>The bottom line</H2>
      <P>
        A useful pantry is small, overlapping, and rotated. Twenty well-chosen items you actually
        use are worth more than a full shelf of things you don't — and they make "what's for
        lunch?" a much easier question on any day of the week.
      </P>
    </ArticleShell>
  );
}
