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
        class="w-full rounded-t-mark transition-[height,background-color] duration-150 ease-out"
        :class="TONE_MARK[item.tone]"
        :style="{ height: barHeightPercent(item.value, props.maxValue) }"
      />
    </div>
  </div>
</template>
