import type { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({ className = "", children, ...props }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all active:scale-[0.98] hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-border disabled:text-text-muted disabled:shadow-none disabled:active:scale-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
