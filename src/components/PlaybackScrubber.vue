<script setup lang="ts">
// History scrubber: lets the user step back through, or seek within, the
// snapshots useStepPlayer has already recorded for this run. It is a pure
// presentational component — all state lives in the composable and is passed
// down via props, actions bubble up as events.

import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvSlider from '@/components/ui/AvSlider.vue';

defineProps<{
  cursor: number;
  bufferedCount: number;
  fullyBuffered: boolean;
  canStepBack: boolean;
  canStepForward: boolean;
}>();

const emit = defineEmits<{
  seek: [index: number];
  'step-back': [];
  'step-forward': [];
  'skip-to-end': [];
}>();
</script>

<template>
  <AvPanel title="History">
    <!--
      max is bufferedCount - 1, NEVER a projected total step count. AvSlider
      binds :value + @input, so it fires on every drag frame; if the slider
      could address steps that haven't been recorded yet, one flick to the
      right would synchronously pump the generator through all of them in a
      single frame. "Skip to end" is the deliberate, explicit unbounded drain.
    -->
    <AvSlider
      v-if="bufferedCount > 0"
      label="Step"
      :min="0"
      :max="Math.max(0, bufferedCount - 1)"
      :suffix="` / ${Math.max(0, bufferedCount - 1)}`"
      :model-value="cursor"
      @update:model-value="emit('seek', $event)"
    />
    <p v-else class="text-sm text-ink-faint">Press Run or Step to begin.</p>

    <div class="mt-3 grid grid-cols-3 gap-2">
      <AvButton variant="quiet" :disabled="!canStepBack" @click="emit('step-back')">
        ◀ Step
      </AvButton>
      <AvButton variant="quiet" :disabled="!canStepForward" @click="emit('step-forward')">
        Step ▶
      </AvButton>
      <AvButton
        variant="quiet"
        :disabled="fullyBuffered && cursor === bufferedCount - 1"
        @click="emit('skip-to-end')"
      >
        Skip to end
      </AvButton>
    </div>
  </AvPanel>
</template>
