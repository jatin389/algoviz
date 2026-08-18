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
    title?: string;
    disabled?: boolean;
    /** Column count from the `sm` breakpoint up; below it, always two. */
    columns?: 2 | 3 | 4;
  }>(),
  { title: 'Algorithm', disabled: false, columns: 2 },
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
const GROUP_CLASS: Record<2 | 3 | 4, string> = {
  2: 'grid grid-cols-2 gap-2',
  3: 'grid grid-cols-2 gap-2 sm:grid-cols-3',
  4: 'grid grid-cols-2 gap-2 sm:grid-cols-4',
};

const groupClass = computed(() => GROUP_CLASS[props.columns]);

function select(key: TKey) {
  if (props.disabled) return;
  model.value = key;
}
</script>

<template>
  <AvPanel :title="title">
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
    <div v-if="selected" class="mt-4 rounded-xl bg-surface-alt p-4">
      <p class="text-sm leading-relaxed text-ink-muted">
        {{ selected.description }}
      </p>
      <div class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="[label, value] in complexityRows"
          :key="label"
          class="inline-flex items-center gap-1 rounded-lg bg-surface-raised px-2.5 py-1 text-xs font-medium text-ink-muted shadow-sm"
        >
          <span class="uppercase tracking-wide text-[10px] text-ink-faint">{{ label }}</span>
          <span class="font-mono font-semibold text-accent">{{
            value
          }}</span>
        </span>
        <span
          v-if="selected.stable !== undefined"
          class="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium shadow-sm"
          :class="
            selected.stable
              ? 'bg-ok-soft text-ok-ink'
              : 'bg-warn-soft text-warn-ink'
          "
        >
          {{ selected.stable ? 'Stable' : 'Unstable' }}
        </span>
      </div>
    </div>
  </AvPanel>
</template>
