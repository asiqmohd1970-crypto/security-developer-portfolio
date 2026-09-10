import React from 'react';
import { ShieldCheck, Terminal, Lock, Server, Cpu, Cloud, Code, Sparkles } from 'lucide-react';

export const Summary: React.FC = () => {
  const highlights = [
    {
      title: 'Systems-Level Security Tooling',
      desc: 'Architecture and low-level development of endpoint monitoring and threat containment agents.',
      icon: ShieldCheck,
    },
    {
      title: 'Vibe Coding & AI-Driven Workflow',
      desc: 'Mastering vibe coding workflows, AI-assisted development (Cursor/LLMs), rapid prototyping, and shipping secure software at 10x speed.',
      icon: Sparkles,
    },
    {
      title: 'Rust-Based Endpoint DLP',
      desc: 'Building high-performance, memory-safe data loss prevention tools with custom graphical interfaces.',
      icon: Cpu,
    },
    {
      title: 'Full-Stack Web Applications',
      desc: 'Designing accessible web user interfaces integrated with reliable backend microservice architectures.',
      icon: Code,
    },
    {
      title: 'React & Flask Web Systems',
      desc: 'Developing seamless full-stack applications with React frontend clients and Python Flask REST APIs.',
      icon: Server,
    },
    {
      title: 'Native Windows APIs',
      desc: 'Win32 device notification hooks (WM_DEVICECHANGE, SetupAPI) and background Windows Services.',
      icon: Terminal,
    },
    {
      title: 'Cryptography & Identity',
      desc: 'Symmetric encryption standards (AES-256-CBC/GCM), JSON Web Tokens (JWT), and bcrypt password hashing.',
      icon: Lock,
    },
    {
      title: 'DevOps / Google Cloud',
      desc: 'CI/CD pipeline automation, containerization workflows, Linux administration, and cloud deployments.',
      icon: Cloud,
    },
  ];

  return (
    <section
      id="summary"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-black/20 border-t border-white/[0.08] backdrop-blur-[2px]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>EXECUTIVE SUMMARY</span>
          </div>
          <h2
            className="font-bold tracking-tight text-white mb-4 sm:mb-6 font-display drop-shadow-md"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            SUMMARY
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed drop-shadow-sm">
            Security software developer and vibe coder specializing in systems-level security tooling, AI-powered vibe coding workflows, Rust-based endpoint DLP, full-stack web applications, React/Flask systems, native Windows APIs, cryptography, and DevOps / Google Cloud.
          </p>
        </div>

        {/* Transparent Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/[0.06] backdrop-blur-[8px] border border-white/[0.12] hover:border-cyan-500/30 transition-all duration-300 shadow-lg group"
              >
                <div className="p-3 w-fit rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors drop-shadow-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
