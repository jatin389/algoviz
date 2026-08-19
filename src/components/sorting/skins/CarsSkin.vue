<script setup lang="ts">
import { TONE_MARK } from '@/theme/tones';
import type { SortSkinProps } from './types';

const props = defineProps<SortSkinProps>();

// value -> left offset along the track, reserving margin so the car pill
// (w-5) never clips past either edge of its lane.
function carLeftPercent(value: number, maxValue: number): string {
  return `${(value / Math.max(maxValue, 1)) * 92 + 4}%`;
}
</script>

<template>
  <div class="flex min-h-[280px] flex-1 flex-col gap-px rounded-xl bg-surface-alt p-3">
    <div
      v-for="item in items"
      :key="item.key"
      data-testid="sort-skin-item"
      :data-tone="item.tone"
      class="relative flex min-h-0 flex-1 items-center gap-2"
    >
      <span class="nums w-6 shrink-0 text-right text-[10px] text-ink-faint">{{ item.index }}</span>
      <div class="relative h-4 min-h-0 flex-1 rounded-mark border-b border-line">
        <div
          class="absolute top-1/2 h-3 w-5 -translate-y-1/2 rounded-full transition-[left] duration-150 ease-out"
          :class="TONE_MARK[item.tone]"
          :style="{ left: carLeftPercent(item.value, props.maxValue) }"
        />
        <span
          v-if="showLabels"
          class="nums absolute top-1/2 -translate-x-1/2 -translate-y-full text-[9px] text-ink-faint"
          :style="{ left: carLeftPercent(item.value, props.maxValue) }"
          >{{ item.value }}</span
        >
      </div>
    </div>
  </div>
</template>
