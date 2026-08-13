import type { Scenario } from '../types';

/**
 * Two threads each doing `counter = counter + 1`, which is three machine steps,
 * not one: read the shared value into a register, add one, write it back.
 *
 * The bug is the classic lost update. If both threads read before either
 * writes, they both compute 1 from the same 0, both store 1, and one increment
 * silently disappears. Only the two fully-sequential orderings — one thread
 * completely finishing before the other starts — give the answer everybody
 * expects.
 *
 * Chosen as a v1 scenario because it is the smallest thing that exhibits a
 * real race: 6 instructions total, 20 possible interleavings, all of which can
 * be checked exhaustively in well under a millisecond.
 */
export const racyCounter: Scenario = {
  key: 'racy-counter',
  name: 'Racy counter',
  description: 'Two threads each run counter = counter + 1, one machine step at a time.',
  bug: 'If both threads read before either writes, both compute the same value and one increment is lost.',

  threads: [
    {
      name: 'T0',
      instructions: [
        {
          label: 'local = counter',
          exec: (state, id) => {
            state.threads[id].locals.local = state.shared.counter;
          },
        },
        {
          label: 'local = local + 1',
          exec: (state, id) => {
            state.threads[id].locals.local += 1;
          },
        },
        {
          label: 'counter = local',
          exec: (state, id) => {
            state.shared.counter = state.threads[id].locals.local;
          },
        },
      ],
    },
    {
      name: 'T1',
      instructions: [
        {
          label: 'local = counter',
          exec: (state, id) => {
            state.threads[id].locals.local = state.shared.counter;
          },
        },
        {
          label: 'local = local + 1',
          exec: (state, id) => {
            state.threads[id].locals.local += 1;
          },
        },
        {
          label: 'counter = local',
          exec: (state, id) => {
            state.shared.counter = state.threads[id].locals.local;
          },
        },
      ],
    },
  ],

  invariant: {
    label: 'counter === 2 once both threads finish',
    // Checked only at the end, and that is not a shortcut: mid-run the counter
    // is *supposed* to be 0 or 1, so an every-step check would flag correct
    // executions. A lost update is only observable once everyone has written.
    holds: (state, allDone) => !allDone || state.shared.counter === 2,
  },

  createState: () => ({
    shared: { counter: 0 },
    locks: {},
    threads: [
      { id: 0, pc: 0, status: 'ready', locals: { local: 0 } },
      { id: 1, pc: 0, status: 'ready', locals: { local: 0 } },
    ],
  }),
};
