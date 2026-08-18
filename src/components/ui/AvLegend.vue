<script setup lang="ts">
import { TONE_MARK, type LegendItem } from '@/theme/tones';

// The small colour-key row that sits next to a canvas title (graph node
// states, grid cell states, ...).
//
// Callers pass TONES, not classes. Five components used to hand-maintain a
// `bg-*` list mirroring the `fill-*` table that actually painted the marks,
// which meant the legend and the picture could disagree — and did. Deriving
// the swatch from the tone makes that impossible, and it also means the
// swatches pick up the texture channel in the hueless themes, where a flat
// colour chip would describe nothing.
defineProps<{ items: LegendItem[] }>();
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
    <span v-for="item in items" :key="item.label" class="flex items-center gap-1.5"
      ><i class="h-3 w-3 rounded-mark" :class="TONE_MARK[item.tone]" />{{ item.label }}</span
    >
  </div>
</template>
