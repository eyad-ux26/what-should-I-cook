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
      className="recipe-card flex flex-col items-center justify-center gap-5 px-6 py-14 text-center"
    >
      <motion.div
        animate={{ rotate: [0, -18, 18, -10, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        className="text-4xl"
      >
        🥄
      </motion.div>
      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="font-note text-base font-medium text-text-muted"
      >
        {MESSAGES[messageIndex]}
      </motion.p>
    </div>
  );
}
