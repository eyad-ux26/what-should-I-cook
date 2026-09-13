import { ArticleShell } from "../ArticleShell";
import { getArticle } from "../data";
import { H2, P, Ul, Strong, InternalLink, Callout } from "../components";

const article = getArticle("leftover-dinner-ideas")!;

export function Leftovers() {
  return (
    <ArticleShell article={article}>
      <P>
        Leftovers get skipped for a reason that has nothing to do with taste: reheating the exact
        same plate twice in a row feels uninspired, even when the food itself is still good. The
        fix isn't eating it cold from the container out of obligation — it's turning it into
        something that reads as a different meal, using it as an ingredient rather than a rerun.
      </P>

      <H2>Leftover chicken</H2>
      <P>Cooked chicken is one of the most flexible leftovers there is — shredded, sliced, or cubed, it drops into almost anything.</P>
      <Ul>
        <li><Strong>Tacos:</Strong> warm it with a little chili powder and cumin, pile onto tortillas with whatever fresh toppings you have.</li>
        <li><Strong>Wraps:</Strong> sliced cold or warm with sauce, lettuce, and anything crunchy for texture.</li>
        <li><Strong>Fried rice:</Strong> diced and tossed in with rice, egg, and frozen vegetables.</li>
        <li><Strong>Pasta:</Strong> tossed through a simple sauce as the protein instead of cooking a fresh one.</li>
        <li><Strong>Salad:</Strong> cold, sliced over greens with a simple dressing for a low-effort dinner.</li>
      </Ul>

      <H2>Leftover rice</H2>
      <P>Rice actually improves for frying once it's had time to dry out slightly in the fridge, which makes leftovers the better starting point, not a compromise.</P>
      <Ul>
        <li><Strong>Fried rice:</Strong> the classic move — high heat, a little oil, egg, and whatever vegetables or protein you have.</li>
        <li><Strong>Rice bowls:</Strong> reheated and topped with a fried egg, sauce, and something crisp.</li>
        <li><Strong>Stuffed vegetables:</Strong> mixed with cheese or beans and packed into halved peppers or tomatoes, then baked until warmed through.</li>
      </Ul>

      <H2>Leftover vegetables</H2>
      <P>Cooked vegetables — roasted, steamed, or sautéed — lose almost nothing by being reheated inside a different dish.</P>
      <Ul>
        <li><Strong>Omelet:</Strong> chopped and folded into eggs with a little cheese.</li>
        <li><Strong>Pasta:</Strong> warmed through in olive oil and garlic, tossed with pasta and parmesan.</li>
        <li><Strong>Soup:</Strong> added to simmering stock with beans or leftover meat for a fast, use-it-up soup.</li>
        <li><Strong>Grain bowl:</Strong> piled over rice or another grain with a sauce and a protein.</li>
      </Ul>

      <H2>Leftover potatoes</H2>
      <P>Cooked potatoes — mashed, roasted, or boiled — hold their shape well and take beautifully to a hot pan.</P>
      <Ul>
        <li><Strong>Hash:</Strong> diced and pan-fried until crisp, with onion and whatever else needs using.</li>
        <li><Strong>Breakfast skillet:</Strong> crisped potatoes topped with a fried egg for dinner-for-breakfast.</li>
        <li><Strong>Potato cakes:</Strong> mashed potatoes mixed with egg and a little flour, formed into patties, and pan-fried until golden.</li>
      </Ul>

      <Callout variant="tip">
        Leftovers crisp up better in a hot pan or oven than in the microwave — the dry, direct heat
        brings back texture that steaming in the microwave tends to soften further.
      </Callout>

      <H2>Storing and reheating leftovers safely</H2>
      <P>
        Getting creative with leftovers only makes sense if they were stored safely in the first
        place. A few sensible guidelines:
      </P>
      <Ul>
        <li>Refrigerate leftovers within about 2 hours of cooking — sooner if the room is warm.</li>
        <li>Use shallow, airtight containers so food cools down quickly and evenly in the fridge.</li>
        <li>Eat refrigerated leftovers within 3–4 days; freeze anything you won't get to in that window.</li>
        <li>Reheat until steaming hot all the way through, not just warm on the surface.</li>
        <li>When something smells off, looks off, or you're genuinely unsure — don't taste-test it to find out. Throw it out.</li>
      </Ul>

      <H2>When leftovers don't add up to a meal on their own</H2>
      <P>
        Sometimes what's left in the container is a spoonful here and there rather than a full
        portion — not quite enough for its own dinner. That's exactly where the four-part framework
        in <InternalLink href="/blog/what-can-i-cook-with-what-i-have">what can I cook with what I have</InternalLink>{" "}
        helps: use the leftover as one part (usually the protein or vegetable) and build the rest
        around it. Or hand the whole list of what's in your fridge to{" "}
        <Strong>What Should I Cook</Strong> and let it suggest a direction.
      </P>

      <H2>The bottom line</H2>
      <P>
        Leftovers stop feeling repetitive the moment you treat them as an ingredient instead of a
        finished plate. The same cooked chicken, rice, vegetables, or potatoes can become four or
        five genuinely different dinners — the only real requirement is storing them safely enough
        to still be worth transforming.
      </P>
    </ArticleShell>
  );
}
