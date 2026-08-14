// Shared snapshot helpers, recurrence plumbing and formatting for every DP
// generator.
//
// Mirrors `search/_utils.ts` and the sorting one: a generator's job is to run
// the algorithm, and the shape of what it yields is decided here so eight files
// cannot drift into eight slightly different notions of what a step is.
//
// Snapshot shape (see `types/steps.ts` for the authoritative definition):
//   {
//     table:       (number|null)[][]  // a COPY of the table at this instant
//     cursor:      DpCell | null      // the cell just written; null in traceback
//     deps:        DpDep[]            // every cell the recurrence read
//     chosen:      DpCell | null      // the branch the recurrence selected
//     explain:     string | null      // the recurrence with real numbers in it
//     path:        DpCell[]           // traceback cells, growing backwards
//     result:      string | null      // the decoded answer, on the terminal step
//     cellsFilled: number
//     done:        boolean
//     line?:       number             // index into this algorithm's pseudocode
//   }
//
// IMPORTANT — the `yield snap(..., N)` / `yield done(..., N)` call must stay on
// ONE line ending in `, N);`. `sourceMap.ts` recovers the pseudocode tag with a
// line-anchored regex, so a call Prettier wraps at 100 columns silently stops
// highlighting anything in the code panel's Source mode. Every helper below is
// named short, and the generators bind long expressions to short locals before
// yielding, for exactly that reason.

import type {
  DpAxes,
  DpBranch,
  DpCell,
  DpDep,
  DpDims,
  DpInput,
  DpStep,
  DpTableData,
} from './types';
import type { AnyDpSpec } from './types';
import type { StepGenerator } from '@/types';
import { UNREACHABLE } from './types';

// ---- Size budget -----------------------------------------------------------

/**
 * Largest table any input may produce, in cells.
 *
 * The arithmetic, in the spirit of `useStepPlayer`'s MAX_BUFFERED_STEPS note:
 * every step carries a full copy of the table, so a run costs
 * `cells x steps x 8 bytes` for the numbers alone, plus roughly the same again
 * in per-row array overhead. The fill emits one step per *fillable* cell, so at
 * 900 cells a worst-case run is 900 fill steps plus a traceback bounded by
 * `rows + cols` (<= 60 at this cap) — call it 1000 steps, or
 * `900 * 1000 * 8 = 7.2 MB` of payload and maybe 15 MB all-in. That is the same
 * order as the sorting worst case the player already tolerates.
 *
 * 900 is also about where a table stops being readable: 30x30 at the 34px cell
 * size `dpLayout` defaults to is a ~1100px square, which scrolls inside the
 * panel rather than shrinking to illegibility.
 */
export const MAX_TABLE_CELLS = 900;

/**
 * Hard ceiling handed to `useStepPlayer`, so the cap is visible at the call
 * site rather than inherited silently from MAX_BUFFERED_STEPS (50k, which at
 * 900-cell tables would be ~360 MB).
 *
 * 2000 = the 900-step fill worst case above, plus its traceback, plus 2x
 * headroom for a future algorithm that emits more than one step per cell.
 */
export const DP_MAX_STEPS = 2_000;

/**
 * The shared budget check, layered over each spec's own `validate`.
 *
 * Order matters: algorithm-specific complaints ("enter at least one coin") are
 * more useful than "table too large", and an input that is malformed enough to
 * fail `validate` may compute a nonsense size, so `validate` runs first.
 */
export function validateInput(spec: AnyDpSpec, input: DpInput): string | null {
  const loose = looseSpec(spec);
  if (loose.kind !== input.kind) return `This algorithm needs a ${loose.kind} input.`;

  const own = loose.validate(input);
  if (own) return own;

  const { rows, cols } = loose.dims(input);
  const cells = rows * cols;
  if (cells > MAX_TABLE_CELLS) {
    return `That table would be ${rows} x ${cols} = ${cells} cells; the limit is ${MAX_TABLE_CELLS}.`;
  }
  return null;
}

// ---- Binding a spec to an input --------------------------------------------

/**
 * The single unchecked cast in the DP category, and the reason it is safe.
 *
 * A `DpSpec<ScalarInput>` is not assignable to `DpSpec<DpInput>` — method
 * parameters are contravariant, and rightly so: nothing stops a caller handing
 * Fibonacci a `CoinsInput`. What does stop it is `useDp`, which keeps one input
 * per `DpInputKind` and always reads the slot named by the selected spec's own
 * `kind`, so a mismatch is unconstructible there. `bindSpec` re-checks that
 * invariant at runtime anyway and falls back to the spec's own defaults, so the
 * worst case is a table of the wrong contents rather than a thrown generator.
 */
function looseSpec(spec: AnyDpSpec): DpSpecLoose {
  return spec as unknown as DpSpecLoose;
}

type DpSpecLoose = {
  kind: DpInput['kind'];
  defaults: DpInput;
  recurrence: string;
  axes(input: DpInput): DpAxes;
  dims(input: DpInput): DpDims;
  validate(input: DpInput): string | null;
  depsOf(input: DpInput, row: number, col: number, table: DpTableData): DpDep[];
  generator(input: DpInput): StepGenerator<DpStep>;
  naiveCalls(input: DpInput): number;
};

/**
 * A spec with its input already applied.
 *
 * Everything above the algorithm layer — the composable, the view, the table's
 * hover overlay — wants "the axes", not "the axes *of this input*", and passing
 * the input back in at every call site is where a mismatched pair would sneak
 * in. Binding once, in one place, removes the opportunity.
 */
export interface BoundDpSpec {
  input: DpInput;
  recurrence: string;
  axes: DpAxes;
  dims: DpDims;
  naiveCalls: number;
  depsOf(row: number, col: number, table: DpTableData): DpDep[];
  generator(): StepGenerator<DpStep>;
}

export function bindSpec(spec: AnyDpSpec, input: DpInput): BoundDpSpec {
  const loose = looseSpec(spec);
  const safe = input.kind === loose.kind ? input : loose.defaults;

  return {
    input: safe,
    recurrence: loose.recurrence,
    axes: loose.axes(safe),
    dims: loose.dims(safe),
    naiveCalls: loose.naiveCalls(safe),
    depsOf: (row, col, table) => loose.depsOf(safe, row, col, table),
    generator: () => loose.generator(safe),
  };
}

// ---- The board -------------------------------------------------------------

/**
 * A generator's working state: the live table, the traceback path, and the
 * fill counter.
 *
 * Mutable and shared across the whole run — the *snapshots* are what get
 * copied, in `snap`/`done`. Bundling the three together is what keeps the
 * yield calls short enough to survive Prettier at 100 columns (see the header).
 */
export interface DpBoard {
  table: DpTableData;
  path: DpCell[];
  cellsFilled: number;
}

export function board(rows: number, cols: number): DpBoard {
  const table: DpTableData = Array.from({ length: rows }, () =>
    new Array<number | null>(cols).fill(null),
  );
  return { table, path: [], cellsFilled: 0 };
}

/** Write a cell and count it. The only way a generator should fill the table. */
export function write(b: DpBoard, row: number, col: number, value: number): void {
  // Counting only transitions from null keeps `cellsFilled` honest if an
  // algorithm ever overwrites a cell — none of the eight do today, but a
  // running `+= 1` would quietly start over-reporting the moment one did.
  if (b.table[row][col] === null) b.cellsFilled += 1;
  b.table[row][col] = value;
}

/** Append to the traceback path. */
export function walk(b: DpBoard, cell: DpCell): void {
  b.path.push({ row: cell.row, col: cell.col });
}

/** Strip a `DpDep` back to bare coordinates — `chosen` is a cell, not a dep. */
export function cellOf(c: DpCell): DpCell {
  return { row: c.row, col: c.col };
}

// ---- Snapshots -------------------------------------------------------------

/**
 * Copy the table one row deep.
 *
 * The snapshot contract: a consumer that holds onto step N must never see it
 * change when the generator writes cell N+1. Rows are plain number arrays so
 * one level of spread is a genuine deep copy — `structuredClone` would be
 * correct too and roughly 20x slower on the 900-cell worst case, paid once per
 * step.
 */
function copyTable(table: DpTableData): DpTableData {
  return table.map((row) => [...row]);
}

/**
 * An intermediate snapshot.
 *
 * One helper covers both phases rather than a `snap`/`trace` pair, because
 * `sourceMap.ts`'s regex only recognises the names `snap` and `done` — a
 * `yield trace(...)` would parse as untagged and silently drop out of the
 * source-view highlight. Traceback steps therefore call this with a null
 * cursor and no deps, which is also exactly what `DpStep` documents.
 */
export function snap(
  b: DpBoard,
  cursor: DpCell | null,
  deps: DpDep[],
  chosen: DpCell | null,
  explain: string | null,
  line: number,
): DpStep {
  return {
    table: copyTable(b.table),
    cursor,
    deps,
    chosen,
    explain,
    path: [...b.path],
    result: null,
    cellsFilled: b.cellsFilled,
    done: false,
    line,
  };
}

/** The terminal snapshot, carrying the decoded answer. */
export function done(
  b: DpBoard,
  result: string | null,
  explain: string | null,
  line: number,
): DpStep {
  return {
    table: copyTable(b.table),
    cursor: null,
    deps: [],
    chosen: null,
    explain,
    path: [...b.path],
    result,
    cellsFilled: b.cellsFilled,
    done: true,
    line,
  };
}

// ---- Recurrence plumbing ---------------------------------------------------

/** Build a dependency, reading its value out of the table as it stands now. */
export function dep(table: DpTableData, row: number, col: number, label: string): DpDep {
  return { row, col, label, value: table[row][col] };
}

/**
 * The winning branch, or null when there are none (a base case).
 *
 * Ties go to the first branch listed, and every algorithm below relies on that
 * being stable: the traceback re-runs `branchesOf` + `best` at each hop rather
 * than consulting a side table of choices, so a tie broken differently in the
 * two places would reconstruct a path that does not match the arrows drawn
 * during the fill. Strict `>` / `<` is what guarantees first-wins.
 */
export function best(branches: DpBranch[], mode: 'max' | 'min'): DpBranch | null {
  let winner: DpBranch | null = null;
  for (const branch of branches) {
    if (winner === null) {
      winner = branch;
    } else if (mode === 'max' ? branch.score > winner.score : branch.score < winner.score) {
      winner = branch;
    }
  }
  return winner;
}

// ---- Formatting ------------------------------------------------------------

/** A cell value as it reads in an explain string and in the table. */
export function fmt(value: number | null): string {
  if (value === null) return '·';
  if (value === UNREACHABLE) return '∞';
  return String(value);
}

/** `dp[4]` — the one-row tables (Fibonacci, coin change, LIS). */
export function cell1(col: number): string {
  return `dp[${col}]`;
}

/** `dp[3][4]` — the two-dimensional tables. */
export function cell2(row: number, col: number): string {
  return `dp[${row}][${col}]`;
}

/** `max(dp[2][4]=5, 3+dp[2][1]=7)` */
export function opCall(op: string, branches: DpBranch[]): string {
  return `${op}(${branches.map((b) => b.text).join(', ')})`;
}

/** `dp[3][4] = max(dp[2][4]=5, 3+dp[2][1]=7) = 7` */
export function formula(name: string, body: string, value: number): string {
  return `${name} = ${body} = ${fmt(value)}`;
}

/** `dp[0][4] = 0  (no items left to take)` — the base-case shape. */
export function baseCase(name: string, value: number, why: string): string {
  return `${name} = ${fmt(value)}  (${why})`;
}
