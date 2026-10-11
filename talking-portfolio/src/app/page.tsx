"use client";

import {
  PROFILE,
  NAV,
  SKILL_CATEGORIES,
  PROJECTS,
  EDUCATION,
  ACHIEVEMENTS
} from "@/lib/data";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import GreetingCharacter from "@/components/GreetingCharacter";
import MobileNavDock from "@/components/MobileNavDock";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeNav, setActiveNav] = useState("#hero");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Copy email to clipboard utility
  const copyEmailToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  }, []);

  // Prevent background scrolling when mobile menu or project modal is open
  useEffect(() => {
    if (mobileMenuOpen || selectedProject) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen, selectedProject]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedProject) setSelectedProject(null);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, mobileMenuOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsMuted(true);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    // Scroll spy for sections
    const sections = document.querySelectorAll("section[id]");
    const scrollSpy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -40% 0px" }
    );

    sections.forEach((s) => scrollSpy.observe(s));

    return () => {
      observer.disconnect();
      scrollSpy.disconnect();
    };
  }, []);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleNavClick = useCallback((href: string) => {
    setMobileMenuOpen(false);
    setActiveNav(href);
  }, []);

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.category)];
  const displayedSkills =
    activeCategory === "All"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.category === activeCategory);

  return (
    <main className="relative bg-paper min-h-screen text-ink selection:bg-ink selection:text-paper font-sans overflow-x-clip pb-24 md:pb-12">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* =========================================================================
          1. NAVIGATION
      ========================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 md:p-6 pointer-events-none">
        <div className="flex justify-between items-center content-width">
          {/* Brand Monogram */}
          <a
            href="#hero"
            aria-label="Shivaram Reddy - Back to top"
            className="pointer-events-auto group relative flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 bg-ink text-paper rounded-xl shadow-md border border-ink/20 font-mono font-bold tracking-tight text-sm hover:scale-105 active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-ink"
          >
            <span>SR</span>
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-paper" />
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex pointer-events-auto items-center px-2 py-1.5 rounded-full bg-card/85 backdrop-blur-xl border border-line shadow-sm"
          >
            {NAV.map((item) => {
              const isActive = activeNav === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-5 py-2 text-xs font-mono font-semibold tracking-wide uppercase transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-ink ${
                    isActive ? "text-paper" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-ink rounded-full -z-0"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full bg-ink text-paper text-xs font-mono uppercase tracking-wider font-semibold hover:bg-ink-2 active:scale-95 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-ink"
            >
              Get in Touch
              <span className="text-emerald-400">→</span>
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-card border border-line text-ink shadow-sm hover:bg-soft active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-ink"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen/Modal Overlay Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden fixed inset-0 bg-ink/40 backdrop-blur-sm pointer-events-auto z-40"
              />

              {/* Menu Panel */}
              <motion.div
                id="mobile-navigation"
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="md:hidden pointer-events-auto fixed top-20 left-4 right-4 z-50 bg-card/95 backdrop-blur-2xl border border-line rounded-3xl p-5 shadow-2xl max-h-[calc(100svh-100px)] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-line">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-mute">Menu</span>
                  <span className="text-[11px] font-mono text-emerald-600 font-semibold">• Available for Hire</span>
                </div>

                <ul className="flex flex-col gap-1 font-mono text-xs uppercase tracking-wider">
                  {NAV.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold min-h-[44px] transition-colors ${
                          activeNav === item.href
                            ? "bg-ink text-paper"
                            : "text-ink-2 hover:bg-soft/70 active:bg-soft hover:text-ink"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-[10px] opacity-60">→</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-4 border-t border-line flex flex-col gap-2">
                  <a
                    href="#contact"
                    onClick={() => handleNavClick("#contact")}
                    className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[44px] rounded-xl bg-ink text-paper text-xs font-mono uppercase tracking-wider font-semibold hover:bg-ink-2 active:scale-95 transition-all text-center"
                  >
                    Contact Shivaram
                    <span className="text-emerald-400">→</span>
                  </a>
                  <a
                    href={PROFILE.resumePath}
                    download="Shivaram_Reddy_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl bg-soft/70 border border-line text-ink text-xs font-mono uppercase tracking-wider font-semibold active:scale-95 transition-all text-center"
                  >
                    Download Résumé (PDF)
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          2. CINEMATIC HERO
      ========================================================================== */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-[100svh] flex flex-col items-center justify-center pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-paper via-paper to-white/60"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] md:w-[900px] h-[350px] sm:h-[600px] md:h-[900px] bg-ink/[0.025] rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

        <div className="z-20 text-center relative max-w-4xl px-4 sm:px-6 w-full flex flex-col items-center mb-10 sm:mb-12 md:mb-16">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-card border border-line text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-ink-2 mb-4 sm:mb-6 shadow-sm max-w-full text-center"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">Computer Science Undergraduate • NNRG</span>
          </motion.div>

          {/* Name & Greeting Character Container */}
          <div className="relative mb-5 sm:mb-6 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-ink leading-[1.08] break-words text-center"
            >
              {PROFILE.name}
            </motion.h1>

            {/* Signature 3D Interactive Greeting Character */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              className="relative shrink-0"
            >
              <GreetingCharacter />
            </motion.div>
          </div>

          {/* Subtitle / Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-base sm:text-lg md:text-2xl font-medium text-mute tracking-tight mb-6 sm:mb-8 max-w-2xl leading-relaxed text-center"
          >
            {PROFILE.role} with a focus on AI-driven platforms, computer vision, and high-performance web systems.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3.5 justify-center w-full sm:w-auto mb-8 sm:mb-10"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto text-center px-7 py-3.5 min-h-[44px] flex items-center justify-center rounded-full bg-ink text-paper text-xs font-mono uppercase tracking-wider font-semibold hover:bg-ink-2 active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-ink"
            >
              Explore Projects
            </a>
            <a
              href={PROFILE.resumePath}
              download="Shivaram_Reddy_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-7 py-3.5 min-h-[44px] rounded-full bg-card border border-line text-ink text-xs font-mono uppercase tracking-wider font-semibold hover:bg-soft/70 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-ink"
            >
              Verified Résumé
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto text-center px-7 py-3.5 min-h-[44px] flex items-center justify-center rounded-full border border-line text-mute text-xs font-mono uppercase tracking-wider font-semibold hover:text-ink hover:border-ink/30 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-ink"
            >
              Contact
            </a>
          </motion.div>

          {/* App-like Quick Metrics Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-2xl px-2"
          >
            <div className="p-3 rounded-2xl bg-card/80 backdrop-blur-md border border-line text-center shadow-xs">
              <span className="block font-mono font-bold text-base sm:text-lg text-ink">5+</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-mute tracking-wider">Core Builds</span>
            </div>
            <div className="p-3 rounded-2xl bg-card/80 backdrop-blur-md border border-line text-center shadow-xs">
              <span className="block font-mono font-bold text-base sm:text-lg text-ink">2029</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-mute tracking-wider">Graduating CSE</span>
            </div>
            <div className="p-3 rounded-2xl bg-card/80 backdrop-blur-md border border-line text-center shadow-xs">
              <span className="block font-mono font-bold text-base sm:text-lg text-ink">2nd Prize</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-mute tracking-wider">GenAI Hackathon</span>
            </div>
            <div className="p-3 rounded-2xl bg-card/80 backdrop-blur-md border border-line text-center shadow-xs">
              <span className="block font-mono font-bold text-base sm:text-lg text-ink">100%</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-mute tracking-wider">Local Vision</span>
            </div>
          </motion.div>
        </div>

        {/* Cinematic Laptop Mockup with Video */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ perspective: 1800 }}
          className="relative z-20 w-full max-w-5xl px-3 sm:px-6 md:px-12"
        >
          <div className="relative rounded-t-[1.25rem] sm:rounded-t-[1.75rem] md:rounded-t-[2.25rem] border-[6px] sm:border-[10px] md:border-[14px] border-b-0 border-[#1a1a1a] bg-black shadow-2xl overflow-hidden aspect-video group">
            {/* Webcam indicator */}
            <div className="absolute top-1.5 sm:top-2 md:top-3 left-1/2 -translate-x-1/2 w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 rounded-full bg-[#333] z-50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]" />

            <video
              ref={videoRef}
              preload="metadata"
              loop
              playsInline
              onClick={toggleVideoPlayback}
              className="w-full h-full object-cover cursor-pointer"
            >
              <source src="/intro.mp4" type="video/mp4" />
            </video>

            {/* Video Controls Bar */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-40 flex items-center gap-2">
              {/* Play / Pause Toggle Button */}
              <button
                onClick={toggleVideoPlayback}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 min-w-[44px] min-h-[44px] rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl group focus-visible:ring-2 focus-visible:ring-white"
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 group-hover:opacity-100 transition-opacity">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 group-hover:opacity-100 transition-opacity translate-x-0.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>

              {/* Sound Toggle Button */}
              <button
                onClick={toggleSound}
                aria-label={isMuted ? "Unmute video introduction" : "Mute video"}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 min-w-[44px] min-h-[44px] rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl group focus-visible:ring-2 focus-visible:ring-white"
              >
                {isMuted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 group-hover:opacity-100 transition-opacity">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 group-hover:opacity-100 transition-opacity">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Laptop Base Lip */}
          <div className="relative h-3 sm:h-4 md:h-5 bg-gradient-to-b from-[#2a2a2a] to-[#141414] rounded-b-xl sm:rounded-b-2xl md:rounded-b-3xl w-full shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-30 flex justify-center border-t border-white/10">
            <div className="w-12 sm:w-16 h-1 bg-[#444] rounded-b-sm opacity-60 mt-0.5" />
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          3. ABOUT ME
      ========================================================================== */}
      <section id="about" className="section-pad content-width border-t border-line bg-paper relative z-20">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-mute">01 — About</span>
              <span className="h-px flex-1 bg-line" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-ink leading-tight">
              Engineering web apps & AI systems from first principles.
            </h2>

            <p className="text-sm sm:text-base text-ink-2 leading-relaxed font-normal">
              I am an undergraduate Computer Science and Engineering student at{" "}
              <strong className="font-semibold text-ink">Nalla Narasimha Reddy Education Society&apos;s Group of Institutions (NNRG)</strong>,
              Hyderabad, graduating in 2029.
            </p>

            <p className="text-sm sm:text-base text-mute leading-relaxed font-normal">
              {PROFILE.bio} I enjoy turning complex problem statements into functional, high-utility software—from real-time local computer vision monitors to RAG-powered knowledge tools and modular REST APIs.
            </p>

            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold underline underline-offset-4 hover:text-mute transition-colors focus-visible:ring-2 focus-visible:ring-ink"
              >
                GitHub Profile ↗
              </a>
              <span className="text-line">•</span>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold underline underline-offset-4 hover:text-mute transition-colors focus-visible:ring-2 focus-visible:ring-ink"
              >
                LinkedIn Profile ↗
              </a>
              <span className="text-line">•</span>
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-1.5 font-bold underline underline-offset-4 hover:text-mute transition-colors focus-visible:ring-2 focus-visible:ring-ink break-all"
              >
                {PROFILE.email}
              </a>
            </div>
          </div>

          {/* Interactive Hanging ID Card */}
          <div className="lg:col-span-4 flex justify-center perspective-[1000px] min-h-[420px] sm:min-h-[460px]">
            <div className="relative w-full max-w-[280px] sm:max-w-[290px]">
              {/* Lanyard Line */}
              <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 w-[2px] h-10 sm:h-12 bg-ink-2/20" />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-3 rounded-t-sm bg-ink/70" />

              {/* Card Container */}
              <div
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsCardFlipped(!isCardFlipped);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Developer ID card. Press enter or click to flip over."
                className={`relative w-full h-[390px] sm:h-[410px] bg-card rounded-[24px] sm:rounded-[26px] border border-line shadow-2xl transition-transform duration-700 cursor-pointer group [transform-style:preserve-3d] select-none focus-visible:ring-2 focus-visible:ring-ink ${
                  isCardFlipped ? "rotate-y-180" : "hover:rotate-y-180"
                }`}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden flex flex-col items-center p-5 sm:p-6 bg-card rounded-[24px] sm:rounded-[26px]">
                  <div className="w-full h-11 bg-ink text-paper rounded-t-xl flex items-center justify-center font-mono font-bold tracking-widest text-[11px] absolute top-0 left-0">
                    STUDENT DEVELOPER ID
                  </div>

                  <div className="mt-14 w-28 h-36 sm:w-32 sm:h-40 bg-soft rounded-xl border border-line overflow-hidden relative shadow-inner">
                    <Image
                      src="/character.png"
                      alt="Shivaram Reddy Developer ID Photo"
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>

                  <div className="mt-4 sm:mt-5 text-center w-full">
                    <h3 className="font-bold text-base sm:text-lg text-ink leading-tight">{PROFILE.name}</h3>
                    <p className="text-xs font-mono text-mute mt-1">Computer Science Undergrad</p>
                    <p className="text-[11px] text-ink-2/70 mt-0.5">NNRG • Class of 2029</p>
                  </div>

                  <div className="mt-auto w-full border-t border-line pt-3 text-[11px] font-mono flex justify-between text-mute">
                    <span>ID: SR-29</span>
                    <span>TAP TO FLIP ↺</span>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 p-5 sm:p-6 bg-card rounded-[24px] sm:rounded-[26px] flex flex-col text-xs border border-line">
                  <div className="flex items-center justify-between border-b border-line pb-2 mb-3 sm:mb-4">
                    <span className="font-mono font-bold uppercase tracking-wider text-ink text-[11px]">Developer Dossier</span>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">VERIFIED</span>
                  </div>

                  <ul className="space-y-2.5 sm:space-y-3 flex-1 text-ink-2">
                    <li className="flex gap-2 items-start">
                      <span className="text-mute font-mono">01.</span>
                      <div>
                        <strong className="text-ink block font-semibold">Degree</strong>
                        <span className="text-mute">B.Tech CSE, NNRG (2025–2029)</span>
                      </div>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-mute font-mono">02.</span>
                      <div>
                        <strong className="text-ink block font-semibold">Core Focus</strong>
                        <span className="text-mute">Full-Stack Web & AI Applications</span>
                      </div>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-mute font-mono">03.</span>
                      <div>
                        <strong className="text-ink block font-semibold">Flagship Project</strong>
                        <span className="text-mute">SupportAI Customer Support Platform</span>
                      </div>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-mute font-mono">04.</span>
                      <div>
                        <strong className="text-ink block font-semibold">Recognition</strong>
                        <span className="text-mute">Generative AI Hackathon (2nd Prize)</span>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-auto pt-3 border-t border-line text-center font-mono text-[10px] text-mute">
                    Tap to flip back ↺
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Facts Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-card border border-line shadow-sm space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-mute pb-2 border-b border-line">
                Profile Snapshot
              </h3>
              <dl className="space-y-3.5 text-xs">
                <div>
                  <dt className="font-mono text-mute uppercase tracking-wider text-[10px]">Location</dt>
                  <dd className="font-semibold text-ink mt-0.5">{PROFILE.location}</dd>
                </div>
                <div>
                  <dt className="font-mono text-mute uppercase tracking-wider text-[10px]">Institution</dt>
                  <dd className="font-semibold text-ink mt-0.5">NNRG, Hyderabad</dd>
                </div>
                <div>
                  <dt className="font-mono text-mute uppercase tracking-wider text-[10px]">Degree</dt>
                  <dd className="font-semibold text-ink mt-0.5">B.Tech CSE</dd>
                </div>
                <div>
                  <dt className="font-mono text-mute uppercase tracking-wider text-[10px]">Expected Graduation</dt>
                  <dd className="font-semibold text-ink mt-0.5">2029</dd>
                </div>
                <div>
                  <dt className="font-mono text-mute uppercase tracking-wider text-[10px]">Primary Languages</dt>
                  <dd className="font-semibold text-ink mt-0.5">Python, Java, JavaScript, SQL</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. TECHNICAL SKILLS
      ========================================================================== */}
      <section id="skills" className="section-pad content-width border-t border-line bg-paper">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-mute">02 — Technical Skills</span>
              <span className="h-px w-12 bg-line" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-ink">
              Verified Technical Competencies
            </h2>
          </div>
          <p className="text-xs font-mono text-mute max-w-xs">
            Demonstrated through real coursework, independent software builds, and working prototypes.
          </p>
        </div>

        {/* Category Filter Pills - Scrollable horizontally on small screens */}
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3.5 sm:px-4 py-2 min-h-[40px] rounded-full text-xs font-mono uppercase tracking-wider transition-all border active:scale-95 focus-visible:ring-2 focus-visible:ring-ink ${
                activeCategory === cat
                  ? "bg-ink text-paper border-ink shadow-sm"
                  : "bg-card text-ink-2 border-line hover:border-ink/30 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {displayedSkills.map((grp) => (
            <div
              key={grp.category}
              className="p-5 sm:p-6 rounded-2xl bg-card border border-line shadow-sm hover:shadow-md hover:border-ink/30 transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-mute mb-3 sm:mb-4 pb-2 border-b border-line flex justify-between items-center">
                  <span>{grp.category}</span>
                  <span className="text-[10px] text-mute">{grp.skills.length} skills</span>
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {grp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-soft/50 text-ink text-xs font-medium border border-line/50 hover:bg-ink hover:text-paper hover:border-ink transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. FEATURED PROJECTS
      ========================================================================== */}
      <section id="projects" className="section-pad content-width border-t border-line bg-paper">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-mute">03 — Projects</span>
              <span className="h-px w-12 bg-line" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-ink">
              Featured Software Projects
            </h2>
          </div>
          <p className="text-xs font-mono text-mute max-w-sm">
            Primary proof of technical abilities across full-stack applications, computer vision, and AI systems.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROJECTS.map((proj) => (
            <article
              key={proj.id}
              className="rounded-3xl bg-card border border-line p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-ink/40 transition-all duration-300 group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between font-mono text-xs mb-3 sm:mb-4 text-mute">
                  <span>{proj.index}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-soft text-[10px] text-ink font-semibold border border-line">
                    {proj.status}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-mute uppercase tracking-wider mb-1">
                  {proj.tagline}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink mb-2 sm:mb-3 group-hover:underline decoration-1 underline-offset-4">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed mb-4">
                  {proj.summary}
                </p>

                {/* Key feature bullets */}
                <div className="mb-5 sm:mb-6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-mute block">Key Highlights</span>
                  <ul className="space-y-1.5 text-xs text-mute">
                    {proj.features.map((feat, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-ink shrink-0">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Tech Stack & Links */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5 pt-4 border-t border-line">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-paper border border-line text-[11px] font-mono text-ink-2"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="min-h-[44px] inline-flex items-center text-xs font-mono font-bold text-ink underline underline-offset-4 hover:text-mute transition-colors focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    Technical Case Study ↗
                  </button>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center text-xs font-mono font-medium text-mute hover:text-ink transition-colors gap-1 focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Project Detail Modal / App-like Mobile Bottom Sheet */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ y: "100%", opacity: 0.9 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              className="bg-card border-t sm:border border-line rounded-t-[32px] sm:rounded-3xl p-5 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90svh] overflow-y-auto flex flex-col space-y-4 sm:space-y-6"
            >
              {/* Drag Handle Indicator for Mobile */}
              <div className="w-12 h-1.5 rounded-full bg-ink/20 mx-auto -mt-1 mb-1 sm:hidden shrink-0" />

              <div className="flex items-start justify-between gap-4">
                <div className="pr-2">
                  <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-mute mb-1">
                    {selectedProject.index} • {selectedProject.tagline}
                  </div>
                  <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details modal"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-soft flex items-center justify-center text-ink hover:bg-ink hover:text-paper active:scale-95 transition-colors font-mono text-sm shrink-0 focus-visible:ring-2 focus-visible:ring-ink"
                >
                  ✕
                </button>
              </div>

              {/* Technical Architecture */}
              <div className="space-y-2 p-4 rounded-2xl bg-soft/40 border border-line">
                <h4 className="text-xs font-mono uppercase tracking-wider text-ink font-bold flex items-center gap-2">
                  <span>Architecture & System Design</span>
                </h4>
                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                  {selectedProject.architecture}
                </p>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-mute">Core Impact & Workflow</h4>
                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">{selectedProject.impact}</p>
                <p className="text-xs sm:text-sm text-mute leading-relaxed">{selectedProject.summary}</p>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-mute mb-1">Core Deliverables</h4>
                <p className="text-xs font-mono text-ink bg-paper p-3 rounded-xl border border-line">
                  {selectedProject.deliverables}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-mute mb-2">Technical Implementation Stack</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg bg-soft text-ink text-xs font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sticky bottom-0 bg-card py-2 -mx-5 px-5 sm:mx-0 sm:px-0">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 min-h-[44px] rounded-full bg-ink text-paper text-xs font-mono uppercase tracking-wider font-semibold hover:bg-ink-2 active:scale-95 transition-colors text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>GitHub Repository</span>
                  <span className="text-emerald-400 font-bold">↗</span>
                </a>
                <span className="text-xs font-mono text-mute text-center sm:text-right font-medium">{selectedProject.status}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          6. EDUCATION
      ========================================================================== */}
      <section id="education" className="section-pad content-width border-t border-line bg-paper">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-mute">04 — Education</span>
            <span className="h-px w-12 bg-line" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-ink mb-8 sm:mb-12">
            Academic Foundation
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-card border border-line shadow-sm relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">{edu.degree}</h3>
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-soft text-ink border border-line w-fit">
                    {edu.period}
                  </span>
                </div>

                <div className="text-sm sm:text-base font-medium text-ink-2 mb-4">
                  {edu.institution}
                </div>

                <div className="space-y-2 pt-4 border-t border-line">
                  <span className="text-xs font-mono uppercase tracking-wider text-mute block">Academic Focus</span>
                  <ul className="space-y-2 text-xs sm:text-sm text-mute">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex gap-2 items-start">
                        <span className="text-ink shrink-0">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. ACHIEVEMENTS & RECOGNITION
      ========================================================================== */}
      <section id="achievements" className="section-pad content-width border-t border-line bg-paper">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-mute">05 — Recognition</span>
              <span className="h-px w-12 bg-line" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-ink">
              Achievements & Hackathons
            </h2>
          </div>
          <p className="text-xs font-mono text-mute max-w-xs">
            Verified competitive awards and academic problem-solving recognitions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-line shadow-sm hover:shadow-xl hover:border-ink/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-soft text-[10px] font-mono uppercase tracking-wider font-semibold text-ink-2 mb-4 sm:mb-6 border border-line">
                  {ach.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink mb-2">
                  {ach.title}
                </h3>
                <div className="text-xs font-mono text-mute mb-3 sm:mb-4">{ach.event}</div>
                <p className="text-xs sm:text-sm text-ink-2/80 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 border-t border-line flex items-center justify-between text-[11px] font-mono text-mute">
                <span>VERIFIED</span>
                <span className="text-emerald-600 font-bold">✓</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. CONTACT
      ========================================================================== */}
      <section id="contact" className="section-pad content-width border-t border-line text-center bg-paper relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-line text-[11px] font-mono uppercase tracking-widest text-mute mb-6 sm:mb-8 shadow-sm">
            06 — Connect
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-ink mb-4 sm:mb-6 leading-tight">
            Let&apos;s build something exceptional together.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-mute mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed px-2">
            Open to engineering collaborations, open-source projects, and technical discussions. Feel free to reach out directly.
          </p>

          {/* Email button with copy notification */}
          <div className="flex flex-col items-center gap-3 mb-8 sm:mb-10">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-block text-xl sm:text-2xl md:text-4xl font-semibold text-ink underline decoration-2 underline-offset-8 hover:text-mute transition-colors break-all px-2"
            >
              {PROFILE.email}
            </a>

            <button
              onClick={copyEmailToClipboard}
              aria-label="Copy email address to clipboard"
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-full bg-card border border-line text-xs font-mono text-ink hover:bg-soft active:scale-95 transition-all shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {copiedEmail ? (
                  <polyline points="20 6 9 17 4 12" />
                ) : (
                  <>
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </>
                )}
              </svg>
              <span>{copiedEmail ? "Email Copied to Clipboard! ✓" : "Copy Email"}</span>
            </button>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 font-mono text-xs uppercase tracking-widest text-mute pt-6 border-t border-line">
            <a href={PROFILE.phoneHref} className="min-h-[44px] flex items-center hover:text-ink transition-colors">
              +91 {PROFILE.phone}
            </a>
            <span className="hidden sm:inline text-line">•</span>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="min-h-[44px] flex items-center hover:text-ink transition-colors">
              GitHub ↗
            </a>
            <span className="hidden sm:inline text-line">•</span>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="min-h-[44px] flex items-center hover:text-ink transition-colors">
              LinkedIn ↗
            </a>
            <span className="hidden sm:inline text-line">•</span>
            <a
              href={PROFILE.resumePath}
              download="Shivaram_Reddy_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center text-ink font-semibold underline underline-offset-4 hover:text-mute transition-colors"
            >
              Download Résumé (PDF) ↓
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 text-center text-[10px] sm:text-[11px] font-mono text-mute uppercase tracking-widest border-t border-line bg-paper relative z-10 px-4">
        <p>© 2026 Shivaram Reddy • Computer Science Undergraduate • NNRG</p>
      </footer>

      {/* Floating Mobile Navigation Dock */}
      <MobileNavDock activeNav={activeNav} onNavigate={handleNavClick} />
    </main>
  );
}
