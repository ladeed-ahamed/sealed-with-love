import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Canvas, b as useFrame } from "../_libs/react-three__fiber.mjs";
import { E as Environment, L as Line, T as Text } from "../_libs/react-three__drei.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { D as DoubleSide } from "../_libs/three.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/suspend-react.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/react-use-measure.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/three-stdlib.mjs";
import "../_libs/fflate.mjs";
import "module";
import "../_libs/troika-three-text.mjs";
import "../_libs/troika-worker-utils.mjs";
import "../_libs/webgl-sdf-generator.mjs";
import "../_libs/bidi-js.mjs";
import "../_libs/troika-three-utils.mjs";
import "../_libs/monogrid__gainmap-js.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const wedding = {
  groom: {
    firstName: "Ajab",
    name: "Ajab Mohammed Bava C",
    subtitle: "S/O Mohammed Arif Cheriyakam & Shameena Cheriya Kolikkal"
  },
  bride: {
    firstName: "Amreen",
    name: "Amreen Iskander",
    subtitle: "D/O Iskander Mamu Cheriye Arakkal & Aneesa"
  },
  openingLine: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  body: "We would be honored by your presence and prayers as we celebrate this blessed occasion. May Allah fill their lives with love, mercy, tranquility, and endless barakah.",
  event: {
    label: "Wedding Reception",
    culturalName: "Wedding Reception",
    date: "Sunday, 26 July 2026",
    secondaryDate: "11 Safar 1448 AH",
    time: "12:00 AM onwards",
    venue: "Ashirvad Lawns - Convention Centre",
    address: "Mini bypass road Karaparamba, Eranhipaalam, junction, Kozhikode, Kerala 673010, India",
    maps: "https://share.google/OpOnpyyYtZz3B1044",
    iso: "2026-07-26T12:00:00+05:30"
  },
  closingBlessing: '"And We Created you in pairs." (Quran 78:8)',
  closingScript: "With prayers & gratitude",
  footerTagline: "Crafted with love · Ajab & Amreen · 2026"
};
function DrawnEnvelope({ onClick }) {
  const groupRef = reactExports.useRef(null);
  const [hovered, setHovered] = reactExports.useState(false);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "group",
    {
      ref: groupRef,
      onClick,
      onPointerOver: () => setHovered(true),
      onPointerOut: () => setHovered(false),
      scale: hovered ? 1.1 : 1,
      onPointerEnter: () => {
        document.body.style.cursor = "pointer";
        setHovered(true);
      },
      onPointerLeave: () => {
        document.body.style.cursor = "auto";
        setHovered(false);
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0, 0, 0], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("planeGeometry", { args: [3, 2] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#ffffff", side: DoubleSide })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            points: [
              [-1.5, 1, 0],
              [1.5, 1, 0],
              [1.5, -1, 0],
              [-1.5, -1, 0],
              [-1.5, 1, 0]
            ],
            color: "#1a1a1a",
            lineWidth: 5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            points: [
              [-1.5, 1, 0.01],
              [0, 0, 0.01],
              [1.5, 1, 0.01]
            ],
            color: "#1a1a1a",
            lineWidth: 5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            points: [
              [-1.5, -1, 0.01],
              [0, 0, 0.01],
              [1.5, -1, 0.01]
            ],
            color: "#1a1a1a",
            lineWidth: 5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Text,
          {
            position: [0, -1.8, 0],
            color: "#1a1a1a",
            fontSize: 0.4,
            anchorX: "center",
            anchorY: "middle",
            children: onClick ? "TAP TO OPEN" : "LOADING..."
          }
        )
      ]
    }
  );
}
function DialogueBox({ speaker = "MESSENGER", text, children, onNext, isTypingEffect = true }) {
  const [displayedText, setDisplayedText] = reactExports.useState("");
  const [isTyping, setIsTyping] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
  const handleClick = () => {
    if (isTyping && text) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-2xl mx-auto cursor-pointer select-none", onClick: handleClick, children: [
    speaker && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 left-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "name-tag text-xl md:text-2xl shadow-[4px_4px_0px_var(--ink)]", children: speaker }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "drawn-card p-6 md:p-8 min-h-[120px] md:min-h-[150px] flex flex-col justify-center",
        children: [
          text && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl md:text-3xl leading-relaxed whitespace-pre-line", children: displayedText }),
          children && !isTyping && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "mt-6 w-full",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              children
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: !isTyping && onNext && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute -bottom-4 -right-4 z-10",
              initial: { scale: 0, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0, opacity: 0 },
              whileHover: { scale: 1.1 },
              whileTap: { scale: 0.95 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "play-btn w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white",
                  onClick: (e) => {
                    e.stopPropagation();
                    onNext();
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 4L20 12L6 20V4Z", fill: "var(--blue-accent)", stroke: "var(--ink)", strokeWidth: "3", strokeLinejoin: "round" }) })
                }
              )
            }
          ) })
        ]
      }
    )
  ] });
}
function DrawnCountdown({ targetDateIso }) {
  const [timeLeft, setTimeLeft] = reactExports.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  reactExports.useEffect(() => {
    const target = new Date(targetDateIso).getTime();
    const interval = setInterval(() => {
      const now = (/* @__PURE__ */ new Date()).getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1e3 * 60 * 60 * 24)),
        hours: Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)),
        minutes: Math.floor(distance % (1e3 * 60 * 60) / (1e3 * 60)),
        seconds: Math.floor(distance % (1e3 * 60) / 1e3)
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, [targetDateIso]);
  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 md:gap-4 w-full justify-center", children: timeUnits.map((unit, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "drawn-card w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white shadow-[2px_2px_0px_var(--ink)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-pixel text-4xl md:text-5xl text-blue-accent", children: unit.value.toString().padStart(2, "0") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 font-dialogue text-xs md:text-sm font-bold tracking-widest", children: unit.label })
  ] }, idx)) });
}
const SONG_URL = "/audio/wedding-song.mp3";
function MusicPlayer() {
  const audioRef = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const audio = new Audio(SONG_URL);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    const startAudio = async () => {
      try {
        await audio.play();
        setPlaying(true);
        setAutoplayBlocked(false);
        ["click", "touchstart", "scroll"].forEach(
          (evt) => document.removeEventListener(evt, startAudio)
        );
      } catch (err) {
      }
    };
    audio.play().then(() => {
      setPlaying(true);
    }).catch(() => {
      setAutoplayBlocked(true);
      ["click", "touchstart", "scroll"].forEach(
        (evt) => document.addEventListener(evt, startAudio, { once: false })
      );
    });
    return () => {
      audio.pause();
      audio.src = "";
      ["click", "touchstart", "scroll"].forEach(
        (evt) => document.removeEventListener(evt, startAudio)
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
      audio.play().then(() => setPlaying(true)).catch(() => {
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: autoplayBlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: { duration: 0.4 },
        className: "drawn-card px-4 py-2 font-pixel text-lg text-ink shadow-[2px_2px_0px_var(--ink)]",
        children: "TAP TO PLAY AUDIO"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.button,
      {
        id: "music-player-btn",
        "aria-label": playing ? "Pause music" : "Play wedding music",
        onClick: toggle,
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        className: "play-btn flex h-14 w-14 items-center justify-center rounded-sm",
        style: { cursor: "pointer" },
        children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "var(--ink)", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "6", y: "4", width: "4", height: "16" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "14", y: "4", width: "4", height: "16" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "var(--ink)", strokeWidth: "3", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 3L19 12L5 21V3Z" }) })
      }
    )
  ] });
}
function RetroCoupleCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 w-full max-w-4xl px-4 pointer-events-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -50, rotate: -2 },
        animate: { opacity: 1, x: 0, rotate: -1 },
        transition: { duration: 0.6, delay: 0.1, type: "spring" },
        whileHover: { scale: 1.02, rotate: -2 },
        className: "drawn-card w-full md:w-[280px] bg-white p-4 md:p-6 flex flex-col items-center text-center select-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "name-tag mb-3 md:mb-4 text-lg md:text-xl bg-blue-accent shadow-[2px_2px_0px_var(--ink)]", children: "GROOM" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-ink flex items-center justify-center bg-background/50 mb-3 md:mb-4 shadow-[3px_3px_0px_var(--ink)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-pixel text-3xl md:text-4xl text-ink", children: "🤵" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-pixel text-2xl md:text-3xl text-ink mb-1 md:mb-2 uppercase leading-none", children: wedding.groom.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-dialogue text-base md:text-lg leading-relaxed text-ink/80 italic px-2", children: wedding.groom.subtitle })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.5, delay: 0.5 },
        className: "relative z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute font-pixel text-3xl md:text-5xl animate-bounce text-red-500 filter drop-shadow-[2px_2px_0px_var(--ink)]", children: "❤️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              className: "w-12 h-12 md:w-16 md:h-16 text-ink opacity-30 stroke-[3] fill-none",
              viewBox: "0 0 100 100",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10,50 Q50,90 90,50", stroke: "var(--ink)", strokeDasharray: "5,5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 50, rotate: 2 },
        animate: { opacity: 1, x: 0, rotate: 1 },
        transition: { duration: 0.6, delay: 0.2, type: "spring" },
        whileHover: { scale: 1.02, rotate: 2 },
        className: "drawn-card w-full md:w-[280px] bg-white p-4 md:p-6 flex flex-col items-center text-center select-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "name-tag mb-3 md:mb-4 text-lg md:text-xl bg-red-400 shadow-[2px_2px_0px_var(--ink)]", style: { backgroundColor: "oklch(0.75 0.15 15)" }, children: "BRIDE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-ink flex items-center justify-center bg-background/50 mb-3 md:mb-4 shadow-[3px_3px_0px_var(--ink)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-pixel text-3xl md:text-4xl text-ink", children: "👰" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-pixel text-2xl md:text-3xl text-ink mb-1 md:mb-2 uppercase leading-none", children: wedding.bride.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-dialogue text-base md:text-lg leading-relaxed text-ink/80 italic px-2", children: wedding.bride.subtitle })
        ]
      }
    )
  ] });
}
function RetroEventCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.5, type: "spring" },
      className: "drawn-card w-full max-w-lg bg-white p-4 md:p-8 flex flex-col items-center text-center select-none shadow-[6px_6px_0px_var(--ink)] pointer-events-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "name-tag mb-4 md:mb-6 text-lg md:text-xl bg-blue-accent shadow-[2px_2px_0px_var(--ink)]", children: "CEREMONY DETAILS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-pixel text-2xl md:text-4xl text-ink mb-1 md:mb-2 uppercase leading-none", children: wedding.event.culturalName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 md:w-24 h-1 border-t-4 border-ink border-dashed my-2 md:my-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 md:gap-6 w-full font-dialogue text-ink", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-pixel text-base md:text-lg text-blue-accent uppercase block tracking-wider", children: "DATE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl md:text-2xl font-bold", children: wedding.event.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm italic opacity-75", children: wedding.event.secondaryDate })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-pixel text-base md:text-lg text-blue-accent uppercase block tracking-wider", children: "TIME" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl md:text-2xl font-bold", children: wedding.event.time })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-pixel text-base md:text-lg text-blue-accent uppercase block tracking-wider", children: "VENUE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl md:text-2xl font-bold", children: wedding.event.venue }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-md opacity-80 mt-0.5 md:mt-1 max-w-sm mx-auto leading-relaxed", children: wedding.event.address })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: wedding.event.maps,
            target: "_blank",
            rel: "noreferrer",
            className: "mt-4 md:mt-6 inline-block",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "name-tag hover:scale-105 active:scale-95 transition-transform text-xl md:text-2xl cursor-pointer", children: "VIEW ON MAP" })
          }
        )
      ]
    }
  );
}
const storySequence = [{
  speaker: "MESSENGER",
  text: wedding.openingLine
}, {
  speaker: "INVITATION",
  text: wedding.body
}, {
  speaker: "THE COUPLE",
  text: `Introducing the Groom & Bride: ${wedding.groom.firstName} & ${wedding.bride.firstName}`,
  component: /* @__PURE__ */ jsxRuntimeExports.jsx(RetroCoupleCard, {})
}, {
  speaker: wedding.groom.firstName.toUpperCase() + " & " + wedding.bride.firstName.toUpperCase(),
  text: `Please join us for our ${wedding.event.label}`
}, {
  speaker: "THE CEREMONY",
  text: `Join us at ${wedding.event.venue} for the celebration.`,
  component: /* @__PURE__ */ jsxRuntimeExports.jsx(RetroEventCard, {})
}, {
  speaker: "COUNTDOWN",
  text: "Time left until the big day:",
  component: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawnCountdown, { targetDateIso: wedding.event.iso })
}, {
  speaker: "BLESSING",
  text: wedding.closingBlessing
}, {
  speaker: "FAREWELL",
  text: `We can't wait to see you there!

${wedding.closingScript}`
}];
function LoaderNotifier({
  onLoaded
}) {
  reactExports.useEffect(() => {
    onLoaded();
  }, [onLoaded]);
  return null;
}
function Index() {
  const [gameState, setGameState] = reactExports.useState("loading");
  const [currentDialogueIdx, setCurrentDialogueIdx] = reactExports.useState(0);
  const [errorText, setErrorText] = reactExports.useState(null);
  const [canvasLoaded, setCanvasLoaded] = reactExports.useState(false);
  const hasComponent = !!storySequence[currentDialogueIdx].component;
  reactExports.useEffect(() => {
    const handleErr = (e) => {
      setErrorText(e.message + "\n" + (e.error?.stack || ""));
    };
    const handleRej = (e) => {
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
      setCurrentDialogueIdx((prev) => prev + 1);
    } else {
      setGameState("finished");
    }
  };
  if (errorText) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[9999] bg-white p-6 overflow-auto text-red-600 font-mono pointer-events-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-4", children: "React App Error Detected:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap", children: errorText }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-4 px-4 py-2 bg-red-600 text-white rounded font-sans cursor-pointer", onClick: () => {
        setErrorText(null);
        window.location.reload();
      }, children: "Reload Page" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-[100dvh] w-full overflow-hidden bg-transparent", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MusicPlayer, {}),
    gameState === "loading" && !canvasLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background z-20 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-pixel text-4xl text-ink uppercase animate-pulse", children: "Loading Invitation..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-dialogue text-2xl mt-4", children: "Opening the gates of love..." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 z-0 transition-opacity duration-1000 ${gameState === "loading" ? "opacity-100" : "opacity-0 pointer-events-none"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Canvas, { camera: {
      position: [0, 0, 5],
      fov: 50
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 1.5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [10, 10, 5], intensity: 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawnEnvelope, { onClick: () => setTimeout(() => setGameState("reading"), 100) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Environment, { preset: "city" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderNotifier, { onLoaded: () => setCanvasLoaded(true) })
      ] })
    ] }) }),
    gameState !== "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 pointer-events-none", children: [
      gameState === "reading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center p-4 pb-[220px] md:pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: storySequence[currentDialogueIdx].component && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 20,
          scale: 0.95
        }, animate: {
          opacity: 1,
          y: 0,
          scale: 1
        }, exit: {
          opacity: 0,
          y: -20,
          scale: 0.95
        }, transition: {
          duration: 0.4
        }, className: "w-full flex justify-center pointer-events-auto", children: storySequence[currentDialogueIdx].component }, `illustration-${currentDialogueIdx}`) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: hasComponent ? 30 : 10
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: hasComponent ? 30 : -10
        }, transition: {
          duration: 0.3
        }, className: hasComponent ? "absolute bottom-10 left-4 right-4 md:left-10 md:right-10 pointer-events-auto z-20" : "absolute inset-0 flex items-center justify-center p-4 pointer-events-auto z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogueBox, { speaker: storySequence[currentDialogueIdx].speaker, text: storySequence[currentDialogueIdx].text, onNext: handleNextDialogue }) }, hasComponent ? "dialogue-bottom" : `dialogue-center-${currentDialogueIdx}`)
      ] }),
      gameState === "finished" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "drawn-card p-10 flex flex-col gap-6 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-pixel text-4xl text-blue-accent uppercase", children: "End of Chapter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-dialogue text-2xl", children: wedding.footerTagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "name-tag mt-4 hover:scale-105 active:scale-95 transition-transform cursor-pointer", onClick: () => {
          setCurrentDialogueIdx(0);
          setCanvasLoaded(false);
          setGameState("loading");
        }, children: "REPLAY STORY" })
      ] }) })
    ] })
  ] });
}
export {
  Index as component
};
