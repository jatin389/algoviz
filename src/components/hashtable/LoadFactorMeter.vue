<script setup lang="ts">
// A slim bar for α, with the resize threshold marked on it.
//
// The number is already in the stat grid, so this exists purely to make the
// *approach* to the threshold visible: "the table is about to grow" is a shape,
// not a digit, and watching the fill creep up to the marker is what makes the
// resize feel earned rather than arbitrary.

import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    loadFactor: number;
    /** The enforced threshold, not the requested one. */
    threshold: number;
    size: number;
    capacity: number;
  }>(),
  {},
);

/**
 * Where the right-hand end of the bar sits.
 *
 * Fixed at 1.0 whenever the threshold allows it, so the bar means the same
 * thing from one configuration to the next — a rescaling bar would make a table
 * at α = 0.5 look identical whether the threshold was 0.5 or 1.5. Chaining can
 * be configured past 1.0, and only then does the scale stretch, with headroom
 * so the marker never lands flush against the edge.
 */
const scaleMax = computed(() => Math.max(1, props.threshold * 1.2));

function percent(value: number): string {
  return `${Math.min(100, Math.max(0, (value / scaleMax.value) * 100))}%`;
}

const over = computed(() => props.loadFactor > props.threshold);
</script>

<template>
  <div>
    <div class="mb-1.5 flex items-baseline justify-between text-sm">
      <span class="font-medium text-slate-600 dark:text-slate-300">
        Load factor α
        <span class="ml-1 font-mono text-xs text-slate-400">{{ size }} / {{ capacity }}</span>
      </span>
      <span
        class="font-mono font-semibold"
        :class="over ? 'text-amber-500' : 'text-indigo-500 dark:text-indigo-400'"
        >{{ loadFactor.toFixed(2) }}</span
      >
    </div>

    <div
      class="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
      role="meter"
      :aria-valuenow="Number(loadFactor.toFixed(2))"
      :aria-valuemin="0"
      :aria-valuemax="Number(scaleMax.toFixed(2))"
      :aria-label="`Load factor, resize threshold ${threshold.toFixed(2)}`"
    >
      <div
        class="h-full rounded-full transition-all"
        :class="over ? 'bg-amber-400' : 'bg-indigo-500'"
        :style="{ width: percent(loadFactor) }"
      />
      <!-- The marker sits above the fill so it stays visible once the bar
           passes it, which is exactly the moment it matters most. -->
      <div
        class="absolute inset-y-0 w-0.5 bg-rose-500"
        :style="{ left: percent(threshold) }"
        aria-hidden="true"
      />
    </div>

    <p class="mt-1 text-[11px] text-slate-400">
      Grows past <span class="font-mono">{{ threshold.toFixed(2) }}</span
      >; open addressing also counts tombstones toward the fill.
    </p>
  </div>
</template>
