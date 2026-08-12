// The contract between user-authored code and the app.
//
// A sandbox snippet is an ordinary `function* run(input)` that yields the same
// `SortStep` shape every built-in sorting algorithm yields. That choice is the
// whole reason this feature is cheap: the snapshot already has a renderer
// (`BarChart.vue`) and a player (`useStepPlayer`), so the only genuinely new
// thing is getting the snapshots out of an untrusted realm safely.

/** Hard ceiling on how many steps a snippet may produce before it is cut off. */
export const MAX_SANDBOX_STEPS = 20_000;

/** Wall-clock ceiling inside the worker, independent of the step count. */
export const MAX_SANDBOX_MS = 3_000;

/**
 * Parent-side watchdog. If no message arrives from the runner for this long,
 * the parent tears the iframe down regardless of what the snippet is doing.
 *
 * This is the layer that survives a snippet which never yields at all: the
 * worker's own step/time budgets are checked between yields, so an
 * infinite loop that never reaches a `yield` never gets to check them. Only
 * an external observer can catch that, which is why this exists and why it
 * is generous enough not to fire on a merely slow-but-progressing run.
 */
export const SANDBOX_SILENCE_MS = 5_000;

/** Steps are posted in batches; one message per step is needlessly slow. */
export const SANDBOX_BATCH_SIZE = 250;

/** Renderer protection: the bar chart draws one element per entry. */
export const MAX_SANDBOX_ARRAY_LENGTH = 500;

/** Dataset size range offered by the UI. */
export const SANDBOX_SIZE_MIN = 5;
export const SANDBOX_SIZE_MAX = 60;
export const SANDBOX_DEFAULT_SIZE = 22;

export const SANDBOX_DEFAULT_SPEED = 60;

export const STARTER_SOURCE = `// Write any sorting algorithm you like.
// Yield a snapshot whenever you want a frame drawn.
//
//   array       the values, as they stand right now
//   comparing   indices being compared  (amber)
//   swapping    indices being written   (rose)
//   sorted      indices in final place  (emerald)
//   done        true on the very last snapshot

function* run(input) {
  const array = [...input];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      comparisons++;
      yield {
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: sortedTail(array.length, i),
        comparisons,
        swaps,
        done: false,
      };

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
        yield {
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: sortedTail(array.length, i),
          comparisons,
          swaps,
          done: false,
        };
      }
    }
  }

  yield {
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: array.map((_, i) => i),
    comparisons,
    swaps,
    done: true,
  };
}

// Indices already parked at the end of the array after \`passes\` passes.
function sortedTail(length, passes) {
  const out = [];
  for (let i = length - passes; i < length; i++) out.push(i);
  return out;
}
`;
