// Tidy layout for an n-ary, multi-rooted forest, from nothing but a parent
// array.
//
// Pure arithmetic, no Vue and no DOM — this codebase never measures the DOM to
// place SVG (see the header of `graphModel.ts`, and `TreeDiagram.vue`'s
// geometry). Measuring would make layout depend on fonts, zoom level and paint
// timing, so the same seed could render differently on two machines and a unit
// test could not exist at all.
//
// THE ALGORITHM, and the one it is not. The classic "x = in-order slot" trick
// that `HeapView.vue` and `BstView.vue` use works because a binary tree has an
// unambiguous left/right at every node. A DSU forest has neither: a node can
// have any number of children and there is no meaningful order among them, so
// in-order traversal is undefined. What survives from that approach is the
// idea of handing out *leaf slots* — so:
//
//   1. Leaves are numbered left to right in the order they are reached, one
//      slot each. That is what guarantees no two leaves ever collide.
//   2. An internal node is centred over its children: the midpoint of its
//      first and last child's x. That is what makes a parent visibly "own" the
//      span beneath it.
//   3. Roots are laid out one after another in the same slot space, with
//      `rootGap` extra slots between them, so separate trees read as separate
//      trees rather than as one wide one.
//
// Because each subtree consumes a contiguous, disjoint run of slots, and every
// node's x lands inside its own subtree's run, two nodes at the same depth can
// never overlap — the separation is at least one slot. `forestLayout.test.ts`
// pins that rather than trusting the argument.
//
// Reingold–Tilford proper (the full "tidy trees" algorithm with contour
// threading and subtree shifting) was considered and rejected: it produces
// tighter drawings for deep unbalanced trees, and it is several hundred lines
// of machinery to save horizontal space in a panel that is already scrollable,
// for forests that union-by-rank keeps at depth log2(n) — five levels at the
// node counts this view generates. The simple version's failure mode (a wide
// drawing) is visible and harmless; Reingold–Tilford's failure mode is a
// subtle contour bug that draws a plausible-looking wrong tree.
//
// Time: O(n). Space: O(n).

export interface ForestLayoutNode {
  /** Element index — the same index used by the parent array. */
  id: number;
  x: number;
  y: number;
  /** 0 for a root. */
  depth: number;
  /** Null for a root; a root is its own parent in the array, which is not an edge. */
  parent: number | null;
  /** Leaf slots this node's subtree occupies, inclusive. Exposed for tests and hit areas. */
  span: [number, number];
}

/** A parent -> child link. Roots contribute none. */
export interface ForestLayoutEdge {
  from: number;
  to: number;
}

export interface ForestLayout {
  nodes: ForestLayoutNode[];
  edges: ForestLayoutEdge[];
  /** Total slots consumed, including inter-root gaps. Zero for an empty forest. */
  slotCount: number;
  /** viewBox dimensions, already including both margins. */
  width: number;
  height: number;
}

export interface ForestLayoutOptions {
  /** Horizontal distance between adjacent leaf slots. */
  xSpacing?: number;
  /** Vertical distance between depths. */
  ySpacing?: number;
  xMargin?: number;
  yMargin?: number;
  /** Extra slots inserted between two adjacent roots. */
  rootGap?: number;
}

export const FOREST_LAYOUT_DEFAULTS: Required<ForestLayoutOptions> = {
  xSpacing: 46,
  ySpacing: 54,
  xMargin: 30,
  yMargin: 28,
  rootGap: 1,
};

/**
 * Lay out the forest described by `parent`, where `parent[i] === i` marks a
 * root.
 *
 * Defensive about malformed input on purpose. A `DisjointSet` can only ever
 * produce a genuine forest, but this function is also handed parent arrays
 * straight off a recorded snapshot and (in principle) off a URL, and a cycle
 * would turn the walk below into an infinite loop inside a render. Anything
 * not reachable from a root is simply omitted rather than guessed at: drawing
 * a node in an arbitrary position would be inventing structure that isn't in
 * the data.
 */
export function layoutForest(
  parent: readonly number[],
  options: ForestLayoutOptions = {},
): ForestLayout {
  const { xSpacing, ySpacing, xMargin, yMargin, rootGap } = {
    ...FOREST_LAYOUT_DEFAULTS,
    ...options,
  };

  const n = parent.length;
  const children: number[][] = Array.from({ length: n }, () => []);
  const roots: number[] = [];

  for (let i = 0; i < n; i++) {
    const p = parent[i];
    // An out-of-range parent is treated as "not in this forest" rather than
    // being clamped into someone else's subtree.
    if (p === i) roots.push(i);
    else if (p >= 0 && p < n) children[p].push(i);
  }

  // Keyed by id rather than searched for in an array: a parent has to read
  // back the positions of every child it just placed, and doing that with a
  // linear scan would make the whole layout quadratic in node count for no
  // reason.
  const positioned = new Map<number, ForestLayoutNode>();
  const edges: ForestLayoutEdge[] = [];
  const visited = new Set<number>();
  let nextSlot = 0;

  /**
   * Post-order: children are placed first so a parent can be centred over the
   * span they turned out to occupy. Iterative rather than recursive — a
   * pathological chain (which is exactly what this view exists to show going
   * wrong) would otherwise be able to overflow the stack during a render.
   */
  function placeTree(root: number) {
    // Each frame: the node, its depth, and how many of its children are done.
    const stack: Array<{ id: number; depth: number; cursor: number }> = [
      { id: root, depth: 0, cursor: 0 },
    ];
    visited.add(root);

    while (stack.length > 0) {
      const frame = stack[stack.length - 1];
      const kids = children[frame.id];

      if (frame.cursor < kids.length) {
        const child = kids[frame.cursor];
        frame.cursor += 1;
        // The cycle guard: a node already on the stack (or already drawn) is
        // never descended into a second time.
        if (visited.has(child)) continue;
        visited.add(child);
        stack.push({ id: child, depth: frame.depth + 1, cursor: 0 });
        continue;
      }

      // Every child is placed, so this node's own position is now decided.
      stack.pop();

      const drawn = kids
        .map((child) => positioned.get(child))
        .filter((child): child is ForestLayoutNode => child !== undefined);

      let x: number;
      let span: [number, number];

      if (drawn.length === 0) {
        // A leaf takes exactly one slot of its own.
        const slot = nextSlot;
        nextSlot += 1;
        x = xMargin + slot * xSpacing;
        span = [slot, slot];
      } else {
        // Centred between the leftmost and rightmost child rather than over
        // the mean of all of them: with lopsided child counts the mean drifts
        // off the visual centre of the span the subtree actually occupies.
        const xs = drawn.map((child) => child.x);
        x = (Math.min(...xs) + Math.max(...xs)) / 2;
        span = [
          Math.min(...drawn.map((child) => child.span[0])),
          Math.max(...drawn.map((child) => child.span[1])),
        ];
      }

      positioned.set(frame.id, {
        id: frame.id,
        x,
        y: yMargin + frame.depth * ySpacing,
        depth: frame.depth,
        parent: frame.id === parent[frame.id] ? null : parent[frame.id],
        span,
      });
    }
  }

  for (const root of roots) {
    if (nextSlot > 0) nextSlot += rootGap;
    placeTree(root);
  }

  // Sorted by id so the render order is stable across steps — an SVG whose
  // element order changed every frame would defeat Vue's keyed diffing and
  // restart CSS transitions on nodes that did not move.
  const nodes = [...positioned.values()].sort((a, b) => a.id - b.id);

  for (const node of nodes) {
    // A parent edge is only drawn when the parent was itself laid out, so a
    // node omitted by the cycle guard cannot leave a line to nowhere.
    if (node.parent !== null && positioned.has(node.parent)) {
      edges.push({ from: node.parent, to: node.id });
    }
  }

  const maxDepth = nodes.reduce((max, node) => Math.max(max, node.depth), 0);

  return {
    nodes,
    edges,
    slotCount: nextSlot,
    width: Math.max(xMargin * 2, xMargin * 2 + Math.max(0, nextSlot - 1) * xSpacing),
    height: yMargin * 2 + maxDepth * ySpacing,
  };
}
