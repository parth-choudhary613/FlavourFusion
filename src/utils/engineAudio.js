// Web Audio API engine sound synthesizer (No external audio files required)
class EngineSoundManager {
  constructor() {
    this.ctx = null;
    this.idleOscs = [];
    this.idleGain = null;
    this.isPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playStartSequence(onEngineStarted) {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // 1. Starter Motor Cranking (3 quick cranks)
    for (let i = 0; i < 3; i++) {
      const crankOsc = ctx.createOscillator();
      const crankGain = ctx.createGain();
      crankOsc.type = 'sawtooth';
      const crankTime = now + i * 0.22;

      crankOsc.frequency.setValueAtTime(85, crankTime);
      crankOsc.frequency.exponentialRampToValueAtTime(32, crankTime + 0.16);

      crankGain.gain.setValueAtTime(0.25, crankTime);
      crankGain.gain.exponentialRampToValueAtTime(0.01, crankTime + 0.18);

      crankOsc.connect(crankGain);
      crankGain.connect(ctx.destination);
      crankOsc.start(crankTime);
      crankOsc.stop(crankTime + 0.19);
    }

    // 2. Engine Ignition Roar at 0.75s
    const igniteTime = now + 0.75;
    const revOsc = ctx.createOscillator();
    const revGain = ctx.createGain();
    revOsc.type = 'triangle';
    revOsc.frequency.setValueAtTime(75, igniteTime);
    revOsc.frequency.exponentialRampToValueAtTime(210, igniteTime + 0.25);
    revOsc.frequency.exponentialRampToValueAtTime(80, igniteTime + 0.85);

    revGain.gain.setValueAtTime(0.01, igniteTime);
    revGain.gain.linearRampToValueAtTime(0.35, igniteTime + 0.15);
    revGain.gain.exponentialRampToValueAtTime(0.08, igniteTime + 0.85);

    revOsc.connect(revGain);
    revGain.connect(ctx.destination);
    revOsc.start(igniteTime);
    revOsc.stop(igniteTime + 0.9);

    // 3. Cheerful Ice Cream Chime upon startup
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      const chimeTime = igniteTime + 0.35 + idx * 0.12;

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, chimeTime);
      chimeGain.gain.setValueAtTime(0.12, chimeTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, chimeTime + 0.22);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(chimeTime);
      chimeOsc.stop(chimeTime + 0.25);
    });

    // 4. Transition to steady engine idle rumble
    setTimeout(() => {
      this.startIdleLoop();
      if (onEngineStarted) onEngineStarted();
    }, 1100);
  }

  startIdleLoop() {
    if (this.isPlaying || !this.ctx) return;
    const ctx = this.ctx;
    this.isPlaying = true;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(40, ctx.currentTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(80, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(130, ctx.currentTime);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();

    this.idleOscs = [osc1, osc2];
    this.idleGain = gain;
  }

  stopEngine() {
    if (this.idleGain && this.ctx) {
      this.idleGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      setTimeout(() => {
        this.idleOscs.forEach((osc) => {
          try {
            osc.stop();
          } catch (e) {}
        });
        this.idleOscs = [];
        this.isPlaying = false;
      }, 350);
    } else {
      this.isPlaying = false;
    }
  }
}

export const engineAudio = new EngineSoundManager();