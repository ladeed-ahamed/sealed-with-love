import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { wedding } from "@/lib/wedding-data";
import { Envelope } from "@/components/wedding/Envelope";
import { DrawnCountdown } from "@/components/wedding/DrawnCountdown";
import { CornerOrnament } from "@/components/wedding/CornerOrnament";
import { FloatingParticles } from "@/components/wedding/FloatingParticles";

export const Route = createFileRoute("/")({
  component: Index,
});

// A luxury vine divider to replace simple line separators
const VineDivider = () => (
  <div className="flex items-center justify-center my-8 select-none z-10 relative">
    <svg width="240" height="24" viewBox="0 0 240 24" fill="none" className="text-gold/60">
      {/* Left dotted trail */}
      <path
        d="M10 12 L 85 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.5"
      />
      {/* Right dotted trail */}
      <path
        d="M155 12 L 230 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.5"
      />
      {/* Central flourishes */}
      <path
        d="M85 12 C 95 18, 105 6, 120 12 C 135 6, 145 18, 155 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M112 12 C 115 8, 118 8, 120 12 C 122 8, 125 8, 128 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="120" cy="12" r="3.5" fill="var(--gold)" />
      {/* Left leaf */}
      <path
        d="M97 11 C 99 8, 103 9, 105 13 C 100 13, 98 12, 97 11 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Right leaf */}
      <path
        d="M143 13 C 141 8, 137 9, 135 13 C 140 13, 142 12, 143 13 Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  </div>
);

function Index() {
  const [gameState, setGameState] = useState<"loading" | "reading">("loading");
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    const handleErr = (e: ErrorEvent) => {
      setErrorText(e.message + "\n" + (e.error?.stack || ""));
    };
    const handleRej = (e: PromiseRejectionEvent) => {
      setErrorText((e.reason?.message || String(e.reason)) + "\n" + (e.reason?.stack || ""));
    };
    window.addEventListener("error", handleErr);
    window.addEventListener("unhandledrejection", handleRej);
    return () => {
      window.removeEventListener("error", handleErr);
      window.removeEventListener("unhandledrejection", handleRej);
    };
  }, []);

  if (errorText) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white p-6 overflow-auto text-red-600 font-mono pointer-events-auto">
        <h2 className="text-xl font-bold mb-4">React App Error Detected:</h2>
        <pre className="whitespace-pre-wrap">{errorText}</pre>
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded font-sans cursor-pointer"
          onClick={() => {
            setErrorText(null);
            window.location.reload();
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] w-full bg-transparent overflow-x-hidden">
      {/* Background Floating Particles */}
      <FloatingParticles count={30} />

      {/* Interactive Envelope Overlay */}
      {gameState === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="w-full flex items-center justify-center"
          >
            <Envelope onOpen={() => setGameState("reading")} />
          </motion.div>
        </div>
      )}

      {/* Main Single Page Wedding Invitation Card (scrollable) */}
      {gameState === "reading" && (
        <div className="min-h-screen w-full overflow-y-auto px-4 py-8 md:py-16 flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl w-full mx-auto bg-gradient-to-tr from-white/98 via-background/60 to-white/98 backdrop-blur-md rounded-3xl shadow-[0_25px_60px_rgba(42,36,33,0.07)] p-8 md:p-14 relative overflow-hidden select-text pointer-events-auto"
          >
            {/* Inset luxury double border frame */}
            <div className="absolute inset-4 border border-gold/20 rounded-[20px] pointer-events-none z-10" />
            <div className="absolute inset-[18px] border border-gold/10 rounded-[18px] pointer-events-none z-10" />

            {/* Premium Linen Paper Texture overlay */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none z-10"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              }}
            />

            {/* Decorative gold leaf corners inside the frame */}
            <CornerOrnament className="absolute top-6 left-6 w-14 h-14 text-gold/45 z-10" />
            <CornerOrnament className="absolute top-6 right-6 w-14 h-14 text-gold/45 z-10" flipX />
            <CornerOrnament
              className="absolute bottom-6 left-6 w-14 h-14 text-gold/45 z-10"
              flipY
            />
            <CornerOrnament
              className="absolute bottom-6 right-6 w-14 h-14 text-gold/45 z-10"
              flipX
              flipY
            />

            {/* 1. Islamic Header (Bismillah) */}
            <div className="text-center mb-8 mt-6 z-10 relative">
              <p className="font-arabic text-3xl md:text-4xl text-gold mb-2 leading-relaxed">
                {wedding.openingLine}
              </p>
              <p className="font-body text-[10px] sm:text-xs tracking-[0.15em] text-ink/70 uppercase font-semibold">
                {wedding.openingTranslation}
              </p>
            </div>

            {/* 2. Invitation Statement */}
            <div className="text-center mb-10 max-w-sm mx-auto z-10 relative">
              <p className="font-body text-[10px] sm:text-xs tracking-[0.25em] text-gold uppercase font-bold mb-4">
                {wedding.hosts}
              </p>
              <p className="font-display text-base md:text-lg text-ink/90 leading-relaxed font-medium">
                {wedding.body}
              </p>
              <p className="font-arabic text-xl md:text-2xl text-gold/90 mt-5 leading-relaxed">
                {wedding.culturalPhrase}
              </p>
            </div>

            <VineDivider />

            {/* 3. The Couple */}
            <div className="flex flex-col gap-4 text-center items-center mb-10 z-10 relative w-full">
              <span className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-gold/80 uppercase font-bold mb-2">
                THE WEDDING OF
              </span>

              <div className="flex flex-col items-center w-full gap-2">
                {/* Groom block */}
                <div className="flex flex-col items-center">
                  <h3 className="font-script text-5xl sm:text-6xl md:text-7xl text-ink font-medium leading-none">
                    {wedding.groom.name}
                  </h3>
                  <p className="text-[11px] text-ink/70 font-medium max-w-[280px] mt-2 leading-relaxed">
                    {wedding.groom.subtitle}
                  </p>
                </div>

                {/* Ampersand */}
                <div className="font-script text-5xl sm:text-6xl text-gold/90 select-none py-1 transform translate-y-[-4px]">
                  &amp;
                </div>

                {/* Bride block */}
                <div className="flex flex-col items-center">
                  <h3 className="font-script text-5xl sm:text-6xl md:text-7xl text-ink font-medium leading-none">
                    {wedding.bride.name}
                  </h3>
                  <p className="text-[11px] text-ink/70 font-medium max-w-[280px] mt-2 leading-relaxed">
                    {wedding.bride.subtitle}
                  </p>
                </div>
              </div>
            </div>

            <VineDivider />

            {/* 4. Event & Ceremony Details */}
            <div className="text-center flex flex-col gap-6 mb-10 z-10 relative">
              <div className="inline-flex items-center gap-4 justify-center">
                <span className="w-6 h-px bg-gold/30"></span>
                <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] text-gold uppercase font-bold">
                  Reception Details
                </span>
                <span className="w-6 h-px bg-gold/30"></span>
              </div>

              <h4 className="font-display text-xl text-ink font-bold tracking-wide">
                {wedding.event.culturalName}
              </h4>

              <div className="grid grid-cols-1 gap-6 max-w-sm w-full mx-auto mt-2">
                {/* Date Panel */}
                <div className="border border-gold/15 bg-white/40 backdrop-blur-sm p-6 rounded-2xl relative shadow-[0_4px_20px_rgba(42,36,33,0.02)]">
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold/30 rounded-tl-sm"></div>
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/30 rounded-tr-sm"></div>
                  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-gold/30 rounded-bl-sm"></div>
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold/30 rounded-br-sm"></div>

                  <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gold uppercase font-bold block mb-2">
                    DATE & TIME
                  </span>
                  <p className="font-display text-base font-bold text-ink">{wedding.event.date}</p>
                  <p className="font-body text-[11px] text-ink/70 font-medium mt-0.5">
                    {wedding.event.secondaryDate}
                  </p>
                  <div className="w-8 h-px bg-gold/25 mx-auto my-2.5"></div>
                  <p className="font-display text-base font-semibold text-ink">
                    {wedding.event.time}
                  </p>
                </div>

                {/* Venue Panel */}
                <div className="border border-gold/15 bg-white/40 backdrop-blur-sm p-6 rounded-2xl relative shadow-[0_4px_20px_rgba(42,36,33,0.02)]">
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold/30 rounded-tl-sm"></div>
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/30 rounded-tr-sm"></div>
                  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-gold/30 rounded-bl-sm"></div>
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold/30 rounded-br-sm"></div>

                  <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gold uppercase font-bold block mb-2">
                    VENUE
                  </span>
                  <p className="font-display text-base font-bold text-ink">{wedding.event.venue}</p>
                  <p className="font-body text-xs text-ink/80 leading-relaxed mt-2 px-2">
                    {wedding.event.address}
                  </p>
                </div>
              </div>

              {/* View Map Action Helper */}
              <a
                href={wedding.event.maps}
                target="_blank"
                rel="noreferrer"
                className="mt-4 self-center"
              >
                <button className="font-body text-[10px] tracking-[0.25em] bg-gold hover:bg-gold/90 text-white rounded-full py-3 px-8 cursor-pointer font-bold uppercase shadow-[0_4px_14px_rgba(212,175,55,0.2)] transition-all hover:scale-105 active:scale-95 duration-300">
                  VIEW ON MAP
                </button>
              </a>
            </div>

            <VineDivider />

            {/* 5. Countdown */}
            <div className="text-center mb-10 z-10 relative">
              <span className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-gold uppercase font-bold block mb-6">
                COUNTDOWN
              </span>
              <DrawnCountdown targetDateIso={wedding.event.iso} />
            </div>

            <VineDivider />

            {/* 6. Closing Blessing & Tagline */}
            <div className="text-center max-w-sm mx-auto z-10 relative mb-6">
              <div className="border border-gold/15 bg-white/35 backdrop-blur-sm p-6 rounded-2xl shadow-[inset_0_0_12px_rgba(212,175,55,0.03)] mb-6 relative">
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gold/25 rounded-tl-xs"></div>
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold/25 rounded-tr-xs"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gold/25 rounded-bl-xs"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gold/25 rounded-br-xs"></div>
                <p className="font-display text-base text-gold italic leading-relaxed">
                  {wedding.closingBlessing}
                </p>
              </div>
              <p className="font-body text-[10px] sm:text-xs tracking-[0.25em] text-gold uppercase font-bold">
                {wedding.closingScript}
              </p>
              <p className="font-script text-3xl text-ink mt-4">{wedding.footerTagline}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
