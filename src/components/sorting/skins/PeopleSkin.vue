<script setup lang="ts">
import { TONE_MARK } from '@/theme/tones';
import { barHeightPercent } from './scale';
import type { SortSkinProps } from './types';

const props = defineProps<SortSkinProps>();
</script>

<template>
  <div class="flex min-h-[280px] flex-1 items-end gap-[2px] rounded-xl bg-surface-alt p-3 sm:gap-1">
    <div
      v-for="item in items"
      :key="item.key"
      data-testid="sort-skin-item"
      :data-tone="item.tone"
      class="flex flex-1 flex-col items-center justify-end"
      :style="{ height: '100%' }"
    >
      <span
        v-if="showLabels"
        data-testid="sort-skin-item-label"
        class="nums mb-1 text-[10px] font-medium text-ink-faint sm:text-xs"
        >{{ item.value }}</span
      >
      <div
        class="flex w-full flex-col items-center transition-[height] duration-150 ease-out"
        :style="{ height: barHeightPercent(item.value, props.maxValue) }"
      >
        <!-- Head sized by column width, not a fixed px, so it degrades gracefully instead of going sub-pixel or oversized at high item counts. -->
        <div
          class="aspect-square w-[55%] flex-none rounded-full transition-colors duration-150 ease-out"
          :class="TONE_MARK[item.tone]"
        />
        <div
          class="w-full min-h-0 flex-1 rounded-t-mark transition-colors duration-150 ease-out"
          :class="TONE_MARK[item.tone]"
        />
      </div>
    </div>
  </div>
</template>
