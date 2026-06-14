import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-data";

export function RetroEventCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="drawn-card w-full max-w-lg bg-white/95 p-6 md:p-10 flex flex-col items-center text-center select-none pointer-events-auto"
    >
      <div className="name-tag mb-4 text-xs tracking-[0.2em] bg-gradient-to-r from-gold to-gold/85 shadow-sm uppercase font-semibold">
        Reception Details
      </div>

      <h3 className="font-display text-2xl md:text-3xl text-foreground font-semibold mb-1 tracking-wide">
        {wedding.event.culturalName}
      </h3>

      {/* Decorative Separator */}
      <div className="flex items-center gap-3 my-4 justify-center text-gold/60">
        <span className="w-12 h-px bg-gold/30"></span>
        <span className="text-sm">❦</span>
        <span className="w-12 h-px bg-gold/30"></span>
      </div>

      <div className="flex flex-col gap-5 md:gap-7 w-full text-foreground">
        {/* Date Section */}
        <div>
          <span className="font-display text-xs tracking-[0.25em] text-gold uppercase font-bold block mb-1">
            DATE
          </span>
          <p className="font-display text-lg md:text-xl font-medium">{wedding.event.date}</p>
          {wedding.event.secondaryDate && (
            <p className="font-body text-xs text-foreground/60 italic mt-0.5">
              {wedding.event.secondaryDate}
            </p>
          )}
        </div>

        {/* Time Section */}
        <div>
          <span className="font-display text-xs tracking-[0.25em] text-gold uppercase font-bold block mb-1">
            TIME
          </span>
          <p className="font-display text-lg md:text-xl font-medium">{wedding.event.time}</p>
        </div>

        {/* Venue Section */}
        <div>
          <span className="font-display text-xs tracking-[0.25em] text-gold uppercase font-bold block mb-1">
            VENUE
          </span>
          <p className="font-display text-lg md:text-xl font-medium">{wedding.event.venue}</p>
          <p className="font-body text-xs md:text-sm text-foreground/75 mt-1.5 max-w-xs mx-auto leading-relaxed">
            {wedding.event.address}
          </p>
        </div>
      </div>

      {/* Map Action Button */}
      <a href={wedding.event.maps} target="_blank" rel="noreferrer" className="mt-6 md:mt-8">
        <button className="name-tag hover:scale-105 active:scale-95 transition-transform text-xs tracking-[0.2em] bg-gradient-to-r from-gold to-gold/85 shadow-md py-2.5 px-8 cursor-pointer font-semibold uppercase">
          VIEW ON MAP
        </button>
      </a>
    </motion.div>
  );
}
