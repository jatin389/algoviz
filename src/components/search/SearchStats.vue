<script setup lang="ts">
import { computed } from 'vue';
import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvStatCell from '@/components/ui/AvStatCell.vue';
import AvStatusPill from '@/components/ui/AvStatusPill.vue';

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
      <AvStatusPill :status="status" />
    </template>

    <div
      v-if="showResult"
      class="mb-3 rounded-xl p-3 text-center text-sm font-semibold"
      :class="isFound ? 'bg-ok-soft text-ok-ink' : 'bg-warn-soft text-warn-ink'"
    >
      {{ isFound ? `Found at index ${foundIndex}` : 'Not found' }}
    </div>

    <div class="grid grid-cols-3 gap-2">
      <AvStatCell v-for="cell in cells" :key="cell.label" :label="cell.label" :value="cell.value" />
    </div>
  </AvPanel>
</template>
