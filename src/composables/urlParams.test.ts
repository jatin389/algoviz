import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { decodeKey } from '@/utils/urlCodec';
import { algorithms as sortAlgorithms } from '@/algorithms';
import { algorithms as graphAlgorithms } from '@/algorithms/graph';
import {
  sorterUrlParams,
  SORTER_DEFAULTS,
  searcherUrlParams,
  SEARCHER_DEFAULTS,
  pathfinderUrlParams,
  coordRef,
  graphUrlParams,
  GRAPH_DEFAULTS,
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
