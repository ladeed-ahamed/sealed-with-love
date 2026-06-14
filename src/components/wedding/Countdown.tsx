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
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setT(diff(target));
    setMounted(true);
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
    <div className="grid grid-cols-4 gap-2.5 sm:gap-5 w-full max-w-lg mx-auto pointer-events-auto">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="bg-white/90 border border-gold/25 shadow-[0_4px_16px_rgba(42,36,33,0.03)] rounded-2xl flex flex-col items-center justify-center px-2 py-4 md:py-6 backdrop-blur-sm"
        >
          <div className="relative h-10 overflow-hidden sm:h-14 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {mounted ? (
                <motion.div
                  key={value}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  className="font-display tabular-nums lining-nums text-3xl sm:text-5xl font-semibold text-gold"
                >
                  {String(value).padStart(2, "0")}
                </motion.div>
              ) : (
                <div className="font-display tabular-nums lining-nums text-3xl sm:text-5xl font-semibold text-gold">
                  00
                </div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-1.5 font-display tracking-[0.15em] text-[9px] sm:text-[11px] text-ink/70 font-semibold uppercase">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
