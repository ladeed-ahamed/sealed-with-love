import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { wedding } from "@/lib/wedding-data";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const reduce = useReducedMotion();

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, reduce ? 200 : 2000);
  };

  return (
    <div className="relative mx-auto" style={{ width: "min(92vw, 440px)" }}>
      {/* Soft shadow beneath */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-envelope/40 blur-2xl"
        style={{ bottom: -28, width: "80%", height: 40 }}
        animate={{ opacity: opening ? 0.2 : 0.5, scaleX: opening ? 1.15 : 1 }}
        transition={{ duration: 0.8 }}
      />

      <motion.div
        className="relative aspect-[1.55/1] cursor-pointer select-none"
        whileHover={{ y: -4 }}
        animate={
          opening
            ? { opacity: [1, 1, 0], scale: [1, 1, 0.9], transition: { duration: 3.5, times: [0, 0.75, 1], ease: "easeInOut" } }
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
            background:
              "linear-gradient(160deg, oklch(0.34 0.06 40) 0%, oklch(0.28 0.06 38) 50%, oklch(0.24 0.05 36) 100%)",
            boxShadow:
              "var(--shadow-envelope), inset 0 0 0 1px color-mix(in oklab, var(--rosegold) 55%, transparent), inset 0 0 0 2px color-mix(in oklab, var(--rosegold) 15%, transparent)",
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
            background:
              "linear-gradient(180deg, oklch(0.99 0.012 80), oklch(0.95 0.02 75))",
            boxShadow:
              "0 12px 30px -10px rgba(0,0,0,0.45), inset 0 0 0 1px color-mix(in oklab, var(--rosegold) 35%, transparent)",
            zIndex: 1,
          }}
          initial={{ y: "0%", scale: 1, opacity: 1 }}
          animate={
            opening 
              ? { 
                  y: ["0%", "-80%", "-130%"], 
                  scale: [1, 1.05, 1.2],
                  opacity: [1, 1, 0]
                } 
              : { y: "0%", scale: 1, opacity: 1 }
          }
          transition={{ 
            duration: 2.0, 
            delay: 0.6, 
            times: [0, 0.5, 1],
            ease: "easeInOut" 
          }}
        >
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="font-label text-[10px] text-rosegold sm:text-xs">Wedding</p>
            <p className="font-script text-3xl text-ink sm:text-4xl">Invitation</p>
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
              background:
                "linear-gradient(180deg, oklch(0.36 0.06 40), oklch(0.28 0.06 38))",
              boxShadow:
                "inset 0 0 0 1px color-mix(in oklab, var(--rosegold) 55%, transparent)",
            }}
          />
        </motion.div>

        {/* Wax seal */}
        <motion.div
          className="absolute left-1/2 top-[50%] z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-24 sm:w-24"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, oklch(0.55 0.16 30), oklch(0.38 0.14 28) 60%, oklch(0.30 0.10 25))",
            boxShadow:
              "0 8px 18px -4px rgba(0,0,0,0.55), inset 0 0 0 2px color-mix(in oklab, var(--rosegold) 45%, transparent), inset 0 -4px 10px rgba(0,0,0,0.4)",
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
          <div className="text-center leading-none">
            <div className="font-script text-[11px] text-rosegold-soft sm:text-xs">
              {wedding.groom.firstName}
            </div>
            <div className="font-label text-[9px] tracking-widest text-rosegold-soft sm:text-[10px]">
              &amp;
            </div>
            <div className="font-script text-[11px] text-rosegold-soft sm:text-xs">
              {wedding.bride.firstName}
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
                  background:
                    "linear-gradient(135deg, oklch(0.48 0.15 30), oklch(0.32 0.12 26))",
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
            boxShadow:
              "0 0 60px color-mix(in oklab, var(--rosegold) 25%, transparent)",
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

      <span className="sr-only">{wedding.groom.firstName} and {wedding.bride.firstName}</span>
    </div>
  );
}
