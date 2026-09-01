import { LegalLayout } from "./LegalLayout";
import { ExtLink, H2, P } from "./shared";

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="September 1, 2026">
      <P>
        This Privacy Policy explains how What Should I Cook handles information when you use our
        AI-powered recipe generator.
      </P>

      <H2>What we do</H2>
      <P>
        What Should I Cook lets you enter ingredients, food preferences, or a recipe request and
        uses an AI service to generate recipe ideas for you.
      </P>
      <P>
        You do not need to create an account or provide your name, email address, or other
        personal information to use the Service.
      </P>

      <H2>Information you provide</H2>
      <P>
        When you use the recipe generator, the text you enter — such as ingredients, preferences,
        dietary requirements, or other recipe-related information — is sent to our backend and to
        our AI provider, Mistral AI, to generate your recipe ideas.
      </P>
      <P>
        We do not intentionally store your recipe requests in a database or create user profiles
        from them.
      </P>
      <P>Please avoid including unnecessary personal or sensitive information in your recipe requests.</P>

      <H2>Technical information</H2>
      <P>
        Like most websites, some technical information may be processed when you use the Service,
        such as your IP address, browser or device information, request information, and
        timestamps.
      </P>
      <P>
        We use <ExtLink href="https://www.cloudflare.com/privacypolicy/">Cloudflare</ExtLink> to
        help deliver and protect the Service, including protection against abuse and automated
        traffic. Cloudflare may process technical information as part of providing these services.
      </P>
      <P>Our hosting provider may also process standard technical information required to host and deliver the website.</P>

      <H2>AI provider</H2>
      <P>We use Mistral AI to generate recipe ideas.</P>
      <P>
        The recipe-related text and preferences you submit are sent to Mistral AI for this
        purpose. We do not intentionally send your IP address or account information to Mistral as
        part of the recipe request.
      </P>
      <P>
        Mistral AI may process information according to its own privacy practices — see{" "}
        <ExtLink href="https://mistral.ai/">Mistral AI's website</ExtLink>.
      </P>

      <H2>Cookies and local storage</H2>
      <P>
        The Service itself uses local storage to remember your language preference, such as
        English or Arabic.
      </P>
      <P>
        Because we use Google AdSense, Google and its advertising partners may use cookies, web
        beacons, IP addresses, and similar technologies to deliver ads, measure advertising
        performance, prevent fraud, and, where permitted, personalize advertising.
      </P>
      <P>
        Third parties may place or read cookies or use similar technologies on your browser as a
        result of advertising being served on the website.
      </P>
      <P>
        You can learn more about how Google uses information from websites that use its services
        through{" "}
        <ExtLink href="https://policies.google.com/technologies/partner-sites">
          Google's published privacy information
        </ExtLink>
        .
      </P>

      <H2>Advertising and Google AdSense</H2>
      <P>We use Google AdSense to display advertisements on the Service.</P>
      <P>
        Google and its advertising partners may use information such as cookies, device
        identifiers, IP addresses, and information about your interaction with websites to
        provide, measure, and personalize advertising, where permitted.
      </P>
      <P>
        The types of advertising and the information used may depend on your location, consent
        choices, and available advertising settings.
      </P>
      <P>
        Where required, we provide users with appropriate choices regarding personalized
        advertising and the use of cookies or similar technologies.
      </P>
      <P>
        You can manage certain Google advertising preferences through{" "}
        <ExtLink href="https://myaccount.google.com/data-and-privacy">
          Google's advertising settings
        </ExtLink>
        .
      </P>

      <H2>Data retention</H2>
      <P>We do not intentionally store the recipe requests you submit in a database.</P>
      <P>
        Technical and security information may be temporarily processed or retained by our
        infrastructure providers as necessary to operate, secure, and maintain the Service.
      </P>
      <P>Google and other third-party providers may retain or process information according to their own policies and applicable requirements.</P>

      <H2>Your privacy rights</H2>
      <P>
        Depending on where you live, you may have rights regarding personal information processed
        in connection with your use of the Service.
      </P>
      <P>
        If you have a privacy-related question or request, please contact us through the{" "}
        <a href="/contact" className="text-accent-hover underline underline-offset-2">
          Contact page
        </a>
        .
      </P>

      <H2>Children's privacy</H2>
      <P>
        The Service is not intended for children under 13, or the applicable minimum age in your
        jurisdiction. We do not knowingly collect personal information from children.
      </P>

      <H2>Changes to this policy</H2>
      <P>
        We may update this Privacy Policy when our Service, technology, or data practices change.
        The "Last updated" date at the top of this page will show when the policy was most
        recently revised.
      </P>

      <H2>Contact</H2>
      <P>
        If you have questions about this Privacy Policy or how the Service handles information,
        please contact us through the{" "}
        <a href="/contact" className="text-accent-hover underline underline-offset-2">
          Contact page
        </a>
        .
      </P>
    </LegalLayout>
  );
}
