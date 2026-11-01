import { ArticleShell } from "../ArticleShell";
import { H2, H3, P, Strong, InternalLink, IdeaBlock as Idea, Callout, ArticleTable, QuickDecisionBox } from "../components";

export function MealsWithoutShopping() {
  return (
    <ArticleShell slug="meals-without-going-shopping">
      <P>
        Most "I have nothing to eat" moments aren't true. There's rice in the cupboard, a couple
        of eggs, half an onion, a tin of something — it just doesn't look like a meal yet. The
        skill isn't a bigger shopping list; it's seeing what can be combined. This is a short,
        practical method for doing that, six templates to start from, and a swap guide for when
        the one ingredient a meal normally needs isn't there.
      </P>

      <H2>A four-step method</H2>
      <QuickDecisionBox
        title="Cooking without a shopping trip"
        steps={[
          "Take stock of everything — fridge, freezer, cupboard — before deciding anything.",
          "Pick the item that needs using first (the soft tomato, the open cheese).",
          "Name one protein, one starch, and one vegetable, even loosely.",
          "Choose a method that brings them together: pan, pot, oven, or bowl.",
        ]}
      />
      <P>
        The same idea is covered in more depth in{" "}
        <InternalLink href="/blog/what-can-i-cook-with-what-i-have">what can I cook with what I have</InternalLink>
        . The templates below are what that method looks like in practice.
      </P>

      <H2>Six templates that need very little</H2>

      <H3>1. Fried rice from whatever is around</H3>
      <Idea
        ingredients={["rice", "egg", "any vegetable (fresh or frozen)", "soy sauce or salt", "oil"]}
        time="~15 minutes"
        variation="add any leftover meat, canned beans, or a spoon of chili sauce"
      >
        Almost any combination of cooked rice, egg, and vegetable works. Fry the vegetables, push
        them aside, scramble the egg, add the rice, and season. It's the most forgiving template
        here, because nothing in it is essential except the rice.
      </Idea>

      <H3>2. Pasta with a pantry sauce</H3>
      <Idea
        ingredients={["pasta", "garlic or onion", "olive oil or butter", "canned tomatoes or cheese"]}
        time="~20 minutes"
        variation="stir in beans, tuna, or any wilting vegetable"
      >
        Cook the pasta, build a quick sauce in a pan from garlic, oil, and either canned tomatoes or
        a little cheese, and toss them together with some of the pasta water. It works with only
        three or four ingredients.
      </Idea>

      <H3>3. Bean and tomato skillet</H3>
      <Idea
        ingredients={["canned beans", "canned tomatoes", "onion", "spices"]}
        time="~20 minutes"
        variation="top with an egg, cheese, or yogurt; serve with rice or bread"
      >
        Soften the onion, add the tomatoes, beans, and spices, and simmer until thick. It's a
        full meal from the cupboard, with nothing fresh required beyond an onion.
      </Idea>

      <H3>4. Egg and potato skillet</H3>
      <Idea
        ingredients={["potatoes", "eggs", "onion", "oil", "paprika or any spice"]}
        time="~30 minutes"
        variation="stir in leftover vegetables or cheese"
      >
        Pan-fry diced potatoes with onion until tender and golden, then scramble the eggs through
        or cook them on top. Cheap, filling, and built from things many kitchens always have.
      </Idea>

      <H3>5. Quesadilla or toasted sandwich</H3>
      <Idea
        ingredients={["tortillas or bread", "cheese", "beans, egg, or leftover meat", "any vegetable"]}
        time="~10 minutes"
        variation="add salsa, pickles, or mustard for extra flavor"
      >
        Fill, fold or close, and toast in a dry pan until crisp. Almost any combination of cheese
        and something savory becomes a meal.
      </Idea>

      <H3>6. Simple soup</H3>
      <Idea
        ingredients={["onion", "any vegetables", "stock cube or salted water", "rice, pasta, or lentils"]}
        time="~30 minutes"
        variation="blend half of it for a creamier texture"
      >
        Soften the onion, add chopped vegetables and a starch, cover with stock or water, and
        simmer until everything is tender. It's the best way to use up a mix of vegetables that
        wouldn't make a full meal on their own.
      </Idea>

      <H2>What to use when an ingredient is missing</H2>
      <ArticleTable
        head={["If you don't have...", "Try"]}
        rows={[
          ["Fresh garlic", "Garlic powder, or leave it out and add a little more onion"],
          ["Onion", "Spring onions, shallots, or onion powder"],
          ["Lemon", "A small splash of vinegar"],
          ["Butter", "Oil, or a little cheese for richness"],
          ["Fresh herbs", "A smaller amount of dried herbs, added earlier in cooking"],
          ["Stock", "Water plus a little salt and a spoon of soy sauce or tomato paste"],
          ["Pasta", "Rice, noodles, or any small shape of grain you have"],
          ["Milk or cream", "A little yogurt stirred in at the end, or the starchy cooking water"],
        ]}
      />

      <Callout variant="tip">
        Season in layers: a pinch of salt as you cook, something sharp (vinegar, lemon, tomato)
        near the end, and something savory (cheese, soy sauce, a spoon of paste). Those three
        habits make simple pantry meals taste deliberate rather than improvised.
      </Callout>

      <H2>Getting a head start with the app</H2>
      <P>
        If you'd like help deciding, <Strong>What Should I Cook</Strong> can take your list of
        what you have. Turn on <Strong>Only use what I listed</Strong> in the preferences panel to
        ask for ideas limited to your ingredients. Because AI can make mistakes, check each idea
        before you start cooking. To keep your kitchen ready for nights like this, see{" "}
        <InternalLink href="/blog/build-a-pantry-for-easy-meals">how to build a pantry that makes easy meals possible</InternalLink>.
      </P>

      <H2>The bottom line</H2>
      <P>
        A shopping trip is rarely the real problem; the real problem is not seeing a meal in what's
        already there. Name a protein, a starch, and a vegetable, pick a method, and season
        in layers — most of the time that's enough.
      </P>
    </ArticleShell>
  );
}
