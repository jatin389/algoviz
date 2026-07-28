import type { ParseArrayOptions } from '@/utils/parseArray';
import { parseArrayInput } from '@/utils/parseArray';
import type { Coord } from '@/types';

/** Clamps into range rather than rejecting; returns undefined only for non-numbers. */
export function decodeInt(raw: string, min: number, max: number): number | undefined {
  if (raw.trim() === '') return undefined;

  const n = Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return undefined;

  return Math.min(max, Math.max(min, n));
}

/** Registry-key decoder, for the algorithm registries keyed by literal unions. */
export function decodeKey<R extends object>(
  registry: R,
  raw: string,
): Extract<keyof R, string> | undefined {
  // hasOwnProperty rather than `in`: prevents a URL value like 'toString' or
  // 'constructor' from resolving to an inherited prototype member.
  if (Object.prototype.hasOwnProperty.call(registry, raw)) {
    return raw as Extract<keyof R, string>;
  }
  return undefined;
}

export function encodeCoord(coord: Coord): string {
  return `${coord.row},${coord.col}`;
}

export function decodeCoord(raw: string, rows: number, cols: number): Coord | undefined {
  const parts = raw.split(',');
  if (parts.length !== 2) return undefined;

  const [rawRow, rawCol] = parts;
  if (rawRow.trim() === '' || rawCol.trim() === '') return undefined;

  const row = Number(rawRow);
  const col = Number(rawCol);
  if (!Number.isFinite(row) || !Number.isInteger(row)) return undefined;
  if (!Number.isFinite(col) || !Number.isInteger(col)) return undefined;

  // Coordinates are rejected out of bounds rather than clamped: a clamped
  // position silently lands somewhere else on the grid, which is worse than
  // just falling back to the caller's current value.
  if (row < 0 || row >= rows || col < 0 || col >= cols) return undefined;

  return { row, col };
}

export function encodeNumberList(values: readonly number[]): string {
  return values.join(',');
}

export function decodeNumberList(raw: string, options?: ParseArrayOptions): number[] | undefined {
  const { values, error } = parseArrayInput(raw, options);
  return error === null ? values : undefined;
}
