import { ref, reactive, computed, onScopeDispose } from 'vue';
import { insertHeap, extractRootHeap } from '@/algorithms/datastructures/heap';
import type { AlgoStatus, HeapStep, StepGenerator } from '@/types';

/** Index buckets the array view paints for the step currently on screen. */
interface HeapHighlights {
  comparing: number[];
  swapping: number[];
}

/**
 * useHeap — the heap operation-playback engine.
 *
 * Same one-operation-at-a-time model as useBST: insert/extractRoot each drive
 * a generator to completion on a timer, then the array-backed heap just sits
 * there until the next command.
 */
export function useHeap() {
  const heap = ref<number[]>([]);
  const isMinHeap = ref(true);
  const status = ref<AlgoStatus>('idle'); // this engine never pauses: idle | running | done
  const speed = ref(60);
  const highlights = reactive<HeapHighlights>({ comparing: [], swapping: [] });
  const stats = reactive({ comparisons: 0, swaps: 0, steps: 0 });
  const lastExtracted = ref<number | null>(null);

  let timer: ReturnType<typeof setTimeout> | null = null;

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
    stats.swaps = 0;
    stats.steps = 0;
  }

  function resetHighlights() {
    highlights.comparing = [];
    highlights.swapping = [];
  }

  function applyStep(step: HeapStep) {
    heap.value = step.heap;
    highlights.comparing = step.comparing;
    highlights.swapping = step.swapping;
    if (step.comparing.length > 0) stats.comparisons += 1;
    if (step.swapping.length > 0) stats.swaps += 1;
    stats.steps += 1;
  }

  function driveGenerator(generator: StepGenerator<HeapStep>, onDone?: () => void) {
    resetStats();
    resetHighlights();
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
        // `extracted` is optional (insert steps omit it), and an `in` check
        // proves the key is present but does not remove `undefined` from the
        // declared type — hence the cast rather than a `??` fallback, which
        // would change what gets stored.
        if ('extracted' in value) lastExtracted.value = value.extracted as number | null;
        resetHighlights();
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
    driveGenerator(insertHeap(heap.value, value, isMinHeap.value));
  }

  function extractRoot() {
    if (!canEdit.value) return;
    driveGenerator(extractRootHeap(heap.value, isMinHeap.value));
  }

  function toggleMode() {
    if (!canEdit.value) return;
    isMinHeap.value = !isMinHeap.value;
  }

  function reset() {
    clearTimer();
    heap.value = [];
    lastExtracted.value = null;
    resetHighlights();
    resetStats();
    status.value = 'idle';
  }

  /** Instantly insert `count` random values without animating. */
  function seed(count: number) {
    if (!canEdit.value) return;
    clearTimer();
    const target = Math.min(Math.max(0, Math.floor(count)), 200);
    let a = heap.value;
    for (let i = 0; i < target; i++) {
      const value = Math.floor(Math.random() * 99) + 1;
      let last: HeapStep | undefined;
      for (const step of insertHeap(a, value, isMinHeap.value)) last = step;
      // insertHeap always yields at least a terminal snapshot, so the loop body
      // ran; TypeScript just can't prove a for-of body executes.
      a = last!.heap;
    }
    heap.value = a;
    resetHighlights();
    resetStats();
    status.value = 'idle';
  }

  // Stop the timer chain if the owning component unmounts mid-run; otherwise
  // tick() keeps recursing against a detached view forever.
  onScopeDispose(clearTimer);

  return {
    heap,
    isMinHeap,
    status,
    speed,
    highlights,
    stats,
    lastExtracted,
    canEdit,
    insert,
    extractRoot,
    toggleMode,
    reset,
    seed,
  };
}
