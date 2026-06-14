import { motion } from "framer-motion";
import { useMemo } from "react";

type Particle = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  kind: "heart" | "petal" | "dust";
};

const Heart = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21s-7.5-4.6-9.5-9.4C1 7.9 3.7 4 7.6 4c2 0 3.4 1.1 4.4 2.6C13 5.1 14.4 4 16.4 4 20.3 4 23 7.9 21.5 11.6 19.5 16.4 12 21 12 21z" />
  </svg>
);

const Petal = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 19c-.3 1-.7 1.8-1.5 2.1-1.3.6-3.8.3-6-.7-2.3-1-3.7-2.8-3.9-4.2-.2-1.4.6-2.5 1.7-4.1 1.4-2 3.8-5.3 4.7-6.1.7-.6 1.8-.7 2.1 0 .2.5-.2 2 .2 3.6.3 1.4 1.5 2.5 2.2 4.1 1 2.3 1 4.4.5 5.2z" />
  </svg>
);

const Dust = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="5" />
  </svg>
);

export function FloatingParticles({ count = 35 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const r = (i * 9301 + 49297) % 233280;
      const rand = (n: number) => ((r * (n + 1)) % 1000) / 1000;
      const k = i % 3;
      return {
        id: i,
        left: rand(1) * 100,
        size: 8 + rand(2) * 16,
        duration: 16 + rand(3) * 20,
        delay: rand(4) * 14,
        drift: (rand(5) - 0.5) * 100,
        kind: k === 0 ? "heart" : k === 1 ? "petal" : "dust",
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {particles.map((p) => {
        let color = "text-gold-light/30";
        let particleElement = <Heart size={p.size} />;

        if (p.kind === "petal") {
          color = "text-gold-light/20";
          particleElement = <Petal size={p.size} />;
        } else if (p.kind === "dust") {
          color = "text-gold/25";
          particleElement = <Dust size={p.size * 0.6} />;
        }

        return (
          <motion.div
            key={p.id}
            className={`absolute ${color}`}
            style={{ left: `${p.left}%`, bottom: "-10%" }}
            initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: "-120vh",
              x: p.drift,
              opacity: [0, 0.7, 0.7, 0],
              rotate: [0, p.drift > 0 ? 180 : -180],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {particleElement}
          </motion.div>
        );
      })}
    </div>
  );
}
