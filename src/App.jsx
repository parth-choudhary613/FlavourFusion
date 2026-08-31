import React from 'react';
import { useHorizontalScroll } from './hooks/useHorizontalScroll';
import  BackgroundElements  from './components/BackgroundElements';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { ContactSection } from './components/sections/ContactSection';

export function App() {
  const {
    containerRef,
    trackRef,
    scrollProgress,
    activeSection,
    velocity,
    scrollToSection,
    scrollToStart,
    totalSections,
  } = useHorizontalScroll({
    totalSections: 4,
    damping: 0.08,
    wheelSpeed: 1.0,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-screen overflow-hidden bg-[#07080D] cursor-default select-none"
    >
      {/* Background Layer with Parallax Depth */}
      <BackgroundElements scrollProgress={scrollProgress} velocity={velocity} />

      {/* Floating HUD & Navigation Overlay */}
      <Navigation
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        totalSections={totalSections}
      />

      {/* Horizontal Continuous Motion Track */}
      <main
        ref={trackRef}
        className="relative z-10 flex flex-row h-full w-max will-change-transform"
        style={{
          // GPU acceleration
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        {/* Section 01: Hero */}
        <HeroSection
          onExplore={() => scrollToSection(1)}
          velocity={velocity}
        />

        {/* Section 02: About */}
        <AboutSection velocity={velocity} />

        {/* Section 03: Features */}
        <FeaturesSection velocity={velocity} />

        {/* Section 04: Contact */}
        <ContactSection
          onRestart={scrollToStart}
          velocity={velocity}
        />
      </main>
    </div>
  );
}

export default App;
