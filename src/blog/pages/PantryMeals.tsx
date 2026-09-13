import { ArticleShell } from "../ArticleShell";
import { getArticle } from "../data";
import { H2, H3, P, Strong, InternalLink, FormulaBlock, Callout, ArticleTable } from "../components";

const article = getArticle("what-can-i-cook-with-what-i-have")!;

export function PantryMeals() {
  return (
    <ArticleShell article={article}>
      <P>
        "What can I cook with what I have?" usually gets answered by staring into the fridge,
        hoping something suggests itself. A faster approach is to work from the ingredient outward:
        pick the one thing you're sure of, then use a simple framework to fill in the rest.
      </P>

      <H2>The four-part framework</H2>
      <P>
        Almost every satisfying dinner is some combination of these four things. If you can name
        one item in each category, you have a meal — the exact ingredients matter far less than
        having all four covered.
      </P>
      <FormulaBlock title="The dinner formula" parts={["Protein", "Carbohydrate", "Vegetable", "Sauce or seasoning"]} />
      <P>
        The "sauce or seasoning" part is the one people skip, but it's doing the most work — the
        same rice, chicken, and broccoli taste completely different with soy sauce and sesame oil
        versus butter and lemon versus salsa and lime. When a combination feels boring, the fix is
        almost always more seasoning, not different ingredients.
      </P>

      <H2>Meal directions by ingredient</H2>
      <P>Start with whichever of these you already have, then build outward using the framework above.</P>

      <H3>Eggs</H3>
      <P>
        A fried egg turns rice, toast, or a bowl of vegetables into a real meal. Scrambled with
        whatever's in the fridge (cheese, leftover vegetables, canned beans) they become a fast
        omelet. Hard-boiled, they add protein to a salad or grain bowl without any extra cooking.
      </P>

      <H3>Rice</H3>
      <P>
        Fried rice absorbs almost anything — egg, frozen vegetables, canned beans, leftover meat.
        Plain rice becomes a bowl with a fried egg and a savory sauce, or a base under a quick
        skillet of beans and tomatoes.
      </P>

      <H3>Pasta</H3>
      <P>
        Butter, garlic, and pasta water make a real sauce in the time it takes the pasta to cook.
        Canned tomatoes turn it into a simple marinara. Frozen vegetables tossed in during the last
        few minutes of boiling cook perfectly alongside the pasta with no extra pan.
      </P>

      <H3>Potatoes</H3>
      <P>
        Baked or microwaved and loaded with cheese and whatever vegetable or beans are on hand,
        potatoes are a meal on their own. Diced and pan-fried, they become a hash under a fried egg.
      </P>

      <H3>Chicken</H3>
      <P>
        Pan-seared and sliced, chicken tops rice, pasta, or a salad. Cubed and simmered with canned
        tomatoes and spices, it becomes a quick stew. Shredded, it stretches into tacos, wraps, or a
        soup with whatever vegetables need using.
      </P>

      <H3>Canned tomatoes</H3>
      <P>
        The base of a fast pasta sauce, a bean and tomato skillet, or a simple soup with whatever
        vegetables and stock or water you have. A can of tomatoes plus onion and garlic is most of
        the way to dinner already.
      </P>

      <H3>Beans</H3>
      <P>
        Already cooked, so they just need warming through — with canned tomatoes and spices for a
        skillet, mashed with seasoning for a spread on toast, or tossed cold into a grain bowl or
        salad for protein.
      </P>

      <H3>Cheese</H3>
      <P>
        Melted over potatoes, rice, or pasta, cheese adds richness and makes a dish feel finished.
        Paired with bread, it's a fast grilled cheese that pairs well with a can of soup or a
        simple salad.
      </P>

      <H3>Bread</H3>
      <P>
        Beyond sandwiches, stale bread makes good croutons for a soup or salad, or soaks up a
        skillet of eggs and vegetables as a quick strata-style bake if you have a bit more time.
      </P>

      <H3>Frozen vegetables</H3>
      <P>
        No prep needed — straight into a stir-fry, a pot of rice, a simmering soup, or a sheet pan
        with a protein. They're one of the fastest ways to cover the "vegetable" part of the
        formula on a night when nothing fresh is left.
      </P>

      <Callout variant="tip">
        Stock isn't required to make something taste like it has a sauce. Butter or oil, an acid
        (lemon, vinegar, or a splash of something pickled), and salt will pull most combinations
        together even with nothing else on hand.
      </Callout>

      <H2>A few combinations that work well together</H2>
      <ArticleTable
        head={["If you have...", "A quick direction"]}
        rows={[
          ["Eggs + rice + soy sauce", "Fried rice or a simple rice bowl"],
          ["Chicken + canned tomatoes + spices", "A fast one-pot stew"],
          ["Beans + cheese + bread", "Beans on toast with melted cheese"],
          ["Pasta + frozen vegetables + garlic", "A no-extra-pan pasta dinner"],
          ["Potatoes + cheese + beans", "Loaded baked potatoes"],
        ]}
      />

      <H2>When nothing on this list overlaps with what you have</H2>
      <P>
        This covers ten common staples, but real kitchens are messier than any list. If what you
        actually have doesn't match anything here, <Strong>What Should I Cook</Strong> takes your
        specific ingredients — whatever they are — and works out a direction directly, rather than
        asking you to fit them into someone else's list. For more structured ideas by situation
        rather than ingredient, <InternalLink href="/blog/easy-dinner-ideas">easy dinner ideas when you don't know what to cook</InternalLink>{" "}
        is organized by type of meal instead.
      </P>

      <H2>The bottom line</H2>
      <P>
        Most dinners are protein, carbohydrate, vegetable, and something to season it with. Once
        you can name one item in each category — even loosely — you're not missing a recipe, you
        already have a meal. The framework does the rest.
      </P>
    </ArticleShell>
  );
}
