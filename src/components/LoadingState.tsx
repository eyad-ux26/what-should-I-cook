import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n";

function OnionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3c2 1.5 5 5 5 9a5 5 0 0 1-10 0c0-4 3-7.5 5-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 3v3M9.5 8c1 .8 1.7 2 1.7 3.5M14.5 8c-1 .8-1.7 2-1.7 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CarrotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14 6c3-2 5-2 6-1s-1 3-1 3M9 21l10-10a2.8 2.8 0 0 0-4-4L5 17l4 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M8.5 15.5l2 2M11 13l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function TomatoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="13.5" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 6.5c-1-1.5-3-2-4-1.5M12 6.5c1-1.5 3-2 4-1.5M12 6.5v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function GarlicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 4c2.5 1.5 5 5.5 5 9.5a5 5 0 0 1-10 0C7 9.5 9.5 5.5 12 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 4V2.5M9.5 9c.8.7 1.3 1.7 1.3 3M14.5 9c-.8.7-1.3 1.7-1.3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const INGREDIENT_ICONS = [OnionIcon, CarrotIcon, TomatoIcon, GarlicIcon];

export function LoadingState() {
  const { t } = useLanguage();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMessageIndex((i) => (i + 1) % t.loadingMessages.length);
    }, 1400);
    return () => clearInterval(id);
  }, [t.loadingMessages.length]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="panel flex flex-col items-center justify-center gap-5 px-6 py-16 text-center"
    >
      <div className="flex items-center gap-4 text-accent-hover">
        {INGREDIENT_ICONS.map((Icon, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          >
            <Icon className="h-7 w-7" />
          </motion.div>
        ))}
      </div>
      <div>
        <p className="text-sm font-semibold text-text">{t.loadingHeadline}</p>
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-1 text-sm text-text-muted"
        >
          {t.loadingMessages[messageIndex]}
        </motion.p>
      </div>
    </div>
  );
}
