<script setup lang="ts">
// Controls panel: the four knobs that define the table, plus playback. Props /
// emits mirror SearchControls.vue — a pure presentational component, all state
// lives in useHashTable.

import { computed } from 'vue';
import type { AlgoStatus } from '@/types';
import { hashFns } from '@/algorithms/hashtable/hashFns';
import type { HashFnKey } from '@/algorithms/hashtable/hashFns';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvSlider from '@/components/ui/AvSlider.vue';

const props = defineProps<{
  /** The requested capacity; `effectiveCapacity` is what the table will use. */
  capacity: number;
  effectiveCapacity: number;
  /** Requested threshold, 0..1. `activeThreshold` is what will be enforced. */
  threshold: number;
  activeThreshold: number;
  hashFnKey: HashFnKey;
  speed: number;
  status: AlgoStatus;
  canEdit: boolean;
  isRunning: boolean;
  isPaused: boolean;
}>();

const emit = defineEmits<{
  'update:capacity': [value: number];
  'update:threshold': [value: number];
  'update:hashFnKey': [value: HashFnKey];
  'update:speed': [value: number];
  run: [];
  pause: [];
  reset: [];
  step: [];
}>();

const fnKeys = Object.keys(hashFns) as HashFnKey[];

// The threshold is a ratio everywhere else in the domain, but a percentage is
// what a slider can sensibly step through — so the conversion lives here rather
// than forcing 0.05-step floats on the model.
const thresholdPercent = computed(() => Math.round(props.threshold * 100));

// Whether the *requested* configuration is the one that will actually run. Both
// values get clamped (capacity to a power of two, threshold to the strategy's
// legal range), and a control that silently disagrees with its own readout is
// the sort of thing people file bugs about.
const capacityAdjusted = computed(() => props.capacity !== props.effectiveCapacity);
const thresholdAdjusted = computed(
  () => Math.abs(props.threshold - props.activeThreshold) > 0.001,
);
</script>

<template>
  <AvPanel title="Controls">
    <div class="space-y-4">
      <div>
        <AvSlider
          label="Capacity"
          :model-value="capacity"
          :min="4"
          :max="64"
          :step="4"
          suffix=" slots"
          :disabled="!canEdit"
          @update:model-value="emit('update:capacity', $event)"
        />
        <p v-if="capacityAdjusted" class="mt-1 text-[11px] text-slate-400">
          Rounded up to <span class="font-mono">{{ effectiveCapacity }}</span> — every capacity here
          is a power of two.
        </p>
      </div>

      <div>
        <AvSlider
          label="Resize threshold"
          :model-value="thresholdPercent"
          :min="25"
          :max="150"
          :step="5"
          suffix="%"
          :disabled="!canEdit"
          @update:model-value="emit('update:threshold', $event / 100)"
        />
        <p v-if="thresholdAdjusted" class="mt-1 text-[11px] text-slate-400">
          Capped at <span class="font-mono">{{ Math.round(activeThreshold * 100) }}%</span> — open
          addressing stores one key per slot, so it can never reach α = 1.
        </p>
      </div>

      <AvSlider
        label="Speed"
        :model-value="speed"
        :min="1"
        :max="100"
        suffix="%"
        @update:model-value="emit('update:speed', $event)"
      />
    </div>

    <!-- Hash function -->
    <div class="mt-4">
      <div class="mb-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">Hash function</div>
      <div class="grid grid-cols-2 gap-2">
        <AvButton
          v-for="key in fnKeys"
          :key="key"
          variant="selector"
          :active="key === hashFnKey"
          :disabled="!canEdit"
          @click="emit('update:hashFnKey', key)"
        >
          {{ hashFns[key].name }}
        </AvButton>
      </div>
      <p class="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {{ hashFns[hashFnKey].description }}
      </p>
    </div>

    <!-- Playback -->
    <div class="mt-5 grid grid-cols-2 gap-2">
      <AvButton v-if="!isRunning" variant="primary" class="col-span-2" @click="emit('run')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
          <path d="M8 5v14l11-7z" />
        </svg>
        {{ isPaused ? 'Resume' : 'Run' }}
      </AvButton>

      <AvButton v-else variant="warning" class="col-span-2" @click="emit('pause')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
          <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
        </svg>
        Pause
      </AvButton>

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

      <AvButton variant="neutral" :disabled="isRunning" @click="emit('step')"> Step ▶ </AvButton>
    </div>

    <p class="mt-3 text-center text-xs text-slate-400">
      Strategy, capacity, threshold &amp; hash function lock while a script is running.
    </p>
  </AvPanel>
</template>
