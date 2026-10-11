"use client";

import { useState, useRef, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

const emptySubscribe = () => () => {};

const GREETINGS = [
  { text: "Hi, I'm Shivaram!", emoji: "👋", sub: "Tap me for more!" },
  { text: "CSE Undergrad @ NNRG", emoji: "🎓", sub: "Graduating in 2029" },
  { text: "Building Full-Stack & AI", emoji: "⚡", sub: "Python • React • FastAPI" },
  { text: "Check out my projects below!", emoji: "🚀", sub: "5+ verified builds" },
  { text: "Open to exciting roles!", emoji: "💼", sub: "Let's connect" }
];

export default function GreetingCharacter() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const shouldReduceMotion = useReducedMotion();
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTapped, setIsTapped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // During SSR and initial hydration, ensure deterministic properties matching server HTML
  const prefersReducedMotion = isClient ? !!shouldReduceMotion : false;

  const currentGreeting = GREETINGS[greetingIndex];

  // Cycle through greetings on tap/click with micro-animation
  const handleInteraction = useCallback(() => {
    setIsTapped(true);
    setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    setTimeout(() => setIsTapped(false), 450);
  }, []);

  // 3D perspective tilt on touch/pointer move
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Moderate tilt angles for a realistic 3D feel
    const tiltX = -(y / (rect.height / 2)) * 12;
    const tiltY = (x / (rect.width / 2)) * 14;
    setTilt({ x: tiltX, y: tiltY });
  }, [prefersReducedMotion]);

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Interactive Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={greetingIndex}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.9 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.92 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={handleInteraction}
          role="status"
          aria-live="polite"
          className="relative z-30 cursor-pointer mb-2 sm:mb-2.5 max-w-[260px] sm:max-w-xs group/bubble"
        >
          <div className="bg-card/95 backdrop-blur-md text-ink px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-line shadow-lg flex items-center gap-2 hover:border-ink/30 transition-all hover:scale-105 active:scale-95">
            <span className="text-sm sm:text-base">{currentGreeting.emoji}</span>
            <div className="flex flex-col text-left">
              <span className="text-[11px] sm:text-xs font-mono font-bold leading-tight text-ink">
                {currentGreeting.text}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-mute leading-none mt-0.5">
                {currentGreeting.sub}
              </span>
            </div>
            {/* Tap indicator pulse */}
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1 shrink-0" />
          </div>

          {/* Speech Bubble Arrow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-b border-r border-line rotate-45 -z-0" />
        </motion.div>
      </AnimatePresence>

      {/* 3D Character Avatar Container */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                rotateX: tilt.x,
                rotateY: tilt.y,
                scale: isTapped ? 1.08 : 1
              }
        }
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={handleInteraction}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleInteraction();
          }
        }}
        aria-label="Interactive 3D avatar of Shivaram Reddy. Click or tap to wave and see greetings."
        className="relative group cursor-pointer focus-visible:ring-2 focus-visible:ring-ink rounded-full p-1"
      >
        {/* Soft Ambient Shadow & Glow Ring */}
        <div className="absolute inset-2 bg-ink/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors pointer-events-none" />

        {/* Floating Animation Wrapper */}
        <div className="relative animate-character-float flex items-center justify-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105 active:scale-95">
            <Image
              src="/hero/waving-character.png"
              alt="Friendly 3D cartoon avatar of Shivaram Reddy waving hello"
              fill
              priority
              sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
              className="object-contain pointer-events-none"
            />
          </div>

          {/* Interactive Tap Sparkle Badge */}
          <AnimatePresence>
            {isTapped && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: 1, scale: 1.2, y: -20 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -top-3 right-0 text-base pointer-events-none"
              >
                ✨
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
