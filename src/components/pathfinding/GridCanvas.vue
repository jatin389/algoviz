<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  rows: { type: Number, required: true },
  cols: { type: Number, required: true },
  walls: { type: Set, required: true },
  start: { type: Object, required: true },
  end: { type: Object, required: true },
  visited: { type: Array, default: () => [] },
  frontier: { type: Array, default: () => [] },
  path: { type: Array, default: () => [] },
  canEdit: { type: Boolean, required: true },
});

const emit = defineEmits(['toggle-wall', 'place-start', 'place-end']);

const key = (row, col) => `${row},${col}`;

// 'wall' paints/erases walls by dragging; 'start'/'end' relocate the markers
// on the next click instead — this sidesteps fragile native drag-and-drop.
const mode = ref('wall');

// O(1) lookup sets built the same way BarChart builds its highlight sets.
const visitedSet = computed(() => new Set(props.visited.map((c) => key(c.row, c.col))));
const frontierSet = computed(() => new Set(props.frontier.map((c) => key(c.row, c.col))));
const pathSet = computed(() => new Set(props.path.map((c) => key(c.row, c.col))));

const cells = computed(() => {
  const list = [];
  for (let row = 0; row < props.rows; row++) {
    for (let col = 0; col < props.cols; col++) {
      list.push({ row, col, key: key(row, col) });
    }
  }
  return list;
});

function isStartCell(row, col) {
  return props.start.row === row && props.start.col === col;
}

function isEndCell(row, col) {
  return props.end.row === row && props.end.col === col;
}

// Color precedence: wall > path > frontier > visited > empty. Start/end are
// drawn as a separate marker layered on top, independent of this background.
function cellClass(cell) {
  const k = cell.key;
  if (props.walls.has(k)) return 'bg-slate-900 dark:bg-black';
  if (pathSet.value.has(k)) return 'bg-emerald-500';
  if (frontierSet.value.has(k)) return 'bg-amber-400';
  if (visitedSet.value.has(k)) return 'bg-sky-400/80';
  return 'bg-slate-100 dark:bg-slate-800/50';
}

// Whether the current drag stroke is adding walls or erasing them — decided
// by the first cell touched, then held steady for the rest of the drag so a
// path through a mix of wall/open cells doesn't flicker.
const isPainting = ref(false);
let paintAdding = true;

function stopPainting() {
  isPainting.value = false;
}

onMounted(() => window.addEventListener('mouseup', stopPainting));
onUnmounted(() => window.removeEventListener('mouseup', stopPainting));

function onMouseDown(row, col) {
  if (!props.canEdit) return;

  if (mode.value === 'start') {
    emit('place-start', { row, col });
    return;
  }
  if (mode.value === 'end') {
    emit('place-end', { row, col });
    return;
  }

  if (isStartCell(row, col) || isEndCell(row, col)) return;
  paintAdding = !props.walls.has(key(row, col));
  emit('toggle-wall', { row, col });
  isPainting.value = true;
}

function onMouseEnter(row, col) {
  if (!props.canEdit || mode.value !== 'wall' || !isPainting.value) return;
  if (isStartCell(row, col) || isEndCell(row, col)) return;
  const currentlyWall = props.walls.has(key(row, col));
  if (currentlyWall !== paintAdding) emit('toggle-wall', { row, col });
}
</script>

<template>
  <div class="av-card flex h-full flex-col p-4 sm:p-5">
    <div class="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Grid</h2>

      <!-- Legend -->
      <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span class="flex items-center gap-1.5"
          ><i class="h-3 w-3 rounded-sm bg-slate-900 dark:bg-black" />Wall</span
        >
        <span class="flex items-center gap-1.5"
          ><i class="h-3 w-3 rounded-sm bg-amber-400" />Frontier</span
        >
        <span class="flex items-center gap-1.5"
          ><i class="h-3 w-3 rounded-sm bg-sky-400/80" />Visited</span
        >
        <span class="flex items-center gap-1.5"
          ><i class="h-3 w-3 rounded-sm bg-emerald-500" />Path</span
        >
      </div>
    </div>

    <!-- Mode toggle -->
    <div class="mb-3 grid grid-cols-3 gap-2">
      <button
        v-for="option in [
          { value: 'wall', label: 'Draw Walls' },
          { value: 'start', label: 'Move Start' },
          { value: 'end', label: 'Move End' },
        ]"
        :key="option.value"
        type="button"
        :disabled="!canEdit"
        class="rounded-lg px-2 py-1.5 text-xs font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50"
        :class="
          mode === option.value
            ? 'bg-indigo-500 text-white shadow-sm shadow-indigo-500/30'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
        "
        @click="mode = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- Grid -->
    <div
      class="grid flex-1 select-none gap-px rounded-xl bg-slate-200 p-1 dark:bg-slate-800"
      :style="{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        aspectRatio: `${cols} / ${rows}`,
      }"
      @dragstart.prevent
    >
      <div
        v-for="cell in cells"
        :key="cell.key"
        class="relative flex items-center justify-center rounded-[2px] transition-colors duration-100"
        :class="[cellClass(cell), canEdit ? 'cursor-pointer' : 'cursor-default']"
        @mousedown.prevent="onMouseDown(cell.row, cell.col)"
        @mouseenter="onMouseEnter(cell.row, cell.col)"
      >
        <span
          v-if="isStartCell(cell.row, cell.col)"
          class="flex h-[70%] w-[70%] items-center justify-center rounded-full bg-green-500 text-[8px] font-bold text-white shadow"
          >S</span
        >
        <span
          v-else-if="isEndCell(cell.row, cell.col)"
          class="flex h-[70%] w-[70%] items-center justify-center rounded-full bg-rose-600 text-[8px] font-bold text-white shadow"
          >E</span
        >
      </div>
    </div>

    <p class="mt-3 text-center text-xs text-slate-400">
      Drag to draw walls, or switch mode to relocate start/end.
    </p>
  </div>
</template>
