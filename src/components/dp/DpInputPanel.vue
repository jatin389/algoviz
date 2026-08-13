<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { algorithms, bindSpec, validateInput, MAX_TABLE_CELLS } from '@/algorithms/dp';
import type { DpAlgoKey, DpInput, DpItem } from '@/algorithms/dp';
import { dpInputSignature } from '@/composables/useDp';
import { parseArrayInput } from '@/utils/parseArray';
import AvPanel from '@/components/ui/AvPanel.vue';
import AvButton from '@/components/ui/AvButton.vue';
import AvSlider from '@/components/ui/AvSlider.vue';
import AvTextField from '@/components/ui/AvTextField.vue';

// One editor per *input kind*, not per algorithm.
//
// Eight algorithms share six editors, and that is the whole reason
// `DpInputKind` exists (see `algorithms/dp/types.ts`): knapsack and subset-sum
// edit the same item list, LCS and edit distance the same pair of strings. So
// the switch below is on `kind` and never on the algorithm — adding a ninth
// algorithm that reuses an existing input kind must not touch this file, and
// with this shape it does not.
//
// The two places the algorithm still shows through are the *words*: this panel
// reads them off the bound spec's `axes` (`capacity` for knapsack, `target` for
// subset-sum) rather than branching on the key, so the labels follow the
// registry rather than a copy of it kept here.

const props = defineProps<{
  algoKey: DpAlgoKey;
  input: DpInput;
  canEdit: boolean;
}>();

const emit = defineEmits<{
  /** Only ever fired with an input that has already passed `validateInput`. */
  'update:input': [input: DpInput];
  /**
   * Asks the owner to roll a fresh reproducible dataset from its seed. The seed
   * itself stays in the composable rather than being edited here: unlike the
   * other categories, nothing in DP is random *during* a run, so the seed's
   * only job is to make this button repeatable.
   */
  shuffle: [];
}>();

/**
 * The text fields are *drafts*, not state.
 *
 * They hold exactly what the user typed, including half-typed forms like
 * `1, 3,` that do not parse — which is why they cannot simply be computed from
 * the `input` prop. The prop is re-read into them only when it says something
 * they do not already say (see the watcher at the bottom), so a keystroke is
 * never rewritten under the caret.
 */
interface Draft {
  n: number;
  coins: string;
  amount: number;
  values: string;
  weights: string;
  itemValues: string;
  capacity: number;
  a: string;
  b: string;
  dims: string;
}

const draft = reactive<Draft>({
  n: 12,
  coins: '',
  amount: 11,
  values: '',
  weights: '',
  itemValues: '',
  capacity: 9,
  a: '',
  b: '',
  dims: '',
});

/** The last input this panel emitted, as a signature. See the watcher. */
let lastSent = '';

const spec = computed(() => algorithms[props.algoKey]);
const bound = computed(() => bindSpec(spec.value, props.input));
const kind = computed(() => spec.value.kind);

/**
 * `Capacity` / `Target` / `Amount` — the registry's own word for the columns,
 * capitalized to sit alongside the hand-written labels beside it. Taken from
 * `axes` rather than from a lookup keyed by algorithm so that the slider and
 * the table's own column title can never disagree about what the axis is.
 */
const colWord = computed(() => {
  const word = bound.value.axes.colTitle || 'size';
  return word.charAt(0).toUpperCase() + word.slice(1);
});

/** How big the current *committed* input's table is, shown against the budget. */
const size = computed(() => {
  const { rows, cols } = bound.value.dims;
  return { rows, cols, cells: rows * cols };
});

// ---- Draft -> input --------------------------------------------------------

/**
 * Item values are optional, and subset-sum is why: it reads only the weights
 * (`DpItem.value` is documented as meaningless to it), so demanding a parallel
 * list of zeros before the panel will emit anything would be pure busywork.
 * An empty field therefore means "all zero" rather than "invalid".
 */
function parseItems(): { items: DpItem[] | null; error: string | null } {
  const weights = parseArrayInput(draft.weights, { min: 1, max: 99, maxLength: 30 });
  if (weights.error) return { items: null, error: weights.error };

  const blank = draft.itemValues.trim() === '';
  const values = blank
    ? { values: weights.values.map(() => 0), error: null }
    : parseArrayInput(draft.itemValues, { min: 0, max: 999, maxLength: 30 });
  if (values.error) return { items: null, error: values.error };

  if (values.values.length !== weights.values.length) {
    return {
      items: null,
      error: `Give one value per weight — ${weights.values.length} weights, ${values.values.length} values.`,
    };
  }

  return {
    items: weights.values.map((weight, i) => ({ weight, value: values.values[i] })),
    error: null,
  };
}

/**
 * The drafts as a `DpInput`, or the reason they are not one yet.
 *
 * A computed rather than a function called from the change handlers, because it
 * is read from three places (the emit path, the inline error, and the disabled
 * state) and re-deriving it three times per keystroke would let those three
 * disagree about what the fields currently say.
 */
const built = computed<{ input: DpInput | null; error: string | null }>(() => {
  switch (kind.value) {
    case 'scalar':
      return { input: { kind: 'scalar', n: draft.n }, error: null };

    case 'coins': {
      const coins = parseArrayInput(draft.coins, { min: 1, max: 99, maxLength: 8 });
      if (coins.error) return { input: null, error: coins.error };
      return { input: { kind: 'coins', coins: coins.values, amount: draft.amount }, error: null };
    }

    case 'sequence': {
      const values = parseArrayInput(draft.values, { min: 1, max: 99, maxLength: 40 });
      if (values.error) return { input: null, error: values.error };
      return { input: { kind: 'sequence', values: values.values }, error: null };
    }

    case 'items': {
      const { items, error: itemError } = parseItems();
      if (items === null) return { input: null, error: itemError };
      return { input: { kind: 'items', items, capacity: draft.capacity }, error: null };
    }

    case 'strings2':
      return { input: { kind: 'strings2', a: draft.a, b: draft.b }, error: null };

    case 'chain': {
      const dims = parseArrayInput(draft.dims, { min: 1, max: 999, maxLength: 31 });
      if (dims.error) return { input: null, error: dims.error };
      return { input: { kind: 'chain', dims: dims.values }, error: null };
    }
  }

  // Unreachable: `kind` is a `DpInputKind` and all six are handled above. It is
  // written out anyway because ESLint's `vue/return-in-computed-property` does
  // no type narrowing and cannot see that — and a `// eslint-disable` would
  // suppress the rule for the real case too, where a seventh input kind is
  // added and this switch is not.
  return { input: null, error: null };
});

/**
 * Why the drafts are not runnable, or null.
 *
 * Two sources, deliberately merged into one string: a parse failure from
 * `parseArrayInput` ("`x` is not a whole number") and a rejection from the
 * algorithm or the shared budget ("coin values must be distinct", "that table
 * would be 1600 cells"). They are the same kind of news to the reader, and
 * showing them in two different places would only make one of them easy to
 * miss.
 */
const error = computed(() => {
  if (built.value.error !== null) return built.value.error;
  if (built.value.input === null) return null;
  return validateInput(spec.value, built.value.input);
});

/**
 * Emit the drafts if — and only if — they describe a runnable input.
 *
 * `validateInput` is the same check `useDp` runs before it builds a generator,
 * and running it here as well is not redundant: it is what keeps a malformed
 * input from ever *reaching* the composable, so the table on screen always
 * matches the fields beside it. It also covers the shared 900-cell budget, so
 * "that table would be 40 x 40 = 1600 cells" is reported by the panel that can
 * actually do something about it.
 */
function apply() {
  const candidate = built.value.input;
  if (candidate === null) return;
  if (validateInput(spec.value, candidate) !== null) return;

  lastSent = dpInputSignature(candidate);
  emit('update:input', candidate);
}

/** Every field change routes through here so nothing can edit without emitting. */
function set<K extends keyof Draft>(key: K, value: Draft[K]) {
  draft[key] = value;
  apply();
}

// ---- Input -> draft --------------------------------------------------------

function resync(input: DpInput) {
  switch (input.kind) {
    case 'scalar':
      draft.n = input.n;
      break;
    case 'coins':
      draft.coins = input.coins.join(', ');
      draft.amount = input.amount;
      break;
    case 'sequence':
      draft.values = input.values.join(', ');
      break;
    case 'items':
      draft.weights = input.items.map((it) => it.weight).join(', ');
      draft.itemValues = input.items.map((it) => it.value).join(', ');
      draft.capacity = input.capacity;
      break;
    case 'strings2':
      draft.a = input.a;
      draft.b = input.b;
      break;
    case 'chain':
      draft.dims = input.dims.join(', ');
      break;
  }
  lastSent = dpInputSignature(input);
}

/**
 * Re-seed the drafts when the prop describes an input they do not.
 *
 * Comparing signatures rather than object identity, because the prop arrives
 * through a `ref` in the composable and the panel has no way to know whether
 * the object it emitted is the same object coming back. Comparing *values* is
 * what actually matters anyway: the drafts need re-seeding when the algorithm
 * changed kind, or the shuffle button rolled a new dataset — and specifically
 * NOT when the prop is simply the echo of this panel's own last emit, which
 * would rewrite `1, 3,` to `1,3` between two keystrokes.
 */
watch(
  () => props.input,
  (next) => {
    if (dpInputSignature(next) === lastSent) return;
    resync(next);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <AvPanel title="Input">
    <div class="space-y-4">
      <!-- scalar: one number, and the table is one row of it. -->
      <template v-if="kind === 'scalar'">
        <AvSlider
          label="n"
          :model-value="draft.n"
          :min="0"
          :max="40"
          :disabled="!canEdit"
          @update:model-value="set('n', $event)"
        />
      </template>

      <!-- coins -->
      <template v-else-if="kind === 'coins'">
        <AvTextField
          label="Coin values"
          placeholder="1, 3, 4"
          monospace
          :model-value="draft.coins"
          :disabled="!canEdit"
          @update:model-value="set('coins', $event)"
        />
        <AvSlider
          :label="colWord"
          :model-value="draft.amount"
          :min="0"
          :max="60"
          :disabled="!canEdit"
          @update:model-value="set('amount', $event)"
        />
      </template>

      <!-- sequence -->
      <template v-else-if="kind === 'sequence'">
        <AvTextField
          label="Sequence"
          placeholder="3, 10, 2, 1, 20"
          monospace
          :model-value="draft.values"
          :disabled="!canEdit"
          @update:model-value="set('values', $event)"
        />
      </template>

      <!-- items: knapsack and subset-sum, one editor, two words for the columns -->
      <template v-else-if="kind === 'items'">
        <AvTextField
          label="Item weights"
          placeholder="2, 3, 4, 5"
          monospace
          :model-value="draft.weights"
          :disabled="!canEdit"
          @update:model-value="set('weights', $event)"
        />
        <AvTextField
          label="Item values (blank = all zero)"
          placeholder="3, 4, 5, 8"
          monospace
          :model-value="draft.itemValues"
          :disabled="!canEdit"
          @update:model-value="set('itemValues', $event)"
        />
        <AvSlider
          :label="colWord"
          :model-value="draft.capacity"
          :min="0"
          :max="60"
          :disabled="!canEdit"
          @update:model-value="set('capacity', $event)"
        />
      </template>

      <!-- strings2 -->
      <template v-else-if="kind === 'strings2'">
        <AvTextField
          label="String a (rows)"
          placeholder="kitten"
          monospace
          :model-value="draft.a"
          :disabled="!canEdit"
          @update:model-value="set('a', $event)"
        />
        <AvTextField
          label="String b (columns)"
          placeholder="sitting"
          monospace
          :model-value="draft.b"
          :disabled="!canEdit"
          @update:model-value="set('b', $event)"
        />
      </template>

      <!-- chain: n + 1 dimensions describe n matrices -->
      <template v-else>
        <AvTextField
          label="Matrix dimensions"
          placeholder="40, 20, 30, 10, 30"
          monospace
          :model-value="draft.dims"
          :disabled="!canEdit"
          @update:model-value="set('dims', $event)"
        />
        <p class="text-xs text-slate-400">
          {{ size.rows }} matrices — dimension i and i + 1 are the shape of matrix i.
        </p>
      </template>
    </div>

    <!--
      One message for the whole panel rather than one per field: half the
      complaints here are about a *combination* (one value per weight, the
      table's total size), and those have no single field to hang off.
    -->
    <p v-if="error" class="mt-3 text-xs text-rose-500 dark:text-rose-400">{{ error }}</p>
    <p v-else class="mt-3 text-xs text-slate-400">
      Table: {{ size.rows }} × {{ size.cols }} = {{ size.cells.toLocaleString() }} cells (limit
      {{ MAX_TABLE_CELLS.toLocaleString() }}).
    </p>

    <div class="mt-4">
      <AvButton variant="quiet" class="w-full" :disabled="!canEdit" @click="emit('shuffle')">
        Shuffle input
      </AvButton>
    </div>
  </AvPanel>
</template>
