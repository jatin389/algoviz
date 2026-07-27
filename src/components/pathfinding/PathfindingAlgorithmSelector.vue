<script setup lang="ts">
import { computed } from 'vue';
import { algorithmList } from '@/algorithms/pathfinding';
import type { PathAlgoKey } from '@/algorithms/pathfinding';

const model = defineModel<PathAlgoKey>({ required: true });
const props = defineProps<{ disabled?: boolean }>();

const selected = computed(() => algorithmList.find((a) => a.key === model.value));

function select(key: PathAlgoKey) {
  if (props.disabled) return;
  model.value = key;
}
</script>

<template>
  <div class="av-card p-4 sm:p-5">
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Algorithm</h2>

    <!-- Button group -->
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <button
        v-for="algo in algorithmList"
        :key="algo.key"
        type="button"
        :disabled="disabled"
        class="rounded-xl px-3 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed"
        :class="[
          algo.key === modelValue
            ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white',
        ]"
        @click="select(algo.key)"
      >
        {{ algo.name }}
      </button>
    </div>

    <!-- Description + complexity for the selected algorithm -->
    <div v-if="selected" class="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
      <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {{ selected.description }}
      </p>
      <div class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="(value, label) in selected.complexity"
          :key="label"
          class="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400"
        >
          <span class="uppercase tracking-wide text-[10px] text-slate-400">{{ label }}</span>
          <span class="font-mono font-semibold text-indigo-500 dark:text-indigo-400">{{
            value
          }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
