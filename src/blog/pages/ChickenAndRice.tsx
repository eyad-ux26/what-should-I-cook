import { ArticleShell } from "../ArticleShell";
import { H2, H3, P, Strong, InternalLink, IdeaBlock as Idea, Callout, ArticleTable } from "../components";

export function ChickenAndRice() {
  return (
    <ArticleShell slug="what-to-cook-with-chicken-and-rice">
      <P>
        Chicken and rice is the pair most kitchens already have, and it's also the pair most
        people get bored of fastest. The trouble usually isn't the ingredients — it's that they
        end up cooked the same way, seasoned the same way, and served in the same bowl. Change the
        method and the seasoning, and the same two things become a genuinely different meal each
        time. Here are seven, plus a quick guide to the flavor directions that keep them apart.
      </P>

      <H2>The basic formula</H2>
      <P>
        Chicken and rice already cover the protein and the carbohydrate. To turn them into a full
        meal, add one vegetable (fresh, frozen, or canned all work) and one flavor direction — the
        sauce or seasoning that decides what the meal actually tastes like. Everything below is
        that same idea with the method changed. If you want the general version of this thinking,{" "}
        <InternalLink href="/blog/what-can-i-cook-with-what-i-have">what can I cook with what I have</InternalLink>{" "}
        walks through it for any ingredient.
      </P>

      <H2>Seven ways to cook chicken and rice</H2>

      <H3>1. One-pan baked chicken and rice</H3>
      <Idea
        ingredients={["chicken thighs or drumsticks", "rice", "stock or water", "onion", "spices"]}
        time="~50 minutes, mostly hands-off"
        variation="stir in frozen peas or chopped peppers for the last 10 minutes"
      >
        Put the rice, liquid, chopped onion, and seasoning in one baking dish, set the chicken on
        top, cover, and bake. The chicken juices drip into the rice as it cooks, so the rice picks
        up flavor without any extra work. Use the liquid amount on your rice package as a starting
        point, and bone-in pieces tend to stay juicier than breast over this longer cook time.
      </Idea>

      <H3>2. Lemon-garlic skillet chicken over rice</H3>
      <Idea
        ingredients={["boneless chicken", "garlic", "lemon", "butter or olive oil", "cooked rice"]}
        time="~20 minutes with rice already cooked"
        variation="finish with a spoon of mustard or a handful of herbs"
      >
        Sear sliced chicken in a hot pan, add garlic for the last minute, then squeeze in lemon and
        add a little butter to turn the pan juices into a quick sauce. Spoon it over warm rice. It's
        one of the fastest ways to make plain chicken feel finished.
      </Idea>

      <H3>3. Chicken fried rice</H3>
      <Idea
        ingredients={["diced chicken", "day-old rice", "egg", "frozen vegetables", "soy sauce"]}
        time="~15 minutes"
        variation="add a little sesame oil or chili sauce at the end"
      >
        Rice that has had a night in the fridge dries out slightly and fries better than fresh
        rice. Cook the chicken, push it aside, scramble an egg, add the rice and frozen vegetables,
        and toss everything with soy sauce over high heat. It's also the best use for leftover
        chicken.
      </Idea>

      <H3>4. Chicken and rice soup</H3>
      <Idea
        ingredients={["chicken pieces", "rice", "onion", "carrot", "stock or water"]}
        time="~35 minutes"
        variation="finish with lemon juice, or a little cumin and turmeric for a warmer flavor"
      >
        Simmer chicken with onion and carrot in stock or water until cooked through, shred the
        chicken back in, then add rice and cook until tender. It's warming, filling, and stretches
        a small amount of chicken into several bowls. Add a little extra liquid when reheating,
        because the rice keeps absorbing as it sits.
      </Idea>

      <H3>5. Tomato-paprika chicken and rice</H3>
      <Idea
        ingredients={["chicken pieces", "rice", "canned tomatoes", "onion", "paprika"]}
        time="~40 minutes"
        variation="add canned chickpeas or peppers for extra substance"
      >
        Brown the chicken, soften onion in the same pan, then add canned tomatoes, paprika, rice,
        and enough liquid to cook the rice. Cover and simmer until the rice is tender and the
        chicken is cooked through. Everything cooks in one pot and the tomato does the sauce work
        for you.
      </Idea>

      <H3>6. Burrito-style chicken and rice bowl</H3>
      <Idea
        ingredients={["cooked chicken", "rice", "canned beans", "salsa", "cheese or yogurt"]}
        time="~10 minutes if the chicken and rice are already cooked"
        variation="add corn, avocado, or shredded lettuce for freshness"
      >
        Warm the rice, pile on seasoned chicken and beans, and top with salsa and something cool
        like yogurt or cheese. It uses the same ingredients as every other idea here, but with a
        completely different flavor profile — a good option for lunch the next day.
      </Idea>

      <H3>7. Chicken and rice salad bowl for lunch</H3>
      <Idea
        ingredients={["cooked chicken", "cooled rice", "cucumber or tomato", "olive oil", "lemon or vinegar"]}
        time="~10 minutes"
        variation="add chickpeas, herbs, or a spoonful of yogurt sauce"
      >
        Toss cooled rice and sliced chicken with chopped fresh vegetables and a simple dressing of
        oil and lemon or vinegar. It travels well in a lunchbox and is a good reason to cook extra
        chicken and rice the night before.
      </Idea>

      <H2>Flavor directions that keep them from tasting alike</H2>
      <P>
        If two chicken and rice meals taste the same, the seasoning is usually the reason, not the
        method. Pick one direction per meal:
      </P>
      <ArticleTable
        head={["Direction", "What to add"]}
        rows={[
          ["Bright and fresh", "Lemon, garlic, parsley or other herbs, olive oil"],
          ["Savory and Asian-leaning", "Soy sauce, ginger, garlic, a little sesame oil"],
          ["Warm and smoky", "Paprika, cumin, tomato, a pinch of chili"],
          ["Mild and comforting", "Onion, carrot, black pepper, bay leaf, stock"],
          ["Fresh and spicy", "Salsa, lime, cilantro, beans, cheese or yogurt"],
        ]}
      />

      <Callout variant="tip">
        Rice and chicken both need a little care. Cook chicken until it's no longer pink inside and
        the juices run clear (the common safe temperature guideline for poultry is 74°C / 165°F).
        Cool leftover rice quickly, refrigerate it soon after cooking, eat it within a day or two,
        and reheat it until it's steaming hot throughout.
      </Callout>

      <H2>A few mistakes worth avoiding</H2>
      <P>
        <Strong>Dry chicken breast:</Strong> it cooks faster than rice, so cut it into pieces or
        slices and add it later, or use thighs when the chicken has to cook alongside the rice.{" "}
        <Strong>Mushy rice:</Strong> measure the liquid and don't keep lifting the lid.{" "}
        <Strong>Bland results:</Strong> season the chicken itself, not just the sauce, and finish
        with something sharp like lemon or vinegar.
      </P>

      <H2>When you have leftover chicken and rice</H2>
      <P>
        If there's already cooked chicken and rice in the fridge, ideas 3, 6, and 7 above are the
        fastest. For more ways to use what's left over, see{" "}
        <InternalLink href="/blog/leftover-dinner-ideas">how to turn leftovers into a new meal</InternalLink>
        . And if you want something built around your own mix of ingredients,{" "}
        <Strong>What Should I Cook</Strong> can take what you have — chicken, rice, and whatever
        vegetables are around — and suggest directions for it.
      </P>

      <H2>The bottom line</H2>
      <P>
        Chicken and rice only gets repetitive when the method and the seasoning never change. Vary
        both — bake it, simmer it, fry it, or serve it cold — and the same two ingredients can
        cover a week of different meals.
      </P>
    </ArticleShell>
  );
}
