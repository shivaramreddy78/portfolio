"use client";

import { motion } from "framer-motion";
import { Home, User, Cpu, Layers, Mail } from "lucide-react";

interface NavDockProps {
  activeNav: string;
  onNavigate: (href: string) => void;
}

const DOCK_ITEMS = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Cpu },
  { label: "Projects", href: "#projects", icon: Layers },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function MobileNavDock({ activeNav, onNavigate }: NavDockProps) {
  return (
    <aside
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[380px] pointer-events-auto"
      style={{
        bottom: "max(0.75rem, env(safe-area-inset-bottom))"
      }}
    >
      <nav className="flex items-center justify-around bg-card/92 backdrop-blur-2xl border border-line/90 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full px-2 py-1.5">
        {DOCK_ITEMS.map((item) => {
          const isActive = activeNav === item.href;
          const Icon = item.icon;

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.href);
                const el = document.querySelector(item.href);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex flex-col items-center justify-center min-w-[46px] min-h-[44px] px-2 py-1 rounded-full text-xs font-mono transition-all select-none ${
                isActive ? "text-paper font-bold" : "text-ink-2/70 hover:text-ink active:scale-95"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="dock-active-pill"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-ink rounded-full -z-0 shadow-sm"
                />
              )}

              <span className="relative z-10 flex flex-col items-center gap-0.5">
                <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] tracking-tight leading-none scale-90">
                  {item.label}
                </span>
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
