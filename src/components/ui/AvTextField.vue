<script setup lang="ts">
// Labelled text input primitive. Structure mirrors AvSlider.vue (label row +
// control, both wrapped in a single <label> so the control is named for
// assistive tech without a separate aria-label).

withDefaults(
  defineProps<{
    label: string;
    placeholder?: string;
    /** Inline validation message; renders in the danger color when set. */
    error?: string | null;
    disabled?: boolean;
    /** Renders the input in a mono font — used for arrays and seeds. */
    monospace?: boolean;
  }>(),
  { placeholder: '', error: null, disabled: false, monospace: false },
);

const model = defineModel<string>({ required: true });

// Bound with :value + @input rather than v-model so the emit fires on every
// keystroke, matching AvSlider's rationale for range inputs.
function onInput(e: Event) {
  model.value = (e.target as HTMLInputElement).value;
}
</script>

<template>
  <label class="block">
    <div class="mb-1.5 flex items-center justify-between text-sm">
      <span class="font-medium text-ink-muted">{{ label }}</span>
    </div>
    <input
      type="text"
      :value="model"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="!!error"
      class="w-full rounded-xl border bg-surface-raised px-3 py-2 text-sm text-ink transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      :class="[
        monospace ? 'font-mono' : '',
        error
          ? 'border-danger ring-1 ring-danger'
          : 'border-line',
      ]"
      @input="onInput"
    />
    <p v-if="error" class="mt-1.5 text-xs text-danger-ink">{{ error }}</p>
  </label>
</template>
