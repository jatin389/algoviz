import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { effectScope, ref } from 'vue';
import { useStepPlayer } from './useStepPlayer';
import type { StepPlayerOptions } from './useStepPlayer';
import type { StepGenerator } from '@/types';

// speed 100 -> Math.max(4, 204 - 200) = 4ms per step.
const DELAY = 4;

interface CountStep {
  done: boolean;
  i: number;
}

/**
 * A generator that counts how many times it was advanced. Several tests here
 * are about what the player *doesn't* do — stepping backwards and replaying a
 * scrubbed region must never pull from the generator again — and that is only
 * observable by counting `next()` calls.
 */
function makeCounter(n: number) {
  let calls = 0;
  function* gen(): StepGenerator<CountStep> {
    for (let i = 0; i < n; i++) {
      calls += 1;
      yield { done: false, i };
    }
    calls += 1;
    yield { done: true, i: n };
  }
  return { gen, calls: () => calls };
}

function setup(n = 10, overrides: Partial<StepPlayerOptions<CountStep>> = {}) {
  const speed = ref(100);
  const counter = makeCounter(n);
  const applied: { i: number; index: number }[] = [];
  let cleared = 0;

  const player = useStepPlayer<CountStep>({
    speed,
    createGenerator: () => counter.gen(),
    applyStep: (step, index) => {
      applied.push({ i: step.i, index });
    },
    clearStep: () => {
      cleared += 1;
    },
    ...overrides,
  });

  return { player, counter, applied, speed, clearedCount: () => cleared };
}

/**
 * useStepPlayer registers onScopeDispose, which warns with no owning scope.
 * The scope must stay alive for the whole body, so the body runs inside it.
 */
async function withScope(body: () => Promise<void> | void) {
  const scope = effectScope();
  try {
    await scope.run(body);
  } finally {
    scope.stop();
  }
}

describe('useStepPlayer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('walks idle -> running -> paused -> running -> done', async () => {
    await withScope(async () => {
      const { player } = setup(8);
      expect(player.status.value).toBe('idle');

      player.pause();
      expect(player.status.value).toBe('idle');

      player.run();
      expect(player.status.value).toBe('running');

      await vi.advanceTimersByTimeAsync(DELAY * 2);
      player.pause();
      expect(player.status.value).toBe('paused');

      player.run();
      expect(player.status.value).toBe('running');

      await vi.advanceTimersByTimeAsync(DELAY * 40);
      expect(player.status.value).toBe('done');

      player.pause();
      expect(player.status.value).toBe('done');
    });
  });

  it('advances cursor and bufferedCount in lockstep while playing forward', async () => {
    await withScope(async () => {
      const { player } = setup(20);
      player.run();
      await vi.advanceTimersByTimeAsync(DELAY * 5);
      player.pause();

      expect(player.cursor.value).toBe(player.bufferedCount.value - 1);
      expect(player.stepCount.value).toBe(player.cursor.value + 1);
      expect(player.current.value?.i).toBe(player.cursor.value);
    });
  });

  it('steps backwards without advancing the generator', async () => {
    await withScope(async () => {
      const { player, counter } = setup(20);
      player.run();
      await vi.advanceTimersByTimeAsync(DELAY * 6);
      player.pause();

      const callsBefore = counter.calls();
      const cursorBefore = player.cursor.value;

      player.stepBack();
      player.stepBack();
      player.stepBack();

      // The whole point of recording snapshots: going back is a tape rewind,
      // never a re-run.
      expect(counter.calls()).toBe(callsBefore);
      expect(player.cursor.value).toBe(cursorBefore - 3);
      expect(player.current.value?.i).toBe(cursorBefore - 3);
    });
  });

  it('replays buffered steps when resuming after a scrub back', async () => {
    await withScope(async () => {
      const { player, counter } = setup(40);
      player.run();
      await vi.advanceTimersByTimeAsync(DELAY * 10);
      player.pause();

      for (let i = 0; i < 6; i++) player.stepBack();
      const callsAfterScrub = counter.calls();

      player.run();
      await vi.advanceTimersByTimeAsync(DELAY * 3);

      // Still inside the already-recorded region, so the generator must be idle.
      expect(counter.calls()).toBe(callsAfterScrub);
    });
  });

  it('pumps the generator only as far as a forward seek asks', async () => {
    await withScope(async () => {
      const { player, counter } = setup(200);
      player.stepForward();
      expect(counter.calls()).toBe(1);

      player.seek(51);

      expect(counter.calls()).toBe(52);
      expect(player.bufferedCount.value).toBe(52);
      expect(player.cursor.value).toBe(51);
    });
  });

  it('produces the same payload for an index however the cursor reached it', async () => {
    await withScope(async () => {
      const { player, applied } = setup(15);
      player.run();
      await vi.advanceTimersByTimeAsync(DELAY * 60);
      expect(player.status.value).toBe('done');

      const firstPass = new Map<number, number>();
      for (const entry of applied) {
        if (!firstPass.has(entry.index)) firstPass.set(entry.index, entry.i);
      }

      applied.length = 0;
      player.seek(0);
      player.seek(player.bufferedCount.value - 1);

      // Regression net for accumulating in applyStep: a `+=` anywhere in a
      // category's applyStep makes the replayed payloads drift from the originals.
      expect(applied.length).toBeGreaterThan(0);
      for (const entry of applied) {
        expect(entry.i).toBe(firstPass.get(entry.index));
      }
    });
  });

  it('leaves done when scrubbed backwards and returns to it at the terminal step', async () => {
    await withScope(async () => {
      const { player } = setup(6);
      player.run();
      await vi.advanceTimersByTimeAsync(DELAY * 40);
      expect(player.status.value).toBe('done');

      player.stepBack();
      expect(player.status.value).toBe('paused');

      player.seek(player.bufferedCount.value - 1);
      expect(player.status.value).toBe('done');
    });
  });

  it('accumulates elapsed only while running, and never rewinds it', async () => {
    await withScope(async () => {
      const { player } = setup(30);
      expect(player.elapsedMs.value).toBe(0);

      player.run();
      await vi.advanceTimersByTimeAsync(DELAY * 5);
      player.pause();

      const atPause = player.elapsedMs.value;
      expect(atPause).toBeGreaterThan(0);

      // Wall-clock keeps moving while paused; elapsed must not.
      await vi.advanceTimersByTimeAsync(1000);
      expect(player.elapsedMs.value).toBe(atPause);

      // Elapsed measures the animation, not the algorithm's position, so
      // rewinding the cursor must not rewind the clock.
      player.stepBack();
      player.stepBack();
      expect(player.elapsedMs.value).toBe(atPause);
    });
  });

  it('stops at maxSteps and reports the run as truncated', async () => {
    await withScope(async () => {
      const { player } = setup(500, { maxSteps: 5 });
      player.run();
      await vi.advanceTimersByTimeAsync(DELAY * 40);

      expect(player.bufferedCount.value).toBe(5);
      expect(player.truncated.value).toBe(true);
      expect(player.status.value).toBe('done');
    });
  });

  it('empties the tape and clears the view on reset', async () => {
    await withScope(async () => {
      const { player, clearedCount } = setup(20);
      player.run();
      await vi.advanceTimersByTimeAsync(DELAY * 5);

      const clearedBefore = clearedCount();
      player.reset();

      expect(player.bufferedCount.value).toBe(0);
      expect(player.cursor.value).toBe(-1);
      expect(player.status.value).toBe('idle');
      expect(player.current.value).toBeNull();
      expect(clearedCount()).toBe(clearedBefore + 1);
    });
  });

  it('refuses to start when the category returns no generator', async () => {
    await withScope(async () => {
      const { player } = setup(10, { createGenerator: () => null });
      player.run();

      expect(player.status.value).toBe('idle');
      expect(player.bufferedCount.value).toBe(0);
      expect(player.cursor.value).toBe(-1);
    });
  });

  it('drains to the terminal step on skipToEnd', async () => {
    await withScope(async () => {
      const { player } = setup(25);
      player.skipToEnd();

      expect(player.status.value).toBe('done');
      expect(player.fullyBuffered.value).toBe(true);
      expect(player.cursor.value).toBe(player.bufferedCount.value - 1);
      expect(player.current.value?.done).toBe(true);
    });
  });

  it('starts a run when stepped forward straight from idle', async () => {
    await withScope(async () => {
      const { player, counter } = setup(10);
      player.stepForward();

      // Reading an algorithm one step at a time shouldn't require pressing Run.
      expect(player.cursor.value).toBe(0);
      expect(player.current.value?.i).toBe(0);
      expect(player.status.value).toBe('paused');
      expect(counter.calls()).toBe(1);
    });
  });

  describe('onAdvance', () => {
    it('fires once per forward advance, with strictly increasing indices, matching applyStep', async () => {
      await withScope(async () => {
        const advanced: { i: number; index: number }[] = [];
        const { player, applied } = setup(20, {
          onAdvance: (step, index) => advanced.push({ i: step.i, index }),
        });

        player.run();
        await vi.advanceTimersByTimeAsync(DELAY * 8);
        player.pause();

        expect(advanced.length).toBeGreaterThan(0);
        expect(advanced.length).toBe(applied.length);
        for (let k = 1; k < advanced.length; k++) {
          expect(advanced[k].index).toBeGreaterThan(advanced[k - 1].index);
        }
      });
    });

    // The crucial regression this whole describe block exists for: audio must
    // never play in reverse, so rewinding the tape must not touch onAdvance.
    it('fires zero calls on stepBack()', async () => {
      await withScope(async () => {
        const advanced: { i: number; index: number }[] = [];
        const { player } = setup(20, {
          onAdvance: (step, index) => advanced.push({ i: step.i, index }),
        });

        player.run();
        await vi.advanceTimersByTimeAsync(DELAY * 6);
        player.pause();
        advanced.length = 0;

        player.stepBack();
        player.stepBack();
        player.stepBack();

        expect(advanced).toHaveLength(0);
      });
    });

    it('fires zero calls on seek(), even though a single seek can pump several steps', async () => {
      await withScope(async () => {
        const advanced: { i: number; index: number }[] = [];
        const { player } = setup(200, {
          onAdvance: (step, index) => advanced.push({ i: step.i, index }),
        });

        player.stepForward(); // buffers index 0; the expected onAdvance call is cleared below.
        advanced.length = 0;

        player.seek(5);

        // Six steps now sit on the tape (indices 0-5), all reached by the pump
        // loop inside seek() — none of that pumping should reach onAdvance.
        expect(player.bufferedCount.value).toBe(6);
        expect(advanced).toHaveLength(0);
      });
    });

    it('fires zero calls on skipToEnd(), even though it applies the terminal step', async () => {
      await withScope(async () => {
        const advanced: { i: number; index: number }[] = [];
        const { player } = setup(20, {
          onAdvance: (step, index) => advanced.push({ i: step.i, index }),
        });

        player.skipToEnd();

        expect(advanced).toHaveLength(0);
      });
    });

    // Guards against a double-fire: beginRun() resets the cursor to -1 and
    // stepForward() then calls seek(0), which both moves onto and displays
    // index 0 in one go.
    it('fires exactly one call when stepped forward straight from idle', async () => {
      await withScope(async () => {
        const advanced: { i: number; index: number }[] = [];
        const { player } = setup(10, {
          onAdvance: (step, index) => advanced.push({ i: step.i, index }),
        });

        player.stepForward();

        expect(advanced).toEqual([{ i: 0, index: 0 }]);
      });
    });

    it('fires zero calls when stepped forward at a fully-buffered end', async () => {
      await withScope(async () => {
        const advanced: { i: number; index: number }[] = [];
        const { player } = setup(3, {
          onAdvance: (step, index) => advanced.push({ i: step.i, index }),
        });

        player.skipToEnd();
        advanced.length = 0;

        // seek() clamps at the end of the tape, so the cursor never actually
        // moves and stepForward() must treat that as no advance at all.
        player.stepForward();

        expect(advanced).toHaveLength(0);
      });
    });

    // Deliberate, not a bug: scrubbing back and resuming replays the buffered
    // stretch, and onAdvance fires again for it. You scrubbed back to
    // re-watch, so you should re-hear too — do not "fix" this into a
    // fire-once-ever guarantee.
    it('fires again when replaying buffered steps after a scrub back', async () => {
      await withScope(async () => {
        const advanced: { i: number; index: number }[] = [];
        const { player } = setup(20, {
          onAdvance: (step, index) => advanced.push({ i: step.i, index }),
        });

        player.run();
        await vi.advanceTimersByTimeAsync(DELAY * 8);
        player.pause();

        for (let k = 0; k < 4; k++) player.stepBack();
        advanced.length = 0;

        player.run();
        await vi.advanceTimersByTimeAsync(DELAY * 4);

        expect(advanced.length).toBeGreaterThan(0);
      });
    });

    it('does not throw when onAdvance is omitted', async () => {
      await withScope(async () => {
        const { player } = setup(10);

        expect(() => player.run()).not.toThrow();
        await vi.advanceTimersByTimeAsync(DELAY * 20);
        expect(player.status.value).toBe('done');
      });
    });
  });
});
