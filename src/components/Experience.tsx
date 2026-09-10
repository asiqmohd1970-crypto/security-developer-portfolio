import React from 'react';
import { Briefcase, Calendar, ShieldCheck, Globe } from 'lucide-react';

export const Experience: React.FC = () => {
  const experiences = [
    {
      title: 'Security Software Engineer',
      company: 'Axigo',
      period: 'Jun 2026 – Jul 2026',
      icon: ShieldCheck,
      details: [
        'Engineered systems-level security tooling and endpoint data loss prevention (DLP) agents.',
        'Implemented low-level device monitoring routines using native Windows APIs and Rust.',
        'Researched device access policies, notification hooks, and cryptographic data protections.',
      ],
      tags: ['Rust', 'Windows APIs', 'Endpoint DLP', 'Systems Security', 'Cryptography'],
    },
    {
      title: 'Web Developer – Intern',
      company: 'BugTreat Technologies',
      period: 'Jul 2025',
      icon: Globe,
      details: [
        'Developed full-stack web applications and modular frontend user interfaces.',
        'Integrated RESTful backend services and relational database operations.',
        'Participated in code reviews, responsive layout testing, and feature deployments.',
      ],
      tags: ['Full-Stack Web', 'Frontend UI', 'REST APIs', 'Database Integration'],
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-black/20 border-t border-white/[0.08] backdrop-blur-[2px]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TIMELINE</span>
          </div>
          <h2
            className="font-bold tracking-tight text-white mb-4 font-display drop-shadow-md"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            WORK EXPERIENCE
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 drop-shadow-sm">
            Professional engineering and systems development experience.
          </p>
        </div>

        {/* Transparent Glass Cards */}
        <div className="space-y-6">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.title + exp.company}
                className="p-5 sm:p-8 rounded-2xl bg-white/[0.06] backdrop-blur-[8px] border border-white/[0.12] hover:border-cyan-500/30 transition-all duration-300 shadow-xl group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors drop-shadow-sm">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-300">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 w-fit">
                    <Calendar className="w-3 h-3" />
                    <span>{exp.period}</span>
                  </span>
                </div>

                <ul className="space-y-2 mb-6 text-sm text-slate-300 pl-2">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
