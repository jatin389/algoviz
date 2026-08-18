# Embedding AlgoViz

Any category can be dropped into another page as a live, interactive widget via
an `<iframe>`. The embed renders the same visualizer the full app does — every
playback and editing control works — just without the site header, tab bar and
footer.

```html
<iframe
  src="https://<owner>.github.io/algoviz/#/embed/sorting?algo=quick&seed=42"
  width="100%"
  height="520"
  style="border: 0; border-radius: 12px"
  title="AlgoViz — quicksort"
  loading="lazy"
></iframe>
```

The route is `#/embed/<category>`, and it takes the **same query params the
category already uses** in the main app. There is no separate embed vocabulary:
configure a visualizer in the app until the address bar says what you want, then
put `embed/` in front of the category and paste it into an iframe.

Because the router uses hash history, the URL always contains `#/` and deep links
never 404 — no server configuration is required on either side.

## Shell params

These two work on every embed route, in addition to the category's own params.

| Param | Values | Default | Effect |
|---|---|---|---|
| `brand` | `0` to hide, anything else to show | shown | The "Powered by AlgoViz" corner link. It opens the full app in a new tab, carrying whatever state the reader has arrived at. |
| `theme` | any theme name (`midnight`, `daylight`, `neon`, `pastel`, `mono`, `terminal`, `paper`, `contrast`), or `light` / `dark` | `midnight` | Picks the palette, so a widget can match the page framing it rather than always arriving dark. `light` and `dark` predate named themes and still work, mapping onto Daylight and Midnight. An unrecognised value is ignored and leaves the widget alone rather than resetting it. The override is never persisted, so two embeds on one page can use different themes and neither touches the reader's own preference in the full app. |

## Per-category params

`seed` drives every random dataset and is always present in the URL — the same
seed reproduces the same array, graph or maze on any browser. `speed` is
milliseconds per step.

| Category | Path | Params |
|---|---|---|
| Sorting | `#/embed/sorting` | `algo`, `size`, `speed`, `seed`, `cmp`, `algo2` |
| Searching | `#/embed/searching` | `algo`, `size`, `speed`, `seed`, `target` |
| DP | `#/embed/dp` | `algo`, `in`, `speed`, `seed` |
| Pathfinding | `#/embed/pathfinding` | `algo`, `speed`, `seed`, `start`, `end` |
| Graph | `#/embed/graph` | `algo`, `speed`, `seed`, `start` |
| Union-Find & MST | `#/embed/mst` | `algo`, `n`, `speed`, `seed`, `start`, `ops` |
| Hashing | `#/embed/hashing` | `strategy`, `fn`, `cap`, `thr`, `speed`, `seed`, `ops` |
| Concurrency | `#/embed/concurrency` | `scenario`, `speed`, `seed`, `sched` |
| Sandbox | `#/embed/sandbox` | `src`, `size`, `speed`, `seed` |

Note that **hashing and concurrency do not use `algo`** — hashing selects with
`strategy` plus `fn`, concurrency with `scenario`. The embed route passes params
straight through to the category rather than translating them, so these keep
their own names.

A malformed value is ignored rather than fatal: the widget falls back to that
param's default instead of failing to render.

## Limits worth knowing

- **BST and Heap have no embed route.** They are the only two categories that do
  not mirror their state into the URL, so an embed of them could not be
  configured. `#/embed/bst` redirects to the front door rather than framing a
  widget whose `?seed=` silently does nothing.
- **Hand-painted pathfinding walls do not survive a link.** Only the grid's
  start, end and algorithm round-trip; a maze painted by hand is not in the URL.
  A maze generated with *Randomize* is reproducible, since it derives from
  `seed`.
- **The sandbox runs code from the URL.** `#/embed/sandbox?src=…` carries a
  user-authored snippet in the link itself and executes it on load, inside a
  worker in a `sandbox="allow-scripts"` iframe with no access to the host page.
  The widget shows a banner saying so. Only embed sandbox links whose source you
  trust.
- **Framing is not restricted by origin.** AlgoViz is served from GitHub Pages,
  which cannot set response headers, and `frame-ancestors` is ignored in a
  `<meta>` tag. Any site can embed any AlgoViz page; there is no allow-list.
- **Sizing is the embedder's job.** The embed fills the iframe rather than
  imposing its own max width. Give it about 520px of height to start; DP tables
  and the sandbox editor want more. Below 1024px the two-column layout stacks,
  and the embed puts the visualization *above* the controls when it does — so a
  narrow frame still opens on the algorithm rather than a panel of sliders.
