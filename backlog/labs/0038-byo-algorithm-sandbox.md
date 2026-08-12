---
id: 0038
lab_status: planned
researched_at: 2026-08-12
closes: Sandboxing/security approach; which snapshot shape(s) it targets first; acceptance criteria
---

## Verdict

Two decisions this lab was built to close are settled: v1 targets **`SortStep`** only — the
one snapshot shape with a reusable view (`BarChart`) — and isolation is **a Web Worker running
inside a `sandbox="allow-scripts"` iframe with no `allow-same-origin`**, because the app deploys
as a static SPA to GitHub Pages with no server to set COOP/COEP headers, so the sandbox
attribute's opaque-origin isolation is the only isolation route available at all, and it's
mandatory rather than optional because shared sandbox code auto-runs in a stranger's browser
from day one.

The part that wasn't visible from the idea: **`useStepPlayer.pump()` calls `generator.next()`
synchronously on the main thread today** — there is no seam where a message-driven step source
can be substituted without changing the player itself. This isn't a new sandbox bolted onto
existing infrastructure; it's a small refactor of shared infrastructure (behind a `StepSource`
abstraction) that every existing category flows through, plus a genuinely new runner chain
(iframe → worker → user code) behind it. That refactor, not the sandboxing itself, is the
riskiest single step, because it touches all six existing categories at once.

## Constraints

**Static GitHub Pages deploy, no server (`vite.config.ts`, `.github/workflows/deploy.yml`).**
Consequence: no custom response headers, so `Cross-Origin-Opener-Policy` /
`Cross-Origin-Embedder-Policy` isolation is unavailable. The `sandbox` attribute on an iframe
(browser-native, no headers required) is the only isolation primitive on the table.

**`useStepPlayer` (`src/composables/useStepPlayer.ts`) drives a local `Generator` object
directly** — `pump()` calls `.next()` synchronously, `history: TStep[]` is a plain in-memory
array, capped at `MAX_BUFFERED_STEPS = 50_000` with `SEEK_PUMP_LIMIT = 2_000` for scrubbing.
Consequence: a sandbox that yields steps via `postMessage` cannot be handed to `useStepPlayer`
unmodified. The player needs a `StepSource` seam (`{ next(): Promise<TStep> }` or similar)
that a local generator and a worker-backed stream can both satisfy, so the five existing
categories keep working through the same interface unchanged.

**Snapshot shapes are per-category with no runtime discrimination**
(`src/types/steps.ts`: `SortStep`, `PathStep`, `GraphStep`, `SearchStep`, `BSTStep`, `HeapStep`).
Consequence: user code must target exactly one shape, chosen at editor-open time, not
inferred. `SortStep` (`{array, comparing, swapping, sorted, comparisons, swaps, done, line?}`)
is the only shape whose existing view (`BarChart`) needs zero new rendering work — the other
five would each need a bespoke view built for user-authored content, which is out of scope for
v1.

**Nothing to build on.** No CodeMirror/Monaco, no Web Worker, no `eval`/`Function`, no
sandboxed iframe anywhere in `src/` today (confirmed by search). Consequence: this is
greenfield infrastructure — a new Vite build entry for the runner page, a new worker bundle,
and a new editor dependency, not a variation on an existing pattern.

**Existing generators are real `function*`/`yield`, driven by `.next()` with no argument**
(`src/algorithms/index.ts` and category equivalents). Consequence: this is good news inside the
worker — a user-authored `function*` matching `SortStep` can be executed exactly like a
built-in algorithm once it's inside the worker's realm; the isolation boundary is what's new,
not the execution model.

**An opaque-origin sandboxed iframe still permits outbound network requests** (`fetch`,
`XMLHttpRequest`, `WebSocket` are not blocked by `sandbox="allow-scripts"` alone). Consequence:
isolation here protects the *app's own origin* (no DOM, cookie, or localStorage access) and the
*UI thread* (worker hang doesn't freeze the tab), but does not prevent a malicious shared
snippet from calling out to a third party. Documented as an accepted risk below, not a gap in
this design — no isolation primitive available on a static site closes it.

**`allow-scripts` and `allow-same-origin` must never be set together on the sandboxed iframe.**
That specific combination is a known sandbox escape: scripts inside can rewrite the iframe's own
document/location from within its own realm and shed the sandbox restrictions entirely.
Consequence: this is a hard invariant on the `<iframe sandbox="...">` attribute, not a tuning
knob — worth a code comment (and ideally a lint rule) at the point it's set, since "just add
`allow-same-origin`, it'll be fine" is exactly the kind of fix a future PR might reach for.

**The sandboxed content never gets a visible rendering surface of its own** — it only emits
`postMessage` data; the app-controlled `BarChart` does all the rendering. Consequence: this
incidentally rules out UI-redressing/phishing-overlay attacks (there's no surface to spoof with)
and must stay true — don't give user code a visibly-rendered iframe later without re-deriving
this protection some other way.

## Architecture

```
src/sandbox/
  runner.html            new Vite build entry, loaded only inside the sandboxed iframe
  runner-main.ts         postMessage protocol handler: receives {code, input}, owns the worker
  worker.ts               (?worker import) executes user function* against SortStep contract
  stepSource.ts           StepSource interface + two implementations: LocalGeneratorSource, WorkerMessageSource
  encode.ts               URL-safe encode/decode of editor source, for the existing hash router
  SandboxEditor.vue        CodeMirror host, SortStep-annotated starter template
  SandboxRunner.vue        owns the sandboxed <iframe>, watchdog timer, terminate/recreate
```

**`StepSource` seam.** `useStepPlayer.pump()` is refactored to pull from a `StepSource`
instead of calling `.next()` on a raw `Generator`. `LocalGeneratorSource` wraps today's
generators with the same synchronous behavior — a pure refactor, no visible change to any
existing category. `WorkerMessageSource` resolves each `next()` call from the next queued
`postMessage` from the runner chain. This is the only change existing categories see, and it's
mechanical.

**Runner chain.** Parent posts `{code, input}` once to the sandboxed iframe. `runner-main.ts`
(running at an opaque origin, no `allow-same-origin`) spins up a dedicated `Worker`, forwards
the payload, and relays each step message back to the parent unchanged — it exists only to give
the parent a stable postMessage target that survives worker restarts. The worker itself builds
the generator via `new Function('input', code + '; return run(input)')`-style construction
scoped to only its own realm (no `window`, no parent references reachable — the worker global
scope has neither) and calls `.next()` in a loop, posting each yielded step. `SortStep`'s
fields are plain arrays/numbers/booleans, so structured-clone through `postMessage` needs no
special serialization.

**Kill switch.** Because the iframe has no `allow-same-origin`, the parent cannot reach into it
via `contentWindow` beyond `postMessage`. The only reliable hard-stop is removing and
recreating the iframe element, which tears down the worker inside it. `SandboxRunner.vue` owns
a watchdog: a step-count cap (reuse `MAX_BUFFERED_STEPS`-style limit) and a wall-clock timeout
enforced from both sides — the worker self-terminates past a budget, and the parent
removes/recreates the iframe if no heartbeat arrives in time, so a hostile snippet that ignores
its own budget still gets killed externally.

**Sharing.** Editor source is encoded into the existing hash-router URL state
(`encode.ts`), consistent with the app's seed→URL pattern elsewhere. Opening a shared link
auto-runs the code per the product decision above; a non-blocking banner ("running
community-authored code") renders on load as a transparency signal, not a blocking gate — a
blocking confirmation would defeat the point of "shareable from day one."

## Phases

| # | Deliverable | Gate |
|---|---|---|
| 0 | Feasibility spike: sandboxed iframe hosting a worker, round-trips one hardcoded step via `postMessage` into a stub player | Confirms opaque-origin isolation actually blocks `contentWindow` access from the parent, and that iframe removal reliably kills the inner worker. Go/no-go before any further work |
| 1 | `StepSource` refactor of `useStepPlayer`, `LocalGeneratorSource` only | All six existing categories (sort/search/path/graph/BST/heap) pass existing manual QA with zero behavior change — this is the highest-regression-risk phase since it touches shared infrastructure |
| 2 | Runner chain: `runner.html`/`runner-main.ts`/`worker.ts`, hardcoded trusted `SortStep` generator, no editor yet | A known-good user-authored-style generator runs end-to-end through the sandboxed chain into the existing `BarChart` view via `WorkerMessageSource` |
| 3 | Safety budget + kill switch + step validation | An intentionally infinite-looping snippet is caught and terminated within the budget, tab stays responsive; a snippet yielding malformed steps (non-numeric array, out-of-range indices, missing `done`) is dropped before it reaches `BarChart`, not rendered |
| 4 | `SandboxEditor.vue` (CodeMirror + `SortStep`-annotated starter template) | A user can write, run, and see errors from arbitrary code locally, no sharing yet |
| 5 | URL sharing + community-code banner | A shared link auto-runs on load with the transparency banner shown |

Phase 1 carries the regression risk; phase 0 carries the feasibility risk. New dependencies:
a code editor (CodeMirror, MIT) and, if URL length becomes a problem in phase 5, a compression
library — deferred until it's an actual measured problem rather than assumed upfront.

## Risks

| Risk | Mitigation |
|---|---|
| `StepSource` refactor regresses an existing category | Phase 1 ships alone with full manual QA across all six categories before any sandbox code lands on top of it |
| Sandboxed worker still reaches the network (fetch/XHR/WebSocket to third parties) | Documented accepted risk — no static-site isolation primitive blocks this; worker has no access to the app's own cookies/storage/DOM, which bounds the damage to "abuses the visitor's network," not "compromises the app" |
| Infinite loop / runaway computation in user code | Dual budget: worker self-terminates on step/time cap, parent watchdog force-kills via iframe removal if no heartbeat |
| Shared-code URLs exceed practical length limits | Deferred to phase 5; cap editor length with a clear message if it becomes a real constraint, revisit compression only if needed |
| Users expect sandboxed code to reach other snapshot shapes immediately | State plainly in the editor UI that v1 is sort-only; extending to other shapes is a natural, separate follow-up once this infrastructure exists |
| A malicious or buggy snippet yields malformed steps (`NaN`, huge arrays, out-of-range indices) that corrupt or crash the renderer | The parent validates every step (array of finite numbers; `comparing`/`swapping`/`sorted` are in-bounds indices; `done` is boolean) before handing it to `BarChart` — a second layer independent of the sandbox itself, since isolation stops the code from touching the app, not from sending it bad data |
| A message could be spoofed by something other than the runner iframe | Parent must check `event.source === iframe.contentWindow` on every `message` event and discard anything else — required in the runner chain's listener, not optional |

## Out of scope

**The other five snapshot shapes** (`PathStep`, `GraphStep`, `SearchStep`, `BSTStep`,
`HeapStep`) — each would need its own view built for user-authored content. `SortStep` alone is
a shippable v1.

**Non-JS languages / WASM execution** — the runner executes `function*` JavaScript only.

**Server-side moderation or scanning of shared snippets** — there is no server; all execution
is client-side in the visitor's own browser, so there is no place to run a malware/abuse scan
before a link is opened. The isolation model is what stands in for moderation.

**Collaborative/live co-editing** — out of scope; sharing is link-based and static per snapshot
of the code at share time.
