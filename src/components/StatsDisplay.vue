<script setup lang="ts">
import { computed } from 'vue';
import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvStatCell from '@/components/ui/AvStatCell.vue';
import AvStatusPill from '@/components/ui/AvStatusPill.vue';

const props = defineProps<{
  comparisons: number;
  swaps: number;
  steps: number;
  elapsedMs: number;
  status: AlgoStatus;
}>();

const elapsedLabel = computed(() => `${(props.elapsedMs / 1000).toFixed(2)}s`);

// Sorting has a better word than the pill's default "Done" for a finished run.
const statusLabel = computed(() => (props.status === 'done' ? 'Sorted' : undefined));

const cells = computed(() => [
  { label: 'Comparisons', value: props.comparisons.toLocaleString() },
  { label: 'Swaps', value: props.swaps.toLocaleString() },
  { label: 'Steps', value: props.steps.toLocaleString() },
  { label: 'Elapsed', value: elapsedLabel.value },
]);
</script>

<template>
  <AvPanel title="Stats">
    <template #header>
      <AvStatusPill :status="status" :label="statusLabel" />
    </template>

    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <AvStatCell v-for="cell in cells" :key="cell.label" :label="cell.label" :value="cell.value" />
    </div>
  </AvPanel>
</template>
