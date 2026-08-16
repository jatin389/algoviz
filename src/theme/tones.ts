// One colour vocabulary for every algorithm state in the app.
//
// Before this module the same five-ish states were re-declared independently in
// nine places (BarChart, SearchBarChart, GridCanvas, DpTable, DsuForest,
// EdgeList, BucketArray, ThreadLanes, graph/tones), each with its own spelling
// and its own hardcoded palette. Legend swatches were separate hand-written
// `bg-*` mirrors of the `fill-*` tables that actually painted the marks, in five
// of those files — so the legend and the picture were already drifting apart.
// Deriving both from one record is the point of this file.
//
// Every value is a WHOLE class name. A `bg-tone-${tone}` built at runtime never
// reaches Tailwind's scanner and the rule is simply not emitted, so these tables
// are literal by necessity, not by style.

export type AlgoTone =
  /** Untouched data: not yet compared, visited or claimed. */
  | 'idle'
  /** Under evaluation right now — comparing, frontier, considering. */
  | 'probe'
  /** The cursor: swapping, the current node, the cell being written. */
  | 'active'
  /** Settled: sorted, visited, accepted, found. */
  | 'settled'
  /** Considered and discarded — a past decision, not a live one. */
  | 'rejected'
  /** A dependency that was read, or a reconstructed path. */
  | 'trace'
  /** Impassable: a wall, a tombstone, a slot over threshold. */
  | 'blocked';

export const ALGO_TONES: readonly AlgoTone[] = [
  'idle',
  'probe',
  'active',
  'settled',
  'rejected',
  'trace',
  'blocked',
] as const;

/** Solid fill for a DOM mark. */
export const TONE_BG: Record<AlgoTone, string> = {
  idle: 'bg-tone-idle',
  probe: 'bg-tone-probe',
  active: 'bg-tone-active',
  settled: 'bg-tone-settled',
  rejected: 'bg-tone-rejected',
  trace: 'bg-tone-trace',
  blocked: 'bg-tone-blocked',
};

/** Tinted background, for chips, table cells and row washes. */
export const TONE_SOFT_BG: Record<AlgoTone, string> = {
  idle: 'bg-tone-idle-soft',
  probe: 'bg-tone-probe-soft',
  active: 'bg-tone-active-soft',
  settled: 'bg-tone-settled-soft',
  rejected: 'bg-tone-rejected-soft',
  trace: 'bg-tone-trace-soft',
  blocked: 'bg-tone-blocked-soft',
};

/** Legible text on `TONE_SOFT_BG`, or on the page surface. */
export const TONE_INK: Record<AlgoTone, string> = {
  idle: 'text-tone-idle-ink',
  probe: 'text-tone-probe-ink',
  active: 'text-tone-active-ink',
  settled: 'text-tone-settled-ink',
  rejected: 'text-tone-rejected-ink',
  trace: 'text-tone-trace-ink',
  blocked: 'text-tone-blocked-ink',
};

/** Border at reduced alpha, so borders do not need a fourth colour layer. */
export const TONE_BORDER: Record<AlgoTone, string> = {
  idle: 'border-tone-idle/60',
  probe: 'border-tone-probe/60',
  active: 'border-tone-active/60',
  settled: 'border-tone-settled/60',
  rejected: 'border-tone-rejected/60',
  trace: 'border-tone-trace/60',
  blocked: 'border-tone-blocked/60',
};

/** SVG shape fill. */
export const TONE_FILL: Record<AlgoTone, string> = {
  idle: 'fill-tone-idle',
  probe: 'fill-tone-probe',
  active: 'fill-tone-active',
  settled: 'fill-tone-settled',
  rejected: 'fill-tone-rejected',
  trace: 'fill-tone-trace',
  blocked: 'fill-tone-blocked',
};

/** SVG line/outline stroke. */
export const TONE_STROKE: Record<AlgoTone, string> = {
  idle: 'stroke-tone-idle',
  probe: 'stroke-tone-probe',
  active: 'stroke-tone-active',
  settled: 'stroke-tone-settled',
  rejected: 'stroke-tone-rejected',
  trace: 'stroke-tone-trace',
  blocked: 'stroke-tone-blocked',
};

/**
 * A DOM data mark: fill plus the texture and outline channels.
 *
 * The colour themes set every `--av-tone-*-pat` to `none` and the stroke width
 * to `0`, so this renders as a plain fill. Monochrome, Terminal, Paper and
 * forced-colors mode switch those on, and the identical markup starts carrying
 * state as texture and outline instead of hue. No component branches per theme.
 *
 * SVG renderers use TONE_FILL/TONE_STROKE instead: an SVG `fill` cannot take a
 * CSS background-image, so the texture channel does not reach them. Those views
 * lean on the luminance ladder and `stroke-dasharray`, which SVG does support.
 */
export const TONE_MARK: Record<AlgoTone, string> = {
  idle: 'viz-mark bg-tone-idle [--tone-pat:var(--av-tone-idle-pat)]',
  probe: 'viz-mark bg-tone-probe [--tone-pat:var(--av-tone-probe-pat)]',
  active: 'viz-mark bg-tone-active [--tone-pat:var(--av-tone-active-pat)]',
  settled: 'viz-mark bg-tone-settled [--tone-pat:var(--av-tone-settled-pat)]',
  rejected: 'viz-mark bg-tone-rejected [--tone-pat:var(--av-tone-rejected-pat)]',
  trace: 'viz-mark bg-tone-trace [--tone-pat:var(--av-tone-trace-pat)]',
  blocked: 'viz-mark bg-tone-blocked [--tone-pat:var(--av-tone-blocked-pat)]',
};

/**
 * Default legend wording. Domains override where they have a better word for
 * it — "Unsorted" reads better than "Idle" on a bar chart — but starting from
 * one list keeps the vocabulary recognisable as you move between views.
 */
export const TONE_LABEL: Record<AlgoTone, string> = {
  idle: 'Untouched',
  probe: 'Comparing',
  active: 'Current',
  settled: 'Settled',
  rejected: 'Rejected',
  trace: 'Path',
  blocked: 'Blocked',
};

export interface LegendItem {
  tone: AlgoTone;
  label: string;
}

/**
 * Build a legend from tones. Callers pass tones and wording, never classes, so
 * a swatch cannot disagree with the mark it describes — which is exactly the
 * drift this module exists to remove.
 */
export function toneLegend(items: (AlgoTone | LegendItem)[]): LegendItem[] {
  return items.map((item) =>
    typeof item === 'string' ? { tone: item, label: TONE_LABEL[item] } : item,
  );
}
