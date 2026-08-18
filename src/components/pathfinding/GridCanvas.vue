<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { Coord } from '@/types';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvLegend from '@/components/ui/AvLegend.vue';
import { TONE_MARK, toneLegend } from '@/theme/tones';

/** One square of the rendered grid, precomputed once per rows×cols change. */
interface GridCell {
  row: number;
  col: number;
  /** The same "row,col" string the walls Set is keyed by. */
  key: string;
}

/** What a press on a cell does. */
type GridMode = 'wall' | 'start' | 'end';

const props = withDefaults(
  defineProps<{
    rows: number;
    cols: number;
    walls: Set<string>;
    start: Coord;
    end: Coord;
    visited?: Coord[];
    frontier?: Coord[];
    path?: Coord[];
    canEdit: boolean;
  }>(),
  {
    visited: () => [],
    frontier: () => [],
    path: () => [],
  },
);

const emit = defineEmits<{
  'toggle-wall': [cell: Coord];
  'place-start': [cell: Coord];
  'place-end': [cell: Coord];
}>();

const key = (row: number, col: number) => `${row},${col}`;

// 'wall' paints/erases walls by dragging; 'start'/'end' relocate the markers
// on the next press instead — this sidesteps fragile native drag-and-drop.
const mode = ref<GridMode>('wall');

const MODE_LABELS: Record<GridMode, string> = {
  wall: 'Draw Walls',
  start: 'Move Start',
  end: 'Move End',
};

// Entries rather than a second literal, so the button labels and the grid's
// accessible name can never drift apart.
const MODE_OPTIONS = Object.entries(MODE_LABELS) as [GridMode, string][];

// O(1) lookup sets built the same way BarChart builds its highlight sets.
const visitedSet = computed(() => new Set(props.visited.map((c) => key(c.row, c.col))));
const frontierSet = computed(() => new Set(props.frontier.map((c) => key(c.row, c.col))));
const pathSet = computed(() => new Set(props.path.map((c) => key(c.row, c.col))));

// Grouped by row so each row can carry role="row"; `display: contents` keeps
// the wrappers out of the CSS grid layout entirely.
const cells = computed(() => {
  const grid: GridCell[][] = [];
  for (let row = 0; row < props.rows; row++) {
    const cols: GridCell[] = [];
    for (let col = 0; col < props.cols; col++) {
      cols.push({ row, col, key: key(row, col) });
    }
    grid.push(cols);
  }
  return grid;
});

function isStartCell(row: number, col: number) {
  return props.start.row === row && props.start.col === col;
}

function isEndCell(row: number, col: number) {
  return props.end.row === row && props.end.col === col;
}

// Wall -> blocked (impassable). Path -> trace (the reconstructed route, same
// as a DP traceback). Frontier -> probe (the cells under evaluation right
// now). Visited -> settled (already-visited cells, a done deal by the time
// the run moves on).
const LEGEND = toneLegend([
  { tone: 'blocked', label: 'Wall' },
  { tone: 'probe', label: 'Frontier' },
  { tone: 'settled', label: 'Visited' },
  { tone: 'trace', label: 'Path' },
]);

// Color precedence: wall > path > frontier > visited > empty. Start/end are
// drawn as a separate marker layered on top, independent of this background.
function cellClass(cell: GridCell) {
  const k = cell.key;
  if (props.walls.has(k)) return TONE_MARK.blocked;
  if (pathSet.value.has(k)) return TONE_MARK.trace;
  if (frontierSet.value.has(k)) return TONE_MARK.probe;
  if (visitedSet.value.has(k)) return TONE_MARK.settled;
  // An untouched cell is background, not a mark. `tone-idle` is sized to be a
  // legible data mark (3:1 against the surface), which on a grid of hundreds of
  // empty cells reads as a wall of grey and drowns the few cells that matter.
  // The bar chart is the opposite case — there an untouched bar IS the data, so
  // it keeps `tone-idle`.
  return 'bg-surface-alt';
}

// The spoken twin of cellClass — same checks, with the start/end marker layer
// read out first because that is what the cell reads as to a sighted user.
function cellState(cell: GridCell) {
  if (isStartCell(cell.row, cell.col)) return 'start';
  if (isEndCell(cell.row, cell.col)) return 'end';
  if (props.walls.has(cell.key)) return 'wall';
  if (pathSet.value.has(cell.key)) return 'path';
  if (frontierSet.value.has(cell.key)) return 'frontier';
  if (visitedSet.value.has(cell.key)) return 'visited';
  return 'empty';
}

// One-based, matching the aria-rowindex convention and how anyone would count
// squares out loud; data-key stays zero-based because the walls Set is.
function cellLabel(cell: GridCell) {
  return `Row ${cell.row + 1}, column ${cell.col + 1}, ${cellState(cell)}`;
}

const gridLabel = computed(() => `Pathfinding grid, ${MODE_LABELS[mode.value]} mode`);

// Whether the current drag stroke is adding walls or erasing them — decided
// by the first cell touched, then held steady for the rest of the drag so a
// path through a mix of wall/open cells doesn't flicker.
const isPainting = ref(false);
let paintAdding = true;

function stopPainting() {
  isPainting.value = false;
}

// pointercancel matters as much as pointerup here: the browser fires it
// instead when it steals the gesture (a scroll takes over, the tab hides),
// and a stroke left running would repaint on the next stray hover.
onMounted(() => {
  window.addEventListener('pointerup', stopPainting);
  window.addEventListener('pointercancel', stopPainting);
});
onUnmounted(() => {
  window.removeEventListener('pointerup', stopPainting);
  window.removeEventListener('pointercancel', stopPainting);
});

// ---- Roving tabindex ---------------------------------------------------------
// Exactly one cell is in the tab order; the arrow keys move which one, so a
// keyboard user tabs past the grid in one press instead of rows×cols presses.
const focused = ref<Coord>({ row: 0, col: 0 });
const gridEl = ref<HTMLElement | null>(null);

const clamp = (value: number, count: number) => Math.min(Math.max(value, 0), count - 1);

function focusCell(row: number, col: number) {
  focused.value = { row, col };
  // Querying by data-key beats an array of :ref callbacks under a nested
  // v-for, which would have to be rebuilt every time rows×cols changes.
  gridEl.value?.querySelector<HTMLElement>(`[data-key="${row},${col}"]`)?.focus();
}

/** Arrow movement clamps at the edges — wrapping would lose the user's place. */
function moveFocus(from: GridCell, rowStep: number, colStep: number) {
  focusCell(clamp(from.row + rowStep, props.rows), clamp(from.col + colStep, props.cols));
}

/** The one place the mode dispatch lives; pointer and keyboard both land here. */
function activate(cell: GridCell) {
  if (!props.canEdit) return;

  // Whatever the user last acted on becomes the tab stop, so tabbing back into
  // the grid resumes there rather than jumping to the top-left corner.
  focused.value = { row: cell.row, col: cell.col };

  if (mode.value === 'start') {
    emit('place-start', { row: cell.row, col: cell.col });
    return;
  }
  if (mode.value === 'end') {
    emit('place-end', { row: cell.row, col: cell.col });
    return;
  }

  if (isStartCell(cell.row, cell.col) || isEndCell(cell.row, cell.col)) return;
  paintAdding = !props.walls.has(cell.key);
  emit('toggle-wall', { row: cell.row, col: cell.col });
  isPainting.value = true;
}

function onPointerDown(e: PointerEvent, cell: GridCell) {
  // Browsers implicitly capture the pointer to the element where a touch
  // started, so every subsequent move event stays targeted at that one cell
  // and `pointerenter` never fires on its siblings — drag-paint would die
  // after the first cell on touch. Releasing the capture restores the
  // mouse-like behavior this grid is built around.
  (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  activate(cell);
}

// Space/Enter share activate's body, but no button stays held afterwards, so
// the stroke has to end immediately — otherwise the next hover would paint.
function activateByKey(cell: GridCell) {
  activate(cell);
  isPainting.value = false;
}

function onPointerEnter(cell: GridCell) {
  if (!props.canEdit || mode.value !== 'wall' || !isPainting.value) return;
  if (isStartCell(cell.row, cell.col) || isEndCell(cell.row, cell.col)) return;
  const currentlyWall = props.walls.has(cell.key);
  if (currentlyWall !== paintAdding) emit('toggle-wall', { row: cell.row, col: cell.col });
}
</script>

<template>
  <AvPanel class="flex h-full flex-col">
    <div class="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-faint">Grid</h2>

      <!-- Legend -->
      <AvLegend :items="LEGEND" />
    </div>

    <!-- Mode toggle -->
    <div class="mb-3 grid grid-cols-3 gap-2">
      <AvButton
        v-for="[value, label] in MODE_OPTIONS"
        :key="value"
        variant="toggle"
        :active="mode === value"
        :disabled="!canEdit"
        @click="mode = value"
      >
        {{ label }}
      </AvButton>
    </div>

    <!-- Grid. touch-none only while editable: it is what lets a finger drag
         paint instead of scrolling, but during a run there is nothing to paint
         and swallowing the scroll would trap the page under the grid. -->
    <div
      ref="gridEl"
      role="grid"
      :aria-label="gridLabel"
      aria-describedby="grid-help"
      class="grid flex-1 select-none gap-px rounded-xl bg-line p-1"
      :class="canEdit ? 'touch-none' : ''"
      :style="{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        aspectRatio: `${cols} / ${rows}`,
      }"
      @dragstart.prevent
    >
      <!-- display:contents, so the real cells stay direct children of the CSS
           grid above while role="grid" still gets genuine rows. -->
      <div v-for="(gridRow, r) in cells" :key="r" role="row" class="contents">
        <div
          v-for="cell in gridRow"
          :key="cell.key"
          role="gridcell"
          :data-key="cell.key"
          :tabindex="focused.row === cell.row && focused.col === cell.col ? 0 : -1"
          :aria-label="cellLabel(cell)"
          class="relative flex items-center justify-center rounded-mark transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          :class="[cellClass(cell), canEdit ? 'cursor-pointer' : 'cursor-default']"
          @pointerdown.prevent="onPointerDown($event, cell)"
          @pointerenter="onPointerEnter(cell)"
          @keydown.up.prevent="moveFocus(cell, -1, 0)"
          @keydown.down.prevent="moveFocus(cell, 1, 0)"
          @keydown.left.prevent="moveFocus(cell, 0, -1)"
          @keydown.right.prevent="moveFocus(cell, 0, 1)"
          @keydown.home.prevent="focusCell(cell.row, 0)"
          @keydown.end.prevent="focusCell(cell.row, cols - 1)"
          @keydown.space.prevent="activateByKey(cell)"
          @keydown.enter="activateByKey(cell)"
        >
          <span
            v-if="isStartCell(cell.row, cell.col)"
            class="flex h-[70%] w-[70%] items-center justify-center rounded-full bg-ok text-[8px] font-bold text-ink-inverse shadow"
            >S</span
          >
          <span
            v-else-if="isEndCell(cell.row, cell.col)"
            class="flex h-[70%] w-[70%] items-center justify-center rounded-full bg-danger text-[8px] font-bold text-ink-inverse shadow"
            >E</span
          >
        </div>
      </div>
    </div>

    <p id="grid-help" class="mt-3 text-center text-xs text-ink-faint">
      Drag or press Space to draw walls. Arrow keys move, Enter places. Switch mode to relocate
      start/end.
    </p>
  </AvPanel>
</template>
