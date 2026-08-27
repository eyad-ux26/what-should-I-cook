function OnionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3c2 1.5 5 5 5 9a5 5 0 0 1-10 0c0-4 3-7.5 5-9Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function TomatoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="13.5" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 6.5c-1-1.5-3-2-4-1.5M12 6.5c1-1.5 3-2 4-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CarrotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14 6c3-2 5-2 6-1s-1 3-1 3M9 21l10-10a2.8 2.8 0 0 0-4-4L5 17l4 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function ChiliIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M15 8c3 0 5 2 5 5 0 4-4 8-9 8-3.5 0-6-2.5-6-5.5C5 11 9 8 11 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11 6c0-2 1-3.5 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HerbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 20V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 14c-4-1-6-4-6-8 4 0 7 2 8 5M12 14c4-1 6-4 6-8-4 0-7 2-8 5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS: { Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element; className: string }[] = [
  { Icon: OnionIcon, className: "h-16 w-16 top-[8%] start-[4%]" },
  { Icon: TomatoIcon, className: "h-20 w-20 top-[28%] end-[6%] hidden sm:block" },
  { Icon: CarrotIcon, className: "h-14 w-14 top-[52%] start-[8%] hidden sm:block" },
  { Icon: ChiliIcon, className: "h-16 w-16 top-[70%] end-[10%]" },
  { Icon: HerbIcon, className: "h-24 w-24 top-[88%] start-[45%] hidden md:block" },
];

export function BackgroundIcons() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {ICONS.map(({ Icon, className }, i) => (
        <Icon key={i} className={`absolute text-text opacity-[0.05] ${className}`} />
      ))}
    </div>
  );
}
