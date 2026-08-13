<script setup lang="ts">
// Controls panel: node count, seed (with randomize), speed, and the standard
// playback buttons. Pure presentational component — all state lives in
// useMst and is passed down via props / v-model, actions bubble up as
// events. Shape deliberately mirrors SearchControls.vue: the same sliders +
// status/canEdit/isRunning/isPaused prop set and the same Run/Pause/Reset/
// generate button grid, with the search-specific target field swapped for
// the two inputs this category actually needs — node count and seed.
//
// Node count and seed are BOTH dataset-shaping inputs, unlike SearchControls
// where only size is. Kruskal and Prim need a graph; the standalone DSU mode
// needs an element count for its forest. `useMst` deliberately reuses one
// `nodeCount` ref for both (see its own comment), so one slider here drives
// either an 8-node graph or an 8-element forest depending on which algorithm
// is selected — the control never needs to know which.
//
// Seed lives directly on this panel rather than behind a separate
// DatasetPanel.vue the way sorting/searching do. DatasetPanel also offers a
// free-text custom array, which has no equivalent here — a graph is not
// something a learner types in by hand — so pulling in that whole component
// for one field it doesn't need would mean carrying dead props. A plain seed
// field, styled the same way ConcurrencyControls.vue does its own, is the
// smaller and more honest shape.

import type { AlgoStatus } from '@/types';
import { MST_NODE_MIN, MST_NODE_MAX } from '@/composables/useMst';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvSlider from '@/components/ui/AvSlider.vue';
import AvTextField from '@/components/ui/AvTextField.vue';

defineProps<{
  nodeCount: number;
  seed: number;
  speed: number;
  status: AlgoStatus;
  canEdit: boolean;
  isRunning: boolean;
  isPaused: boolean;
}>();

const emit = defineEmits<{
  'update:nodeCount': [value: number];
  'update:speed': [value: number];
  'update:seed': [value: number];
  randomize: [];
  generate: [];
  run: [];
  pause: [];
  reset: [];
}>();

// Seed is typed as text (so a partial keystroke doesn't get clobbered) but
// the model underneath is a number — same non-negotiable rule DatasetPanel
// and ConcurrencyControls both already enforce: a non-integer keystroke is
// swallowed rather than propagated as NaN, and the field snaps back to the
// last valid value via its `seed` prop.
function onSeedInput(value: string) {
  const parsed = Number(value);
  if (Number.isInteger(parsed)) emit('update:seed', parsed);
}
</script>

<template>
  <AvPanel title="Controls">
    <div class="space-y-4">
      <AvSlider
        label="Node count"
        :model-value="nodeCount"
        :min="MST_NODE_MIN"
        :max="MST_NODE_MAX"
        :disabled="!canEdit"
        @update:model-value="emit('update:nodeCount', $event)"
      />

      <AvSlider
        label="Speed"
        :model-value="speed"
        :min="1"
        :max="100"
        suffix="%"
        @update:model-value="emit('update:speed', $event)"
      />

      <AvTextField
        label="Seed"
        monospace
        :model-value="String(seed)"
        :disabled="!canEdit"
        @update:model-value="onSeedInput"
      />
    </div>

    <!-- Playback buttons -->
    <div class="mt-5 grid grid-cols-2 gap-2">
      <!-- Run / Resume -->
      <AvButton v-if="!isRunning" variant="primary" class="col-span-2" @click="emit('run')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-4 w-4"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        {{ isPaused ? 'Resume' : 'Run' }}
      </AvButton>

      <!-- Pause -->
      <AvButton v-else variant="warning" class="col-span-2" @click="emit('pause')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-4 w-4"
        >
          <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
        </svg>
        Pause
      </AvButton>

      <!-- Reset -->
      <AvButton variant="neutral" @click="emit('reset')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        Reset
      </AvButton>

      <!-- Generate: new graph and/or a fresh forest, same seeded rebuild
           useMst.generate() always performs regardless of mode. -->
      <AvButton variant="neutral" :disabled="!canEdit" @click="emit('generate')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
        New Graph
      </AvButton>
    </div>

    <div class="mt-3 grid grid-cols-1 gap-2">
      <AvButton variant="quiet" :disabled="!canEdit" @click="emit('randomize')">
        New seed
      </AvButton>
    </div>

    <p class="mt-3 text-center text-xs text-slate-400">
      Node count, seed &amp; algorithm lock while a run is in progress.
    </p>
  </AvPanel>
</template>
