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
import { TONE_BORDER, TONE_INK, toneLegend } from '@/theme/tones';

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

// `home slot` is a structural landmark (where this key's probe sequence
// starts), not a live algorithm state, so it borrows the `accent` chrome
// token the same way DsuForest's `root` does rather than claiming an
// AlgoTone — hence its own swatch below instead of a `toneLegend` entry.
// Tombstone reads as `rejected`, not `blocked`: `blocked` means impassable
// (a wall stops a walk cold), but a tombstone is the opposite — the whole
// reason it exists is that probes walk straight past it (see the template's
// own comment on the tombstone pill). `rejected`'s "considered and
// discarded, a past decision" is what a deleted entry actually is.
const LEGEND = toneLegend([
  { tone: 'probe', label: 'probing now' },
  { tone: 'probe', label: 'probed' },
  { tone: 'rejected', label: 'tombstone' },
  { tone: 'idle', label: 'empty' },
]);

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
  if (index === props.probeIndex) return 'bg-tone-probe/20 ring-1 ring-tone-probe';
  if (probed.value.has(index)) return 'bg-tone-probe/[0.07]';
  return '';
}
</script>

<template>
  <AvPanel title="Buckets" class="flex h-full flex-col">
    <template #header>
      <div class="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
        <span class="flex items-center gap-1.5"
          ><i class="h-3 w-3 rounded-mark bg-accent" />home slot</span
        >
      </div>
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
          :data-probing="index === probeIndex ? 'true' : undefined"
          class="grid grid-cols-[2.25rem_1.75rem_minmax(0,1fr)] items-center gap-2 rounded-lg px-1 py-1 transition-colors"
          :class="rowClass(index)"
        >
          <!-- Index gutter -->
          <span
            :data-home="index === homeIndex ? 'true' : undefined"
            class="rounded-md py-1 text-center font-mono text-xs tabular-nums"
            :class="index === homeIndex ? 'bg-accent font-bold text-accent-ink' : 'text-ink-muted'"
            >{{ index }}</span
          >

          <!-- Probe-order badge -->
          <span
            v-if="probeOrder(index) !== null"
            :data-probe-order="probeOrder(index)"
            class="rounded-md bg-tone-probe/80 py-0.5 text-center font-mono text-[10px] font-bold text-tone-probe-ink"
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
              :data-link-state="
                isResolved(entry.key) ? 'resolved' : isCursorLink(index, position) ? 'cursor' : undefined
              "
              class="inline-flex max-w-full items-center gap-1 truncate rounded-full border px-2 py-0.5 font-mono text-xs"
              :class="
                isResolved(entry.key)
                  ? `${TONE_BORDER.settled} bg-tone-settled/20 font-bold ${TONE_INK.settled}`
                  : isCursorLink(index, position)
                    ? `${TONE_BORDER.probe} bg-tone-probe/30 font-bold ${TONE_INK.probe}`
                    : 'border-line bg-surface-raised text-ink-muted'
              "
              >{{ entry.key }}</span
            >

            <!-- A tombstone is not an empty slot and must never look like one:
                 the whole reason it exists is that probes walk past it. -->
            <span
              v-if="bucket.state === 'tombstone'"
              data-role="tombstone"
              :class="`inline-flex items-center gap-1 rounded-full border border-dashed px-2 py-0.5 font-mono text-xs ${TONE_BORDER.rejected} ${TONE_INK.rejected}`"
              >✕ deleted</span
            >
            <span
              v-else-if="bucket.entries.length === 0"
              data-role="empty"
              class="font-mono text-xs text-ink-faint"
              >—</span
            >
          </div>
        </li>
      </ol>
    </div>
  </AvPanel>
</template>
