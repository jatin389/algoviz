import type { Scenario } from '../types';

/**
 * A hand-rolled lock that checks whether it is free and then takes it — as two
 * separate instructions.
 *
 * The bug is time-of-check to time-of-use. A thread's `acquire` acts on what it
 * saw during `check`, not on what is true now, so if both threads check while
 * the lock is free, both believe they may enter and both do. Two threads end up
 * in the critical section at once, which is exactly what a mutex exists to
 * prevent.
 *
 * Paired with the racy counter for v1 because it fails in a structurally
 * different way. The counter produces a wrong *final value*; this produces a
 * momentarily wrong *state* that has healed by the time both threads finish.
 * Checking it only at the end would find nothing wrong — which is precisely
 * why the invariant contract supports both timings.
 */
export const mutexViolation: Scenario = {
  key: 'mutex-violation',
  name: 'Mutex violation',
  description: 'Two threads guard a critical section with a check-then-acquire lock.',
  bug: 'Checking the lock and taking it are separate steps, so both threads can see it free and both enter.',

  threads: [0, 1].map((_, index) => ({
    name: `T${index}`,
    instructions: [
      {
        label: 'saw = (lock == free)',
        exec: (state, id) => {
          state.threads[id].locals.saw = state.locks.L === null ? 1 : 0;
        },
      },
      {
        label: 'if saw: take lock',
        // Acts on the stale observation rather than re-reading. Re-reading here
        // would make the lock correct and delete the bug.
        exec: (state, id) => {
          if (state.threads[id].locals.saw === 1) {
            state.locks.L = id;
            state.threads[id].status = 'critical';
          }
        },
      },
      {
        label: 'critical section',
        exec: (state, id) => {
          // Counts entries so a violating run leaves visible evidence: two
          // threads inside means this runs twice before either releases.
          state.shared.entered += 1;
          void id;
        },
      },
      {
        label: 'release lock',
        exec: (state, id) => {
          if (state.threads[id].status === 'critical') {
            state.threads[id].status = 'ready';
            // Only the recorded owner clears it, so the loser of the race does
            // not helpfully un-break the state on its way out.
            if (state.locks.L === id) state.locks.L = null;
          }
        },
      },
    ],
  })),

  invariant: {
    label: 'at most one thread in the critical section',
    holds: (state) => state.threads.filter((thread) => thread.status === 'critical').length <= 1,
  },

  createState: () => ({
    shared: { entered: 0 },
    locks: { L: null },
    threads: [
      { id: 0, pc: 0, status: 'ready', locals: { saw: 0 } },
      { id: 1, pc: 0, status: 'ready', locals: { saw: 0 } },
    ],
  }),
};
