import React, { useState, useCallback } from 'react';
import { ScrollImageSequence } from './components/ScrollImageSequence';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Summary } from './components/Summary';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';


export default function App() {
  const [sequenceState, setSequenceState] = useState<ScrollSequenceState>({
    currentFrame: 1,
    targetFrame: 1,
    progress: 0,
    direction: 'idle',
    isLoaded: false,
    loadedCount: 0,
    totalFrames: 300,
    fps: 60,
  });

  const handleStateChange = useCallback((newState) => {
    setSequenceState(newState);
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300 antialiased overflow-x-hidden">
      {/* 300-Frame Sticky/Fixed Canvas Layer: Remains Visible Behind Entire Site */}
      <ScrollImageSequence
        frameCount={300}
        onStateChange={handleStateChange}
      />

      {/* Transparent Glass Navigation */}
      <Navbar sequenceState={sequenceState} />

      {/* Main Content Flow: All Sections Use Low Opacity to Keep 3D Canvas Clear & Visible */}
      <main className="relative z-10">
        {/* 1. HOME / HERO */}
        <Hero sequenceState={sequenceState} />

        {/* 2. SUMMARY */}
        <Summary />

        {/* 3. WORK EXPERIENCE */}
        <Experience />

        {/* 4. KEY PROJECTS */}
        <Projects />

        {/* 5. KEY SKILLS */}
        <Skills />

        {/* 6. EDUCATION */}
        <Education />

        {/* 7. CONTACT (Connected to Python Flask Backend) */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
