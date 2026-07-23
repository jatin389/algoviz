import { describe, it, expect } from 'vitest';
import { insertHeap, extractRootHeap } from './heap.js';

function drain(generator) {
  let last;
  for (const step of generator) last = step;
  return last;
}

function checkHeapProperty(heap, isMinHeap) {
  for (let i = 0; i < heap.length; i++) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < heap.length) {
      if (isMinHeap) expect(heap[i]).toBeLessThanOrEqual(heap[left]);
      else expect(heap[i]).toBeGreaterThanOrEqual(heap[left]);
    }
    if (right < heap.length) {
      if (isMinHeap) expect(heap[i]).toBeLessThanOrEqual(heap[right]);
      else expect(heap[i]).toBeGreaterThanOrEqual(heap[right]);
    }
  }
}

const sample = [42, 7, 13, 99, 1, 56, 23, 8, 71, 4, 30, 65];

describe('insertHeap', () => {
  it('maintains the min-heap property after each insert', () => {
    let heap = [];
    for (const value of sample) {
      heap = drain(insertHeap(heap, value, true)).heap;
      checkHeapProperty(heap, true);
    }
    expect(heap).toHaveLength(sample.length);
  });

  it('maintains the max-heap property after each insert', () => {
    let heap = [];
    for (const value of sample) {
      heap = drain(insertHeap(heap, value, false)).heap;
      checkHeapProperty(heap, false);
    }
    expect(heap).toHaveLength(sample.length);
  });

  it('yields a terminal snapshot with done:true', () => {
    const last = drain(insertHeap([], 1, true));
    expect(last.done).toBe(true);
    expect(last.heap).toEqual([1]);
  });
});

describe('extractRootHeap', () => {
  it('returns values in non-decreasing order from a min-heap', () => {
    let heap = [];
    for (const value of sample) heap = drain(insertHeap(heap, value, true)).heap;

    const extractedOrder = [];
    while (heap.length > 0) {
      const step = drain(extractRootHeap(heap, true));
      extractedOrder.push(step.extracted);
      heap = step.heap;
      checkHeapProperty(heap, true);
    }
    for (let i = 1; i < extractedOrder.length; i++) {
      expect(extractedOrder[i]).toBeGreaterThanOrEqual(extractedOrder[i - 1]);
    }
    expect(extractedOrder.sort((a, b) => a - b)).toEqual([...sample].sort((a, b) => a - b));
  });

  it('returns values in non-increasing order from a max-heap', () => {
    let heap = [];
    for (const value of sample) heap = drain(insertHeap(heap, value, false)).heap;

    const extractedOrder = [];
    while (heap.length > 0) {
      const step = drain(extractRootHeap(heap, false));
      extractedOrder.push(step.extracted);
      heap = step.heap;
      checkHeapProperty(heap, false);
    }
    for (let i = 1; i < extractedOrder.length; i++) {
      expect(extractedOrder[i]).toBeLessThanOrEqual(extractedOrder[i - 1]);
    }
  });

  it('does not throw when extracting from an empty heap', () => {
    const last = drain(extractRootHeap([], true));
    expect(last.done).toBe(true);
    expect(last.heap).toEqual([]);
    expect(last.extracted).toBeNull();
  });

  it('handles extracting the only element in the heap', () => {
    const last = drain(extractRootHeap([7], true));
    expect(last.done).toBe(true);
    expect(last.heap).toEqual([]);
    expect(last.extracted).toBe(7);
  });
});
