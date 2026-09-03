import React from "react";

import { useHorizontalScroll } from "./hooks/useHorizontalScroll";
import BackgroundElements from "./components/BackgroundElements";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { ContactSection } from "./components/sections/ContactSection";
import { IceCreamTruck } from "./components/Truck";

export function App() {
  /* ==========================================
     HORIZONTAL SCROLL
  ========================================== */

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

  /* ==========================================
     TRUCK TILT
  ========================================== */

  const tiltAngle = Math.max(
    Math.min((velocity || 0) * 0.1, 0.1),
    -0.1
  );

  /* ==========================================
     MAIN WEBSITE
  ========================================== */

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-screen overflow-hidden bg-[#07080D] cursor-default select-none"
    >
      {/* ======================================
          BACKGROUND PARALLAX
      ====================================== */}

      <BackgroundElements
        scrollProgress={scrollProgress}
        velocity={velocity}
      />

      {/* ======================================
          NAVIGATION
      ====================================== */}

      <Navigation
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        totalSections={totalSections}
      />

      {/* ======================================
          ICE CREAM TRUCK
      ====================================== */}

      <div
        className="pointer-events-none fixed bottom-0.5 left-0 z-30"
        style={{
          transform: `
            translate3d(
              calc(${scrollProgress * 75}vw + 20px),
              0,
              0
            )
            rotate(${tiltAngle}deg)
          `,
          transformOrigin: "center bottom",
          transition: "transform 0.1s linear",
        }}
      >
        <IceCreamTruck size={950} />
      </div>

      {/* ======================================
          HORIZONTAL MOTION TRACK
      ====================================== */}

      <main
        ref={trackRef}
        className="relative z-10 flex flex-row h-full w-max will-change-transform"
        style={{
          transform: "translate3d(0, 0, 0)",
        }}
      >
        {/* ====================================
            SECTION 01 — HERO
        ==================================== */}

        <HeroSection
          onExplore={() => scrollToSection(1)}
          velocity={velocity}
        />

        {/* ====================================
            SECTION 02 — ABOUT
        ==================================== */}

        <AboutSection velocity={velocity} />

        {/* ====================================
            SECTION 03 — FEATURES
        ==================================== */}

        <FeaturesSection velocity={velocity} />

        {/* ====================================
            SECTION 04 — CONTACT
        ==================================== */}

        <ContactSection
          onRestart={scrollToStart}
          velocity={velocity}
        />
      </main>
    </div>
  );
}

export default App;