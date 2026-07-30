# Export as GIF / MP4 — record and download

**Status:** proposed, not started
**Scope:** client-side, no server. Produce a file a user can upload directly to YouTube, Instagram, TikTok or LinkedIn without re-encoding.

---

## 1. Goal

One button on a visualisation produces a shareable video: correct aspect ratio and resolution for the target platform, optional narration, optional sound cues, optional stats/code overlays, downloaded locally.

## 2. The two blocking findings

Both were confirmed by reading the code, and both determine the shape of the plan.

### 2.1 There is no `<canvas>` in this app

Despite the filenames, nothing renders to a 2D context:

| Component | Actual technology |
|---|---|
| `src/components/BarChart.vue` | **DOM** — `<div>` bars, Tailwind classes, CSS `transition-[height,background-color]` |
| `src/components/pathfinding/GridCanvas.vue` | **DOM** — CSS grid of `<div role="gridcell">` |
| `src/components/graph/GraphCanvas.vue` | **SVG** — `<line>`, `<circle>`, `<text>` |
| `src/components/datastructures/TreeDiagram.vue` | **SVG** |

So `canvas.captureStream()` has nothing to capture. Three options were considered:

1. **DOM rasterisation** (`html-to-image` / `html2canvas`) — reads live DOM, but is slow, drops CSS transitions mid-flight, has known font and `oklch`/Tailwind-v4-colour fidelity problems, and locks output resolution to layout size. Rejected.
2. **`getDisplayMedia` tab capture** — trivial to build, but needs a permission prompt every time, captures at screen resolution and aspect (never 9:16), and records browser chrome. Rejected as a primary path.
3. **Purpose-built canvas frame renderers** — pure functions `(ctx, step, opts) => void` that paint a snapshot at any resolution, offscreen, deterministically, decoupled from layout. **Chosen.**

The cost of (3) is a second renderer per visualisation alongside the DOM/SVG one. That is a real cost, and it is worth paying: the live DOM renderers carry genuine accessibility work (roving tabindex, `role="gridcell"`, keyboard wall-painting in `GridCanvas.vue`) that would be lost by migrating them to canvas, and export needs things the live view never needs — arbitrary output resolution, 9:16 reflow, safe-area insets, title cards, burned-in captions. They are different jobs. Parity is protected by a snapshot test (§8).

### 2.2 `speechSynthesis` output cannot be recorded

The Web Speech API has no route to a `MediaStreamTrack` or an `AudioBuffer`; this is a long-standing, still-open gap in the spec (`WICG/speech-api#69`). Every workaround requires a system loopback device or a native host — neither is available to a web page. So the browser's TTS voice **cannot** be muxed into an exported file.

Narration in exports is therefore delivered as **burned-in captions**, with an optional `.srt` sidecar. This is the right answer regardless: the large majority of social video is watched muted, and every target platform ranks captioned video better. Actual voice-over would require a cloud TTS call — explicitly out of scope, noted in §10 as a future opt-in.

Sound *cues*, by contrast, are fully exportable — they are Web Audio oscillators and can be re-rendered offline (§6).

## 3. Architecture

```
src/export/
  types.ts              FrameRenderer, ExportJob, ExportPreset, Caption
  presets.ts            platform presets (pure data)
  timeline.ts           step tape -> frame schedule (pure)
  captions.ts           narration -> timed caption cues + SRT serialiser (pure)
  layout.ts             safe areas, scaling, aspect fitting (pure)
  paint/
    theme.ts            palette tokens resolved from useTheme, canvas-side
    chrome.ts           background, title card, HUD, caption band, watermark, progress
    sorting.ts          FrameRenderer<SortStep>
    pathfinding.ts      FrameRenderer<PathStep>     (later phase)
    graph.ts            FrameRenderer<GraphStep>    (later phase)
    search.ts           FrameRenderer<SearchStep>   (later phase)
  encode/
    encoder.ts          Encoder interface + capability detection
    mp4.ts              mediabunny + WebCodecs
    webm.ts             MediaRecorder fallback
    gif.ts              gifenc in a worker
    audio.ts            OfflineAudioContext cue rendering
  runExport.ts          orchestrator: job -> Blob, with progress + cancel
  worker/exportWorker.ts
```

Everything above `runExport.ts` is pure and testable in node. Only `encode/` and the worker touch browser media APIs.

### 3.1 The frame renderer contract

```ts
export interface FrameRenderOpts {
  width: number; height: number;
  palette: ExportPalette;         // resolved light/dark tokens, no CSS vars
  safe: Insets;                   // platform safe areas (TikTok/Reels UI overlap)
  overlays: { stats: boolean; code: boolean; caption: string | null; watermark: boolean };
  progress: number;               // 0..1, drives the progress bar
  meta: { algorithm: string; subtitle: string };
}

export type FrameRenderer<TStep> = (
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  step: TStep,
  opts: FrameRenderOpts,
) => void;
```

A renderer paints one frame and returns nothing. It never reads global state, never touches the DOM, never reads `document`. That makes it runnable in a worker with `OffscreenCanvas` and testable against a stub context.

Composition is layered so the chrome is shared across every algorithm family — background, title band, stats HUD, caption band, watermark, progress bar all live in `paint/chrome.ts` and are called by every renderer. Only the stage painter is algorithm-specific.

### 3.2 Frame generation is offline, not real-time

Do **not** record the live animation. Instead the export job calls `createGenerator()` afresh (the same factory the player uses) with the run's seed, drains it into a step tape, and paints frames from that tape at whatever rate the encoder can manage. Consequences:

- Zero dropped frames regardless of machine speed.
- 1080p output is possible even if it renders at 3 fps.
- The live UI is untouched during export — the user can keep interacting.
- Fully deterministic and reproducible, because the RNG is already seeded (`src/utils/rng.ts`).

### 3.3 Retiming

An algorithm run has _N_ steps; a video has _fps × duration_ frames. `timeline.ts` maps between them:

```ts
export interface TimelineOpts {
  fps: number;
  targetDurationSec: number;      // total, including intro/outro
  introMs: number; outroMs: number;
  holdMs: { start: number; end: number };   // freeze on first/last state
  range?: { from: number; to: number };     // in/out points from the scrubber
  emphasisHoldMs?: number;                  // extra dwell on swap/found/path steps
}

export function buildTimeline<TStep>(steps: readonly TStep[], o: TimelineOpts): Frame[];
// Frame = { stepIndex: number; captionId: string | null; tMicros: number }
```

Two regimes, chosen automatically: when steps are fewer than available frames, each step is **held** for multiple frames (and given extra dwell if it is a swap/found/path-complete step); when steps outnumber frames, steps are **decimated** — but never uniformly. Terminal and milestone steps are pinned so the last frame is always the sorted array, and decimation happens inside runs of similar steps. A 60-element bubble sort is ~1800 steps and must still land in a 30-second Reel.

## 4. Presets

`presets.ts` is pure data — no platform logic anywhere else.

| Preset | Resolution | fps | Default length | Format |
|---|---|---|---|---|
| YouTube (landscape) | 1920×1080 | 30 | 60 s | MP4 |
| YouTube Shorts / Reels / TikTok | 1080×1920 | 30 | 30 s | MP4 |
| Instagram feed (square) | 1080×1080 | 30 | 30 s | MP4 |
| Instagram feed (4:5) | 1080×1350 | 30 | 30 s | MP4 |
| LinkedIn | 1920×1080 | 30 | 45 s | MP4 |
| X / general GIF | 800×800 | 15 | 12 s | GIF |
| Custom | user | user | user | user |

Each preset also carries `safe` insets (vertical presets reserve top/bottom for platform UI so the caption band and stats aren't covered) and a `maxBytes` advisory used to warn before encoding rather than after.

The 9:16 presets are not a crop of 16:9 — `layout.ts` reflows: stage on top, stats HUD and caption band stacked below, code panel dropped entirely (unreadable at that width).

## 5. Encoding

```ts
export interface Encoder {
  addFrame(source: CanvasImageSource, tMicros: number): Promise<void>;
  addAudio?(buffer: AudioBuffer): Promise<void>;
  finish(): Promise<Blob>;
  cancel(): void;
}
```

**MP4 — primary.** [`mediabunny`](https://mediabunny.dev/) driving `VideoEncoder`/`AudioEncoder` (WebCodecs). Produces real H.264 + AAC MP4 that uploads to every target platform without re-encode. Zero-dependency TypeScript, MPL-2.0, tree-shakable, and — importantly — **needs no cross-origin isolation**, unlike `ffmpeg.wasm`, which requires `SharedArrayBuffer` and therefore COOP/COEP headers this static site does not set. That single fact rules out the `ffmpeg.wasm` route. Support: Chrome/Edge 94+, Safari 16.4+.

**WebM — fallback.** Where WebCodecs is unavailable, drive `MediaRecorder` off `canvas.captureStream()` on a hidden canvas. This forces real-time playback and produces WebM, which Instagram and LinkedIn reject — so it is offered with an explicit warning, not silently substituted.

**GIF.** [`gifenc`](https://github.com/mattdesl/gifenc) rather than `gif.js`: roughly twice as fast with comparable output, and it does not ship its own worker (which is what we want — we own the worker). GIFs are capped hard (≤ 800×800, ≤ 15 fps, ≤ 15 s) with a size estimate shown before encoding, since a careless GIF export is trivially 50 MB.

Capability detection runs once at dialog open and disables unavailable formats with a reason, rather than failing mid-export.

## 6. Audio in the export

The audio engine currently terminates at `ctx.destination` (`src/audio/engine.ts` — `master.connect(ctx.destination)`), which is not recordable. Rather than bolting a `MediaStreamAudioDestinationNode` on, the fix that serves both paths is a small refactor:

1. Extract the oscillator + envelope construction from `play()` into a pure `scheduleCue(ctx: BaseAudioContext, spec: CueSpec, at: number, dest: AudioNode): void`. The live engine calls it with `at = ctx.currentTime`; nothing about live behaviour changes.
2. `encode/audio.ts` builds a cue schedule by walking the timeline (reusing `sortCues.ts` resolvers — the same resolvers the live playback uses), then renders it through an `OfflineAudioContext` at the video's exact duration, calling `scheduleCue` for each. Result: an `AudioBuffer`, rendered faster than real time, perfectly sample-aligned to the frame timeline.
3. The buffer is encoded to AAC by WebCodecs `AudioEncoder` and muxed by mediabunny.

This also removes the live engine's 45 ms cue rate-limit from the export path, where it exists only to protect the ears during fast playback — the export schedule applies its own musical spacing.

For the MediaRecorder fallback, the same `AudioBuffer` is played through a `MediaStreamAudioDestinationNode` and its track added to the recorded stream.

## 7. Narration in the export

Given §2.2, narration is visual:

- `captions.ts` walks the timeline calling the lesson's `Narrator` (from `docs/learn-mode-plan.md`) — or, when Learn Mode is not involved, a lightweight default narrator derived from the step shape — producing `Caption[] = { text, startMicros, endMicros }`. Adjacent identical texts merge; a minimum on-screen duration (~1.2 s) is enforced so captions don't strobe.
- `paint/chrome.ts` draws the active caption into a band with a scrim, word-wrapped, inside the preset's safe area.
- The same `Caption[]` serialises to `.srt`, offered as a second download for platforms that accept uploaded subtitle files.

This makes Learn Mode and Export share one narration source of truth, which is a strong argument for building Learn Mode first (§9).

## 8. UI

`src/components/export/ExportDialog.vue`, opened from a button in `ControlsPanel`:

1. **Preset** — cards with live aspect preview showing a real rendered frame from the current run, not a mock.
2. **Content** — checkboxes: narration captions, sound cues, stats HUD, code panel (auto-disabled on vertical presets), watermark, title card.
3. **Range & pace** — full run or in/out points seeded from the current scrubber position; target duration with a live "≈ N frames, ≈ M MB" estimate.
4. **Encode** — determinate progress bar (frames done / total), cancel button, then a download card with file size and the optional `.srt`.

The export runs in `worker/exportWorker.ts` with `OffscreenCanvas`, so a 1080p encode never blocks the UI. Progress is posted back per _N_ frames. Cancel aborts the encoder and revokes any partial blob.

## 9. Phasing

| # | Deliverable | Gate |
|---|---|---|
| 0 | **Feasibility spike** — encode a 5 s 1080p test clip with mediabunny in this app's Vite build; verify upload to one real platform | Go/no-go on MP4 before any UI work |
| 1 | `paint/theme.ts`, `paint/chrome.ts`, `paint/sorting.ts` + parity snapshot test | A single PNG frame that looks right |
| 2 | `presets.ts`, `layout.ts`, `timeline.ts`, `captions.ts` — all pure, all unit tested | Timeline invariants green |
| 3 | GIF path end-to-end (`gifenc` + worker) — simplest complete vertical slice, ships value early | Downloadable GIF |
| 4 | MP4 path (`mediabunny`) + capability detection + WebM fallback | Downloadable MP4 |
| 5 | Audio: `scheduleCue` extraction + `OfflineAudioContext` render + AAC mux | MP4 with cues |
| 6 | Caption burn-in + `.srt` sidecar | MP4 with narration |
| 7 | `ExportDialog.vue` + worker orchestration + progress/cancel | Feature complete for sorting |
| 8 | Renderers for pathfinding, graph, search, tree | Feature complete overall |

Phases 1–4 are the risk; 5–8 are largely mechanical. Phase 0 exists so we find out about a WebCodecs or muxing surprise before building a dialog for it.

New dependencies: `mediabunny` (MPL-2.0) and `gifenc` (MIT). Both are small and tree-shakable; nothing else is added.

## 10. Testing

Media encoding is awkward to test in jsdom, so the split is deliberate:

**Unit (vitest, node)** — the whole pure layer:
- `buildTimeline`: frame count is exactly `fps × duration`; timestamps strictly increasing; first frame is step 0 and last frame is the terminal step, for both the hold and the decimate regime; in/out ranges respected; a 1-step run and a 5000-step run both produce valid timelines.
- `captions`: no gaps, no overlaps, minimum duration honoured, SRT output byte-compared against a fixture.
- `layout`: safe areas never overlap the stage; a 9:16 layout never emits negative dimensions.
- `presets`: every preset's `maxBytes` and `safe` are internally consistent.

**Renderer tests** — call each `FrameRenderer` against a recording stub context and assert the *sequence of draw calls*, not pixels. Catches "nothing was drawn", "drew outside the safe area", "colour came from the wrong palette" without introducing image snapshots into CI.

**Parity** — one golden-frame test per renderer: render a fixed step at a fixed size and compare against a committed PNG with a small perceptual tolerance. This is the guard against the DOM and canvas renderers drifting apart. Reviewed by eye when it changes.

**Manual, once per phase** — actual upload to YouTube, Instagram and LinkedIn. There is no substitute; platform ingest rules are undocumented and change.

## 11. Risks

| Risk | Mitigation |
|---|---|
| WebCodecs unavailable (older Safari, Firefox lag) | Detect up front, disable MP4 with a reason, offer GIF (universal) and WebM (warned) |
| Canvas renderer drifts from the live DOM view | Golden-frame test + both renderers read the same palette tokens from `paint/theme.ts` |
| Duplicate renderers become a maintenance tax | Only the *stage* is duplicated; all chrome is shared. If it becomes painful, the exit is to migrate the live view onto the canvas renderer — the abstraction already permits it |
| 1080p × 1800 frames exhausts memory | Stream frames into the encoder, never buffer; hard caps on resolution × duration with a pre-flight estimate |
| GIF exports are enormous | Hard caps, size estimate before encode, `gifenc` palette quantisation tuned per algorithm |
| Users expect a spoken voice-over | Say so plainly in the dialog: browser TTS cannot be recorded, captions are burned in. Cloud TTS is a future opt-in, not a silent omission |
| Scope: exporting all six families at once | Phase 8 is explicitly last; sorting alone is a shippable feature |

## 12. Relationship to Learn Mode

`docs/learn-mode-plan.md` defines the `Narrator` contract that this plan's `captions.ts` consumes. Building Learn Mode first means export gets narration for free and there is exactly one place narration text lives. Building export first means shipping it caption-less, or writing a throwaway narrator. **Recommended order: Learn Mode phases 0–3, then Export phases 0–5, then Export 6 picks up the real narrators.**
