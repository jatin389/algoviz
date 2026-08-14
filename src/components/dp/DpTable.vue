<script setup lang="ts">
import { computed } from 'vue';
import type { DpAxes, DpCell, DpDep, DpTableData } from '@/algorithms/dp';
import { fmt } from '@/algorithms/dp';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvLegend from '@/components/ui/AvLegend.vue';
import { dpLayout } from './dpLayout';
import type { DpRect } from './dpLayout';

// The DP table, drawn as SVG.
//
// WHY SVG AND NOT AN HTML GRID. A CSS grid would render the cells with less
// code and would even scroll for free. What it cannot do is draw the arrows:
// a provenance arrow runs from the edge of one cell to the edge of another,
// and in HTML the only way to know where those edges are is to measure the
// DOM — a layout pass, a nextTick, and a re-render on every single step, for a
// component that re-renders up to 250 times a second at full speed. In SVG the
// same arrow is a subtraction, because `dpLayout.ts` already knows where every
// cell is. The arrows are the reason this category is worth visualizing at all
// (a table of numbers is a spreadsheet; a table of numbers with its
// dependencies drawn on top is dynamic programming), so they get to decide the
// technology.
//
// Dumb renderer, deliberately: it knows nothing about which of the eight
// algorithms produced the snapshot it is painting. The cursor, the deps, the
// chosen branch and the path all arrive pre-computed — from the generator
// during a run, or from the registry's pure `depsOf` on hover — so there is no
// per-algorithm branch anywhere in this file.

/**
 * The visual states a cell can be in, most specific last.
 *
 * `focus` is the odd one out: it is the cell the pointer is on, which is a
 * state of the *reader* rather than of the algorithm. It gets its own tone
 * anyway (a paler amber than `filling`) because sharing one would have the
 * table claim a cell is being computed when the run is not even started, and
 * it is deliberately absent from the legend, which documents what the
 * algorithm is doing rather than where the mouse is.
 */
type DpTone = 'empty' | 'filled' | 'path' | 'dep' | 'focus' | 'filling';

const props = withDefaults(
  defineProps<{
    /** Row-major, `null` where the fill has not reached yet. */
    table: DpTableData;
    axes: DpAxes;
    /** Shown beside the title — the static formula this table is an instance of. */
    recurrence?: string;
    /** The cell just written; null on a traceback step. */
    cursor?: DpCell | null;
    deps?: DpDep[];
    chosen?: DpCell | null;
    path?: DpCell[];
    /** The hovered cell and its dependencies, both supplied by the parent. */
    hoverCell?: DpCell | null;
    hoverDeps?: DpDep[];
    title?: string;
  }>(),
  {
    recurrence: '',
    cursor: null,
    deps: () => [],
    chosen: null,
    path: () => [],
    hoverCell: null,
    hoverDeps: () => [],
    title: 'Table',
  },
);

const emit = defineEmits<{
  /** The cell under the pointer, or null when it leaves the table. */
  'hover-cell': [cell: DpCell | null];
}>();

// Whole class names, never interpolated: a `fill-${tone}-400` built at runtime
// never reaches Tailwind's scanner, so the rule would not be emitted at all.
// Same table `AvAlgorithmSelector` keeps for its column count and `tones.ts`
// keeps for the graph canvas.
//
// The fills are all light or translucent so one text colour reads on every one
// of them. The alternative — a saturated fill per tone with white text — was
// tried first and lost: a table is mostly *values*, and a wall of full-strength
// colour drowns the numbers it is supposed to be annotating.
const TONE_CLASS: Record<DpTone, string> = {
  empty: 'fill-slate-100 dark:fill-slate-800/60',
  filled: 'fill-indigo-50 dark:fill-indigo-500/15',
  path: 'fill-emerald-200 dark:fill-emerald-500/40',
  dep: 'fill-sky-200 dark:fill-sky-500/40',
  focus: 'fill-amber-200 dark:fill-amber-500/30',
  filling: 'fill-amber-300 dark:fill-amber-500/60',
};

const LEGEND = [
  { label: 'Not computed', class: 'bg-slate-100 dark:bg-slate-800/60' },
  { label: 'Computed', class: 'bg-indigo-50 dark:bg-indigo-500/15' },
  { label: 'Filling now', class: 'bg-amber-300 dark:bg-amber-500/60' },
  { label: 'Read by this cell', class: 'bg-sky-200 dark:bg-sky-500/40' },
  { label: 'Traceback', class: 'bg-emerald-200 dark:bg-emerald-500/40' },
];

/** `"3,4"` — the key both the tone lookups and the arrow de-duplication use. */
function keyOf(cell: { row: number; col: number }): string {
  return `${cell.row},${cell.col}`;
}

// The table itself is authoritative about the grid's shape rather than the
// axes, because during the one tick where an input has changed but the player
// has not yet rebuilt the snapshot the two disagree — and drawing a cell that
// has no value is a crash, while drawing a cell that has no header is a blank
// label.
const rows = computed(() => props.table.length);
const cols = computed(() => props.table[0]?.length ?? 0);

const layout = computed(() => dpLayout({ rows: rows.value, cols: cols.value }));

const depKeys = computed(() => new Set(props.deps.map(keyOf)));
const hoverDepKeys = computed(() => new Set(props.hoverDeps.map(keyOf)));
const pathKeys = computed(() => new Set(props.path.map(keyOf)));

/**
 * Precedence, most specific first: what a cell is doing *right now* beats what
 * it has been doing, and being read beats being on the finished path (during
 * the fill nothing is on the path yet, so the two only ever collide when a
 * hover asks about a cell whose dependency is also a path cell — and there the
 * question being answered is the hover).
 */
function toneOf(row: number, col: number): DpTone {
  const key = `${row},${col}`;
  if (props.cursor && props.cursor.row === row && props.cursor.col === col) return 'filling';
  if (props.hoverCell && props.hoverCell.row === row && props.hoverCell.col === col) {
    return 'focus';
  }
  if (depKeys.value.has(key) || hoverDepKeys.value.has(key)) return 'dep';
  if (pathKeys.value.has(key)) return 'path';
  return props.table[row][col] === null ? 'empty' : 'filled';
}

/**
 * Shrink the value to fit its cell.
 *
 * A cell is 34px wide and its contents range from `0` to `102334155`
 * (fib(40)) or `9600000` (a matrix-chain cost), so a fixed font size either
 * wastes two thirds of the small cells or overflows the large ones. Digits in
 * the app's sans stack run about 0.6em, so `len * 0.6 * size <= 30` gives
 * `size <= 50 / len`; 13px is the cap because bigger than that stops looking
 * like a table. Rounded to a half pixel so identical-width values do not
 * jitter against each other.
 */
function fontSizeFor(text: string): number {
  return Math.round(Math.min(13, 50 / Math.max(1, text.length)) * 2) / 2;
}

/** Header labels are user data (`#3 w4 v5`, a whole word) and can be far too long. */
function shortLabel(text: string): string {
  return text.length > 7 ? `${text.slice(0, 6)}…` : text;
}

/** Appended to a cell's spoken label so its tone is not colour-only information. */
const TONE_SUFFIX: Record<DpTone, string> = {
  empty: '',
  filled: '',
  filling: ', being computed now',
  focus: '',
  dep: ', read by the current cell',
  path: ', on the traceback path',
};

interface CellView {
  key: string;
  row: number;
  col: number;
  rect: DpRect;
  text: string;
  fontSize: number;
  tone: DpTone;
  label: string;
}

/**
 * Every cell, fully resolved.
 *
 * Built in one pass here rather than by calling `cellRect`/`toneOf`/`fmt` from
 * the template, because at the 900-cell budget the template would otherwise run
 * some 3600 function calls per re-render and re-run all of them whenever any
 * unrelated prop changed. One computed means one pass per snapshot.
 */
const cells = computed<CellView[]>(() => {
  const out: CellView[] = [];

  for (let row = 0; row < rows.value; row++) {
    for (let col = 0; col < cols.value; col++) {
      const value = props.table[row][col];
      const text = fmt(value);
      const tone = toneOf(row, col);
      const rowName = props.axes.rowHeaders[row] ?? String(row);
      const colName = props.axes.colHeaders[col] ?? String(col);
      out.push({
        key: `${row},${col}`,
        row,
        col,
        rect: layout.value.cellRect(row, col),
        text,
        fontSize: fontSizeFor(text),
        tone,
        // Spoken aloud this reads "t by G: 3, read by the current cell" — the
        // row and column *names* rather than their indices, because for LCS the
        // indices are meaningless and the characters are the whole point. The
        // tone is spelled out in words too, so a cell's role is never carried
        // by colour alone.
        label:
          value === null
            ? `${rowName} by ${colName}: not computed yet`
            : `${rowName} by ${colName}: ${text}${TONE_SUFFIX[tone]}`,
      });
    }
  }
  return out;
});

/** A header cell: where its text goes, what it says, and what it says in full. */
interface HeaderView {
  key: number;
  x: number;
  y: number;
  text: string;
  full: string;
}

const colHeaders = computed<HeaderView[]>(() =>
  Array.from({ length: cols.value }, (_, col) => {
    const full = props.axes.colHeaders[col] ?? String(col);
    const rect = layout.value.colHeaderRect(col);
    return {
      key: col,
      // Sat against the bottom of the band rather than centred in it, so a
      // label reads as belonging to the column beneath it rather than floating
      // between the title row and the table.
      x: rect.x + layout.value.cell / 2,
      y: rect.y + rect.h - 8,
      text: shortLabel(full),
      full,
    };
  }),
);

const rowHeaders = computed<HeaderView[]>(() =>
  Array.from({ length: rows.value }, (_, row) => {
    const full = props.axes.rowHeaders[row] ?? String(row);
    const rect = layout.value.rowHeaderRect(row);
    return {
      key: row,
      x: rect.x + rect.w - 6,
      y: rect.y + rect.h / 2,
      text: shortLabel(full),
      full,
    };
  }),
);

interface ArrowLine {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  chosen: boolean;
  label: string;
}

/**
 * One arrow per distinct dependency cell, pointing at the cell that read it.
 *
 * De-duplicated by target cell because a recurrence can read the same cell from
 * two branches (matrix chain's splits share endpoints as the chain grows), and
 * two arrows stacked on the same line only make the stroke look heavier —
 * which is the visual language reserved for `chosen`.
 */
function arrowsTo(target: DpCell | null, deps: DpDep[], chosen: DpCell | null): ArrowLine[] {
  if (target === null) return [];

  const seen = new Set<string>();
  const out: ArrowLine[] = [];
  for (const dep of deps) {
    const key = keyOf(dep);
    if (seen.has(key)) continue;
    seen.add(key);

    const line = layout.value.arrow(dep, target);
    if (line === null) continue;
    out.push({
      key,
      ...line,
      chosen: chosen !== null && chosen.row === dep.row && chosen.col === dep.col,
      label: dep.label,
    });
  }
  // The chosen branch is drawn last so it lies on top of the branches it beat,
  // which matters on a dense table where several arrows converge on one cell.
  return out.sort((a, b) => Number(a.chosen) - Number(b.chosen));
}

const arrows = computed(() => arrowsTo(props.cursor, props.deps, props.chosen));

/**
 * The hover overlay's arrows, suppressed when the pointer is on the cell the
 * run is already explaining — otherwise the same relationships get drawn twice,
 * once solid and once dashed, which reads as two different claims.
 */
const hoverArrows = computed(() => {
  const cell = props.hoverCell;
  if (cell === null) return [];
  if (props.cursor && props.cursor.row === cell.row && props.cursor.col === cell.col) return [];
  return arrowsTo(cell, props.hoverDeps, null);
});

function onEnter(row: number, col: number) {
  emit('hover-cell', { row, col });
}
</script>

<template>
  <AvPanel class="flex h-full flex-col">
    <div class="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400">{{ title }}</h2>
      <code
        v-if="recurrence"
        class="rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs text-indigo-600 dark:bg-slate-800 dark:text-indigo-300"
        >{{ recurrence }}</code
      >
      <AvLegend :items="LEGEND" />
    </div>

    <!--
      overflow-auto, not a scaled-down SVG. At the 900-cell budget the table is
      ~1250px square; fitting that into a 700px column puts a cell at 19px and
      its contents below legibility. See dpLayout.ts's DEFAULT_CELL note — a
      legible table you scroll beats an illegible one you don't.
    -->
    <div
      class="max-h-[60vh] flex-1 overflow-auto rounded-xl bg-slate-50 p-3 dark:bg-slate-950/40"
      @pointerleave="emit('hover-cell', null)"
    >
      <svg
        :width="layout.width"
        :height="layout.height"
        :viewBox="layout.viewBox"
        class="block select-none"
      >
        <defs>
          <!--
            Two markers rather than one recoloured by `context-stroke`, which
            Safari still does not support: a marker that silently renders black
            in one browser is worse than a duplicated 6-line path.
          -->
          <marker
            id="dp-arrowhead"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 z" class="fill-slate-400 dark:fill-slate-500" />
          </marker>
          <marker
            id="dp-arrowhead-chosen"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 z" class="fill-rose-500" />
          </marker>
        </defs>

        <!-- Column headers -->
        <text
          v-for="header in colHeaders"
          :key="`col-${header.key}`"
          :x="header.x"
          :y="header.y"
          text-anchor="middle"
          dominant-baseline="central"
          class="fill-slate-500 text-[10px] font-semibold dark:fill-slate-400"
        >
          <title>{{ header.full }}</title>
          {{ header.text }}
        </text>

        <!-- Row headers -->
        <text
          v-for="header in rowHeaders"
          :key="`row-${header.key}`"
          :x="header.x"
          :y="header.y"
          text-anchor="end"
          dominant-baseline="central"
          class="fill-slate-500 text-[10px] font-semibold dark:fill-slate-400"
        >
          <title>{{ header.full }}</title>
          {{ header.text }}
        </text>

        <!-- The corner names both axes, so "a" and "b" on an LCS grid are not
             left for the reader to guess. -->
        <text
          v-if="axes.colTitle"
          :x="layout.pad + 4"
          :y="layout.pad + layout.header / 2 - 6"
          class="fill-slate-400 text-[9px] font-semibold uppercase tracking-wide"
        >
          {{ axes.colTitle }} →
        </text>
        <text
          v-if="axes.rowTitle"
          :x="layout.pad + 4"
          :y="layout.pad + layout.header / 2 + 8"
          class="fill-slate-400 text-[9px] font-semibold uppercase tracking-wide"
        >
          {{ axes.rowTitle }} ↓
        </text>

        <!-- Cells -->
        <g
          v-for="cell in cells"
          :key="cell.key"
          role="img"
          :aria-label="cell.label"
          :data-cell="cell.key"
          :data-tone="cell.tone"
          @pointerenter="onEnter(cell.row, cell.col)"
        >
          <title>{{ cell.label }}</title>
          <rect
            :x="cell.rect.x"
            :y="cell.rect.y"
            :width="cell.rect.w"
            :height="cell.rect.h"
            rx="4"
            class="transition-colors duration-150 ease-out"
            :class="TONE_CLASS[cell.tone]"
          />
          <text
            :x="cell.rect.x + cell.rect.w / 2"
            :y="cell.rect.y + cell.rect.h / 2"
            :font-size="cell.fontSize"
            text-anchor="middle"
            dominant-baseline="central"
            class="pointer-events-none font-semibold"
            :class="
              cell.tone === 'empty'
                ? 'fill-slate-400 dark:fill-slate-600'
                : 'fill-slate-800 dark:fill-slate-100'
            "
          >
            {{ cell.text }}
          </text>
        </g>

        <!--
          Arrows last, so they sit above the cells they connect. The hover set is
          dashed and muted because it answers a different question ("where would
          this cell have come from?") than the solid set ("where did this one
          just come from?") — same geometry, different tense.
        -->
        <g class="pointer-events-none">
          <line
            v-for="arrow in hoverArrows"
            :key="`hover-${arrow.key}`"
            :x1="arrow.x1"
            :y1="arrow.y1"
            :x2="arrow.x2"
            :y2="arrow.y2"
            stroke-width="1.5"
            stroke-dasharray="3 3"
            marker-end="url(#dp-arrowhead)"
            class="stroke-slate-400 dark:stroke-slate-500"
          />
          <line
            v-for="arrow in arrows"
            :key="arrow.key"
            :x1="arrow.x1"
            :y1="arrow.y1"
            :x2="arrow.x2"
            :y2="arrow.y2"
            :stroke-width="arrow.chosen ? 2.5 : 1.5"
            :marker-end="arrow.chosen ? 'url(#dp-arrowhead-chosen)' : 'url(#dp-arrowhead)'"
            :class="arrow.chosen ? 'stroke-rose-500' : 'stroke-slate-400 dark:stroke-slate-500'"
          >
            <title>{{ arrow.label }}</title>
          </line>
        </g>
      </svg>
    </div>

    <p class="mt-3 text-center text-xs text-slate-400">
      Hover any cell to see which cells its value was read from.
    </p>
  </AvPanel>
</template>
