import React from 'react';

export function EngineIgnition({ engineState, onStart, onStop }) {
  const isOff = engineState === 'off';
  const isStarting = engineState === 'starting';
  const isRunning = engineState === 'running';

  if (isRunning) {
    return (
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-md border border-emerald-500/30 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)]">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">Engine Running</span>
        <button
          onClick={onStop}
          className="ml-2 text-xs bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white px-2.5 py-1 rounded-full transition-all border border-red-500/40"
        >
          Turn Off
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg">
      <div className="text-center max-w-md p-8 rounded-3xl bg-[#10121A]/90 border border-cyan-500/30 shadow-[0_0_50px_rgba(46,242,247,0.15)] flex flex-col items-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-6">
          🔒 Ignition Locked
        </div>

        <h2 className="text-3xl font-extrabold text-white mb-2">Start the Truck to Drive</h2>
        <p className="text-gray-400 text-sm mb-8">
          The engine is currently off. Turn on the ignition to unlock scrolling and explore the website.
        </p>

        {/* Start Engine Push Button */}
        <button
          onClick={onStart}
          disabled={isStarting}
          className={`relative group flex items-center justify-center w-36 h-36 rounded-full border-4 transition-all duration-300 shadow-2xl ${
            isStarting
              ? 'border-yellow-400 bg-yellow-500/20 animate-pulse text-yellow-300 scale-95'
              : 'border-pink-500 bg-gradient-to-tr from-pink-600 to-amber-400 hover:scale-105 hover:shadow-[0_0_40px_rgba(244,114,182,0.6)] text-white'
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <svg
              className={`w-10 h-10 mb-1 transition-transform ${isStarting ? 'animate-spin' : 'group-hover:rotate-12'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-xs font-black tracking-widest uppercase">
              {isStarting ? 'Starting...' : 'Engine Start'}
            </span>
          </div>
        </button>

        <span className="text-xs text-gray-500 mt-6 tracking-wide">
          🔊 Click to ignite sound & unlock horizontal scroll
        </span>
      </div>
    </div>
  );
}