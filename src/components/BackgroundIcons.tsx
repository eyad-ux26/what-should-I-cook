import { CarrotIcon, ChickenLegIcon, MeatIcon, OnionIcon, RiceIcon, SushiIcon, TomatoIcon } from "./icons/ingredients";

const ICONS = [
  { Icon: OnionIcon, className: "h-16 w-16 top-[8%] start-[4%]" },
  { Icon: TomatoIcon, className: "h-20 w-20 top-[26%] end-[6%] hidden sm:block" },
  { Icon: CarrotIcon, className: "h-14 w-14 top-[50%] start-[8%] hidden sm:block" },
  { Icon: RiceIcon, className: "h-16 w-16 top-[68%] end-[10%]" },
  { Icon: ChickenLegIcon, className: "h-20 w-20 top-[86%] start-[45%] hidden md:block" },
  { Icon: MeatIcon, className: "h-16 w-16 top-[40%] end-[42%] hidden lg:block" },
  { Icon: SushiIcon, className: "h-14 w-14 top-[6%] end-[30%] hidden lg:block" },
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
