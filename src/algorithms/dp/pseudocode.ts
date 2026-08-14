import type { Pseudocode } from '@/algorithms/pseudocode';
import type { DpAlgoKey } from './index';

/**
 * Hand-written pseudocode for the code panel, one entry per DP algorithm.
 *
 * A total `Record` rather than the sorting file's `Partial`, and the difference
 * is deliberate: over there the `Partial` buys the freedom to ship an algorithm
 * before its prose is written, which is worth having when the panel's empty
 * state is the only consequence. Here the tags are not optional — every one of
 * the eight generators tags every yield, because the traceback phase is
 * genuinely hard to follow without the line highlight telling you which of the
 * two phases you are watching. A missing entry would leave a run silently
 * un-highlighted, so the type makes it a compile error instead.
 *
 * Entries are in registry order (see index.ts) so the two files read side by
 * side.
 *
 * INVARIANT: every `line` a generator yields indexes into its entry here, and
 * every terminal yield tags the final line — which is why each entry ends with
 * a "done" line that nothing else in the run tags. Both are enforced in
 * `dp.test.ts`, mirroring `algorithms.test.ts`.
 */
export const pseudocode: Record<DpAlgoKey, Pseudocode> = {
  fib: [
    'dp[0] = 0; dp[1] = 1',
    'for k = 2 to n:  dp[k] = dp[k - 1] + dp[k - 2]',
    'traceback: every dp[k] fed the two cells after it',
    'done — fib(n) = dp[n]',
  ],
  'coin-change': [
    'dp[0] = 0   // zero coins make zero',
    'for a = 1 to amount',
    '  dp[a] = 1 + min(dp[a - c]) over coins c <= a',
    'traceback: subtract the winning coin, repeat',
    'done — dp[amount] is the fewest coins',
  ],
  lis: [
    'dp[i] = 1   // a[i] on its own is a subsequence',
    'for i = 0 to n - 1',
    '  dp[i] = 1 + max(dp[j]) over j < i with a[j] < a[i]',
    'traceback: from argmax dp, hop to the predecessor that won',
    'done — the answer is max(dp), not dp[n - 1]',
  ],
  knapsack: [
    'dp[0][c] = 0 for every c   // no items, no value',
    'for i = 1 to n',
    '  for c = 0 to capacity',
    '    skip = dp[i-1][c];  take = v_i + dp[i-1][c - w_i] if w_i <= c',
    '    dp[i][c] = max(skip, take)',
    'traceback: dp[i][c] != dp[i-1][c] means item i was taken',
    'done — dp[n][capacity] is the best value',
  ],
  'subset-sum': [
    'dp[0][0] = 1; dp[0][t] = 0 for t > 0',
    'for i = 1 to n',
    '  for t = 0 to target',
    '    skip = dp[i-1][t];  take = dp[i-1][t - w_i] if w_i <= t',
    '    dp[i][t] = skip OR take',
    'traceback: follow whichever branch held 1',
    'done — dp[n][target] = 1 means the target is reachable',
  ],
  lcs: [
    'dp[i][0] = dp[0][j] = 0',
    'for i = 1 to m, for j = 1 to n',
    '  if a[i-1] == b[j-1]:  dp[i][j] = 1 + dp[i-1][j-1]',
    '  else:                 dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
    'traceback: on a match take the character and step diagonally',
    'done — dp[m][n] is the LCS length',
  ],
  'edit-distance': [
    'dp[i][0] = i   // delete everything',
    'dp[0][j] = j   // insert everything',
    '  if a[i-1] == b[j-1]:  dp[i][j] = dp[i-1][j-1]',
    '  else:  dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])',
    'traceback: read the edit script off the winning branches',
    'done — dp[m][n] is the edit distance',
  ],
  'matrix-chain': [
    'dp[i][i] = 0   // one matrix needs no multiplication',
    'for len = 2 to n:  for each i, with j = i + len - 1',
    '  dp[i][j] = min over k in [i, j) of',
    '             dp[i][k] + dp[k+1][j] + d[i]*d[k+1]*d[j+1]',
    'traceback: descend into the winning split on both sides',
    'done — dp[0][n-1] is the fewest scalar multiplications',
  ],
};
