// backlog/lib/render-lab.mjs
//
// Renders one backlog/lab/NNNN.html detail page — the full HTML document —
// for a single merged+derived item produced by lib/derive.mjs's buildIndex().

import { THEME_CSS } from './theme.mjs';
import {
  escapeHtml,
  statusPill,
  priorityBadge,
  effortBadge,
  zoneChip,
  labStatusPill,
  meter,
  labToBoardLink,
  labToLabLink,
  renderMarkdownSubset,
} from './components.mjs';

const LAB_CSS = `
  header.lab-header {
    padding: 1.25rem 1.75rem 1.4rem;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }

  .back-link {
    display: inline-block;
    font-size: 0.82rem;
    margin-bottom: 0.7rem;
  }

  .lab-title-row {
    display: flex;
    align-items: baseline;
    gap: 0.7rem;
    flex-wrap: wrap;
  }

  .lab-title-row .card-id {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .lab-title-row h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .lab-meta-badges {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .completeness-row {
    margin-top: 0.85rem;
  }

  main {
    padding: 0 1.75rem 3rem;
    max-width: 62rem;
  }

  .gap-banner {
    margin-top: 1.5rem;
    padding: 1rem 1.2rem;
    background: rgba(179, 38, 30, 0.06);
    border: 1px solid var(--lab-unresearched);
    border-radius: 10px;
    color: var(--text);
  }

  .gap-banner strong { color: var(--lab-unresearched); }

  .lab-section {
    margin-top: 2rem;
  }

  .lab-section h2 {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--text-muted);
    margin: 0 0 0.6rem;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid var(--border);
  }

  .md-body {
    font-size: 0.94rem;
  }

  .relationship-columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 1.25rem;
  }

  .relationship-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .relationship-list li {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 0.5rem 0.7rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
  }

  .relationship-list .rel-id {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .open-question-text {
    margin: 0 0 0.7rem;
    font-size: 0.94rem;
  }

  .clause-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .clause-list li {
    padding: 0.5rem 0.7rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 0.9rem;
  }

  .clause-list li.closed {
    border-color: var(--lab-planned);
    background: rgba(31, 138, 87, 0.06);
  }

  .clause-list del { color: var(--text-muted); }

  .closed-note {
    display: inline-block;
    margin-left: 0.4rem;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--lab-planned);
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  footer {
    padding: 1rem 1.75rem 2rem;
    color: var(--text-muted);
    font-size: 0.78rem;
  }
`;

const LAB_SECTIONS = [
  ['verdict', 'Verdict'],
  ['constraints', 'Constraints'],
  ['architecture', 'Architecture'],
  ['phases', 'Phases'],
  ['risks', 'Risks'],
  ['outOfScope', 'Out of scope'],
];

function renderLabSection(item, key, title) {
  const text = item.lab?.[key];
  if (!text || !text.trim()) return '';
  return `
  <section class="lab-section">
    <h2>${escapeHtml(title)}</h2>
    <div class="md-body">${renderMarkdownSubset(text)}</div>
  </section>`;
}

function relationshipItem(id, itemsById) {
  const target = itemsById.get(id);
  if (!target) {
    return `<li><span class="rel-id">${escapeHtml(id)}</span> <span class="muted">(not found)</span></li>`;
  }
  return `<li><span class="rel-id">${escapeHtml(target.id)}</span> ${labToLabLink(target.id, target.title)} ${labStatusPill(target.labStatus)}</li>`;
}

function renderRelationships(item, itemsById) {
  const dependsOnHtml = item.dependsOn.length
    ? `<ul class="relationship-list">${item.dependsOn.map((id) => relationshipItem(id, itemsById)).join('')}</ul>`
    : '<p class="muted">This item has no recorded dependencies.</p>';
  const unblocksHtml = item.unblocks.length
    ? `<ul class="relationship-list">${item.unblocks.map((id) => relationshipItem(id, itemsById)).join('')}</ul>`
    : '<p class="muted">No other item currently depends on this one.</p>';

  return `
  <section class="lab-section">
    <h2>Relationships</h2>
    <div class="relationship-columns">
      <div>
        <h3>Depends on</h3>
        ${dependsOnHtml}
      </div>
      <div>
        <h3>Unblocks</h3>
        ${unblocksHtml}
      </div>
    </div>
  </section>`;
}

// --- Open questions: split the task's freeform Open-questions line into
// clauses, and strike through any clause a lab's `closes` field answered. ---

function normalizeForMatch(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function clauseMatchesClose(clause, closePhrase) {
  const a = normalizeForMatch(clause);
  const b = normalizeForMatch(closePhrase);
  if (!a || !b) return false;
  if (a.includes(b) || b.includes(a)) return true;
  const aWords = new Set(a.split(' '));
  const bWords = new Set(b.split(' '));
  let common = 0;
  for (const w of bWords) if (aWords.has(w)) common++;
  const smaller = Math.min(aWords.size, bWords.size) || 1;
  return common / smaller >= 0.5;
}

function splitClauses(text) {
  if (!text) return [];
  return text
    .split(/,\s*(?:and\s+)?|\s+and\s+/i)
    .map((s) => s.trim())
    .filter(Boolean);
}

function renderOpenQuestions(item) {
  const oq = item.openQuestions;
  const closes = item.lab?.closes ?? [];

  if (!oq) {
    return `
  <section class="lab-section">
    <h2>Open questions</h2>
    <p class="muted">No open questions recorded on the task.</p>
  </section>`;
  }

  const clauses = splitClauses(oq);
  const listHtml = clauses.length
    ? `<ul class="clause-list">${clauses
        .map((clause) => {
          const closedBy = closes.find((c) => clauseMatchesClose(clause, c));
          if (closedBy) {
            return `<li class="closed"><del>${escapeHtml(clause)}</del><span class="closed-note">closed by lab</span></li>`;
          }
          return `<li>${escapeHtml(clause)}</li>`;
        })
        .join('')}</ul>`
    : `<p class="open-question-text">${escapeHtml(oq)}</p>`;

  return `
  <section class="lab-section">
    <h2>Open questions</h2>
    ${listHtml}
  </section>`;
}

function renderResearchedBody(item) {
  return LAB_SECTIONS.map(([key, title]) => renderLabSection(item, key, title)).join('\n');
}

function renderGapView(item) {
  const goalHtml = item.goal
    ? `<p>${escapeHtml(item.goal)}</p>`
    : '<p class="muted">No goal statement recorded on the task.</p>';

  return `
  <div class="gap-banner">
    <strong>No lab exists yet for this item.</strong> This page shows the research gap: what's
    known so far, what's still open, and what it's coupled to. It is not a placeholder for
    content that hasn't been written — the emptiness itself is the information.
  </div>
  <section class="lab-section">
    <h2>Goal</h2>
    ${goalHtml}
  </section>
  ${renderOpenQuestions(item)}`;
}

export function renderLabPage(item, itemsById, generatedAt) {
  const isResearched = item.labStatus !== 'unresearched';

  const bodyHtml = isResearched
    ? `${renderResearchedBody(item)}
  ${renderRelationships(item, itemsById)}
  ${renderOpenQuestions(item)}`
    : `${renderGapView(item)}
  ${renderRelationships(item, itemsById)}`;

  const html = `<!DOCTYPE html>
<!-- Generated by backlog/generate-board.mjs (backlog/lib/render-lab.mjs) — do not hand-edit.
     Edit backlog/${escapeHtml(item.file)} and/or backlog/labs/${escapeHtml(item.lab?.file ?? `${item.id}-*.md`)},
     then re-run \`npm run backlog:board\`. -->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="generated-at" content="${escapeHtml(generatedAt)}">
<title>${escapeHtml(item.id)} &middot; ${escapeHtml(item.title)} — Lab</title>
<style>
${THEME_CSS}
${LAB_CSS}
</style>
</head>
<body>

<header class="lab-header">
  ${labToBoardLink()}
  <div class="lab-title-row">
    <span class="card-id">${escapeHtml(item.id)}</span>
    <h1>${escapeHtml(item.title)}</h1>
  </div>
  <div class="lab-meta-badges">
    ${zoneChip(item.zone)}
    ${statusPill(item.status)}
    ${priorityBadge(item.priority)}
    ${effortBadge(item.effort)}
    ${labStatusPill(item.labStatus)}
  </div>
  <div class="completeness-row">
    ${meter(item.completeness, 6, `Lab completeness: ${item.completeness} of 6 sections`)}
    <span class="muted"> lab sections complete</span>
  </div>
</header>

<main>
  ${bodyHtml}
</main>

<footer>
  Source: <code>backlog/${escapeHtml(item.file)}</code>${
    item.lab ? ` &amp; <code>backlog/labs/${escapeHtml(item.lab.file)}</code>` : ''
  } &middot; Regenerate with <code>npm run backlog:board</code> &middot; ${labToBoardLink('Back to board')}
</footer>

</body>
</html>
`;

  return html;
}
