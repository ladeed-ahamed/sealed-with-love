import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-data";

export function RetroCoupleCard() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-12 w-full max-w-4xl px-4 pointer-events-auto">
      
      {/* Groom Card */}
      <motion.div
        initial={{ opacity: 0, x: -50, rotate: -2 }}
        animate={{ opacity: 1, x: 0, rotate: -1 }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
        whileHover={{ scale: 1.02, rotate: -2 }}
        className="drawn-card w-full md:w-[280px] bg-white p-3 md:p-6 flex flex-col items-center text-center select-none"
      >
        <div className="name-tag mb-2 md:mb-4 text-sm md:text-xl bg-blue-accent shadow-[2px_2px_0px_var(--ink)]">
          GROOM
        </div>
        
        {/* Retro Profile Frame */}
        <div className="w-14 h-14 md:w-24 md:h-24 rounded-full border-4 border-ink flex items-center justify-center bg-background/50 mb-2 md:mb-4 shadow-[3px_3px_0px_var(--ink)]">
          <span className="font-pixel text-2xl md:text-4xl text-ink">🤵</span>
        </div>
        
        <h3 className="font-pixel text-xl md:text-3xl text-ink mb-0.5 md:mb-2 uppercase leading-none">
          {wedding.groom.name}
        </h3>
        
        <p className="font-dialogue text-xs md:text-lg leading-snug md:leading-relaxed text-ink/80 italic px-2">
          {wedding.groom.subtitle}
        </p>
      </motion.div>

      {/* Love Connector */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10 flex items-center justify-center w-10 h-10 md:w-16 md:h-16"
      >
        <div className="absolute font-pixel text-2xl md:text-5xl animate-bounce text-red-500 filter drop-shadow-[2px_2px_0px_var(--ink)]">
          ❤️
        </div>
        <svg 
          className="w-10 h-10 md:w-16 md:h-16 text-ink opacity-30 stroke-[3] fill-none" 
          viewBox="0 0 100 100"
        >
          <path d="M10,50 Q50,90 90,50" stroke="var(--ink)" strokeDasharray="5,5" />
        </svg>
      </motion.div>

      {/* Bride Card */}
      <motion.div
        initial={{ opacity: 0, x: 50, rotate: 2 }}
        animate={{ opacity: 1, x: 0, rotate: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
        whileHover={{ scale: 1.02, rotate: 2 }}
        className="drawn-card w-full md:w-[280px] bg-white p-3 md:p-6 flex flex-col items-center text-center select-none"
      >
        <div className="name-tag mb-2 md:mb-4 text-sm md:text-xl bg-red-400 shadow-[2px_2px_0px_var(--ink)]" style={{ backgroundColor: "oklch(0.75 0.15 15)" }}>
          BRIDE
        </div>
        
        {/* Retro Profile Frame */}
        <div className="w-14 h-14 md:w-24 md:h-24 rounded-full border-4 border-ink flex items-center justify-center bg-background/50 mb-2 md:mb-4 shadow-[3px_3px_0px_var(--ink)]">
          <span className="font-pixel text-2xl md:text-4xl text-ink">👰</span>
        </div>
        
        <h3 className="font-pixel text-xl md:text-3xl text-ink mb-0.5 md:mb-2 uppercase leading-none">
          {wedding.bride.name}
        </h3>
        
        <p className="font-dialogue text-xs md:text-lg leading-snug md:leading-relaxed text-ink/80 italic px-2">
          {wedding.bride.subtitle}
        </p>
      </motion.div>

    </div>
  );
}
