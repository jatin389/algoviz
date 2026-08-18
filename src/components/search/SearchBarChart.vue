<script setup lang="ts">
import { computed } from 'vue';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvLegend from '@/components/ui/AvLegend.vue';
import { TONE_MARK, toneLegend } from '@/theme/tones';

// low/high/checking/foundIndex mirror the matching SearchStep fields, which are
// `number | null` because the bounds are cleared once a run terminates.
const props = withDefaults(
  defineProps<{
    array: number[];
    low?: number | null;
    high?: number | null;
    checking?: number | null;
    foundIndex?: number | null;
    maxValue?: number;
  }>(),
  { low: null, high: null, checking: null, foundIndex: null, maxValue: 1 },
);

// Show numeric labels only when bars are wide enough to be legible.
const showLabels = computed(() => props.array.length <= 25);

// The active [low, high] range is only worth painting when it is narrower
// than the full array — otherwise (e.g. every linear-search step) it would
// just recolor the whole chart with no informational value.
const showActiveRange = computed(
  () =>
    props.low !== null &&
    props.high !== null &&
    !(props.low === 0 && props.high === props.array.length - 1),
);

// The active range is the region binary/ternary search has not yet ruled out
// — still under consideration, exactly like `trace`'s "a dependency that was
// read" reading extended to a whole span rather than one cell. `probe` was
// the other candidate, but that tone is reserved for the single element being
// compared *right now* (`checking`), and reusing it for the surrounding
// range would blur the one-cell-vs-whole-span distinction this chart exists
// to show.
const LEGEND = toneLegend([
  { tone: 'idle', label: 'Default' },
  { tone: 'trace', label: 'Active range' },
  { tone: 'probe', label: 'Checking' },
  { tone: 'settled', label: 'Found' },
]);

// Color precedence: found > checking > active range > default.
function colorClass(index: number) {
  if (props.foundIndex !== null && index === props.foundIndex) return TONE_MARK.settled;
  if (props.checking !== null && index === props.checking) return TONE_MARK.probe;
  // `showActiveRange` already proves low/high are non-null, but that narrowing
  // does not survive the trip through a computed — hence the assertions.
  if (showActiveRange.value && index >= props.low! && index <= props.high!) {
    return TONE_MARK.trace;
  }
  return TONE_MARK.idle;
}

function heightPercent(value: number) {
  // Reserve a little headroom so the tallest bar doesn't touch the ceiling.
  return `${(value / props.maxValue) * 98 + 2}%`;
}
</script>

<template>
  <AvPanel class="flex h-full flex-col">
    <div class="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-faint">Visualization</h2>
      <AvLegend :items="LEGEND" />
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
        <span v-if="showLabels" class="mb-1 text-[10px] font-medium text-ink-faint sm:text-xs">{{
          value
        }}</span>
        <div
          class="w-full rounded-t-mark transition-[height,background-color] duration-150 ease-out"
          :class="colorClass(index)"
          :style="{ height: heightPercent(value) }"
        />
      </div>
    </div>
  </AvPanel>
</template>
