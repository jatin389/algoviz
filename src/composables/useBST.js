import { ref, reactive, computed } from 'vue';
import { insertBST, deleteBST } from '../algorithms/datastructures/bst.js';

/**
 * useBST — the BST operation-playback engine.
 *
 * Unlike useSorter (one continuous run of a whole algorithm), this composable
 * drives exactly one operation (insert/delete) to completion on each call,
 * then returns to idle so the tree just sits there until the next command.
 * Same setTimeout/delayMs stepping pattern as useSorter for visual parity.
 */
export function useBST() {
  const tree = ref(null);
  const status = ref('idle'); // idle | running | done
  const speed = ref(60);
  const stats = reactive({ comparisons: 0, steps: 0 });
  const visiting = ref(null);
  const phase = ref(null);

  let timer = null;

  const delayMs = computed(() => Math.max(4, Math.round(204 - speed.value * 2)));
  const canEdit = computed(() => status.value !== 'running');

  function clearTimer() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function resetStats() {
    stats.comparisons = 0;
    stats.steps = 0;
  }

  function applyStep(step) {
    tree.value = step.tree;
    visiting.value = step.visiting ?? null;
    phase.value = step.phase;
    if (step.phase === 'searching') stats.comparisons += 1;
    stats.steps += 1;
  }

  function driveGenerator(generator, onDone) {
    resetStats();
    status.value = 'running';

    function tick() {
      const { value, done: exhausted } = generator.next();
      if (exhausted || !value) {
        status.value = 'done';
        onDone?.();
        return;
      }
      applyStep(value);
      if (value.done) {
        status.value = 'done';
        onDone?.();
        return;
      }
      timer = setTimeout(tick, delayMs.value);
    }

    tick();
  }

  function insert(value) {
    if (!canEdit.value) return;
    if (typeof value !== 'number' || !Number.isFinite(value)) return;
    driveGenerator(insertBST(tree.value, value));
  }

  function remove(value) {
    if (!canEdit.value) return;
    if (typeof value !== 'number' || !Number.isFinite(value)) return;
    driveGenerator(deleteBST(tree.value, value));
  }

  function reset() {
    clearTimer();
    tree.value = null;
    visiting.value = null;
    phase.value = null;
    resetStats();
    status.value = 'idle';
  }

  /** Instantly insert `count` random distinct values without animating. */
  function seed(count) {
    if (!canEdit.value) return;
    clearTimer();
    const target = Math.min(Math.max(0, Math.floor(count)), 200);
    const seen = new Set();
    let root = tree.value;
    let attempts = 0;
    // Range is wide relative to `target` so distinct-value collisions stay
    // rare; the attempt cap guards against a pathologically unlucky RNG run.
    while (seen.size < target && attempts < target * 50 + 100) {
      attempts += 1;
      const value = Math.floor(Math.random() * 999) + 1;
      if (seen.has(value)) continue;
      seen.add(value);
      let last;
      for (const step of insertBST(root, value)) last = step;
      root = last.tree;
    }
    tree.value = root;
    visiting.value = null;
    phase.value = null;
    resetStats();
    status.value = 'idle';
  }

  return {
    tree,
    status,
    speed,
    stats,
    visiting,
    phase,
    canEdit,
    insert,
    remove,
    reset,
    seed,
  };
}
