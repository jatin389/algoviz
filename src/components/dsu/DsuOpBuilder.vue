<script setup lang="ts">
// Compose and edit the DSU operation script that `dsuScript` (dsuOps.ts)
// plays back one step at a time. Only rendered in `dsu` mode — Kruskal and
// Prim take a graph, not a script, and drawing this panel for them would be
// a set of controls that quietly do nothing.
//
// WHY THIS EXISTS INSTEAD OF ONE-CLICK COMMANDS. See the header of
// `dsuOps.ts` for the full argument: the interesting property of a disjoint
// set is what a *sequence* of operations does to tree height, and that is
// only visible if the whole sequence is composed before anything runs. This
// component's entire job is building that sequence and handing it up as a
// plain `DsuOp[]` — it holds no run state of its own, so scrubbing,
// stepping and the URL all stay the single source of truth `useMst` already
// is.
//
// Validation happens here, at entry, rather than only in the generator.
// `dsuScript` also drops out-of-range operations (see its own comment) —
// that path exists for a hand-edited URL, not for this form. A user typing
// into a control gets told immediately, in the units they typed in, instead
// of pressing Run and finding out three steps later that half their script
// was silently discarded.

import { computed, ref } from 'vue';
import type { DsuOp, DsuOpKind } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';

const props = defineProps<{
  ops: DsuOp[];
  /** Bounds every index this form will accept: valid nodes are 0..nodeCount-1. */
  nodeCount: number;
  canEdit: boolean;
}>();

const emit = defineEmits<{
  'update:ops': [ops: DsuOp[]];
  /** A fresh reproducible script from the current seed — `useMst.randomizeOpScript`. */
  randomize: [];
}>();

const kindDraft = ref<DsuOpKind>('union');
const aDraft = ref('0');
const bDraft = ref('0');
const error = ref<string | null>(null);

const maxIndex = computed(() => Math.max(0, props.nodeCount - 1));

/** `null` for anything that isn't a whole number in range — one gate for both fields. */
function parseIndex(raw: string): number | null {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0 || n > maxIndex.value) return null;
  return n;
}

function opLabel(op: DsuOp): string {
  return op.kind === 'union' ? `union(${op.a}, ${op.b})` : `find(${op.a})`;
}

function addOp() {
  if (!props.canEdit) return;

  const a = parseIndex(aDraft.value);
  if (a === null) {
    error.value = `Node index must be a whole number from 0 to ${maxIndex.value}.`;
    return;
  }

  if (kindDraft.value === 'find') {
    error.value = null;
    emit('update:ops', [...props.ops, { kind: 'find', a }]);
    return;
  }

  const b = parseIndex(bDraft.value);
  if (b === null) {
    error.value = `Node index must be a whole number from 0 to ${maxIndex.value}.`;
    return;
  }

  error.value = null;
  emit('update:ops', [...props.ops, { kind: 'union', a, b }]);
}

function removeOp(index: number) {
  if (!props.canEdit) return;
  emit(
    'update:ops',
    props.ops.filter((_, i) => i !== index),
  );
}

function clearOps() {
  if (!props.canEdit) return;
  emit('update:ops', []);
}
</script>

<template>
  <AvPanel title="Operation Script">
    <!-- Compose row -->
    <div class="flex flex-wrap items-end gap-2">
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-ink-muted">
          Op
        </span>
        <select
          v-model="kindDraft"
          :disabled="!canEdit"
          class="rounded-xl border border-line bg-surface-raised px-2.5 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="union">union</option>
          <option value="find">find</option>
        </select>
      </label>

      <label class="block w-16">
        <span class="mb-1.5 block text-sm font-medium text-ink-muted"> a </span>
        <input
          v-model="aDraft"
          type="number"
          :min="0"
          :max="maxIndex"
          :disabled="!canEdit"
          class="w-full rounded-xl border border-line bg-surface-raised px-2.5 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"
        />
      </label>

      <label v-if="kindDraft === 'union'" class="block w-16">
        <span class="mb-1.5 block text-sm font-medium text-ink-muted"> b </span>
        <input
          v-model="bDraft"
          type="number"
          :min="0"
          :max="maxIndex"
          :disabled="!canEdit"
          class="w-full rounded-xl border border-line bg-surface-raised px-2.5 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-50"
        />
      </label>

      <AvButton variant="quiet" :disabled="!canEdit" @click="addOp">Add</AvButton>
    </div>

    <p v-if="error" class="mt-1.5 text-xs text-danger">{{ error }}</p>
    <p class="mt-1.5 text-xs text-ink-faint">Valid nodes for this forest: 0 to {{ maxIndex }}.</p>

    <!-- The composed script -->
    <div class="mt-4">
      <p v-if="ops.length === 0" class="text-sm text-ink-faint">
        No operations yet — add one above, or generate a random script.
      </p>
      <ol v-else class="max-h-48 space-y-1 overflow-y-auto pr-1">
        <li
          v-for="(op, index) in ops"
          :key="index"
          class="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface-alt px-2.5 py-1.5 text-xs"
        >
          <span class="font-mono font-semibold text-ink">
            {{ index + 1 }}. {{ opLabel(op) }}
          </span>
          <button
            type="button"
            :disabled="!canEdit"
            class="rounded px-1.5 py-0.5 text-ink-faint transition-colors hover:bg-danger-soft hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
            :aria-label="`Remove ${opLabel(op)}`"
            @click="removeOp(index)"
          >
            ✕
          </button>
        </li>
      </ol>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-2">
      <AvButton variant="quiet" :disabled="!canEdit || ops.length === 0" @click="clearOps">
        Clear
      </AvButton>
      <AvButton variant="quiet" :disabled="!canEdit" @click="emit('randomize')">
        Random script
      </AvButton>
    </div>

    <p class="mt-3 text-xs text-ink-faint">
      Compose the whole script, then press Run — see the guide above for why one continuous history
      is the point.
    </p>
  </AvPanel>
</template>
