---
id: 0015
lab_status: planned
researched_at: 2026-08-09
closes: Format choice (GIF vs. WebM vs. still image); library/approach
---

## Verdict

Two findings decide this feature, and neither was visible from the idea.

**There is no `<canvas>` anywhere in the app.** Despite the filenames, `BarChart` and
`GridCanvas` are plain DOM `<div>`s and `GraphCanvas` and `TreeDiagram` are SVG. The item's
premise — "export via canvas capture" — has nothing to capture. Export needs a purpose-built
offscreen frame renderer, which is the real cost of this feature and the reason its effort
estimate should be read as the top of M, not the middle.

**Browser speech synthesis cannot be recorded.** `speechSynthesis` has no route to a
`MediaStreamTrack` or `AudioBuffer` — a still-open spec gap — so spoken narration can never be
muxed into an exported file. Narration ships as burned-in captions plus an optional `.srt`,
which is the better answer anyway for feeds that autoplay muted.

Format question answered: **MP4 is primary**, via `mediabunny` driving WebCodecs — real
H.264+AAC that uploads to every target platform without re-encoding. **GIF** via `gifenc` for
short loops. **WebM** only as a warned fallback, since Instagram and LinkedIn reject it.
`ffmpeg.wasm` is ruled out: it needs `SharedArrayBuffer`, which needs COOP/COEP headers this
static site does not set.

And the approach is inverted from the obvious one: **record the step tape, not the screen.**

## Constraints

**No 2D context exists to capture.** `BarChart.vue` renders `<div>` bars with Tailwind classes
and CSS transitions; `GridCanvas.vue` is a CSS grid of `<div role="gridcell">`; `GraphCanvas.vue`
and `TreeDiagram.vue` are SVG. Consequence: `canvas.captureStream()` is not an option, and the
three alternatives each fail — DOM rasterisation (`html2canvas`) is slow, drops mid-flight CSS
transitions and locks output to layout size; `getDisplayMedia` needs a permission prompt every
time, cannot produce 9:16, and records browser chrome.

**The live renderers carry real accessibility work.** `GridCanvas.vue` has roving tabindex,
`role="gridcell"`, and keyboard wall-painting. Consequence: migrating them to canvas would
destroy that. The canvas renderer is export-only; parity is held by a golden-frame test.

**The audio graph terminates at `ctx.destination`.** `engine.ts` connects `master` straight to
the destination — fire-and-forget, not recordable. Consequence: `scheduleCue()` must be
extracted so the same code can drive an `OfflineAudioContext`.

**`ffmpeg.wasm` requires cross-origin isolation.** Its `SharedArrayBuffer` dependency needs
COOP/COEP response headers, which a static site does not set. Consequence: WebCodecs is the
only viable encode path, and `mediabunny` needs no such headers.

**Retiming is mandatory, not a nicety.** A 60-element bubble sort is ~1800 steps and still has
to land in a 30-second Reel. Consequence: a timeline layer that both holds and decimates, with
terminal and milestone steps pinned so the last frame is always the sorted array.

## Flows

| Path | Today | With this change |
|---|---|---|
| Render | `BarChart` (DOM) → CSS transitions → **screen** | seeded generator → offscreen canvas → **encoder** → `.mp4` |
| Audio | oscillator → envelope → master gain → **`ctx.destination`** | master gain → `OfflineAudioContext` → **AAC mux** |
| Narration | `speechSynthesis.speak()` ╳ `MediaStreamTrack` | `Narrator` → **burned-in captions** → `.srt` |

The narration row is the whole reason this lab exists: that hop cannot be made, so the feature
routes around it rather than through it. The render row shows the second surprise — today's
path ends at the screen and has no pixel source to tap, which is why export builds its own.

## Architecture

```
src/export/
  types.ts  presets.ts  timeline.ts  captions.ts  layout.ts
  paint/    theme.ts  chrome.ts  sorting.ts  (pathfinding|graph|search).ts
  encode/   encoder.ts  mp4.ts  webm.ts  gif.ts  audio.ts
  runExport.ts   worker/exportWorker.ts
```

Everything above `runExport.ts` is pure and testable in node; only `encode/` and the worker
touch browser media APIs.

**Frame renderer contract** — `(ctx, step, opts) => void`. Never reads global state, never
touches the DOM, so it runs in a worker with `OffscreenCanvas`. Composition is layered:
background, title band, stats HUD, caption band, watermark and progress bar all live in
`paint/chrome.ts` and are shared by every algorithm family. **Only the stage painter is
algorithm-specific** — that is what keeps the duplicate-renderer cost bounded.

**Offline generation.** The export job calls `createGenerator()` afresh with the run's seed and
paints from the resulting tape. Zero dropped frames, 1080p possible even at 3 fps render speed,
live UI untouched, fully reproducible because the RNG is already seeded.

**Audio.** Extract `scheduleCue(ctx, spec, at, dest)` from `engine.ts`'s `play()` — the live
engine passes `ctx.currentTime` and nothing changes. `encode/audio.ts` reuses the same
`sortCues.ts` resolvers, renders through an `OfflineAudioContext` faster than real time, and
encodes to AAC.

**Presets** are pure data: 1920×1080 landscape, 1080×1920 vertical, 1080×1080, 1080×1350, plus
a capped GIF. Vertical presets **reflow** rather than crop — code panel dropped, stats stacked,
platform-UI safe areas reserved.

## Phases

| # | Deliverable | Gate |
|---|---|---|
| 0 | Feasibility spike | **Encode a 5 s 1080p clip with `mediabunny` in this Vite build and upload it to one real platform.** Go/no-go before any UI work |
| 1 | `paint/theme.ts`, `paint/chrome.ts`, `paint/sorting.ts` | A single rendered PNG frame that looks right; golden-frame test committed |
| 2 | `presets`, `layout`, `timeline`, `captions` — all pure | Timeline invariants green in node |
| 3 | GIF path (`gifenc` + worker) | Downloadable GIF — smallest complete vertical slice |
| 4 | MP4 path (`mediabunny`) + capability detection + WebM fallback | Downloadable MP4 |
| 5 | `scheduleCue` extraction + `OfflineAudioContext` render + AAC mux | MP4 with sound cues |
| 6 | Caption burn-in + `.srt` sidecar | Consumes 0012's `Narrator` |
| 7 | `ExportDialog.vue` + worker orchestration + progress/cancel | Feature complete for sorting |
| 8 | Renderers for pathfinding, graph, search, tree | Feature complete overall |

Phases 1–4 carry the risk; 5–8 are largely mechanical. New dependencies: `mediabunny` (MPL-2.0)
and `gifenc` (MIT), both small and tree-shakable.

## Risks

| Risk | Mitigation |
|---|---|
| WebCodecs unavailable (older Safari, Firefox lag) | Detect at dialog open, disable MP4 with a stated reason, offer GIF (universal) and WebM (warned) |
| Canvas renderer drifts from the live DOM view | Golden-frame parity test; both renderers read the same palette tokens from `paint/theme.ts` |
| Duplicate renderers become a maintenance tax | Only the stage is duplicated, all chrome is shared. Exit path: migrate the live view onto the canvas renderer — the abstraction already permits it |
| 1080p × 1800 frames exhausts memory | Stream frames into the encoder, never buffer; hard caps with a pre-flight size estimate |
| GIF exports are enormous | Hard caps (≤800×800, ≤15 fps, ≤15 s), size estimate before encode |
| Users expect a spoken voice-over | Say it plainly in the dialog: browser TTS cannot be recorded. Cloud TTS is a future opt-in, not a silent omission |

## Out of scope

**Cloud TTS voice-over** — would need a backend or key handling plus per-export cost. The
captions path is the v1 answer.

**Exporting all six algorithm families at once** — phase 8 is explicitly last; sorting alone is
a shippable feature.

**Migrating the live views to canvas** — deliberately avoided so the existing accessibility work
survives. Noted as the exit path if the duplicate-renderer cost proves worse than expected.

**Relationship to 0019 (Skins):** the idea catalog assumed export would consume a renderer
abstraction that 0019 builds. This lab reverses that — export builds its own frame renderers
first, and 0019 can later consume them. They share the `output-adapter` cluster but neither
blocks the other.
