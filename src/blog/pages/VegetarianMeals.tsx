import { ArticleShell } from "../ArticleShell";
import { H2, H3, P, Strong, InternalLink, IdeaBlock as Idea, FormulaBlock, Callout } from "../components";

export function VegetarianMeals() {
  return (
    <ArticleShell slug="easy-vegetarian-meals">
      <P>
        A vegetarian meal doesn't have to be a bowl of vegetables and a promise to eat more
        tomorrow. Built properly, it's just as filling as any other meal — and most of the
        building blocks, like beans, lentils, eggs, pasta, and rice, are already in a typical
        pantry. Here, "vegetarian" means no meat or fish (eggs and dairy are fine; for vegan
        versions, see the swaps in the tips below).
      </P>

      <H2>The formula for a meal that fills you up</H2>
      <P>
        Meatless meals feel unsatisfying when one of these four things is missing:
      </P>
      <FormulaBlock title="A filling vegetarian meal" parts={["Protein source", "Starch", "Vegetables", "Big flavor"]} />
      <P>
        Protein sources that need no meat include beans, lentils, chickpeas, eggs, tofu, and
        cheese. The starch is rice, pasta, bread, or potatoes. And "big flavor" — acid, spice,
        garlic, and something savory like soy sauce or tomato — matters more than in meat-based
        cooking, because there's no browned meat to carry the dish.
      </P>

      <H2>Eight easy vegetarian meals</H2>

      <H3>1. Red lentil and tomato soup</H3>
      <Idea
        ingredients={["red lentils", "canned tomatoes", "onion", "garlic", "cumin"]}
        time="~30 minutes"
        variation="finish with lemon juice and serve with bread or rice"
      >
        Red lentils cook quickly without soaking and break down into a thick, creamy soup.
        Simmer them with onion, garlic, tomatoes, spices, and water or vegetable stock until soft,
        then blend part of it or leave it rustic. It's one of the cheapest, most filling meals you
        can make.
      </Idea>

      <H3>2. Chickpea and tomato skillet</H3>
      <Idea
        ingredients={["canned chickpeas", "canned tomatoes", "onion", "garlic", "spinach or other greens"]}
        time="~20 minutes"
        variation="top with a fried egg, or crumbled cheese, or a spoon of yogurt"
      >
        Soften onion and garlic, add spices, tomatoes, and drained chickpeas, and simmer until
        thick. Stir in spinach at the end. Serve over rice or with bread. Canned chickpeas are
        already cooked, so this is a pantry meal in the true sense.
      </Idea>

      <H3>3. Bean and cheese quesadillas</H3>
      <Idea
        ingredients={["canned beans", "cheese", "tortillas", "salsa", "any vegetable"]}
        time="~15 minutes"
        variation="add sautéed peppers, corn, or spinach to the filling"
      >
        Mash the beans lightly with seasoning, spread over a tortilla with cheese, fold, and
        toast in a dry pan until crisp and the cheese melts. Serve with salsa or yogurt. It's quick
        enough for lunch and filling enough for a main meal.
      </Idea>

      <H3>4. Pasta with white beans and garlic</H3>
      <Idea
        ingredients={["pasta", "canned white beans", "garlic", "olive oil", "greens or tomatoes"]}
        time="~20 minutes"
        variation="finish with lemon zest and grated cheese"
      >
        Cook the pasta, then warm the beans in garlic and olive oil, mash a few to thicken the
        sauce, and toss everything together with a splash of pasta water. The beans add protein
        and make the dish noticeably heartier than plain garlic pasta.
      </Idea>

      <H3>5. Vegetable fried rice with egg or tofu</H3>
      <Idea
        ingredients={["cooked rice", "eggs or tofu", "frozen vegetables", "soy sauce", "garlic"]}
        time="~15 minutes"
        variation="use tofu and skip the egg for a vegan version"
      >
        Use cold, day-old rice and cook everything over high heat so it fries rather than steams.
        Eggs or crumbled firm tofu give you the protein, and frozen vegetables mean no chopping.
      </Idea>

      <H3>6. Peanut-style noodles</H3>
      <Idea
        ingredients={["noodles or spaghetti", "peanut butter", "soy sauce", "garlic", "lime or vinegar"]}
        time="~15 minutes"
        variation="add shredded cabbage, cucumber, or frozen edamame"
      >
        Stir peanut butter, soy sauce, garlic, a little acid, and hot water into a smooth sauce,
        then toss with cooked noodles. Add any raw or lightly cooked vegetables. It's a
        no-fuss lunch that works hot or cold.
      </Idea>

      <H3>7. Koshari-style rice, lentil, and pasta bowl</H3>
      <Idea
        ingredients={["rice", "brown or green lentils", "small pasta", "tomato sauce", "fried onions"]}
        time="~45 minutes"
        variation="add chickpeas, and a splash of vinegar-garlic sauce on top"
      >
        Inspired by the Egyptian street-food classic, this layers rice, lentils, and pasta under a
        spiced tomato sauce, finished with crisp onions. Home versions simplify it — use one pot
        for the lentils and rice if you like — and it's very filling and vegetarian by nature.
      </Idea>

      <H3>8. Loaded baked potatoes</H3>
      <Idea
        ingredients={["potatoes", "cheese", "canned beans or lentils", "yogurt or sour cream", "any vegetable"]}
        time="~10 minutes active (longer to cook the potato)"
        variation="top with chili beans and cheese for a heartier meal"
      >
        Bake or microwave the potatoes, split them, and load with beans, cheese, and whatever
        vegetables you have. The potato gives you the starch, the beans give you protein, and the
        toppings give you flavor.
      </Idea>

      <H2>Tips for making meatless meals taste complete</H2>
      <P>
        <Strong>Season boldly.</Strong> Salt, acid (lemon, vinegar, or tomato), and spices make
        the difference between a bland pot of beans and a good meal.{" "}
        <Strong>Add texture.</Strong> Crisp onions, toasted nuts or seeds, or fresh raw vegetables
        keep a soft dish interesting.{" "}
        <Strong>Use umami.</Strong> Soy sauce, tomato paste, mushrooms, and cheese add the
        savory depth people often miss from meat. For a vegan version, swap eggs for tofu or
        beans, and use oil or a plant-based alternative in place of butter and dairy.
      </P>

      <Callout variant="tip">
        If you're strictly vegetarian, check labels: some stocks and soups contain meat or fish,
        and a few cheeses are made with animal rennet. And if you rely on vegetarian meals for
        most of your eating and have specific health needs, a registered dietitian can give advice
        tailored to you.
      </Callout>

      <H2>When you're not sure what to make</H2>
      <P>
        If you have beans and rice but no plan, use the pairing: beans plus tomatoes make a
        skillet, beans plus tortillas make quesadillas, lentils plus tomatoes make soup. For more
        general ideas by ingredient,{" "}
        <InternalLink href="/blog/what-can-i-cook-with-what-i-have">what can I cook with what I have</InternalLink>{" "}
        goes through ten common staples, and <Strong>What Should I Cook</Strong> lets you turn
        on a vegetarian preference and get ideas built around your ingredients. For egg-based
        meals specifically, see{" "}
        <InternalLink href="/blog/what-can-i-cook-with-eggs">what can I cook with eggs</InternalLink>.
      </P>

      <H2>The bottom line</H2>
      <P>
        A good vegetarian meal is protein, starch, vegetables, and bold flavor — the same shape as
        any other meal, just without the meat. Keep beans, lentils, pasta, rice, and canned
        tomatoes on hand, and you can usually make one without shopping.
      </P>
    </ArticleShell>
  );
}
