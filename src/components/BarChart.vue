<script setup>
import { computed } from 'vue';

const props = defineProps({
  array: { type: Array, required: true },
  comparing: { type: Array, default: () => [] },
  swapping: { type: Array, default: () => [] },
  sorted: { type: Array, default: () => [] },
  maxValue: { type: Number, default: 1 },
});

// Build O(1) lookup sets from the highlight index arrays so per-bar class
// resolution stays cheap even at 100 bars * many steps per second.
const comparingSet = computed(() => new Set(props.comparing));
const swappingSet = computed(() => new Set(props.swapping));
const sortedSet = computed(() => new Set(props.sorted));

// Show numeric labels only when bars are wide enough to be legible.
const showLabels = computed(() => props.array.length <= 25);

// Color precedence: swapping > comparing > sorted > default.
function colorClass(index) {
  if (swappingSet.value.has(index)) return 'bg-rose-500';
  if (comparingSet.value.has(index)) return 'bg-amber-400';
  if (sortedSet.value.has(index)) return 'bg-emerald-500';
  return 'bg-indigo-500/80 dark:bg-indigo-400/80';
}

function heightPercent(value) {
  // Reserve a little headroom so the tallest bar doesn't touch the ceiling.
  return `${(value / props.maxValue) * 98 + 2}%`;
}
</script>

<template>
  <div class="av-card flex h-full flex-col p-4 sm:p-5">
    <div class="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Visualization</h2>
      <!-- Color legend -->
      <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span class="flex items-center gap-1.5"><i class="h-3 w-3 rounded-sm bg-indigo-500/80 dark:bg-indigo-400/80" />Unsorted</span>
        <span class="flex items-center gap-1.5"><i class="h-3 w-3 rounded-sm bg-amber-400" />Comparing</span>
        <span class="flex items-center gap-1.5"><i class="h-3 w-3 rounded-sm bg-rose-500" />Swapping</span>
        <span class="flex items-center gap-1.5"><i class="h-3 w-3 rounded-sm bg-emerald-500" />Sorted</span>
      </div>
    </div>

    <!-- Bars -->
    <div class="flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-slate-50 p-3 dark:bg-slate-950/40 sm:gap-1">
      <div
        v-for="(value, index) in array"
        :key="index"
        class="flex flex-1 flex-col items-center justify-end"
        :style="{ height: '100%' }"
      >
        <span
          v-if="showLabels"
          class="mb-1 text-[10px] font-medium text-slate-400 sm:text-xs"
        >{{ value }}</span>
        <div
          class="w-full rounded-t-sm transition-[height,background-color] duration-150 ease-out"
          :class="colorClass(index)"
          :style="{ height: heightPercent(value) }"
        />
      </div>
    </div>
  </div>
</template>
