import { PrimaryButton } from "./PrimaryButton";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-accent-hover">
          <path
            d="M12 8v5M12 16h.01M10.3 3.9L2.7 17a1.8 1.8 0 001.5 2.7h15.6a1.8 1.8 0 001.5-2.7L13.7 3.9a1.8 1.8 0 00-3.4 0z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="font-medium text-text">Couldn't come up with anything</p>
        <p className="mt-1 text-sm text-text-muted">
          Something went wrong on our end. Give it another try.
        </p>
      </div>
      <PrimaryButton onClick={onRetry}>Try again</PrimaryButton>
    </div>
  );
}
