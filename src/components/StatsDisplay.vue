<script setup>
import { computed } from 'vue';

const props = defineProps({
  comparisons: { type: Number, required: true },
  swaps: { type: Number, required: true },
  steps: { type: Number, required: true },
  elapsedMs: { type: Number, required: true },
  status: { type: String, required: true },
});

const elapsedLabel = computed(() => `${(props.elapsedMs / 1000).toFixed(2)}s`);

const statusLabel = computed(
  () =>
    ({ idle: 'Idle', running: 'Running', paused: 'Paused', done: 'Sorted' })[props.status] ??
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

const cells = computed(() => [
  { label: 'Comparisons', value: props.comparisons.toLocaleString() },
  { label: 'Swaps', value: props.swaps.toLocaleString() },
  { label: 'Steps', value: props.steps.toLocaleString() },
  { label: 'Elapsed', value: elapsedLabel.value },
]);
</script>

<template>
  <div class="av-card p-4 sm:p-5">
    <div class="mb-3 flex items-center justify-between">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Stats</h2>
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors"
        :class="statusClass"
      >
        {{ statusLabel }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <div
        v-for="cell in cells"
        :key="cell.label"
        class="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50"
      >
        <div class="font-mono text-xl font-bold text-slate-800 dark:text-slate-100 sm:text-2xl">
          {{ cell.value }}
        </div>
        <div class="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
          {{ cell.label }}
        </div>
      </div>
    </div>
  </div>
</template>
