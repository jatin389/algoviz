import type { AnyAlgorithmMeta } from '@/types';

/**
 * Identity helper that validates a registry against its domain's metadata type
 * while keeping each entry's `key` a *literal*.
 *
 * `satisfies Record<string, SortAlgorithm>` validates the same shape, but its
 * contextual type widens every `key` to `string`. That matters because the UI
 * iterates `algorithmList` and binds `algo.key` straight into a
 * `Ref<SortAlgoKey>` — the literal has to survive the round trip, or every
 * selector needs a cast.
 *
 * The mapped parameter additionally pins each entry's `key` to the property it
 * is stored under, so a copy-paste slip like `radix: { key: 'counting' }` is a
 * compile error rather than a selector that silently highlights the wrong row.
 *
 * Curried because TypeScript has no partial type-argument inference: the domain
 * meta type is supplied, the registry shape is inferred.
 */
export const defineRegistry =
  <TMeta extends AnyAlgorithmMeta>() =>
  <T extends Record<string, TMeta>>(registry: { [K in keyof T]: T[K] & { key: K } }): T =>
    registry;
