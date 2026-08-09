// backlog/lib/theme.mjs
//
// The single CSS token block + shared component styles consumed by BOTH
// board.html and every lab/NNNN.html page, so a lab page can never visually
// drift from the board. Page-specific chrome (toolbar, card list layout,
// lab header layout, etc.) lives in render-board.mjs / render-lab.mjs.

export const THEME_CSS = `
  :root {
    --bg: #f6f7f9;
    --surface: #ffffff;
    --surface-alt: #eef0f3;
    --border: #d9dce1;
    --text: #1b1f24;
    --text-muted: #5b636e;
    --accent: #2f6fed;
    --p0: #c62828;
    --p1: #e0812a;
    --p2: #2f6fed;
    --p3: #5b636e;
    --ready: #1f8a57;
    --inbox: #7a6ff0;
    --progress: #d8973c;
    --done: #6b7280;
    --shadow: 0 1px 2px rgba(16, 20, 24, 0.06), 0 1px 1px rgba(16, 20, 24, 0.04);

    --zone-a: #2f6fed;
    --zone-b: #7a6ff0;
    --zone-c: #1f8a57;
    --zone-d: #b8590f;

    --lab-unresearched: #b3261e;
    --lab-researching: #d8973c;
    --lab-planned: #1f8a57;

    --leverage: #1f8a57;
    --blocked: #b3261e;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.45;
  }

  a { color: var(--accent); }
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }

  /* Pills (status, lab status) */
  .pill {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    color: #fff;
    white-space: nowrap;
    display: inline-block;
  }

  .pill.status-ready { background: var(--ready); }
  .pill.status-inbox { background: var(--inbox); }
  .pill.status-in-progress { background: var(--progress); }
  .pill.status-done { background: var(--done); }
  .pill.status-dropped { background: var(--text-muted); }
  .pill.status-unknown { background: var(--text-muted); }

  .pill.lab-status-unresearched { background: var(--lab-unresearched); }
  .pill.lab-status-researching { background: var(--lab-researching); }
  .pill.lab-status-planned { background: var(--lab-planned); }

  /* Badges (priority, effort) */
  .badge {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.15rem 0.5rem;
    border-radius: 6px;
    border: 1px solid var(--border);
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .badge.priority-P0 { color: var(--p0); border-color: var(--p0); }
  .badge.priority-P1 { color: var(--p1); border-color: var(--p1); }
  .badge.priority-P2 { color: var(--p2); border-color: var(--p2); }
  .badge.priority-P3 { color: var(--p3); border-color: var(--p3); }

  .badge.effort-S,
  .badge.effort-M,
  .badge.effort-L {
    color: var(--text);
  }

  .effort-bars {
    display: inline-flex;
    align-items: flex-end;
    gap: 1px;
    height: 0.6rem;
  }

  .effort-bar {
    width: 3px;
    background: var(--border);
    border-radius: 1px;
  }

  .effort-bar:nth-child(1) { height: 0.3rem; }
  .effort-bar:nth-child(2) { height: 0.45rem; }
  .effort-bar:nth-child(3) { height: 0.6rem; }

  .effort-bar.filled { background: var(--accent); }

  /* Chips: zone, leverage, blocked */
  .chip {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.15rem 0.55rem;
    border-radius: 6px;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border: 1px solid var(--border);
  }

  .zone-chip { color: #fff; border: none; }
  .zone-chip.zone-A { background: var(--zone-a); }
  .zone-chip.zone-B { background: var(--zone-b); }
  .zone-chip.zone-C { background: var(--zone-c); }
  .zone-chip.zone-D { background: var(--zone-d); }

  .leverage-marker { color: var(--leverage); border-color: var(--leverage); background: rgba(31, 138, 87, 0.08); }
  .blocked-marker { color: var(--blocked); border-color: var(--blocked); background: rgba(179, 38, 30, 0.08); }

  /* Meter (lab completeness, n/6) */
  .meter {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .meter-track {
    display: inline-block;
    width: 5rem;
    height: 0.45rem;
    background: var(--surface-alt);
    border: 1px solid var(--border);
    border-radius: 999px;
    overflow: hidden;
  }

  .meter-fill {
    display: block;
    height: 100%;
    background: var(--accent);
  }

  .meter-label {
    font-weight: 700;
    color: var(--text);
    font-variant-numeric: tabular-nums;
  }

  /* Stat cards */
  .stat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: var(--surface-alt);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.5rem 0.9rem;
    min-width: 5.5rem;
  }

  .stat-count {
    font-size: 1.3rem;
    font-weight: 700;
  }

  .stat-label {
    font-size: 0.78rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  /* Markdown-subset rendering used on lab pages */
  .md-body h3, .md-body h4, .md-body h5, .md-body h6 {
    margin: 1rem 0 0.4rem;
    color: var(--text);
  }

  .md-body p {
    margin: 0 0 0.75rem;
  }

  .md-body ul, .md-body ol {
    margin: 0 0 0.75rem;
    padding-left: 1.4rem;
  }

  .md-body li { margin: 0.2rem 0; }

  .md-code {
    background: var(--surface-alt);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.7rem 0.85rem;
    overflow-x: auto;
    font-size: 0.85rem;
    margin: 0 0 0.9rem;
  }

  .table-scroll {
    overflow-x: auto;
    margin: 0 0 0.9rem;
  }

  table.md-table {
    border-collapse: collapse;
    width: 100%;
    min-width: 28rem;
    font-size: 0.85rem;
  }

  table.md-table th, table.md-table td {
    text-align: left;
    padding: 0.4rem 0.65rem;
    border: 1px solid var(--border);
    vertical-align: top;
  }

  table.md-table th {
    background: var(--surface-alt);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: var(--text-muted);
  }

  /* Section text blocks (task Idea / Refinement, unresearched gap text) */
  .section-text {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
    font-size: 0.9rem;
    margin: 0;
    background: var(--surface-alt);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.65rem 0.8rem;
  }

  .empty-state, .muted {
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .meter-fill { transition: none; }
  }
`;
