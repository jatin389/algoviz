import { describe, it, expect } from 'vitest';
import { barHeightPercent } from './scale';

describe('barHeightPercent', () => {
  it('maps the max value to 100%', () => {
    expect(barHeightPercent(50, 50)).toBe('100%');
  });

  it('maps zero to the 2% floor, never fully flat', () => {
    expect(barHeightPercent(0, 50)).toBe('2%');
  });

  it('is linear between the floor and 100%', () => {
    expect(barHeightPercent(25, 50)).toBe('51%');
  });

  it('reserves headroom so the max value does not touch the ceiling beyond 100%', () => {
    const pct = parseFloat(barHeightPercent(50, 50));
    expect(pct).toBeLessThanOrEqual(100);
  });
});
