import type { AlgoTone } from '@/theme/tones';

// The contract every sorting skin renders against. A skin never sees raw
// `comparing`/`swapping`/`sorted` index arrays — SortStage resolves them into
// one AlgoTone per item before mounting the skin, so the four-way precedence
// (swapping > comparing > sorted > idle) is written in exactly one place
// (`resolveSortTone` in `./tone.ts`) rather than once per skin.

export interface SortSkinItem {
  index: number;
  value: number;
  tone: AlgoTone;
  /**
   * v-for key. Always `index` in v1 — SortStep carries values only, and
   * duplicate values are the common case (rng.int(1,99) at n up to 100), so no
   * key derived from a value alone is stable under a swap of equal elements.
   * The field exists so a future identity scheme is a one-line change to how
   * SortStage builds `items`, not a change to every skin component.
   */
  key: string | number;
}

/** Props every skin component receives — nothing more. */
export interface SortSkinProps {
  items: readonly SortSkinItem[];
  /**
   * Fixed per dataset by useSorter (not per-step), so counting/radix's
   * zero-filled placeholder slots mid-run don't shrink the scale before the
   * true max lands. Magnitude skins use it for height; Cars uses it for track
   * length; Cards receives it for API uniformity but has no size channel.
   */
  maxValue: number;
  /** Advisory only: `items.length <= 25`. Magnitude/position skins honour it
   *  to keep numeric labels legible; Cards ignores it because its printed
   *  value IS the encoding, not a decoration on top of one. */
  showLabels: boolean;
}
