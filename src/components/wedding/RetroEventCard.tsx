import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-data";

export function RetroEventCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="drawn-card w-full max-w-lg bg-white p-4 md:p-8 flex flex-col items-center text-center select-none shadow-[6px_6px_0px_var(--ink)] pointer-events-auto"
    >
      <div className="name-tag mb-4 md:mb-6 text-lg md:text-xl bg-blue-accent shadow-[2px_2px_0px_var(--ink)]">
        CEREMONY DETAILS
      </div>

      <h3 className="font-pixel text-2xl md:text-4xl text-ink mb-1 md:mb-2 uppercase leading-none">
        {wedding.event.culturalName}
      </h3>
      
      <div className="w-20 md:w-24 h-1 border-t-4 border-ink border-dashed my-2 md:my-4"></div>

      <div className="flex flex-col gap-3 md:gap-6 w-full font-dialogue text-ink">
        {/* Date Section */}
        <div>
          <span className="font-pixel text-base md:text-lg text-blue-accent uppercase block tracking-wider">DATE</span>
          <p className="text-xl md:text-2xl font-bold">{wedding.event.date}</p>
          {wedding.event.secondaryDate && (
            <p className="text-xs md:text-sm italic opacity-75">{wedding.event.secondaryDate}</p>
          )}
        </div>

        {/* Time Section */}
        <div>
          <span className="font-pixel text-base md:text-lg text-blue-accent uppercase block tracking-wider">TIME</span>
          <p className="text-xl md:text-2xl font-bold">{wedding.event.time}</p>
        </div>

        {/* Venue Section */}
        <div>
          <span className="font-pixel text-base md:text-lg text-blue-accent uppercase block tracking-wider">VENUE</span>
          <p className="text-xl md:text-2xl font-bold">{wedding.event.venue}</p>
          <p className="text-sm md:text-md opacity-80 mt-0.5 md:mt-1 max-w-sm mx-auto leading-relaxed">{wedding.event.address}</p>
        </div>
      </div>

      {/* Map Action Button */}
      <a 
        href={wedding.event.maps} 
        target="_blank" 
        rel="noreferrer" 
        className="mt-4 md:mt-6 inline-block"
      >
        <button className="name-tag hover:scale-105 active:scale-95 transition-transform text-xl md:text-2xl cursor-pointer">
          VIEW ON MAP
        </button>
      </a>

    </motion.div>
  );
}
