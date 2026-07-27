import type { AlgorithmFn, AlgorithmMeta, SearchStep } from '@/types';
import { linearSearch } from './linearSearch';
import { binarySearch } from './binarySearch';

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
} satisfies Record<string, SearchAlgorithm>;

/** Literal union of the registry keys: 'linear' | 'binary' */
export type SearchAlgoKey = keyof typeof algorithms;
