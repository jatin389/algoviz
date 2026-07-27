<script setup lang="ts">
// Generic binary-tree SVG renderer — knows nothing about BST or Heap
// specifically. Consumers compute their own x/y layout and pass in a flat
// node/edge list; this component only draws it.

/** One laid-out node. `id` is the caller's stable key, not an array index. */
interface TreeNode {
  id: number;
  x: number;
  y: number;
  value: number;
  /**
   * Highlight bucket. Deliberately `string`, not a union of the `stateColors`
   * keys: each consumer names its own states and anything unrecognized (or
   * absent) falls back to `default` styling.
   */
  state?: string;
}

/** A parent→child link, referencing nodes by `id`. */
interface TreeEdge {
  from: number;
  to: number;
}

interface NodeColors {
  fill: string;
  stroke: string;
}

const props = withDefaults(
  defineProps<{
    nodes: TreeNode[]; // { id, x, y, value, state }
    edges: TreeEdge[]; // { from, to }
    viewBoxWidth?: number;
    viewBoxHeight?: number;
  }>(),
  {
    viewBoxWidth: 600,
    viewBoxHeight: 320,
  },
);

const stateColors: Record<string, NodeColors> = {
  default: { fill: '#6366f1', stroke: '#4338ca' }, // indigo
  visiting: { fill: '#f59e0b', stroke: '#b45309' }, // amber
  removing: { fill: '#f43f5e', stroke: '#be123c' }, // rose
  inserted: { fill: '#10b981', stroke: '#047857' }, // emerald
};

function colorsFor(state: string | undefined) {
  return stateColors[state ?? 'default'] ?? stateColors.default;
}

function nodeById(id: number) {
  return props.nodes.find((n) => n.id === id);
}
</script>

<template>
  <svg
    :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`"
    class="h-full w-full"
    preserveAspectRatio="xMidYMin meet"
  >
    <line
      v-for="(edge, i) in edges"
      :key="`edge-${i}`"
      :x1="nodeById(edge.from)?.x"
      :y1="nodeById(edge.from)?.y"
      :x2="nodeById(edge.to)?.x"
      :y2="nodeById(edge.to)?.y"
      class="stroke-slate-300 dark:stroke-slate-700"
      stroke-width="2"
    />

    <g v-for="node in nodes" :key="node.id">
      <circle
        :cx="node.x"
        :cy="node.y"
        r="18"
        :fill="colorsFor(node.state).fill"
        :stroke="colorsFor(node.state).stroke"
        stroke-width="2"
        class="transition-all duration-300"
      />
      <text
        :x="node.x"
        :y="node.y"
        text-anchor="middle"
        dominant-baseline="central"
        class="select-none fill-white text-xs font-semibold"
      >
        {{ node.value }}
      </text>
    </g>
  </svg>
</template>
