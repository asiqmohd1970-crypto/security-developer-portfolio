import React from 'react';
import { Terminal, Shield, KeyRound, ExternalLink, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  const projects = [
    {
      title: 'QROX — Endpoint Data Loss Prevention Agent',
      badge: 'Systems Security / DLP',
      description:
        'A high-performance endpoint security solution engineered in Rust for monitoring and controlling removable USB storage devices. Enforces real-time access policies, inspects device connectivity events via native Windows APIs, and protects sensitive organizational data from unauthorized exfiltration using robust AES-256-CBC encryption.',
      technologies: ['Rust', 'egui', 'AES-256-CBC', 'Windows API', 'Windows Service'],
      githubUrl: 'https://github.com/asiqmohd1970-crypto',
      icon: Shield,
    },
    {
      title: 'Full-Stack Customer Registration & Login System',
      badge: 'Full-Stack Authentication',
      description:
        'An enterprise-grade customer identity and access management architecture. Features end-to-end credential security, secure token generation with JSON Web Tokens (JWT), bcrypt password hashing, input validation, and reliable relational persistence using MySQL paired with a Python Flask REST API and React/TypeScript frontend.',
      technologies: ['React', 'TypeScript', 'Python Flask', 'MySQL', 'JWT', 'bcrypt'],
      githubUrl: 'https://github.com/asiqmohd1970-crypto',
      icon: KeyRound,
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-black/20 border-t border-white/[0.08] backdrop-blur-[2px]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>APPLIED SYSTEMS</span>
          </div>
          <h2
            className="font-bold tracking-tight text-white mb-4 font-display drop-shadow-md"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            KEY PROJECTS
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 drop-shadow-sm">
            Core systems-level security and full-stack software architectures from my resume.
          </p>
        </div>

        {/* 2 Transparent Glass Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.title}
                className="flex flex-col justify-between p-5 sm:p-8 rounded-2xl bg-white/[0.06] backdrop-blur-[8px] border border-white/[0.12] hover:border-cyan-500/40 transition-all duration-300 shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.04] text-cyan-300 border border-white/[0.08]">
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors drop-shadow-sm">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.04] text-slate-200 border border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/[0.08]">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-mono font-medium rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all shadow-md cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
