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

/**
 * A user-composed sequence of operations, encoded as the literal sequence
 * rather than a handle to one.
 *
 * Same reasoning as the concurrency category's `sched` param: an index into
 * some list of scripts would silently address a different script the moment
 * that list or its ordering changed, quietly breaking every link ever shared.
 * The sequence itself reproduces the same run forever.
 *
 * `-` separates ops because it is unreserved in a query string, so nothing here
 * needs percent-encoding; each codec is responsible for never emitting it
 * inside a token.
 */
export const OP_SCRIPT_SEPARATOR = '-';

export interface OpScriptCodec<T> {
  /** Serialize one op. MUST NOT contain `OP_SCRIPT_SEPARATOR`. */
  encodeOp: (op: T) => string;
  /** Parse one token. Return undefined to reject the ENTIRE script. */
  decodeOp: (token: string) => T | undefined;
  /** Scripts longer than this are rejected outright. Default 64. */
  maxOps?: number;
}

const DEFAULT_MAX_OPS = 64;

export function encodeOpScript<T>(ops: readonly T[], codec: OpScriptCodec<T>): string {
  return ops.map(codec.encodeOp).join(OP_SCRIPT_SEPARATOR);
}

/**
 * All-or-nothing, unlike the clamping scalar decoders above. A script is a
 * *program*: dropping the one op that failed to parse does not degrade it
 * gracefully, it produces a different run that the link never described. Better
 * to fall back to the composable's current script than to replay a subtly wrong
 * one.
 */
export function decodeOpScript<T>(raw: string, codec: OpScriptCodec<T>): T[] | undefined {
  const trimmed = raw.trim();
  // An empty script is legitimate — it is what "cleared the list" looks like —
  // and `''.split()` would otherwise yield one empty token that every codec
  // rightly rejects.
  if (trimmed === '') return [];

  const tokens = trimmed.split(OP_SCRIPT_SEPARATOR);
  if (tokens.length > (codec.maxOps ?? DEFAULT_MAX_OPS)) return undefined;

  const ops: T[] = [];
  for (const token of tokens) {
    const op = codec.decodeOp(token);
    if (op === undefined) return undefined;
    ops.push(op);
  }
  return ops;
}

export function encodeNumberList(values: readonly number[]): string {
  return values.join(',');
}

export function decodeNumberList(raw: string, options?: ParseArrayOptions): number[] | undefined {
  const { values, error } = parseArrayInput(raw, options);
  return error === null ? values : undefined;
}
