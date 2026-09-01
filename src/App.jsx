import React, { useState, useEffect } from 'react';
import { useHorizontalScroll } from './hooks/useHorizontalScroll';
import BackgroundElements from './components/BackgroundElements';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { ContactSection } from './components/sections/ContactSection';
import { IceCreamTruck } from './components/Truck';
import { EngineIgnition } from './components/EngineIgnition';
import { engineAudio } from './utils/engineAudio';

export function App() {
  // Engine states: 'off' | 'starting' | 'running'
  const [engineState, setEngineState] = useState('off');
  const isEngineRunning = engineState === 'running';

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
    // When engine is OFF, wheel speed is 0 so the scroll hook stops responding
    wheelSpeed: isEngineRunning ? 1.0 : 0,
  });

  // Complete event lockdown: prevent wheel, touchmove, and arrow keys when engine is OFF
  useEffect(() => {
    if (isEngineRunning) return;

    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const preventKeys = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown'].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeys, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeys);
    };
  }, [isEngineRunning]);

  // Start engine handler
  const handleStartEngine = () => {
    if (engineState !== 'off') return;
    setEngineState('starting');

    // Play start audio sequence and set state to running when sound finishes
    engineAudio.playStartSequence(() => {
      setEngineState('running');
    });
  };

  // Stop engine handler
  const handleStopEngine = () => {
    engineAudio.stopEngine();
    setEngineState('off');
  };

  // Physics-based truck tilt based on scroll velocity
  const tiltAngle = isEngineRunning ? Math.max(Math.min((velocity || 0) * 1.5, 12), -12) : 0;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-screen overflow-hidden bg-[#07080D] cursor-default select-none ${
        !isEngineRunning ? 'pointer-events-none' : ''
      }`}
    >
      {/* 🔑 Engine Ignition Modal & Status HUD (stays interactive) */}
      <div className="pointer-events-auto">
        <EngineIgnition
          engineState={engineState}
          onStart={handleStartEngine}
          onStop={handleStopEngine}
        />
      </div>

      {/* Background Layer with Parallax Depth */}
      <BackgroundElements
        scrollProgress={isEngineRunning ? scrollProgress : 0}
        velocity={isEngineRunning ? velocity : 0}
      />

      {/* Floating HUD & Navigation Overlay */}
      <Navigation
        scrollProgress={isEngineRunning ? scrollProgress : 0}
        activeSection={activeSection}
        scrollToSection={isEngineRunning ? scrollToSection : () => {}}
        totalSections={totalSections}
      />

      {/* 🍦 Ice Cream Truck Runner */}
      <div
        className={`pointer-events-none fixed bottom-0.5 left-0 z-3 ${
          engineState === 'starting' ? 'animate-bounce' : ''
        } ${isEngineRunning ? 'animate-[pulse_4s_infinite]' : ''}`}
        style={{
          transform: `translate3d(calc(${
            isEngineRunning ? scrollProgress * 75 : 0
          }vw + 20px), 0, 0) )`,
        }}
      >
        <IceCreamTruck
          size={950}
        />
      </div>

      {/* Horizontal Continuous Motion Track */}
      <main
        ref={trackRef}
        className="relative z-10 flex flex-row h-full w-max will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        {/* Section 01: Hero */}
        <HeroSection
          onExplore={() => isEngineRunning && scrollToSection(1)}
          velocity={isEngineRunning ? velocity : 0}
        />

        {/* Section 02: About */}
        <AboutSection velocity={isEngineRunning ? velocity : 0} />

        {/* Section 03: Features */}
        <FeaturesSection velocity={isEngineRunning ? velocity : 0} />

        {/* Section 04: Contact */}
        <ContactSection
          onRestart={isEngineRunning ? scrollToStart : () => {}}
          velocity={isEngineRunning ? velocity : 0}
        />
      </main>
    </div>
  );
}

export default App;