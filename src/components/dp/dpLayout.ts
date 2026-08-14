// Pure geometry for the DP table. No Vue, no DOM, no measurement.
//
// This codebase never measures the DOM for SVG layout — see the header comments
// on `graphModel.ts` and `GraphCanvas.vue` — and dynamic programming is where
// that rule earns the most: the table draws provenance *arrows* between cells,
// and an arrow needs to start and end on the boundary of a rectangle it is not
// inside. With `getBBox()` that means a layout pass, a nextTick, and a
// re-render on every step; with arithmetic it is a subtraction. The whole
// reason `DpTable.vue` is an SVG rather than an HTML grid is that this file can
// exist.
//
// Everything here is a pure function of (rows, cols, sizes), so the component
// is a renderer of numbers it did not compute, and the numbers are unit-tested
// without mounting anything.

export interface DpRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DpPoint {
  x: number;
  y: number;
}

export interface DpArrow {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface DpLayoutOptions {
  rows: number;
  cols: number;
  /** Edge length of a cell square. */
  cell?: number;
  /** Space between adjacent cells — also the room an arrow has to be seen in. */
  gap?: number;
  /** Thickness of the header band: the row headers' width, the column headers' height. */
  header?: number;
  /** Outer margin, so strokes on the edge cells are not clipped by the viewBox. */
  pad?: number;
}

/**
 * 34px cells at a 900-cell (30x30) table give a ~1250px square, which is why
 * `DpTable.vue` wraps the SVG in an `overflow-auto` container instead of
 * scaling it down: at the size that would fit a 340px column, a cell is 11px
 * and its contents are unreadable. Scrolling a legible table beats fitting an
 * illegible one.
 */
const DEFAULT_CELL = 34;
const DEFAULT_GAP = 4;
const DEFAULT_HEADER = 40;
const DEFAULT_PAD = 6;

export interface DpLayout {
  rows: number;
  cols: number;
  cell: number;
  gap: number;
  header: number;
  pad: number;
  width: number;
  height: number;
  viewBox: string;
  cellRect(row: number, col: number): DpRect;
  center(row: number, col: number): DpPoint;
  rowHeaderRect(row: number): DpRect;
  colHeaderRect(col: number): DpRect;
  /**
   * A line from the edge of `from`'s cell to the edge of `to`'s cell, or null
   * when the two are the same cell (nothing to draw, and the direction would be
   * undefined).
   */
  arrow(from: { row: number; col: number }, to: { row: number; col: number }): DpArrow | null;
}

/**
 * Where a ray leaving `center` toward `toward` crosses the boundary of an
 * axis-aligned box of half-extents `half`, pushed a further `margin` outwards.
 *
 * The scalar `t` is the smaller of the two axis crossings — the box is left
 * through whichever side the ray reaches first — with a division guard for the
 * axis-aligned cases, which are the common ones here (a dependency directly
 * above or directly left of its dependent). Returning the centre unchanged for
 * a zero-length direction keeps the caller from having to check.
 */
export function boxEdgePoint(
  center: DpPoint,
  half: { w: number; h: number },
  toward: DpPoint,
  margin = 0,
): DpPoint {
  const dx = toward.x - center.x;
  const dy = toward.y - center.y;
  const length = Math.hypot(dx, dy);
  if (length === 0) return { x: center.x, y: center.y };

  const ux = dx / length;
  const uy = dy / length;
  const tx = ux === 0 ? Infinity : half.w / Math.abs(ux);
  const ty = uy === 0 ? Infinity : half.h / Math.abs(uy);
  const t = Math.min(tx, ty) + margin;

  return { x: center.x + ux * t, y: center.y + uy * t };
}

export function dpLayout(options: DpLayoutOptions): DpLayout {
  const rows = Math.max(0, options.rows);
  const cols = Math.max(0, options.cols);
  const cell = options.cell ?? DEFAULT_CELL;
  const gap = options.gap ?? DEFAULT_GAP;
  const header = options.header ?? DEFAULT_HEADER;
  const pad = options.pad ?? DEFAULT_PAD;

  const pitch = cell + gap;
  const originX = pad + header;
  const originY = pad + header;

  // `- gap` because the last column/row contributes a cell but not a trailing
  // gap; an empty table collapses to just the header band plus padding.
  const width = cols === 0 ? originX + pad : originX + cols * pitch - gap + pad;
  const height = rows === 0 ? originY + pad : originY + rows * pitch - gap + pad;

  const half = { w: cell / 2, h: cell / 2 };

  const cellRect = (row: number, col: number): DpRect => ({
    x: originX + col * pitch,
    y: originY + row * pitch,
    w: cell,
    h: cell,
  });

  const center = (row: number, col: number): DpPoint => ({
    x: originX + col * pitch + cell / 2,
    y: originY + row * pitch + cell / 2,
  });

  return {
    rows,
    cols,
    cell,
    gap,
    header,
    pad,
    width,
    height,
    viewBox: `0 0 ${width} ${height}`,
    cellRect,
    center,
    rowHeaderRect: (row) => ({ x: pad, y: originY + row * pitch, w: header, h: cell }),
    colHeaderRect: (col) => ({ x: originX + col * pitch, y: pad, w: cell, h: header }),
    arrow: (from, to) => {
      if (from.row === to.row && from.col === to.col) return null;
      const a = center(from.row, from.col);
      const b = center(to.row, to.col);
      // 1px off the source cell so the tail is visibly detached, 3px off the
      // target so the arrowhead sits in the gutter rather than on the border.
      const start = boxEdgePoint(a, half, b, 1);
      const end = boxEdgePoint(b, half, a, 3);
      return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
    },
  };
}
