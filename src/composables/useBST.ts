import { ref, reactive, computed, onScopeDispose } from 'vue';
import { insertBST, deleteBST } from '@/algorithms/datastructures/bst';
import type { AlgoStatus, BSTNode, BSTPhase, BSTStep, StepGenerator } from '@/types';
import { useStepDelay } from './useStepDelay';

/**
 * useBST — the BST operation-playback engine.
 *
 * Unlike useSorter (one continuous run of a whole algorithm), this composable
 * drives exactly one operation (insert/delete) to completion on each call,
 * then returns to idle so the tree just sits there until the next command.
 * Same setTimeout/delayMs stepping pattern as useSorter for visual parity.
 */
export function useBST() {
  const tree = ref<BSTNode | null>(null);
  const status = ref<AlgoStatus>('idle'); // this engine never pauses: idle | running | done
  const speed = ref(60);
  const stats = reactive({ comparisons: 0, steps: 0 });
  /** The *id* of the node under the cursor, not its value. */
  const visiting = ref<number | null>(null);
  const phase = ref<BSTPhase | null>(null);

  let timer: ReturnType<typeof setTimeout> | null = null;

  // Shared with every other engine so BST stepping stays visually in step with
  // them; this composable keeps its own driver, though — see the note above.
  const delayMs = useStepDelay(speed);
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

  function applyStep(step: BSTStep) {
    tree.value = step.tree;
    visiting.value = step.visiting ?? null;
    phase.value = step.phase;
    if (step.phase === 'searching') stats.comparisons += 1;
    stats.steps += 1;
  }

  function driveGenerator(generator: StepGenerator<BSTStep>, onDone?: () => void) {
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

  // `value` is raw user input, validated below rather than trusted — hence
  // `unknown` instead of `number`.
  function insert(value: unknown) {
    if (!canEdit.value) return;
    if (typeof value !== 'number' || !Number.isFinite(value)) return;
    driveGenerator(insertBST(tree.value, value));
  }

  function remove(value: unknown) {
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
  function seed(count: number) {
    if (!canEdit.value) return;
    clearTimer();
    const target = Math.min(Math.max(0, Math.floor(count)), 200);
    const seen = new Set<number>();
    let root = tree.value;
    let attempts = 0;
    // Range is wide relative to `target` so distinct-value collisions stay
    // rare; the attempt cap guards against a pathologically unlucky RNG run.
    while (seen.size < target && attempts < target * 50 + 100) {
      attempts += 1;
      const value = Math.floor(Math.random() * 999) + 1;
      if (seen.has(value)) continue;
      seen.add(value);
      let last: BSTStep | undefined;
      for (const step of insertBST(root, value)) last = step;
      // insertBST always yields at least a terminal snapshot, so the loop body
      // ran; TypeScript just can't prove a for-of body executes.
      root = last!.tree;
    }
    tree.value = root;
    visiting.value = null;
    phase.value = null;
    resetStats();
    status.value = 'idle';
  }

  // Stop the timer chain if the owning component unmounts mid-run; otherwise
  // tick() keeps recursing against a detached view forever.
  onScopeDispose(clearTimer);

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
