import { describe, it, expect } from 'vitest';
import type { AudioEngineOptions } from './engine';
import { createAudioEngine } from './engine';
import { CUES } from './cues';

// This suite runs in Vitest's default node environment on purpose — the
// engine takes injected `createContext`/`now` functions specifically so no
// real (or jsdom) AudioContext is ever required to test it.

/**
 * Records every call as a `[value, time]` pair, which is the only way to
 * assert the envelope shape: the engine never reads a gain back, it only
 * schedules ramps, so the schedule itself has to be captured to be checked.
 */
class FakeAudioParam {
  value = 0;
  setValueAtTimeCalls: [number, number][] = [];
  linearRampCalls: [number, number][] = [];
  exponentialRampCalls: [number, number][] = [];

  setValueAtTime(value: number, time: number) {
    this.value = value;
    this.setValueAtTimeCalls.push([value, time]);
  }

  linearRampToValueAtTime(value: number, time: number) {
    this.value = value;
    this.linearRampCalls.push([value, time]);
  }

  exponentialRampToValueAtTime(value: number, time: number) {
    this.value = value;
    this.exponentialRampCalls.push([value, time]);
  }
}

class FakeGainNode {
  gain = new FakeAudioParam();
  connections: unknown[] = [];
  disconnectCalls = 0;

  connect(destination: unknown) {
    this.connections.push(destination);
  }

  disconnect() {
    this.disconnectCalls += 1;
  }
}

class FakeOscillatorNode {
  type = 'sine';
  frequency = new FakeAudioParam();
  connections: unknown[] = [];
  disconnectCalls = 0;
  startCalls: number[] = [];
  stopCalls: number[] = [];
  onended: (() => void) | null = null;

  connect(destination: unknown) {
    this.connections.push(destination);
  }

  disconnect() {
    this.disconnectCalls += 1;
  }

  start(time: number) {
    this.startCalls.push(time);
  }

  stop(time: number) {
    this.stopCalls.push(time);
  }
}

/** One stubbed AudioContext instance, tracking everything it was asked to build. */
class FakeAudioContext {
  currentTime = 0;
  destination = {};
  state: string;
  oscillators: FakeOscillatorNode[] = [];
  gains: FakeGainNode[] = [];
  resumeCalls = 0;
  closeCalls = 0;

  constructor(state = 'running') {
    this.state = state;
  }

  createOscillator() {
    const osc = new FakeOscillatorNode();
    this.oscillators.push(osc);
    return osc;
  }

  createGain() {
    const gain = new FakeGainNode();
    this.gains.push(gain);
    return gain;
  }

  resume() {
    this.resumeCalls += 1;
    return Promise.resolve();
  }

  close() {
    this.closeCalls += 1;
    return Promise.resolve();
  }
}

/**
 * Builds a `createContext` that mints a fresh `FakeAudioContext` per call and
 * remembers every instance — used both to assert the factory ran the right
 * number of times, and (for dispose()) that a rebuilt context is a genuinely
 * new instance rather than the closed one reused.
 */
function makeCountingFactory(state = 'running') {
  const contexts: FakeAudioContext[] = [];
  let calls = 0;
  const createContext = () => {
    calls += 1;
    const ctx = new FakeAudioContext(state);
    contexts.push(ctx);
    return ctx as unknown as AudioContext;
  };
  return { createContext, contexts, calls: () => calls };
}

function makeClock(initial = 0) {
  let time = initial;
  return {
    now: () => time,
    set: (next: number) => {
      time = next;
    },
  };
}

function setupEngine(overrides: Partial<AudioEngineOptions> & { state?: string } = {}) {
  const factory = makeCountingFactory(overrides.state);
  const clock = makeClock(0);
  const engine = createAudioEngine({
    createContext: factory.createContext,
    now: overrides.now ?? clock.now,
    minIntervalMs: overrides.minIntervalMs,
  });
  return { engine, factory, clock };
}

describe('createAudioEngine', () => {
  describe('play', () => {
    it('returns true and wires oscillator -> envelope gain -> master gain -> destination', () => {
      const { engine, factory } = setupEngine();

      expect(engine.play(CUES.compare, 'compare')).toBe(true);

      const ctx = factory.contexts[0];
      expect(ctx.oscillators.length).toBe(1);
      // The master gain is built at context construction time, not by play(),
      // so a single play() leaves two gains total, not one.
      const [master, envelope] = ctx.gains;
      expect(ctx.gains.length).toBe(2);

      const [osc] = ctx.oscillators;
      expect(osc.connections).toEqual([envelope]);
      expect(envelope.connections).toEqual([master]);
      expect(master.connections).toEqual([ctx.destination]);
    });

    it('configures the oscillator from the cue spec', () => {
      const { engine, factory } = setupEngine();
      engine.play(CUES.compare, 'compare');

      const [osc] = factory.contexts[0].oscillators;
      expect(osc.type).toBe('sine');
      expect(osc.frequency.value).toBe(330);
    });

    it('shapes the envelope so the exponential ramp never touches exactly zero', () => {
      const { engine, factory } = setupEngine();
      engine.play(CUES.compare, 'compare');

      const ctx = factory.contexts[0];
      const envelope = ctx.gains[1];
      const osc = ctx.oscillators[0];

      // exponentialRampToValueAtTime can neither start from nor reach 0, so the
      // ramp's floor value has to be the SILENT constant, not a literal 0.
      const [firstGainValue] = envelope.gain.setValueAtTimeCalls[0];
      expect(firstGainValue).toBe(0.0001);
      expect(firstGainValue).not.toBe(0);

      const [rampTarget, rampTime] = envelope.gain.exponentialRampCalls[0];
      expect(rampTarget).toBeGreaterThan(0);
      const endAt = ctx.currentTime + CUES.compare.durationMs / 1000;
      expect(rampTime).toBeCloseTo(endAt);

      // stop() is scheduled slightly after the ramp finishes so the tail isn't cut off.
      expect(osc.stopCalls[0]).toBeGreaterThanOrEqual(endAt);
    });

    it('disconnects both nodes when the voice ends', () => {
      const { engine, factory } = setupEngine();
      engine.play(CUES.compare, 'compare');

      const ctx = factory.contexts[0];
      const [osc] = ctx.oscillators;
      const envelope = ctx.gains[1];

      expect(typeof osc.onended).toBe('function');
      osc.onended?.();

      expect(osc.disconnectCalls).toBe(1);
      expect(envelope.disconnectCalls).toBe(1);
    });
  });

  describe('per-cue rate limiting', () => {
    // The most important behavior in this file: the limiter is keyed per cue
    // name, so a burst of one kind can never swallow a different kind that
    // happens to land in the same window.
    it('drops a repeat of the same cue inside the window but still lets a different cue through', () => {
      const { engine, factory, clock } = setupEngine({ minIntervalMs: 45 });
      const ctx = () => factory.contexts[0];

      clock.set(0);
      expect(engine.play(CUES.compare, 'compare')).toBe(true);
      expect(ctx().oscillators.length).toBe(1);

      clock.set(10);
      expect(engine.play(CUES.compare, 'compare')).toBe(false);
      // Asserting the count, not just the return value: a bug could return
      // false while still leaking a voice through.
      expect(ctx().oscillators.length).toBe(1);

      expect(engine.play(CUES.swap, 'swap')).toBe(true);
      expect(ctx().oscillators.length).toBe(2);

      clock.set(50);
      expect(engine.play(CUES.compare, 'compare')).toBe(true);
      expect(ctx().oscillators.length).toBe(3);
    });
  });

  describe('unavailability', () => {
    it('degrades silently when the factory returns null', () => {
      const engine = createAudioEngine({ createContext: () => null, now: makeClock(0).now });

      expect(engine.play(CUES.compare, 'compare')).toBe(false);
      expect(engine.available).toBe(false);
    });

    it('degrades silently when the factory throws', () => {
      const engine = createAudioEngine({
        createContext: () => {
          throw new Error('no AudioContext in this environment');
        },
        now: makeClock(0).now,
      });

      expect(() => engine.play(CUES.compare, 'compare')).not.toThrow();
      expect(engine.play(CUES.compare, 'compare')).toBe(false);
      expect(engine.available).toBe(false);
    });
  });

  describe('lazy construction', () => {
    it('does not build a context merely by being created', () => {
      const factory = makeCountingFactory();
      createAudioEngine({ createContext: factory.createContext, now: makeClock(0).now });

      expect(factory.calls()).toBe(0);
    });

    it('builds the context at most once across repeated unlock() and play() calls', () => {
      const { engine, factory } = setupEngine();

      engine.unlock();
      expect(factory.calls()).toBe(1);

      engine.play(CUES.compare, 'compare');
      expect(factory.calls()).toBe(1);

      engine.unlock();
      engine.play(CUES.swap, 'swap');
      expect(factory.calls()).toBe(1);
    });
  });

  describe('unlock', () => {
    it('resumes a suspended context', () => {
      const { engine, factory } = setupEngine({ state: 'suspended' });
      engine.unlock();
      expect(factory.contexts[0].resumeCalls).toBe(1);
    });

    it('does not resume a context that is already running', () => {
      const { engine, factory } = setupEngine({ state: 'running' });
      engine.unlock();
      expect(factory.contexts[0].resumeCalls).toBe(0);
    });
  });

  describe('dispose', () => {
    it('closes the context, and the next play() rebuilds a fresh one', () => {
      const { engine, factory } = setupEngine();

      engine.play(CUES.compare, 'compare');
      expect(factory.calls()).toBe(1);

      engine.dispose();
      expect(factory.contexts[0].closeCalls).toBe(1);

      engine.play(CUES.compare, 'compare');
      expect(factory.calls()).toBe(2);
      // The HMR-safety guarantee: a rebuild is a genuinely new context, not
      // the closed one silently reused.
      expect(factory.contexts[1]).not.toBe(factory.contexts[0]);
    });
  });

  describe('setVolume', () => {
    it('maps volume through 0.5 * volume^2', () => {
      const { engine, factory } = setupEngine();
      engine.unlock();
      engine.setVolume(0.5);
      expect(factory.contexts[0].gains[0].gain.value).toBeCloseTo(0.125);
    });

    it('clamps above 1', () => {
      const { engine, factory } = setupEngine();
      engine.unlock();
      engine.setVolume(2);
      expect(factory.contexts[0].gains[0].gain.value).toBeCloseTo(0.5);
    });

    it('clamps below 0', () => {
      const { engine, factory } = setupEngine();
      engine.unlock();
      engine.setVolume(-1);
      expect(factory.contexts[0].gains[0].gain.value).toBeCloseTo(0);
    });

    it('applies a volume set before the context exists once it is built', () => {
      const { engine, factory } = setupEngine();

      engine.setVolume(0.5);
      expect(factory.calls()).toBe(0);

      engine.unlock();
      expect(factory.contexts[0].gains[0].gain.value).toBeCloseTo(0.125);
    });
  });
});
