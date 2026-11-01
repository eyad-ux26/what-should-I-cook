import { ArticleShell } from "../ArticleShell";
import { H2, H3, P, Strong, InternalLink, IdeaBlock as Idea, Callout, ArticleTable, Ul } from "../components";

export function UseUpVegetables() {
  return (
    <ArticleShell slug="use-up-vegetables-before-they-spoil">
      <P>
        Vegetables go bad because they're bought with good intentions and then forgotten behind
        something else. The fix isn't more discipline; it's having a few meals in your head that
        accept almost any vegetable, plus a handful of storage habits that buy a few extra days.
        This guide covers both.
      </P>

      <H2>Five flexible meals that take almost any vegetable</H2>

      <H3>1. Soup</H3>
      <Idea
        ingredients={["any chopped vegetables", "onion", "stock or water", "rice, lentils, or pasta", "salt and spices"]}
        time="~30 minutes"
        variation="blend it smooth if the vegetables are very soft"
      >
        Soften an onion, add chopped vegetables and something starchy, cover with stock or water,
        and simmer until tender. A mix of carrots, zucchini, celery, and softening tomatoes makes
        a better soup than any one of them alone.
      </Idea>

      <H3>2. Stir-fry or sauté</H3>
      <Idea
        ingredients={["sliced vegetables", "garlic", "oil", "soy sauce or salt", "rice or noodles"]}
        time="~15 minutes"
        variation="add an egg, tofu, or leftover chicken for protein"
      >
        Slice everything thinly and cook the firmer vegetables first, then the softer ones. High
        heat and a bit of garlic and soy sauce turn nearly any mix into a quick meal.
      </Idea>

      <H3>3. Frittata or omelet</H3>
      <Idea
        ingredients={["cooked or raw soft vegetables", "eggs", "cheese", "oil"]}
        time="~20 minutes"
        variation="add cooked potatoes or pasta to make it more filling"
      >
        Eggs hold almost any vegetable together. Soften the vegetables first so they don't release
        extra water into the eggs, then add beaten eggs and cook until set. See{" "}
        <InternalLink href="/blog/what-can-i-cook-with-eggs">what can I cook with eggs</InternalLink>{" "}
        for the method.
      </Idea>

      <H3>4. Sheet-pan roast</H3>
      <Idea
        ingredients={["chopped vegetables", "olive oil", "salt and pepper", "optional sausage, chicken, or chickpeas"]}
        time="~35 minutes, mostly hands-off"
        variation="finish with lemon juice, herbs, or a spoonful of yogurt"
      >
        Cut everything to a similar size, toss with oil, and roast at high heat until browned at
        the edges. Roasting also brings out sweetness in vegetables that have lost their crunch.
      </Idea>

      <H3>5. Pasta or rice with vegetables stirred through</H3>
      <Idea
        ingredients={["pasta or rice", "vegetables", "garlic", "olive oil", "cheese"]}
        time="~20 minutes"
        variation="add canned beans or tuna for protein"
      >
        Sauté finely chopped vegetables with garlic until soft, then toss with the cooked pasta or
        rice and a little cheese. Cut small, even tired vegetables cook fast and blend into the
        dish.
      </Idea>

      <H2>Storage habits that buy extra days</H2>
      <ArticleTable
        head={["Vegetable", "A simple habit"]}
        rows={[
          ["Leafy greens", "Wash and dry well, then store with a paper towel in a container in the fridge"],
          ["Carrots and celery", "Keep in the fridge, wrapped or in a container, and re-crisp limp ones in cold water"],
          ["Onions and potatoes", "Store in a cool, dry, dark place, and keep them apart from each other"],
          ["Tomatoes", "Keep at room temperature while they ripen, and refrigerate only once ripe if you won't use them soon"],
          ["Herbs", "Treat soft herbs like flowers (stems in a little water) or wrap in damp paper in the fridge"],
          ["Anything about to go", "Chop and freeze for soups and stir-fries"],
        ]}
      />

      <H2>Rescuing slightly tired vegetables</H2>
      <Ul>
        <li><Strong>Limp carrots, celery, or leafy greens</Strong> often perk up in a bowl of cold water for a while.</li>
        <li><Strong>Soft tomatoes</Strong> are better in a sauce, soup, or shakshuka-style skillet than raw.</li>
        <li><Strong>Wrinkled peppers</Strong> are fine cooked even if they're no longer good raw.</li>
        <li><Strong>Wilted greens</Strong> can go into soups, eggs, or pasta in the last minute of cooking.</li>
      </Ul>

      <Callout variant="tip">
        Cooked vegetables freeze well in a soup or sauce. If you see you won't get to them in
        time, cook them into a soup or roast them, cool them quickly, and freeze in portions
        instead of letting them spoil.
      </Callout>

      <H2>When to throw something out</H2>
      <P>
        Tired is not the same as spoiled. If vegetables are slimy, smell bad, or show mold (especially
        soft vegetables, which can be affected beyond what's visible), throw them out. When
        you're unsure, don't taste-test to find out. For general guidance on keeping food safe,
        see the storage and reheating section of{" "}
        <InternalLink href="/blog/leftover-dinner-ideas">how to turn leftovers into a new meal</InternalLink>.
      </P>

      <H2>Let the app suggest a direction</H2>
      <P>
        If you're staring at five different half-used vegetables, list them in{" "}
        <Strong>What Should I Cook</Strong> and see what it suggests. As always, check each idea
        before you cook. To avoid the problem in the first place, a stocked pantry helps: see{" "}
        <InternalLink href="/blog/build-a-pantry-for-easy-meals">how to build a pantry that makes easy meals possible</InternalLink>.
      </P>

      <H2>The bottom line</H2>
      <P>
        Using vegetables up is mostly about having a default move for each night: soup, stir-fry,
        eggs, roast, or pasta. Pick whichever matches your time, and almost anything in the
        crisper drawer has somewhere to go.
      </P>
    </ArticleShell>
  );
}
