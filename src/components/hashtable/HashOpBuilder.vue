<script setup lang="ts">
// Composing the op script — this domain's dataset panel.
//
// A hash table is only interesting once it has a history, so what is edited
// here is a small program rather than an array of numbers. Bulk load and force
// a collision are authoring shortcuts, not op kinds: they expand into ordinary
// inserts the instant they are pressed, which is what keeps the script a plain
// list of insert/search/delete and keeps a future URL codec trivial.
//
// Pure presentation, like every other panel in this app: state lives in
// useHashTable, actions bubble up as events.

import { computed, ref } from 'vue';
import type { HashOp, HashOpKind } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvTextField from '@/components/ui/AvTextField.vue';

const props = defineProps<{
  script: readonly HashOp[];
  canEdit: boolean;
  seed: number;
  /** Transient feedback from the parent, e.g. which bucket a collision targets. */
  notice?: string | null;
}>();

const emit = defineEmits<{
  add: [kind: HashOpKind, key: string];
  remove: [index: number];
  clear: [];
  'bulk-load': [];
  'force-collision': [];
  'update:seed': [value: number];
  'randomize-seed': [];
}>();

const KINDS: { kind: HashOpKind; label: string }[] = [
  { kind: 'insert', label: 'Insert' },
  { kind: 'search', label: 'Search' },
  { kind: 'delete', label: 'Delete' },
];

/**
 * How an op reads in the list. Colour carries the same information as the
 * word. These are chrome tokens, not algorithm tones: a script entry's kind
 * (insert/search/delete) is a UI action classification, not a live state the
 * running algorithm is painting onto the visualization — the same distinction
 * that keeps a Run/Reset button on `ok`/`danger` rather than on a tone.
 * insert creates (ok), search only reads (accent, the app's neutral
 * informational colour), delete destroys (danger).
 */
const KIND_CLASS: Record<HashOpKind, string> = {
  insert: 'bg-ok-soft text-ok-ink',
  search: 'bg-accent-soft text-accent-ink',
  delete: 'bg-danger-soft text-danger-ink',
};

const kind = ref<HashOpKind>('insert');
const draft = ref('');

/**
 * Alphanumeric only, and the restriction is load-bearing rather than fussy: the
 * script is meant to survive a round trip through a URL, and a codec that has
 * to escape commas, colons and percent signs inside keys is a codec that will
 * eventually be got wrong. Twelve characters is a display limit — longer keys
 * turn a bucket row into a paragraph.
 */
const KEY_PATTERN = /^[A-Za-z0-9]{1,12}$/;

const error = computed(() => {
  if (draft.value === '') return null;
  return KEY_PATTERN.test(draft.value) ? null : 'Letters and digits only, up to 12 characters.';
});

const canAdd = computed(() => props.canEdit && draft.value !== '' && error.value === null);

function submit() {
  if (!canAdd.value) return;
  emit('add', kind.value, draft.value);
  draft.value = '';
}

const onSeed = (e: Event) => emit('update:seed', Number((e.target as HTMLInputElement).value));
</script>

<template>
  <AvPanel title="Operation script">
    <!-- Compose one operation -->
    <div class="grid grid-cols-3 gap-2">
      <AvButton
        v-for="option in KINDS"
        :key="option.kind"
        variant="selector"
        :active="kind === option.kind"
        :disabled="!canEdit"
        @click="kind = option.kind"
      >
        {{ option.label }}
      </AvButton>
    </div>

    <div class="mt-3 flex items-end gap-2">
      <div class="min-w-0 flex-1">
        <AvTextField
          v-model="draft"
          label="Key"
          placeholder="cat"
          monospace
          :error="error"
          :disabled="!canEdit"
          @keydown.enter="submit()"
        />
      </div>
      <AvButton variant="primary" class="mb-[1px]" :disabled="!canAdd" @click="submit()">
        Add
      </AvButton>
    </div>

    <!-- Authoring shortcuts -->
    <div class="mt-3 grid grid-cols-3 gap-2">
      <AvButton variant="quiet" :disabled="!canEdit" @click="emit('bulk-load')">
        Bulk load
      </AvButton>
      <AvButton variant="quiet" :disabled="!canEdit" @click="emit('force-collision')">
        Force collision
      </AvButton>
      <AvButton variant="quiet" :disabled="!canEdit || script.length === 0" @click="emit('clear')">
        Clear
      </AvButton>
    </div>

    <p v-if="notice" class="mt-2 text-xs text-warn-ink">{{ notice }}</p>

    <!-- Seed: bulk-loaded keys are drawn from it, so the same seed rebuilds the
         same script — the reason there is no Math.random anywhere near here. -->
    <label class="mt-3 block">
      <div class="mb-1.5 flex items-center justify-between text-sm">
        <span class="font-medium text-ink-muted">Seed</span>
        <button
          type="button"
          class="text-xs font-semibold text-accent hover:underline disabled:opacity-50"
          :disabled="!canEdit"
          @click="emit('randomize-seed')"
        >
          Randomize
        </button>
      </div>
      <input
        type="number"
        :value="seed"
        :disabled="!canEdit"
        class="w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"
        @input="onSeed"
      />
    </label>

    <!-- The script -->
    <p v-if="script.length === 0" class="mt-4 text-sm text-ink-faint">
      No operations yet — add one, or bulk load a handful of keys.
    </p>
    <ol v-else class="mt-4 max-h-56 space-y-1 overflow-y-auto pr-1">
      <li
        v-for="(op, index) in script"
        :key="`${index}-${op.kind}-${op.key}`"
        class="flex items-center gap-2 rounded-lg bg-surface-alt px-2 py-1 text-xs"
      >
        <span class="w-6 text-right font-mono tabular-nums text-ink-faint">{{ index + 1 }}</span>
        <span class="rounded px-1.5 py-0.5 font-semibold uppercase" :class="KIND_CLASS[op.kind]">{{
          op.kind
        }}</span>
        <span class="min-w-0 flex-1 truncate font-mono text-ink-muted">{{
          op.key
        }}</span>
        <button
          type="button"
          class="shrink-0 rounded px-1.5 text-ink-faint hover:text-danger disabled:opacity-40"
          :disabled="!canEdit"
          :aria-label="`Remove operation ${index + 1}`"
          @click="emit('remove', index)"
        >
          ✕
        </button>
      </li>
    </ol>
  </AvPanel>
</template>
