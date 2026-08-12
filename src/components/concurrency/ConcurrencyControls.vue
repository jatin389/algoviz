<script setup lang="ts">
import type { AlgoStatus } from '@/types';
import { scenarios } from '@/concurrency/scenarios';
import type { ScenarioKey } from '@/concurrency/scenarios';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvSlider from '@/components/ui/AvSlider.vue';
import AvTextField from '@/components/ui/AvTextField.vue';

defineProps<{
  status: AlgoStatus;
  canEdit: boolean;
  isRunning: boolean;
  isPaused: boolean;
  hasSchedule: boolean;
  seed: number;
}>();

const scenarioKey = defineModel<ScenarioKey>('scenario', { required: true });
const speed = defineModel<number>('speed', { required: true });

const emit = defineEmits<{
  run: [];
  pause: [];
  reset: [];
  randomize: [];
  'update:seed': [value: number];
}>();

const entries = Object.entries(scenarios) as [ScenarioKey, (typeof scenarios)[ScenarioKey]][];

function onSeedInput(value: string) {
  const parsed = Number(value);
  if (Number.isInteger(parsed)) emit('update:seed', parsed);
}
</script>

<template>
  <AvPanel title="Scenario">
    <div class="flex flex-col gap-2">
      <AvButton
        v-for="[key, scenario] in entries"
        :key="key"
        variant="selector"
        class="text-left"
        :active="scenarioKey === key"
        :disabled="!canEdit"
        @click="scenarioKey = key"
      >
        <span class="block">
          <span class="block font-semibold">{{ scenario.name }}</span>
          <span class="block text-[11px] opacity-80">{{ scenario.description }}</span>
        </span>
      </AvButton>
    </div>

    <p class="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
      {{ scenarios[scenarioKey].bug }}
    </p>

    <div class="mt-4 grid grid-cols-2 gap-2">
      <AvButton v-if="isRunning" variant="warning" @click="emit('pause')">❚❚ Pause</AvButton>
      <AvButton v-else variant="primary" :disabled="!hasSchedule" @click="emit('run')">
        {{ isPaused ? '▶ Resume' : '▶ Play' }}
      </AvButton>
      <AvButton variant="neutral" :disabled="!hasSchedule" @click="emit('reset')">Reset</AvButton>
    </div>

    <div class="mt-4 flex flex-col gap-3">
      <AvSlider v-model="speed" label="Speed" :min="1" :max="100" suffix="%" />
      <AvTextField
        label="Seed"
        monospace
        :model-value="String(seed)"
        :disabled="!canEdit"
        @update:model-value="onSeedInput"
      />
      <AvButton variant="quiet" :disabled="!canEdit" @click="emit('randomize')">New seed</AvButton>
      <p class="text-[11px] text-slate-400 dark:text-slate-500">
        The seed only matters once a scenario is too large to check exhaustively — then it picks
        which interleavings get sampled.
      </p>
    </div>
  </AvPanel>
</template>
