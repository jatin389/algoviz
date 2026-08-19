<script setup lang="ts">
import { computed } from 'vue';
import { TONE_BORDER, TONE_INK, TONE_SOFT_BG } from '@/theme/tones';
import type { SortSkinProps } from './types';

const props = defineProps<SortSkinProps>();

// Card footprint shrinks in steps as the hand grows, so n≈100 still lays out
// as a clean non-overlapping row instead of wrapping into an unreadable wall.
const density = computed(() => {
  const n = props.items.length;
  if (n <= 20) return { card: 'h-20 w-14', text: 'text-2xl' };
  if (n <= 50) return { card: 'h-16 w-11', text: 'text-lg' };
  return { card: 'h-12 w-8', text: 'text-sm' };
});
</script>

<template>
  <div class="flex min-h-[280px] flex-1 flex-wrap items-center gap-2 rounded-xl bg-surface-alt p-3">
    <div
      v-for="item in items"
      :key="item.key"
      data-testid="sort-skin-item"
      :data-tone="item.tone"
      class="flex shrink-0 items-center justify-center rounded-lg border-2 shadow-sm"
      :class="[density.card, TONE_BORDER[item.tone], TONE_SOFT_BG[item.tone]]"
    >
      <span class="nums font-bold" :class="[density.text, TONE_INK[item.tone]]">{{
        item.value
      }}</span>
    </div>
  </div>
</template>
