<script setup lang="ts">
// A plain textarea with a gutter, not a code-editor library.
//
// Deliberate: the whole app ships two runtime dependencies (vue, vue-router),
// and pulling a full editor in for v1 would roughly double that footprint for
// syntax colouring. Everything the feature actually needs — typing, tabs that
// indent instead of escaping the field, and a legible monospace surface — is a
// textarea plus twenty lines. Swapping in CodeMirror later touches only this
// component.

import { computed, ref } from 'vue';
import AvPanel from '@/components/ui/AvPanel.vue';

const props = defineProps<{
  modelValue: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const textarea = ref<HTMLTextAreaElement | null>(null);

const lineNumbers = computed(() => {
  const count = props.modelValue.split('\n').length;
  return Array.from({ length: count }, (_, i) => i + 1);
});

/** Keep the gutter aligned while the textarea scrolls. */
const scrollTop = ref(0);
function onScroll(event: Event) {
  scrollTop.value = (event.target as HTMLTextAreaElement).scrollTop;
}

/**
 * Tab indents rather than moving focus. Escape restores tabbing out, so the
 * editor never becomes a keyboard trap for anyone navigating without a mouse.
 */
const tabEscapes = ref(false);

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    tabEscapes.value = true;
    return;
  }
  if (event.key !== 'Tab' || tabEscapes.value) return;

  event.preventDefault();
  const field = textarea.value;
  if (!field) return;

  const { selectionStart, selectionEnd, value } = field;
  const next = `${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`;
  emit('update:modelValue', next);

  // Restore the caret after Vue has written the new value back into the DOM.
  requestAnimationFrame(() => {
    field.selectionStart = field.selectionEnd = selectionStart + 2;
  });
}

function onInput(event: Event) {
  tabEscapes.value = false;
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
}
</script>

<template>
  <AvPanel title="Your algorithm">
    <template #header>
      <span class="text-[11px] text-ink-faint">
        Tab indents · Esc then Tab to leave
      </span>
    </template>

    <div
      class="relative flex max-h-[420px] min-h-[260px] overflow-hidden rounded-xl bg-surface-alt font-mono text-xs"
    >
      <!-- Gutter. aria-hidden: the line numbers are decoration, and a screen
           reader announcing 60 bare integers before the code is pure noise. -->
      <div
        aria-hidden="true"
        class="select-none overflow-hidden border-r border-line bg-surface-alt py-3 text-right"
        :style="{ minWidth: '2.75rem' }"
      >
        <!-- 2.75rem is tuned to fit two digits in the current mono face at
             text-xs; revisit this value if the mono face ever changes. -->
        <div :style="{ transform: `translateY(${-scrollTop}px)` }">
          <div
            v-for="n in lineNumbers"
            :key="n"
            class="px-2 leading-5 text-ink-faint"
          >
            {{ n }}
          </div>
        </div>
      </div>

      <textarea
        ref="textarea"
        :value="modelValue"
        :disabled="disabled"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        aria-label="Algorithm source code"
        class="flex-1 resize-none bg-transparent p-3 leading-5 text-ink outline-none disabled:opacity-60"
        @input="onInput"
        @keydown="onKeydown"
        @scroll="onScroll"
      />
    </div>
  </AvPanel>
</template>
