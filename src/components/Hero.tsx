import React, { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ArrowDown, Sparkles } from 'lucide-react';
import { ScrollSequenceState } from '../types';

interface HeroProps {
  sequenceState?: ScrollSequenceState;
}

export const Hero: React.FC<HeroProps> = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const vh = window.innerHeight || 800;

        // Gently and smoothly fade hero text as user scrolls down without triggering React renders
        if (contentRef.current) {
          const opacity = Math.max(0, 1 - scrollY / (vh * 0.45));
          contentRef.current.style.opacity = String(opacity);
          contentRef.current.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto';
          contentRef.current.style.transform = `translateY(${Math.min(scrollY * 0.2, 80)}px)`;
        }

        // Fade out bottom prompt quickly as scroll starts
        if (scrollPromptRef.current) {
          const promptOpacity = Math.max(0, 1 - scrollY / 180);
          scrollPromptRef.current.style.opacity = String(promptOpacity);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="home"
      className="hero-section relative min-h-[100dvh] w-full flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-[max(5.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] z-10 overflow-hidden"
    >
      {/* Empty top buffer */}
      <div className="h-4 sm:h-6" />

      {/* Center Minimal Typography with clamp() */}
      <div
        ref={contentRef}
        className="max-w-3xl w-full mx-auto backdrop-blur-none will-change-[transform,opacity]"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] sm:text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PORTFOLIO &amp; DLP ARCHITECTURE</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] sm:text-xs font-mono shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
            <span>VIBE CODING &amp; RAPID PROTOTYPING</span>
          </div>
        </div>

        <h1
          className="font-extrabold tracking-tight text-white font-display uppercase mb-3 sm:mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] leading-[1.08]"
          style={{ fontSize: 'clamp(2rem, 7.5vw, 4.5rem)' }}
        >
          Mohammad Aasiq
        </h1>

        <p
          className="font-medium text-cyan-300 mb-2 sm:mb-3 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          style={{ fontSize: 'clamp(1.125rem, 3.8vw, 1.875rem)' }}
        >
          Security Software Developer <span className="text-slate-500 mx-1.5 font-light">|</span> <span className="text-purple-300 font-semibold">Vibe Coder</span>
        </p>

        <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-slate-300 mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Madurai, Tamil Nadu</span>
        </p>

        {/* Contact Links from Resume */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono max-w-full">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=asiqmohd1970@gmail.com&su=${encodeURIComponent('Project Inquiry - Mohammad Aasiq')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/40 hover:bg-black/60 text-slate-200 hover:text-white border border-white/[0.15] backdrop-blur-md transition-all shadow-lg text-[11px] sm:text-xs max-w-full group cursor-pointer"
            title="Compose directly in Gmail"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">asiqmohd1970@gmail.com</span>
          </a>

          <a
            href="tel:6374004563"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/40 hover:bg-black/60 text-slate-200 hover:text-white border border-white/[0.15] backdrop-blur-md transition-all shadow-lg text-[11px] sm:text-xs"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>6374004563</span>
          </a>

          <a
            href="https://www.linkedin.com/in/mohammad-aashiq-0627a0360"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/40 hover:bg-black/60 text-slate-200 hover:text-white border border-white/[0.15] backdrop-blur-md transition-all shadow-lg text-[11px] sm:text-xs max-w-full group cursor-pointer"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">linkedin.com/in/mohammad-aashiq-0627a0360</span>
          </a>

          <a
            href="https://github.com/asiqmohd1970-crypto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/40 hover:bg-black/60 text-slate-200 hover:text-white border border-white/[0.15] backdrop-blur-md transition-all shadow-lg text-[11px] sm:text-xs max-w-full"
          >
            <Github className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">github.com/asiqmohd1970-crypto</span>
          </a>
        </div>
      </div>

      {/* Subtle Scroll Prompt */}
      <div
        ref={scrollPromptRef}
        className="flex flex-col items-center justify-center pt-6 text-center pointer-events-none will-change-[opacity]"
      >
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] animate-bounce">
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <span className="text-[10px] font-mono text-slate-400 mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
          240-Frame Interactive 3D Scrub
        </span>
      </div>
    </section>
  );
};
