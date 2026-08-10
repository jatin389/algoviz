# Backlog

Run `npm run backlog:board` to regenerate `backlog/board.html`, an interactive, filterable view of this backlog (status, priority, effort, and free-text search) that you can open directly in a browser. It's generated from these markdown files and committed to the repo, so browsing doesn't depend on reading raw markdown or on any ephemeral external tool.

Zone legend (see the skill's "Zones (optional)" section for the full definition):
- **A — Extend the map**: deepens or completes something the product already does.
- **B — Off the map**: a creative departure from the standard playbook for this kind of product.
- **C — New territories**: an entirely new domain/subject area beyond the product's current scope.
- **D — Instruments**: platform/infrastructure work that multiplies the value of other features.

## Inbox
Captured but not yet scoped. Refine these before starting them.

| ID | Title | Description |
|----|-------|--------------|
| 0044 | Check and implement loop engineering | |

## Ready
Scoped and prioritized. Pull from here when starting new work. Sort by priority; within a priority, row order is queue order.

Captured in bulk on 2026-08-09 from the AlgoViz Expansion Atlas research/brainstorm session. Priorities were proposed by Claude per explicit request, using the effort/payoff signals from that research — not yet individually confirmed acceptance criteria. Re-triage any item before actually starting it.

| ID | Priority | Effort | Zone | Title | Description |
|----|----------|--------|------|-------|--------------|
| 0038 | P0 | L | D | Bring-your-own-algorithm sandbox | editor + worker runs a user-authored generator against the existing snapshot contract — biggest multiplier researched |
| 0039 | P0 | S | D | Embeddable widgets | iframe-able `/embed/...` routes reusing existing URL state; pairs with the sandbox |
| 0030 | P0 | L | C | New domain: Concurrency & interleavings | race conditions + an interleaving explorer scrubbing to the schedule that broke an invariant — strongest idea researched |
| 0001 | P0 | S | A | Landing page | front door instead of a redirect straight into Sorting |
| 0010 | P1 | M | A | Fill the existing gaps | tag remaining sorts, add pathfinding/search/graph algorithms already scoped in the app |
| 0011 | P1 | S | A | Complexity cheat-sheet page | one sortable table of every algorithm's complexity/stability |
| 0017 | P1 | S | A | Dataset presets | nearly-sorted, reverse-sorted, few-unique, real-world-ish array presets |
| 0019 | P1 | M | B | Skins | same generator renders as book spines / cars / cards / people — zero algorithm changes |
| 0024 | P1 | S | B | Time-travel diff | diff any two recorded steps from the existing scrub history |
| 0025 | P1 | S | B | Seed-of-the-day | date-derived seed so everyone gets today's same dataset |
| 0031 | P1 | L | C | New domain: Database internals | B+tree, join races, WAL, isolation anomalies as steppable transactions |
| 0035 | P1 | S | C | New domain: Number & text representation | IEEE-754, two's complement, endianness, UTF-8 — cheapest domain, high reach |
| 0036 | P1 | M | C | New domain: Memory hierarchy | cache lines, false sharing, row-major vs column-major — best "aha" moment |
| 0040 | P1 | M | D | Empirical complexity lab | measure real runtimes across n, plot against the theoretical curve |
| 0041 | P1 | M | D | Challenge layer | LearnGitBranching-style levels with verified, seed-graded goal states |
| 0042 | P1 | S | D | Step narration | live text log of each step — accessibility + copyable trace |
| 0002 | P2 | M | A | New category: Dynamic Programming | Knapsack/LCS/Edit Distance/Coin Change with animated table fills |
| 0006 | P2 | M | A | New category: Union-Find + Kruskal's MST | reuses the existing graph model |
| 0008 | P2 | M | A | New category: Hash Table | chaining vs open addressing, live load factor |
| 0012 | P2 | M | A | Guided "Learn" mode | scripted, auto-paused walkthrough for first-time visitors |
| 0013 | P2 | S | A | Predict-the-step quiz | guess the next comparison/swap before it's revealed |
| 0014 | P2 | M | A | Compare mode, extended | race two algorithms beyond sorting (e.g. pathfinding) |
| 0015 | P2 | M | A | Export a run | GIF/WebM/image export via canvas capture |
| 0020 | P2 | M | B | Guess-the-algorithm mode | hide the label, guess the algorithm from bar movement |
| 0021 | P2 | M | B | Break it on purpose | inject a bug into a known algorithm and diagnose the failure |
| 0022 | P2 | M | B | Adversarial input / complexity cliff | construct worst-case input, watch ops diverge from theory |
| 0023 | P2 | M | B | Sonification as the main event | per-algorithm audio signature, exportable as a clip |
| 0026 | P2 | S | B | Algorithm personalities | one-line character + reactive quips per algorithm |
| 0029 | P2 | L | C | New domain: Operating systems | CPU scheduling Gantt chart, page replacement, Banker's algorithm |
| 0032 | P2 | L | C | New domain: Networking | TCP handshake, congestion control, DNS, TLS, HTTP lifecycle |
| 0033 | P2 | L | C | New domain: Distributed systems | Raft, consistent hashing, vector clocks, rate limiters |
| 0043 | P2 | M | D | Plugin contract & i18n | document "add a visualizer" as a 3-file PR; translate the UI |
| 0003 | P3 | M | A | New category: Recursion & Backtracking | N-Queens, Sudoku, live call tree |
| 0004 | P3 | S | A | New category: String Matching | naive/KMP/Rabin-Karp pattern sliding |
| 0005 | P3 | S | A | New category: Linked List / Stack / Queue | cheapest beginner on-ramp category |
| 0007 | P3 | S | A | New category: Trie | insert/search/prefix-match as a growing tree |
| 0009 | P3 | M | A | New category: AVL / Red-Black Tree | rotations on top of the existing BST driver |
| 0016 | P3 | S | A | Personal notes / journal | persisted per-algorithm scratchpad |
| 0018 | P3 | S | A | PWA / offline | installable, works offline |
| 0027 | P3 | M | B | Solve it yourself, then get graded | manually trace a path, get scored against BFS/A* |
| 0028 | P3 | S | B | Presenter mode + QR handoff | big-screen layout + QR code of current URL state |
| 0034 | P3 | L | C | New domain: Compilers & regex engines | toy language eval + regex NFA/DFA with backtracking blowups |
| 0037 | P3 | M | C | New domain: Also viable (grab-bag) | compression, error correction, crypto, git's object model |

## In Progress

| ID | Priority | Title | Description |
|----|----------|-------|--------------|
