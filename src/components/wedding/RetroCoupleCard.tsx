import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-data";

export function RetroCoupleCard() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 w-full max-w-4xl px-4 pointer-events-auto">
      {/* Groom Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        whileHover={{ y: -4 }}
        className="drawn-card w-full md:w-[290px] bg-white/90 p-6 md:p-8 flex flex-col items-center text-center select-none"
      >
        <div className="name-tag mb-4 text-xs tracking-[0.2em] bg-gradient-to-r from-gold to-gold/85 shadow-sm uppercase font-semibold">
          Groom
        </div>

        {/* Calligraphic Monogram for Groom */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5 mb-4 shadow-[0_4px_12px_rgba(212,175,55,0.08)]">
          <span className="font-script text-4xl md:text-5xl text-gold mt-1">A</span>
        </div>

        <h3 className="font-display text-xl md:text-2xl text-foreground font-semibold mb-2 tracking-wide">
          {wedding.groom.name}
        </h3>

        <p className="font-body text-xs md:text-sm leading-relaxed text-foreground/75 italic px-2">
          {wedding.groom.subtitle}
        </p>
      </motion.div>

      {/* Love Connector */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 flex flex-col items-center justify-center w-12 h-12 md:w-16 md:h-16 my-2 md:my-0"
      >
        <div className="absolute animate-pulse text-rose-400">
          <svg
            className="w-8 h-8 md:w-11 h-11 text-rose-400/90 filter drop-shadow-md"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <svg
          className="w-12 h-12 md:w-16 md:h-16 text-gold/30 stroke-[2] fill-none"
          viewBox="0 0 100 100"
        >
          <path d="M10,50 Q50,80 90,50" stroke="currentColor" strokeDasharray="6,6" />
        </svg>
      </motion.div>

      {/* Bride Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        whileHover={{ y: -4 }}
        className="drawn-card w-full md:w-[290px] bg-white/90 p-6 md:p-8 flex flex-col items-center text-center select-none"
      >
        <div className="name-tag mb-4 text-xs tracking-[0.2em] bg-gradient-to-r from-rosegold to-rosegold/85 shadow-sm uppercase font-semibold">
          Bride
        </div>

        {/* Calligraphic Monogram for Bride */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-rosegold/30 flex items-center justify-center bg-rosegold/5 mb-4 shadow-[0_4px_12px_rgba(183,110,121,0.08)]">
          <span className="font-script text-4xl md:text-5xl text-rosegold mt-1">A</span>
        </div>

        <h3 className="font-display text-xl md:text-2xl text-foreground font-semibold mb-2 tracking-wide">
          {wedding.bride.name}
        </h3>

        <p className="font-body text-xs md:text-sm leading-relaxed text-foreground/75 italic px-2">
          {wedding.bride.subtitle}
        </p>
      </motion.div>
    </div>
  );
}
