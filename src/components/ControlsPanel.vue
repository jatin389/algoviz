<script setup lang="ts">
// Controls panel: speed + size sliders and the playback buttons.
// It is a pure presentational component — all state lives in useSorter and is
// passed down via props / v-model, actions bubble up as events.

import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvSlider from '@/components/ui/AvSlider.vue';

const props = withDefaults(
  defineProps<{
    size: number;
    speed: number;
    status: AlgoStatus;
    canEdit: boolean;
    isRunning: boolean;
    isPaused: boolean;
    compare?: boolean;
    sound?: boolean;
    /** 0..1, gain-shaped to match the audio composable's ref. */
    volume?: number;
    hasSoundCues?: boolean;
  }>(),
  {
    compare: false,
    sound: false,
    volume: 0.4,
    hasSoundCues: true,
  },
);

const emit = defineEmits<{
  'update:size': [value: number];
  'update:speed': [value: number];
  'update:compare': [value: boolean];
  'update:sound': [value: boolean];
  'update:volume': [value: number];
  generate: [];
  run: [];
  runBoth: [];
  pause: [];
  reset: [];
}>();

// Vue's overloaded emit signature can't take a union event name, so the
// compare-mode branch is split out rather than passed as a ternary argument.
function handleRun() {
  if (props.compare) emit('runBoth');
  else emit('run');
}
</script>

<template>
  <AvPanel title="Controls">
    <!-- Sliders -->
    <div class="space-y-4">
      <AvSlider
        label="Array size"
        :model-value="size"
        :min="10"
        :max="100"
        :disabled="!canEdit"
        @update:model-value="emit('update:size', $event)"
      />

      <AvSlider
        label="Speed"
        :model-value="speed"
        :min="1"
        :max="100"
        suffix="%"
        @update:model-value="emit('update:speed', $event)"
      />
    </div>

    <!-- Compare mode toggle -->
    <AvButton
      variant="toggle"
      class="mt-5 w-full"
      :active="compare"
      :disabled="!canEdit"
      @click="emit('update:compare', !compare)"
    >
      Compare two algorithms
    </AvButton>

    <!-- Sound toggle: no :disabled, unlike compare. Compare mode locks because
         it changes what is being run; sound is exactly the kind of thing you
         want to flip mid-run, to hear (or silence) the sort in progress. -->
    <AvButton
      variant="toggle"
      class="mt-2 w-full"
      :active="sound"
      @click="emit('update:sound', !sound)"
    >
      Sound cues
    </AvButton>
    <!-- AvSlider's step defaults to 1 (whole percent), while the audio
         composable keeps volume gain-shaped in 0..1 — so the value is scaled
         both ways at this boundary. -->
    <AvSlider
      v-if="sound"
      label="Volume"
      class="mt-3"
      :model-value="Math.round(volume * 100)"
      :min="0"
      :max="100"
      suffix="%"
      @update:model-value="emit('update:volume', $event / 100)"
    />
    <p v-if="sound && !hasSoundCues" class="mt-2 text-center text-xs text-slate-400">
      Sound cues aren't mapped for this algorithm yet.
    </p>

    <!-- Playback buttons -->
    <div class="mt-2 grid grid-cols-2 gap-2">
      <!-- Run / Resume: compare mode starts both sorters together instead of one -->
      <AvButton v-if="!isRunning" variant="primary" class="col-span-2" @click="handleRun">
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

      <!-- Generate new array -->
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
        Shuffle
      </AvButton>
    </div>

    <p class="mt-3 text-center text-xs text-slate-400">
      Size &amp; algorithm lock while a sort is running.
    </p>
  </AvPanel>
</template>
