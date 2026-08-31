import type { ReactNode } from "react";

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-2 text-lg font-bold text-text first:mt-0">{children}</h2>;
}

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1.5 ps-5">{children}</ul>;
}

/** Visually flags text the site operator must fill in before launch. */
export function Ph({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[13px] font-semibold text-accent-hover">
      [{children}]
    </span>
  );
}

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent-hover underline underline-offset-2 hover:opacity-75">
      {children}
    </a>
  );
}

/** Marks a whole section as describing a feature that isn't live yet. */
export function NotYetActiveBadge() {
  return (
    <span className="ms-2 inline-flex items-center rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent-hover">
      Not yet active
    </span>
  );
}
