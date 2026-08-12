import { describe, it, expect } from 'vitest';
import { scenarios, racyCounter, mutexViolation } from './scenarios';
import { threadLengths, scheduleLength } from './types';
import {
  interleavingCount,
  enumerateSchedules,
  searchSchedules,
  EXHAUSTIVE_THRESHOLD,
} from './search';
import { runSchedule, evaluateSchedule, isValidSchedule } from './execute';

describe('interleavingCount', () => {
  it('matches the multinomial coefficient by hand', () => {
    // C(6,3) — choose which 3 of the 6 slots belong to T0.
    expect(interleavingCount([3, 3])).toBe(20);
    // 8! / (4!·4!)
    expect(interleavingCount([4, 4])).toBe(70);
    expect(interleavingCount([1, 1])).toBe(2);
    expect(interleavingCount([2, 2, 2])).toBe(90);
  });

  it('handles degenerate shapes', () => {
    expect(interleavingCount([5])).toBe(1);
    expect(interleavingCount([])).toBe(1);
    expect(interleavingCount([0, 3])).toBe(1);
  });

  it('agrees with brute-force enumeration on small inputs', () => {
    for (const lengths of [
      [1, 1],
      [2, 1],
      [2, 2],
      [3, 2],
      [2, 2, 1],
    ]) {
      expect(enumerateSchedules(lengths).length).toBe(interleavingCount(lengths));
    }
  });

  it('reports Infinity rather than a wrong number when it overflows', () => {
    // Far past a double's exact-integer range; a silently rounded value here
    // would make the "checked all N" claim a lie.
    expect(interleavingCount([40, 40, 40, 40])).toBe(Infinity);
  });

  it('is exact and integral for a large-but-representable case', () => {
    const count = interleavingCount([5, 5, 5]);
    expect(Number.isInteger(count)).toBe(true);
    expect(count).toBe(756756);
  });
});

describe('enumerateSchedules', () => {
  it('produces only legal schedules', () => {
    for (const schedule of enumerateSchedules([3, 3])) {
      expect(isValidSchedule(racyCounter, schedule)).toBe(true);
    }
  });

  it('produces no duplicates', () => {
    const all = enumerateSchedules([3, 3]).map((s) => s.join(''));
    expect(new Set(all).size).toBe(all.length);
  });
});

describe('isValidSchedule', () => {
  it('accepts a well-formed schedule', () => {
    expect(isValidSchedule(racyCounter, [0, 0, 0, 1, 1, 1])).toBe(true);
  });

  it('rejects wrong lengths, unknown threads and over-stepping', () => {
    expect(isValidSchedule(racyCounter, [0, 1, 0])).toBe(false); // too short
    expect(isValidSchedule(racyCounter, [0, 0, 0, 0, 1, 1, 1])).toBe(false); // T0 four times
    expect(isValidSchedule(racyCounter, [0, 0, 0, 1, 1, 2])).toBe(false); // no thread 2
    expect(isValidSchedule(racyCounter, [0, 0, 0, 1, 1, -1])).toBe(false);
    expect(isValidSchedule(racyCounter, [0, 0, 0, 1, 1, 1.5])).toBe(false);
  });
});

describe('racy counter', () => {
  it('loses an update whenever both threads read before either writes', () => {
    // Interleaved: both read 0, both compute 1, both store 1.
    const outcome = evaluateSchedule(racyCounter, [0, 1, 0, 1, 0, 1]);
    expect(outcome.violates).toBe(true);

    const steps = [...runSchedule(racyCounter, [0, 1, 0, 1, 0, 1])];
    expect(steps[steps.length - 1].sharedMem.counter).toBe(1);
  });

  it('is correct when one thread runs entirely before the other', () => {
    for (const schedule of [
      [0, 0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 0],
    ]) {
      const outcome = evaluateSchedule(racyCounter, schedule);
      expect(outcome.violates).toBe(false);
      const steps = [...runSchedule(racyCounter, schedule)];
      expect(steps[steps.length - 1].sharedMem.counter).toBe(2);
    }
  });

  it('has exactly 2 safe interleavings out of 20 — the sequential ones', () => {
    const result = searchSchedules(racyCounter, { seed: 1 });
    expect(result.mode).toBe('exhaustive');
    expect(result.totalCount).toBe(20);
    expect(result.checkedCount).toBe(20);
    expect(result.violatingCount).toBe(18);

    // And the two clean ones are precisely the fully-sequential orders.
    const clean = result.outcomes
      .filter((outcome) => !outcome.violates)
      .map((outcome) => outcome.schedule.join(''));
    expect(clean.sort()).toEqual(['000111', '111000']);
  });

  it('only flags the violation on the terminal step', () => {
    // The counter is legitimately 0 or 1 mid-run; flagging that would be wrong.
    const steps = [...runSchedule(racyCounter, [0, 1, 0, 1, 0, 1])];
    expect(steps.slice(0, -1).every((step) => !step.violated)).toBe(true);
    expect(steps[steps.length - 1].violated).toBe(true);
  });
});

describe('mutex violation', () => {
  it('lets both threads in when both check before either acquires', () => {
    // T0 check, T1 check, T0 acquire, T1 acquire -> both inside.
    const schedule = [0, 1, 0, 1, 0, 1, 0, 1];
    const outcome = evaluateSchedule(mutexViolation, schedule);
    expect(outcome.violates).toBe(true);

    const steps = [...runSchedule(mutexViolation, schedule)];
    const breach = steps[outcome.firstViolationIndex];
    expect(breach.threads.filter((t) => t.status === 'critical')).toHaveLength(2);
  });

  it('holds when one thread completes before the other starts', () => {
    expect(evaluateSchedule(mutexViolation, [0, 0, 0, 0, 1, 1, 1, 1]).violates).toBe(false);
  });

  it('detects a breach that has healed by the final step', () => {
    // This is the reason the invariant is checked at every step: by the time
    // both threads have released, the state looks perfectly fine again.
    const schedule = [0, 1, 0, 1, 0, 1, 0, 1];
    const steps = [...runSchedule(mutexViolation, schedule)];
    const last = steps[steps.length - 1];
    expect(last.violated).toBe(false);
    expect(steps.some((step) => step.violated)).toBe(true);
  });

  it('checks all 70 interleavings exhaustively', () => {
    const result = searchSchedules(mutexViolation, { seed: 1 });
    expect(result.mode).toBe('exhaustive');
    expect(result.totalCount).toBe(70);
    expect(result.checkedCount).toBe(70);
    expect(result.violatingCount).toBeGreaterThan(0);
    expect(result.violatingCount).toBeLessThan(70);
  });
});

describe('runSchedule', () => {
  it('yields one snapshot per instruction and marks only the last done', () => {
    const steps = [...runSchedule(racyCounter, [0, 1, 0, 1, 0, 1])];
    expect(steps).toHaveLength(scheduleLength(racyCounter));
    expect(steps[steps.length - 1].done).toBe(true);
    expect(steps.slice(0, -1).every((step) => !step.done)).toBe(true);
  });

  it('snapshots are independent — mutating state later never rewrites history', () => {
    const steps = [...runSchedule(racyCounter, [0, 0, 0, 1, 1, 1])];
    // The player keeps every snapshot on a tape and repaints from it when
    // scrubbing; a shared reference would make earlier steps show later state.
    expect(steps[0].sharedMem.counter).toBe(0);
    expect(steps[steps.length - 1].sharedMem.counter).toBe(2);
    expect(steps[0].threads).not.toBe(steps[1].threads);
  });

  it('reports which thread ran and what it executed', () => {
    const steps = [...runSchedule(racyCounter, [0, 1, 0, 1, 0, 1])];
    expect(steps[0].lastAction).toEqual({ threadId: 0, instruction: 'local = counter' });
    expect(steps[1].lastAction?.threadId).toBe(1);
  });

  it('is deterministic — the same schedule always replays identically', () => {
    const a = [...runSchedule(mutexViolation, [0, 1, 0, 1, 0, 1, 0, 1])];
    const b = [...runSchedule(mutexViolation, [0, 1, 0, 1, 0, 1, 0, 1])];
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it('does not leak state between runs of the same scenario', () => {
    const first = [...runSchedule(racyCounter, [0, 0, 0, 1, 1, 1])];
    const second = [...runSchedule(racyCounter, [0, 0, 0, 1, 1, 1])];
    expect(second[0].sharedMem.counter).toBe(first[0].sharedMem.counter);
    expect(second[second.length - 1].sharedMem.counter).toBe(2);
  });
});

describe('search agrees with playback', () => {
  // The whole design rests on there being one execution path. If the search
  // ever reported a violation the player could not show, the feature would be
  // lying to the user with no way to tell which half was wrong.
  it.each(Object.values(scenarios))('$name: every verdict is reproducible by replay', (scenario) => {
    const result = searchSchedules(scenario, { seed: 7 });
    for (const outcome of result.outcomes) {
      const steps = [...runSchedule(scenario, outcome.schedule)];
      const observed = steps.findIndex((step) => step.violated);
      expect(observed).toBe(outcome.firstViolationIndex);
      expect(observed !== -1).toBe(outcome.violates);
    }
  });
});

describe('sampling path', () => {
  // Both v1 scenarios are exhaustive in production, so the sampling path is
  // exercised here by forcing the threshold down rather than by inventing a
  // scenario big enough to trigger it naturally.
  it('switches to sampling once the count reaches the threshold', () => {
    const result = searchSchedules(racyCounter, { seed: 3, threshold: 10, sampleCount: 50 });
    expect(result.mode).toBe('sampled');
    expect(result.totalCount).toBe(20);
    expect(result.checkedCount).toBeLessThanOrEqual(20);
  });

  it('is reproducible from the seed', () => {
    const options = { seed: 42, threshold: 10, sampleCount: 25 };
    const a = searchSchedules(racyCounter, options);
    const b = searchSchedules(racyCounter, options);
    expect(a.outcomes.map((o) => o.schedule.join(''))).toEqual(
      b.outcomes.map((o) => o.schedule.join('')),
    );
  });

  it('differs between seeds', () => {
    const a = searchSchedules(racyCounter, { seed: 1, threshold: 10, sampleCount: 5 });
    const b = searchSchedules(racyCounter, { seed: 999, threshold: 10, sampleCount: 5 });
    expect(a.outcomes.map((o) => o.schedule.join(''))).not.toEqual(
      b.outcomes.map((o) => o.schedule.join('')),
    );
  });

  it('yields only legal, distinct schedules', () => {
    const result = searchSchedules(racyCounter, { seed: 5, threshold: 10, sampleCount: 200 });
    const keys = result.outcomes.map((o) => o.schedule.join(''));
    expect(new Set(keys).size).toBe(keys.length);
    for (const outcome of result.outcomes) {
      expect(isValidSchedule(racyCounter, outcome.schedule)).toBe(true);
    }
  });

  it('samples uniformly enough to reach every interleaving', () => {
    // Weighting by remaining instructions is what makes the draw uniform over
    // interleavings; picking uniformly among live threads would over-produce
    // alternating schedules and could starve the sequential ones entirely.
    const result = searchSchedules(racyCounter, { seed: 11, threshold: 10, sampleCount: 4000 });
    expect(result.checkedCount).toBe(20);
  });
});

describe('v1 scenarios stay inside the exhaustive budget', () => {
  it.each(Object.values(scenarios))('$name is exhaustively checkable', (scenario) => {
    // The guarantee v1 makes to the user. If a future scenario edit pushed a
    // shipped scenario over the threshold, its report would silently downgrade
    // from "checked all" to "sampled" — this is the tripwire for that.
    expect(interleavingCount(threadLengths(scenario))).toBeLessThan(EXHAUSTIVE_THRESHOLD);
    expect(searchSchedules(scenario, { seed: 1 }).mode).toBe('exhaustive');
  });
});
