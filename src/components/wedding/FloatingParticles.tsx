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
    <path d="M12 2c4 4 6 8 6 12a6 6 0 11-12 0c0-4 2-8 6-12z" />
  </svg>
);

export function FloatingParticles({ count = 40 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const r = (i * 9301 + 49297) % 233280;
      const rand = (n: number) => ((r * (n + 1)) % 1000) / 1000;
      const k = i % 3;
      return {
        id: i,
        left: rand(1) * 100,
        size: 6 + rand(2) * 14,
        duration: 14 + rand(3) * 18,
        delay: rand(4) * 12,
        drift: (rand(5) - 0.5) * 80,
        kind: k === 0 ? "heart" : k === 1 ? "petal" : "dust",
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => {
        const color =
          p.kind === "heart"
            ? "text-rosegold/30"
            : p.kind === "petal"
              ? "text-rosegold-soft/35"
              : "text-rosegold/40";
        return (
          <motion.div
            key={p.id}
            className={`absolute ${color}`}
            style={{ left: `${p.left}%`, top: "-5%" }}
            initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: "115vh",
              x: p.drift,
              opacity: [0, 0.6, 0.6, 0],
              rotate: 360,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {p.kind === "heart" ? (
              <Heart size={p.size} />
            ) : p.kind === "petal" ? (
              <Petal size={p.size} />
            ) : (
              <div
                className="rounded-full bg-rosegold/50"
                style={{ width: p.size / 3, height: p.size / 3 }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
