# AlgoViz Modernization: TypeScript + Router + Lint + UI Primitives

> **Living document.** This is the working plan for an in-progress, multi-phase
> migration — not a finished design doc. The "RESUME HERE" block below is the
> source of truth for what is done and what comes next. The sections after it
> are the original plan, and are stale wherever the corrections list says so.
> Keep this file updated as phases land.

---

# ⏸ RESUME HERE — execution state as of 2026-07-27

**Branch:** `feat/typescript-migration` (6 commits, pushed) · **PR:** https://github.com/jatin389/algoviz/pull/1

| Phase                                     | Status           |
| ----------------------------------------- | ---------------- |
| 0 — Tooling                               | ✅ complete      |
| 1 — Types module + all algorithms → TS    | ✅ complete      |
| **2 — Composables → TS + timer-leak fix** | ⏭ **START HERE** |
| 3 — 28 `.vue` → `lang="ts"`               | pending          |
| 4 — vue-router                            | pending          |
| 5 — UI primitives + a11y                  | pending          |
| 6 — `allowJs: false` + CI gates           | pending          |

**Gate command** (must be green before committing any phase):

```bash
npm run lint:check && npm run type-check && npm run test && npm run build
```

Baseline: 165 tests pass; 4 lint _warnings_ are expected and OK (deliberate `any` in `AlgorithmMeta`'s generic bound).

### Corrections learned during execution — the plan below is stale on these points

1. **Tailwind content glob** was `./src/**/*.{vue,js}` — missing `ts`, so converting a file silently removed it from class scanning. Fixed in `tailwind.config.js`. Not anticipated in the original plan. **Re-verify the CSS hash after any future batch of renames**; it should stay `index-X6FNKZOQ.css` / 22.52 kB.
2. **`AlgorithmMeta` is now generic over complexity**: `AlgorithmMeta<TFn, TComplexity extends AnyComplexity = Complexity>`. Graph traversals use `TimeSpaceComplexity` (`{time, space}`) because BFS/DFS are O(V+E) regardless of input. Both stay assignable to `AnyAlgorithmMeta`.
3. **`GraphModel.adjacency` is `Map<NodeId, NodeId[]>`**, not `Map<number, number[]>` — `Map` is invariant, and this pre-empts an assignability failure in Phase 2's `useGraphTraversal`.
4. **`BSTNode` has an `id` field** (stable counter, independent of value) and **`BSTStep.visiting` is a node id, not a value**. **`HeapStep.extracted` is `number | null`** and optional — the JSDoc claiming `extracted?: number` is wrong.
5. **`SearchStep`'s `low`/`high`/`mid`/`checking`/`foundIndex` are all `number | null`.**
6. **`vue/block-lang` is disabled** in `eslint.config.js`. Re-enable it in Phase 6 — it becomes the tripwire against a component regressing to JS.
7. **`@vue/eslint-config-typescript` v14.9** exports `defineConfigWithVueTs` / `vueTsConfigs`, NOT the `vueTsEslintConfig()` default-function form written in the plan below.
8. **Test count is 165**, not the 68 estimated. Local Node is 18.19.1 vs CI's 20 (works, but `EBADENGINE` warnings on install are expected).
9. **`npm run build` catches what type-check and tests miss.** A `.js` importer cannot resolve a `.js` specifier to a sibling `.ts`. All converted modules' importers were switched to extensionless `@/` aliases. Composable importers are already fixed; **`main.js` and the `.vue` files still use relative paths and will need this treatment as they convert.**

### Known pre-existing bugs — reported, deliberately NOT fixed (out of scope for a type migration)

- `dijkstra.ts` reads `dist.get(k)` without the `?? Infinity` guard its A* sibling uses
- `gridHelpers` derives `cols` from `grid[0]` only → wrong bounds on a ragged grid
- `graphModel`'s edge-key `from < to` compare goes lexicographic if ids ever become strings
- `linearSearch` yields `low`/`high` bounds it doesn't actually use
- `bst.ts`'s `nextId` is module-global and never reset between tests

### Phase 2 specifics (the immediate next step)

Convert `main.js` (+ `index.html` script src) and the 7 composables. **The timer leak is confirmed real**: no composable calls `onScopeDispose`/`onUnmounted` (only `GridCanvas.vue` does, for a window listener), so unmounting a view mid-run leaves `status === 'running'` and the `setTimeout` chain in `useSorter.js:103` recursing forever against a detached component. Add `onScopeDispose(clearTimer)` to all 6 driver composables. Verify by switching tabs mid-run and confirming the animation stops.

---

## Context

AlgoViz is a Vue 3.4 + Vite 5 + Tailwind 3 algorithm visualizer — 69 files, ~5,800 LOC, deployed to GitHub Pages at base `/algoviz/`. It has grown from a sorting visualizer into six independent modules (Sorting, Searching, Pathfinding, BST, Heap, Graph), and that growth exposed four structural gaps:

1. **No type safety.** Every algorithm is a generator yielding a step-snapshot object, and the entire UI is driven by reading fields off those snapshots. That contract is enforced only by JSDoc and convention. With 5 distinct step shapes across 5 registries, a renamed field fails silently at runtime.
2. **No routing.** `App.vue` switches views with `<component :is>`, so there are no bookmarkable URLs and the back button does nothing.
3. **No linting.** Zero ESLint/Prettier config in the repo.
4. **Heavy UI duplication.** ~36 buttons repeat five long Tailwind strings verbatim; four `*AlgorithmSelector.vue` and four `*Stats.vue` are near-identical copies.

**Outcome:** a fully typed codebase where the step-snapshot contract is compiler-enforced, real URLs per view, automated lint/format, and repeated Tailwind collapsed into local primitives — with the app building and tests passing at every intermediate commit.

**Confirmed decisions:** incremental migration with `allowJs` (bottom-up: algorithms → composables → components), `strict: true` from day one, in-repo UI primitives only (no third-party library), port existing tests to TS without adding new suites.

### Pre-existing bug found during research

None of the 7 composables call `onScopeDispose`/`onUnmounted` (verified — only `GridCanvas.vue` has one, for a window listener). When a view unmounts mid-run, `status` stays `'running'`, so the `setTimeout` chain at [useSorter.js:103](src/composables/useSorter.js:103) keeps recursing against a detached component forever. Routing neither causes nor worsens this, but Phase 2 is the natural moment to fix it — one line per composable.

---

## Packages

```jsonc
// dependencies
"vue-router": "^4.4.5"

// devDependencies
"typescript": "~5.6.3",          // ~ not ^: vue-tsc 2.1 / ts-eslint 8 track <5.7
"vue-tsc": "^2.1.10",            // Volar 2; needs Vue >=3.3 (have 3.4.21)
"@vue/tsconfig": "^0.5.1",
"@types/node": "^20.17.0",       // matches node-version: 20 in deploy.yml
"eslint": "^9.14.0",
"eslint-plugin-vue": "^9.31.0",
"typescript-eslint": "^8.14.0",  // requires ESLint >=8.57
"@vue/eslint-config-typescript": "^14.1.3",  // v14 = first flat-config-native
"@vue/eslint-config-prettier": "^10.1.0",    // exports flat `skipFormatting`
"prettier": "^3.3.3",
"globals": "^15.12.0"
```

Vite 5 / `@vitejs/plugin-vue` 5 / Vitest 1.5 need no changes — Vitest transforms `.ts`/`.vue` via esbuild and does **not** type-check (that's `vue-tsc`'s job, and keeps tests fast).

## Config files

**Three-file tsconfig split** (`tsconfig.json` solution file → `tsconfig.app.json` + `tsconfig.node.json`). Verbose for 5.8k LOC, but it's the only clean way to give `vite.config.ts` `types: ["node"]` without leaking Node globals into browser code, and it matches what `create-vue` emits.

`tsconfig.app.json` key options — extends `@vue/tsconfig/tsconfig.dom.json` (which already sets target/lib/jsx/esModuleInterop/skipLibCheck; don't restate):

```jsonc
"strict": true,
"noUncheckedIndexedAccess": false,  // deliberate — see Risks
"noUnusedLocals": true, "noUnusedParameters": true,
"allowJs": true, "checkJs": false,
"module": "ESNext", "moduleResolution": "bundler",
"verbatimModuleSyntax": true, "isolatedModules": true, "noEmit": true,
"baseUrl": ".", "paths": { "@/*": ["./src/*"] }
```

`include` must cover `env.d.ts` and `src/**/*` **including the co-located `*.test.ts` files** — leave them in so they get type-checked. No `types: ["vitest/globals"]` needed: tests already `import { describe, it, expect } from 'vitest'` explicitly (verified).

`env.d.ts` at root: `/// <reference types="vite/client" />`

**No `declare module '*.vue'` shim.** With vue-tsc 2 / Volar 2, a shim actively _shadows_ the real inferred component types and kills template prop checking.

`vite.config.js` → `vite.config.ts`, adding the matching alias (Vitest inherits it — keep using the single config):

```ts
resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }
```

`index.html` must also change `src/main.js` → `src/main.ts` in Phase 2.

## The keystone: `src/types/`

A single shared module, **not** co-located per directory — `AlgorithmMeta`/`Complexity` are shared by all 5 registries, and the generic is what makes the 4 duplicate selectors collapsible later.

```
src/types/
  algorithm.ts   // AlgoStatus, Complexity, StepGenerator, AlgorithmFn, AlgorithmMeta
  steps.ts       // Sort/Search/Path/Graph/BST/Heap steps, Coord, NodeId, BSTNode
  index.ts       // barrel
```

```ts
// algorithm.ts
export type AlgoStatus = 'idle' | 'running' | 'paused' | 'done';
export interface Complexity {
  best: string;
  average: string;
  worst: string;
  space: string;
}

export type StepGenerator<TStep> = Generator<TStep, void, undefined>;
export type AlgorithmFn<TStep, TArgs extends unknown[] = unknown[]> = (
  ...args: TArgs
) => StepGenerator<TStep>;

export interface AlgorithmMeta<TFn extends AlgorithmFn<any, any>> {
  key: string;
  name: string;
  generator: TFn;
  description: string;
  complexity: Complexity;
  stable?: boolean; // sorts only
}
export type AnyAlgorithmMeta = AlgorithmMeta<AlgorithmFn<any, any>>;
```

Step interfaces mirror the shapes already observed. Two subtleties worth encoding: `HeapStep.extracted?` is optional (only extract-root yields it), and `BSTStep.phase` is the union `'searching' | 'inserted' | 'removing' | 'deleted' | 'not-found'`.

`_utils.ts` keeps its runtime body byte-identical, gaining signatures. Use `readonly number[]` for the params that get copied (`array`, `sorted`) — free documentation at zero call-site cost. Leave `comparing`/`swapping` mutable: `snap` does **not** copy them, so they're shared references with generator internals, and marking them readonly would cascade into the reactive assignments in the composables.

**Registries use `satisfies`, not a type annotation** — this is the single most important line in the migration:

```ts
export const algorithms = { bubble: { ... }, /* ... */ } satisfies Record<string, SortAlgorithm>;
export type SortAlgoKey = keyof typeof algorithms;   // 'bubble' | 'selection' | ...
```

`satisfies` validates the shape _and_ preserves the literal key union. Then `algoKey = ref<SortAlgoKey>('bubble')` makes `algorithms[algoKey.value]` non-optional, so `currentAlgo` in [useSorter.js:44](src/composables/useSorter.js:44) needs no `!` or `?.`. Annotating with `: Record<string, ...>` instead widens the key to `string` and forces non-null assertions throughout Phase 2.

## Environment facts (established)

- Branch `feat/typescript-migration` is already created off `main`.
- **Local Node is v18.19.1; `deploy.yml` pins Node 20.** ESLint 9 requires `^18.18 || ^20.9 || >=21.1`, so local tooling works — but keep `@types/node` at `^20` to match the environment that actually produces the deployed build. Inline `tsconfig.node.json`'s options rather than extending `@tsconfig/node20`, to avoid another dependency.

## Execution strategy: subagent delegation

The orchestrator (me) owns the **gates**; subagents own the **bulk conversion**. Division of labor:

**Orchestrator does, never delegated:** `npm install`, all `git` commits, the per-phase verification gate, and any decision that changes the plan. Agents run cold and will happily declare success on a red build, so verification never moves into an agent.

**Parallelism model:** agents run in the **same working tree** (not `isolation: "worktree"`) with **disjoint, explicitly-assigned file sets**. The phases touch cleanly separable directories, so same-tree parallelism avoids merge overhead entirely. The hard rule is that two concurrent agents must never be able to open the same file. Phases themselves stay strictly serial — each builds on the last.

**Every agent brief must carry** (they start with zero context): the `satisfies`-not-annotation decision and the `src/types/` contract verbatim, the extensionless `@/` import rule, the "runtime bodies stay byte-identical" constraint, and an explicit _"do not run npm install, do not commit, do not touch files outside your assigned list."_

| #     | Scope                                                                                                                                                                                                                                     | Delegation                                                                                                                                                                                                                                                                                                                                        | Effort |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **0** | Tooling: packages, 3 tsconfigs, `env.d.ts`, `eslint.config.js`, `.prettierrc.json`, alias, `vite.config.ts`, scripts. Then `prettier --write .` as a **separate commit** (add its hash to `.git-blame-ignore-revs`). No app code touched. | **Inline.** Config authoring is where a wrong guess poisons every later phase, and it's ~8 small files. Not worth a cold agent.                                                                                                                                                                                                                   | ~1h    |
| **1** | `src/types/` + ~42 algorithm files → `.ts` + 6 test files → `.ts`.                                                                                                                                                                        | **1 agent writes `src/types/` + converts the 10 sorts + `_utils`** (establishes the reference pattern). Gate. Then **4 parallel agents**, one per domain: `search/`, `pathfinding/`, `graph/`, `datastructures/` — fully disjoint dirs, each converting its impls + registry + test file, each handed the sorts conversion as the worked example. | ~3–4h  |
| **2** | `main.ts` (+ `index.html`), 7 composables → `.ts` + `onScopeDispose(clearTimer)` fix.                                                                                                                                                     | **2 agents.** One takes `useSorter`/`useSearcher`/`useTheme` + `main.ts`, the other `usePathfinder`/`useGraphTraversal`/`useBST`/`useHeap`. Both told the leak fix is mandatory, not optional.                                                                                                                                                    | ~2h    |
| **3** | 28 `.vue` files → `<script setup lang="ts">`.                                                                                                                                                                                             | **3 parallel agents** by domain: (a) 5 shared `src/components/*.vue` + `App.vue`, (b) `views/` + `components/search/`, (c) `components/pathfinding/` + `graph/` + `datastructures/`. Largest, most parallelizable phase.                                                                                                                          | ~4–5h  |
| **4** | vue-router.                                                                                                                                                                                                                               | **Inline.** Small, and it rewrites `App.vue` — which Phase 3 agent (a) also touches, so serializing it avoids the one real conflict risk.                                                                                                                                                                                                         | ~1.5h  |
| **5** | UI primitives + accessibility.                                                                                                                                                                                                            | **Inline for the 5 primitives** (design decisions, must be right once). Then **3 parallel agents** for adoption across the ~18 consuming files.                                                                                                                                                                                                   | ~4h    |
| **6** | Flip `allowJs: false`; add `type-check` + `lint` to `deploy.yml`.                                                                                                                                                                         | **Inline.** Two-file change.                                                                                                                                                                                                                                                                                                                      | ~1h    |

**Total ≈ 16–20h of work, compressed by roughly half on wall-clock** via the parallel batches in Phases 1, 3, and 5.

Scripts: `"build": "vue-tsc --build && vite build"`, `"type-check": "vue-tsc --build --force"`, `"lint": "eslint . --fix"`, `"lint:check": "eslint ."`, `"format": "prettier --write src/"`.

### Delegation risks

- **A cold agent will re-derive conventions and get them subtly wrong** — most likely by annotating registries with `: Record<string, …>` instead of `satisfies` (killing the literal key union that Phase 2 depends on), or by "improving" an algorithm body while converting it. Both are caught by pinning the worked example in the brief and by reviewing the diff for runtime-body changes at each gate.
- **`git status` is the conflict check.** After each parallel batch, confirm the set of modified files equals the union of the assigned sets — anything extra means an agent strayed and the diff needs a closer read.
- **Agents cannot verify each other.** The build can only be green after a whole batch lands, so individual agents are told to write code, not to run `npm run build` and iterate on a tree other agents are concurrently editing.

## Phase 3 — component conversion patterns

Runtime props → type-only generics; array emits → tuple syntax:

```ts
defineProps<{ size: number; speed: number; status: AlgoStatus; canEdit: boolean /* ... */ }>();

const emit = defineEmits<{
  'update:size': [value: number];
  generate: [];
  run: [];
  pause: [];
  reset: [];
}>();
```

Note `status: String` → `status: AlgoStatus` is a genuine upgrade, not just a translation. Use `withDefaults` where defaults exist.

**Use `defineModel<string>({ required: true })`** (stable in Vue 3.4) in the four selectors — it deletes `defineProps`/`defineEmits`/the `emit()` call, ~6 lines each, and parents using `v-model` need no change.

**Expect `$event.target` friction at ~8 sites** (every range slider and `<select>`). Under `lang="ts"`, `$event.target` is `EventTarget | null`. Extract a named handler rather than casting inline:

```ts
const onSize = (e: Event) => emit('update:size', Number((e.target as HTMLInputElement).value));
```

`GraphCanvas.vue`'s `current: { type: [Number, String] }` becomes `current?: NodeId | null`. Its `GraphNode`/`GraphEdge` interfaces belong in `src/types/steps.ts` beside `NodeId`, since `graphModel.js` produces them. SVG attribute binds (`:cx`, `:r`) accept `number | string | undefined` in Vue's DOM typings, so existing `?.x` lookups keep working.

## Phase 4 — vue-router

**Use `createWebHashHistory(import.meta.env.BASE_URL)`.** Clean URLs would require adding a `404.html` copy step to `deploy.yml` for GitHub Pages SPA fallback. Hash history needs zero workflow change, survives hard refresh unconditionally, and `BASE_URL` picks up `/algoviz/` in prod and `/` in dev automatically from the existing `base` config. Swapping to `createWebHistory` later is a one-function change plus the 404 copy.

Routes carry `meta: { label }`, augmented so `route.meta.label` isn't `unknown`:

```ts
declare module 'vue-router' {
  interface RouteMeta {
    label: string;
  }
}
```

Views stay **eagerly imported** — the app is ~5k LOC and lazy chunks would add a round-trip to every tab switch for no meaningful payload win.

`App.vue`'s `categories` array is replaced by importing the exported `routes` array and filtering on `meta.label` — **not** `router.getRoutes()`, whose ordering isn't guaranteed to match declaration order, and tab order matters here. Nav becomes `<RouterLink>` with `active-class`; `<component :is>` becomes `<RouterView />`.

**Unmount behavior is preserved.** `<RouterView />` without `<KeepAlive>` unmounts the previous view exactly as `<component :is>` does today. Do **not** add `<KeepAlive>` "to preserve tab state" — it would keep the timer chains alive by design and change current behavior.

## Phase 5 — UI primitives

Five components in `src/components/ui/`:

| Component             | Replaces                                                                           | Reach             |
| --------------------- | ---------------------------------------------------------------------------------- | ----------------- |
| `AvButton`            | 5 repeated class strings, variants `primary\|secondary\|neutral\|selector\|toggle` | ~36 buttons       |
| `AvPanel`             | `av-card p-4 sm:p-5` + heading                                                     | 18 panels         |
| `AvStatCell`          | `rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/50`                      | 4 `*Stats.vue`    |
| `AvAlgorithmSelector` | the 4 duplicate selectors                                                          | deletes 3 files   |
| `AvSlider`            | range input + label row                                                            | ~5 control panels |

**Plain computed class maps — no `class-variance-authority`, no `tailwind-merge`.** CVA earns its keep with compound variants across many consumers; here it's 5 flat variants in one repo, so a `Record<Variant, string>` plus a `computed` is ~15 lines and fully typed by the union. One-off layout classes (`col-span-2`) can ride in via Vue's automatic `class` fallthrough — no conflict resolution needed since layout ≠ color.

`AvAlgorithmSelector` is where the Phase 1 generic pays off: `algorithms: AnyAlgorithmMeta[]` + `defineModel<string>()`. Watch out that `columns` maps to **static** `grid-cols-2`/`grid-cols-3` strings — a dynamic `grid-cols-${n}` gets purged by Tailwind.

Net ≈ **−450 to −550 lines** (~10% of the codebase) and a single place to add the missing `aria-label`s. Fold accessibility in here since every button is being touched anyway: `aria-label` on icon-only buttons, `aria-pressed` on toggles, `aria-label`/`aria-valuetext` on sliders. Only `ThemeToggle.vue` currently has any aria attributes.

**This phase is last on purpose.** Doing primitives during Phase 3 would mix a mechanical `lang="ts"` conversion with a structural refactor in the same diff — precisely where a Tailwind class silently drops and nothing catches it, since there are no component tests. Within Phase 5, land `AvButton`/`AvPanel` first (mechanical), then `AvAlgorithmSelector` (structural).

## Risks & gotchas

1. **Mixed `.js`/`.ts` import resolution — the main Phase 1/2 trap.** All imports are currently extension-ful (`from '../algorithms/index.js'`). Vite resolves a `.js` specifier to a sibling `.ts` only when the _importer_ is `.ts`/`.vue`; a remaining `.js` importer will 404 in dev. **Fix by switching to extensionless `@/` alias imports (`from '@/algorithms'`) as the first step of Phase 1** — resolves identically before and after conversion and eliminates the whole class of problem. Safe under `moduleResolution: bundler` since Vite, not tsc, emits.
2. **Keep `noUncheckedIndexedAccess` off.** Enabling it would force `?.`/`!` on every registry lookup, every `array[i]` inside all 10 sorts, and every `Map.get()` — hundreds of assertions for near-zero real safety in index-loop-heavy algorithm code. Leave a comment in `tsconfig.app.json` so it isn't "fixed" later.
3. **Get `satisfies` right in Phase 1** or pay for it in Phase 2 with non-null assertions everywhere.
4. **Vitest doesn't type-check** — renamed `.test.ts` files run even with type errors. `vue-tsc` must include them.
5. **Prettier's first run** produces a large diff on long Tailwind class attributes. Own commit, `.git-blame-ignore-revs`.
6. **`vue/multi-word-component-names` must be off** (App.vue), and the `vue/` formatting rules (`max-attributes-per-line`, `singleline-html-element-content-newline`, `html-self-closing`) disabled — `flat/recommended` would otherwise flag the long Tailwind attribute strings by the hundred. Set `printWidth: 100` in Prettier to match existing code; the default 80 reflows everything.
7. **Skip `@typescript-eslint` type-aware rules** (`recommendedTypeChecked`) — they need `projectService` wiring for `.vue` files and ~5x the lint time. `vue-tsc` already covers type correctness.
8. **`useTheme().initTheme()` runs at module scope in `main.ts`**, touching `document`/`localStorage`. Fine as-is — just never import `main.ts` from a test.

## Verification

Per phase: `npm run lint:check && npx vue-tsc --build --force && npm run test && npm run build`, then `npx vite preview --base /algoviz/` to confirm the base path and asset loading.

Manual browser pass after Phases 3, 4, and 5 — in **both** light and dark mode, across all 6 views: Run → Pause → Resume → Reset → Shuffle; change algorithm while idle; drag both sliders; Graph: click a node to set start; BST: insert and delete; Pathfinding: drag-paint walls.

Two targeted checks:

- **Switch tabs mid-run** and confirm the old view's animation stops — this validates the `onScopeDispose` fix from Phase 2. Verify with a `console.count` in `tick()` if unsure.
- **Deep-link `#/heap` and hard-refresh**, then confirm the deployed Pages URL under `/algoviz/`.
