// Contracts for the concurrency domain.
//
// A scenario is a set of threads, each holding a fixed list of instructions,
// plus an invariant that should hold as the threads interleave. The domain's
// whole value comes from the fact that the *instructions* are fixed while
// their *interleaving* is not: every schedule runs the same code, and only
// the ordering decides whether the invariant survives.
//
// Instructions mutate an `ExecState` in place. That is deliberate — the search
// layer runs thousands of schedules, and copying the world per instruction
// would dominate the cost. Isolation between schedules comes from building a
// fresh `ExecState` per run (see `createState`), never from immutability here.

import type { ThreadState } from '@/types';

export interface ExecState {
  /** Shared memory: the thing threads race over. */
  shared: Record<string, number>;
  /** Lock name -> owning thread id, or null when free. */
  locks: Record<string, number | null>;
  threads: ThreadState[];
}

export interface Instruction {
  /**
   * Rendered verbatim in the thread lane, so it reads as a line of code
   * (`counter = local`) rather than an opcode name.
   */
  label: string;
  /** Mutates `state` in place on behalf of `threadId`. */
  exec: (state: ExecState, threadId: number) => void;
}

export interface Invariant {
  /** Shown in the UI as the property being checked, e.g. `counter === 2`. */
  label: string;
  /**
   * Called after **every** instruction, with `allDone` true only once every
   * thread has finished.
   *
   * Both timings matter and the two v1 scenarios use one each: a lost-update
   * bug is only meaningful once everyone has finished writing (`allDone`),
   * while a mutual-exclusion bug is meaningful at every instant and would be
   * invisible if only checked at the end — by then both threads have released.
   */
  holds: (state: ExecState, allDone: boolean) => boolean;
}

export interface ThreadProgram {
  /** Lane label, e.g. `T0`. */
  name: string;
  instructions: Instruction[];
}

export interface Scenario {
  key: string;
  name: string;
  /** One sentence on what the threads are trying to do. */
  description: string;
  /** What goes wrong, in plain terms — shown alongside a violating schedule. */
  bug: string;
  threads: ThreadProgram[];
  invariant: Invariant;
  /** Fresh initial world. Called once per schedule run, so runs never share state. */
  createState: () => ExecState;
}

/** Instruction counts per thread — the only thing the interleaving math needs. */
export function threadLengths(scenario: Scenario): number[] {
  return scenario.threads.map((thread) => thread.instructions.length);
}

/** Total instructions across all threads, i.e. the length of any schedule. */
export function scheduleLength(scenario: Scenario): number {
  return threadLengths(scenario).reduce((sum, len) => sum + len, 0);
}
