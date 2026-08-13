<script setup lang="ts">
// Everything useMst's `stats` computed carries, laid out via AvStatGrid —
// the same panel shape SearchStats.vue and GraphStats.vue use, with a status
// pill in the header and a row of tiles underneath.

import { computed } from 'vue';
import type { AlgoStatus } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvStatGrid from '@/components/ui/AvStatGrid.vue';

const props = withDefaults(
  defineProps<{
    stats: {
      finds: number;
      unions: number;
      compressions: number;
      maxDepth: number;
      totalWeight: number;
      components: number;
    };
    status: AlgoStatus;
    /** Standalone DSU mode has no graph, so "MST weight" has nothing to sum. */
    isDsuMode?: boolean;
  }>(),
  { isDsuMode: false },
);

const statusLabel = computed(
  () =>
    ({ idle: 'Idle', running: 'Running', paused: 'Paused', done: 'Done' })[props.status] ??
    props.status,
);
const statusClass = computed(
  () =>
    ({
      idle: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
      running: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
      paused: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
      done: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
    })[props.status],
);

// `maxDepth` is the one cell here that is not just a counter — it is the
// honest proof that union-by-rank does what its name claims. Every union in
// this category always hangs the shallower tree under the deeper one (see
// dsuOps.ts / disjointSet.ts), and the mathematical promise of that rule is
// that a forest built by unions alone never gets deeper than log2(n). Any
// other stat here (finds, unions, compressions) counts *operations*; this
// one is the only cell that measures the *shape* those operations produced,
// which is the thing union-by-rank was for in the first place. Watch it stay
// flat across a long random script and the claim stops being an assertion
// you have to take on faith.
const cells = computed(() => [
  { label: 'Finds', value: props.stats.finds.toLocaleString() },
  { label: 'Unions', value: props.stats.unions.toLocaleString() },
  { label: 'Compressions', value: props.stats.compressions.toLocaleString() },
  { label: 'Max Depth', value: props.stats.maxDepth.toLocaleString() },
  {
    label: 'MST Weight',
    value: props.isDsuMode ? '—' : props.stats.totalWeight.toLocaleString(),
  },
  { label: 'Components', value: props.stats.components.toLocaleString() },
]);
</script>

<template>
  <AvPanel title="Stats">
    <template #header>
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors"
        :class="statusClass"
      >
        {{ statusLabel }}
      </span>
    </template>

    <AvStatGrid :cells="cells" :columns="3" />
  </AvPanel>
</template>
