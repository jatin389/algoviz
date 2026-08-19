<script setup lang="ts">
import { computed } from 'vue';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import { sortSkins } from './skins';
import type { SortSkinKey, SortSkinSpec } from './skins';

/**
 * SkinPicker — the sorting-only alternate-renderer picker.
 *
 * Deliberately its own small component rather than a reuse of
 * AvAlgorithmSelector: that component is generic over AnyAlgorithmMeta and
 * unconditionally renders a complexity table and a `stable` pill, neither of
 * which a skin has a value for. Contorting it to make those optional would
 * degrade a type several other views depend on to serve one caller here.
 */
const props = defineProps<{
  /** The array size in play, so a crowding note can fire per-skin. */
  count: number;
}>();

const model = defineModel<SortSkinKey>({ required: true });

// Registry declaration order is deliberately pedagogical fidelity first:
// Bars, Book spines, People keep the height encoding; Cars breaks the axis;
// Cards drops magnitude entirely. Iterating Object.keys preserves it.
const keys = computed(() => Object.keys(sortSkins) as SortSkinKey[]);

const selected = computed<SortSkinSpec>(() => sortSkins[model.value]);

const isCrowded = computed(() => {
  const ceiling = selected.value.maxComfortableN;
  return ceiling !== undefined && props.count > ceiling;
});

function select(key: SortSkinKey) {
  model.value = key;
}
</script>

<template>
  <AvPanel title="Skin">
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
      <AvButton
        v-for="key in keys"
        :key="key"
        variant="selector"
        :active="key === model"
        @click="select(key)"
      >
        {{ sortSkins[key].name }}
      </AvButton>
    </div>

    <div class="mt-4 rounded-xl bg-surface-alt p-4">
      <p class="text-sm leading-relaxed text-ink-muted">
        {{ selected.description }}
      </p>
      <p v-if="isCrowded" class="mt-2 text-xs text-warn">
        {{ selected.name }} gets crowded above ~{{ selected.maxComfortableN }} items — try Bars for
        a large array.
      </p>
    </div>
  </AvPanel>
</template>
