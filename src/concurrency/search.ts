// Searching the space of interleavings.
//
// The number of ways to interleave threads of length l1..lk is the multinomial
// coefficient (l1+…+lk)! / (l1!·…·lk!), and it grows viciously: 2 threads of 3
// instructions is 20, but 5 threads of 4 is over 300 billion. So there are two
// strategies, and which one runs is decided by the count itself rather than by
// a per-scenario flag that could drift out of date.
//
// Both v1 scenarios sit far below the threshold, so in practice v1 only ever
// takes the exhaustive path — the sampling path exists, is unit-tested against
// a lowered threshold, and is what stops the domain from being a dead end when
// a bigger scenario is eventually added.
//
// The mode is always reported, never inferred by the caller. "We checked all
// 20" and "we checked 2,000 of 300 billion" are very different claims and the
// UI has to be able to tell the truth about which one it is making.

import { createRng } from '@/utils/rng';
import type { Scenario } from './types';
import { threadLengths } from './types';
import { evaluateSchedule } from './execute';
import type { ScheduleOutcome } from './execute';

/** Below this many possible interleavings, check every one. */
export const EXHAUSTIVE_THRESHOLD = 5_000;

/** How many random interleavings to draw when exhaustive search is off the table. */
export const SAMPLE_COUNT = 2_000;

export type SearchMode = 'exhaustive' | 'sampled';

export interface SearchResult {
  mode: SearchMode;
  /**
   * Total possible interleavings. `Infinity` when the exact value exceeds a
   * double's integer range — reported honestly rather than as a wrong number.
   */
  totalCount: number;
  /** How many distinct schedules were actually executed. */
  checkedCount: number;
  outcomes: ScheduleOutcome[];
  violatingCount: number;
}

/**
 * Exact multinomial coefficient, or `Infinity` if it cannot be represented
 * exactly.
 *
 * Computed as a product of binomials with an overflow check at each step
 * rather than via factorials, which would overflow for inputs whose *answer*
 * still fits comfortably.
 */
export function interleavingCount(lengths: readonly number[]): number {
  let remaining = lengths.reduce((sum, length) => sum + length, 0);
  let total = 1;

  for (const length of lengths) {
    // C(remaining, length), built multiplicatively so intermediate values stay
    // as small as possible.
    let binomial = 1;
    for (let i = 1; i <= length; i++) {
      binomial = (binomial * (remaining - length + i)) / i;
    }
    remaining -= length;

    total *= binomial;
    if (!Number.isFinite(total) || total > Number.MAX_SAFE_INTEGER) return Infinity;
  }

  // The multiplicative binomial is exact for these magnitudes but rounds in
  // the general case, so snap to the integer it is meant to be.
  return Math.round(total);
}

/** Every legal interleaving, via backtracking over "whose turn is next". */
export function enumerateSchedules(lengths: readonly number[]): number[][] {
  const total = lengths.reduce((sum, length) => sum + length, 0);
  const out: number[][] = [];
  const progress = lengths.map(() => 0);
  const current: number[] = [];

  function recurse() {
    if (current.length === total) {
      out.push([...current]);
      return;
    }
    for (let threadId = 0; threadId < lengths.length; threadId++) {
      if (progress[threadId] >= lengths[threadId]) continue;
      progress[threadId] += 1;
      current.push(threadId);
      recurse();
      current.pop();
      progress[threadId] -= 1;
    }
  }

  recurse();
  return out;
}

/**
 * One interleaving drawn uniformly at random.
 *
 * The subtlety: picking uniformly among *threads that still have work* is NOT
 * uniform over interleavings — it over-weights schedules that alternate. Each
 * thread has to be weighted by how many instructions it has left, which is
 * what building a pool with one entry per remaining instruction achieves.
 */
function sampleSchedule(lengths: readonly number[], rng: ReturnType<typeof createRng>): number[] {
  const remaining = [...lengths];
  const total = lengths.reduce((sum, length) => sum + length, 0);
  const schedule: number[] = [];

  for (let step = 0; step < total; step++) {
    const pool: number[] = [];
    for (let threadId = 0; threadId < remaining.length; threadId++) {
      for (let i = 0; i < remaining[threadId]; i++) pool.push(threadId);
    }
    const chosen = rng.pick(pool);
    if (chosen === undefined) break;
    remaining[chosen] -= 1;
    schedule.push(chosen);
  }

  return schedule;
}

export interface SearchOptions {
  seed: number;
  /** Overridable so tests can exercise the sampling path on a tiny scenario. */
  threshold?: number;
  sampleCount?: number;
}

export function searchSchedules(scenario: Scenario, options: SearchOptions): SearchResult {
  const lengths = threadLengths(scenario);
  const threshold = options.threshold ?? EXHAUSTIVE_THRESHOLD;
  const sampleCount = options.sampleCount ?? SAMPLE_COUNT;
  const totalCount = interleavingCount(lengths);

  const schedules =
    totalCount < threshold ? enumerateSchedules(lengths) : sampleDistinct(lengths, options.seed, sampleCount);

  const mode: SearchMode = totalCount < threshold ? 'exhaustive' : 'sampled';
  const outcomes = schedules.map((schedule) => evaluateSchedule(scenario, schedule));

  return {
    mode,
    totalCount,
    checkedCount: outcomes.length,
    outcomes,
    violatingCount: outcomes.filter((outcome) => outcome.violates).length,
  };
}

/**
 * `sampleCount` draws, deduplicated.
 *
 * Deduplicating matters for the honesty of the report: without it, "checked
 * 2,000" would count the same schedule repeatedly and overstate the coverage.
 */
function sampleDistinct(lengths: readonly number[], seed: number, sampleCount: number): number[][] {
  // Fresh Rng per search, so the same seed always reproduces the same sample —
  // the same rule every other domain follows for its dataset.
  const rng = createRng(seed);
  const seen = new Set<string>();
  const out: number[][] = [];

  for (let draw = 0; draw < sampleCount; draw++) {
    const schedule = sampleSchedule(lengths, rng);
    const key = schedule.join(',');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(schedule);
  }

  return out;
}
