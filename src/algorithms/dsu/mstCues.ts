import type { DsuAlgoKey } from './index';
import type { CueName } from '@/audio/cues';
import { NO_CUES } from '@/audio/cues';
import type { DsuStep, MstStep } from '@/types';

/** Maps a single step snapshot to the cues it should trigger, if any. */
export type MstCueResolver = (step: DsuStep | MstStep) => readonly CueName[];

/**
 * Cue vocabulary is deliberately the shared four (`compare`/`swap`/`hit`/
 * `miss`) rather than MST-specific names — see `audio/cues.ts` on why the cue
 * table names the *shape* of an event and not the event. Here the mapping is
 * unusually natural: an edge under evaluation is a comparison, an accepted
 * edge is a success, a rejected one is a failure.
 *
 * Every resolver returns the shared frozen `NO_CUES` on the silent path. This
 * runs on every forward advance, up to ~250 times a second at max speed, so
 * the common case must not allocate.
 */

/**
 * Decided *this* step, not "is in the set": the accepted and rejected lists
 * accumulate across the whole run, so membership alone would re-fire the cue
 * on every subsequent step. The edge under the cursor having landed in one of
 * the two lists is what makes this step the one where the decision happened.
 */
export const mstStepCues: MstCueResolver = (step) => {
  if (step.kind !== 'mst') return NO_CUES;
  const edge = step.consideringEdge;
  if (edge === null) return NO_CUES;
  if (step.acceptedEdges.includes(edge)) return ['hit'];
  if (step.rejectedEdges.includes(edge)) return ['miss'];
  return ['compare'];
};

/**
 * The standalone forest has no edges to accept, so the outcome pair is mapped
 * onto the union verdict instead: a union that merged two sets is the `hit`, a
 * union that found them already joined is the `miss`, and every node on a find
 * walk is a `compare`. The two are distinguished by the pseudocode line the
 * step is tagged with, which is the only thing on a `DsuStep` that says *which*
 * branch of union it is on — deriving it from the parent array instead would
 * mean diffing against the previous snapshot, and a cue resolver only ever
 * sees one step.
 */
const DSU_MERGED_LINE = 7;
const DSU_ALREADY_JOINED_LINE = 6;
const DSU_WALK_LINE = 2;

export const dsuStepCues: MstCueResolver = (step) => {
  if (step.kind !== 'dsu') return NO_CUES;
  if (step.line === DSU_MERGED_LINE) return ['hit'];
  if (step.line === DSU_ALREADY_JOINED_LINE) return ['miss'];
  if (step.line === DSU_WALK_LINE) return ['compare'];
  return NO_CUES;
};

/**
 * Partial by design, matching `sortCues`: the mechanism is generic, the
 * content is per-algorithm. A missing entry means that algorithm stays silent
 * even with sound enabled.
 */
export const mstCues: Partial<Record<DsuAlgoKey, MstCueResolver>> = {
  dsu: dsuStepCues,
  kruskal: mstStepCues,
  prim: mstStepCues,
};
