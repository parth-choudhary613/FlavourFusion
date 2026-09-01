import React from 'react';
import { Compass, Sparkles, Layers, Send, ChevronRight, ChevronLeft } from 'lucide-react';
import Brandlogo  from '../assets/Flavour.png'
const SECTIONS = [
  { id: 0, label: 'Hero', icon: Compass },
  { id: 1, label: 'About', icon: Sparkles },
  { id: 2, label: 'Features', icon: Layers },
  { id: 3, label: 'Contact', icon: Send },
];

export function Navigation({
  scrollProgress = 0,
  activeSection = 0,
  scrollToSection,
  totalSections = 4,
}) {
  return (
    <>
      {/* Top Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gray-400 via-rose-500 to-amber-900 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(56,189,248,0.6)]"
          style={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
        />
      </div>

      {/* Header HUD Bar */}
      <header className="fixed top-6 left-6 right-6 flex items-center justify-between z-40 pointer-events-none">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 pointer-events-auto">
          
<img src={Brandlogo} alt="Flavour Fusion Logo" className="w-25 h-25 rounded-full" />

        </div>

        {/* Section Counter & Navigation Indicator */}
        <div className="hidden sm:flex items-center gap-4 pointer-events-auto bg-rose-300/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full shadow-2xl">
          <span className="text-xs font-mono text-red-300 font-semibold">
            0{activeSection + 1}
          </span>
          <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-200 to-red-300 rounded-full transition-all duration-200"
              style={{ width: `${((activeSection + 1) / totalSections) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-rose-500">
            0{totalSections}
          </span>
        </div>

        {/* Status Pill */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-mono text-slate-300 tracking-wider">
           Journey of Sweetness
          </span>
        </div>
      </header>

      {/* Floating Bottom Section Switcher / Control Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{sec.label}</span>
              <span className="sm:hidden text-[10px] font-mono">0{sec.id + 1}</span>
            </button>
          );
        })}

        {/* Quick Prev / Next Arrow buttons */}
        <div className="hidden lg:flex items-center gap-1 pl-2 ml-1 border-l border-white/10">
          <button
            onClick={() => scrollToSection(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            aria-label="Previous section"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => scrollToSection(Math.min(totalSections - 1, activeSection + 1))}
            disabled={activeSection === totalSections - 1}
            aria-label="Next section"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>
    </>
  );
}
export default Navigation;
