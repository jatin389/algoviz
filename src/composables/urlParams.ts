import { computed } from 'vue';
import type { Ref } from 'vue';
import type { UrlParamSpecs } from './useUrlState';
import {
  decodeInt,
  decodeKey,
  encodeCoord,
  decodeCoord,
  encodeOpScript,
  decodeOpScript,
} from '@/utils/urlCodec';
import type { OpScriptCodec } from '@/utils/urlCodec';
import { parseSeed } from '@/utils/rng';
import type { Coord, DsuOp, HashOp, HashOpKind, NodeId } from '@/types';
import { algorithms as sortAlgorithms } from '@/algorithms';
import type { SortAlgoKey } from '@/algorithms';
import { algorithms as searchAlgorithms } from '@/algorithms/search';
import type { SearchAlgoKey } from '@/algorithms/search';
import { algorithms as pathAlgorithms } from '@/algorithms/pathfinding';
import type { PathAlgoKey } from '@/algorithms/pathfinding';
import { algorithms as graphAlgorithms } from '@/algorithms/graph';
import type { GraphAlgoKey } from '@/algorithms/graph';
import { algorithms as dpAlgorithms, validateInput as validateDpInput } from '@/algorithms/dp';
import type { DpAlgoKey, DpInput, DpItem } from '@/algorithms/dp';
import { algorithms as dsuAlgorithms } from '@/algorithms/dsu';
import type { DsuAlgoKey } from '@/algorithms/dsu';
import { algorithms as hashAlgorithms, DEFAULT_STRATEGY } from '@/algorithms/hashtable';
import type { HashStrategyKey } from '@/algorithms/hashtable';
import { hashFns, DEFAULT_HASH_FN } from '@/algorithms/hashtable/hashFns';
import type { HashFnKey } from '@/algorithms/hashtable/hashFns';
// The DP input's canonical string form and the DSU starter script both live in
// their own composable, which in turn imports this module for its specs. The
// resulting import cycle is inert: nothing here is read while a module body is
// evaluating — every reference below sits inside an `encode`/`decode` closure
// that only runs once both modules are fully loaded.
import { dpInputSignature } from './useDp';
import { defaultOpScript, MST_NODE_MIN, MST_NODE_MAX } from './useMst';
import { scenarios, DEFAULT_SCENARIO } from '@/concurrency/scenarios';
import type { ScenarioKey } from '@/concurrency/scenarios';
import type { Scenario } from '@/concurrency/types';
import { isValidSchedule } from '@/concurrency/execute';
import { encodeSource, decodeSource } from '@/sandbox/encode';
import {
  STARTER_SOURCE,
  SANDBOX_DEFAULT_SIZE,
  SANDBOX_DEFAULT_SPEED,
  SANDBOX_SIZE_MIN,
  SANDBOX_SIZE_MAX,
} from '@/sandbox/contract';

/**
 * urlParams — pure `UrlParamSpecs` factories, one per category.
 *
 * Deliberately plain functions rather than composables that call
 * `useUrlState` themselves: keeping the encode/decode pairs free of
 * `useRouter()` is what lets `urlParams.test.ts` exercise every codec with
 * bare `ref(...)`s, no router and no mounted component required.
 */

// ---- shared helpers ---------------------------------------------------------

/** Encodes a seed, which is always written — it's the whole point of a shareable link. */
function encodeSeed(seed: number): string {
  return String(seed);
}

/** Rejects malformed input via `parseSeed`, converting its `null` into `undefined`
 *  ("reject, keep current value") to match `UrlParamSpec.decode`'s contract. */
function decodeSeed(raw: string): number | undefined {
  const parsed = parseSeed(raw);
  return parsed === null ? undefined : parsed;
}

/**
 * A whole number with no range of its own, unlike `decodeInt` — which clamps,
 * and so needs bounds the caller can state. The DP input codec below has no
 * such bounds to give: what a legal `n`, coin or dimension is belongs to each
 * algorithm's own `validate`, which runs over the assembled input afterwards.
 */
function decodeIntToken(raw: string): number | undefined {
  if (raw.trim() === '') return undefined;
  const n = Number(raw);
  // `Number.isInteger` also rejects NaN and both infinities.
  return Number.isInteger(n) ? n : undefined;
}

/** A `,`-separated integer list, rejected in full if any entry is malformed. */
function decodeIntList(raw: string): number[] | undefined {
  const values: number[] = [];
  for (const part of raw.split(',')) {
    const value = decodeIntToken(part);
    if (value === undefined) return undefined;
    values.push(value);
  }
  return values;
}

// ---- sorter ------------------------------------------------------------------

export const SORTER_DEFAULTS = {
  algo: 'bubble' as SortAlgoKey,
  size: 45,
  speed: 60,
};

export function sorterUrlParams(refs: {
  algoKey: Ref<SortAlgoKey>;
  size: Ref<number>;
  speed: Ref<number>;
  seed: Ref<number>;
}): UrlParamSpecs<{ algo: SortAlgoKey; size: number; speed: number; seed: number }> {
  return {
    algo: {
      ref: refs.algoKey,
      encode: (k) => (k === SORTER_DEFAULTS.algo ? null : k),
      decode: (raw) => decodeKey(sortAlgorithms, raw),
    },
    size: {
      ref: refs.size,
      encode: (n) => (n === SORTER_DEFAULTS.size ? null : String(n)),
      decode: (raw) => decodeInt(raw, 10, 100),
      debounceMs: 250,
    },
    speed: {
      ref: refs.speed,
      encode: (n) => (n === SORTER_DEFAULTS.speed ? null : String(n)),
      decode: (raw) => decodeInt(raw, 1, 100),
      debounceMs: 250,
    },
    seed: {
      ref: refs.seed,
      encode: encodeSeed,
      decode: decodeSeed,
    },
  };
}

// ---- searcher ------------------------------------------------------------------

export const SEARCHER_DEFAULTS = {
  algo: 'binary' as SearchAlgoKey,
  size: 20,
  speed: 60,
  // Mirrors the composable's initial `ref(0)`; `generate()` immediately
  // overwrites it with a seed-derived value, so in practice `target` behaves
  // like `seed` and is almost always written.
  target: 0,
};

export function searcherUrlParams(refs: {
  algoKey: Ref<SearchAlgoKey>;
  size: Ref<number>;
  speed: Ref<number>;
  seed: Ref<number>;
  target: Ref<number>;
}): UrlParamSpecs<{
  algo: SearchAlgoKey;
  size: number;
  speed: number;
  seed: number;
  target: number;
}> {
  return {
    algo: {
      ref: refs.algoKey,
      encode: (k) => (k === SEARCHER_DEFAULTS.algo ? null : k),
      decode: (raw) => decodeKey(searchAlgorithms, raw),
    },
    size: {
      ref: refs.size,
      encode: (n) => (n === SEARCHER_DEFAULTS.size ? null : String(n)),
      decode: (raw) => decodeInt(raw, 10, 50),
      debounceMs: 250,
    },
    speed: {
      ref: refs.speed,
      encode: (n) => (n === SEARCHER_DEFAULTS.speed ? null : String(n)),
      decode: (raw) => decodeInt(raw, 1, 100),
      debounceMs: 250,
    },
    seed: {
      ref: refs.seed,
      encode: encodeSeed,
      decode: decodeSeed,
    },
    target: {
      ref: refs.target,
      encode: (n) => (n === SEARCHER_DEFAULTS.target ? null : String(n)),
      // Bounded to the dataset's own value range (1..99, generated by
      // `randomSortedArray`), plus 0 as the untouched sentinel default.
      decode: (raw) => decodeInt(raw, 0, 99),
    },
  };
}

// ---- pathfinder ------------------------------------------------------------------

export function pathfinderUrlParams(
  refs: {
    algoKey: Ref<PathAlgoKey>;
    speed: Ref<number>;
    seed: Ref<number>;
    start: Ref<Coord>;
    end: Ref<Coord>;
  },
  dims: { rows: number; cols: number },
): UrlParamSpecs<{
  algo: PathAlgoKey;
  speed: number;
  seed: number;
  start: Coord;
  end: Coord;
}> {
  const defaultAlgo: PathAlgoKey = 'bfs';
  const defaultSpeed = 60;
  const defaultStart: Coord = { row: Math.floor(dims.rows / 2), col: 0 };
  const defaultEnd: Coord = { row: Math.floor(dims.rows / 2), col: dims.cols - 1 };
  const sameCoord = (a: Coord, b: Coord) => a.row === b.row && a.col === b.col;

  return {
    algo: {
      ref: refs.algoKey,
      encode: (k) => (k === defaultAlgo ? null : k),
      decode: (raw) => decodeKey(pathAlgorithms, raw),
    },
    speed: {
      ref: refs.speed,
      encode: (n) => (n === defaultSpeed ? null : String(n)),
      decode: (raw) => decodeInt(raw, 1, 100),
      debounceMs: 250,
    },
    seed: {
      ref: refs.seed,
      encode: encodeSeed,
      decode: decodeSeed,
    },
    start: {
      ref: refs.start,
      encode: (c) => (sameCoord(c, defaultStart) ? null : encodeCoord(c)),
      // Out-of-bounds is REJECTED rather than clamped: a clamped coordinate
      // silently lands on a different cell, which is worse than falling back
      // to the composable's current start.
      decode: (raw) => decodeCoord(raw, dims.rows, dims.cols),
    },
    end: {
      ref: refs.end,
      encode: (c) => (sameCoord(c, defaultEnd) ? null : encodeCoord(c)),
      decode: (raw) => decodeCoord(raw, dims.rows, dims.cols),
    },
  };
}

/** Adapts a `reactive<Coord>` field pair into the `Ref<Coord>` shape `UrlParamSpec`
 *  needs — `useUrlState` reads/writes `.value`, which a `reactive()` object doesn't
 *  have. A `WritableComputedRef<Coord>` satisfies `Ref<Coord>` and keeps the
 *  composable's existing reactive `start`/`end` as the single source of truth. */
export function coordRef(target: Coord): Ref<Coord> {
  return computed({
    get: () => ({ row: target.row, col: target.col }),
    set: (value) => {
      target.row = value.row;
      target.col = value.col;
    },
  });
}

// ---- graph traversal ------------------------------------------------------------------

export const GRAPH_DEFAULTS = {
  algo: 'bfs' as GraphAlgoKey,
  speed: 60,
};

export function graphUrlParams(refs: {
  algoKey: Ref<GraphAlgoKey>;
  speed: Ref<number>;
  seed: Ref<number>;
  startId: Ref<NodeId | null>;
}): UrlParamSpecs<{
  algo: GraphAlgoKey;
  speed: number;
  seed: number;
  start: NodeId | null;
}> {
  return {
    algo: {
      ref: refs.algoKey,
      encode: (k) => (k === GRAPH_DEFAULTS.algo ? null : k),
      decode: (raw) => decodeKey(graphAlgorithms, raw),
    },
    speed: {
      ref: refs.speed,
      encode: (n) => (n === GRAPH_DEFAULTS.speed ? null : String(n)),
      decode: (raw) => decodeInt(raw, 1, 100),
      debounceMs: 250,
    },
    seed: {
      ref: refs.seed,
      encode: encodeSeed,
      decode: decodeSeed,
    },
    start: {
      ref: refs.startId,
      // `null` (no node picked yet) is the only omitted case — every real
      // node id, including node 0, is written so a shared link reproduces
      // the exact traversal start.
      encode: (id) => (id === null ? null : String(id)),
      // Node ids are non-negative integers assigned by `generateGraph`
      // (`0..nodeCount - 1`); the upper bound here is a generous sanity cap,
      // not tied to any particular graph's actual size.
      decode: (raw) => decodeInt(raw, 0, 9999),
    },
  };
}

// ---- sandbox ------------------------------------------------------------------

export const SANDBOX_URL_DEFAULTS = {
  size: SANDBOX_DEFAULT_SIZE,
  speed: SANDBOX_DEFAULT_SPEED,
};

export function sandboxUrlParams(refs: {
  source: Ref<string>;
  size: Ref<number>;
  speed: Ref<number>;
  seed: Ref<number>;
}): UrlParamSpecs<{ src: string; size: number; speed: number; seed: number }> {
  return {
    src: {
      ref: refs.source,
      // The starter snippet is what an un-shared visit already shows, so
      // writing it into the URL would only bloat the link.
      encode: (text) => (text === STARTER_SOURCE ? null : encodeSource(text)),
      decode: decodeSource,
      debounceMs: 400,
    },
    size: {
      ref: refs.size,
      encode: (n) => (n === SANDBOX_URL_DEFAULTS.size ? null : String(n)),
      decode: (raw) => decodeInt(raw, SANDBOX_SIZE_MIN, SANDBOX_SIZE_MAX),
      debounceMs: 250,
    },
    speed: {
      ref: refs.speed,
      encode: (n) => (n === SANDBOX_URL_DEFAULTS.speed ? null : String(n)),
      decode: (raw) => decodeInt(raw, 1, 100),
      debounceMs: 250,
    },
    seed: {
      ref: refs.seed,
      encode: encodeSeed,
      decode: decodeSeed,
    },
  };
}

// ---- concurrency ------------------------------------------------------------------

export const CONCURRENCY_DEFAULTS = {
  scenario: DEFAULT_SCENARIO,
  speed: 60,
};

/**
 * `getScenario` is a thunk rather than a value because the schedule codec has
 * to validate against whichever scenario is current, and that changes while
 * the same specs object stays installed.
 */
export function concurrencyUrlParams(
  refs: {
    scenarioKey: Ref<ScenarioKey>;
    speed: Ref<number>;
    seed: Ref<number>;
    schedule: Ref<number[]>;
  },
  getScenario: () => Scenario,
): UrlParamSpecs<{ scenario: ScenarioKey; speed: number; seed: number; sched: string }> {
  return {
    scenario: {
      ref: refs.scenarioKey,
      encode: (k) => (k === CONCURRENCY_DEFAULTS.scenario ? null : k),
      decode: (raw) => decodeKey(scenarios, raw),
    },
    speed: {
      ref: refs.speed,
      encode: (n) => (n === CONCURRENCY_DEFAULTS.speed ? null : String(n)),
      decode: (raw) => decodeInt(raw, 1, 100),
      debounceMs: 250,
    },
    seed: {
      ref: refs.seed,
      encode: encodeSeed,
      decode: decodeSeed,
    },
    sched: {
      // The literal thread-pick sequence, not an index into a results list.
      // An index would silently point at a different interleaving the moment
      // the search or its ordering changed, quietly breaking every link ever
      // shared — the sequence reproduces the same run forever.
      //
      // Adapted between `number[]` and a digit string here rather than in the
      // composable, so the ref stays the natural type everywhere else.
      ref: computed({
        get: () => refs.schedule.value.join(''),
        set: (value: string) => {
          refs.schedule.value = [...value].map(Number);
        },
      }),
      encode: (text) => (text === '' ? null : text),
      decode: (raw) => {
        // Single digits only, which caps thread count at 10 — far past
        // anything the exhaustive search could cope with anyway.
        if (!/^[0-9]+$/.test(raw)) return undefined;
        return isValidSchedule(getScenario(), [...raw].map(Number)) ? raw : undefined;
      },
    },
  };
}

// ---- dynamic programming ------------------------------------------------------

export const DP_DEFAULTS = {
  algo: 'fib' as DpAlgoKey,
  speed: 60,
};

/** One entry of the DP registry — what `validateInput` and `kind` are read off. */
type DpAlgorithmEntry = (typeof dpAlgorithms)[DpAlgoKey];

/**
 * The body of a `dpInputSignature` (everything after the leading kind tag),
 * turned back into the input it came from.
 *
 * Structural parsing only: whether the numbers it produces are *legal* — a
 * Fibonacci `n` of 40, distinct coins, a table inside the cell budget — is
 * `validateInput`'s job, and `decodeDpInput` below runs it before accepting
 * anything. Splitting the two keeps this function free of the eight
 * algorithms' individual rules.
 */
function parseDpInputBody(kind: DpInput['kind'], body: string): DpInput | undefined {
  switch (kind) {
    case 'scalar': {
      const n = decodeIntToken(body);
      return n === undefined ? undefined : { kind: 'scalar', n };
    }

    case 'coins': {
      const parts = body.split(':');
      if (parts.length !== 2) return undefined;
      const coins = decodeIntList(parts[0]);
      const amount = decodeIntToken(parts[1]);
      if (coins === undefined || amount === undefined) return undefined;
      return { kind: 'coins', coins, amount };
    }

    case 'sequence': {
      const values = decodeIntList(body);
      return values === undefined ? undefined : { kind: 'sequence', values };
    }

    case 'items': {
      const parts = body.split(':');
      if (parts.length !== 2) return undefined;
      const capacity = decodeIntToken(parts[1]);
      if (capacity === undefined) return undefined;

      const items: DpItem[] = [];
      for (const field of parts[0].split(',')) {
        const pair = field.split('/');
        if (pair.length !== 2) return undefined;
        const weight = decodeIntToken(pair[0]);
        const value = decodeIntToken(pair[1]);
        if (weight === undefined || value === undefined) return undefined;
        items.push({ weight, value });
      }
      return { kind: 'items', items, capacity };
    }

    case 'strings2': {
      // Exactly two halves, which is also what rules out a string containing a
      // `:` — such an input is not round-trippable through this encoding, and
      // falling back to the algorithm's default is better than importing a
      // silently truncated pair.
      const parts = body.split(':');
      if (parts.length !== 2) return undefined;
      return { kind: 'strings2', a: parts[0], b: parts[1] };
    }

    case 'chain': {
      const dims = decodeIntList(body);
      return dims === undefined ? undefined : { kind: 'chain', dims };
    }
  }
}

/**
 * The inverse of `dpInputSignature`, resolved against the selected algorithm.
 *
 * Three things have to hold, and any one of them failing drops the WHOLE
 * parameter rather than salvaging part of it: the tag names an input kind, that
 * kind is the one this algorithm speaks, and `validateInput` accepts the
 * result. Comparing the tag against `algo.kind` covers the first two at once —
 * `kind` is itself a `DpInputKind`, so a tag that matches it is a real one.
 *
 * A half-valid input must never reach a generator; this is the same rule
 * `DpInputPanel` enforces on the typing path.
 */
function decodeDpInput(raw: string, algo: DpAlgorithmEntry): DpInput | undefined {
  const split = raw.indexOf(':');
  const tag = split === -1 ? raw : raw.slice(0, split);
  const body = split === -1 ? '' : raw.slice(split + 1);
  if (tag !== algo.kind) return undefined;

  const input = parseDpInputBody(algo.kind, body);
  if (input === undefined) return undefined;
  return validateDpInput(algo, input) === null ? input : undefined;
}

/**
 * `algo` is declared FIRST on purpose: `useUrlState` hydrates in key order, and
 * the `in` codec resolves against whichever algorithm is selected at the moment
 * it runs. Decoding the input before the algorithm would validate it against
 * the default algorithm and reject every link that changes both.
 */
export function dpUrlParams(refs: {
  algoKey: Ref<DpAlgoKey>;
  input: Ref<DpInput>;
  speed: Ref<number>;
  seed: Ref<number>;
}): UrlParamSpecs<{ algo: DpAlgoKey; speed: number; seed: number; in: DpInput }> {
  return {
    algo: {
      ref: refs.algoKey,
      encode: (k) => (k === DP_DEFAULTS.algo ? null : k),
      decode: (raw) => decodeKey(dpAlgorithms, raw),
    },
    speed: {
      ref: refs.speed,
      encode: (n) => (n === DP_DEFAULTS.speed ? null : String(n)),
      decode: (raw) => decodeInt(raw, 1, 100),
      debounceMs: 250,
    },
    seed: {
      ref: refs.seed,
      encode: encodeSeed,
      decode: decodeSeed,
    },
    in: {
      ref: refs.input,
      // `dpInputSignature` already IS this encoding — the literal input, never
      // an index into anything, so a link keeps meaning the same run forever.
      // Sharing it with `DpInputPanel` is deliberate: two spellings of "the
      // same input" would mean a link that reproduces an input the panel then
      // immediately rewrites.
      //
      // Omitted when it is the selected algorithm's own default, which is what
      // an un-shared visit already shows.
      encode: (input) => {
        const signature = dpInputSignature(input);
        const fallback = dpInputSignature(dpAlgorithms[refs.algoKey.value].defaults);
        return signature === fallback ? null : signature;
      },
      decode: (raw) => decodeDpInput(raw, dpAlgorithms[refs.algoKey.value]),
    },
  };
}

// ---- union-find / MST ------------------------------------------------------

export const MST_DEFAULTS = {
  algo: 'kruskal' as DsuAlgoKey,
  // Mirrors `useMst`'s own DEFAULT_NODE_COUNT.
  n: 8,
  speed: 60,
};

/**
 * The DSU script codec, bound to a node count.
 *
 * `u` or `f` for the kind, `.` between a union's two operands, and `-` between
 * ops (`OP_SCRIPT_SEPARATOR`), so `u3.4-f7-u0.1` is "union 3 and 4, find 7,
 * union 0 and 1". Both separators are RFC 3986 unreserved, so nothing is
 * percent-escaped and the parameter stays readable in a pasted link.
 *
 * Every index is bounds-checked against the CURRENT node count, and a single
 * out-of-range one rejects the whole script (`decodeOpScript`'s all-or-nothing
 * contract): an op naming a node the forest does not have is not a slightly
 * wrong run, it is one the generator would index off the end of.
 */
function dsuOpCodec(nodeCount: number): OpScriptCodec<DsuOp> {
  const inRange = (index: number) => index >= 0 && index < nodeCount;

  return {
    // A union with no `b` is unconstructible through `DsuOpBuilder`; falling
    // back to `a` (a no-op union of a node with itself) keeps the token
    // parseable rather than emitting the literal text "undefined", which would
    // make the entire script undecodable.
    encodeOp: (op) => (op.kind === 'union' ? `u${op.a}.${op.b ?? op.a}` : `f${op.a}`),
    decodeOp: (token) => {
      const match = /^([uf])(\d+)(?:\.(\d+))?$/.exec(token);
      if (match === null) return undefined;

      const a = Number(match[2]);
      if (!inRange(a)) return undefined;

      if (match[1] === 'f') {
        // `f3.4` is not a find with a stray operand, it is a malformed token.
        return match[3] === undefined ? { kind: 'find', a } : undefined;
      }
      if (match[3] === undefined) return undefined;
      const b = Number(match[3]);
      return inRange(b) ? { kind: 'union', a, b } : undefined;
    },
  };
}

/**
 * `n` is declared before `ops` on purpose: `useUrlState` hydrates in key order
 * and the script's bounds check reads the live node count, so a link carrying
 * both must apply the count first or every index is checked against the wrong
 * forest.
 */
export function mstUrlParams(refs: {
  algoKey: Ref<DsuAlgoKey>;
  nodeCount: Ref<number>;
  speed: Ref<number>;
  seed: Ref<number>;
  startId: Ref<NodeId | null>;
  opScript: Ref<DsuOp[]>;
}): UrlParamSpecs<{
  algo: DsuAlgoKey;
  n: number;
  speed: number;
  seed: number;
  start: NodeId | null;
  ops: DsuOp[];
}> {
  return {
    algo: {
      ref: refs.algoKey,
      encode: (k) => (k === MST_DEFAULTS.algo ? null : k),
      decode: (raw) => decodeKey(dsuAlgorithms, raw),
    },
    n: {
      ref: refs.nodeCount,
      encode: (n) => (n === MST_DEFAULTS.n ? null : String(n)),
      decode: (raw) => decodeInt(raw, MST_NODE_MIN, MST_NODE_MAX),
      debounceMs: 250,
    },
    speed: {
      ref: refs.speed,
      encode: (n) => (n === MST_DEFAULTS.speed ? null : String(n)),
      decode: (raw) => decodeInt(raw, 1, 100),
      debounceMs: 250,
    },
    seed: {
      ref: refs.seed,
      encode: encodeSeed,
      decode: decodeSeed,
    },
    start: {
      ref: refs.startId,
      // Same rule as `graphUrlParams`: `null` (no node picked yet) is the only
      // omitted case, so a shared link reproduces Prim's exact root — node 0
      // included. `useMst.generate` drops a root the graph does not contain.
      encode: (id) => (id === null ? null : String(id)),
      decode: (raw) => decodeInt(raw, 0, 9999),
    },
    ops: {
      ref: refs.opScript,
      // Omitted only when the script still IS the seeded starter one, which is
      // exactly what `useMst` rebuilds when the parameter is absent. An empty
      // script is therefore written as `ops=` rather than omitted: "I cleared
      // the list" and "I never touched it" are different links.
      encode: (ops) => {
        const codec = dsuOpCodec(refs.nodeCount.value);
        const encoded = encodeOpScript(ops, codec);
        const starter = defaultOpScript(refs.nodeCount.value, refs.seed.value);
        return encoded === encodeOpScript(starter, codec) ? null : encoded;
      },
      decode: (raw) => decodeOpScript(raw, dsuOpCodec(refs.nodeCount.value)),
    },
  };
}

// ---- hash tables ------------------------------------------------------------

export const HASH_DEFAULTS = {
  strategy: DEFAULT_STRATEGY,
  fn: DEFAULT_HASH_FN,
  capacity: 8,
  threshold: 0.75,
  speed: 60,
};

/**
 * The threshold travels as a whole percentage, not the 0..1 ratio the domain
 * stores: `decodeInt` is integer-only, and it is the unit the slider itself
 * shows, so `thr=90` reads the way the control does. Both sides convert here so
 * the ratio stays the only representation anything else ever sees.
 */
const THRESHOLD_PERCENT_MIN = 25;
const THRESHOLD_PERCENT_MAX = 150;
const toThresholdPercent = (ratio: number) => Math.round(ratio * 100);

const HASH_OP_INITIAL: Record<HashOpKind, string> = {
  insert: 'i',
  search: 's',
  delete: 'd',
};

const HASH_OP_KIND: Record<'i' | 's' | 'd', HashOpKind> = {
  i: 'insert',
  s: 'search',
  d: 'delete',
};

/**
 * The hash script codec: a kind initial (`i`/`s`/`d`) followed by the key, with
 * `-` between ops (`OP_SCRIPT_SEPARATOR`) — so `icat-sdog-dcat` is "insert cat,
 * search dog, delete cat". No separator is needed inside a token because the
 * kind is exactly one character.
 *
 * Keys are re-checked against the alphanumeric rule rather than trusted:
 * `HashOpBuilder` already refuses anything else, which is what makes the
 * encoding unambiguous, but a hand-edited link never went through the builder.
 */
const HASH_KEY_TOKEN = /^([isd])([A-Za-z0-9]{1,12})$/;

const hashOpCodec: OpScriptCodec<HashOp> = {
  encodeOp: (op) => `${HASH_OP_INITIAL[op.kind]}${op.key}`,
  decodeOp: (token) => {
    const match = HASH_KEY_TOKEN.exec(token);
    if (match === null) return undefined;
    return { kind: HASH_OP_KIND[match[1] as 'i' | 's' | 'd'], key: match[2] };
  },
};

export function hashUrlParams(refs: {
  strategyKey: Ref<HashStrategyKey>;
  hashFnKey: Ref<HashFnKey>;
  capacity: Ref<number>;
  threshold: Ref<number>;
  speed: Ref<number>;
  seed: Ref<number>;
  script: Ref<HashOp[]>;
}): UrlParamSpecs<{
  strategy: HashStrategyKey;
  fn: HashFnKey;
  cap: number;
  thr: number;
  speed: number;
  seed: number;
  ops: HashOp[];
}> {
  return {
    strategy: {
      ref: refs.strategyKey,
      encode: (k) => (k === HASH_DEFAULTS.strategy ? null : k),
      decode: (raw) => decodeKey(hashAlgorithms, raw),
    },
    fn: {
      ref: refs.hashFnKey,
      encode: (k) => (k === HASH_DEFAULTS.fn ? null : k),
      decode: (raw) => decodeKey(hashFns, raw),
    },
    cap: {
      ref: refs.capacity,
      // The requested capacity, which the table rounds up to a power of two —
      // encoding the rounded one would rewrite the slider's own position.
      encode: (n) => (n === HASH_DEFAULTS.capacity ? null : String(n)),
      decode: (raw) => decodeInt(raw, 4, 64),
      debounceMs: 250,
    },
    thr: {
      ref: refs.threshold,
      encode: (ratio) =>
        toThresholdPercent(ratio) === toThresholdPercent(HASH_DEFAULTS.threshold)
          ? null
          : String(toThresholdPercent(ratio)),
      decode: (raw) => {
        const percent = decodeInt(raw, THRESHOLD_PERCENT_MIN, THRESHOLD_PERCENT_MAX);
        return percent === undefined ? undefined : percent / 100;
      },
      debounceMs: 250,
    },
    speed: {
      ref: refs.speed,
      encode: (n) => (n === HASH_DEFAULTS.speed ? null : String(n)),
      decode: (raw) => decodeInt(raw, 1, 100),
      debounceMs: 250,
    },
    seed: {
      ref: refs.seed,
      encode: encodeSeed,
      decode: decodeSeed,
    },
    ops: {
      ref: refs.script,
      // An empty script is what a fresh view already shows, so it is omitted
      // rather than written as `ops=`.
      encode: (ops) => (ops.length === 0 ? null : encodeOpScript(ops, hashOpCodec)),
      decode: (raw) => decodeOpScript(raw, hashOpCodec),
    },
  };
}
