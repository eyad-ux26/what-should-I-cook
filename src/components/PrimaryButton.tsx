import type { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({ className = "", children, ...props }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      className={`btn-gradient inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:text-text-muted disabled:active:scale-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
