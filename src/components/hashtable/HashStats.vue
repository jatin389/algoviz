<script setup lang="ts">
// The run summary, plus the load-factor meter it belongs next to.
//
// Six numbers, and the interesting one is the last: probes per operation is the
// number every collision strategy is ultimately competing on. Switching from
// chaining to linear probing at a high load factor and watching that single
// figure move is the shortest version of this whole category's argument.

import { computed } from 'vue';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvStatGrid from '@/components/ui/AvStatGrid.vue';
import LoadFactorMeter from './LoadFactorMeter.vue';

const props = defineProps<{
  size: number;
  capacity: number;
  loadFactor: number;
  threshold: number;
  probes: number;
  collisions: number;
  resizes: number;
  avgProbes: number;
}>();

const cells = computed(() => [
  { label: 'Keys', value: `${props.size} / ${props.capacity}` },
  { label: 'Load α', value: props.loadFactor.toFixed(2) },
  { label: 'Probes', value: props.probes.toLocaleString() },
  { label: 'Collisions', value: props.collisions.toLocaleString() },
  // Two decimals rather than one: the differences between strategies at a
  // sensible load factor land in the second place, and rounding them away would
  // make three of the four look identical.
  { label: 'Probes / op', value: props.avgProbes === 0 ? '—' : props.avgProbes.toFixed(2) },
  { label: 'Resizes', value: String(props.resizes) },
]);
</script>

<template>
  <AvPanel title="Statistics">
    <AvStatGrid :cells="cells" :columns="3" />
    <div class="mt-4">
      <LoadFactorMeter
        :load-factor="loadFactor"
        :threshold="threshold"
        :size="size"
        :capacity="capacity"
      />
    </div>
  </AvPanel>
</template>
