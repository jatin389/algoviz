import { bubbleSort } from './bubbleSort.js';
import { selectionSort } from './selectionSort.js';
import { insertionSort } from './insertionSort.js';
import { mergeSort } from './mergeSort.js';
import { quickSort } from './quickSort.js';
import { heapSort } from './heapSort.js';
import { shellSort } from './shellSort.js';
import { combSort } from './combSort.js';
import { countingSort } from './countingSort.js';
import { radixSort } from './radixSort.js';

// Central registry mapping a stable key -> algorithm metadata + generator.
// Rendering code depends only on this contract, never on individual files.
export const algorithms = {
  bubble: {
    key: 'bubble',
    name: 'Bubble Sort',
    generator: bubbleSort,
    description:
      'Repeatedly compares adjacent elements and swaps them if out of order, letting the largest values bubble to the end each pass.',
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    stable: true,
  },
  selection: {
    key: 'selection',
    name: 'Selection Sort',
    generator: selectionSort,
    description:
      'Scans the unsorted region for the minimum element and swaps it into place, growing a sorted prefix from the front.',
    complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    stable: false,
  },
  insertion: {
    key: 'insertion',
    name: 'Insertion Sort',
    generator: insertionSort,
    description:
      'Builds the sorted array one item at a time by shifting each new element left until it sits in the correct spot.',
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    stable: true,
  },
  merge: {
    key: 'merge',
    name: 'Merge Sort',
    generator: mergeSort,
    description:
      'Divides the array in half recursively, sorts each half, then merges the sorted halves back together. Consistent O(n log n).',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    stable: true,
  },
  quick: {
    key: 'quick',
    name: 'Quick Sort',
    generator: quickSort,
    description:
      'Partitions the array around a pivot so smaller values sit left and larger right, then recurses into each side. Fast in practice.',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
    stable: false,
  },
  heap: {
    key: 'heap',
    name: 'Heap Sort',
    generator: heapSort,
    description:
      'Builds a max-heap, then repeatedly moves the largest element to the end and re-heapifies the shrinking heap.',
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' },
    stable: false,
  },
  shell: {
    key: 'shell',
    name: 'Shell Sort',
    generator: shellSort,
    description:
      'Generalizes insertion sort by comparing and swapping elements far apart first, shrinking the gap each pass until a final gap-1 pass leaves the array sorted.',
    complexity: { best: 'O(n log n)', average: 'O(n^1.5)', worst: 'O(n²)', space: 'O(1)' },
    stable: false,
  },
  comb: {
    key: 'comb',
    name: 'Comb Sort',
    generator: combSort,
    description:
      'Improves bubble sort by comparing elements separated by a shrinking gap (÷1.3 each pass) instead of only adjacent ones, clearing small trailing values much faster.',
    complexity: { best: 'O(n log n)', average: 'O(n²/2ᵖ)', worst: 'O(n²)', space: 'O(1)' },
    stable: false,
  },
  counting: {
    key: 'counting',
    name: 'Counting Sort',
    generator: countingSort,
    description:
      'Counts how many times each value occurs, turns those counts into placement offsets, and drops every element straight into its final slot — no comparisons needed.',
    complexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)', space: 'O(n + k)' },
    stable: true,
  },
  radix: {
    key: 'radix',
    name: 'Radix Sort',
    generator: radixSort,
    description:
      'Sorts integers one decimal digit at a time, least significant first, using a stable counting sort per digit until every digit position has been processed.',
    complexity: {
      best: 'O(d·(n + b))',
      average: 'O(d·(n + b))',
      worst: 'O(d·(n + b))',
      space: 'O(n + b)',
    },
    stable: true,
  },
};

// Ordered list for iterating in the UI (buttons, dropdowns).
export const algorithmList = Object.values(algorithms);
