import React from 'react';
import { GraduationCap, Calendar, Terminal } from 'lucide-react';

export const Education: React.FC = () => {
  const educationList = [
    {
      degree: 'B.E. Computer Science Engineering',
      institution: 'SCAD College of Engineering & Technology',
      period: 'Jun 2023 – Present',
      highlight: 'Undergraduate Degree',
    },
    {
      degree: 'HSC',
      institution: 'Thiruthangal Lions Matriculation Hr. Sec. School',
      period: 'Apr 2022 – May 2023',
      highlight: 'Higher Secondary Education',
    },
    {
      degree: 'SSLC',
      institution: 'Arasan Ganesan Matriculation High School',
      period: 'Mar 2021 – Mar 2022',
      highlight: 'Secondary Education',
    },
  ];

  return (
    <section
      id="education"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-black/20 border-t border-white/[0.08] backdrop-blur-[2px]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2
            className="font-bold tracking-tight text-white mb-4 font-display drop-shadow-md"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            EDUCATION
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 drop-shadow-sm">
            Formal academic qualifications from my resume.
          </p>
        </div>

        {/* 3 Transparent Glass Education Cards */}
        <div className="space-y-5">
          {educationList.map((edu) => (
            <div
              key={edu.degree + edu.period}
              className="p-5 sm:p-7 rounded-2xl bg-white/[0.06] backdrop-blur-[8px] border border-white/[0.12] hover:border-cyan-500/30 transition-all duration-300 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors drop-shadow-sm">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {edu.institution}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full w-fit sm:shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
