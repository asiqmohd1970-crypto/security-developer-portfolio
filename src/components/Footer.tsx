import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 bg-black/30 backdrop-blur-[2px] border-t border-white/[0.08] py-12 px-4 sm:px-6 md:px-12 text-slate-300 text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/30">
            MA
          </div>
          <div>
            <span className="text-white font-medium">Mohammad Aasiq</span>
            <span className="text-slate-500 mx-2">•</span>
            <span>Security Software Developer</span>
          </div>
        </div>

        {/* Center: Social & Tech Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 text-[11px]">
          <a
            href="https://www.linkedin.com/in/mohammad-aashiq-0627a0360"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 text-slate-300"
          >
            <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
            <span>LinkedIn</span>
          </a>
          <span className="text-slate-600">|</span>
          <a
            href="https://github.com/asiqmohd1970-crypto"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 text-slate-300"
          >
            <Github className="w-3.5 h-3.5 text-cyan-400" />
            <span>GitHub</span>
          </a>
          <span className="text-slate-600">|</span>
          <span>React + Vite</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">Python Flask API</span>
        </div>

        {/* Right: Top Action */}
        <button
          type="button"
          id="footer-back-to-top"
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.12] transition-colors cursor-pointer"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
        <div>Madurai, Tamil Nadu • 6374004563 • asiqmohd1970@gmail.com</div>
        <div>© {new Date().getFullYear()} Mohammad Aasiq. All rights reserved.</div>
      </div>
    </footer>
  );
};
