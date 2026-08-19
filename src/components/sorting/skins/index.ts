import type { Component } from 'vue';
import BarsSkin from './BarsSkin.vue';
import SpinesSkin from './SpinesSkin.vue';
import PeopleSkin from './PeopleSkin.vue';
import CarsSkin from './CarsSkin.vue';
import CardsSkin from './CardsSkin.vue';

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
  /**
   * False for skins whose layout has no single row of columns for the rail
   * to align to — Race cars is rows instead of columns, and Cards wraps into
   * several rows at typical array sizes. SortStage skips AvRulerRail for
   * them rather than rendering ticks that correspond to nothing on screen.
   */
  showsRail?: boolean;
}

// Declaration order is deliberate: pedagogical fidelity first. Bars, Book
// spines and People keep the height encoding a learner already understands;
// Cars breaks the axis; Cards drops magnitude entirely. SkinPicker iterates
// Object.keys, so this order is also the picker's button order.
export const sortSkins = {
  bars: {
    name: 'Bars',
    description: 'The classic bar chart — value is height.',
    component: BarsSkin,
    encoding: 'magnitude',
  },
  spines: {
    name: 'Book spines',
    description: 'A shelf of books — taller spine, bigger value.',
    component: SpinesSkin,
    encoding: 'magnitude',
  },
  people: {
    name: 'People',
    description: 'People lining up by height — taller person, bigger value.',
    component: PeopleSkin,
    encoding: 'magnitude',
  },
  cars: {
    name: 'Race cars',
    description: 'One lane per element — further along the track, bigger value.',
    component: CarsSkin,
    encoding: 'position',
    maxComfortableN: 40,
    showsRail: false,
  },
  cards: {
    name: 'Cards',
    description: 'A hand of cards — the printed number is the value, not the size.',
    component: CardsSkin,
    encoding: 'glyph',
    maxComfortableN: 30,
    showsRail: false,
  },
} satisfies Record<string, SortSkinSpec>;

/** Literal union of the registry keys: 'bars' | ... */
export type SortSkinKey = keyof typeof sortSkins;

export const DEFAULT_SKIN: SortSkinKey = 'bars';
