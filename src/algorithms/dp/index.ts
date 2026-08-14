import type { AnyDpAlgorithm } from './types';
import { spec as fibSpec } from './fib';
import { spec as coinChangeSpec } from './coinChange';
import { spec as lisSpec } from './lis';
import { spec as knapsackSpec } from './knapsack';
import { spec as subsetSumSpec } from './subsetSum';
import { spec as lcsSpec } from './lcs';
import { spec as editDistanceSpec } from './editDistance';
import { spec as matrixChainSpec } from './matrixChain';

// Central registry mapping a stable key -> algorithm metadata + DP spec.
// Rendering code depends only on this contract, never on individual files.
//
// `satisfies` rather than a `: Record<string, ...>` annotation: the annotation
// would widen `keyof typeof algorithms` to `string`, and the whole point of the
// property names is that they *are* the algorithm keys. (Same reasoning as
// `search/index.ts`; see the comment there.)
//
// The metadata is spread over each spec rather than the spec being nested under
// a field, because `AvAlgorithmSelector` takes the registry record directly and
// reads `name`/`description`/`complexity` off each entry — a nested `spec` would
// mean either a second shape for the selector to understand or a mapping step
// in every view that uses one.
export const algorithms = {
  fib: {
    ...fibSpec,
    name: 'Fibonacci',
    description:
      'Fills one row left to right, each cell the sum of the two before it. The smallest example of the whole idea: 40 cells replace 331 million recursive calls.',
    complexity: { time: 'O(n)', space: 'O(n)' },
  },
  'coin-change': {
    ...coinChangeSpec,
    name: 'Coin Change',
    description:
      'Fewest coins that make each amount from 0 upwards, each cell taking the best of one more coin on top of a smaller amount. Amounts no combination can reach stay at infinity.',
    complexity: { time: 'O(amount × coins)', space: 'O(amount)' },
  },
  lis: {
    ...lisSpec,
    name: 'Longest Increasing Subsequence',
    description:
      'Each cell holds the longest increasing run ending at that element, extending the best smaller element to its left. The answer is the largest cell, not the last one.',
    complexity: { time: 'O(n²)', space: 'O(n)' },
  },
  knapsack: {
    ...knapsackSpec,
    name: '0/1 Knapsack',
    description:
      'One row per item, one column per capacity. Each cell chooses between skipping the item and taking it, and the traceback reads those choices straight back out of the table.',
    complexity: { time: 'O(n × capacity)', space: 'O(n × capacity)' },
  },
  'subset-sum': {
    ...subsetSumSpec,
    name: 'Subset Sum',
    description:
      'Knapsack’s table answering a yes/no question instead: can any subset hit the target exactly? Same shape, same traversal, OR in place of max.',
    complexity: { time: 'O(n × target)', space: 'O(n × target)' },
  },
  lcs: {
    ...lcsSpec,
    name: 'Longest Common Subsequence',
    description:
      'A grid of two strings. Matching characters extend the diagonal by one; mismatches take the better of dropping a character from either side.',
    complexity: { time: 'O(m × n)', space: 'O(m × n)' },
  },
  'edit-distance': {
    ...editDistanceSpec,
    name: 'Edit Distance',
    description:
      'Fewest insert/delete/substitute operations turning one string into the other. Same grid as LCS, but a mismatch forks three ways instead of two.',
    complexity: { time: 'O(m × n)', space: 'O(m × n)' },
  },
  'matrix-chain': {
    ...matrixChainSpec,
    name: 'Matrix Chain',
    description:
      'Where to put the parentheses so a chain of matrix products costs the least. Fills along diagonals rather than row by row, because a cell needs every shorter sub-chain first.',
    complexity: { time: 'O(n³)', space: 'O(n²)' },
  },
} satisfies Record<string, AnyDpAlgorithm>;

/** Literal union of the registry keys. */
export type DpAlgoKey = keyof typeof algorithms;

/** The registry's own declaration order, which is the order the buttons appear in. */
export const dpAlgoKeys = Object.keys(algorithms) as DpAlgoKey[];

export * from './types';
export { MAX_TABLE_CELLS, DP_MAX_STEPS, bindSpec, validateInput, fmt } from './_utils';
export type { BoundDpSpec } from './_utils';
