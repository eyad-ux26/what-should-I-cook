import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n";
import { CarrotIcon, ChickenLegIcon, OnionIcon, TomatoIcon } from "./icons/ingredients";

const INGREDIENT_ICONS = [OnionIcon, CarrotIcon, TomatoIcon, ChickenLegIcon];

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
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
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
