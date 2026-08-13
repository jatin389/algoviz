import { describe, it, expect } from 'vitest';
import { DisjointSet } from './disjointSet';
import { dsuScript } from './dsuOps';
import type { DsuOp, DsuStep } from '@/types';
import { createRng } from '@/utils/rng';

// The reference the instrumented structure is checked against: connectivity by
// brute force, with no compression, no ranks and no cleverness at all. It is
// deliberately the slowest possible correct implementation — the only way to
// catch a bug in path compression is to compare against something that has
// none.
class NaiveConnectivity {
  private readonly groups: Set<number>[];

  constructor(n: number) {
    this.groups = Array.from({ length: n }, (_, i) => new Set([i]));
  }

  union(a: number, b: number) {
    const ga = this.groups[a];
    const gb = this.groups[b];
    if (ga === gb) return;
    const merged = new Set([...ga, ...gb]);
    for (const member of merged) this.groups[member] = merged;
  }

  connected(a: number, b: number) {
    return this.groups[a] === this.groups[b];
  }

  get components() {
    return new Set(this.groups).size;
  }
}

/**
 * The deepest forest union-by-rank is willing to build: pairwise merges in
 * doubling rounds, which produces a binomial tree of depth log2(n) rooted at 0.
 *
 * There is deliberately no back door for forcing a degenerate chain — that is
 * the heuristic doing its job — so a test that needs something to compress has
 * to build the worst case the rules actually allow.
 */
function buildBinomialTree(dsu: DisjointSet, n: number) {
  for (let stride = 1; stride < n; stride *= 2) {
    for (let i = 0; i + stride < n; i += stride * 2) dsu.link(i, i + stride);
  }
}

/** A reproducible mixed script of unions and finds over `n` elements. */
function randomScript(n: number, length: number, seed: number): DsuOp[] {
  const rng = createRng(seed);
  return Array.from({ length }, () => {
    const a = rng.int(0, n - 1);
    if (rng.next() < 0.35) return { kind: 'find', a } satisfies DsuOp;
    return { kind: 'union', a, b: rng.int(0, n - 1) } satisfies DsuOp;
  });
}

function collect(nodeCount: number, ops: readonly DsuOp[]): DsuStep[] {
  return [...dsuScript(nodeCount, ops)];
}

describe('DisjointSet', () => {
  it('starts with every element in its own set', () => {
    const dsu = new DisjointSet(6);
    expect(dsu.components).toBe(6);
    for (let i = 0; i < 6; i++) {
      expect(dsu.isRoot(i)).toBe(true);
      expect(dsu.rootOf(i)).toBe(i);
      expect(dsu.pathTo(i)).toEqual([i]);
    }
  });

  it('find is idempotent — repeating it changes nothing but the counter', () => {
    const dsu = new DisjointSet(8);
    for (const [a, b] of [
      [0, 1],
      [1, 2],
      [2, 3],
      [4, 5],
    ]) {
      dsu.union(a, b);
    }

    const first = dsu.find(3);
    const parentsAfterFirst = dsu.snapshot().parent;

    for (let i = 0; i < 5; i++) {
      expect(dsu.find(3)).toBe(first);
      expect(dsu.snapshot().parent).toEqual(parentsAfterFirst);
    }
  });

  it('after a find, every node on the walked path points straight at the root', () => {
    const dsu = new DisjointSet(16);
    buildBinomialTree(dsu, 16);

    const path = dsu.pathTo(15);
    expect(path.length).toBeGreaterThan(2);

    const root = dsu.find(15);
    const parent = dsu.snapshot().parent;
    for (const node of path) {
      if (node === root) continue;
      expect(parent[node]).toBe(root);
    }
  });

  it('max depth never increases after a compression', () => {
    const dsu = new DisjointSet(40);
    const ops = randomScript(40, 300, 20240611);

    for (const op of ops) {
      const before = dsu.maxDepth();
      const compressionsBefore = dsu.compressions;

      if (op.kind === 'find') {
        dsu.find(op.a);
        // A find only ever compresses, so depth can go down but never up.
        expect(dsu.maxDepth()).toBeLessThanOrEqual(before);
      } else {
        dsu.union(op.a, op.b!);
      }

      if (dsu.compressions > compressionsBefore) {
        expect(dsu.maxDepth()).toBeLessThanOrEqual(before);
      }
    }
  });

  it('counts only pointers that actually moved as compressions', () => {
    const dsu = new DisjointSet(16);
    buildBinomialTree(dsu, 16);

    // 15 -> 14 -> 12 -> 8 -> 0. Three of those four pointers move; the one
    // already aimed at the root does not, and must not be counted.
    const walked = dsu.pathTo(15);
    expect(walked).toEqual([15, 14, 12, 8, 0]);

    expect(dsu.compressions).toBe(0);
    dsu.find(15);
    expect(dsu.compressions).toBe(3);

    // Everything on that path is flat now, so a second find moves nothing.
    dsu.find(15);
    expect(dsu.compressions).toBe(3);
  });

  it('keeps depth logarithmic under union by rank over a randomised script', () => {
    const n = 1024;
    const dsu = new DisjointSet(n);
    const rng = createRng(99991);

    // Unions only: with finds mixed in, compression would do the work and the
    // rank heuristic would not be the thing under test.
    for (let i = 0; i < n * 4; i++) {
      dsu.union(rng.int(0, n - 1), rng.int(0, n - 1));
    }

    expect(dsu.components).toBe(1);
    // Union by rank bounds height by log2(n); anything near n means the
    // heuristic is not being applied at all.
    expect(dsu.maxDepth()).toBeLessThanOrEqual(Math.log2(n));
  });

  it('agrees with a naive reference over a randomised script', () => {
    for (const seed of [1, 7, 4242, 90210]) {
      const n = 60;
      const dsu = new DisjointSet(n);
      const naive = new NaiveConnectivity(n);

      for (const op of randomScript(n, 400, seed)) {
        if (op.kind === 'union') {
          dsu.union(op.a, op.b!);
          naive.union(op.a, op.b!);
        } else {
          dsu.find(op.a);
        }

        // Every pair, every step: connectivity is the entire contract.
        for (let a = 0; a < n; a += 7) {
          for (let b = 0; b < n; b += 5) {
            expect(dsu.isConnected(a, b)).toBe(naive.connected(a, b));
          }
        }
      }

      expect(dsu.components).toBe(naive.components);
    }
  });

  it('reports set sizes that sum to n', () => {
    const dsu = new DisjointSet(30);
    for (const op of randomScript(30, 120, 555)) {
      if (op.kind === 'union') dsu.union(op.a, op.b!);
    }

    let total = 0;
    for (let i = 0; i < 30; i++) if (dsu.isRoot(i)) total += dsu.sizeOf(i);
    expect(total).toBe(30);
  });

  it('snapshots are independent copies', () => {
    const dsu = new DisjointSet(5);
    dsu.union(0, 1);
    const snapshot = dsu.snapshot([0, 1], [0]);

    snapshot.parent[0] = 99;
    snapshot.findPath.push(4);

    expect(dsu.snapshot().parent[0]).not.toBe(99);
    expect(dsu.snapshot().findPath).toEqual([]);
  });
});

describe('dsuScript', () => {
  it('yields an initial snapshot of n singletons before any operation', () => {
    const steps = collect(5, []);
    expect(steps[0].op).toBeNull();
    expect(steps[0].forest.parent).toEqual([0, 1, 2, 3, 4]);
    expect(steps[0].forest.unions).toBe(0);
  });

  it('always terminates with exactly one done step, and it is last', () => {
    const steps = collect(8, randomScript(8, 12, 31337));
    expect(steps.filter((s) => s.done)).toHaveLength(1);
    expect(steps[steps.length - 1].done).toBe(true);
  });

  it('animates the walk to the root one node at a time before compressing', () => {
    // A chain 0 <- 1 <- 2 <- 3 built by linking roots directly, so find(3)
    // has three pointers to walk.
    const ops: DsuOp[] = [
      { kind: 'union', a: 0, b: 1 },
      { kind: 'union', a: 2, b: 3 },
      { kind: 'union', a: 1, b: 3 },
      { kind: 'find', a: 3 },
    ];
    const steps = collect(4, ops);

    // The find's walk steps are tagged line 2 and carry a strictly growing
    // findPath; the compression step (line 3) is the first with a non-empty
    // `compressed`.
    const walkSteps = steps.filter((s) => s.line === 2);
    expect(walkSteps.length).toBeGreaterThan(0);
    for (const step of walkSteps) expect(step.forest.compressed).toEqual([]);

    const lastFind = steps.map((s) => s.line).lastIndexOf(3);
    expect(lastFind).toBeGreaterThan(-1);
    expect(steps[lastFind].forest.findPath.length).toBeGreaterThan(0);
  });

  it('leaves every walked node pointing at the root on the compression step', () => {
    const ops: DsuOp[] = [
      { kind: 'union', a: 0, b: 1 },
      { kind: 'union', a: 2, b: 3 },
      { kind: 'union', a: 1, b: 3 },
      { kind: 'find', a: 3 },
    ];
    const steps = collect(4, ops);
    const compressionSteps = steps.filter((s) => s.line === 3);
    const last = compressionSteps[compressionSteps.length - 1];

    const root = last.forest.findPath[last.forest.findPath.length - 1];
    for (const node of last.forest.findPath) {
      if (node === root) continue;
      expect(last.forest.parent[node]).toBe(root);
    }
  });

  it('reports a redundant union rather than performing it', () => {
    const ops: DsuOp[] = [
      { kind: 'union', a: 0, b: 1 },
      { kind: 'union', a: 1, b: 0 },
    ];
    const steps = collect(3, ops);
    const final = steps[steps.length - 1];

    expect(final.forest.unions).toBe(1);
    expect(steps.some((s) => s.line === 6)).toBe(true);
  });

  it('skips operations naming a node outside the forest instead of clamping', () => {
    const ops: DsuOp[] = [
      { kind: 'union', a: 0, b: 9 },
      { kind: 'union', a: 0, b: 1 },
      { kind: 'find', a: -1 },
    ];
    const steps = collect(3, ops);
    const final = steps[steps.length - 1];

    expect(final.forest.unions).toBe(1);
    expect(steps[0].explain).toContain('skipped');
  });

  it('never mutates an already-yielded snapshot', () => {
    const ops = randomScript(10, 25, 777);
    const steps = collect(10, ops);
    const firstParents = [...steps[0].forest.parent];

    // Mutating a recorded step must not reach into any other step.
    steps[1].forest.parent[0] = 42;
    steps[1].forest.findPath.push(9);

    expect(steps[0].forest.parent).toEqual(firstParents);
    expect(steps[2].forest.parent[0]).not.toBe(42);
  });

  it('handles an empty forest and an empty script', () => {
    const steps = collect(0, []);
    expect(steps[steps.length - 1].done).toBe(true);
    expect(steps[steps.length - 1].forest.parent).toEqual([]);
  });
});
