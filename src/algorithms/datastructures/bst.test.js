import { describe, it, expect } from 'vitest';
import { insertBST, deleteBST, inOrderTraversal } from './bst.js';

function drain(generator) {
  let last;
  for (const step of generator) last = step;
  return last;
}

function buildTree(values) {
  let root = null;
  for (const value of values) {
    root = drain(insertBST(root, value)).tree;
  }
  return root;
}

describe('insertBST', () => {
  it('keeps in-order traversal sorted after repeated inserts', () => {
    const values = [50, 30, 70, 20, 40, 60, 80, 10, 90, 25];
    const tree = buildTree(values);
    expect(inOrderTraversal(tree)).toEqual([...values].sort((a, b) => a - b));
  });

  it('builds an empty-root insert as a single terminal snapshot', () => {
    const last = drain(insertBST(null, 5));
    expect(last.done).toBe(true);
    expect(last.phase).toBe('inserted');
    expect(last.tree).toMatchObject({ value: 5, left: null, right: null });
  });

  it('yields searching snapshots before the final inserted snapshot', () => {
    const tree = buildTree([50, 30, 70]);
    const steps = [...insertBST(tree, 40)];
    expect(steps.length).toBeGreaterThan(1);
    expect(steps.slice(0, -1).every((s) => s.phase === 'searching' && !s.done)).toBe(true);
    const last = steps[steps.length - 1];
    expect(last.phase).toBe('inserted');
    expect(last.done).toBe(true);
  });

  it('inserts duplicates right-biased without infinite looping', () => {
    const tree = buildTree([10, 10, 10]);
    expect(inOrderTraversal(tree)).toEqual([10, 10, 10]);
    // Right-biased: every duplicate after the first lives in the right subtree chain.
    expect(tree.right.value).toBe(10);
    expect(tree.right.right.value).toBe(10);
  });
});

describe('deleteBST', () => {
  it('deletes a leaf node', () => {
    const tree = buildTree([50, 30, 70, 20]);
    const last = drain(deleteBST(tree, 20));
    expect(last.phase).toBe('deleted');
    expect(last.done).toBe(true);
    expect(inOrderTraversal(last.tree)).toEqual([30, 50, 70]);
  });

  it('deletes a node with one child', () => {
    const tree = buildTree([50, 30, 70, 20]);
    const last = drain(deleteBST(tree, 30));
    expect(last.phase).toBe('deleted');
    expect(inOrderTraversal(last.tree)).toEqual([20, 50, 70]);
  });

  it('deletes a node with two children, including the root', () => {
    const tree = buildTree([50, 30, 70, 20, 40, 60, 80]);
    const last = drain(deleteBST(tree, 50));
    expect(last.phase).toBe('deleted');
    expect(inOrderTraversal(last.tree)).toEqual([20, 30, 40, 60, 70, 80]);
  });

  it('deletes the only node in the tree', () => {
    const tree = buildTree([42]);
    const last = drain(deleteBST(tree, 42));
    expect(last.phase).toBe('deleted');
    expect(last.tree).toBeNull();
  });

  it('reports not-found and leaves the tree unchanged for a missing value', () => {
    const values = [50, 30, 70];
    const tree = buildTree(values);
    const before = inOrderTraversal(tree);
    const last = drain(deleteBST(tree, 999));
    expect(last.phase).toBe('not-found');
    expect(last.done).toBe(true);
    expect(inOrderTraversal(last.tree)).toEqual(before);
  });

  it('handles deleting from an empty tree without throwing', () => {
    const last = drain(deleteBST(null, 5));
    expect(last.phase).toBe('not-found');
    expect(last.tree).toBeNull();
  });

  it('yields a removing-phase snapshot before the terminal snapshot when found', () => {
    const tree = buildTree([50, 30, 70]);
    const steps = [...deleteBST(tree, 30)];
    const removingStep = steps.find((s) => s.phase === 'removing');
    expect(removingStep).toBeDefined();
    expect(steps[steps.length - 1].phase).toBe('deleted');
  });
});
