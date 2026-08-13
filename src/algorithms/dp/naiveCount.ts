// Exactly how many calls the *naive* recursion would have made.
//
// This is the number the whole category exists to make vivid. A DP table with
// 900 cells is 900 units of work; the recursion it replaces is 900 units only
// if the recursion never revisits a subproblem, and the entire point is that it
// does — fib(35) is 29,860,703 calls against 36 cells. Showing "36 cells" alone
// says nothing; showing it beside the call count is the lesson.
//
// It is counted, not estimated. Each function below is the *count recurrence*
// of its algorithm — `T(i, j) = 1 + T(i-1, j) + T(i, j-1)` and friends —
// evaluated with the same dynamic programming the visualizer is teaching, so
// computing "how expensive would it have been not to do this" costs O(cells).
// A closed form was the alternative and it only exists cleanly for Fibonacci
// (`2*fib(n+1) - 1`); the count recurrence is uniform across all eight and is
// exact for inputs like coin change where no closed form is available at all.
//
// OVERFLOW. These grow far faster than the tables do. Edit distance on two
// 20-character strings is already past 2^60, and `Number.MAX_SAFE_INTEGER` is
// 2^53 - 1, beyond which `+ 1` stops changing anything and the arithmetic
// starts quietly lying. Rather than let it, every addition here saturates at
// MAX_SAFE_INTEGER and `formatNaiveCount` renders a saturated value as
// `> 9.0e15`. So the promise is: the number shown is exact, or it is explicitly
// a lower bound. It is never a wrong exact-looking number.

/** Saturation point. Past this, sums stop being representable exactly. */
export const COUNT_CAP = Number.MAX_SAFE_INTEGER;

/** Addition that saturates instead of losing precision. */
export function addCount(a: number, b: number): number {
  const sum = a + b;
  return sum >= COUNT_CAP ? COUNT_CAP : sum;
}

/** True once a count has hit the cap and is therefore a lower bound. */
export function isSaturated(count: number): boolean {
  return count >= COUNT_CAP;
}

/**
 * Render a call count for a stat tile.
 *
 * Thresholds chosen for readability rather than principle: below a million the
 * grouped digits are still scannable ("29,860,703" is not, at 11 characters in
 * a tile), and above it two significant figures in exponential form say
 * "astronomically more" better than any number of commas.
 */
export function formatNaiveCount(count: number): string {
  if (isSaturated(count)) return '> 9.0e15';
  if (count < 1_000_000) return count.toLocaleString();
  return count.toExponential(1);
}

/**
 * `T(n) = 1 + T(n-1) + T(n-2)`, `T(0) = T(1) = 1`.
 *
 * The count of nodes in the naive call tree, which is `2*fib(n+1) - 1`. Left as
 * the recurrence anyway so it reads the same as the seven below it.
 */
export function naiveFibCalls(n: number): number {
  if (n < 0) return 0;
  const t: number[] = [1, 1];
  for (let i = 2; i <= n; i++) t[i] = addCount(1, addCount(t[i - 1], t[i - 2]));
  return t[Math.min(n, t.length - 1)];
}

/**
 * `T(a) = 1 + sum over coins c <= a of T(a - c)`, `T(0) = 1`.
 *
 * Counts the calls the branching "try every coin at every amount" recursion
 * makes, including the ones that dead-end on an unreachable amount — those are
 * calls too, and they are a large part of why the naive version is so bad.
 */
export function naiveCoinCalls(coins: number[], amount: number): number {
  if (amount < 0) return 0;
  const t = new Array<number>(amount + 1).fill(0);
  t[0] = 1;
  for (let a = 1; a <= amount; a++) {
    let total = 1;
    for (const c of coins) {
      if (c > 0 && c <= a) total = addCount(total, t[a - c]);
    }
    t[a] = total;
  }
  return t[amount];
}

/**
 * `T(i) = 1 + sum over j < i with a[j] < a[i] of T(j)`, summed over every start.
 *
 * The naive formulation is "longest increasing subsequence *ending at* i",
 * recomputed from scratch for each i — so the total is the sum of the per-index
 * call trees, not just the largest one.
 */
export function naiveLisCalls(values: number[]): number {
  const n = values.length;
  const t = new Array<number>(n).fill(1);
  let total = 0;
  for (let i = 0; i < n; i++) {
    let calls = 1;
    for (let j = 0; j < i; j++) {
      if (values[j] < values[i]) calls = addCount(calls, t[j]);
    }
    t[i] = calls;
    total = addCount(total, calls);
  }
  return total;
}

/**
 * `T(i, c) = 1 + T(i-1, c) + [w_i <= c] T(i-1, c - w_i)`, `T(0, c) = 1`.
 *
 * Shared by 0/1 knapsack and subset-sum: the two differ in what they *return*
 * (a max value versus a boolean) but their naive recursions branch identically,
 * so a second copy of this would only be a second thing to keep in sync.
 */
export function naiveItemCalls(weights: number[], capacity: number): number {
  if (capacity < 0) return 0;
  let prev = new Array<number>(capacity + 1).fill(1);
  for (const w of weights) {
    const row = new Array<number>(capacity + 1).fill(0);
    for (let c = 0; c <= capacity; c++) {
      let calls = addCount(1, prev[c]);
      if (w >= 0 && w <= c) calls = addCount(calls, prev[c - w]);
      row[c] = calls;
    }
    prev = row;
  }
  return prev[capacity];
}

/**
 * `T(i, j) = 1 + (match ? T(i-1, j-1) : T(i-1, j) + T(i, j-1))`, bases `T(0, ·) = T(·, 0) = 1`.
 *
 * The single-branch match case is why LCS on two similar strings is nowhere
 * near as catastrophic as on two dissimilar ones — worth being able to
 * demonstrate by typing two words that share a prefix.
 */
export function naiveLcsCalls(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  let prev = new Array<number>(n + 1).fill(1);
  for (let i = 1; i <= m; i++) {
    const row = new Array<number>(n + 1).fill(1);
    for (let j = 1; j <= n; j++) {
      row[j] =
        a[i - 1] === b[j - 1]
          ? addCount(1, prev[j - 1])
          : addCount(1, addCount(prev[j], row[j - 1]));
    }
    prev = row;
  }
  return prev[n];
}

/**
 * `T(i, j) = 1 + (match ? T(i-1, j-1) : T(i-1, j-1) + T(i-1, j) + T(i, j-1))`.
 *
 * Three-way branching on a mismatch, which is what makes edit distance the
 * fastest of the eight to saturate the counter — two dissimilar 20-character
 * strings already exceed 2^53.
 */
export function naiveEditCalls(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  let prev = new Array<number>(n + 1).fill(1);
  for (let i = 1; i <= m; i++) {
    const row = new Array<number>(n + 1).fill(1);
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        row[j] = addCount(1, prev[j - 1]);
      } else {
        row[j] = addCount(1, addCount(prev[j - 1], addCount(prev[j], row[j - 1])));
      }
    }
    prev = row;
  }
  return prev[n];
}

/**
 * `T(i, j) = 1 + sum over k in [i, j-1] of (T(i, k) + T(k+1, j))`, `T(i, i) = 1`.
 *
 * Depends only on the *number* of matrices, not their dimensions — the split
 * structure is the same whatever the shapes are, which is a nice thing for the
 * stats panel to make apparent when someone edits the dimensions and the call
 * count does not move.
 */
export function naiveChainCalls(n: number): number {
  if (n <= 0) return 0;
  const t: number[][] = Array.from({ length: n }, () => new Array<number>(n).fill(1));
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      let calls = 1;
      for (let k = i; k < j; k++) calls = addCount(calls, addCount(t[i][k], t[k + 1][j]));
      t[i][j] = calls;
    }
  }
  return t[0][n - 1];
}
