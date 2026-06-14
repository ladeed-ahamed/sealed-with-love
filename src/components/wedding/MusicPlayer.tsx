import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Local asset — place your MP3 at: public/audio/wedding-song.mp3
const SONG_URL = "/audio/wedding-song.mp3";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = new Audio(SONG_URL);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    const startAudio = async () => {
      try {
        await audio.play();
        setPlaying(true);
        setAutoplayBlocked(false);
        // Remove listeners once successfully started
        ["click", "touchstart", "scroll"].forEach((evt) =>
          document.removeEventListener(evt, startAudio)
        );
      } catch (err) {
        // Still blocked, wait for next interaction
      }
    };

    // Try to play immediately (works on desktop sometimes)
    audio.play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        // Blocked by browser policy. 
        // We will start it the moment the user taps the envelope.
        setAutoplayBlocked(true);
        ["click", "touchstart", "scroll"].forEach((evt) =>
          document.addEventListener(evt, startAudio, { once: false })
        );
      });

    return () => {
      audio.pause();
      audio.src = "";
      ["click", "touchstart", "scroll"].forEach((evt) =>
        document.removeEventListener(evt, startAudio)
      );
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Autoplay blocked hint */}
      <AnimatePresence>
        {autoplayBlocked && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="drawn-card px-4 py-2 font-pixel text-lg text-ink shadow-[2px_2px_0px_var(--ink)]"
          >
            TAP TO PLAY AUDIO
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player button */}
      <motion.button
        id="music-player-btn"
        aria-label={playing ? "Pause music" : "Play wedding music"}
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="play-btn flex h-14 w-14 items-center justify-center rounded-sm"
        style={{ cursor: "pointer" }}
      >
        {/* Simple drawn icon */}
        {playing ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round">
            <path d="M5 3L19 12L5 21V3Z"></path>
          </svg>
        )}
      </motion.button>
    </div>
  );
}
