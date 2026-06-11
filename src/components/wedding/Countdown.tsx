import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function diff(target: number) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms / 3600000) % 24);
  const minutes = Math.floor((ms / 60000) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function Countdown({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = window.setInterval(() => setT(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const items: [string, number][] = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="parchment-card flex flex-col items-center justify-center rounded-md px-2 py-5 sm:py-8"
        >
          <div className="relative h-12 overflow-hidden sm:h-16">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={value}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl font-medium text-ink sm:text-6xl"
              >
                {String(value).padStart(2, "0")}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-2 font-label text-[9px] text-rosegold sm:text-xs">
            {label.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
}
