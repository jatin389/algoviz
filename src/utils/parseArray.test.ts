import { describe, it, expect } from 'vitest';
import { parseArrayInput } from './parseArray';

describe('parseArrayInput', () => {
  it('parses comma-separated values', () => {
    expect(parseArrayInput('1,2,3')).toEqual({ values: [1, 2, 3], error: null });
  });

  it('parses space-separated values', () => {
    expect(parseArrayInput('1 2 3')).toEqual({ values: [1, 2, 3], error: null });
  });

  it('parses newline-separated values', () => {
    expect(parseArrayInput('1\n2\n3')).toEqual({ values: [1, 2, 3], error: null });
  });

  it('parses mixed separators to the same values', () => {
    expect(parseArrayInput('1, 2\n3 ,4')).toEqual({ values: [1, 2, 3, 4], error: null });
  });

  it('tolerates surrounding and interior whitespace', () => {
    expect(parseArrayInput('  1,   2 ,3  ')).toEqual({ values: [1, 2, 3], error: null });
  });

  it('tolerates a trailing comma', () => {
    expect(parseArrayInput('1,2,3,')).toEqual({ values: [1, 2, 3], error: null });
  });

  it('rejects an empty string', () => {
    expect(parseArrayInput('')).toEqual({ values: [], error: 'Enter at least one number.' });
  });

  it('rejects a whitespace-only string', () => {
    expect(parseArrayInput('   \n  ')).toEqual({
      values: [],
      error: 'Enter at least one number.',
    });
  });

  it('names the offending token for a non-numeric value', () => {
    expect(parseArrayInput('1, x, 3')).toEqual({
      values: [],
      error: '"x" is not a whole number.',
    });
  });

  it('rejects a decimal token', () => {
    expect(parseArrayInput('1, 1.5, 3')).toEqual({
      values: [],
      error: '"1.5" is not a whole number.',
    });
  });

  it('clamps out-of-range values instead of erroring', () => {
    expect(parseArrayInput('5000, -5, 500')).toEqual({
      values: [999, 1, 500],
      error: null,
    });
  });

  it('clamps negative numbers to min under default options', () => {
    expect(parseArrayInput('-100')).toEqual({ values: [1], error: null });
  });

  it('errors when exceeding maxLength', () => {
    const raw = Array.from({ length: 201 }, (_, i) => i + 1).join(',');
    const result = parseArrayInput(raw);
    expect(result.values).toEqual([]);
    expect(result.error).toBe('Enter at most 200 numbers.');
  });

  it('accepts exactly maxLength values', () => {
    const raw = Array.from({ length: 200 }, () => 1).join(',');
    const result = parseArrayInput(raw);
    expect(result.error).toBeNull();
    expect(result.values).toHaveLength(200);
  });

  it('honors custom options', () => {
    expect(parseArrayInput('50, -10, 3', { min: 0, max: 10, maxLength: 2 })).toEqual({
      values: [],
      error: 'Enter at most 2 numbers.',
    });

    expect(parseArrayInput('50, -10', { min: 0, max: 10, maxLength: 2 })).toEqual({
      values: [10, 0],
      error: null,
    });
  });
});
