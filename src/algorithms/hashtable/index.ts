import type { AlgorithmFn, AlgorithmMeta, HashOp, HashStep } from '@/types';
import { hashRunner } from './ops';
import type { HashRunConfig } from './ops';

export type HashRunFn = AlgorithmFn<HashStep, [readonly HashOp[], HashRunConfig]>;
export type HashAlgorithm = AlgorithmMeta<HashRunFn>;

// Central registry mapping a stable key -> strategy metadata + runner.
//
// The "algorithm" being selected here is the COLLISION STRATEGY, not the
// operation: insert, search and delete are not alternatives to one another, and
// a category whose selector offered them would be a category with no lesson in
// it. What genuinely changes the behaviour — the probe sequence, whether a
// delete can clear a slot, how badly clustering hurts — is the strategy, so
// that is what the selector selects.
//
// `satisfies` rather than a `: Record<string, ...>` annotation: the annotation
// would widen `keyof typeof algorithms` to `string`, and the whole point of
// the property names is that they *are* the strategy keys.
export const algorithms = {
  chaining: {
    name: 'Separate Chaining',
    generator: hashRunner('chaining'),
    description:
      'Every bucket holds a list. Colliding keys are appended to the list at their home bucket, so a lookup hashes once and then walks a chain whose length is the load factor on average.',
    complexity: { best: 'O(1)', average: 'O(1 + α)', worst: 'O(n)', space: 'O(n + m)' },
  },
  linear: {
    name: 'Linear Probing',
    generator: hashRunner('linear'),
    description:
      'On a collision, try the very next slot, and the next. Cache-friendly and trivial to implement, but colliding keys pile into contiguous runs — primary clustering — and each run makes itself more likely to grow.',
    complexity: { best: 'O(1)', average: 'O(1 / (1 - α))', worst: 'O(n)', space: 'O(m)' },
  },
  quadratic: {
    name: 'Quadratic Probing',
    generator: hashRunner('quadratic'),
    description:
      'Jump k(k+1)/2 slots away on the k-th probe, so colliding keys scatter instead of forming runs. Two keys sharing a home slot still share the entire jump sequence, which is secondary clustering.',
    complexity: { best: 'O(1)', average: 'O(1 / (1 - α))', worst: 'O(n)', space: 'O(m)' },
  },
  double: {
    name: 'Double Hashing',
    generator: hashRunner('double'),
    description:
      'A second hash of the key decides the stride, so two keys that collide at their home slot almost never collide again. The closest of the three to the uniform-hashing ideal, at the cost of a second hash per key.',
    complexity: { best: 'O(1)', average: 'O(1 / (1 - α))', worst: 'O(n)', space: 'O(m)' },
  },
} satisfies Record<string, HashAlgorithm>;

/** Literal union of the registry keys: 'chaining' | 'linear' | 'quadratic' | 'double' */
export type HashStrategyKey = keyof typeof algorithms;

export const DEFAULT_STRATEGY: HashStrategyKey = 'chaining';

/** Narrowing guard for values arriving from outside the type system (URL, storage). */
export function isHashStrategyKey(value: string): value is HashStrategyKey {
  return Object.prototype.hasOwnProperty.call(algorithms, value);
}
