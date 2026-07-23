// Array-backed binary heap — insert/extract as single, animatable operations.
//
// The array IS the tree: node i's children live at 2i+1 / 2i+2, its parent at
// (i-1)>>1. `isMinHeap` flips comparison direction so the same sift routines
// serve both a min-heap and a max-heap.

function higherPriority(a, b, isMinHeap) {
  return isMinHeap ? a < b : a > b;
}

/**
 * Push `value` onto the end and sift it up until the heap property holds.
 *
 * @param {number[]} heapArray
 * @param {number} value
 * @param {boolean} isMinHeap
 * @yields {{ heap: number[], comparing: number[], swapping: number[], done: boolean }}
 */
export function* insertHeap(heapArray, value, isMinHeap) {
  const a = [...heapArray, value];
  let i = a.length - 1;

  while (i > 0) {
    const parent = (i - 1) >> 1;
    yield { heap: [...a], comparing: [i, parent], swapping: [], done: false };

    if (higherPriority(a[i], a[parent], isMinHeap)) {
      [a[i], a[parent]] = [a[parent], a[i]];
      yield { heap: [...a], comparing: [], swapping: [i, parent], done: false };
      i = parent;
    } else {
      break;
    }
  }

  yield { heap: [...a], comparing: [], swapping: [], done: true };
}

/**
 * Remove and return the root (min or max): move the last element to the
 * root, then sift it down. Yields a single terminal snapshot on an empty
 * heap instead of throwing.
 *
 * @param {number[]} heapArray
 * @param {boolean} isMinHeap
 * @yields {{ heap: number[], comparing: number[], swapping: number[], done: boolean, extracted?: number }}
 */
export function* extractRootHeap(heapArray, isMinHeap) {
  if (heapArray.length === 0) {
    yield { heap: [], comparing: [], swapping: [], done: true, extracted: null };
    return;
  }

  const a = [...heapArray];
  const extracted = a[0];
  const last = a.pop();

  if (a.length === 0) {
    yield { heap: [], comparing: [], swapping: [], done: true, extracted };
    return;
  }

  a[0] = last;
  let i = 0;
  const n = a.length;

  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let best = i;

    if (left < n) {
      yield { heap: [...a], comparing: [best, left], swapping: [], done: false };
      if (higherPriority(a[left], a[best], isMinHeap)) best = left;
    }
    if (right < n) {
      yield { heap: [...a], comparing: [best, right], swapping: [], done: false };
      if (higherPriority(a[right], a[best], isMinHeap)) best = right;
    }

    if (best === i) break;

    [a[i], a[best]] = [a[best], a[i]];
    yield { heap: [...a], comparing: [], swapping: [i, best], done: false };
    i = best;
  }

  yield { heap: [...a], comparing: [], swapping: [], done: true, extracted };
}
