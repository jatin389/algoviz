import { describe, it, expect } from 'vitest';
import type { DpCell, DpStep } from '@/types';
import { algorithms, dpAlgoKeys } from './index';
import type { DpAlgoKey } from './index';
import type { ChainInput, CoinsInput, DpInput, ItemsInput, SequenceInput } from './types';
import type { ScalarInput, Strings2Input } from './types';
import { UNREACHABLE } from './types';
import { bindSpec, MAX_TABLE_CELLS, validateInput } from './_utils';
import { pseudocode } from './pseudocode';
import { source, sourceMap } from './source';
import { dpCues, defaultDpCues } from './dpCues';
import {
  COUNT_CAP,
  addCount,
  formatNaiveCount,
  naiveChainCalls,
  naiveEditCalls,
  naiveFibCalls,
  naiveLcsCalls,
} from './naiveCount';

// ---- Harness ---------------------------------------------------------------

function run(key: DpAlgoKey, input: DpInput): DpStep[] {
  return [...bindSpec(algorithms[key], input).generator()];
}

const fillSteps = (steps: DpStep[]) => steps.filter((s) => s.cursor !== null);
const last = (steps: DpStep[]) => steps[steps.length - 1];

/**
 * Every fixture is a runnable input plus a way to read the answer out of the
 * finished table, because "the answer cell" is genuinely per-algorithm: LIS's
 * lives at an argmax, matrix chain's in the top-right corner, knapsack's at the
 * bottom-right.
 */
interface Fixture {
  key: DpAlgoKey;
  input: DpInput;
  /** Known answer, computed independently of any code under test. */
  expected: number;
  answerOf: (step: DpStep) => number;
}

const bottomRight = (step: DpStep) =>
  step.table[step.table.length - 1][step.table[0].length - 1] ?? 0;
const rowEnd = (step: DpStep) => step.table[0][step.table[0].length - 1] ?? 0;
const rowMax = (step: DpStep) => Math.max(...step.table[0].map((v) => v ?? 0));
const topRight = (step: DpStep) => step.table[0][step.table[0].length - 1] ?? 0;

const scalar = (n: number): ScalarInput => ({ kind: 'scalar', n });
const coins = (list: number[], amount: number): CoinsInput => ({
  kind: 'coins',
  coins: list,
  amount,
});
const seq = (values: number[]): SequenceInput => ({ kind: 'sequence', values });
const items = (pairs: [number, number][], capacity: number): ItemsInput => ({
  kind: 'items',
  items: pairs.map(([weight, value]) => ({ weight, value })),
  capacity,
});
const two = (a: string, b: string): Strings2Input => ({ kind: 'strings2', a, b });
const chain = (dims: number[]): ChainInput => ({ kind: 'chain', dims });

// Known answers, all checkable by hand: fib(12) = 144; {1, 3, 4} makes 11 in
// three coins (4 + 4 + 3); [3, 10, 2, 1, 20, 4, 6, 21, 5] has the length-4
// increasing subsequence 3, 4, 6, 21. They are literals so a regression shows
// up as a wrong *number* rather than as two implementations agreeing on a bug —
// the brute-force cross-check below is the second, independent opinion.
const fixtures: Fixture[] = [
  { key: 'fib', input: scalar(12), expected: 144, answerOf: rowEnd },
  { key: 'fib', input: scalar(0), expected: 0, answerOf: rowEnd },
  { key: 'fib', input: scalar(1), expected: 1, answerOf: rowEnd },
  { key: 'coin-change', input: coins([1, 3, 4], 11), expected: 3, answerOf: rowEnd },
  { key: 'coin-change', input: coins([2], 7), expected: UNREACHABLE, answerOf: rowEnd },
  { key: 'coin-change', input: coins([1, 5, 10, 25], 63), expected: 6, answerOf: rowEnd },
  { key: 'lis', input: seq([3, 10, 2, 1, 20, 4, 6, 21, 5]), expected: 4, answerOf: rowMax },
  { key: 'lis', input: seq([5, 4, 3, 2, 1]), expected: 1, answerOf: rowMax },
  { key: 'lis', input: seq([7]), expected: 1, answerOf: rowMax },
  {
    key: 'knapsack',
    input: items(
      [
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 8],
      ],
      9,
    ),
    expected: 13,
    answerOf: bottomRight,
  },
  {
    key: 'knapsack',
    input: items([[10, 60]], 5),
    expected: 0,
    answerOf: bottomRight,
  },
  {
    key: 'subset-sum',
    input: items(
      [
        [3, 0],
        [34, 0],
        [4, 0],
        [12, 0],
        [5, 0],
        [2, 0],
      ],
      9,
    ),
    expected: 1,
    answerOf: bottomRight,
  },
  {
    key: 'subset-sum',
    input: items(
      [
        [3, 0],
        [7, 0],
      ],
      5,
    ),
    expected: 0,
    answerOf: bottomRight,
  },
  { key: 'lcs', input: two('AGGTAB', 'GXTXAYB'), expected: 4, answerOf: bottomRight },
  { key: 'lcs', input: two('abc', 'xyz'), expected: 0, answerOf: bottomRight },
  { key: 'edit-distance', input: two('kitten', 'sitting'), expected: 3, answerOf: bottomRight },
  { key: 'edit-distance', input: two('same', 'same'), expected: 0, answerOf: bottomRight },
  { key: 'matrix-chain', input: chain([40, 20, 30, 10, 30]), expected: 26000, answerOf: topRight },
  { key: 'matrix-chain', input: chain([10, 20]), expected: 0, answerOf: topRight },
];

// ---- Independent reference implementations ---------------------------------
//
// Deliberately naive: exhaustive subsets and unmemoized recursion, i.e. exactly
// the algorithms the tables replace. Running them beside the generators on
// small inputs is what makes the table's answer *verified* rather than merely
// self-consistent — a bug in a recurrence would otherwise agree with itself.

function bruteFib(n: number): number {
  return n < 2 ? n : bruteFib(n - 1) + bruteFib(n - 2);
}

function bruteCoin(list: number[], amount: number): number {
  if (amount === 0) return 0;
  let bestSoFar = UNREACHABLE;
  for (const c of list) {
    if (c > amount) continue;
    const rest = bruteCoin(list, amount - c);
    if (rest !== UNREACHABLE) bestSoFar = Math.min(bestSoFar, rest + 1);
  }
  return bestSoFar;
}

/** Every subsequence, by bitmask. Only usable for n <= ~16. */
function bruteLis(values: number[]): number {
  const n = values.length;
  let longest = 0;
  for (let mask = 1; mask < 1 << n; mask++) {
    const picked: number[] = [];
    for (let i = 0; i < n; i++) if (mask & (1 << i)) picked.push(values[i]);
    if (picked.every((v, i) => i === 0 || picked[i - 1] < v)) {
      longest = Math.max(longest, picked.length);
    }
  }
  return longest;
}

function bruteKnapsack(input: ItemsInput): number {
  const n = input.items.length;
  let bestValue = 0;
  for (let mask = 0; mask < 1 << n; mask++) {
    let weight = 0;
    let value = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        weight += input.items[i].weight;
        value += input.items[i].value;
      }
    }
    if (weight <= input.capacity) bestValue = Math.max(bestValue, value);
  }
  return bestValue;
}

function bruteSubsetSum(input: ItemsInput): boolean {
  const n = input.items.length;
  for (let mask = 0; mask < 1 << n; mask++) {
    let sum = 0;
    for (let i = 0; i < n; i++) if (mask & (1 << i)) sum += input.items[i].weight;
    if (sum === input.capacity) return true;
  }
  return false;
}

function bruteLcs(a: string, b: string): number {
  if (a.length === 0 || b.length === 0) return 0;
  if (a[a.length - 1] === b[b.length - 1]) return 1 + bruteLcs(a.slice(0, -1), b.slice(0, -1));
  return Math.max(bruteLcs(a.slice(0, -1), b), bruteLcs(a, b.slice(0, -1)));
}

function bruteEdit(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  if (a[a.length - 1] === b[b.length - 1]) return bruteEdit(a.slice(0, -1), b.slice(0, -1));
  return (
    1 +
    Math.min(
      bruteEdit(a.slice(0, -1), b.slice(0, -1)),
      bruteEdit(a.slice(0, -1), b),
      bruteEdit(a, b.slice(0, -1)),
    )
  );
}

function bruteChain(dims: number[], i: number, j: number): number {
  if (i === j) return 0;
  let cheapest = Infinity;
  for (let k = i; k < j; k++) {
    const cost =
      bruteChain(dims, i, k) + bruteChain(dims, k + 1, j) + dims[i] * dims[k + 1] * dims[j + 1];
    cheapest = Math.min(cheapest, cost);
  }
  return cheapest;
}

// ---- Final answers ---------------------------------------------------------

describe('dp generators produce the right answer', () => {
  for (const { key, input, expected, answerOf } of fixtures) {
    it(`${key} on ${JSON.stringify(input)} reaches ${expected}`, () => {
      const steps = run(key, input);
      const terminal = last(steps);
      expect(terminal.done).toBe(true);
      expect(answerOf(terminal)).toBe(expected);
      expect(terminal.result).not.toBeNull();
    });
  }

  it('matches a brute-force reference on small inputs', () => {
    for (let n = 0; n <= 14; n++) {
      expect(rowEnd(last(run('fib', scalar(n))))).toBe(bruteFib(n));
    }

    for (const [list, amount] of [
      [[1, 3, 4], 11],
      [[2, 5], 9],
      [[2], 7],
      [[3, 7], 12],
    ] as [number[], number][]) {
      expect(rowEnd(last(run('coin-change', coins(list, amount))))).toBe(bruteCoin(list, amount));
    }

    for (const values of [
      [3, 10, 2, 1, 20],
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4],
      [9, 1, 9, 1, 9],
    ]) {
      expect(rowMax(last(run('lis', seq(values))))).toBe(bruteLis(values));
    }

    const packs: ItemsInput[] = [
      items(
        [
          [2, 3],
          [3, 4],
          [4, 5],
          [5, 8],
        ],
        9,
      ),
      items(
        [
          [1, 1],
          [2, 6],
          [3, 10],
          [5, 16],
        ],
        7,
      ),
      items([[10, 60]], 5),
    ];
    for (const pack of packs) {
      expect(bottomRight(last(run('knapsack', pack)))).toBe(bruteKnapsack(pack));
      expect(bottomRight(last(run('subset-sum', pack)))).toBe(bruteSubsetSum(pack) ? 1 : 0);
    }

    for (const [a, b] of [
      ['AGGTAB', 'GXTXAYB'],
      ['abc', 'xyz'],
      ['abcde', 'ace'],
      ['kitten', 'sitting'],
    ]) {
      expect(bottomRight(last(run('lcs', two(a, b))))).toBe(bruteLcs(a, b));
      expect(bottomRight(last(run('edit-distance', two(a, b))))).toBe(bruteEdit(a, b));
    }

    for (const dims of [
      [40, 20, 30, 10, 30],
      [10, 20, 30],
      [5, 10, 3, 12, 5, 50, 6],
    ]) {
      expect(topRight(last(run('matrix-chain', chain(dims))))).toBe(
        bruteChain(dims, 0, dims.length - 2),
      );
    }
  });
});

// ---- depsOf is the single source of provenance -----------------------------

describe('depsOf agrees with what the generator emitted', () => {
  for (const { key, input } of fixtures) {
    it(`${key} on ${JSON.stringify(input)}`, () => {
      const bound = bindSpec(algorithms[key], input);
      const steps = run(key, input);
      const finalTable = last(steps).table;

      for (const step of fillSteps(steps)) {
        const { row, col } = step.cursor as DpCell;

        // Against the snapshot the generator itself produced: the arrows drawn
        // during the animation are exactly what depsOf says.
        expect(step.deps).toEqual(bound.depsOf(row, col, step.table));

        // And against the *finished* table, which is all the hover overlay ever
        // has: a dependency is always written before the cell that reads it, so
        // its value is already final. If that ever stopped being true, hovering
        // a cell after a run would quietly contradict the animation.
        expect(step.deps).toEqual(bound.depsOf(row, col, finalTable));
      }
    });
  }

  it('is total — every cell of every finished table can be asked', () => {
    for (const { key, input } of fixtures) {
      const bound = bindSpec(algorithms[key], input);
      const table = last(run(key, input)).table;
      for (let row = 0; row < table.length; row++) {
        for (let col = 0; col < table[row].length; col++) {
          expect(() => bound.depsOf(row, col, table)).not.toThrow();
        }
      }
    }
  });

  it('never lists the cursor cell as its own dependency', () => {
    for (const { key, input } of fixtures) {
      for (const step of fillSteps(run(key, input))) {
        const { row, col } = step.cursor as DpCell;
        expect(step.deps.some((d) => d.row === row && d.col === col)).toBe(false);
      }
    }
  });

  it('points `chosen` at a cell that is also a dependency', () => {
    for (const { key, input } of fixtures) {
      for (const step of fillSteps(run(key, input))) {
        if (step.chosen === null) continue;
        const hit = step.deps.some((d) => d.row === step.chosen?.row && d.col === step.chosen?.col);
        expect(hit).toBe(true);
      }
    }
  });
});

// ---- Traceback validity ----------------------------------------------------
//
// The strong form of "the traceback works": not "the string looks plausible"
// but "decode the path back into an actual object and check that object really
// achieves the value the table claims".

describe('traceback reconstructs an answer that achieves the optimum', () => {
  it('coin change: the coins named sum to the amount, in the fewest possible', () => {
    const input = coins([1, 3, 4], 11);
    const terminal = last(run('coin-change', input));
    const path = terminal.path;
    const used: number[] = [];
    for (let i = 1; i < path.length; i++) used.push(path[i - 1].col - path[i].col);

    expect(used.every((c) => input.coins.includes(c))).toBe(true);
    expect(used.reduce((a, b) => a + b, 0)).toBe(input.amount);
    expect(used.length).toBe(rowEnd(terminal));
  });

  it('coin change: an unreachable amount produces no path at all', () => {
    const terminal = last(run('coin-change', coins([2], 7)));
    expect(terminal.path).toHaveLength(0);
    expect(terminal.result).toContain('no combination');
  });

  it('LIS: the reconstructed subsequence is increasing and full length', () => {
    const input = seq([3, 10, 2, 1, 20, 4, 6, 21, 5]);
    const terminal = last(run('lis', input));
    const picked = [...terminal.path].reverse().map((c) => input.values[c.col]);
    expect(picked.every((v, i) => i === 0 || picked[i - 1] < v)).toBe(true);
    expect(picked).toHaveLength(rowMax(terminal));
  });

  it('knapsack: the chosen items fit and are worth exactly the table value', () => {
    const input = items(
      [
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 8],
      ],
      9,
    );
    const terminal = last(run('knapsack', input));
    const path = terminal.path;
    let weight = 0;
    let value = 0;
    for (let i = 1; i < path.length; i++) {
      if (path[i].col === path[i - 1].col) continue; // skipped this item
      const item = input.items[path[i - 1].row - 1];
      weight += item.weight;
      value += item.value;
    }
    expect(weight).toBeLessThanOrEqual(input.capacity);
    expect(value).toBe(bottomRight(terminal));
  });

  it('subset sum: the chosen weights hit the target exactly', () => {
    const input = items(
      [
        [3, 0],
        [34, 0],
        [4, 0],
        [12, 0],
        [5, 0],
        [2, 0],
      ],
      9,
    );
    const terminal = last(run('subset-sum', input));
    const path = terminal.path;
    let sum = 0;
    for (let i = 1; i < path.length; i++) {
      if (path[i].col === path[i - 1].col) continue;
      sum += input.items[path[i - 1].row - 1].weight;
    }
    expect(sum).toBe(input.capacity);
  });

  it('LCS: the reconstructed string is a subsequence of both inputs', () => {
    const input = two('AGGTAB', 'GXTXAYB');
    const terminal = last(run('lcs', input));
    const path = terminal.path;
    const chars: string[] = [];
    for (let i = 1; i < path.length; i++) {
      const from = path[i - 1];
      const to = path[i];
      if (to.row === from.row - 1 && to.col === from.col - 1) chars.push(input.a[from.row - 1]);
    }
    chars.reverse();
    const text = chars.join('');
    expect(text).toHaveLength(bottomRight(terminal));
    expect(isSubsequence(text, input.a)).toBe(true);
    expect(isSubsequence(text, input.b)).toBe(true);
    expect(terminal.result).toContain(text);
  });

  it('edit distance: applying the reconstructed script turns a into b', () => {
    for (const [a, b] of [
      ['kitten', 'sitting'],
      ['abc', 'xyz'],
      ['same', 'same'],
      ['ab', 'abcd'],
    ]) {
      const input = two(a, b);
      const terminal = last(run('edit-distance', input));
      const path = terminal.path;

      // Walk the path forwards (it was recorded backwards) and rebuild `b`.
      let rebuilt = '';
      let edits = 0;
      for (let i = path.length - 1; i > 0; i--) {
        const to = path[i - 1];
        const from = path[i];
        const diag = to.row === from.row + 1 && to.col === from.col + 1;
        const downOnly = to.row === from.row + 1 && to.col === from.col;
        if (diag) {
          rebuilt += b[to.col - 1];
          if (a[to.row - 1] !== b[to.col - 1]) edits += 1;
        } else if (downOnly) {
          edits += 1; // delete a[to.row - 1]
        } else {
          rebuilt += b[to.col - 1];
          edits += 1; // insert
        }
      }
      expect(rebuilt).toBe(b);
      expect(edits).toBe(bottomRight(terminal));
    }
  });

  it('matrix chain: the parenthesisation really costs what the table says', () => {
    for (const dims of [
      [40, 20, 30, 10, 30],
      [5, 10, 3, 12, 5, 50, 6],
      [10, 20],
    ]) {
      const terminal = last(run('matrix-chain', chain(dims)));
      const parens = (terminal.result ?? '').split(' — ')[0];
      expect(costOfParenthesisation(parens, dims)).toBe(topRight(terminal));
    }
  });

  it('fibonacci: the whole row is the provenance of the last cell', () => {
    const terminal = last(run('fib', scalar(12)));
    expect(terminal.path).toHaveLength(13);
    expect(terminal.result).toBe('fib(12) = 144');
  });
});

function isSubsequence(needle: string, haystack: string): boolean {
  let i = 0;
  for (const ch of haystack) if (i < needle.length && needle[i] === ch) i += 1;
  return i === needle.length;
}

/**
 * Parse `((A1A2)(A3A4))` and total the scalar multiplications it implies.
 *
 * This is the only way to check the *parenthesisation* rather than just the
 * number beside it — matrix chain's traceback is a tree, so a wrong split can
 * still yield a well-formed string containing every matrix once.
 */
function costOfParenthesisation(text: string, dims: number[]): number {
  let at = 0;
  let total = 0;

  function parse(): { rows: number; cols: number } {
    if (text[at] === '(') {
      at += 1;
      const leftSide = parse();
      const rightSide = parse();
      if (text[at] !== ')') throw new Error(`unbalanced at ${at} in ${text}`);
      at += 1;
      total += leftSide.rows * leftSide.cols * rightSide.cols;
      return { rows: leftSide.rows, cols: rightSide.cols };
    }
    if (text[at] !== 'A') throw new Error(`expected a matrix at ${at} in ${text}`);
    at += 1;
    let digits = '';
    while (at < text.length && text[at] >= '0' && text[at] <= '9') digits += text[at++];
    const index = Number(digits) - 1;
    return { rows: dims[index], cols: dims[index + 1] };
  }

  parse();
  expect(at).toBe(text.length);
  return total;
}

// ---- Snapshot immutability -------------------------------------------------

describe('snapshots are independent', () => {
  for (const key of dpAlgoKeys) {
    it(`${key} does not let a held snapshot change under the caller`, () => {
      const bound = bindSpec(algorithms[key], algorithms[key].defaults);
      const generator = bound.generator();

      const first = generator.next().value as DpStep;
      const before = first.table.map((row) => [...row]);
      first.table[0][0] = 987654;
      first.path.push({ row: 99, col: 99 });

      const rest = [...generator];
      expect(rest.every((s) => s.table[0][0] !== 987654)).toBe(true);
      expect(rest.every((s) => !s.path.some((c) => c.row === 99))).toBe(true);

      // The mutation also must not have reached back into the generator's own
      // board — the terminal table still has to hold the real value.
      expect(last(rest).table[0][0]).toBe(before[0][0]);
    });
  }
});

// ---- Counters and phases ---------------------------------------------------

describe('step bookkeeping', () => {
  for (const key of dpAlgoKeys) {
    const bound = bindSpec(algorithms[key], algorithms[key].defaults);

    it(`${key} fills exactly the cells its dims promise`, () => {
      const steps = [...bound.generator()];
      expect(fillSteps(steps).length).toBe(bound.dims.fillable);
      expect(last(steps).cellsFilled).toBe(bound.dims.fillable);
    });

    it(`${key} never decreases cellsFilled and never grows the path backwards`, () => {
      let cells = 0;
      let pathLength = 0;
      for (const step of [...bound.generator()]) {
        expect(step.cellsFilled).toBeGreaterThanOrEqual(cells);
        expect(step.path.length).toBeGreaterThanOrEqual(pathLength);
        cells = step.cellsFilled;
        pathLength = step.path.length;
      }
    });

    it(`${key} separates the two phases — no cursor once traceback starts`, () => {
      const steps = [...bound.generator()];
      const firstTraceback = steps.findIndex((s) => s.cursor === null);
      if (firstTraceback === -1) return;
      expect(steps.slice(firstTraceback).every((s) => s.cursor === null)).toBe(true);
    });

    it(`${key} explains every step it takes`, () => {
      for (const step of [...bound.generator()]) expect(step.explain).not.toBeNull();
    });

    it(`${key} produces a table of the promised size`, () => {
      const terminal = last([...bound.generator()]);
      expect(terminal.table).toHaveLength(bound.dims.rows);
      expect(terminal.table[0]).toHaveLength(bound.dims.cols);
    });
  }
});

// ---- Pseudocode tagging ----------------------------------------------------
//
// Mirrors `algorithms.test.ts`: editing a pseudocode array without renumbering
// the `line` arguments is invisible on screen except as a highlight on the
// wrong line, so the bounds are pinned here instead.

describe('pseudocode line tagging', () => {
  it('covers exactly the registered algorithms', () => {
    expect(Object.keys(pseudocode).sort()).toEqual([...dpAlgoKeys].sort());
  });

  for (const key of dpAlgoKeys) {
    const lines = pseudocode[key];

    it(`${key} yields only in-range line indices`, () => {
      const steps = [...bindSpec(algorithms[key], algorithms[key].defaults).generator()];
      for (const step of steps) {
        expect(step.line).not.toBeUndefined();
        expect(step.line).toBeGreaterThanOrEqual(0);
        expect(step.line).toBeLessThan(lines.length);
      }
    });

    it(`${key} tags its terminal step with the final line`, () => {
      const steps = [...bindSpec(algorithms[key], algorithms[key].defaults).generator()];
      expect(last(steps).line).toBe(lines.length - 1);
    });
  }
});

describe('source map', () => {
  it('recovers a source line for every tag the generator emits', () => {
    for (const key of dpAlgoKeys) {
      const map = sourceMap(key);
      const steps = [...bindSpec(algorithms[key], algorithms[key].defaults).generator()];
      const tags = new Set(steps.map((s) => s.line as number));
      for (const tag of tags) {
        // A missing entry means the `yield snap(..., N)` call got wrapped across
        // lines and the regex in sourceMap.ts stopped seeing it — which fails
        // silently in the UI, hence the assertion here.
        expect(map.get(tag), `${key} tag ${tag} has no source line`).toBeTruthy();
      }
    }
  });

  it('ships the generator text for every registered key', () => {
    for (const key of dpAlgoKeys) {
      expect(source[key].text.length).toBeGreaterThan(0);
      expect(source[key].file.endsWith('.ts')).toBe(true);
    }
  });
});

// ---- Registry --------------------------------------------------------------

describe('registry', () => {
  it('registers complete metadata for every key', () => {
    for (const key of dpAlgoKeys) {
      const entry = algorithms[key];
      expect(entry.name).not.toBe('');
      expect(entry.description).not.toBe('');
      expect(entry.recurrence).not.toBe('');
      expect(typeof entry.generator).toBe('function');
      expect(entry.complexity.time).not.toBe('');
    }
  });

  it('gives every algorithm runnable defaults', () => {
    for (const key of dpAlgoKeys) {
      expect(validateInput(algorithms[key], algorithms[key].defaults)).toBeNull();
    }
  });

  it('labels the axes to match the table it describes', () => {
    for (const key of dpAlgoKeys) {
      const bound = bindSpec(algorithms[key], algorithms[key].defaults);
      expect(bound.axes.rowHeaders).toHaveLength(bound.dims.rows);
      expect(bound.axes.colHeaders).toHaveLength(bound.dims.cols);
    }
  });

  it('resolves a cue for every key, and splits fill from traceback', () => {
    for (const key of dpAlgoKeys) {
      expect(dpCues[key]).toBeTruthy();
    }
    const steps = [...bindSpec(algorithms.knapsack, algorithms.knapsack.defaults).generator()];
    expect(defaultDpCues(fillSteps(steps)[0])).toEqual(['compare']);
    expect(defaultDpCues(last(steps))).toEqual(['hit']);
  });
});

// ---- Validation and the size budget ----------------------------------------

describe('input validation', () => {
  it('refuses a table bigger than the cell budget', () => {
    const message = validateInput(algorithms.knapsack, items([[1, 1]], 899));
    expect(message).toContain(String(MAX_TABLE_CELLS));
  });

  it('lets an algorithm reject its own nonsense before the size check runs', () => {
    expect(validateInput(algorithms['coin-change'], coins([], 10))).toBe(
      'Enter at least one coin.',
    );
    expect(validateInput(algorithms['coin-change'], coins([2, 2], 10))).toContain('distinct');
    expect(validateInput(algorithms.lcs, two('', 'abc'))).toContain('at least one character');
    expect(validateInput(algorithms.fib, scalar(-1))).toContain('0 to 40');
    expect(validateInput(algorithms['matrix-chain'], chain([5]))).toContain('at least two');
  });

  it('rejects an input of the wrong kind rather than running it', () => {
    expect(validateInput(algorithms.fib, coins([1], 3))).toContain('scalar');
  });

  it('bindSpec falls back to the defaults when the kinds do not match', () => {
    const bound = bindSpec(algorithms.fib, coins([1], 3));
    expect(bound.input).toEqual(algorithms.fib.defaults);
  });
});

// ---- Naive call counting ---------------------------------------------------

describe('naive call counts', () => {
  it('counts the nodes of the naive Fibonacci call tree exactly', () => {
    // The closed form for that tree is 2*fib(n+1) - 1; agreeing with it is the
    // check that the count recurrence is the right recurrence.
    const fibOf = (n: number): number => (n < 2 ? n : fibOf(n - 1) + fibOf(n - 2));
    for (let n = 0; n <= 20; n++) expect(naiveFibCalls(n)).toBe(2 * fibOf(n + 1) - 1);
  });

  it('makes the DP look as good as it is', () => {
    // 40 cells against 331 million calls is the headline number the stats panel
    // exists to show; pinning it stops a refactor from quietly halving it.
    expect(naiveFibCalls(40)).toBe(331160281);
    expect(naiveChainCalls(4)).toBeGreaterThan(
      algorithms['matrix-chain'].dims(chain([40, 20, 30, 10, 30])).fillable,
    );
  });

  it('saturates instead of losing precision', () => {
    expect(addCount(COUNT_CAP - 1, 5)).toBe(COUNT_CAP);
    // Two dissimilar 25-character strings blow past 2^53 in the three-way
    // mismatch branch, which is exactly the case the cap exists for.
    const a = 'abcdefghijklmnopqrstuvwxy';
    const b = 'zyxwvutsrqponmlkjihgfedcb';
    expect(naiveEditCalls(a, b)).toBe(COUNT_CAP);
    expect(formatNaiveCount(naiveEditCalls(a, b))).toBe('> 9.0e15');
  });

  it('formats small counts in full and large ones in exponent form', () => {
    expect(formatNaiveCount(naiveLcsCalls('ab', 'cd'))).toMatch(/^\d+$/);
    expect(formatNaiveCount(2_500_000)).toBe('2.5e+6');
  });
});
