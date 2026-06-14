import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, Suspense, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

import { wedding } from "@/lib/wedding-data";
import { DrawnEnvelope } from "@/components/wedding/DrawnEnvelope";
import { DialogueBox } from "@/components/wedding/DialogueBox";
import { DrawnCountdown } from "@/components/wedding/DrawnCountdown";
import { RetroCoupleCard } from "@/components/wedding/RetroCoupleCard";
import { RetroEventCard } from "@/components/wedding/RetroEventCard";

export const Route = createFileRoute("/")({
  component: Index,
});

// Create a sequence of dialogue messages from the wedding data
interface StoryChapter {
  speaker: string;
  text?: string;
  component?: ReactNode;
}

const storySequence: StoryChapter[] = [
  { speaker: "MESSENGER", text: wedding.openingLine },
  { speaker: "INVITATION", text: wedding.body },
  { 
    speaker: "THE COUPLE", 
    text: `Introducing the Groom & Bride: ${wedding.groom.firstName} & ${wedding.bride.firstName}`,
    component: <RetroCoupleCard /> 
  },
  { speaker: wedding.groom.firstName.toUpperCase() + " & " + wedding.bride.firstName.toUpperCase(), text: `Please join us for our ${wedding.event.label}` },
  { 
    speaker: "THE CEREMONY", 
    text: `Join us at ${wedding.event.venue} for the celebration.`,
    component: <RetroEventCard /> 
  },
  {
    speaker: "COUNTDOWN",
    text: "Time left until the big day:",
    component: <DrawnCountdown targetDateIso={wedding.event.iso} />
  },
  { speaker: "BLESSING", text: wedding.closingBlessing },
  { speaker: "FAREWELL", text: `We can't wait to see you there!\n\n${wedding.closingScript}` }
];

function LoaderNotifier({ onLoaded }: { onLoaded: () => void }) {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);
  return null;
}

function Index() {
  const [gameState, setGameState] = useState<"loading" | "reading" | "finished">("loading");
  const [currentDialogueIdx, setCurrentDialogueIdx] = useState(0);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const hasComponent = !!storySequence[currentDialogueIdx].component;

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

  const handleNextDialogue = () => {
    if (currentDialogueIdx < storySequence.length - 1) {
      setCurrentDialogueIdx(prev => prev + 1);
    } else {
      setGameState("finished");
    }
  };

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
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-transparent">

      {/* Sketchy Loading Overlay */}
      {gameState === "loading" && !canvasLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-20 pointer-events-none">
          <div className="text-center p-8">
            <h2 className="font-pixel text-4xl text-ink uppercase animate-pulse">Loading Invitation...</h2>
            <p className="font-dialogue text-2xl mt-4">Opening the gates of love...</p>
          </div>
        </div>
      )}

      {/* 3D WebGL Background & Interactive Elements */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
          gameState === "loading" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <Suspense fallback={null}>
            <DrawnEnvelope onClick={() => setTimeout(() => setGameState("reading"), 100)} />
            <Environment preset="city" />
            <LoaderNotifier onLoaded={() => setCanvasLoaded(true)} />
          </Suspense>
        </Canvas>
      </div>

      {/* 2D HTML UI Overlay */}
      {gameState !== "loading" && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {gameState === "reading" && (
            <>
              {/* Center Screen Illustration Overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-4 pb-[220px] md:pb-4">
                <AnimatePresence mode="wait">
                  {storySequence[currentDialogueIdx].component && (
                    <motion.div
                      key={`illustration-${currentDialogueIdx}`}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="w-full flex justify-center pointer-events-auto"
                    >
                      {storySequence[currentDialogueIdx].component}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dialogue Box */}
              <motion.div 
                key={hasComponent ? "dialogue-bottom" : `dialogue-center-${currentDialogueIdx}`}
                initial={{ opacity: 0, y: hasComponent ? 30 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: hasComponent ? 30 : -10 }}
                transition={{ duration: 0.3 }}
                className={
                  hasComponent 
                    ? "absolute bottom-10 left-4 right-4 md:left-10 md:right-10 pointer-events-auto z-20"
                    : "absolute inset-0 flex items-center justify-center p-4 pointer-events-auto z-20"
                }
              >
                <DialogueBox 
                  speaker={storySequence[currentDialogueIdx].speaker}
                  text={storySequence[currentDialogueIdx].text}
                  onNext={handleNextDialogue}
                />
              </motion.div>
            </>
          )}

          {gameState === "finished" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto">
              <div className="drawn-card p-10 flex flex-col gap-6 items-center">
                <h2 className="font-pixel text-4xl text-blue-accent uppercase">End of Chapter</h2>
                <p className="font-dialogue text-2xl">{wedding.footerTagline}</p>
                <button 
                  className="name-tag mt-4 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  onClick={() => {
                    setCurrentDialogueIdx(0);
                    setCanvasLoaded(false); // Reset canvas loader
                    setGameState("loading");
                  }}
                >
                  REPLAY STORY
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
