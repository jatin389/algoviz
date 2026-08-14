// The hand-written prose the code panel shows for each collision strategy.
//
// The four entries are deliberately *parallel*: line 4 means "the walk reached
// somewhere the key can go" in all four, line 11 means "the key has been taken
// out" in all four, and so on. That is not a stylistic preference — it is what
// lets `ops.ts` carry ONE probe loop with one set of literal line tags and
// still highlight the right sentence whichever strategy is selected. Insert a
// line into one entry without inserting it into the other three and every tag
// past that point silently points at the wrong sentence.
//
// Rejected alternative: one shared array with strategy-neutral wording. It
// reads fine right up to the lines that matter most — "leave a tombstone" and
// "unlink from the chain" are not the same instruction, and blurring them into
// "remove the key" would erase the single most important difference between the
// two families.

import type { Pseudocode } from '@/algorithms/pseudocode';
import type { HashStrategyKey } from './index';

/**
 * Total rather than `Partial`, unlike the sorting table. There the partial type
 * buys the freedom to ship an algorithm before its prose is written; here all
 * four strategies ship together, and the line-tag invariant the tests enforce
 * has nothing to check against a missing entry — so a compile error on a fifth
 * strategy is exactly the reminder that would be wanted.
 */
export const hashPseudocode: Record<HashStrategyKey, Pseudocode> = {
  chaining: [
    'insert(key):',
    '  h = hash(key);  home = h mod capacity',
    '  walk bucket[home]’s chain, link by link',
    '    key already in the chain -> overwrite its value',
    '    end of the chain reached -> append the key',
    '    a different key here -> collision; the chain just gets longer',
    '  if size / capacity > threshold: grow, then rehash every key',
    'search(key): walk the same chain from the front',
    '  key found -> report the bucket holding it',
    '  end of chain -> the key is not in the table',
    'delete(key): walk the chain to find the key',
    '  unlink it; the chain simply gets shorter',
    'done — every operation in the script has run',
  ],
  linear: [
    'insert(key):',
    '  h = hash(key);  home = h mod capacity',
    '  probe (home + k) mod capacity for k = 0, 1, 2, ...',
    '    key already in this slot -> overwrite its value',
    '    slot empty (or a reusable tombstone) -> put the key here',
    '    a different key here -> collision; probe the next slot',
    '  if slots used / capacity > threshold: grow, then rehash every key',
    'search(key): walk the same probe sequence from home',
    '  key found -> report the slot holding it',
    '  first EMPTY slot -> the key is not in the table',
    'delete(key): walk the sequence to find the key',
    '  leave a TOMBSTONE behind, never an empty slot',
    'done — every operation in the script has run',
  ],
  quadratic: [
    'insert(key):',
    '  h = hash(key);  home = h mod capacity',
    '  probe (home + k(k+1)/2) mod capacity for k = 0, 1, 2, ...',
    '    key already in this slot -> overwrite its value',
    '    slot empty (or a reusable tombstone) -> put the key here',
    '    a different key here -> collision; widen the jump and probe again',
    '  if slots used / capacity > threshold: grow, then rehash every key',
    'search(key): walk the same probe sequence from home',
    '  key found -> report the slot holding it',
    '  first EMPTY slot -> the key is not in the table',
    'delete(key): walk the sequence to find the key',
    '  leave a TOMBSTONE behind, never an empty slot',
    'done — every operation in the script has run',
  ],
  double: [
    'insert(key):',
    '  h = hash(key);  home = h mod capacity;  step = h2(h) | 1',
    '  probe (home + k * step) mod capacity for k = 0, 1, 2, ...',
    '    key already in this slot -> overwrite its value',
    '    slot empty (or a reusable tombstone) -> put the key here',
    '    a different key here -> collision; jump another step',
    '  if slots used / capacity > threshold: grow, then rehash every key',
    'search(key): walk the same probe sequence from home',
    '  key found -> report the slot holding it',
    '  first EMPTY slot -> the key is not in the table',
    'delete(key): walk the sequence to find the key',
    '  leave a TOMBSTONE behind, never an empty slot',
    'done — every operation in the script has run',
  ],
};
