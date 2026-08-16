<script setup lang="ts">
// Playback controls for the DP table: speed, and the four transport buttons.
//
// Props and emits deliberately mirror `SearchControls.vue` one for one, minus
// the dataset controls (which live in `DpInputPanel` here, since a DP dataset
// is six different shapes rather than one array) and plus `step`. Keeping the
// shape identical is what lets the view wire this up by eye — every category's
// controls panel takes the same status/canEdit/isRunning/isPaused quartet and
// bubbles the same verbs.
//
// Pure presentational component: all state lives in `useDp` and arrives as
// props, all actions bubble up as events.

import { computed } from 'vue';
import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvSlider from '@/components/ui/AvSlider.vue';

const props = defineProps<{
  speed: number;
  /**
   * Declared and unused in the template, exactly as `SearchControls` declares
   * it: the panel's contract is the quartet every category passes, and a view
   * that had to remember which categories want `status` and which do not is a
   * worse trade than one dormant prop.
   */
  status: AlgoStatus;
  canEdit: boolean;
  isRunning: boolean;
  isPaused: boolean;
  /** False while the input is invalid — Run would refuse anyway, so it is disabled. */
  canRun: boolean;
}>();

const emit = defineEmits<{
  'update:speed': [value: number];
  run: [];
  pause: [];
  reset: [];
  step: [];
}>();

// The hint changes rather than disappearing, because "why is Run greyed out",
// "why can't I type in the input panel" and "why did my edit clear the table"
// are all questions this one line can answer, and only one applies at a time.
const hint = computed(() => {
  if (!props.canRun) return 'Fix the input before running.';
  if (!props.canEdit) return 'The algorithm and its input lock while the table fills.';
  return 'Editing the input clears the table and starts over.';
});
</script>

<template>
  <AvPanel title="Controls">
    <AvSlider
      label="Speed"
      :model-value="speed"
      :min="1"
      :max="100"
      suffix="%"
      @update:model-value="emit('update:speed', $event)"
    />

    <div class="mt-5 grid grid-cols-2 gap-2">
      <!-- Run / Resume -->
      <AvButton
        v-if="!isRunning"
        variant="primary"
        class="col-span-2"
        :disabled="!canRun"
        @click="emit('run')"
      >
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

      <!-- One cell at a time. Starts the run from idle, which is how the
           player's own stepForward behaves — reading a recurrence one cell at a
           time is the point of the category, so it should not require pressing
           Run first. -->
      <AvButton variant="neutral" :disabled="!canRun" @click="emit('step')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-4 w-4"
        >
          <path d="M6 5v14l9-7z" />
          <path d="M17 5h2v14h-2z" />
        </svg>
        Step
      </AvButton>
    </div>

    <p class="mt-3 text-center text-xs text-ink-faint">{{ hint }}</p>
  </AvPanel>
</template>
