interface LogoMarkProps {
  className?: string;
  size?: number;
}

export function LogoMark({ className = "h-9 w-9 rounded-[10px] shadow-sm", size = 36 }: LogoMarkProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo-256.png`}
      alt="What Should I Cook"
      className={className}
      width={size}
      height={size}
    />
  );
}
