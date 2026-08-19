<script setup lang="ts">
import { computed } from 'vue';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvLegend from '@/components/ui/AvLegend.vue';
import AvRulerRail from '@/components/ui/AvRulerRail.vue';
import { toneLegend } from '@/theme/tones';
import { resolveSortTone } from './skins/tone';
import { sortSkins, DEFAULT_SKIN } from './skins';
import type { SortSkinKey, SortSkinSpec } from './skins';
import type { SortSkinItem } from './skins/types';

/**
 * SortStage — the shared shell every sorting skin renders inside.
 *
 * It owns exactly what BarChart used to own directly: the panel, the
 * heading, the legend, and the ruler rail. What used to be BarChart's bars
 * div is now the mounted skin's own interior — the shell hands that box
 * over entirely rather than constraining it, because Cars needs rows where
 * Bars needs columns, and Cards needs a fanned hand where Spines needs a
 * shelf. A skin needing something SortSkinProps doesn't carry is a sign the
 * shell drew this boundary in the wrong place, not that the interface needs
 * an escape hatch.
 *
 * Props are exactly BarChart's old prop list plus `skin`, so every existing
 * call site migrates by renaming the tag and adding one prop.
 */
const props = withDefaults(
  defineProps<{
    array: number[];
    comparing: number[];
    swapping: number[];
    sorted: number[];
    maxValue: number;
    /** Panel heading. Compare mode passes the algorithm name. */
    title?: string;
    /** The second chart in compare mode hides it, so the legend appears once. */
    showLegend?: boolean;
    skin?: SortSkinKey;
  }>(),
  {
    comparing: () => [],
    swapping: () => [],
    sorted: () => [],
    maxValue: 1,
    title: 'Visualization',
    showLegend: true,
    skin: DEFAULT_SKIN,
  },
);

// An unrecognised skin key (a stale/hand-edited URL) falls back to the
// default rather than rendering nothing.
const activeSkin = computed<SortSkinSpec>(() => sortSkins[props.skin] ?? sortSkins[DEFAULT_SKIN]);

// Show numeric labels only when items are wide enough to be legible. Advisory
// for magnitude/position skins; Cards ignores it (see SortSkinProps).
const showLabels = computed(() => props.array.length <= 25);

// Built once per step, the same O(1)-lookup shape BarChart built inline
// before this file existed.
const items = computed<SortSkinItem[]>(() => {
  const sets = {
    comparing: new Set(props.comparing),
    swapping: new Set(props.swapping),
    sorted: new Set(props.sorted),
  };
  return props.array.map((value, index) => ({
    index,
    value,
    key: index,
    tone: resolveSortTone(sets, index),
  }));
});

// Sorting has better words for these than the generic tone labels, but the
// swatches come from the same table that paints the items, so the key
// cannot describe something the skin is not drawing.
const LEGEND = toneLegend([
  { tone: 'idle', label: 'Unsorted' },
  { tone: 'probe', label: 'Comparing' },
  { tone: 'active', label: 'Swapping' },
  { tone: 'settled', label: 'Sorted' },
]);

// A step-describing label for the whole stage. Per-item labels would be
// noise at 100 items; this names the one thing actually happening right now,
// matching DpTable's role="img" + aria-label pattern for a data view with no
// native text alternative.
const stepDescription = computed(() => {
  if (props.swapping.length > 0) {
    return `Swapping values at positions ${props.swapping.join(', ')}`;
  }
  if (props.comparing.length > 0) {
    return `Comparing values at positions ${props.comparing.join(', ')}`;
  }
  if (props.array.length > 0 && props.sorted.length === props.array.length) {
    return `${activeSkin.value.name} view: array fully sorted`;
  }
  return `${activeSkin.value.name} view: ${props.array.length} elements, ${props.sorted.length} sorted so far`;
});
</script>

<template>
  <AvPanel class="flex h-full flex-col">
    <div class="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-faint">{{ title }}</h2>
      <AvLegend v-if="showLegend" :items="LEGEND" />
    </div>

    <div role="img" :aria-label="stepDescription" class="flex flex-1 flex-col">
      <component
        :is="activeSkin.component"
        :items="items"
        :max-value="maxValue"
        :show-labels="showLabels"
      />
    </div>

    <!-- The measurement rail: index positions under the items, so a
         highlighted pair can be located in a long array. Skins that lay
         items out in rows instead of columns (Cars) label lanes themselves
         and opt out via `showsRail: false`. -->
    <AvRulerRail v-if="activeSkin.showsRail !== false" :length="array.length" />
  </AvPanel>
</template>
