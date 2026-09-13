import { ArticleShell } from "../ArticleShell";
import { getArticle } from "../data";
import { H2, H3, P, Strong, InternalLink, Callout, QuickDecisionBox, ArticleTable } from "../components";

const article = getArticle("what-should-i-cook-for-dinner")!;

export function DinnerDecision() {
  return (
    <ArticleShell article={article}>
      <P>
        "What should I cook for dinner?" is rarely a question about not knowing any recipes. Most
        people who ask it could name a dozen meals without thinking hard. The real problem is
        usually decision fatigue — too many loose options, no clear starting point, and not enough
        energy left at the end of the day to sort through them. The fix isn't more recipes. It's a
        faster way to narrow things down.
      </P>

      <H2>Why the question feels harder than it should</H2>
      <P>
        Dinner decisions get tangled because several things are being decided at once: what's
        actually available, how much effort is realistic tonight, who's eating, and what everyone
        is even in the mood for. Trying to answer all of that in one mental leap is what causes the
        blank-stare-at-the-fridge moment. Splitting it into a short, ordered set of questions makes
        each one easy on its own — and by the last question, the answer is usually obvious.
      </P>
      <P>
        It's also why scrolling through recipe sites or apps often makes the decision harder rather
        than easier. Browsing adds more options at exactly the moment you need fewer — every new
        photo is another possibility to weigh, with no filter for what you actually have or how
        much time is left. A framework works the opposite way: it removes options with every
        question instead of adding them.
      </P>

      <H2>A five-question framework for deciding</H2>
      <P>
        Work through these in order. Each question narrows the field, so by the time you reach the
        last one, there's often only one or two realistic options left.
      </P>

      <QuickDecisionBox
        title="The decision framework"
        steps={[
          "What do you already have?",
          "How much time do you have?",
          "What are you craving?",
          "Any dietary restrictions tonight?",
          "How many people, and what's the budget?",
        ]}
      />

      <H3>1. What do you already have?</H3>
      <P>
        Start with your fridge, freezer, and pantry — not a recipe. Look specifically for a
        protein (meat, eggs, beans, tofu), a carbohydrate (rice, pasta, bread, potatoes), and
        anything fresh that needs using soon. Whatever's closest to spoiling should usually win;
        it narrows tonight's options and prevents food waste at the same time.
      </P>

      <H3>2. How much time do you have?</H3>
      <P>
        Be honest about the real number, including cleanup. A 20-minute dinner and a 20-minute
        dinner that leaves four pans to wash are not the same commitment. If tonight is genuinely
        short on time, it's worth reading{" "}
        <InternalLink href="/blog/quick-dinner-ideas">quick dinner ideas for busy weeknights</InternalLink>
        {" "}for options organized by exact minutes available.
      </P>

      <H3>3. What are you craving?</H3>
      <P>
        This is the question people skip, but it matters — a technically easy meal you don't
        actually want tends to get abandoned halfway through. A rough craving is enough to point
        you in a direction:
      </P>
      <ArticleTable
        head={["You're craving...", "Lean toward"]}
        rows={[
          ["Something warm and cozy", "Soups, stews, baked pasta, rice bowls"],
          ["Something light", "Salads with protein, grain bowls, stir-fries"],
          ["Something crispy", "Pan-seared proteins, roasted vegetables, tacos"],
          ["Something rich", "Creamy pasta, cheesy bakes, braises"],
        ]}
      />

      <H3>4. Any dietary restrictions tonight?</H3>
      <P>
        Apply allergies, intolerances, or preferences (vegetarian, low-carb, dairy-free — whatever
        applies to whoever's eating) now, before you settle on an idea, rather than discovering a
        conflict halfway through cooking.
      </P>

      <H3>5. How many people, and what's the budget?</H3>
      <P>
        A meal for one flexes a lot more than a meal for a family of five on a weeknight budget.
        This question mostly affects portioning and whether it's worth stretching one protein
        across a bigger dish (like a stir-fry or a soup) rather than serving it straight.
      </P>

      <H2>Putting it together</H2>
      <P>
        Here's the framework in practice. Say it's a Tuesday: you've got chicken thighs and rice in
        the fridge, about 30 minutes before everyone needs to eat, and you're craving something
        warm. No dietary restrictions tonight, and it's just you and one other person. That's
        already enough information to land on something specific — a one-pan chicken and rice
        dish, seasoned however you like, ready inside your time limit, using what's already there.
        No recipe search required.
      </P>
      <P>
        Now a different night: it's just you, you've got maybe 15 minutes before you need to be
        somewhere, and you're craving something light. Glancing at the fridge, there are eggs and
        some greens. Fifteen minutes rules out anything that needs real cooking time, "light" rules
        out a heavy baked dish, and "just you" means no need to stretch anything further than it
        already goes. That lands on a quick omelet with the greens folded in — a completely
        different answer, produced by the exact same five questions.
      </P>

      <Callout variant="tip">
        Keep a mental (or actually written) shortlist of five or six meals you can make on
        autopilot — ones that use common ingredients and don't require a recipe. On low-energy
        nights, skip the framework and just default to one of those.
      </Callout>

      <H2>When the framework still doesn't give you an answer</H2>
      <P>
        Sometimes the honest answer to "what do you have?" is "not much that goes together." That's
        a different problem, and it has its own approach —{" "}
        <InternalLink href="/blog/what-can-i-cook-with-what-i-have">
          what can I cook with what I have
        </InternalLink>{" "}
        walks through how to build a real meal out of common single ingredients like eggs, rice, or
        canned beans, even when nothing obvious jumps out. And if it's leftovers sitting in the
        fridge rather than raw ingredients, <InternalLink href="/blog/leftover-dinner-ideas">
          turning leftovers into a new dinner
        </InternalLink>{" "}
        covers how to turn what's already cooked into something that doesn't feel like round two of
        last night.
      </P>
      <P>
        If you'd rather skip working through the questions by hand, that's exactly what{" "}
        <Strong>What Should I Cook</Strong> is for: type in what you have and any preferences, and
        it does the narrowing-down for you. It's a shortcut for the same process, not a
        replacement for knowing how to make the decision yourself.
      </P>

      <H2>The bottom line</H2>
      <P>
        "What should I cook for dinner?" gets easier the moment it stops being one big question and
        becomes five small ones. What you have, how much time, what you're craving, any
        restrictions, and who's eating — answer those in order, and a specific answer usually falls
        out on its own by the end.
      </P>
    </ArticleShell>
  );
}
