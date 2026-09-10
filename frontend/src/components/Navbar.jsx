import React, { useState, useEffect } from 'react';
import { Menu, X, Layers } from 'lucide-react';




export const Navbar = ({ sequenceState }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [flaskOnline, setFlaskOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFlask = () => {
      fetch('/api/health')
        .then((res) => res.json())
        .then((data) => {
          setFlaskOnline(data && data.status === 'ok');
        })
        .catch(() => {
          setFlaskOnline(false);
        });
    };
    checkFlask();
    const interval = setInterval(checkFlask, 20000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Summary', href: '#summary' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-3.5 backdrop-blur-[8px] bg-black/20 border-b border-white/[0.08] transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs tracking-wider group-hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(6,182,212,0.15)]">
            MA
          </div>
          <div>
            <span className="font-display font-bold text-sm tracking-wide text-white group-hover:text-cyan-300 transition-colors block">
              Mohammad Aasiq
            </span>
            <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider">
              Security Software Developer
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3.5 py-1 text-xs font-medium text-slate-200 hover:text-white rounded-full hover:bg-white/[0.08] transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Status */}
        <div className="flex items-center gap-3">
          {/* Frame telemetry */}
          {sequenceState && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300">
              <Layers className="w-3 h-3 text-cyan-400" />
              <span>
                {String(sequenceState.currentFrame).padStart(3, '0')}
                <span className="text-slate-500">/300</span>
              </span>
            </div>
          )}

          {/* Flask indicator */}
          <div
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border ${
              flaskOnline
                ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-950/30 text-amber-400 border-amber-500/30'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${flaskOnline ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span>Flask API {flaskOnline ? 'Online' : 'Connecting'}</span>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-200 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/[0.08] bg-black/60 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-white/[0.06] rounded-xl transition-all flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[10px] font-mono text-slate-500">→</span>
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${flaskOnline ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              Flask REST API: {flaskOnline ? 'Online' : 'Connecting'}
            </span>
            {sequenceState && (
              <span>Frame {String(sequenceState.currentFrame).padStart(3, '0')}/300</span>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
