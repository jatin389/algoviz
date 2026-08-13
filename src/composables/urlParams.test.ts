import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { decodeKey } from '@/utils/urlCodec';
import { algorithms as sortAlgorithms } from '@/algorithms';
import { algorithms as graphAlgorithms } from '@/algorithms/graph';
import { algorithms as dpAlgorithms } from '@/algorithms/dp';
import type { DpAlgoKey, DpInput } from '@/algorithms/dp';
import type { DsuAlgoKey } from '@/algorithms/dsu';
import type { HashStrategyKey } from '@/algorithms/hashtable';
import type { HashFnKey } from '@/algorithms/hashtable/hashFns';
import type { DsuOp, HashOp, NodeId } from '@/types';
import { defaultOpScript, MST_NODE_MIN, MST_NODE_MAX } from './useMst';
import {
  sorterUrlParams,
  SORTER_DEFAULTS,
  searcherUrlParams,
  SEARCHER_DEFAULTS,
  pathfinderUrlParams,
  coordRef,
  graphUrlParams,
  GRAPH_DEFAULTS,
  dpUrlParams,
  DP_DEFAULTS,
  mstUrlParams,
  MST_DEFAULTS,
  hashUrlParams,
  HASH_DEFAULTS,
} from './urlParams';

// These factories are plain functions over `ref(...)`s, so every codec is
// exercised directly here — no router, no mounted component, matching the
// whole point of keeping useUrlState's specs out of the composables.

describe('sorterUrlParams', () => {
  const build = () =>
    sorterUrlParams({
      algoKey: ref(SORTER_DEFAULTS.algo),
      size: ref(SORTER_DEFAULTS.size),
      speed: ref(SORTER_DEFAULTS.speed),
      seed: ref(1234),
    });

  it('round-trips valid values', () => {
    const specs = build();
    expect(specs.algo.decode(specs.algo.encode('quick') ?? '')).toBe('quick');
    expect(specs.size.decode(specs.size.encode(77) ?? '')).toBe(77);
    expect(specs.speed.decode(specs.speed.encode(42) ?? '')).toBe(42);
    expect(specs.seed.decode(specs.seed.encode(999) ?? '')).toBe(999);
  });

  it('omits params at their default', () => {
    const specs = build();
    expect(specs.algo.encode(SORTER_DEFAULTS.algo)).toBeNull();
    expect(specs.size.encode(SORTER_DEFAULTS.size)).toBeNull();
    expect(specs.speed.encode(SORTER_DEFAULTS.speed)).toBeNull();
  });

  it('seed always encodes, even at a value that looks default-ish', () => {
    const specs = build();
    expect(specs.seed.encode(0)).toBe('0');
  });

  it('rejects malformed input', () => {
    const specs = build();
    expect(specs.algo.decode('nonsense')).toBeUndefined();
    expect(specs.size.decode('abc')).toBeUndefined();
    expect(specs.seed.decode('abc')).toBeUndefined();
  });

  it('clamps out-of-range size rather than rejecting', () => {
    const specs = build();
    expect(specs.size.decode('1e9')).toBe(100);
    expect(specs.size.decode('-5')).toBe(10);
  });

  it('normalizes a negative seed via >>> 0', () => {
    const specs = build();
    expect(specs.seed.decode('-1')).toBe(4294967295);
  });

  it('gives speed and size a 250ms debounce, everything else none', () => {
    const specs = build();
    expect(specs.size.debounceMs).toBe(250);
    expect(specs.speed.debounceMs).toBe(250);
    expect(specs.algo.debounceMs).toBeUndefined();
    expect(specs.seed.debounceMs).toBeUndefined();
  });
});

describe('searcherUrlParams', () => {
  const build = () =>
    searcherUrlParams({
      algoKey: ref(SEARCHER_DEFAULTS.algo),
      size: ref(SEARCHER_DEFAULTS.size),
      speed: ref(SEARCHER_DEFAULTS.speed),
      seed: ref(1234),
      target: ref(SEARCHER_DEFAULTS.target),
    });

  it('round-trips valid values', () => {
    const specs = build();
    expect(specs.algo.decode(specs.algo.encode('linear') ?? '')).toBe('linear');
    expect(specs.size.decode(specs.size.encode(33) ?? '')).toBe(33);
    expect(specs.speed.decode(specs.speed.encode(10) ?? '')).toBe(10);
    expect(specs.seed.decode(specs.seed.encode(555) ?? '')).toBe(555);
    expect(specs.target.decode(specs.target.encode(42) ?? '')).toBe(42);
  });

  it('omits params at their default', () => {
    const specs = build();
    expect(specs.algo.encode(SEARCHER_DEFAULTS.algo)).toBeNull();
    expect(specs.size.encode(SEARCHER_DEFAULTS.size)).toBeNull();
    expect(specs.speed.encode(SEARCHER_DEFAULTS.speed)).toBeNull();
    expect(specs.target.encode(SEARCHER_DEFAULTS.target)).toBeNull();
  });

  it('rejects malformed input', () => {
    const specs = build();
    expect(specs.algo.decode('nonsense')).toBeUndefined();
    expect(specs.size.decode('abc')).toBeUndefined();
    expect(specs.seed.decode('abc')).toBeUndefined();
  });

  it('clamps out-of-range size and target rather than rejecting', () => {
    const specs = build();
    expect(specs.size.decode('1e9')).toBe(50);
    expect(specs.size.decode('-5')).toBe(10);
    expect(specs.target.decode('1e9')).toBe(99);
    expect(specs.target.decode('-5')).toBe(0);
  });

  it('normalizes a negative seed via >>> 0', () => {
    const specs = build();
    expect(specs.seed.decode('-1')).toBe(4294967295);
  });
});

describe('pathfinderUrlParams', () => {
  const ROWS = 15;
  const COLS = 25;
  const defaultStart = { row: Math.floor(ROWS / 2), col: 0 };
  const defaultEnd = { row: Math.floor(ROWS / 2), col: COLS - 1 };

  const build = () =>
    pathfinderUrlParams(
      {
        algoKey: ref('bfs'),
        speed: ref(60),
        seed: ref(1234),
        start: coordRef({ ...defaultStart }),
        end: coordRef({ ...defaultEnd }),
      },
      { rows: ROWS, cols: COLS },
    );

  it('round-trips valid values', () => {
    const specs = build();
    expect(specs.algo.decode(specs.algo.encode('astar') ?? '')).toBe('astar');
    expect(specs.speed.decode(specs.speed.encode(80) ?? '')).toBe(80);
    expect(specs.seed.decode(specs.seed.encode(4242) ?? '')).toBe(4242);

    const coord = { row: 3, col: 4 };
    expect(specs.start.decode(specs.start.encode(coord) ?? '')).toEqual(coord);
    expect(specs.end.decode(specs.end.encode(coord) ?? '')).toEqual(coord);
  });

  it('omits params at their default', () => {
    const specs = build();
    expect(specs.algo.encode('bfs')).toBeNull();
    expect(specs.speed.encode(60)).toBeNull();
    expect(specs.start.encode(defaultStart)).toBeNull();
    expect(specs.end.encode(defaultEnd)).toBeNull();
  });

  it('rejects malformed input', () => {
    const specs = build();
    expect(specs.algo.decode('nonsense')).toBeUndefined();
    expect(specs.seed.decode('abc')).toBeUndefined();
    // Out of bounds (rows=15, cols=25) and a malformed single-number form.
    expect(specs.start.decode('99,99')).toBeUndefined();
    expect(specs.start.decode('3')).toBeUndefined();
    expect(specs.end.decode('99,99')).toBeUndefined();
  });

  it('rejects out-of-range coordinates rather than clamping them', () => {
    const specs = build();
    expect(specs.start.decode('14,25')).toBeUndefined(); // col === cols is out of bounds
    expect(specs.start.decode('14,24')).toEqual({ row: 14, col: 24 }); // last valid cell
  });

  it('normalizes a negative seed via >>> 0', () => {
    const specs = build();
    expect(specs.seed.decode('-1')).toBe(4294967295);
  });
});

describe('graphUrlParams', () => {
  const build = () =>
    graphUrlParams({
      algoKey: ref(GRAPH_DEFAULTS.algo),
      speed: ref(GRAPH_DEFAULTS.speed),
      seed: ref(1234),
      startId: ref<number | string | null>(null),
    });

  it('round-trips valid values, including node id 0', () => {
    const specs = build();
    expect(specs.algo.decode(specs.algo.encode('dfs') ?? '')).toBe('dfs');
    expect(specs.speed.decode(specs.speed.encode(15) ?? '')).toBe(15);
    expect(specs.seed.decode(specs.seed.encode(77) ?? '')).toBe(77);
    expect(specs.start.decode(specs.start.encode(0) ?? '')).toBe(0);
    expect(specs.start.decode(specs.start.encode(7) ?? '')).toBe(7);
  });

  it('omits only the null (no node picked) case, never a real id like 0', () => {
    const specs = build();
    expect(specs.algo.encode(GRAPH_DEFAULTS.algo)).toBeNull();
    expect(specs.speed.encode(GRAPH_DEFAULTS.speed)).toBeNull();
    expect(specs.start.encode(null)).toBeNull();
    expect(specs.start.encode(0)).toBe('0');
  });

  it('rejects malformed input', () => {
    const specs = build();
    expect(specs.algo.decode('nonsense')).toBeUndefined();
    expect(specs.seed.decode('abc')).toBeUndefined();
    expect(specs.start.decode('abc')).toBeUndefined();
  });

  it('clamps an out-of-range start id rather than rejecting', () => {
    const specs = build();
    expect(specs.start.decode('1e9')).toBe(9999);
    expect(specs.start.decode('-5')).toBe(0);
  });

  it('normalizes a negative seed via >>> 0', () => {
    const specs = build();
    expect(specs.seed.decode('-1')).toBe(4294967295);
  });
});

describe('dpUrlParams', () => {
  // The `in` codec resolves against whichever algorithm is selected, so every
  // case here builds the specs around a chosen one.
  const build = (algo: DpAlgoKey = DP_DEFAULTS.algo) => {
    const algoKey = ref<DpAlgoKey>(algo);
    const input = ref<DpInput>(dpAlgorithms[algo].defaults);
    const specs = dpUrlParams({
      algoKey,
      input,
      speed: ref(DP_DEFAULTS.speed),
      seed: ref(1234),
    });
    return { specs, algoKey, input };
  };

  const roundTrip = (algo: DpAlgoKey, input: DpInput, encoded: string) => {
    const { specs } = build(algo);
    expect(specs.in.encode(input)).toBe(encoded);
    expect(specs.in.decode(encoded)).toEqual(input);
  };

  it('round-trips the scalars', () => {
    const { specs } = build();
    expect(specs.algo.decode(specs.algo.encode('lcs') ?? '')).toBe('lcs');
    expect(specs.speed.decode(specs.speed.encode(25) ?? '')).toBe(25);
    expect(specs.seed.decode(specs.seed.encode(777) ?? '')).toBe(777);
  });

  it('round-trips an input of every kind', () => {
    roundTrip('fib', { kind: 'scalar', n: 20 }, 'scalar:20');
    roundTrip('coin-change', { kind: 'coins', coins: [1, 3, 4], amount: 9 }, 'coins:1,3,4:9');
    roundTrip('lis', { kind: 'sequence', values: [3, 10, 2, 1] }, 'sequence:3,10,2,1');
    roundTrip(
      'knapsack',
      {
        kind: 'items',
        items: [
          { weight: 2, value: 3 },
          { weight: 3, value: 4 },
        ],
        capacity: 9,
      },
      'items:2/3,3/4:9',
    );
    roundTrip('lcs', { kind: 'strings2', a: 'AGGT', b: 'GXTX' }, 'strings2:AGGT:GXTX');
    roundTrip('matrix-chain', { kind: 'chain', dims: [40, 20, 30, 10] }, 'chain:40,20,30,10');
  });

  it('omits params at their default, including the selected algorithm’s own input', () => {
    const { specs } = build();
    expect(specs.algo.encode(DP_DEFAULTS.algo)).toBeNull();
    expect(specs.speed.encode(DP_DEFAULTS.speed)).toBeNull();
    expect(specs.in.encode(dpAlgorithms.fib.defaults)).toBeNull();

    // "Default" follows the selection, not the registry's first entry.
    const lcs = build('lcs');
    expect(lcs.specs.in.encode(dpAlgorithms.lcs.defaults)).toBeNull();
    expect(lcs.specs.in.encode(dpAlgorithms.fib.defaults)).toBe('scalar:12');
  });

  it('rejects malformed scalars', () => {
    const { specs } = build();
    expect(specs.algo.decode('nonsense')).toBeUndefined();
    expect(specs.speed.decode('abc')).toBeUndefined();
    expect(specs.seed.decode('abc')).toBeUndefined();
  });

  it('rejects an input whose kind is not the selected algorithm’s', () => {
    // Structurally perfect, and still wrong: Fibonacci cannot run a coin list,
    // and importing it would leave the panel editing an input the generator
    // would immediately fall back away from.
    expect(build('fib').specs.in.decode('coins:1,3,4:11')).toBeUndefined();
    expect(build('coin-change').specs.in.decode('scalar:12')).toBeUndefined();
    // Not a `DpInputKind` at all.
    expect(build('fib').specs.in.decode('nonsense:12')).toBeUndefined();
    expect(build('fib').specs.in.decode('12')).toBeUndefined();
  });

  it('rejects a structurally malformed input rather than salvaging part of it', () => {
    expect(build('fib').specs.in.decode('scalar:abc')).toBeUndefined();
    expect(build('fib').specs.in.decode('scalar:')).toBeUndefined();
    expect(build('fib').specs.in.decode('scalar:1.5')).toBeUndefined();
    // Missing the amount half.
    expect(build('coin-change').specs.in.decode('coins:1,3,4')).toBeUndefined();
    // One bad entry rejects the whole list.
    expect(build('coin-change').specs.in.decode('coins:1,x,4:11')).toBeUndefined();
    expect(build('lis').specs.in.decode('sequence:3,,2')).toBeUndefined();
    // An item that is not a weight/value pair.
    expect(build('knapsack').specs.in.decode('items:2/3,4:9')).toBeUndefined();
    expect(build('knapsack').specs.in.decode('items:2/3:abc')).toBeUndefined();
    // Only one string, and a pair whose halves cannot be told apart.
    expect(build('lcs').specs.in.decode('strings2:AGGT')).toBeUndefined();
    expect(build('lcs').specs.in.decode('strings2:A:B:C')).toBeUndefined();
    expect(build('matrix-chain').specs.in.decode('chain:40,20,x')).toBeUndefined();
  });

  it('rejects an input the domain itself refuses, never a half-valid one', () => {
    // Fibonacci's own `validate` caps n at 40 …
    expect(build('fib').specs.in.decode('scalar:41')).toBeUndefined();
    expect(build('fib').specs.in.decode('scalar:-1')).toBeUndefined();
    // … coin change rejects duplicate coins …
    expect(build('coin-change').specs.in.decode('coins:1,1,4:11')).toBeUndefined();
    // … LCS needs two non-empty strings inside the shared cell budget …
    expect(build('lcs').specs.in.decode('strings2::B')).toBeUndefined();
    // … and the 900-cell table budget covers what no single algorithm does.
    expect(build('coin-change').specs.in.decode('coins:1,3,4:100000')).toBeUndefined();
    // The neighbouring legal value still decodes, so the rejections above are
    // the boundary and not a codec that rejects everything.
    expect(build('fib').specs.in.decode('scalar:40')).toEqual({ kind: 'scalar', n: 40 });
  });

  it('gives speed a 250ms debounce, everything else none', () => {
    const { specs } = build();
    expect(specs.speed.debounceMs).toBe(250);
    expect(specs.algo.debounceMs).toBeUndefined();
    expect(specs.seed.debounceMs).toBeUndefined();
    expect(specs.in.debounceMs).toBeUndefined();
  });
});

describe('mstUrlParams', () => {
  const SEED = 1234;

  const build = (nodeCount = MST_DEFAULTS.n) => {
    const refs = {
      algoKey: ref<DsuAlgoKey>(MST_DEFAULTS.algo),
      nodeCount: ref(nodeCount),
      speed: ref(MST_DEFAULTS.speed),
      seed: ref(SEED),
      startId: ref<NodeId | null>(null),
      opScript: ref<DsuOp[]>([]),
    };
    return { specs: mstUrlParams(refs), refs };
  };

  const SCRIPT: DsuOp[] = [
    { kind: 'union', a: 3, b: 4 },
    { kind: 'find', a: 7 },
    { kind: 'union', a: 0, b: 1 },
  ];

  it('round-trips valid values, including node id 0', () => {
    const { specs } = build();
    expect(specs.algo.decode(specs.algo.encode('prim') ?? '')).toBe('prim');
    expect(specs.n.decode(specs.n.encode(11) ?? '')).toBe(11);
    expect(specs.speed.decode(specs.speed.encode(30) ?? '')).toBe(30);
    expect(specs.seed.decode(specs.seed.encode(99) ?? '')).toBe(99);
    expect(specs.start.decode(specs.start.encode(0) ?? '')).toBe(0);
    expect(specs.start.decode(specs.start.encode(5) ?? '')).toBe(5);
  });

  it('round-trips an op script as the literal sequence', () => {
    const { specs } = build();
    expect(specs.ops.encode(SCRIPT)).toBe('u3.4-f7-u0.1');
    expect(specs.ops.decode('u3.4-f7-u0.1')).toEqual(SCRIPT);
  });

  it('omits params at their default, the seeded starter script included', () => {
    const { specs } = build();
    expect(specs.algo.encode(MST_DEFAULTS.algo)).toBeNull();
    expect(specs.n.encode(MST_DEFAULTS.n)).toBeNull();
    expect(specs.speed.encode(MST_DEFAULTS.speed)).toBeNull();
    expect(specs.start.encode(null)).toBeNull();
    // The script `useMst` rebuilds when the parameter is absent, so writing it
    // would only bloat the link.
    expect(specs.ops.encode(defaultOpScript(MST_DEFAULTS.n, SEED))).toBeNull();
  });

  it('writes a deliberately emptied script rather than omitting it', () => {
    // "I cleared the list" and "I never touched it" are different links, and
    // omitting the first would hand the starter script back on reload.
    const { specs } = build();
    expect(specs.ops.encode([])).toBe('');
    expect(specs.ops.decode('')).toEqual([]);
  });

  it('rejects malformed input', () => {
    const { specs } = build();
    expect(specs.algo.decode('nonsense')).toBeUndefined();
    expect(specs.seed.decode('abc')).toBeUndefined();
    expect(specs.start.decode('abc')).toBeUndefined();
    expect(specs.n.decode('abc')).toBeUndefined();
  });

  it('clamps an out-of-range node count and start id rather than rejecting', () => {
    const { specs } = build();
    expect(specs.n.decode('1e9')).toBe(MST_NODE_MAX);
    expect(specs.n.decode('1')).toBe(MST_NODE_MIN);
    expect(specs.start.decode('-5')).toBe(0);
  });

  it('rejects a whole script naming a node the forest does not have', () => {
    const { specs } = build(8);
    // Node 8 does not exist in an 8-node forest, on either operand …
    expect(specs.ops.decode('u3.8')).toBeUndefined();
    expect(specs.ops.decode('u8.3')).toBeUndefined();
    expect(specs.ops.decode('f8')).toBeUndefined();
    // … and one bad op poisons the entire script, never just itself.
    expect(specs.ops.decode('u3.4-f9-u0.1')).toBeUndefined();
    expect(specs.ops.decode('u3.7-f7')).toEqual([
      { kind: 'union', a: 3, b: 7 },
      { kind: 'find', a: 7 },
    ]);
  });

  it('bounds-checks against the CURRENT node count, not a fixed one', () => {
    expect(build(5).specs.ops.decode('u3.4')).toEqual([{ kind: 'union', a: 3, b: 4 }]);
    expect(build(4).specs.ops.decode('u3.4')).toBeUndefined();
  });

  it('rejects a malformed op anywhere in the sequence', () => {
    const { specs } = build();
    expect(specs.ops.decode('u3.4-XX-f7')).toBeUndefined();
    // A union missing its second operand, and a find carrying one.
    expect(specs.ops.decode('u3')).toBeUndefined();
    expect(specs.ops.decode('f3.4')).toBeUndefined();
    expect(specs.ops.decode('x3.4')).toBeUndefined();
    expect(specs.ops.decode('u3.4-')).toBeUndefined();
    expect(specs.ops.decode('u-3.4')).toBeUndefined();
  });

  it('gives the slider-backed scalars a 250ms debounce, everything else none', () => {
    const { specs } = build();
    expect(specs.n.debounceMs).toBe(250);
    expect(specs.speed.debounceMs).toBe(250);
    expect(specs.algo.debounceMs).toBeUndefined();
    expect(specs.seed.debounceMs).toBeUndefined();
    expect(specs.ops.debounceMs).toBeUndefined();
  });
});

describe('hashUrlParams', () => {
  const build = () =>
    hashUrlParams({
      strategyKey: ref<HashStrategyKey>(HASH_DEFAULTS.strategy),
      hashFnKey: ref<HashFnKey>(HASH_DEFAULTS.fn),
      capacity: ref(HASH_DEFAULTS.capacity),
      threshold: ref(HASH_DEFAULTS.threshold),
      speed: ref(HASH_DEFAULTS.speed),
      seed: ref(1234),
      script: ref<HashOp[]>([]),
    });

  const SCRIPT: HashOp[] = [
    { kind: 'insert', key: 'cat' },
    { kind: 'search', key: 'dog' },
    { kind: 'delete', key: 'cat' },
  ];

  it('round-trips valid values', () => {
    const specs = build();
    expect(specs.strategy.decode(specs.strategy.encode('linear') ?? '')).toBe('linear');
    expect(specs.fn.decode(specs.fn.encode('knuth') ?? '')).toBe('knuth');
    expect(specs.cap.decode(specs.cap.encode(32) ?? '')).toBe(32);
    expect(specs.speed.decode(specs.speed.encode(40) ?? '')).toBe(40);
    expect(specs.seed.decode(specs.seed.encode(8) ?? '')).toBe(8);
  });

  it('carries the threshold as whole percent and converts back to a ratio', () => {
    const specs = build();
    expect(specs.thr.encode(0.9)).toBe('90');
    expect(specs.thr.decode('90')).toBe(0.9);
    expect(specs.thr.decode(specs.thr.encode(1.25) ?? '')).toBe(1.25);
  });

  it('round-trips an op script as the literal sequence', () => {
    const specs = build();
    expect(specs.ops.encode(SCRIPT)).toBe('icat-sdog-dcat');
    expect(specs.ops.decode('icat-sdog-dcat')).toEqual(SCRIPT);
  });

  it('omits params at their default', () => {
    const specs = build();
    expect(specs.strategy.encode(HASH_DEFAULTS.strategy)).toBeNull();
    expect(specs.fn.encode(HASH_DEFAULTS.fn)).toBeNull();
    expect(specs.cap.encode(HASH_DEFAULTS.capacity)).toBeNull();
    expect(specs.thr.encode(HASH_DEFAULTS.threshold)).toBeNull();
    expect(specs.speed.encode(HASH_DEFAULTS.speed)).toBeNull();
    // An empty script is what a fresh view already shows.
    expect(specs.ops.encode([])).toBeNull();
  });

  it('rejects malformed input', () => {
    const specs = build();
    expect(specs.strategy.decode('nonsense')).toBeUndefined();
    expect(specs.fn.decode('nonsense')).toBeUndefined();
    expect(specs.cap.decode('abc')).toBeUndefined();
    expect(specs.thr.decode('abc')).toBeUndefined();
    expect(specs.seed.decode('abc')).toBeUndefined();
  });

  it('clamps out-of-range capacity and threshold rather than rejecting', () => {
    const specs = build();
    expect(specs.cap.decode('1e9')).toBe(64);
    expect(specs.cap.decode('0')).toBe(4);
    expect(specs.thr.decode('1000')).toBe(1.5);
    expect(specs.thr.decode('0')).toBe(0.25);
  });

  it('rejects a whole script containing a key that is not alphanumeric', () => {
    const specs = build();
    // `HashOpBuilder` already refuses these, which is what makes the encoding
    // unambiguous — a hand-edited link never went through the builder.
    expect(specs.ops.decode('icat-s do g-dcat')).toBeUndefined();
    expect(specs.ops.decode('i<script>')).toBeUndefined();
    expect(specs.ops.decode('icat.dog')).toBeUndefined();
    expect(specs.ops.decode('i')).toBeUndefined();
    expect(specs.ops.decode('iabcdefghijklm')).toBeUndefined();
  });

  it('rejects a malformed op anywhere in the sequence', () => {
    const specs = build();
    expect(specs.ops.decode('icat-xdog-dcat')).toBeUndefined();
    expect(specs.ops.decode('icat--dcat')).toBeUndefined();
    expect(specs.ops.decode('cat')).toBeUndefined();
    // The empty script is still legitimate; only genuine garbage is rejected.
    expect(specs.ops.decode('')).toEqual([]);
  });

  it('gives the slider-backed scalars a 250ms debounce, everything else none', () => {
    const specs = build();
    expect(specs.cap.debounceMs).toBe(250);
    expect(specs.thr.debounceMs).toBe(250);
    expect(specs.speed.debounceMs).toBe(250);
    expect(specs.strategy.debounceMs).toBeUndefined();
    expect(specs.fn.debounceMs).toBeUndefined();
    expect(specs.seed.debounceMs).toBeUndefined();
    expect(specs.ops.debounceMs).toBeUndefined();
  });
});

describe('decodeKey (prototype guard, reused by every category above)', () => {
  it('rejects prototype members like toString and constructor', () => {
    expect(decodeKey(sortAlgorithms, 'toString')).toBeUndefined();
    expect(decodeKey(sortAlgorithms, 'constructor')).toBeUndefined();
    expect(decodeKey(graphAlgorithms, 'toString')).toBeUndefined();
  });

  it('accepts a genuine registry key', () => {
    expect(decodeKey(sortAlgorithms, 'bubble')).toBe('bubble');
  });
});
