import type { AlgorithmFn, AlgorithmMeta, SearchStep } from '@/types';
import { linearSearch } from './linearSearch';
import { binarySearch } from './binarySearch';
import { jumpSearch } from './jumpSearch';
import { interpolationSearch } from './interpolationSearch';
import { exponentialSearch } from './exponentialSearch';

export type SearchFn = AlgorithmFn<SearchStep, [number[], number]>;
export type SearchAlgorithm = AlgorithmMeta<SearchFn>;

// Central registry mapping a stable key -> algorithm metadata + generator.
// Rendering code depends only on this contract, never on individual files.
//
// `satisfies` rather than a `: Record<string, ...>` annotation: the annotation
// would widen `keyof typeof algorithms` to `string`, and the whole point of
// the property names is that they *are* the algorithm keys.
export const algorithms = {
  linear: {
    name: 'Linear Search',
    generator: linearSearch,
    description:
      'Scans the array from left to right, comparing each element to the target until a match is found or every element has been checked.',
    complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
  },
  binary: {
    name: 'Binary Search',
    generator: binarySearch,
    description:
      'Repeatedly compares the target to the middle element of a sorted array and discards the half that cannot contain it, halving the search range each step.',
    complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
  },
  jump: {
    name: 'Jump Search',
    generator: jumpSearch,
    description:
      'Advances through a sorted array in fixed-size blocks of about √n, testing only the last element of each block, then falls back to a linear scan of the block where the target must lie.',
    complexity: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)', space: 'O(1)' },
  },
  interpolation: {
    name: 'Interpolation Search',
    generator: interpolationSearch,
    description:
      'Estimates where the target should be by linearly interpolating between the values at the low and high ends of the search range, rather than always probing the midpoint like binary search.',
    complexity: { best: 'O(1)', average: 'O(log log n)', worst: 'O(n)', space: 'O(1)' },
  },
  exponential: {
    name: 'Exponential Search',
    generator: exponentialSearch,
    description:
      'Doubles a bound (1, 2, 4, 8, ...) until it overshoots the target, then binary searches within the range that doubling identified.',
    complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
  },
} satisfies Record<string, SearchAlgorithm>;

/** Literal union of the registry keys: 'linear' | 'binary' | 'jump' | 'interpolation' | 'exponential' */
export type SearchAlgoKey = keyof typeof algorithms;
