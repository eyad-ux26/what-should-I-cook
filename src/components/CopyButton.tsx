import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label: string;
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg hover:text-text"
    >
      {copied ? (
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-success">
          <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3.5 10.5V3.5A1.5 1.5 0 0 1 5 2h6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
