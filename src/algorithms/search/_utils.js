// Shared step-snapshot helpers used by every search generator.
//
// Mirrors the sorting `_utils.js` pattern: each generator yields a plain,
// serializable object describing the *state of the world* at one step. The UI
// only ever reads these fields, never the algorithm internals.
//
// Snapshot shape:
//   {
//     array:       number[]       // a COPY of the array at this instant
//     low:         number | null  // current inclusive lower search bound
//     high:        number | null  // current inclusive upper search bound
//     mid:         number | null  // midpoint index under consideration (binary only)
//     checking:    number | null  // index currently being compared to the target
//     target:      number         // the value being searched for
//     foundIndex:  number | null  // set once the target is located, else null
//     comparisons: number         // running comparison counter
//     done:        boolean        // true only on the terminal snapshot
//   }

/**
 * Build an intermediate snapshot. The array is copied so downstream consumers
 * can hold onto a step without it mutating underneath them.
 */
export const snap = (array, low, high, mid, checking, target, comparisons) => ({
  array: [...array],
  low,
  high,
  mid,
  checking,
  target,
  foundIndex: null,
  comparisons,
  done: false,
});

/**
 * Build the terminal snapshot. `foundIndex` stays null when the target was
 * never located, so the UI can distinguish "found" from "exhausted" outcomes.
 */
export const done = (array, target, foundIndex, comparisons) => ({
  array: [...array],
  low: null,
  high: null,
  mid: null,
  checking: null,
  target,
  foundIndex,
  comparisons,
  done: true,
});
