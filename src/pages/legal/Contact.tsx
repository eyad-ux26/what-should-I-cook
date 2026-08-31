import { LegalLayout } from "./LegalLayout";
import { H2, P, Ph } from "./shared";

const CONTACT_EMAIL_PLACEHOLDER = "your-contact-email@example.com";

export function Contact() {
  return (
    <LegalLayout title="Contact" lastUpdated="August 31, 2026">
      <P>
        This Service doesn't have accounts or a support ticketing system — it's a small,
        anonymous tool. For questions about privacy, these legal pages, a bug report, or anything
        else, reach out by email:
      </P>

      <div className="rounded-xl border border-border bg-bg px-4 py-3">
        <a
          href={`mailto:${CONTACT_EMAIL_PLACEHOLDER}`}
          className="font-mono text-base font-semibold text-accent-hover underline underline-offset-2"
        >
          {CONTACT_EMAIL_PLACEHOLDER}
        </a>
        <p className="mt-1 text-xs text-text-muted">
          (<Ph>Replace this with your real contact email before launch</Ph>)
        </p>
      </div>

      <H2>What to include</H2>
      <P>
        If you're reporting an issue, it helps to include roughly when it happened, what you
        typed in, and what went wrong. Please don't include sensitive personal information in your
        message — it isn't needed to help you.
      </P>

      <H2>Response time</H2>
      <P>
        This is a small, independently run project, so please allow reasonable time for a
        response. There's no guaranteed support SLA.
      </P>
    </LegalLayout>
  );
}
