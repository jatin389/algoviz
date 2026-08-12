<script setup lang="ts">
import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvSlider from '@/components/ui/AvSlider.vue';
import AvTextField from '@/components/ui/AvTextField.vue';
import { SANDBOX_SIZE_MIN, SANDBOX_SIZE_MAX } from '@/sandbox/contract';

defineProps<{
  status: AlgoStatus;
  executing: boolean;
  canEdit: boolean;
  isRunning: boolean;
  isPaused: boolean;
  hasTape: boolean;
  seed: number;
}>();

const size = defineModel<number>('size', { required: true });
const speed = defineModel<number>('speed', { required: true });

const emit = defineEmits<{
  execute: [];
  cancel: [];
  run: [];
  pause: [];
  reset: [];
  randomize: [];
  'reset-source': [];
  'update:seed': [value: number];
}>();

// Same guard DatasetPanel uses: the field is text so it can be typed freely,
// but a non-integer keystroke is swallowed rather than emitting NaN upstream.
function onSeedInput(value: string) {
  const parsed = Number(value);
  if (Number.isInteger(parsed)) emit('update:seed', parsed);
}
</script>

<template>
  <AvPanel title="Run">
    <div class="flex flex-col gap-3">
      <div class="grid grid-cols-2 gap-2">
        <AvButton
          variant="primary"
          class="col-span-2"
          :disabled="executing"
          @click="emit('execute')"
        >
          {{ executing ? 'Running in sandbox…' : '▶ Run in sandbox' }}
        </AvButton>

        <AvButton v-if="executing" variant="danger" class="col-span-2" @click="emit('cancel')">
          Stop
        </AvButton>

        <template v-else>
          <AvButton
            v-if="isRunning"
            variant="warning"
            :disabled="!hasTape"
            @click="emit('pause')"
          >
            ❚❚ Pause
          </AvButton>
          <AvButton v-else variant="neutral" :disabled="!hasTape" @click="emit('run')">
            {{ isPaused ? '▶ Resume' : '▶ Replay' }}
          </AvButton>
          <AvButton variant="neutral" :disabled="!hasTape" @click="emit('reset')">Reset</AvButton>
        </template>
      </div>

      <AvSlider
        v-model="size"
        label="Input size"
        :min="SANDBOX_SIZE_MIN"
        :max="SANDBOX_SIZE_MAX"
        :disabled="!canEdit || executing"
      />
      <AvSlider v-model="speed" label="Speed" :min="1" :max="100" suffix="%" />

      <AvTextField
        label="Seed"
        monospace
        :model-value="String(seed)"
        :disabled="!canEdit || executing"
        @update:model-value="onSeedInput"
      />

      <div class="grid grid-cols-2 gap-2">
        <AvButton variant="quiet" :disabled="!canEdit || executing" @click="emit('randomize')">
          New seed
        </AvButton>
        <AvButton variant="quiet" :disabled="executing" @click="emit('reset-source')">
          Starter code
        </AvButton>
      </div>
    </div>
  </AvPanel>
</template>
