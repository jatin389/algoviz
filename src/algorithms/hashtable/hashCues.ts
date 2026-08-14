// Which sound, if any, a hash step deserves.
//
// Same shape as `algorithms/sortCues.ts`: a pure function of one snapshot, so
// it can be swapped, tested and read without knowing anything about how sound
// is produced. Unlike sorting there is only one resolver — the four strategies
// differ in where they probe, not in what probing *means*, so a per-strategy
// table would be four references to the same function.

import type { CueName } from '@/audio/cues';
import { NO_CUES } from '@/audio/cues';
import type { HashStep } from '@/types';

export type HashCueResolver = (step: HashStep) => readonly CueName[];

// Frozen module-level singletons for the same reason `NO_CUES` is one: this
// runs on every forward advance, up to ~250 times a second at full speed, and
// a fresh single-element array per tick is pure garbage-collector pressure.
const COMPARE: readonly CueName[] = Object.freeze(['compare']);
const HIT: readonly CueName[] = Object.freeze(['hit']);
const MISS: readonly CueName[] = Object.freeze(['miss']);
const SWAP: readonly CueName[] = Object.freeze(['swap']);

/**
 * True when the probe on this step landed on a live key that is not the one
 * being looked for — the audible definition of a collision.
 *
 * Derived from the snapshot alone rather than by diffing the `collisions`
 * counter against the previous step. A resolver only ever sees one step, and
 * remembering the last one it saw would be wrong in a subtle way: cues fire on
 * forward advances only, so after a backward scrub the remembered value would
 * be from a step in the future.
 */
function isCollision(step: HashStep): boolean {
  if (step.probeIndex === null || step.key === null) return false;
  const bucket = step.buckets[step.probeIndex];
  if (!bucket || bucket.state !== 'occupied') return false;
  // Under chaining every probe re-examines the home bucket, so how far down the
  // chain the cursor sits is exactly how many probes have happened — see the
  // note on `probeSeq` in `ops.ts`.
  const entry = bucket.entries[step.probeSeq.length - 1] ?? bucket.entries[0];
  return entry !== undefined && entry.key !== step.key;
}

/**
 * probe -> compare, success -> hit, collision or miss -> miss.
 *
 * `rehashed` is deliberately silent. A resize fires one `resizing` step and
 * then one step per key, dozens in a row at full speed; giving each of them a
 * tone turns the payoff moment of the whole category into a machine-gun burst
 * that people reach for the mute button during. The single `swap` on the
 * `resizing` step marks the event, and the rehash itself is watched, not heard.
 */
export const hashCues: HashCueResolver = (step) => {
  switch (step.phase) {
    case 'probing':
      return isCollision(step) ? MISS : COMPARE;
    case 'hashing':
      return COMPARE;
    case 'inserted':
    case 'updated':
    case 'found':
    case 'deleted':
      return HIT;
    case 'not-found':
      return MISS;
    case 'resizing':
      return SWAP;
    default:
      return NO_CUES;
  }
};
