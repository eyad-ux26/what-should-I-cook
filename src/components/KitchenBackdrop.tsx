const BULB_COUNT = 11;

function StringLights() {
  const bulbs = Array.from({ length: BULB_COUNT });
  return (
    <div className="string-lights">
      <svg viewBox="0 0 1000 110" preserveAspectRatio="none" className="h-full w-full">
        <path
          d="M0,10 Q125,95 250,78 Q375,60 500,80 Q625,100 750,78 Q875,58 1000,10"
          fill="none"
          stroke="#5c4634"
          strokeWidth="2.5"
          opacity="0.55"
        />
      </svg>
      {bulbs.map((_, i) => {
        const t = i / (BULB_COUNT - 1);
        const left = t * 100;
        const dip = Math.sin(t * Math.PI) * 34;
        return (
          <span
            key={i}
            className="string-bulb"
            style={{
              left: `${left}%`,
              top: `${18 + dip}px`,
              animationDelay: `${(i % 5) * 0.4}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function WhiskIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M32 6v20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 26c-10 0-16 8-16 16s6 12 16 12 16-6 16-12-6-16-16-16Z" stroke="currentColor" strokeWidth="2.5" />
      <path d="M32 26c-6 4-9 12-6 22M32 26c6 4 9 12 6 22M32 26c-3 6-3 16 0 24M32 26c3 6 3 16 0 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HerbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M32 58V20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 34c-8-2-14-10-14-20 10 0 18 6 20 14M32 34c8-2 14-10 14-20-10 0-18 6-20 14M32 22c-6-1-11-7-11-15 8 0 14 5 15 11M32 22c6-1 11-7 11-15-8 0-14 5-15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChiliIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M24 12c4-4 9-6 11-4s0 7-4 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 18c14 0 24 10 24 20 0 10-8 16-16 16-12 0-22-12-18-24 2-6 6-11 10-12Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

function PotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M10 28h44l-4 22a6 6 0 0 1-6 5H20a6 6 0 0 1-6-5L10 28Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M6 28h52M4 20c2-4 6-4 8 0M28 20c2-4 6-4 8 0M52 20c2-4 6-4 8 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M6 22h6M52 22h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const DOODLES: {
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  className: string;
  style: React.CSSProperties;
}[] = [
  { Icon: WhiskIcon, className: "h-16 w-16", style: { top: "14%", left: "4%", ["--doodle-rot" as string]: "-12deg" } },
  { Icon: HerbIcon, className: "h-20 w-20 hidden sm:block", style: { top: "8%", right: "6%", ["--doodle-rot" as string]: "8deg" } },
  { Icon: ChiliIcon, className: "h-14 w-14 hidden sm:block", style: { top: "42%", left: "2%", ["--doodle-rot" as string]: "-6deg" } },
  { Icon: PotIcon, className: "h-24 w-24", style: { bottom: "8%", right: "3%", ["--doodle-rot" as string]: "4deg" } },
];

export function KitchenBackdrop() {
  return (
    <div className="kitchen-backdrop" aria-hidden="true">
      <StringLights />
      {DOODLES.map(({ Icon, className, style }, i) => (
        <Icon key={i} className={`kitchen-doodle ${className}`} style={{ ...style, animationDelay: `${i * 0.6}s` }} />
      ))}
      <div className="kitchen-vignette" />
      <div className="kitchen-counter" />
    </div>
  );
}
