import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MESSAGES = [
  "Thinking about what pairs well...",
  "Checking a few flavor combos...",
  "Almost got something good...",
];

export function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-border bg-surface px-6 py-14 text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        className="h-9 w-9 rounded-full border-[3px] border-accent-soft border-t-accent"
      />
      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="text-sm font-medium text-text-muted"
      >
        {MESSAGES[messageIndex]}
      </motion.p>
    </div>
  );
}
