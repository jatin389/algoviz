// Parent-side validation of everything the sandbox sends back.
//
// This is a second, independent layer and it is not redundant with the
// worker's own normalisation. Isolation stops untrusted code from reaching the
// app's DOM, storage and cookies; it does not stop it from sending the app
// *bad data*. User code shares a realm with the worker bootstrap and can
// replace `self.postMessage`, so anything arriving here is attacker-controlled
// in the general case.
//
// What we are protecting is the renderer: every sorting skin (see
// `src/components/sorting/`) divides by `maxValue`, indexes `array` by
// highlight index, and renders one element per entry. NaN, a negative index,
// or a 10-million-entry array would each break it in a different way.

import type { SortStep } from '@/types';
import { MAX_SANDBOX_ARRAY_LENGTH } from './contract';

export type StepValidation = { ok: true; step: SortStep } | { ok: false; reason: string };

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/** Highlight lists must be integer indices that actually address the array. */
function readIndexList(value: unknown, arrayLength: number, field: string): number[] | string {
  if (value === undefined) return [];
  if (!Array.isArray(value)) return `${field} must be an array of indices`;
  if (value.length > MAX_SANDBOX_ARRAY_LENGTH) return `${field} has too many entries`;

  const out: number[] = [];
  for (const entry of value) {
    if (!isFiniteNumber(entry) || !Number.isInteger(entry)) {
      return `${field} must contain whole numbers`;
    }
    // Out of range is rejected rather than clamped: a clamped index silently
    // highlights a different bar, which reads as a correct run of the wrong
    // algorithm — worse than refusing the step.
    if (entry < 0 || entry >= arrayLength) {
      return `${field} contains index ${entry}, outside the array (0..${arrayLength - 1})`;
    }
    out.push(entry);
  }
  return out;
}

export function validateSortStep(raw: unknown): StepValidation {
  if (raw === null || typeof raw !== 'object') {
    return { ok: false, reason: 'step is not an object' };
  }
  const candidate = raw as Record<string, unknown>;

  if (!Array.isArray(candidate.array)) {
    return { ok: false, reason: 'step.array must be an array' };
  }
  if (candidate.array.length > MAX_SANDBOX_ARRAY_LENGTH) {
    return {
      ok: false,
      reason: `step.array has ${candidate.array.length} entries, over the ${MAX_SANDBOX_ARRAY_LENGTH} limit`,
    };
  }

  const array: number[] = [];
  for (const value of candidate.array) {
    if (!isFiniteNumber(value)) {
      return { ok: false, reason: 'step.array must contain finite numbers' };
    }
    array.push(value);
  }

  const comparing = readIndexList(candidate.comparing, array.length, 'step.comparing');
  if (typeof comparing === 'string') return { ok: false, reason: comparing };

  const swapping = readIndexList(candidate.swapping, array.length, 'step.swapping');
  if (typeof swapping === 'string') return { ok: false, reason: swapping };

  const sorted = readIndexList(candidate.sorted, array.length, 'step.sorted');
  if (typeof sorted === 'string') return { ok: false, reason: sorted };

  if (candidate.comparisons !== undefined && !isFiniteNumber(candidate.comparisons)) {
    return { ok: false, reason: 'step.comparisons must be a number' };
  }
  if (candidate.swaps !== undefined && !isFiniteNumber(candidate.swaps)) {
    return { ok: false, reason: 'step.swaps must be a number' };
  }

  const step: SortStep = {
    array,
    comparing,
    swapping,
    sorted,
    // Negative counters are clamped rather than rejected: they only feed a
    // stats readout, so the blast radius is a wrong number on screen.
    comparisons: Math.max(0, Math.floor((candidate.comparisons as number) ?? 0)),
    swaps: Math.max(0, Math.floor((candidate.swaps as number) ?? 0)),
    done: candidate.done === true,
  };

  if (isFiniteNumber(candidate.line) && candidate.line >= 0) {
    step.line = Math.floor(candidate.line);
  }

  return { ok: true, step };
}
