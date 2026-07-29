import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { wedding } from "@/lib/wedding-data";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [burstHearts, setBurstHearts] = useState<
    { id: number; x: number; y: number; scale: number; color: string }[]
  >([]);
  const reduce = useReducedMotion();

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);

    // Generate circular explosion of rose gold heart particles
    const hearts = Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const velocity = 80 + Math.random() * 140;
      return {
        id: i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity - 15,
        scale: 0.6 + Math.random() * 0.8,
        color: "var(--rosegold)",
      };
    });
    setBurstHearts(hearts);

    window.setTimeout(onOpen, reduce ? 200 : 2400);
  };

  return (
    <div className="relative mx-auto" style={{ width: "min(92vw, 440px)" }}>
      {/* Soft shadow beneath */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-gold/10 blur-2xl"
        style={{ bottom: -28, width: "80%", height: 40 }}
        animate={{ opacity: opening ? 0.2 : 0.5, scaleX: opening ? 1.15 : 1 }}
        transition={{ duration: 0.8 }}
      />

      <motion.div
        className="relative aspect-[1.55/1] cursor-pointer select-none"
        whileHover={{ y: -4 }}
        animate={
          opening
            ? {
                opacity: [1, 1, 0],
                scale: [1, 1, 0.9],
                transition: { duration: 3.5, times: [0, 0.75, 1], ease: "easeInOut" },
              }
            : { opacity: 1, scale: 1 }
        }
        onClick={handleOpen}
        role="button"
        aria-label="Open the invitation"
      >
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            background: "linear-gradient(135deg, oklch(0.98 0.01 65) 0%, oklch(0.94 0.02 65) 100%)",
            boxShadow:
              "var(--shadow-envelope), inset 0 0 0 1.2px color-mix(in oklab, var(--rosegold) 35%, transparent), inset 0 0 0 2.2px color-mix(in oklab, var(--rosegold) 15%, transparent)",
          }}
        />
        {/* Paper texture overlay */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-md opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />

        {/* Rising invitation card peek */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm"
          style={{
            width: "82%",
            height: "78%",
            background: "linear-gradient(180deg, oklch(0.99 0.012 80), oklch(0.95 0.02 75))",
            boxShadow:
              "0 12px 30px -10px rgba(42, 36, 33, 0.15), inset 0 0 0 1px color-mix(in oklab, var(--rosegold) 30%, transparent)",
            zIndex: 1,
          }}
          initial={{ y: "0%", scale: 1, opacity: 1, rotate: 0 }}
          animate={
            opening
              ? {
                  y: ["0%", "-30%", "-10%"],
                  scale: [1, 1.05, 1.45],
                  rotate: [0, -2, 0],
                  opacity: [1, 1, 0],
                }
              : { y: "0%", scale: 1, opacity: 1, rotate: 0 }
          }
          transition={{
            duration: 2.2,
            delay: 0.6,
            times: [0, 0.4, 1],
            ease: "easeInOut",
          }}
        >
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="font-label text-[10px] text-gold sm:text-xs tracking-widest font-semibold">
              Wedding
            </p>
            <p className="font-script text-4xl text-rosegold">Invitation</p>
          </div>
        </motion.div>

        {/* Envelope flap */}
        <motion.div
          className="absolute inset-x-0 top-0 origin-top"
          style={{ height: "62%", zIndex: 2, transformPerspective: 900 }}
          initial={{ rotateX: 0 }}
          animate={opening ? { rotateX: -178 } : { rotateX: 0 }}
          transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <div
            className="h-full w-full"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, oklch(0.98 0.01 65), oklch(0.93 0.02 65))",
              boxShadow: "inset 0 0 0 1.2px color-mix(in oklab, var(--rosegold) 35%, transparent)",
            }}
          />
        </motion.div>

        {/* Wax seal */}
        <motion.div
          className="absolute left-1/2 top-[50%] z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-24 sm:w-24"
          style={{
            background: "linear-gradient(135deg, var(--rosegold) 0%, oklch(0.58 0.10 5) 100%)",
            boxShadow:
              "0 8px 18px -4px rgba(42, 36, 33, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.25)",
          }}
          animate={
            opening
              ? { scale: [1, 1.1, 0], rotate: [0, -8, 20], opacity: [1, 1, 0] }
              : { scale: [1, 1.03, 1] }
          }
          transition={
            opening
              ? { duration: 0.9, times: [0, 0.4, 1], ease: "easeInOut" }
              : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="text-center leading-none flex flex-col items-center justify-center">
            <div className="font-display font-bold text-xl text-white sm:text-2xl select-none">
              {wedding.bride.firstName[0].toUpperCase()}
            </div>
            <div className="font-label text-[8px] tracking-widest text-white/80 my-1 uppercase font-bold select-none">
              &amp;
            </div>
            <div className="font-display font-bold text-xl text-white sm:text-2xl select-none">
              {wedding.groom.firstName[0].toUpperCase()}
            </div>
          </div>
        </motion.div>

        {/* Wax crack pieces */}
        {opening && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                aria-hidden
                className="absolute left-1/2 top-[50%] z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-sm"
                style={{
                  background: "var(--rosegold)",
                }}
                initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x: (i % 2 === 0 ? -1 : 1) * (40 + i * 12),
                  y: (i < 2 ? -1 : 1) * (30 + i * 10),
                  rotate: i * 90,
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            ))}
          </>
        )}

        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-md"
          style={{
            boxShadow: "0 0 60px color-mix(in oklab, var(--rosegold) 25%, transparent)",
          }}
        />
      </motion.div>

      <motion.p
        className="mt-10 text-center font-label text-xs text-rosegold sm:text-sm"
        animate={{ opacity: opening ? 0 : [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        — TAP THE SEAL TO OPEN —
      </motion.p>

      {/* Burst Heart Particles */}
      {burstHearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute z-[999] pointer-events-none select-none"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: h.x,
            y: h.y,
            scale: h.scale,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={h.color}>
            <path d="M12 21s-7.5-4.6-9.5-9.4C1 7.9 3.7 4 7.6 4c2 0 3.4 1.1 4.4 2.6C13 5.1 14.4 4 16.4 4 20.3 4 23 7.9 21.5 11.6 19.5 16.4 12 21 12 21z" />
          </svg>
        </motion.div>
      ))}

      <span className="sr-only">
        {wedding.bride.firstName} and {wedding.groom.firstName}
      </span>
    </div>
  );
}
