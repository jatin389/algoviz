import { describe, it, expect } from 'vitest';
import { layoutForest, FOREST_LAYOUT_DEFAULTS } from './forestLayout';
import type { ForestLayout, ForestLayoutNode } from './forestLayout';
import { DisjointSet } from '@/algorithms/dsu/disjointSet';
import { createRng } from '@/utils/rng';

// Pure geometry, so every assertion here is arithmetic on the returned numbers
// — nothing is mounted and nothing is measured.

const { xSpacing } = FOREST_LAYOUT_DEFAULTS;

function byId(layout: ForestLayout): Map<number, ForestLayoutNode> {
  return new Map(layout.nodes.map((node) => [node.id, node]));
}

function byDepth(layout: ForestLayout): Map<number, ForestLayoutNode[]> {
  const rows = new Map<number, ForestLayoutNode[]>();
  for (const node of layout.nodes) {
    rows.set(node.depth, [...(rows.get(node.depth) ?? []), node]);
  }
  return rows;
}

/** Every parent array the app can actually produce, from a real DSU run. */
function forestFrom(n: number, unions: Array<[number, number]>): number[] {
  const dsu = new DisjointSet(n);
  for (const [a, b] of unions) dsu.union(a, b);
  return dsu.snapshot().parent;
}

/** A reproducible forest built by random unions — the realistic shape. */
function randomForest(n: number, unionCount: number, seed: number): number[] {
  const rng = createRng(seed);
  const dsu = new DisjointSet(n);
  for (let i = 0; i < unionCount; i++) dsu.union(rng.int(0, n - 1), rng.int(0, n - 1));
  return dsu.snapshot().parent;
}

describe('layoutForest', () => {
  it('places every node exactly once', () => {
    const layout = layoutForest(forestFrom(8, [[0, 1]]));
    expect(layout.nodes).toHaveLength(8);
    expect(new Set(layout.nodes.map((node) => node.id)).size).toBe(8);
  });

  it('gives all-singleton forests one root per element, all at depth 0', () => {
    const layout = layoutForest([0, 1, 2, 3]);
    expect(layout.edges).toHaveLength(0);
    for (const node of layout.nodes) {
      expect(node.depth).toBe(0);
      expect(node.parent).toBeNull();
    }
  });

  it('emits one edge per non-root node', () => {
    const parent = randomForest(16, 12, 4242);
    const layout = layoutForest(parent);
    const nonRoots = parent.filter((p, i) => p !== i).length;
    expect(layout.edges).toHaveLength(nonRoots);
    for (const edge of layout.edges) expect(parent[edge.to]).toBe(edge.from);
  });

  it('never overlaps two nodes at the same depth', () => {
    for (const parent of [
      forestFrom(12, [
        [0, 1],
        [2, 3],
        [0, 2],
        [4, 5],
      ]),
      randomForest(24, 20, 77),
      randomForest(40, 60, 31337),
      randomForest(9, 8, 5),
    ]) {
      const rows = byDepth(layoutForest(parent));
      for (const [depth, row] of rows) {
        const xs = row.map((node) => node.x).sort((a, b) => a - b);
        for (let i = 1; i < xs.length; i++) {
          // Disjoint leaf-slot runs guarantee at least one full slot of
          // separation; anything less would mean two circles touching.
          expect(xs[i] - xs[i - 1], `depth ${depth}`).toBeGreaterThanOrEqual(xSpacing);
        }
      }
    }
  });

  it('sits every parent within — and centred on — its children’s span', () => {
    for (const parent of [randomForest(30, 40, 909), randomForest(18, 14, 123)]) {
      const layout = layoutForest(parent);
      const nodes = byId(layout);

      const childrenOf = new Map<number, ForestLayoutNode[]>();
      for (const node of layout.nodes) {
        if (node.parent === null) continue;
        childrenOf.set(node.parent, [...(childrenOf.get(node.parent) ?? []), node]);
      }

      for (const [parentId, kids] of childrenOf) {
        const at = nodes.get(parentId)!;
        const xs = kids.map((kid) => kid.x);
        const lo = Math.min(...xs);
        const hi = Math.max(...xs);

        expect(at.x).toBeGreaterThanOrEqual(lo);
        expect(at.x).toBeLessThanOrEqual(hi);
        expect(at.x).toBeCloseTo((lo + hi) / 2, 6);

        // Children hang one level below, never level with or above the parent.
        for (const kid of kids) expect(kid.depth).toBe(at.depth + 1);

        // The parent's span must cover every child's span.
        expect(at.span[0]).toBeLessThanOrEqual(Math.min(...kids.map((kid) => kid.span[0])));
        expect(at.span[1]).toBeGreaterThanOrEqual(Math.max(...kids.map((kid) => kid.span[1])));
      }
    }
  });

  it('keeps separate roots in disjoint, non-colliding slot ranges', () => {
    // Three trees plus two loose singletons.
    const parent = forestFrom(11, [
      [0, 1],
      [1, 2],
      [3, 4],
      [5, 6],
      [6, 7],
      [5, 3],
    ]);
    const layout = layoutForest(parent);
    const roots = layout.nodes.filter((node) => node.parent === null);
    expect(roots.length).toBeGreaterThan(1);

    const spans = roots.map((root) => root.span).sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < spans.length; i++) {
      expect(spans[i][0]).toBeGreaterThan(spans[i - 1][1]);
    }

    const xs = roots.map((root) => root.x).sort((a, b) => a - b);
    for (let i = 1; i < xs.length; i++) {
      expect(xs[i] - xs[i - 1]).toBeGreaterThanOrEqual(xSpacing);
    }
  });

  it('leaves a visible gap between adjacent trees', () => {
    const tight = layoutForest([0, 0, 2, 2], { rootGap: 0 });
    const loose = layoutForest([0, 0, 2, 2], { rootGap: 3 });
    expect(loose.slotCount).toBe(tight.slotCount + 3);
    expect(loose.width).toBeGreaterThan(tight.width);
  });

  it('honours spacing and margin options', () => {
    const layout = layoutForest([0, 0, 0], {
      xSpacing: 10,
      ySpacing: 20,
      xMargin: 5,
      yMargin: 7,
      rootGap: 0,
    });
    const nodes = byId(layout);

    // Two leaves at slots 0 and 1, their parent centred between them.
    expect(nodes.get(1)!.x).toBe(5);
    expect(nodes.get(2)!.x).toBe(15);
    expect(nodes.get(0)!.x).toBe(10);
    expect(nodes.get(0)!.y).toBe(7);
    expect(nodes.get(1)!.y).toBe(27);
    expect(layout.height).toBe(7 * 2 + 20);
  });

  it('returns an empty layout for an empty forest', () => {
    const layout = layoutForest([]);
    expect(layout.nodes).toEqual([]);
    expect(layout.edges).toEqual([]);
    expect(layout.slotCount).toBe(0);
  });

  it('omits nodes a malformed parent array makes unreachable rather than guessing', () => {
    // A 2-cycle: neither node is a root, so neither belongs to any tree.
    // Rendering them somewhere arbitrary would invent structure not in the data.
    const layout = layoutForest([2, 1, 0]);
    expect(layout.nodes.map((node) => node.id)).toEqual([1]);
    expect(layout.edges).toEqual([]);
  });

  it('is deterministic — the same parent array lays out identically', () => {
    const parent = randomForest(20, 25, 6060);
    expect(layoutForest(parent)).toEqual(layoutForest(parent));
  });
});
