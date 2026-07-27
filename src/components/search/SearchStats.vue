<script setup lang="ts">
import { computed } from 'vue';
import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvStatCell from '@/components/ui/AvStatCell.vue';

// `foundIndex` mirrors SearchStep.foundIndex: null until the target is located,
// and still null if a finished run never found it.
const props = withDefaults(
  defineProps<{
    comparisons: number;
    steps: number;
    elapsedMs: number;
    status: AlgoStatus;
    foundIndex?: number | null;
  }>(),
  { foundIndex: null },
);

const elapsedLabel = computed(() => `${(props.elapsedMs / 1000).toFixed(2)}s`);

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

const cells = computed(() => [
  { label: 'Comparisons', value: props.comparisons.toLocaleString() },
  { label: 'Steps', value: props.steps.toLocaleString() },
  { label: 'Elapsed', value: elapsedLabel.value },
]);

// The result banner only makes sense once a run has concluded.
const showResult = computed(() => props.status === 'done');
const isFound = computed(() => props.foundIndex !== null);
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

    <div
      v-if="showResult"
      class="mb-3 rounded-xl p-3 text-center text-sm font-semibold"
      :class="
        isFound
          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
          : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
      "
    >
      {{ isFound ? `Found at index ${foundIndex}` : 'Not found' }}
    </div>

    <div class="grid grid-cols-3 gap-2">
      <AvStatCell v-for="cell in cells" :key="cell.label" :label="cell.label" :value="cell.value" />
    </div>
  </AvPanel>
</template>
