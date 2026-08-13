<script setup lang="ts">
import AvStatCell from './AvStatCell.vue';

// The stat-tile row shared by every panel that summarizes a run in a handful
// of numbers (search progress, DP table size, union-find component count...).
// `value` is passed straight through to AvStatCell untouched — this component
// only owns the grid, not the formatting.
withDefaults(
  defineProps<{
    cells: { label: string; value: string }[];
    /** Column count from the `sm` breakpoint up; below it, always two. */
    columns?: 2 | 3 | 4;
  }>(),
  { columns: 4 },
);

// Whole class names, never interpolated: a `grid-cols-${n}` built at runtime
// never reaches Tailwind's scanner, so the rule would not be emitted at all.
// Same table AvAlgorithmSelector keeps for its own column prop.
const GROUP_CLASS: Record<2 | 3 | 4, string> = {
  2: 'grid grid-cols-2 gap-2',
  3: 'grid grid-cols-2 gap-2 sm:grid-cols-3',
  4: 'grid grid-cols-2 gap-2 sm:grid-cols-4',
};
</script>

<template>
  <div :class="GROUP_CLASS[columns]">
    <AvStatCell v-for="cell in cells" :key="cell.label" :label="cell.label" :value="cell.value" />
  </div>
</template>
