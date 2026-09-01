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

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent-hover underline underline-offset-2 hover:opacity-75">
      {children}
    </a>
  );
}
