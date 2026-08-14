<script setup lang="ts">
// Two-column layout, same shape as SearchView: left column composes and
// drives a run, right column watches it happen. What makes this view
// different from SearchView is the dataset itself — a hash table has nothing
// worth looking at until it has a *history* (collisions need neighbours,
// tombstones need a prior delete), so the left column's centerpiece is
// HashOpBuilder, a tiny program editor, rather than a single "generate array"
// button.
//
// This view holds no algorithm state of its own — every prop below is either
// a straight passthrough of useHashTable's surface or a piece of purely
// presentational UI state (the collision notice, same role as SearchView's
// customError) that never feeds the algorithm.

import { computed, ref, watch } from 'vue';
import { useHashTable } from '@/composables/useHashTable';
import { algorithms } from '@/algorithms/hashtable';
import type { InspectorRow, InspectorTone } from '@/components/ui/AvStepInspector.vue';
import type { HashPhase } from '@/types';
import AvAlgorithmSelector from '@/components/ui/AvAlgorithmSelector.vue';
import AvStepInspector from '@/components/ui/AvStepInspector.vue';
import HashGuide from '@/components/hashtable/HashGuide.vue';
import HashControls from '@/components/hashtable/HashControls.vue';
import HashOpBuilder from '@/components/hashtable/HashOpBuilder.vue';
import HashStats from '@/components/hashtable/HashStats.vue';
import BucketArray from '@/components/hashtable/BucketArray.vue';
import PlaybackScrubber from '@/components/PlaybackScrubber.vue';
import CodePanel from '@/components/CodePanel.vue';

const hashTable = useHashTable();

// Switching strategies mid-view resets any finished run to a clean state, the
// same rule SearchView applies to switching algorithms — a bucket grid left
// painted by chaining while the selector now says "linear probing" would be
// a table showing a lie, not merely a stale one.
watch(hashTable.strategyKey, () => {
  if (hashTable.isDone.value) hashTable.reset();
});

// "Force collision" is the one authoring action whose result isn't visible
// until the script actually runs — the whole point is to promise a collision
// in advance. The bucket number it targets is transient, UI-only feedback:
// it never feeds the algorithm and does not belong in useHashTable, exactly
// the way SearchView keeps its custom-array parse error local to the view.
const collisionNotice = ref<string | null>(null);

function onForceCollision() {
  const bucket = hashTable.forceCollision();
  collisionNotice.value = `Collision forced — 3 keys were queued to land in bucket ${bucket}.`;
}

function onClearScript() {
  hashTable.clearScript();
  collisionNotice.value = null;
}

// Whether chaining is the running strategy — BucketArray's one behavioural
// flag, because it changes what a "probe" even means (walking a chain vs.
// jumping between slots), not merely how the row is colored.
const chaining = computed(() => hashTable.strategyKey.value === 'chaining');

// ---- Step inspector ---------------------------------------------------------
//
// `view.explain` is already the teaching payload — the arithmetic with this
// step's real numbers substituted in — so it goes straight into the formula
// slot verbatim rather than being re-derived. The headline and rows exist to
// give the same snapshot a second, more scannable reading: what phase is
// this, and what were the raw inputs the formula above is built from.

const PHASE_HEADLINE: Record<HashPhase, string> = {
  idle: 'Press Run or Step to begin.',
  hashing: 'Hashing the key to find its home slot.',
  probing: 'Collision — walking the probe sequence.',
  inserted: 'Inserted.',
  updated: 'Key already present — value overwritten.',
  found: 'Found.',
  'not-found': 'Not found.',
  deleted: 'Deleted.',
  resizing: 'Load factor exceeded the threshold — growing the table.',
  rehashed: 'Rehashing an existing key into the grown table.',
};

const PHASE_TONE: Record<HashPhase, InspectorTone> = {
  idle: 'neutral',
  hashing: 'neutral',
  probing: 'warn',
  inserted: 'good',
  updated: 'good',
  found: 'good',
  'not-found': 'bad',
  deleted: 'good',
  resizing: 'warn',
  rehashed: 'neutral',
};

// Nothing has happened yet on the very first (idle) snapshot, and the
// inspector's own empty state ("Run a step to see how it was computed") reads
// better than a headline/formula/rows trio full of dashes.
const hasStep = computed(() => hashTable.view.op !== null);

const stepHeadline = computed(() =>
  hasStep.value ? PHASE_HEADLINE[hashTable.view.phase] : null,
);

const stepRows = computed<InspectorRow[]>(() => {
  if (!hasStep.value) return [];
  const v = hashTable.view;
  const rows: InspectorRow[] = [
    { label: 'Operation', value: v.op ?? '—' },
    { label: 'Key', value: v.key ?? '—' },
  ];
  if (v.hash !== null) rows.push({ label: 'Hash', value: String(v.hash) });
  if (v.homeIndex !== null) rows.push({ label: 'Home index', value: String(v.homeIndex) });
  if (v.probeIndex !== null) rows.push({ label: 'Probe index', value: String(v.probeIndex) });
  rows.push({ label: 'Probes this op', value: String(v.probeSeq.length) });
  rows.push({ label: 'Phase', value: v.phase, tone: PHASE_TONE[v.phase] });
  return rows;
});
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]">
    <!-- Left column -->
    <div class="flex flex-col gap-4">
      <AvAlgorithmSelector
        v-model="hashTable.strategyKey.value"
        :algorithms="algorithms"
        :columns="2"
        :disabled="!hashTable.canEdit.value"
      />
      <HashGuide />
      <HashControls
        :capacity="hashTable.capacity.value"
        :effective-capacity="hashTable.startCapacity.value"
        :threshold="hashTable.threshold.value"
        :active-threshold="hashTable.activeThreshold.value"
        :hash-fn-key="hashTable.hashFnKey.value"
        :speed="hashTable.speed.value"
        :status="hashTable.status.value"
        :can-edit="hashTable.canEdit.value"
        :is-running="hashTable.isRunning.value"
        :is-paused="hashTable.isPaused.value"
        @update:capacity="hashTable.capacity.value = $event"
        @update:threshold="hashTable.threshold.value = $event"
        @update:hash-fn-key="hashTable.hashFnKey.value = $event"
        @update:speed="hashTable.speed.value = $event"
        @run="hashTable.run()"
        @pause="hashTable.pause()"
        @reset="hashTable.reset()"
        @step="hashTable.stepForward()"
      />
      <HashOpBuilder
        :script="hashTable.script.value"
        :can-edit="hashTable.canEdit.value"
        :seed="hashTable.seed.value"
        :notice="collisionNotice"
        @add="hashTable.addOp"
        @remove="hashTable.removeOp"
        @clear="onClearScript()"
        @bulk-load="hashTable.bulkLoad()"
        @force-collision="onForceCollision()"
        @update:seed="hashTable.seed.value = $event"
        @randomize-seed="hashTable.randomizeSeed()"
      />
      <PlaybackScrubber
        :cursor="hashTable.cursor.value"
        :buffered-count="hashTable.bufferedCount.value"
        :fully-buffered="hashTable.fullyBuffered.value"
        :can-step-back="hashTable.canStepBack.value"
        :can-step-forward="hashTable.canStepForward.value"
        @seek="hashTable.seek($event)"
        @step-back="hashTable.stepBack()"
        @step-forward="hashTable.stepForward()"
        @skip-to-end="hashTable.skipToEnd()"
      />
    </div>

    <!-- Right column -->
    <div class="flex flex-col gap-4">
      <HashStats
        :size="hashTable.view.size"
        :capacity="hashTable.view.capacity"
        :load-factor="hashTable.view.loadFactor"
        :threshold="hashTable.activeThreshold.value"
        :probes="hashTable.stats.probes"
        :collisions="hashTable.stats.collisions"
        :resizes="hashTable.stats.resizes"
        :avg-probes="hashTable.avgProbes.value"
      />
      <BucketArray
        class="flex-1"
        :buckets="hashTable.buckets.value"
        :home-index="hashTable.view.homeIndex"
        :probe-index="hashTable.view.probeIndex"
        :probe-seq="hashTable.view.probeSeq"
        :phase="hashTable.view.phase"
        :active-key="hashTable.view.key"
        :chaining="chaining"
      />
      <AvStepInspector
        title="Why this step"
        :headline="stepHeadline"
        :formula="hashTable.view.explain"
        :rows="stepRows"
      />
      <CodePanel
        :lines="hashTable.pseudocodeLines.value"
        :active-line="hashTable.activeLine.value"
        :source="hashTable.sourceCode.value.text"
        :source-file="hashTable.sourceCode.value.file"
        :active-source-lines="hashTable.activeSourceLines.value"
      />
    </div>
  </div>
</template>
