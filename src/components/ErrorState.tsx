import { PrimaryButton } from "./PrimaryButton";
import { useLanguage } from "../i18n";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  const { t } = useLanguage();
  return (
    <div className="panel flex flex-col items-center gap-4 px-6 py-14 text-center">
      <div className="icon-badge h-12 w-12 bg-accent-soft">
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
        <p className="text-lg font-semibold text-text">{t.errorTitle}</p>
        <p className="mt-1 text-sm text-text-muted">{t.errorSubtitle}</p>
      </div>
      <PrimaryButton onClick={onRetry}>{t.tryAgain}</PrimaryButton>
    </div>
  );
}
