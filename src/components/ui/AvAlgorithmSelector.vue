<script setup lang="ts" generic="TKey extends string">
import { computed } from 'vue';
import type { AnyAlgorithmMeta } from '@/types';
import AvPanel from './AvPanel.vue';
import AvButton from './AvButton.vue';

// One selector for all four domains. The component is generic over the key
// union so `v-model` still binds a literal key — `Ref<SortAlgoKey>` in,
// 'bubble' | 'selection' | ... out, with no cast at the call site.
//
// It takes the registry *record* rather than a list, which is what let the
// redundant `key` field come out of every registry entry: the key is the
// property the entry is stored under, and TKey is inferred from it.

const props = withDefaults(
  defineProps<{
    algorithms: Record<TKey, AnyAlgorithmMeta>;
    disabled?: boolean;
    /** Widest-breakpoint column count for the button group. */
    columns?: 2 | 3;
  }>(),
  { disabled: false, columns: 2 },
);

const model = defineModel<TKey>({ required: true });

// String keys iterate in insertion order, so this is the registry's own
// declaration order — which is the order the buttons should appear in.
const keys = computed(() => Object.keys(props.algorithms) as TKey[]);

const selected = computed(() => props.algorithms[model.value]);

// Complexity is one of two shapes (best/average/worst/space, or time/space),
// so it is flattened to rows here rather than iterated as a union in the
// template.
const complexityRows = computed(() =>
  selected.value ? Object.entries(selected.value.complexity) : [],
);

// Whole class names, never interpolated: a `grid-cols-${n}` built at runtime
// never reaches Tailwind's scanner, so the rule would not be emitted at all.
const groupClass = computed(() =>
  props.columns === 3 ? 'grid grid-cols-2 gap-2 sm:grid-cols-3' : 'grid grid-cols-2 gap-2',
);

function select(key: TKey) {
  if (props.disabled) return;
  model.value = key;
}
</script>

<template>
  <AvPanel title="Algorithm">
    <div :class="groupClass">
      <AvButton
        v-for="key in keys"
        :key="key"
        variant="selector"
        :active="key === model"
        :disabled="disabled"
        @click="select(key)"
      >
        {{ algorithms[key].name }}
      </AvButton>
    </div>

    <!-- Description + complexity for the selected algorithm -->
    <div v-if="selected" class="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
      <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {{ selected.description }}
      </p>
      <div class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="[label, value] in complexityRows"
          :key="label"
          class="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400"
        >
          <span class="uppercase tracking-wide text-[10px] text-slate-400">{{ label }}</span>
          <span class="font-mono font-semibold text-indigo-500 dark:text-indigo-400">{{
            value
          }}</span>
        </span>
        <span
          v-if="selected.stable !== undefined"
          class="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium shadow-sm"
          :class="
            selected.stable
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
          "
        >
          {{ selected.stable ? 'Stable' : 'Unstable' }}
        </span>
      </div>
    </div>
  </AvPanel>
</template>
