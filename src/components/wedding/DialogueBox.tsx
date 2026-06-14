import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, ReactNode } from "react";

interface DialogueBoxProps {
  speaker?: string;
  text?: string;
  children?: ReactNode;
  onNext?: () => void;
  isTypingEffect?: boolean;
}

export function DialogueBox({ speaker = "MESSENGER", text, children, onNext, isTypingEffect = true }: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<any>(null);

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

  return (
    <div className="relative w-full max-w-2xl mx-auto cursor-pointer select-none" onClick={handleClick}>
      {/* Name Tag */}
      {speaker && (
        <div className="absolute -top-4 left-4 z-10">
          <div className="name-tag text-xl md:text-2xl shadow-[4px_4px_0px_var(--ink)]">
            {speaker}
          </div>
        </div>
      )}

      {/* Main Dialogue Box */}
      <div 
        className="drawn-card p-6 md:p-8 min-h-[120px] md:min-h-[150px] flex flex-col justify-center"
      >
        {text && (
          <p className="text-2xl md:text-3xl leading-relaxed whitespace-pre-line">
            {displayedText}
          </p>
        )}

        {/* Custom Content (Countdown, Maps, Gallery) fading in after typing finishes */}
        {children && !isTyping && (
          <motion.div 
            className="mt-6 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {children}
          </motion.div>
        )}

        {/* Next Button / Blinking Cursor indicator */}
        <AnimatePresence>
          {!isTyping && onNext && (
            <motion.div 
              className="absolute -bottom-4 -right-4 z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                className="play-btn w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                {/* Hand-drawn triangle play icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L20 12L6 20V4Z" fill="var(--blue-accent)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
