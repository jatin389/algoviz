import { describe, it, expect } from 'vitest';
import { boxEdgePoint, dpLayout } from './dpLayout';
import type { DpLayout, DpRect } from './dpLayout';

// Geometry tests for the DP table, mounting nothing.
//
// This is the whole payoff of `dpLayout.ts` being pure arithmetic rather than
// DOM measurement (see its header): the four properties `DpTable.vue` actually
// depends on — cells never overlap, headers never sit on top of the body, the
// viewBox contains everything, and a one-row table still makes sense — are
// checked here without jsdom, without a component, and without a single
// `getBBox`. If any of them broke, the symptom in the app would be a table that
// looks subtly wrong at one size, which is exactly the kind of bug a rendering
// test never catches and an arithmetic test always does.

/** Every cell of a layout, tagged with the coordinates that produced it. */
function allCells(layout: DpLayout): { row: number; col: number; rect: DpRect }[] {
  const cells: { row: number; col: number; rect: DpRect }[] = [];
  for (let row = 0; row < layout.rows; row++) {
    for (let col = 0; col < layout.cols; col++) {
      cells.push({ row, col, rect: layout.cellRect(row, col) });
    }
  }
  return cells;
}

/** Half-open overlap: rectangles that merely share an edge do not overlap. */
function overlaps(a: DpRect, b: DpRect): boolean {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}

function contains(outer: DpRect, inner: DpRect): boolean {
  return (
    inner.x >= outer.x &&
    inner.y >= outer.y &&
    inner.x + inner.w <= outer.x + outer.w &&
    inner.y + inner.h <= outer.y + outer.h
  );
}

/** The viewBox as a rectangle, parsed back out of the string the SVG gets. */
function viewBoxRect(layout: DpLayout): DpRect {
  const [x, y, w, h] = layout.viewBox.split(' ').map(Number);
  return { x, y, w, h };
}

describe('dpLayout cell placement', () => {
  it('never overlaps two cells', () => {
    const layout = dpLayout({ rows: 5, cols: 7 });
    const cells = allCells(layout);

    for (let i = 0; i < cells.length; i++) {
      for (let j = i + 1; j < cells.length; j++) {
        expect(
          overlaps(cells[i].rect, cells[j].rect),
          `(${cells[i].row},${cells[i].col}) overlaps (${cells[j].row},${cells[j].col})`,
        ).toBe(false);
      }
    }
  });

  it('separates adjacent cells by exactly the gap', () => {
    const layout = dpLayout({ rows: 3, cols: 3, cell: 20, gap: 6 });
    const a = layout.cellRect(1, 1);

    expect(layout.cellRect(1, 2).x - (a.x + a.w)).toBe(6);
    expect(layout.cellRect(2, 1).y - (a.y + a.h)).toBe(6);
  });

  it('puts the centre in the middle of the cell', () => {
    const layout = dpLayout({ rows: 4, cols: 4 });
    for (const { row, col, rect } of allCells(layout)) {
      const centre = layout.center(row, col);
      expect(centre.x).toBeCloseTo(rect.x + rect.w / 2);
      expect(centre.y).toBeCloseTo(rect.y + rect.h / 2);
    }
  });

  // A zero gap is not a size anyone picks, but it is the boundary where
  // "adjacent" and "overlapping" would become the same thing if the pitch were
  // ever computed as anything other than cell + gap.
  it('still keeps cells disjoint when the gap is zero', () => {
    const layout = dpLayout({ rows: 3, cols: 3, gap: 0 });
    const cells = allCells(layout);
    for (let i = 0; i < cells.length; i++) {
      for (let j = i + 1; j < cells.length; j++) {
        expect(overlaps(cells[i].rect, cells[j].rect)).toBe(false);
      }
    }
  });
});

describe('dpLayout headers', () => {
  it('keeps the row headers entirely left of the body and the column headers above it', () => {
    const layout = dpLayout({ rows: 4, cols: 6 });

    for (let row = 0; row < layout.rows; row++) {
      const header = layout.rowHeaderRect(row);
      expect(header.x + header.w).toBeLessThanOrEqual(layout.cellRect(row, 0).x);
    }

    for (let col = 0; col < layout.cols; col++) {
      const header = layout.colHeaderRect(col);
      expect(header.y + header.h).toBeLessThanOrEqual(layout.cellRect(0, col).y);
    }
  });

  it('never overlaps a header with any cell', () => {
    const layout = dpLayout({ rows: 4, cols: 4 });
    const cells = allCells(layout);

    for (let row = 0; row < layout.rows; row++) {
      const header = layout.rowHeaderRect(row);
      for (const cell of cells) expect(overlaps(header, cell.rect)).toBe(false);
    }
    for (let col = 0; col < layout.cols; col++) {
      const header = layout.colHeaderRect(col);
      for (const cell of cells) expect(overlaps(header, cell.rect)).toBe(false);
    }
  });

  // The header only labels its row/column if it lines up with it — an offset of
  // even one pitch would silently label every cell with its neighbour's header.
  it('aligns each header with the row or column it labels', () => {
    const layout = dpLayout({ rows: 4, cols: 5 });

    for (let row = 0; row < layout.rows; row++) {
      expect(layout.rowHeaderRect(row).y).toBe(layout.cellRect(row, 0).y);
      expect(layout.rowHeaderRect(row).h).toBe(layout.cell);
    }
    for (let col = 0; col < layout.cols; col++) {
      expect(layout.colHeaderRect(col).x).toBe(layout.cellRect(0, col).x);
      expect(layout.colHeaderRect(col).w).toBe(layout.cell);
    }
  });
});

describe('dpLayout viewBox', () => {
  it('bounds every cell and every header', () => {
    const layout = dpLayout({ rows: 6, cols: 9 });
    const box = viewBoxRect(layout);

    expect(box).toEqual({ x: 0, y: 0, w: layout.width, h: layout.height });

    for (const { rect } of allCells(layout)) expect(contains(box, rect)).toBe(true);
    for (let row = 0; row < layout.rows; row++) {
      expect(contains(box, layout.rowHeaderRect(row))).toBe(true);
    }
    for (let col = 0; col < layout.cols; col++) {
      expect(contains(box, layout.colHeaderRect(col))).toBe(true);
    }
  });

  it('leaves exactly the padding around the outermost cells', () => {
    const layout = dpLayout({ rows: 3, cols: 4, pad: 8 });
    const last = layout.cellRect(layout.rows - 1, layout.cols - 1);

    expect(layout.width - (last.x + last.w)).toBe(8);
    expect(layout.height - (last.y + last.h)).toBe(8);
    expect(layout.rowHeaderRect(0).x).toBe(8);
    expect(layout.colHeaderRect(0).y).toBe(8);
  });

  // The 900-cell budget in `_utils.ts` cites this number as the reason the
  // table scrolls rather than scales, so it is worth pinning: at the default
  // cell size a full-budget table really is over a thousand pixels square.
  it('is over 1000px square at the 30x30 cell budget', () => {
    const layout = dpLayout({ rows: 30, cols: 30 });
    expect(layout.width).toBeGreaterThan(1000);
    expect(layout.height).toBe(layout.width);
  });
});

describe('dpLayout degenerate tables', () => {
  it('lays a 1xN table out as a single row of the normal height', () => {
    const layout = dpLayout({ rows: 1, cols: 12, cell: 30, gap: 4, header: 40, pad: 6 });

    expect(layout.height).toBe(6 + 40 + 30 + 6);
    expect(layout.width).toBe(6 + 40 + 12 * 34 - 4 + 6);

    // Every cell shares the single row's y, and the row header labels it.
    const y = layout.cellRect(0, 0).y;
    for (let col = 0; col < layout.cols; col++) expect(layout.cellRect(0, col).y).toBe(y);
    expect(layout.rowHeaderRect(0).y).toBe(y);
  });

  it('collapses an empty table to the header band plus padding', () => {
    const empty = dpLayout({ rows: 0, cols: 0, cell: 30, gap: 4, header: 40, pad: 6 });
    // pad + header + pad: the band is still there, with nothing beside it.
    expect(empty.width).toBe(52);
    expect(empty.height).toBe(52);
  });

  it('clamps a negative size to zero rather than inverting the layout', () => {
    const layout = dpLayout({ rows: -3, cols: -1 });
    expect(layout.rows).toBe(0);
    expect(layout.cols).toBe(0);
    expect(layout.width).toBeGreaterThan(0);
  });
});

describe('dpLayout arrows', () => {
  it('draws nothing from a cell to itself', () => {
    const layout = dpLayout({ rows: 3, cols: 3 });
    expect(layout.arrow({ row: 1, col: 1 }, { row: 1, col: 1 })).toBeNull();
  });

  it('starts just outside the source cell and stops short of the target', () => {
    const layout = dpLayout({ rows: 3, cols: 3, cell: 20, gap: 10 });
    // Straight left-to-right: the source is (1,0), the dependent is (1,1).
    const arrow = layout.arrow({ row: 1, col: 0 }, { row: 1, col: 1 })!;
    const from = layout.center(1, 0);
    const to = layout.center(1, 1);

    expect(arrow.y1).toBeCloseTo(from.y);
    expect(arrow.y2).toBeCloseTo(to.y);
    // 1px clear of the source edge, 3px clear of the target edge — both inside
    // the 10px gutter, which is what keeps the arrowhead visible.
    expect(arrow.x1).toBeCloseTo(from.x + 10 + 1);
    expect(arrow.x2).toBeCloseTo(to.x - 10 - 3);
  });

  it('leaves a diagonal dependency pointing at its dependent', () => {
    const layout = dpLayout({ rows: 3, cols: 3 });
    const arrow = layout.arrow({ row: 0, col: 0 }, { row: 1, col: 1 })!;
    // Up-left to down-right: both components must increase along the arrow.
    expect(arrow.x2).toBeGreaterThan(arrow.x1);
    expect(arrow.y2).toBeGreaterThan(arrow.y1);
  });
});

describe('boxEdgePoint', () => {
  const half = { w: 10, h: 10 };

  it('leaves through the side the ray reaches first', () => {
    const centre = { x: 0, y: 0 };
    expect(boxEdgePoint(centre, half, { x: 100, y: 0 })).toEqual({ x: 10, y: 0 });
    expect(boxEdgePoint(centre, half, { x: 0, y: -100 })).toEqual({ x: 0, y: -10 });
  });

  it('pushes the crossing outwards by the margin', () => {
    const point = boxEdgePoint({ x: 0, y: 0 }, half, { x: 100, y: 0 }, 4);
    expect(point).toEqual({ x: 14, y: 0 });
  });

  it('returns the centre unchanged for a zero-length direction', () => {
    expect(boxEdgePoint({ x: 5, y: 7 }, half, { x: 5, y: 7 })).toEqual({ x: 5, y: 7 });
  });

  it('crosses the corner of a square box on the exact diagonal', () => {
    const point = boxEdgePoint({ x: 0, y: 0 }, half, { x: 50, y: 50 });
    expect(point.x).toBeCloseTo(10);
    expect(point.y).toBeCloseTo(10);
  });
});
