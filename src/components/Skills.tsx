import React from 'react';
import { Terminal, Code2, Layers, ShieldCheck, Database, Sparkles } from 'lucide-react';

export const Skills: React.FC = () => {
  const categories = [
    {
      name: 'Vibe Coding & AI Workflows',
      icon: Sparkles,
      highlight: true,
      badge: '10X VELOCITY',
      description: 'Rapid, iterative software development powered by cutting-edge AI coding workflows and autonomous tools.',
      skills: [
        'Vibe Coding',
        'AI-Assisted Architecture',
        'Cursor & Copilot',
        'Prompt Engineering',
        'Rapid Prototyping',
        'Autonomous AI Workflows',
        'n8n Automation',
      ],
    },
    {
      name: 'Languages',
      icon: Code2,
      skills: ['Rust', 'Python', 'JavaScript/TypeScript', 'PHP', 'HTML5', 'CSS3'],
    },
    {
      name: 'Frameworks & Libraries',
      icon: Layers,
      skills: ['React.js', 'Next.js', 'Vite.js', 'jQuery', 'Flask', 'egui'],
    },
    {
      name: 'Security & Systems',
      icon: ShieldCheck,
      skills: [
        'AES-256 (CBC/GCM)',
        'Windows APIs',
        'SetupAPI',
        'WM_DEVICECHANGE',
        'Windows Services',
        'JWT',
        'bcrypt',
      ],
    },
    {
      name: 'Databases & Tools',
      icon: Database,
      skills: ['MySQL', 'MongoDB', 'n8n', 'Git', 'Google Cloud', 'DevOps fundamentals'],
    },
  ];

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-black/20 border-t border-white/[0.08] backdrop-blur-[2px]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2
            className="font-bold tracking-tight text-white mb-4 font-display drop-shadow-md"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            KEY SKILLS
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 drop-shadow-sm">
            Core technical proficiencies, systems-level engineering, and modern AI vibe coding workflows.
          </p>
        </div>

        {/* Transparent Glass Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isHighlight = cat.highlight;

            return (
              <div
                key={cat.name}
                className={`p-5 sm:p-7 rounded-2xl backdrop-blur-[8px] transition-all duration-300 shadow-lg group ${
                  isHighlight
                    ? 'md:col-span-2 bg-gradient-to-r from-purple-950/30 via-white/[0.06] to-cyan-950/30 border border-purple-500/30 hover:border-purple-400/60 shadow-[0_0_25px_rgba(168,85,247,0.15)]'
                    : 'bg-white/[0.06] border border-white/[0.12] hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl border group-hover:scale-105 transition-transform ${
                        isHighlight
                          ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                          : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3
                      className={`text-lg font-bold transition-colors drop-shadow-sm ${
                        isHighlight
                          ? 'text-white group-hover:text-purple-300'
                          : 'text-white group-hover:text-cyan-300'
                      }`}
                    >
                      {cat.name}
                    </h3>
                  </div>

                  {cat.badge && (
                    <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300">
                      {cat.badge}
                    </span>
                  )}
                </div>

                {cat.description && (
                  <p className="text-xs text-slate-300 mb-4 max-w-2xl leading-relaxed">
                    {cat.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 text-xs font-mono rounded-xl transition-all shadow-sm ${
                        isHighlight && skill === 'Vibe Coding'
                          ? 'bg-purple-500/20 text-purple-200 border border-purple-400/40 font-semibold shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.1]'
                      }`}
                    >
                      {skill}
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
