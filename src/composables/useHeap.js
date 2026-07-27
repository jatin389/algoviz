import { ref, reactive, computed } from 'vue';
import { insertHeap, extractRootHeap } from '@/algorithms/datastructures/heap';

/**
 * useHeap — the heap operation-playback engine.
 *
 * Same one-operation-at-a-time model as useBST: insert/extractRoot each drive
 * a generator to completion on a timer, then the array-backed heap just sits
 * there until the next command.
 */
export function useHeap() {
  const heap = ref([]);
  const isMinHeap = ref(true);
  const status = ref('idle'); // idle | running | done
  const speed = ref(60);
  const highlights = reactive({ comparing: [], swapping: [] });
  const stats = reactive({ comparisons: 0, swaps: 0, steps: 0 });
  const lastExtracted = ref(null);

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
    stats.swaps = 0;
    stats.steps = 0;
  }

  function resetHighlights() {
    highlights.comparing = [];
    highlights.swapping = [];
  }

  function applyStep(step) {
    heap.value = step.heap;
    highlights.comparing = step.comparing;
    highlights.swapping = step.swapping;
    if (step.comparing.length > 0) stats.comparisons += 1;
    if (step.swapping.length > 0) stats.swaps += 1;
    stats.steps += 1;
  }

  function driveGenerator(generator, onDone) {
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
        if ('extracted' in value) lastExtracted.value = value.extracted;
        resetHighlights();
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
  function seed(count) {
    if (!canEdit.value) return;
    clearTimer();
    const target = Math.min(Math.max(0, Math.floor(count)), 200);
    let a = heap.value;
    for (let i = 0; i < target; i++) {
      const value = Math.floor(Math.random() * 99) + 1;
      let last;
      for (const step of insertHeap(a, value, isMinHeap.value)) last = step;
      a = last.heap;
    }
    heap.value = a;
    resetHighlights();
    resetStats();
    status.value = 'idle';
  }

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
