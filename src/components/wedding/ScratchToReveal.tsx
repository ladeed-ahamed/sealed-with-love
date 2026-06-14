import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScratchToRevealProps {
  children: ReactNode;
}

export function ScratchToReveal({ children }: ScratchToRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const CANVAS_WIDTH = 260;
  const CANVAS_HEIGHT = 70;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Create striped/textured gold gradient matching the screenshot
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "oklch(0.68 0.14 65)"); // rosegold
    gradient.addColorStop(1, "oklch(0.58 0.12 60)"); // darker rosegold

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add overlay pattern (simulating diagonal lines)
    ctx.strokeStyle = "rgba(0,0,0,0.05)";
    ctx.lineWidth = 2;
    for (let i = -canvas.height; i < canvas.width; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + canvas.height, canvas.height);
      ctx.stroke();
    }

    // Add text
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 11px sans-serif";
    ctx.letterSpacing = "2px";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ SCRATCH TO REVEAL ✨", canvas.width / 2, canvas.height / 2);
  }, []);

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    checkRevealed();
  };

  const checkRevealed = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Check a subset of pixels for performance
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    const step = 4 * 4;
    let totalChecked = 0;

    for (let i = 3; i < pixels.length; i += step) {
      if (pixels[i] === 0) transparentPixels++;
      totalChecked++;
    }

    const clearPercentage = transparentPixels / totalChecked;
    if (clearPercentage > 0.4) {
      setIsRevealed(true);
    }
  };

  return (
    <div className="relative mx-auto w-full">
      {/* Hidden content */}
      <div
        className="transition-all duration-1000"
        style={{
          opacity: isRevealed ? 1 : 0.15,
          pointerEvents: isRevealed ? "auto" : "none",
          filter: isRevealed ? "blur(0px)" : "blur(8px)",
        }}
      >
        {children}
      </div>

      {/* Small centered Scratch button */}
      <AnimatePresence>
        {!isRevealed && (
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 shadow-lg drop-shadow-xl">
            <motion.canvas
              ref={canvasRef}
              onPointerDown={(e) => {
                setIsDrawing(true);
                scratch(e);
              }}
              onPointerMove={scratch}
              onPointerUp={() => setIsDrawing(false)}
              onPointerLeave={() => setIsDrawing(false)}
              className="cursor-crosshair touch-none rounded-md"
              exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)", transition: { duration: 0.6 } }}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
