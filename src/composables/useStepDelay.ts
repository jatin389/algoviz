import { computed } from 'vue';
import type { ComputedRef, Ref } from 'vue';

/**
 * The one speed -> per-step delay mapping, previously copy-pasted into all six
 * driver composables.
 *
 * Higher speed means a smaller delay: the 1..100 slider maps onto roughly
 * [4ms, 202ms]. The floor exists because a 0ms setTimeout chain starves the
 * renderer — the bars stop repainting long before the algorithm finishes.
 */
export function useStepDelay(speed: Ref<number>): ComputedRef<number> {
  return computed(() => Math.max(4, Math.round(204 - speed.value * 2)));
}
