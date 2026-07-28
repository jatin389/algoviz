<script setup lang="ts">
import AvPanel from '@/components/ui/AvPanel.vue';

withDefaults(
  defineProps<{
    /** Empty array renders the "not yet available" state. */
    lines: readonly string[];
    /** 0-based; null means no highlight. */
    activeLine?: number | null;
    title?: string;
  }>(),
  { activeLine: null, title: 'Pseudocode' },
);
</script>

<template>
  <AvPanel :title="title" class="max-h-96 overflow-y-auto">
    <p v-if="lines.length === 0" class="text-xs text-slate-400 dark:text-slate-500">
      Pseudocode isn't written for this algorithm yet.
    </p>
    <ol v-else class="space-y-0.5 text-xs">
      <li
        v-for="(line, index) in lines"
        :key="index"
        class="flex gap-3 rounded px-1.5 py-0.5 transition-colors"
        :class="
          index === activeLine
            ? 'bg-amber-400/20 text-amber-800 dark:text-amber-300'
            : 'text-slate-500 dark:text-slate-400'
        "
      >
        <span
          class="w-5 flex-none text-right tabular-nums"
          :class="
            index === activeLine
              ? 'font-semibold text-amber-600 dark:text-amber-400'
              : 'text-slate-400 dark:text-slate-600'
          "
          >{{ index + 1 }}</span
        >
        <!-- Leading spaces in `line` are the algorithm's actual indentation, so
             they must render literally instead of being collapsed like normal
             inline text. -->
        <span class="whitespace-pre font-mono">{{ line }}</span>
      </li>
    </ol>
  </AvPanel>
</template>
