import { LegalLayout } from "./LegalLayout";
import { ExtLink, H2, NotYetActiveBadge, P, Ph, Ul } from "./shared";

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="August 31, 2026">
      <P>
        This Privacy Policy explains what "What Should I Cook" (the "Service") does, what
        information is involved when you use it, and how that information is handled. It's
        written in plain language rather than dense legal text. If anything is unclear, see the{" "}
        <a href="#/contact" className="text-accent-hover underline underline-offset-2">
          Contact page
        </a>
        .
      </P>

      <H2>What the Service does</H2>
      <P>
        You type in ingredients or a food-related request, optionally set preferences (time
        available, dietary needs, cuisine, allergies, mood), and the Service sends that text to an
        AI model to generate recipe ideas, which are shown back to you in your browser. That's the
        entire function of the Service.
      </P>

      <H2>No accounts, no sign-up</H2>
      <P>
        You do not need to create an account, log in, or provide a name, email address, or any
        other identifying information to use the Service. We do not build user profiles, and there
        is no concept of "your account" anywhere in the product.
      </P>

      <H2>What we intentionally collect or store</H2>
      <P>We do not intentionally store the text of your recipe requests. Specifically:</P>
      <Ul>
        <li>
          Your ingredients and preferences are sent from your browser to our backend, forwarded to
          the AI provider to generate a response, and the response is returned to your browser.
          They are not written to a database.
        </li>
        <li>
          Our backend does keep short-lived, automated counters (request counts and timestamps)
          associated with your connection, used only to enforce rate limits and stop abuse (for
          example: too many requests in a short time from the same source). These counters do not
          contain your recipe text — only counts and timing — and roll off automatically after a
          period of hours to a day.
        </li>
        <li>
          Basic operational logs (see below) may briefly record that a request happened, how long
          it took, and how many results it produced — again, not the ingredients or recipe content
          itself.
        </li>
      </Ul>
      <P>
        If a future version of the Service intentionally stores request content (for example, to
        let you save a recipe), this policy will be updated before that change ships.
      </P>

      <H2>Technical information processed by our infrastructure</H2>
      <P>
        Running any website on the internet requires some technical data to flow through
        infrastructure providers, even when no account or personal profile exists. This is
        standard for how the web works, and we don't control what these providers log at the
        network level — only what we ourselves store, which is described above.
      </P>
      <Ul>
        <li>
          <strong className="text-text">Cloudflare</strong> — We use Cloudflare to host and/or sit
          in front of this website for performance and security (for example, protecting against
          bots and denial-of-service traffic, and — for our backend — enforcing the rate limits
          mentioned above). Cloudflare necessarily processes standard connection information (such
          as IP address, request headers, and timestamps) to do this. See{" "}
          <ExtLink href="https://www.cloudflare.com/privacypolicy/">Cloudflare's Privacy Policy</ExtLink>.
        </li>
        <li>
          <strong className="text-text">Hosting/CDN provider</strong> — The website's static files
          are served by our hosting provider (
          <Ph>confirm current host, e.g. GitHub Pages</Ph>), which similarly processes standard
          web server access logs (IP address, requested file, timestamp, browser type) as part of
          serving any web page.
        </li>
      </Ul>

      <H2>AI provider processing</H2>
      <P>
        When you submit ingredients or a request, that text (and the preferences you've set) is
        sent to our AI provider, <strong className="text-text">Mistral AI</strong>, solely to
        generate the recipe response shown to you. We do not send your IP address or any account
        identifier to the AI provider as part of that request — only the food-related text and
        preferences needed to generate a relevant answer. The AI provider processes this text
        under its own privacy practices; see{" "}
        <ExtLink href="https://mistral.ai/">Mistral AI's website</ExtLink> for their current
        policy. We recommend not including personal information (your name, address, health
        details, etc.) in your recipe requests — it isn't needed to get a recipe idea.
      </P>

      <H2>Cookies and similar technologies</H2>
      <P>
        The Service itself does not set tracking cookies. We use your browser's local storage (a
        small amount of data kept on your own device, not sent to us) to remember your language
        preference (English/Arabic) between visits. That's the only client-side storage the
        Service itself uses.
      </P>
      <P>
        Infrastructure and, if enabled, advertising/analytics providers described in this policy
        may set their own cookies or similar identifiers as needed to deliver, secure, or measure
        the Service — see the relevant sections above and below, and those providers' own
        policies.
      </P>

      <H2>
        Advertising and Google AdSense
        <NotYetActiveBadge />
      </H2>
      <P>
        Google AdSense is not currently enabled on this Service. This section describes what will
        apply if/when it is activated, so the policy stays accurate without needing a rewrite at
        that point.
      </P>
      <P>
        If AdSense is enabled, Google and its partners may use cookies and similar technologies
        (including device identifiers) to serve ads, measure ad performance, and — depending on
        your settings and region — personalize the ads you see based on your visits to this and
        other websites. You can review and adjust how Google personalizes ads for you at{" "}
        <ExtLink href="https://myaccount.google.com/data-and-privacy">
          Google's Ads Settings
        </ExtLink>
        , and learn more about how Google uses information from sites that use its services at{" "}
        <ExtLink href="https://policies.google.com/technologies/partner-sites">
          policies.google.com/technologies/partner-sites
        </ExtLink>
        . Where required by law, we will request your consent before enabling personalized
        advertising and/or provide a consent management tool.
      </P>

      <H2>
        Analytics
        <NotYetActiveBadge />
      </H2>
      <P>
        We do not currently use Google Analytics or a similar analytics service. If one is added
        later, it would work similarly to the advertising section above — processing technical
        usage data (pages viewed, general location derived from IP, device/browser type) via
        cookies or similar identifiers — and this policy will be updated to name the specific
        service in use.
      </P>

      <H2>Other third-party services</H2>
      <P>
        Beyond Cloudflare, our hosting provider, and the AI provider named above, we do not
        currently share information with other third parties. If that changes, this section will
        be updated to name the service and explain why.
      </P>

      <H2>Data retention</H2>
      <P>
        We don't intentionally retain your recipe requests at all — they exist only for the
        duration needed to generate and return a response. Abuse-prevention counters are
        automatically discarded after their rolling window (ranging from minutes up to roughly 24
        hours) expires. Logs kept for operational/security purposes are retained only as long as
        reasonably necessary for that purpose and are then deleted or rolled over, consistent with
        our infrastructure providers' standard log-retention practices.
      </P>

      <H2>Your rights</H2>
      <P>
        Because the Service doesn't require an account and doesn't intentionally store personal
        data tied to your identity, there is typically very little personal data associated with
        your use of it for us to act on directly. Depending on where you live, you may have rights
        under applicable data protection laws (such as the GDPR in the EU/UK or the CCPA in
        California) regarding personal data that is processed by us or by our infrastructure/AI
        providers as described above. If you have a question or request relating to your data,
        contact us via the{" "}
        <a href="#/contact" className="text-accent-hover underline underline-offset-2">
          Contact page
        </a>{" "}
        and we'll do our best to help, including directing you to the right third-party provider
        where applicable.
      </P>

      <H2>Children's privacy</H2>
      <P>
        The Service is not directed at children and is not intended for use by anyone under the
        age of 13 (or the minimum age required in your jurisdiction). We do not knowingly collect
        personal information from children. If you believe a child has provided personal
        information through the Service, please contact us so we can address it.
      </P>

      <H2>Changes to this policy</H2>
      <P>
        We may update this Privacy Policy from time to time — for example, when a new feature,
        infrastructure provider, or advertising service is added. The "Last updated" date at the
        top of this page will reflect the most recent revision. Material changes will be reflected
        here; we encourage checking back periodically.
      </P>

      <H2>Contact</H2>
      <P>
        Questions about this Privacy Policy can be sent via the{" "}
        <a href="#/contact" className="text-accent-hover underline underline-offset-2">
          Contact page
        </a>{" "}
        (<Ph>replace with your preferred contact email</Ph>).
      </P>
    </LegalLayout>
  );
}
