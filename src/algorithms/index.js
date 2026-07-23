import { bubbleSort } from './bubbleSort.js';
import { selectionSort } from './selectionSort.js';
import { insertionSort } from './insertionSort.js';
import { mergeSort } from './mergeSort.js';
import { quickSort } from './quickSort.js';
import { heapSort } from './heapSort.js';

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
};

// Ordered list for iterating in the UI (buttons, dropdowns).
export const algorithmList = Object.values(algorithms);
