import { linearSearch } from './linearSearch.js';
import { binarySearch } from './binarySearch.js';

// Central registry mapping a stable key -> algorithm metadata + generator.
// Rendering code depends only on this contract, never on individual files.
export const algorithms = {
  linear: {
    key: 'linear',
    name: 'Linear Search',
    generator: linearSearch,
    description:
      'Scans the array from left to right, comparing each element to the target until a match is found or every element has been checked.',
    complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
  },
  binary: {
    key: 'binary',
    name: 'Binary Search',
    generator: binarySearch,
    description:
      'Repeatedly compares the target to the middle element of a sorted array and discards the half that cannot contain it, halving the search range each step.',
    complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
  },
};

// Ordered list for iterating in the UI (buttons, dropdowns).
export const algorithmList = Object.values(algorithms);
