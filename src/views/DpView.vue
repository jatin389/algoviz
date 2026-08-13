<script setup lang="ts">
import { computed } from 'vue';
import { useDp } from '@/composables/useDp';
import { algorithms, fmt } from '@/algorithms/dp';
import type { DpCell, DpDep } from '@/algorithms/dp';
import type { InspectorRow } from '@/components/ui/AvStepInspector.vue';
import AvAlgorithmSelector from '@/components/ui/AvAlgorithmSelector.vue';
import AvStepInspector from '@/components/ui/AvStepInspector.vue';
import CodePanel from '@/components/CodePanel.vue';
import PlaybackScrubber from '@/components/PlaybackScrubber.vue';
import DpControls from '@/components/dp/DpControls.vue';
import DpGuide from '@/components/dp/DpGuide.vue';
import DpInputPanel from '@/components/dp/DpInputPanel.vue';
import DpStats from '@/components/dp/DpStats.vue';
import DpTable from '@/components/dp/DpTable.vue';

const dp = useDp();

/**
 * `dp[4]` for the one-row tables, `dp[3][4]` for the rest.
 *
 * The generators make the same distinction (`cell1`/`cell2` in `_utils.ts`),
 * and it matters more than it looks: writing `dp[0][7]` for Fibonacci would
 * describe a two-dimensional table that does not exist, and the inspector sits
 * directly beneath a code panel that spells the recurrence the other way.
 */
function cellName(cell: DpCell): string {
  return dp.dims.value.rows === 1 ? `dp[${cell.col}]` : `dp[${cell.row}][${cell.col}]`;
}

function isChosen(dep: DpDep): boolean {
  const chosen = dp.view.chosen;
  return chosen !== null && chosen.row === dep.row && chosen.col === dep.col;
}

/**
 * One inspector row per cell the recurrence read.
 *
 * This is the same list the arrows are drawn from, in text: the arrows say
 * *where* a value came from and these say *what* it was, and having both means
 * the picture is still readable when several arrows converge on one cell.
 */
const inspectorRows = computed<InspectorRow[]>(() =>
  dp.view.deps.map((dep) => ({
    label: dep.label,
    value: `${cellName(dep)} = ${fmt(dep.value)}`,
    // The winning branch is 'good' for the same reason its arrow is red and
    // thick: on a cell with four branches, which one won is the only part of
    // the step anyone needs to remember.
    tone: isChosen(dep) ? ('good' as const) : ('neutral' as const),
  })),
);

/** Which of the two phases the step on screen belongs to, in words. */
const headline = computed(() => {
  if (dp.current.value === null) return null;
  if (dp.view.cursor !== null) return `Computing ${cellName(dp.view.cursor)}`;
  if (dp.view.result !== null) return 'Finished — the answer is decoded from the table';
  if (dp.view.path.length > 0) return 'Tracing back through the branches that won';
  return null;
});
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]">
    <!-- Left column -->
    <div class="flex flex-col gap-4">
      <AvAlgorithmSelector
        v-model="dp.algoKey.value"
        :algorithms="algorithms"
        :columns="2"
        :disabled="!dp.canEdit.value"
      />
      <DpGuide />
      <DpInputPanel
        :algo-key="dp.algoKey.value"
        :input="dp.input.value"
        :can-edit="dp.canEdit.value"
        @update:input="dp.setInput($event)"
        @shuffle="dp.randomizeSeed()"
      />
      <DpControls
        v-model:speed="dp.speed.value"
        :status="dp.status.value"
        :can-edit="dp.canEdit.value"
        :is-running="dp.isRunning.value"
        :is-paused="dp.isPaused.value"
        :can-run="dp.canRun.value"
        @run="dp.run()"
        @pause="dp.pause()"
        @reset="dp.reset()"
        @step="dp.stepForward()"
      />
      <PlaybackScrubber
        :cursor="dp.cursor.value"
        :buffered-count="dp.bufferedCount.value"
        :fully-buffered="dp.fullyBuffered.value"
        :can-step-back="dp.canStepBack.value"
        :can-step-forward="dp.canStepForward.value"
        @seek="dp.seek($event)"
        @step-back="dp.stepBack()"
        @step-forward="dp.stepForward()"
        @skip-to-end="dp.skipToEnd()"
      />
    </div>

    <!-- Right column -->
    <div class="flex flex-col gap-4">
      <DpStats
        :cells-filled="dp.stats.value.cellsFilled"
        :fillable="dp.stats.value.fillable"
        :rows="dp.stats.value.rows"
        :cols="dp.stats.value.cols"
        :naive-calls="dp.stats.value.naiveCalls"
        :speedup="dp.stats.value.speedup"
        :steps="dp.stepCount.value"
        :elapsed-ms="dp.elapsedMs.value"
        :status="dp.status.value"
        :result="dp.view.result"
        :truncated="dp.truncated.value"
      />

      <DpTable
        :table="dp.table.value"
        :axes="dp.axes.value"
        :recurrence="dp.recurrence.value"
        :cursor="dp.view.cursor"
        :deps="dp.view.deps"
        :chosen="dp.view.chosen"
        :path="dp.view.path"
        :hover-cell="dp.hoverCell.value"
        :hover-deps="dp.hoverDeps.value"
        @hover-cell="dp.setHoverCell($event)"
      />

      <AvStepInspector
        :headline="headline"
        :formula="dp.view.explain"
        :rows="inspectorRows"
        empty="Run a step to see how a cell was computed."
      />

      <CodePanel
        :lines="dp.pseudocodeLines.value"
        :source="dp.sourceCode.value.text"
        :source-file="dp.sourceCode.value.file"
        :active-line="dp.activeLine.value"
        :active-source-lines="dp.activeSourceLines.value"
      />
    </div>
  </div>
</template>
