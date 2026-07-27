// Binary Search Tree — insert/delete as single, animatable operations.
//
// A node is a plain object `{ id, value, left, right }`. `id` is a stable
// incrementing counter (not the value) so duplicate-friendly trees still give
// every node a unique React/Vue-diffing key, independent of the insert policy.
//
// Every yielded snapshot carries a freshly deep-cloned tree. This is the
// simplest way to guarantee two things at once: Vue's reactivity sees a new
// reference on every step (so it re-renders), and any snapshot captured by a
// caller (history, tests) can't be mutated out from under it by a later step
// of the same generator.

let nextId = 1;

function makeNode(value) {
  return { id: nextId++, value, left: null, right: null };
}

function cloneTree(node) {
  if (!node) return null;
  return {
    id: node.id,
    value: node.value,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
  };
}

/**
 * Insert `value`, yielding a snapshot after each comparison and a final one
 * once the new node is placed. Duplicates are resolved right-biased (treated
 * as "greater than or equal") so insertion always terminates and the tree
 * stays a valid multiset-supporting BST — this is a deliberate, documented
 * choice, not an accidental side effect.
 *
 * @param {object|null} root
 * @param {number} value
 * @yields {{ tree: object|null, visiting: number|null, phase: 'searching'|'inserted', done: boolean }}
 */
export function* insertBST(root, value) {
  let workingRoot = cloneTree(root);

  if (!workingRoot) {
    const created = makeNode(value);
    yield { tree: cloneTree(created), visiting: created.id, phase: 'inserted', done: true };
    return;
  }

  let cursor = workingRoot;
  while (true) {
    yield { tree: cloneTree(workingRoot), visiting: cursor.id, phase: 'searching', done: false };

    if (value < cursor.value) {
      if (!cursor.left) {
        cursor.left = makeNode(value);
        yield {
          tree: cloneTree(workingRoot),
          visiting: cursor.left.id,
          phase: 'inserted',
          done: true,
        };
        return;
      }
      cursor = cursor.left;
    } else {
      if (!cursor.right) {
        cursor.right = makeNode(value);
        yield {
          tree: cloneTree(workingRoot),
          visiting: cursor.right.id,
          phase: 'inserted',
          done: true,
        };
        return;
      }
      cursor = cursor.right;
    }
  }
}

/**
 * Remove `value` if present, yielding search-phase snapshots, a
 * removing-phase snapshot on the match, then the final tree. Two-children
 * removal splices in the in-order successor (smallest value in the right
 * subtree) to preserve the BST invariant.
 *
 * @param {object|null} root
 * @param {number} value
 * @yields {{ tree: object|null, visiting: number|null, phase: 'searching'|'removing'|'deleted'|'not-found', done: boolean }}
 */
export function* deleteBST(root, value) {
  const workingRoot = cloneTree(root);

  let cursor = workingRoot;
  let parent = null;
  while (cursor && cursor.value !== value) {
    yield { tree: cloneTree(workingRoot), visiting: cursor.id, phase: 'searching', done: false };
    parent = cursor;
    cursor = value < cursor.value ? cursor.left : cursor.right;
  }

  if (!cursor) {
    yield { tree: cloneTree(workingRoot), visiting: null, phase: 'not-found', done: true };
    return;
  }

  yield { tree: cloneTree(workingRoot), visiting: cursor.id, phase: 'removing', done: false };

  const removedId = cursor.id;

  if (cursor.left && cursor.right) {
    // Two children: pull up the in-order successor's value, then remove that
    // successor node from its original spot (it has at most a right child).
    let succParent = cursor;
    let succ = cursor.right;
    while (succ.left) {
      succParent = succ;
      succ = succ.left;
    }
    // The position (and its id) survives; only the value it holds changes.
    // The successor's own node is spliced out of its original spot below.
    cursor.value = succ.value;
    if (succParent.left === succ) succParent.left = succ.right;
    else succParent.right = succ.right;
  } else {
    const child = cursor.left || cursor.right;
    if (!parent) {
      const newRootTree = child ? cloneTree(child) : null;
      yield { tree: newRootTree, visiting: null, phase: 'deleted', done: true };
      return;
    }
    if (parent.left === cursor) parent.left = child;
    else parent.right = child;
  }

  yield { tree: cloneTree(workingRoot), visiting: removedId, phase: 'deleted', done: true };
}

/** Plain in-order traversal, used to assert the BST invariant in tests. */
export function inOrderTraversal(root) {
  if (!root) return [];
  return [...inOrderTraversal(root.left), root.value, ...inOrderTraversal(root.right)];
}
