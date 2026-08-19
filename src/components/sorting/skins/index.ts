import type { Component } from 'vue';
import BarsSkin from './BarsSkin.vue';

/**
 * One entry per sorting skin. Follows `src/algorithms/index.ts`'s registry
 * idiom exactly: a plain object literal closed with `satisfies`, never a
 * `: Record<...>` annotation, so `keyof typeof sortSkins` stays the literal
 * key union `decodeKey` needs for URL round-tripping.
 *
 * Component values sit in this plain module-level literal, never inside a
 * `reactive()` wrapper — the repo uses no `markRaw` anywhere and this
 * registry doesn't need one, but wrapping it in `reactive()` later would
 * deep-proxy the component definitions for no reason. Only the selected KEY
 * is ever reactive state.
 */
export interface SortSkinSpec {
  name: string;
  /** Shown under the picker for the selected skin. */
  description: string;
  component: Component;
  /** How this skin encodes a value. Drives picker ordering and copy. */
  encoding: 'magnitude' | 'position' | 'glyph';
  /** Above this many items the picker shows an inline crowding note. Unset
   *  skins (Bars, Book spines, People) have no declared ceiling. */
  maxComfortableN?: number;
  /** False only for skins (Race cars) that lay items out vertically and
   *  label lanes themselves; SortStage skips AvRulerRail for them. */
  showsRail?: boolean;
}

export const sortSkins = {
  bars: {
    name: 'Bars',
    description: 'The classic bar chart — value is height.',
    component: BarsSkin,
    encoding: 'magnitude',
  },
} satisfies Record<string, SortSkinSpec>;

/** Literal union of the registry keys: 'bars' | ... */
export type SortSkinKey = keyof typeof sortSkins;

export const DEFAULT_SKIN: SortSkinKey = 'bars';
