// Out-of-range values are clamped rather than rejected: a typo like one extra
// zero (5000 instead of 500) shouldn't block the whole input when the intent
// is obvious. This mirrors the URL decoders, which clamp for the same reason.

export interface ParseArrayOptions {
  /** Default 1. */
  min?: number;
  /** Default 999. */
  max?: number;
  /** Default 200. */
  maxLength?: number;
}

export interface ParsedArray {
  values: number[];
  /** Human-readable reason the input was rejected; null when `values` is usable. */
  error: string | null;
}

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 999;
const DEFAULT_MAX_LENGTH = 200;

/** Accepts comma-, space-, or newline-separated integers. Never throws. */
export function parseArrayInput(raw: string, options?: ParseArrayOptions): ParsedArray {
  const min = options?.min ?? DEFAULT_MIN;
  const max = options?.max ?? DEFAULT_MAX;
  const maxLength = options?.maxLength ?? DEFAULT_MAX_LENGTH;

  const tokens = raw
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean);

  if (tokens.length === 0) {
    return { values: [], error: 'Enter at least one number.' };
  }

  if (tokens.length > maxLength) {
    return { values: [], error: `Enter at most ${maxLength} numbers.` };
  }

  const values: number[] = [];
  for (const token of tokens) {
    const n = Number(token);
    if (!Number.isFinite(n) || !Number.isInteger(n)) {
      return { values: [], error: `"${token}" is not a whole number.` };
    }
    values.push(Math.min(max, Math.max(min, n)));
  }

  return { values, error: null };
}
