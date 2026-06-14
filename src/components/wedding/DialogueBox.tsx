import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, ReactNode } from "react";
import { CornerOrnament } from "./CornerOrnament";

interface DialogueBoxProps {
  speaker?: string;
  text?: string;
  children?: ReactNode;
  onNext?: () => void;
  isTypingEffect?: boolean;
}

export function DialogueBox({
  speaker = "MESSENGER",
  text,
  children,
  onNext,
  isTypingEffect = true,
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Typewriter effect
  useEffect(() => {
    if (!text) {
      setIsTyping(false);
      return;
    }

    if (!isTypingEffect) {
      setDisplayedText(text);
      return;
    }

    setDisplayedText("");
    setIsTyping(true);
    let i = 0;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        setIsTyping(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    }, 30);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, isTypingEffect]);

  // Click handler to either skip typing or go to next
  const handleClick = () => {
    if (isTyping && text) {
      // Skip typing effect and show full text immediately
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsTyping(false);
      setDisplayedText(text);
    } else if (onNext) {
      onNext();
    }
  };

  const isArabic = speaker === "MESSENGER" || (text && /[\u0600-\u06FF]/.test(text));

  return (
    <div
      className="relative w-full max-w-2xl mx-auto cursor-pointer select-none"
      onClick={handleClick}
    >
      {/* Name Tag / Speaker Header */}
      {speaker && (
        <div className="absolute -top-3 left-6 z-10">
          <span className="font-display bg-white/95 backdrop-blur px-5 py-1 text-xs md:text-sm tracking-[0.2em] font-semibold text-gold border border-gold/30 rounded-full shadow-[0_4px_12px_rgba(42,36,33,0.04)] uppercase">
            {speaker}
          </span>
        </div>
      )}

      {/* Main Dialogue Box */}
      <div className="drawn-card p-8 md:p-12 min-h-[140px] md:min-h-[170px] flex flex-col justify-center relative overflow-hidden">
        {/* Decorative gold corners */}
        <CornerOrnament className="absolute top-2.5 left-2.5 w-8 h-8 text-gold/25" />
        <CornerOrnament className="absolute top-2.5 right-2.5 w-8 h-8 text-gold/25" flipX />
        <CornerOrnament className="absolute bottom-2.5 left-2.5 w-8 h-8 text-gold/25" flipY />
        <CornerOrnament
          className="absolute bottom-2.5 right-2.5 w-8 h-8 text-gold/25"
          flipX
          flipY
        />

        {text && (
          <p
            className={`${
              isArabic
                ? "font-arabic text-2xl md:text-3xl text-gold text-center py-2 leading-loose"
                : "font-display text-lg md:text-xl text-ink/90 text-center px-2 md:px-6 italic leading-relaxed"
            } whitespace-pre-line`}
          >
            {displayedText}
          </p>
        )}

        {/* Custom Content (Countdown, Maps, Gallery) fading in after typing finishes */}
        {children && !isTyping && (
          <motion.div
            className="mt-6 w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}

        {/* Next Button indicator */}
        <AnimatePresence>
          {!isTyping && onNext && (
            <motion.div
              className="absolute -bottom-4 right-6 z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className="play-btn w-11 h-11 md:w-13 md:h-13 flex items-center justify-center bg-white border border-gold/40 text-gold shadow-md hover:bg-gold/5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
