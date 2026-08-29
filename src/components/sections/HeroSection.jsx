import React from 'react';
import { ArrowRight, MoveRight, MousePointer, Sparkles } from 'lucide-react';

export function HeroSection({ onExplore, velocity = 0 }) {
  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-16 select-none">
      <div 
        className="max-w-4xl w-full flex flex-col items-center md:items-start text-center md:text-left transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${velocity * -1.5}px, 0, 0)`,
        }}
      >
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wider text-cyan-300 uppercase">
            Experimental Spatial Canvas
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white font-display leading-[1.05] mb-6">
          SCROLL <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            FORWARD.
          </span>
        </h1>

        {/* Short Description */}
        <p className="text-base sm:text-xl text-slate-400 max-w-xl font-light leading-relaxed mb-10">
          Transforming standard vertical scroll into continuous horizontal momentum. Travel across a seamless spatial track.
        </p>

        {/* CTA & Scroll Instruction */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <button
            onClick={onExplore}
            className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <span>Begin Journey</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Interactive Scroll Hint */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 backdrop-blur-md">
            <div className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-white/5">
              <MoveRight className="w-3.5 h-3.5 text-cyan-400 animate-[pulse_1.5s_infinite]" />
            </div>
            <span className="font-mono">Scroll mouse wheel or trackpad down</span>
          </div>
        </div>

        {/* Minimal Coordinate Stamp */}
        <div className="mt-16 sm:mt-24 flex items-center gap-6 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
          <span>SEC // 01</span>
          <span>•</span>
          <span>VECTOR: X-AXIS</span>
          <span>•</span>
          <span>LERP: 0.08</span>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
