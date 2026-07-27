<script setup lang="ts">
import { computed } from 'vue';

// Range input plus the label row that reads out its current value. The
// wrapping <label> is what names the control for assistive tech, so no
// aria-label is needed here — but the readout carries units the raw number
// does not, which is what aria-valuetext exists for.

const props = withDefaults(
  defineProps<{
    label: string;
    min: number;
    max: number;
    step?: number;
    /** Appended to the readout and to aria-valuetext, e.g. '%'. */
    suffix?: string;
    disabled?: boolean;
  }>(),
  { step: 1, suffix: '', disabled: false },
);

const model = defineModel<number>({ required: true });

const valueText = computed(() => `${model.value}${props.suffix}`);

// Bound with :value + @input rather than v-model so the emit fires on every
// drag frame, matching what the hand-written sliders did.
function onInput(e: Event) {
  model.value = Number((e.target as HTMLInputElement).value);
}
</script>

<template>
  <label class="block">
    <div class="mb-1.5 flex items-center justify-between text-sm">
      <span class="font-medium text-slate-600 dark:text-slate-300">{{ label }}</span>
      <span class="font-mono text-indigo-500 dark:text-indigo-400">{{ valueText }}</span>
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="model"
      :disabled="disabled"
      :aria-valuetext="valueText"
      class="w-full"
      @input="onInput"
    />
  </label>
</template>
