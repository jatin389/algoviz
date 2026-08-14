<script setup lang="ts">
import { computed } from 'vue';
import { formatNaiveCount, isSaturated } from '@/algorithms/dp/naiveCount';
import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvStatGrid from '@/components/ui/AvStatGrid.vue';

// The panel that makes the category's argument.
//
// "Cells filled" on its own says nothing — 36 cells is not impressive until it
// is sitting next to the 29,860,703 recursive calls it replaced. So the two
// counts are shown together with their ratio, which is the number the whole
// visualizer exists to make vivid (see `naiveCount.ts`'s header for why that
// count is *counted* rather than estimated).

const props = defineProps<{
  cellsFilled: number;
  /** Cells the fill actually writes — not `rows * cols` for matrix chain. */
  fillable: number;
  rows: number;
  cols: number;
  naiveCalls: number;
  /** `naiveCalls / fillable`, computed by `useDp`. */
  speedup: number;
  steps: number;
  elapsedMs: number;
  status: AlgoStatus;
  /** The decoded answer, once the traceback has finished. */
  result?: string | null;
  /** True when the step cap cut the run short — the counts are then partial. */
  truncated?: boolean;
}>();

/**
 * Naive counts saturate at `Number.MAX_SAFE_INTEGER` rather than silently
 * losing precision, and `formatNaiveCount` renders that as `> 9.0e15`. The
 * ratio inherits the same caveat: if the numerator is a lower bound then so is
 * the quotient, so it is prefixed rather than presented as exact. Reusing the
 * same formatter keeps the two tiles reading in the same units.
 */
const speedupLabel = computed(() => {
  if (props.speedup <= 0) return '—';
  const prefix = isSaturated(props.naiveCalls) ? '> ' : '';
  return `${prefix}${formatNaiveCount(Math.round(props.speedup))}×`;
});

const cells = computed(() => [
  {
    label: 'Cells filled',
    value: `${props.cellsFilled.toLocaleString()} / ${props.fillable.toLocaleString()}`,
  },
  { label: 'Naive calls', value: formatNaiveCount(props.naiveCalls) },
  { label: 'Cheaper by', value: speedupLabel.value },
  { label: 'Table', value: `${props.rows} × ${props.cols}` },
  { label: 'Steps', value: props.steps.toLocaleString() },
  { label: 'Elapsed', value: `${(props.elapsedMs / 1000).toFixed(2)}s` },
]);

// Same status vocabulary and the same pill classes as `SearchStats`, so the
// badge means the same thing on every tab.
const statusLabel = computed(
  () =>
    ({ idle: 'Idle', running: 'Running', paused: 'Paused', done: 'Done' })[props.status] ??
    props.status,
);

const statusClass = computed(
  () =>
    ({
      idle: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
      running: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
      paused: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
      done: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
    })[props.status],
);
</script>

<template>
  <AvPanel title="Stats">
    <template #header>
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors"
        :class="statusClass"
      >
        {{ statusLabel }}
      </span>
    </template>

    <!-- The decoded answer, not a number: an LCS string, a parenthesisation, a
         list of taken items. It leads the panel because it is what the run was
         for; the tiles below explain what it cost. -->
    <div
      v-if="result"
      class="mb-3 break-words rounded-xl bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
    >
      {{ result }}
    </div>

    <div
      v-if="truncated"
      class="mb-3 rounded-xl bg-amber-50 p-3 text-center text-xs font-semibold text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
    >
      The step cap stopped this run early — the counts below are partial.
    </div>

    <AvStatGrid :cells="cells" :columns="3" />
  </AvPanel>
</template>
