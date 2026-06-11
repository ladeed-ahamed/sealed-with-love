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
            className="rounded-full border border-rosegold/40 bg-background/90 px-4 py-1.5 font-label text-[10px] tracking-[0.2em] text-rosegold shadow-lg backdrop-blur-sm"
          >
            ♪ TAP ANYWHERE TO PLAY
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player button */}
      <motion.button
        id="music-player-btn"
        aria-label={playing ? "Pause music" : "Play wedding music"}
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-rosegold/60 bg-background/90 shadow-xl backdrop-blur-sm transition-colors hover:bg-rosegold/10"
        style={{ cursor: "pointer" }}
      >
        {/* Rotating ring when playing */}
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border border-rosegold/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />
        )}

        {/* Pulse ring */}
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border border-rosegold/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        )}

        {/* Icon */}
        {playing ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-rosegold"
          >
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-rosegold"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </motion.button>

      {/* Now playing label */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className="rounded-full border border-rosegold/30 bg-background/80 px-3 py-1 font-label text-[9px] tracking-[0.15em] text-rosegold-soft backdrop-blur-sm"
          >
            ♪ Now Playing
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
