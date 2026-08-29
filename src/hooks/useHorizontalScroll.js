import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useHorizontalScroll Hook
 * Converts vertical wheel / trackpad delta, touch gestures, and keyboard navigation
 * into smooth horizontal motion with LERP (Linear Interpolation) dampening and velocity tracking.
 */
export function useHorizontalScroll({
  totalSections = 4,
  damping = 0.08,
  wheelSpeed = 1.0,
} = {}) {
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [activeSection, setActiveSection] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Mutable refs for high performance RAF loop (no re-renders on every frame)
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const maxScrollRef = useRef(0);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const rafIdRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startDragXRef = useRef(0);
  const startDragTargetRef = useRef(0);

  // Recalculate max horizontal scroll based on container and track dimensions
  const updateDimensions = useCallback(() => {
    if (trackRef.current && containerRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxScroll = Math.max(0, trackWidth - windowWidth);
      maxScrollRef.current = maxScroll;
      
      // Ensure target stays within bounds
      targetXRef.current = Math.min(Math.max(0, targetXRef.current), maxScroll);
      setIsReady(true);
    }
  }, []);

  // Update active section index based on current progress
  const updateActiveSection = useCallback((progress) => {
    const sectionIndex = Math.min(
      totalSections - 1,
      Math.max(0, Math.round(progress * (totalSections - 1)))
    );
    setActiveSection((prev) => (prev !== sectionIndex ? sectionIndex : prev));
  }, [totalSections]);

  // Jump or glide smoothly to a specific section (0 to totalSections - 1)
  const scrollToSection = useCallback((index) => {
    if (maxScrollRef.current <= 0) return;
    const clampedIndex = Math.min(totalSections - 1, Math.max(0, index));
    const target = (clampedIndex / (totalSections - 1)) * maxScrollRef.current;
    targetXRef.current = target;
  }, [totalSections]);

  // Jump to start / finish
  const scrollToStart = useCallback(() => scrollToSection(0), [scrollToSection]);
  const scrollToEnd = useCallback(() => scrollToSection(totalSections - 1), [scrollToSection, totalSections]);

  // Main 60/120fps Animation Loop using LERP
  useEffect(() => {
    let lastX = currentXRef.current;

    const animate = () => {
      const maxScroll = maxScrollRef.current;
      
      // LERP formula: current = current + (target - current) * damping
      const diff = targetXRef.current - currentXRef.current;
      currentXRef.current += diff * damping;

      // Calculate instantaneous velocity
      const currentVel = currentXRef.current - lastX;
      lastX = currentXRef.current;

      // Apply transform directly to track DOM element for 60/120 FPS performance without React state overhead
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-currentXRef.current}px, 0, 0)`;
      }

      // Calculate normalized progress (0 to 1)
      const prog = maxScroll > 0 ? Math.min(1, Math.max(0, currentXRef.current / maxScroll)) : 0;
      setScrollProgress(prog);
      updateActiveSection(prog);

      // Keep velocity state updated periodically when in motion
      if (Math.abs(currentVel) > 0.05) {
        setVelocity(currentVel);
      } else if (velocity !== 0) {
        setVelocity(0);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [damping, updateActiveSection, velocity]);

  // Window resize & layout calculation
  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const timeout = setTimeout(updateDimensions, 100);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timeout);
    };
  }, [updateDimensions]);

  // Wheel / Trackpad listener: VERTICAL SCROLL -> HORIZONTAL MOVEMENT
  useEffect(() => {
    const handleWheel = (e) => {
      // Prevent default vertical window scroll
      e.preventDefault();

      // Normalize delta across browsers/trackpads
      let delta = 0;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        delta = e.deltaY;
      } else {
        delta = e.deltaX;
      }

      // Adjust sensitivity for wheel vs trackpad lines/pages
      if (e.deltaMode === 1) delta *= 30; // Line mode
      if (e.deltaMode === 2) delta *= 100; // Page mode

      const speedMultiplier = wheelSpeed * 0.85;
      const newTarget = targetXRef.current + delta * speedMultiplier;
      
      targetXRef.current = Math.min(Math.max(0, newTarget), maxScrollRef.current);
    };

    const container = containerRef.current || window;
    // Must be non-passive to call preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [wheelSpeed]);

  // Keyboard navigation (Arrow keys, Space, PageDown/Up)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const step = window.innerWidth * 0.45; // Move by 45% screen width per key press
      
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          targetXRef.current = Math.min(targetXRef.current + step, maxScrollRef.current);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          targetXRef.current = Math.max(0, targetXRef.current - step);
          break;
        case ' ': // Spacebar
          e.preventDefault();
          if (e.shiftKey) {
            targetXRef.current = Math.max(0, targetXRef.current - step);
          } else {
            targetXRef.current = Math.min(targetXRef.current + step, maxScrollRef.current);
          }
          break;
        case 'Home':
          e.preventDefault();
          targetXRef.current = 0;
          break;
        case 'End':
          e.preventDefault();
          targetXRef.current = maxScrollRef.current;
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch & Pointer Drag Gestures (Mobile swipe + Desktop mouse grab)
  useEffect(() => {
    let startY = 0;
    let isTouch = false;

    const handleTouchStart = (e) => {
      isTouch = true;
      const touch = e.touches[0];
      startDragXRef.current = touch.clientX;
      startY = touch.clientY;
      startDragTargetRef.current = targetXRef.current;
    };

    const handleTouchMove = (e) => {
      if (!isTouch) return;
      const touch = e.touches[0];
      const deltaX = startDragXRef.current - touch.clientX;
      const deltaY = startY - touch.clientY;

      // Handle swipe in either vertical or horizontal swipe direction
      const combinedDelta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY * 1.5 : deltaX * 1.5;
      
      const newTarget = startDragTargetRef.current + combinedDelta;
      targetXRef.current = Math.min(Math.max(0, newTarget), maxScrollRef.current);
    };

    const handleTouchEnd = () => {
      isTouch = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return {
    containerRef,
    trackRef,
    scrollProgress,
    activeSection,
    velocity,
    scrollToSection,
    scrollToStart,
    scrollToEnd,
    isReady,
    totalSections,
  };
}
