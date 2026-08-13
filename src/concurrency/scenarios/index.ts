import type { Scenario } from '../types';
import { racyCounter } from './racyCounter';
import { mutexViolation } from './mutexViolation';

/**
 * The scenario registry, in the same plain-object-literal style as every other
 * domain's algorithm registry (`@/algorithms/index.ts` and friends).
 *
 * v1 ships exactly two, and the pairing is deliberate rather than incidental:
 * one fails on its final value and one fails momentarily mid-run, which is
 * what proves the interleaving explorer generalises across invariant kinds
 * instead of being wired to a single bug.
 */
export const scenarios = {
  'racy-counter': racyCounter,
  'mutex-violation': mutexViolation,
} satisfies Record<string, Scenario>;

export type ScenarioKey = keyof typeof scenarios;

export const DEFAULT_SCENARIO: ScenarioKey = 'racy-counter';

export { racyCounter, mutexViolation };
