import React from 'react';
import { Compass, Eye, Maximize2, Zap } from 'lucide-react';

export function AboutSection({ velocity = 0 }) {
  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-16 select-none">
      <div 
        className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${velocity * -1.2}px, 0, 0)`,
        }}
      >
        {/* Left Intro Text (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-4">
            02 // CONCEPT
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight leading-tight mb-5">
            Breaking the vertical routine.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-6">
            Most web experiences are tethered to downward scrolling. By redirecting vertical delta gestures along a continuous horizontal plane, interface elements gain a filmic momentum.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Native 60 FPS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Zero Jitter</span>
            </div>
          </div>
        </div>

        {/* Right Glass Card (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all duration-500">
            {/* Subtle card internal ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-8">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-slate-500">EST. 2026</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              Spatial Navigation Canvas
            </h3>
            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed mb-8">
              Built with mathematical interpolation (LERP), smooth frame dampening, and velocity tracking. Sections transition naturally into view from right to left as you scroll downward.
            </p>

            {/* Quick Metrics / Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10">
              <div className="p-3 rounded-xl bg-white/5">
                <div className="text-xs font-mono text-slate-400 mb-1">AXIS</div>
                <div className="text-sm font-semibold text-white">X-Translation</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <div className="text-xs font-mono text-slate-400 mb-1">INTERPOLATION</div>
                <div className="text-sm font-semibold text-cyan-300">Continuous</div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/5">
                <div className="text-xs font-mono text-slate-400 mb-1">OVERHEAD</div>
                <div className="text-sm font-semibold text-emerald-400">&lt; 15 KB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutSection;
