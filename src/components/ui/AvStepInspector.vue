<script setup lang="ts">
import { computed } from 'vue';
import AvPanel from './AvPanel.vue';

// "Why did this step do what it did" — one panel shared by DP, union-find/MST
// and hash-table visualizers. It knows nothing about any of the three: each
// feeds it a headline, a formula string and a row list built from its own
// step data, and this component only lays those three pieces out.

/** The palette a row's value can be painted in — the same four tones used
 * for pill/badge coloring elsewhere in the app (accepted/rejected, stable/
 * unstable, safe/buggy), spelled the same way so callers don't invent a
 * fifth name for "this was fine". */
export type InspectorTone = 'neutral' | 'good' | 'warn' | 'bad';

export interface InspectorRow {
  label: string;
  value: string;
  tone?: InspectorTone;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    /** Short prose, e.g. 'Accepted — joins two components'. */
    headline?: string | null;
    /** The hero line, rendered mono, e.g. 'dp[3][4] = max(dp[2][4]=5, 3+dp[2][1]=7) = 7'. */
    formula?: string | null;
    rows?: InspectorRow[];
    /** Shown only once headline, formula and rows are all absent. */
    empty?: string;
  }>(),
  {
    title: 'Why this step',
    headline: null,
    formula: null,
    rows: () => [],
    empty: 'Run a step to see how it was computed.',
  },
);

// Whole class names, never interpolated — same reasoning as
// AvAlgorithmSelector's GROUP_CLASS: a `text-${tone}-600` built at runtime
// never reaches Tailwind's scanner, so only literal keys guarantee the rule
// ships in the build.
const TONE_CLASS: Record<InspectorTone, string> = {
  neutral: 'text-slate-700 dark:text-slate-200',
  good: 'text-emerald-600 dark:text-emerald-400',
  warn: 'text-amber-600 dark:text-amber-400',
  bad: 'text-rose-600 dark:text-rose-400',
};

function toneClass(tone?: InspectorTone) {
  return TONE_CLASS[tone ?? 'neutral'];
}

const isEmpty = computed(() => !props.headline && !props.formula && props.rows.length === 0);
</script>

<template>
  <AvPanel :title="title">
    <p v-if="isEmpty" class="text-sm text-slate-500 dark:text-slate-400">{{ empty }}</p>

    <!-- space-y rather than per-block margins: any of the three pieces can be
         the first one present, so a fixed top margin on each would either
         double up or go missing depending on which are supplied. -->
    <div v-else class="space-y-3">
      <p v-if="headline" class="text-sm text-slate-600 dark:text-slate-300">{{ headline }}</p>

      <div
        v-if="formula"
        class="break-words rounded-xl bg-slate-50 p-3 font-mono text-sm text-slate-800 dark:bg-slate-800/50 dark:text-slate-100 sm:text-base"
      >
        {{ formula }}
      </div>

      <dl v-if="rows.length" class="space-y-1.5 text-sm">
        <div v-for="row in rows" :key="row.label" class="flex items-center justify-between gap-3">
          <dt class="text-slate-500 dark:text-slate-400">{{ row.label }}</dt>
          <dd class="break-words text-right font-mono" :class="toneClass(row.tone)">
            {{ row.value }}
          </dd>
        </div>
      </dl>
    </div>
  </AvPanel>
</template>
