<script setup lang="ts">
// The code panel: two views of the same running algorithm, switched by the
// header toggle.
//
//   Pseudocode — the hand-written prose from algorithms/pseudocode.ts.
//   Source     — the generator file itself, highlighting the `yield` the
//                generator is currently suspended at.
//
// Both are driven by the same tag on the step snapshot; the caller resolves it
// into a pseudocode index (`activeLine`) and source lines (`activeSourceLines`).
// This component knows nothing about sorting, so any category can reuse it.

import { computed, nextTick, ref, watch } from 'vue';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';

type Mode = 'pseudo' | 'source';

const props = withDefaults(
  defineProps<{
    /** Pseudocode lines. Empty renders the "not yet written" state. */
    lines: readonly string[];
    /** The generator's own text, newline-separated. */
    source: string;
    /** Filename shown above the source, e.g. `bubbleSort.ts`. */
    sourceFile?: string;
    /** 0-based index into `lines`; null means no highlight. */
    activeLine?: number | null;
    /** 0-based indices into the source's lines; empty means no highlight. */
    activeSourceLines?: readonly number[];
    title?: string;
  }>(),
  { sourceFile: '', activeLine: null, activeSourceLines: () => [], title: 'Code' },
);

// Which view is showing is this panel's own business: nothing outside reads it,
// no other state depends on it, and it deliberately does not go into the URL —
// two sorters in compare mode would fight over the parameter.
const mode = ref<Mode>('pseudo');

const sourceLines = computed(() => props.source.split('\n'));
const displayLines = computed(() => (mode.value === 'source' ? sourceLines.value : props.lines));

function isActive(index: number): boolean {
  return mode.value === 'source'
    ? props.activeSourceLines.includes(index)
    : index === props.activeLine;
}

// Comments carry no execution, so they recede — otherwise a generator's JSDoc
// header competes with the live line for attention.
const COMMENT = /^\s*(\/\/|\/\*|\*)/;
function isComment(line: string): boolean {
  return mode.value === 'source' && COMMENT.test(line);
}

/** Where to scroll: the first highlighted line, whichever mode is showing. */
const scrollTarget = computed(() =>
  mode.value === 'source' ? (props.activeSourceLines[0] ?? null) : props.activeLine,
);

const list = ref<HTMLElement | null>(null);

// A source file runs well past the panel's max height, so without this the
// highlight scrolls out of view and the panel looks frozen mid-run.
watch([scrollTarget, mode], async () => {
  if (scrollTarget.value === null) return;
  await nextTick();
  const active = list.value?.querySelector('[data-active="true"]');
  // jsdom leaves scrollIntoView undefined, so guard rather than blow up a test
  // that happens to mount this panel.
  active?.scrollIntoView?.({ block: 'nearest' });
});
</script>

<template>
  <AvPanel :title="title" class="max-h-96 overflow-y-auto">
    <template #header>
      <div class="flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/50">
        <AvButton variant="toggle" :active="mode === 'pseudo'" @click="mode = 'pseudo'">
          Pseudocode
        </AvButton>
        <AvButton variant="toggle" :active="mode === 'source'" @click="mode = 'source'">
          Source
        </AvButton>
      </div>
    </template>

    <p
      v-if="mode === 'source' && sourceFile"
      class="mb-2 font-mono text-[0.65rem] uppercase tracking-wider text-slate-400 dark:text-slate-500"
    >
      {{ sourceFile }}
    </p>

    <p v-if="displayLines.length === 0" class="text-xs text-slate-400 dark:text-slate-500">
      Pseudocode isn't written for this algorithm yet — switch to Source to watch the generator
      itself.
    </p>
    <ol v-else ref="list" class="space-y-0.5 text-xs">
      <li
        v-for="(line, index) in displayLines"
        :key="index"
        :data-active="isActive(index)"
        class="flex gap-3 rounded px-1.5 py-0.5 transition-colors"
        :class="
          isActive(index)
            ? 'bg-amber-400/20 text-amber-800 dark:text-amber-300'
            : isComment(line)
              ? 'text-slate-400/70 dark:text-slate-600'
              : 'text-slate-500 dark:text-slate-400'
        "
      >
        <span
          class="w-5 flex-none text-right tabular-nums"
          :class="
            isActive(index)
              ? 'font-semibold text-amber-600 dark:text-amber-400'
              : 'text-slate-400 dark:text-slate-600'
          "
          >{{ index + 1 }}</span
        >
        <!-- Leading spaces in `line` are the algorithm's actual indentation, so
             they must render literally instead of being collapsed like normal
             inline text. -->
        <span class="whitespace-pre font-mono">{{ line }}</span>
      </li>
    </ol>
  </AvPanel>
</template>
