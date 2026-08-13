// Running one schedule.
//
// A schedule is just a list of thread ids: `[0, 1, 0, 1, 0, 1]` means "T0's
// next instruction, then T1's next, then T0's next…". Replaying one is
// completely deterministic — there is no randomness left by this point, since
// the interleaving *is* the choice that was being made.
//
// The generator here is the single execution path in the domain. The search
// layer evaluates candidate schedules by draining it, and playback drives the
// same function through `useStepPlayer`. That is a deliberate structural
// choice: with two implementations, a search could report a violation the
// player then failed to show, and there would be no way to tell which one was
// lying.

import type { ConcurrencyStep, ThreadState } from '@/types';
import type { ExecState, Scenario } from './types';
import { threadLengths } from './types';

/** Deep-enough copy for a snapshot: nothing below `locals` is ever an object. */
function snapshotThreads(threads: readonly ThreadState[]): ThreadState[] {
  return threads.map((thread) => ({
    id: thread.id,
    pc: thread.pc,
    status: thread.status,
    locals: { ...thread.locals },
  }));
}

function allFinished(state: ExecState, lengths: readonly number[]): boolean {
  return state.threads.every((thread, index) => thread.pc >= lengths[index]);
}

/**
 * True if `schedule` is a legal interleaving of `scenario` — every thread
 * stepped exactly as many times as it has instructions, and never more.
 *
 * Needed because a schedule can arrive from a URL, where it is just text a
 * stranger can edit.
 */
export function isValidSchedule(scenario: Scenario, schedule: readonly number[]): boolean {
  const lengths = threadLengths(scenario);
  const counts = lengths.map(() => 0);

  for (const threadId of schedule) {
    if (!Number.isInteger(threadId) || threadId < 0 || threadId >= lengths.length) return false;
    counts[threadId] += 1;
    if (counts[threadId] > lengths[threadId]) return false;
  }

  return counts.every((count, index) => count === lengths[index]);
}

/**
 * Replay a schedule, yielding one snapshot per instruction.
 *
 * `violated` is evaluated after every single instruction rather than once at
 * the end, which is what lets the UI point at the exact step where a run went
 * wrong instead of only reporting that it did.
 */
export function* runSchedule(
  scenario: Scenario,
  schedule: readonly number[],
): Generator<ConcurrencyStep, void, undefined> {
  const lengths = threadLengths(scenario);
  const state = scenario.createState();

  for (let index = 0; index < schedule.length; index++) {
    const threadId = schedule[index];
    const thread = state.threads[threadId];
    const instruction = scenario.threads[threadId].instructions[thread.pc];

    // A malformed schedule that asks a finished thread to step again is
    // skipped rather than crashing: `isValidSchedule` is the gate, and this is
    // the belt to its braces.
    if (!instruction) continue;

    instruction.exec(state, threadId);
    thread.pc += 1;
    if (thread.pc >= lengths[threadId]) thread.status = 'done';

    const done = allFinished(state, lengths);

    yield {
      threads: snapshotThreads(state.threads),
      sharedMem: { ...state.shared },
      lockOwners: { ...state.locks },
      lastAction: { threadId, instruction: instruction.label },
      violated: !scenario.invariant.holds(state, done),
      done,
    };
  }
}

export interface ScheduleOutcome {
  schedule: number[];
  /** True if the invariant was broken at any point during the run. */
  violates: boolean;
  /** 0-based index of the first step where it broke; -1 when it never did. */
  firstViolationIndex: number;
}

/** Drain `runSchedule` for its verdict, discarding the snapshots. */
export function evaluateSchedule(
  scenario: Scenario,
  schedule: readonly number[],
): ScheduleOutcome {
  let firstViolationIndex = -1;
  let index = 0;

  for (const step of runSchedule(scenario, schedule)) {
    if (step.violated && firstViolationIndex === -1) firstViolationIndex = index;
    index += 1;
  }

  return {
    schedule: [...schedule],
    violates: firstViolationIndex !== -1,
    firstViolationIndex,
  };
}
