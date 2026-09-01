import { LegalLayout } from "./LegalLayout";
import { P } from "./shared";

const CONTACT_EMAIL = "info@what-should-i-cook.com";

export function Contact() {
  return (
    <LegalLayout title="Contact" lastUpdated="September 1, 2026">
      <P>Have a question, suggestion, or problem with What Should I Cook? We'd love to hear from you.</P>
      <P>
        For general questions, feedback, bug reports, or privacy-related requests, please contact
        us using the email below.
      </P>

      <div className="rounded-xl border border-border bg-bg px-4 py-3">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-mono text-base font-semibold text-accent-hover underline underline-offset-2"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </LegalLayout>
  );
}
