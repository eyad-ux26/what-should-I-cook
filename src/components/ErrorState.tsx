import { PrimaryButton } from "./PrimaryButton";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="recipe-card flex flex-col items-center gap-4 px-6 py-12 text-center">
      <div className="text-4xl">🔥🍳</div>
      <div>
        <p className="font-hand text-2xl font-semibold text-text">Couldn't come up with anything</p>
        <p className="font-note mt-1 text-base text-text-muted">
          Something went wrong on our end. Give it another try.
        </p>
      </div>
      <PrimaryButton onClick={onRetry}>Try again</PrimaryButton>
    </div>
  );
}
