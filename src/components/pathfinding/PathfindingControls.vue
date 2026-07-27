<script setup lang="ts">
// Controls panel: speed slider, playback buttons, and wall-editing shortcuts.
// Pure presentational component — all state lives in usePathfinder and is
// passed down via props / v-model, actions bubble up as events.

import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvSlider from '@/components/ui/AvSlider.vue';

defineProps<{
  speed: number;
  status: AlgoStatus;
  canEdit: boolean;
  isRunning: boolean;
  isPaused: boolean;
}>();

const emit = defineEmits<{
  'update:speed': [value: number];
  run: [];
  pause: [];
  reset: [];
  'clear-walls': [];
  'randomize-walls': [];
}>();
</script>

<template>
  <AvPanel title="Controls">
    <!-- Speed slider -->
    <AvSlider
      label="Speed"
      :model-value="speed"
      :min="1"
      :max="100"
      suffix="%"
      @update:model-value="emit('update:speed', $event)"
    />

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

      <!-- Clear walls -->
      <AvButton variant="neutral" :disabled="!canEdit" @click="emit('clear-walls')">
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
          <path
            d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"
          />
        </svg>
        Clear Walls
      </AvButton>

      <!-- Random walls -->
      <AvButton
        variant="neutral"
        :disabled="!canEdit"
        class="col-span-2"
        @click="emit('randomize-walls')"
      >
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
        Random Walls
      </AvButton>
    </div>

    <p class="mt-3 text-center text-xs text-slate-400">
      Walls, start, and end lock while a search is running.
    </p>
  </AvPanel>
</template>
