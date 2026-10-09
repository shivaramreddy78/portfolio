"use client";

import { PROFILE, NAV, SKILL_GROUPS, PROJECTS, EXPERIENCE, EDUCATION, ACHIEVEMENTS } from "@/lib/data";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const CharacterModel = dynamic(() => import("@/components/CharacterModel"), { ssr: false });

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [activeNav, setActiveNav] = useState("#hero");

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
    
    // Setup scroll spies for nav
    const sections = document.querySelectorAll('section[id]');
    const scrollSpy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNav(`#${entry.target.id}`);
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    
    sections.forEach(s => scrollSpy.observe(s));
    
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
    setAutoplayBlocked(false);
  };

  return (
    <main className="relative bg-paper min-h-screen overflow-hidden text-ink">
      {/* 4.0 Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 pointer-events-none">
        <div className="flex justify-between items-center content-width pointer-events-auto">
          <div className="relative perspective-[1000px] group cursor-pointer">
            <div className="transform-style-3d group-hover:rotate-y-12 transition-transform duration-500 relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-ink to-ink-2 text-white rounded-xl shadow-lg border border-white/20 font-black tracking-tighter text-xl">
              SR
            </div>
          </div>
          <div className="hidden md:flex relative items-center px-2 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
            {NAV.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className={`relative px-6 py-2 text-sm font-medium transition-colors z-10 ${activeNav === item.href ? 'text-ink' : 'text-white hover:opacity-70'}`}
              >
                {item.label}
                {activeNav === item.href && (
                  <span className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm" />
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 4.1 Cinematic Hero */}
      <section ref={heroRef} id="hero" className="relative min-h-[100svh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-paper via-paper to-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-ink/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="z-20 text-center relative max-w-4xl px-4 w-full flex flex-col items-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight text-ink mb-6 leading-[1.1]"
          >
            {PROFILE.name}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="text-xl md:text-2xl lg:text-3xl font-medium text-mute tracking-tight mb-10 max-w-2xl"
          >
            {PROFILE.role}
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center pointer-events-auto"
          >
            <a href="#work" className="px-8 py-4 rounded-full bg-ink text-white text-sm font-bold hover:bg-ink/80 hover:-translate-y-1 transition-all shadow-lg">View Projects</a>
            <a href="#contact" className="px-8 py-4 rounded-full border-2 border-ink/10 text-ink text-sm font-bold hover:bg-ink/5 hover:-translate-y-1 transition-all">Contact Me</a>
            <a href={PROFILE.resumePath} target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full border-2 border-ink/10 text-ink text-sm font-bold hover:bg-ink/5 hover:-translate-y-1 transition-all flex items-center gap-2">
              Download Resume
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            </a>
          </motion.div>
        </div>

        {/* Cinematic Laptop Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 60, rotateX: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ perspective: 2000 }}
          className="relative z-20 w-full max-w-5xl px-6 md:px-12 pointer-events-auto"
        >
          <div className="relative rounded-t-[2rem] md:rounded-t-[2.5rem] border-[10px] md:border-[16px] border-b-0 border-[#1a1a1a] bg-black shadow-2xl overflow-hidden aspect-video transform-gpu"
               style={{ transformStyle: 'preserve-3d' }}>
            {/* Webcam dot */}
            <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#333] z-50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"></div>
            
            <video 
              ref={videoRef}
              preload="auto"
              loop 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/intro.mp4" type="video/mp4" />
            </video>

            {/* Sound Control overlay on video */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-40">
              <button
                onClick={toggleSound}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 backdrop-blur-xl text-white border border-white/20 flex items-center justify-center hover:scale-110 hover:bg-black/60 transition-all shadow-2xl group"
              >
                {isMuted ? (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                ) : (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                )}
              </button>
              {isMuted && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest backdrop-blur-md pointer-events-none animate-pulse shadow-lg">
                  Click to Unmute
                </div>
              )}
            </div>
          </div>
          
          {/* Laptop base */}
          <div className="relative h-4 md:h-6 bg-gradient-to-b from-[#2a2a2a] to-[#111] rounded-b-2xl md:rounded-b-3xl w-[104%] -left-[2%] shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-30 flex justify-center border-t border-white/10">
             <div className="w-1/6 h-1 md:h-1.5 bg-[#444] rounded-b-md opacity-50 mt-0.5"></div>
          </div>
        </motion.div>
      </section>

      {/* 4.2 About */}
      <section id="about" className="section-pad content-width relative z-20 bg-paper">
        <div className="grid md:grid-cols-3 gap-12 min-h-[600px] items-center">
          <div className="space-y-6">
            <h3 className="text-sm font-mono text-mute">01 — About me</h3>
            <p className="text-2xl font-medium tracking-tight leading-snug">
              Hi, I'm Shivaram. {PROFILE.resumeSummary}
            </p>
            <div className="flex flex-col gap-3 items-start pt-6">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-sm font-bold underline hover:text-mute">GitHub ↗</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-sm font-bold underline hover:text-mute">LinkedIn ↗</a>
            </div>
          </div>
          
          {/* Hanging ID Card Component */}
          <div className="relative flex justify-center perspective-[1000px] h-[500px]">
             {/* Lanyard Line */}
             <div className="absolute top-0 w-[2px] h-[100px] bg-ink-2/20" />
             
             {/* The Card */}
             <div className="relative mt-[100px] w-[300px] h-[404px] bg-card rounded-[28px] border border-line shadow-2xl transition-transform duration-700 hover:rotate-y-180 group [transform-style:preserve-3d]">
                {/* Front */}
                <div className="absolute inset-0 backface-hidden flex flex-col items-center p-6 bg-card rounded-[28px]">
                   <div className="w-full h-12 bg-ink text-white rounded-t-xl flex items-center justify-center font-bold tracking-widest text-xs absolute top-0 left-0">DEVELOPER ID</div>
                   <div className="mt-16 w-32 h-40 bg-soft rounded-lg border-2 border-line overflow-hidden relative">
                      <Image src="/character.png" alt="ID Photo" fill className="object-cover" />
                   </div>
                   <div className="mt-6 text-center w-full">
                     <h4 className="font-bold text-xl">{PROFILE.name}</h4>
                     <p className="text-sm text-mute">{PROFILE.role.replace('.', '')}</p>
                   </div>
                   <div className="mt-auto w-full border-t border-line pt-4 text-xs font-mono flex justify-between">
                     <span className="text-mute">ID: SR-29</span>
                     <span>VALID: 2029</span>
                   </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 p-8 bg-card rounded-[28px] flex flex-col text-sm border border-line">
                   <h4 className="font-bold mb-4 border-b border-line pb-2">What I am</h4>
                   <ul className="space-y-3 flex-1 text-mute">
                     <li>• {EDUCATION[0].title}</li>
                     <li>• {EDUCATION[0].detail}</li>
                     <li>• Builder of {PROJECTS[0].title}</li>
                     <li>• {ACHIEVEMENTS[0].title} winner</li>
                   </ul>
                   <div className="mt-auto text-xs italic opacity-50 text-center">If found, say hello.</div>
                </div>
             </div>
          </div>

          <div className="space-y-8">
             <div>
               <h3 className="text-sm font-mono text-mute mb-4">Quick facts</h3>
               <ul className="space-y-4 text-sm font-medium">
                 <li className="flex justify-between border-b border-line pb-2">
                    <span className="text-mute">Location</span>
                    <span>{PROFILE.location}</span>
                 </li>
                 <li className="flex justify-between border-b border-line pb-2">
                    <span className="text-mute">Education</span>
                    <span>Expected 2029</span>
                 </li>
                 <li className="flex justify-between border-b border-line pb-2">
                    <span className="text-mute">Email</span>
                    <span><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></span>
                 </li>
               </ul>
             </div>
          </div>
        </div>
      </section>

      {/* 4.3 Skills */}
      <section id="skills" className="section-pad content-width border-t border-line bg-paper">
         <h3 className="text-sm font-mono text-mute mb-12">02 — Skills</h3>
         <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
           {SKILL_GROUPS.flatMap(g => g.skills).map((skill, i) => (
             <div key={i} className="aspect-square bg-card border border-line rounded-xl p-3 flex flex-col justify-between hover:scale-105 hover:shadow-xl hover:border-ink transition-all cursor-crosshair">
               <span className="text-[10px] font-mono text-mute">{i + 1}</span>
               <div className="text-center">
                 <div className="font-bold text-xl">{skill.symbol}</div>
                 <div className="text-[9px] uppercase tracking-wider text-mute truncate mt-1">{skill.name}</div>
               </div>
             </div>
           ))}
         </div>
      </section>

      {/* 4.4 Work */}
      <section id="work" className="section-pad content-width border-t border-line bg-paper">
         <h3 className="text-sm font-mono text-mute mb-12">03 — Selected work</h3>
         <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[600px]">
           {PROJECTS.map((project, i) => (
             <div key={i} className="flex-1 hover:flex-[3] transition-all duration-700 ease-out bg-card rounded-[32px] border border-line overflow-hidden p-8 group relative flex flex-col justify-end min-h-[300px]">
               <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
               <div className="relative z-20 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  <div className="text-white/80 font-mono text-sm mb-2">{project.index} — {project.kicker}</div>
                  <h4 className="text-3xl font-bold text-white mb-4">{project.title}</h4>
                  <p className="text-white/70 text-sm max-w-sm mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/20 text-white text-xs">{t}</span>
                    ))}
                  </div>
               </div>
               {/* Vertical title for closed state on desktop */}
               <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-2xl font-bold tracking-widest uppercase opacity-100 group-hover:opacity-0 transition-opacity duration-300 text-mute whitespace-nowrap origin-center">
                  {project.title}
               </div>
             </div>
           ))}
         </div>
      </section>

      {/* 4.5 Experience */}
      <section id="experience" className="section-pad content-width border-t border-line bg-paper">
         <h3 className="text-sm font-mono text-mute mb-12">04 — Experience</h3>
         <div className="max-w-2xl border-l-2 border-line ml-4 md:ml-8 space-y-16 py-8">
           {[...EXPERIENCE, ...EDUCATION].map((item, i) => (
             <div key={i} className="relative pl-12 group">
               <div className="absolute w-4 h-4 rounded-full bg-paper border-2 border-ink -left-[9px] top-1 transition-transform group-hover:scale-150" />
               <div className="text-sm font-mono text-mute mb-2">{item.year}</div>
               <h4 className="text-xl font-bold mb-1">{item.title}</h4>
               <div className="text-ink-2 font-medium mb-3">{item.place}</div>
               <p className="text-mute text-sm leading-relaxed">{item.detail}</p>
             </div>
           ))}
         </div>
      </section>

      {/* 4.6 Achievements */}
      <section id="achievements" className="border-t border-line bg-paper">
         <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden content-width">
           <h3 className="text-sm font-mono text-mute absolute top-24">05 — Achievements</h3>
           <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
             {ACHIEVEMENTS.map((ach, i) => (
               <div key={i} className="min-w-[340px] md:min-w-[440px] h-[260px] md:h-[310px] bg-card rounded-[28px] border border-line p-8 flex flex-col snap-center shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden">
                 <div className="text-5xl opacity-10 font-black absolute top-4 right-4 tracking-tighter">0{i+1}</div>
                 <h4 className="text-3xl font-bold mt-auto mb-2">{ach.title}</h4>
                 <p className="text-mute font-medium">{ach.subtitle}</p>
               </div>
             ))}
             <div className="min-w-[340px] md:min-w-[440px] h-[260px] md:h-[310px] flex items-center justify-center text-xl font-bold text-mute snap-center">
               and counting →
             </div>
           </div>
         </div>
      </section>

      {/* 4.7 Contact */}
      <section id="contact" className="section-pad content-width border-t border-line text-center bg-paper relative z-10">
         <h1 className="text-5xl md:text-[8vw] font-black tracking-tighter mb-12 leading-none cursor-default group">
            Let's build<br />
            <span className="text-mute group-hover:text-ink transition-colors duration-700">something together.</span>
         </h1>
         <div className="flex flex-col items-center gap-6">
           <a href={`mailto:${PROFILE.email}`} className="text-2xl md:text-4xl font-medium underline decoration-2 underline-offset-8 hover:opacity-50 transition-opacity">
             {PROFILE.email}
           </a>
           <div className="flex gap-6 mt-8 font-mono text-sm uppercase tracking-widest">
             <a href={PROFILE.phoneHref} className="hover:text-mute">{PROFILE.phone}</a>
             <span>—</span>
             <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-mute">GitHub</a>
             <span>—</span>
             <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-mute">LinkedIn</a>
           </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs font-mono text-mute uppercase tracking-widest border-t border-line bg-paper relative z-10">
        <p>© 2026 Shivaram Reddy. Built with Next.js.</p>
      </footer>
    </main>
  );
}
