import React from 'react';
import { Activity, Layers, Cpu, ArrowUpRight } from 'lucide-react';

const FEATURES = [
  {
    icon: Activity,
    badge: '01. KINETICS',
    title: 'Fluid LERP Physics',
    description: 'Translates discrete vertical mouse wheel ticks into butter-smooth continuous momentum using requestAnimationFrame dampening.',
    color: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'group-hover:border-cyan-500/40',
    accent: 'text-cyan-400',
  },
  {
    icon: Layers,
    badge: '02. DEPTH',
    title: 'Spatial Parallax',
    description: 'Ambient atmospheric meshes and background coordinate planes slide at differential velocities for organic optical depth.',
    color: 'from-indigo-500/20 to-purple-500/10',
    borderColor: 'group-hover:border-indigo-500/40',
    accent: 'text-indigo-400',
  },
  {
    icon: Cpu,
    badge: '03. LIGHTWEIGHT',
    title: 'Zero Heavy Libraries',
    description: 'No bulky 3D engines or bloated scroll scripts. Built purely on native hardware-accelerated CSS translate3d transforms.',
    color: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'group-hover:border-emerald-500/40',
    accent: 'text-emerald-400',
  },
];

export function FeaturesSection({ velocity = 0 }) {
  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-16 select-none">
      <div 
        className="max-w-5xl w-full flex flex-col items-start transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${velocity * -1.0}px, 0, 0)`,
        }}
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
              03 // ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
              Engineered for fluidity.
            </h2>
          </div>
          <p className="text-sm font-mono text-slate-400 max-w-xs">
            Smooth 60/120 FPS hardware accelerated transformations across all viewports.
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group relative glass-panel p-7 rounded-3xl border border-white/10 ${item.borderColor} transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                {/* Ambient Card Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.accent} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                  <span>EXP // SPEC</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default FeaturesSection;
