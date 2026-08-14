<script setup lang="ts">
// The table itself: one row per bucket, index gutter on the left, contents on
// the right.
//
// An HTML grid rather than SVG, which is the opposite of what the other canvas
// components in this app do. Two reasons, both about text. Nothing here needs
// to be drawn — there are no edges, no arrows, no geometry, only a list of
// labelled rows — and the labels are user-typed keys of unpredictable width,
// which SVG cannot reflow. A chain of six keys in SVG is a manual text-measuring
// exercise; in a flex row it is free, and it stays selectable and searchable.
//
// It is a pure presentational component: every highlight is computed from the
// props it is handed, so scrubbing backwards repaints it exactly.

import { computed } from 'vue';
import type { HashBucket, HashPhase } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvLegend from '@/components/ui/AvLegend.vue';

const props = withDefaults(
  defineProps<{
    buckets: readonly HashBucket[];
    /** Where the current key's probe sequence starts. */
    homeIndex?: number | null;
    /** The bucket under the cursor right now. */
    probeIndex?: number | null;
    /** Every index probed so far in this operation, in order. */
    probeSeq?: readonly number[];
    phase?: HashPhase;
    /** The key the current operation is about; matched pills are called out. */
    activeKey?: string | null;
    /**
     * Only the collision *family* matters here, not which of the three open
     * strategies is running: chaining stacks keys inside one bucket, open
     * addressing spreads them across many, and every layout decision below
     * follows from that one difference.
     */
    chaining?: boolean;
  }>(),
  {
    homeIndex: null,
    probeIndex: null,
    probeSeq: () => [],
    phase: 'idle',
    activeKey: null,
    chaining: false,
  },
);

const LEGEND = [
  { label: 'home slot', class: 'bg-indigo-500' },
  { label: 'probing now', class: 'bg-amber-400' },
  { label: 'probed', class: 'bg-amber-400/30' },
  { label: 'tombstone', class: 'bg-rose-400/60' },
  { label: 'empty', class: 'bg-slate-200 dark:bg-slate-700' },
];

const probed = computed(() => new Set(props.probeSeq));

/**
 * The number in the badge on a probed row.
 *
 * Open addressing: which probe reached this slot, 1-based — the sequence visits
 * distinct slots, so its position in `probeSeq` is unambiguous.
 * Chaining: every probe re-examines the home bucket, so a position would always
 * read "1"; the count of links walked is the number that actually moves.
 */
function probeOrder(index: number): number | null {
  if (!probed.value.has(index)) return null;
  if (props.chaining) return props.probeSeq.length;
  return props.probeSeq.indexOf(index) + 1;
}

/**
 * Which chain link the cursor sits on, or -1. `probeSeq.length - 1` because a
 * chaining walk pushes the home index once per link examined — see the note on
 * `probeSeq` in `algorithms/hashtable/ops.ts`.
 */
const chainCursor = computed(() =>
  props.chaining && props.probeSeq.length > 0 ? props.probeSeq.length - 1 : -1,
);

function isCursorLink(index: number, position: number): boolean {
  if (!props.chaining || props.phase === 'idle') return false;
  return index === props.homeIndex && position === chainCursor.value;
}

/** The pill for the key an operation just landed on, so a hit reads as a hit. */
function isResolved(key: string): boolean {
  if (key !== props.activeKey) return false;
  return props.phase === 'found' || props.phase === 'inserted' || props.phase === 'updated';
}

function rowClass(index: number): string {
  if (index === props.probeIndex) return 'bg-amber-400/20 ring-1 ring-amber-400';
  if (probed.value.has(index)) return 'bg-amber-400/[0.07]';
  return '';
}
</script>

<template>
  <AvPanel title="Buckets" class="flex h-full flex-col">
    <template #header>
      <AvLegend :items="LEGEND" />
    </template>

    <!-- A scroll container, never a shrink: at capacity 64 the rows must stay
         the same readable size they are at capacity 8, because the thing being
         compared across capacities is how crowded the table looks. -->
    <div class="max-h-[32rem] flex-1 overflow-y-auto pr-1">
      <ol class="space-y-1">
        <li
          v-for="(bucket, index) in buckets"
          :key="index"
          :data-bucket="index"
          :data-state="bucket.state"
          :data-home="index === homeIndex ? 'true' : undefined"
          class="grid grid-cols-[2.25rem_1.75rem_minmax(0,1fr)] items-center gap-2 rounded-lg px-1 py-1 transition-colors"
          :class="rowClass(index)"
        >
          <!-- Index gutter -->
          <span
            class="rounded-md py-1 text-center font-mono text-xs tabular-nums"
            :class="
              index === homeIndex
                ? 'bg-indigo-500 font-bold text-white'
                : 'text-slate-400 dark:text-slate-500'
            "
            >{{ index }}</span
          >

          <!-- Probe-order badge -->
          <span
            v-if="probeOrder(index) !== null"
            :data-probe-order="probeOrder(index)"
            class="rounded-md bg-amber-400/80 py-0.5 text-center font-mono text-[10px] font-bold text-amber-950"
            :title="chaining ? 'links walked' : 'probe number'"
            >{{ chaining ? '↓' : '' }}{{ probeOrder(index) }}</span
          >
          <span v-else />

          <!-- Contents -->
          <div class="flex min-w-0 flex-wrap items-center gap-1">
            <span
              v-for="(entry, position) in bucket.entries"
              :key="entry.key"
              data-role="entry"
              :data-key="entry.key"
              class="inline-flex max-w-full items-center gap-1 truncate rounded-full border px-2 py-0.5 font-mono text-xs"
              :class="
                isResolved(entry.key)
                  ? 'border-emerald-400 bg-emerald-400/20 font-bold text-emerald-700 dark:text-emerald-300'
                  : isCursorLink(index, position)
                    ? 'border-amber-400 bg-amber-400/30 font-bold text-amber-800 dark:text-amber-200'
                    : 'border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              "
              >{{ entry.key }}</span
            >

            <!-- A tombstone is not an empty slot and must never look like one:
                 the whole reason it exists is that probes walk past it. -->
            <span
              v-if="bucket.state === 'tombstone'"
              data-role="tombstone"
              class="inline-flex items-center gap-1 rounded-full border border-dashed border-rose-400/70 px-2 py-0.5 font-mono text-xs text-rose-500 dark:text-rose-400"
              >✕ deleted</span
            >
            <span
              v-else-if="bucket.entries.length === 0"
              data-role="empty"
              class="font-mono text-xs text-slate-300 dark:text-slate-600"
              >—</span
            >
          </div>
        </li>
      </ol>
    </div>
  </AvPanel>
</template>
