<script setup lang="ts">
import { computed } from 'vue';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvLegend from '@/components/ui/AvLegend.vue';
import AvRulerRail from '@/components/ui/AvRulerRail.vue';
import { TONE_MARK, toneLegend } from '@/theme/tones';

const props = withDefaults(
  defineProps<{
    array: number[];
    comparing: number[];
    swapping: number[];
    sorted: number[];
    maxValue: number;
    /** Panel heading. Compare mode passes the algorithm name. */
    title?: string;
    /** The second chart in compare mode hides it, so the legend appears once. */
    showLegend?: boolean;
  }>(),
  {
    comparing: () => [],
    swapping: () => [],
    sorted: () => [],
    maxValue: 1,
    title: 'Visualization',
    showLegend: true,
  },
);

// Build O(1) lookup sets from the highlight index arrays so per-bar class
// resolution stays cheap even at 100 bars * many steps per second.
const comparingSet = computed(() => new Set(props.comparing));
const swappingSet = computed(() => new Set(props.swapping));
const sortedSet = computed(() => new Set(props.sorted));

// Show numeric labels only when bars are wide enough to be legible.
const showLabels = computed(() => props.array.length <= 25);

// Color precedence: swapping > comparing > sorted > default.
function colorClass(index: number) {
  if (swappingSet.value.has(index)) return TONE_MARK.active;
  if (comparingSet.value.has(index)) return TONE_MARK.probe;
  if (sortedSet.value.has(index)) return TONE_MARK.settled;
  return TONE_MARK.idle;
}

// Sorting has better words for these than the generic tone labels, but the
// swatches come from the same table that paints the bars, so the key cannot
// describe something the chart is not drawing.
const LEGEND = toneLegend([
  { tone: 'idle', label: 'Unsorted' },
  { tone: 'probe', label: 'Comparing' },
  { tone: 'active', label: 'Swapping' },
  { tone: 'settled', label: 'Sorted' },
]);

function heightPercent(value: number) {
  // Reserve a little headroom so the tallest bar doesn't touch the ceiling.
  return `${(value / props.maxValue) * 98 + 2}%`;
}
</script>

<template>
  <AvPanel class="flex h-full flex-col">
    <div class="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-faint">{{ title }}</h2>
      <AvLegend v-if="showLegend" :items="LEGEND" />
    </div>

    <!-- Bars -->
    <div
      class="flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-surface-alt p-3 sm:gap-1"
    >
      <div
        v-for="(value, index) in array"
        :key="index"
        class="flex flex-1 flex-col items-center justify-end"
        :style="{ height: '100%' }"
      >
        <span v-if="showLabels" class="nums mb-1 text-[10px] font-medium text-ink-faint sm:text-xs">{{
          value
        }}</span>
        <div
          class="w-full rounded-t-mark transition-[height,background-color] duration-150 ease-out"
          :class="colorClass(index)"
          :style="{ height: heightPercent(value) }"
        />
      </div>
    </div>
    <!-- The measurement rail: index positions under the bars, so a highlighted
         pair can actually be located in a long array. -->
    <AvRulerRail :length="array.length" />
  </AvPanel>
</template>
