/** Simple line icons, one per category, matching the app's existing stroke-based icon style. No photography, no emoji. */

export function DecideIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 3v3M12 18v3M4.5 12H3m18 0h-1.5M6.3 6.3 5.2 5.2m13.5 1.1 1.1-1.1M6.3 17.7l-1.1 1.1m13.5-1.1 1.1 1.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function EasyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 11h14l-1.3 7.4a2 2 0 0 1-2 1.6H8.3a2 2 0 0 1-2-1.6L5 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M3.5 11h17M12 11V4M12 4c-1.4 0-2.5 1-2.5 2M12 4c1.4 0 2.5 1 2.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PantryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 4h16v16H4V4ZM4 10h16M4 16h16M9 4v6M15 4v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function QuickIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="13" r="7.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 9v4l2.6 1.5M9.5 2.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function LeftoverIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 9a8 8 0 1 1 3 6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M4 9V5m0 4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const CATEGORY_ICONS = {
  decide: DecideIcon,
  easy: EasyIcon,
  pantry: PantryIcon,
  quick: QuickIcon,
  leftovers: LeftoverIcon,
};

export function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4.5V8l2.5 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
