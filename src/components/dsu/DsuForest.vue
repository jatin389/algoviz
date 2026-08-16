<script setup lang="ts">
import { computed } from 'vue';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvLegend from '@/components/ui/AvLegend.vue';
import { TONE_FILL, TONE_STROKE, TONE_BORDER, TONE_SOFT_BG, toneLegend } from '@/theme/tones';
import { layoutForest } from './forestLayout';

// The disjoint-set forest, drawn as trees, with the raw parent array printed
// underneath it.
//
// The pairing is the point, and it is lifted straight from `HeapView.vue`,
// which shows a binary heap as a tree *and* as its backing array side by side.
// The lesson is the same one in both places: the picture is a story we tell
// about an array, and a learner who only ever sees the picture never quite
// believes that `parent[6] = 2` is all there is. It costs almost nothing to
// render and it is the cheapest way to make path compression concrete — you
// watch three numbers in the array all change to the same value at the instant
// the tree flattens.
//
// Geometry comes from `forestLayout.ts`, which is pure and separately tested;
// this component only paints. Nothing here measures the DOM, matching
// `TreeDiagram.vue` and `GraphCanvas.vue`.

const props = withDefaults(
  defineProps<{
    /** `parent[i] === i` marks a root. The snapshot's array, verbatim. */
    parent: number[];
    /** Set sizes by index; shown in the array row's tooltip. */
    setSize?: number[];
    /** Ranks by index; shown on roots, where rank is the height bound. */
    rank?: number[];
    /** The walk to a root being animated right now. */
    findPath?: number[];
    /** Pointers re-hung onto the root by path compression on this step. */
    compressed?: number[];
    /** Node under the cursor. */
    active?: number | null;
    /** Display labels by index; falls back to the index itself. */
    labels?: string[];
    title?: string;
    hint?: string;
  }>(),
  {
    setSize: () => [],
    rank: () => [],
    findPath: () => [],
    compressed: () => [],
    active: null,
    labels: () => [],
    title: 'Disjoint-Set Forest',
    hint: 'Each tree is one set. An arrow points from a node to its parent; a node pointing at itself is a root.',
  },
);

/**
 * Paint states, in the order they win.
 *
 * `compressed` beats `path` deliberately: on the compression step a re-hung
 * node is *also* on the walked path, and what matters at that instant is that
 * its pointer moved, not that it was visited on the way up.
 */
type NodeState = 'cursor' | 'compressed' | 'path' | 'root' | 'default';

// cursor is the write-in-progress node (active); compressed is a pointer that
// just got re-hung onto its root (settled); path is a node the current find
// walk passed through (probe). `root` and `default` are both otherwise-idle
// nodes, but a tree with no visual distinction between "a root" and "any
// other resting node" would defeat the entire point of this diagram — so
// root borrows the `accent` chrome token instead of an algorithm tone: it is
// a structural landmark (this pointer happens to point at itself), not a
// state the algorithm is currently in.
const NODE_FILL: Record<NodeState, string> = {
  cursor: TONE_FILL.active,
  compressed: TONE_FILL.settled,
  path: TONE_FILL.probe,
  root: 'fill-accent',
  default: TONE_FILL.idle,
};

// Whole class names, never interpolated — a `bg-${tone}-500` built at runtime
// never reaches Tailwind's scanner, so the rule would not ship. Same table
// AvStatGrid and AvAlgorithmSelector keep for their own variants.
const CELL_CLASS: Record<NodeState, string> = {
  cursor: `${TONE_BORDER.active} ${TONE_SOFT_BG.active}`,
  compressed: `${TONE_BORDER.settled} ${TONE_SOFT_BG.settled}`,
  path: `${TONE_BORDER.probe} ${TONE_SOFT_BG.probe}`,
  root: 'border-accent/60 bg-accent-soft',
  default: `${TONE_BORDER.idle} ${TONE_SOFT_BG.idle}`,
};

// Root has no AlgoTone (see NODE_FILL above), so it cannot travel through
// `toneLegend`/`AvLegend` — it is rendered as its own swatch in the template,
// right where it used to sit first in this list.
const LEGEND = toneLegend([
  { tone: 'probe', label: 'On find path' },
  { tone: 'settled', label: 'Re-hung' },
  { tone: 'active', label: 'Cursor' },
]);

// Sets rather than repeated `Array.includes` — these are read once per node per
// repaint, and a run can repaint many times a second.
const pathSet = computed(() => new Set(props.findPath));
const compressedSet = computed(() => new Set(props.compressed));

const layout = computed(() => layoutForest(props.parent));
const nodeById = computed(() => new Map(layout.value.nodes.map((node) => [node.id, node])));

function stateFor(index: number): NodeState {
  if (index === props.active) return 'cursor';
  if (compressedSet.value.has(index)) return 'compressed';
  if (pathSet.value.has(index)) return 'path';
  if (props.parent[index] === index) return 'root';
  return 'default';
}

function labelFor(index: number): string {
  return props.labels[index] ?? String(index);
}

const isEmpty = computed(() => props.parent.length === 0);

/** Roots carry their rank, since rank is only meaningful — and only used — there. */
function rankFor(index: number): number | null {
  if (props.parent[index] !== index) return null;
  return props.rank[index] ?? null;
}

function sizeFor(index: number): number | null {
  if (props.parent[index] !== index) return null;
  return props.setSize[index] ?? null;
}
</script>

<template>
  <AvPanel class="flex flex-col">
    <div class="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-faint">{{ title }}</h2>
      <div class="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
        <span class="flex items-center gap-1.5"
          ><i class="h-3 w-3 rounded-mark bg-accent" />Root</span
        >
      </div>
      <AvLegend :items="LEGEND" />
    </div>

    <p v-if="isEmpty" class="py-8 text-center text-sm text-ink-faint">The forest is empty.</p>

    <template v-else>
      <div class="overflow-x-auto rounded-xl bg-surface-alt p-3">
        <svg
          :viewBox="`0 0 ${layout.width} ${layout.height}`"
          :width="layout.width"
          :height="layout.height"
          class="mx-auto block max-h-[42vh] w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <!-- Parent links first, so no line is drawn over a node circle. -->
          <line
            v-for="edge in layout.edges"
            :key="`${edge.from}-${edge.to}`"
            :x1="nodeById.get(edge.to)?.x"
            :y1="nodeById.get(edge.to)?.y"
            :x2="nodeById.get(edge.from)?.x"
            :y2="nodeById.get(edge.from)?.y"
            stroke-width="2"
            :class="
              pathSet.has(edge.to) && !compressedSet.has(edge.to)
                ? TONE_STROKE.probe
                : compressedSet.has(edge.to)
                  ? TONE_STROKE.settled
                  : TONE_STROKE.idle
            "
          />

          <g v-for="node in layout.nodes" :key="node.id">
            <!-- A root's self-pointer, drawn as a small loop above it: the
                 array really does say parent[r] = r, and hiding that would
                 make the array row below disagree with the picture. -->
            <circle
              v-if="node.parent === null"
              :cx="node.x"
              :cy="node.y - 15"
              r="6"
              fill="none"
              stroke-width="1.5"
              class="stroke-accent/60"
            />
            <circle
              :cx="node.x"
              :cy="node.y"
              r="14"
              class="transition-colors duration-150 ease-out"
              :class="NODE_FILL[stateFor(node.id)]"
            />
            <text
              :x="node.x"
              :y="node.y"
              text-anchor="middle"
              dominant-baseline="central"
              class="pointer-events-none select-none fill-ink-inverse text-[10px] font-semibold"
            >
              {{ labelFor(node.id) }}
            </text>
            <text
              v-if="rankFor(node.id) !== null"
              :x="node.x"
              :y="node.y + 25"
              text-anchor="middle"
              class="pointer-events-none select-none fill-ink-faint text-[9px] font-medium"
            >
              rank {{ rankFor(node.id) }} · {{ sizeFor(node.id) }}
            </text>
          </g>
        </svg>
      </div>

      <!-- The backing array. Same pairing HeapView uses for its heap. -->
      <h3 class="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-ink-faint">
        parent[]
      </h3>
      <div class="flex flex-wrap gap-1.5">
        <div
          v-for="(value, i) in parent"
          :key="i"
          class="flex w-11 flex-col items-center overflow-hidden rounded-lg border transition-colors"
          :class="CELL_CLASS[stateFor(i)]"
        >
          <div class="w-full bg-line/70 py-0.5 text-center text-[10px] font-medium text-ink-muted">
            {{ i }}
          </div>
          <div class="py-1 font-mono text-sm font-semibold text-ink">
            {{ value }}
          </div>
        </div>
      </div>

      <p class="mt-3 text-center text-xs text-ink-faint">{{ hint }}</p>
    </template>
  </AvPanel>
</template>
