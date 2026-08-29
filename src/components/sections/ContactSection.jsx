import React, { useState } from 'react';
import { Send, Check, RotateCcw, Globe, Code2, Mail, ArrowRight, ExternalLink } from 'lucide-react';

export function ContactSection({ onRestart, velocity = 0 }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('contact@spatial-horizon.design');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-16 select-none">
      <div 
        className="max-w-3xl w-full flex flex-col items-center text-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${velocity * -0.8}px, 0, 0)`,
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-6">
          04 // DESTINATION
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display text-white tracking-tight mb-6">
          End of track. <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Ready to build?
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-400 font-light max-w-lg mb-10">
          Clean, minimal, component-driven horizontal scrolling in React with effortless physics and zero bloat.
        </p>

        {/* Primary Contact Card & Action Button */}
        <div className="glass-panel p-8 rounded-3xl w-full max-w-md border border-white/10 flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          <button
            onClick={handleCopyEmail}
            className="w-full relative group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white text-slate-950 font-semibold text-sm hover:bg-slate-100 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-white/10"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Email Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
                <span>Say Hello — Get in Touch</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Clean External Links */}
          <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
            <a
              href="#github"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>
            <span>•</span>
            <a
              href="#docs"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Documentation</span>
            </a>
          </div>
        </div>

        {/* Restart / Loop Back Button */}
        <button
          onClick={onRestart}
          className="mt-10 inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 shadow-lg"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Jump Back to Start</span>
        </button>
      </div>
    </section>
  );
}
export default ContactSection;
