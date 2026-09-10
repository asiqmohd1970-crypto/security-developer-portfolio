import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ArrowDown, Sparkles } from 'lucide-react';




export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between items-center text-center px-6 pt-28 pb-12 z-10"
    >
      {/* Empty top buffer */}
      <div className="h-6" />

      {/* Center Minimal Typography */}
      <div className="max-w-3xl mx-auto backdrop-blur-none">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PORTFOLIO &amp; DLP ARCHITECTURE</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
            <span>VIBE CODING &amp; RAPID PROTOTYPING</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display uppercase mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Mohammad Aasiq
        </h1>

        <p className="text-lg sm:text-2xl md:text-3xl font-medium text-cyan-300 mb-3 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Security Software Developer <span className="text-slate-500 mx-1.5 font-light">|</span> <span className="text-purple-300 font-semibold">Vibe Coder</span>
        </p>

        <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-slate-300 mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>Madurai, Tamil Nadu</span>
        </p>

        {/* Contact Links from Resume */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          <a
            href="mailto:asiqmohd1970@gmail.com"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.12] backdrop-blur-md transition-all shadow-lg cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>asiqmohd1970@gmail.com</span>
          </a>

          <a
            href="tel:6374004563"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.12] backdrop-blur-md transition-all shadow-lg cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>6374004563</span>
          </a>

          <a
            href="https://www.linkedin.com/in/mohammad-aashiq-0627a0360"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.12] backdrop-blur-md transition-all shadow-lg cursor-pointer"
          >
            <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
            <span>linkedin.com/in/mohammad-aashiq-0627a0360</span>
          </a>

          <a
            href="https://github.com/asiqmohd1970-crypto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.12] backdrop-blur-md transition-all shadow-lg cursor-pointer"
          >
            <Github className="w-3.5 h-3.5 text-cyan-400" />
            <span>github.com/asiqmohd1970-crypto</span>
          </a>
        </div>
      </div>

      {/* Subtle Scroll Prompt */}
      <div className="flex flex-col items-center justify-center pt-8 text-center pointer-events-none">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] animate-bounce">
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <span className="text-[10px] font-mono text-slate-400 mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          300-Frame Continuous Interactive Scrub
        </span>
      </div>
    </section>
  );
};
