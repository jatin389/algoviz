// backlog/lib/sections.mjs
//
// Pure text -> structure parsers for two recurring lab-section shapes:
// blank-line-separated "bold lead + consequence" constraint paragraphs, and
// GitHub-flavoured markdown tables. No HTML, no I/O, no dependencies.
//
// Both parsers are deliberately conservative: only 2 of 45 labs exist today,
// so everything written later may use slightly different prose. A shape that
// doesn't clearly match returns `null` rather than a half-parsed guess, so
// the caller can fall back to the generic markdown renderer. Never throws.

// ---------------------------------------------------------------------------
// parseConstraints
// ---------------------------------------------------------------------------

/**
 * Parse a lab's `## Constraints` section text into structured paragraphs.
 *
 * The shape (seen in 0012 and 0015, 5/5 paragraphs each): blank-line
 * separated paragraphs, each starting with a bold lead (`**...**` — the
 * closing period sometimes lands inside the `**`, sometimes outside, and the
 * lead often contains inline `` `code` ``), followed by prose, ending with a
 * `Consequence: ...` clause. Paragraphs are hard-wrapped across lines in the
 * source, so lines are joined and whitespace collapsed before matching.
 *
 * Returns `[{ lead, body, consequence }]` — `lead` without its `**`
 * markers, `body` the text between lead and the `Consequence:` marker,
 * `consequence` the text after it (marker stripped). Any inline markdown
 * *inside* those strings is left untouched for the caller to render.
 *
 * Returns `null` if there are no paragraphs, or if even one paragraph
 * doesn't match the shape — a partial match is exactly the case where
 * falling back to the generic renderer is safer than guessing.
 */
export function parseConstraints(text) {
  if (typeof text !== 'string') return null;
  const normalized = text.replace(/\r\n/g, '\n').trim();
  if (!normalized) return null;

  const paragraphs = normalized
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return null;

  const CONSEQUENCE_MARKER = 'Consequence:';
  const results = [];

  for (const para of paragraphs) {
    // Hard-wrapped across multiple lines — join before parsing, collapsing
    // the wrap newlines (and any incidental double-spacing) to single spaces.
    const joined = para
      .split('\n')
      .map((l) => l.trim())
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Bold lead: first "**...**" run, non-greedy so a later "**" elsewhere
    // in the paragraph can't swallow it. Whatever follows the lead (up to
    // the Consequence marker) is the body.
    const leadMatch = joined.match(/^\*\*(.+?)\*\*\s*(.*)$/);
    if (!leadMatch) return null;

    const lead = leadMatch[1].trim();
    const rest = leadMatch[2];
    if (!lead) return null;

    const markerIdx = rest.indexOf(CONSEQUENCE_MARKER);
    if (markerIdx === -1) return null;

    const body = rest.slice(0, markerIdx).trim();
    const consequence = rest.slice(markerIdx + CONSEQUENCE_MARKER.length).trim();
    if (!consequence) return null;

    results.push({ lead, body, consequence });
  }

  return results;
}

// ---------------------------------------------------------------------------
// parseTable
// ---------------------------------------------------------------------------
//
// isTableRow / isTableSeparatorRow / splitTableCells below are reimplemented
// to match backlog/lib/components.mjs's versions of the same names, cell
// for cell, on ordinary input. They can't be imported from there: this
// module is imported *by* components.mjs's neighbours for section parsing,
// and components.mjs would need to import back from here to reuse them,
// which risks a cycle. Keep these two files' row/cell logic in sync by hand
// if either changes.
//
// One deliberate, documented divergence: splitTableCells here also
// unescapes a trivial `\|` (backslash-pipe) inside a cell into a literal
// `|`, so an escaped pipe doesn't fracture a cell. components.mjs's version
// has no such handling. The two only disagree when a cell contains `\|`,
// which is not the common case; on every other input (including all real
// lab tables today) both produce identical output.

function isTableRow(line) {
  return /^\s*\|.*\|\s*$/.test(line);
}

function isTableSeparatorRow(line) {
  return /^\s*\|[\s:|-]+\|\s*$/.test(line) && /-/.test(line);
}

const ESCAPED_PIPE_PLACEHOLDER = '\u0000';

function splitTableCells(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .replace(/\\\|/g, ESCAPED_PIPE_PLACEHOLDER)
    .split('|')
    .map((cell) => cell.trim().split(ESCAPED_PIPE_PLACEHOLDER).join('|'));
}

/**
 * Parse a section's raw text for a GitHub-flavoured markdown table (`##
 * Phases` and `## Risks` both have one). Any leading prose before the table
 * is skipped; parsing starts at the first table-shaped line.
 *
 * Returns `{ headers: string[], rows: string[][] }` with the `|---|---|`
 * separator row dropped. Ragged body rows are padded with `''` up to the
 * header width rather than rejected outright — a single short row shouldn't
 * sink an otherwise-good table — and rows *longer* than the header are kept
 * as-is (extra data surfaced beats data silently dropped).
 *
 * Returns `null` when there's no confident table: no table-shaped lines at
 * all, or a run of pipe-lines with no real `|---|---|` separator (which
 * would just be prose that happens to contain pipes, not a GFM table).
 */
export function parseTable(text) {
  if (typeof text !== 'string') return null;
  const normalized = text.replace(/\r\n/g, '\n');
  if (!normalized.trim()) return null;

  const lines = normalized.split('\n');

  const start = lines.findIndex((line) => isTableRow(line));
  if (start === -1) return null;

  const tableLines = [];
  for (let i = start; i < lines.length; i++) {
    if (!isTableRow(lines[i])) break;
    tableLines.push(lines[i]);
  }

  // Require a real separator row to be confident this is a GFM table, not
  // just prose lines that happen to start/end with "|".
  if (!tableLines.some(isTableSeparatorRow)) return null;

  const rows = tableLines.filter((line) => !isTableSeparatorRow(line)).map(splitTableCells);
  if (rows.length === 0) return null;

  const [headers, ...bodyRows] = rows;
  if (headers.length === 0) return null;

  const width = headers.length;
  const normalizedRows = bodyRows.map((row) =>
    row.length < width ? [...row, ...Array(width - row.length).fill('')] : row,
  );

  return { headers, rows: normalizedRows };
}

// ---------------------------------------------------------------------------
// parseFlows
// ---------------------------------------------------------------------------
//
// Splits a flow cell into nodes on the two connector glyphs (or their ASCII
// fallbacks). The `X`-for-cut fallback requires whitespace on both sides —
// checked via the regex itself rather than a separate word-boundary pass —
// so a bare `X` inside a word (`MediaStreamTrack`, `Xerox`) can never be
// mistaken for a connector; only a standalone `X` token splits.
const FLOW_CONNECTOR_RE = /(→|╳|->|\sX\s)/;

function parseFlowCell(cell) {
  const trimmed = cell.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(FLOW_CONNECTOR_RE);
  const nodes = [];
  const connectors = [];

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      const nodeText = parts[i].trim();
      if (!nodeText) return null; // e.g. "A → → B" — an empty hop, not a real cell

      // A node wholly wrapped in "**...**" is the emphasised one; strip the
      // markers but leave any other inline markdown (backticks) for
      // renderInline to handle later.
      const boldMatch = nodeText.match(/^\*\*(.+)\*\*$/);
      nodes.push(
        boldMatch ? { text: boldMatch[1].trim(), emphasis: true } : { text: nodeText, emphasis: false },
      );
    } else {
      // Captured token is either a bare glyph/ASCII arrow or "\sX\s" with its
      // surrounding whitespace still attached — trim before comparing.
      const token = parts[i].trim();
      connectors.push(token === '╳' || token === 'X' ? 'cut' : 'arrow');
    }
  }

  return { nodes, connectors };
}

/**
 * Parse a lab's `## Flows` section text into a side-by-side mechanism
 * diagram: a table whose first column is a row label and whose other two
 * columns are each a chain of nodes joined by arrows (`→`/`->`) or a cut
 * marker (`╳`/a whitespace-bounded `X`) where the change breaks a hop.
 *
 * Reuses `parseTable` for the table shape itself — this function only adds
 * the flow-cell grammar on top. Returns `null` for anything parseTable
 * can't confidently read, any header count other than 3, any row whose
 * label or either flow cell is empty, or any row that doesn't have exactly
 * the 3 columns the shape requires (parseTable pads short rows but keeps
 * ragged-long ones, so that's checked here).
 */
export function parseFlows(text) {
  const table = parseTable(text);
  if (!table) return null;

  const { headers, rows } = table;
  if (headers.length !== 3) return null;

  const parsedRows = [];
  for (const row of rows) {
    if (row.length !== 3) return null;
    const [rawLabel, rawFlowA, rawFlowB] = row;

    const label = rawLabel.trim();
    if (!label) return null;
    if (!rawFlowA.trim() || !rawFlowB.trim()) return null;

    const flowA = parseFlowCell(rawFlowA);
    const flowB = parseFlowCell(rawFlowB);
    if (!flowA || !flowB) return null;

    parsedRows.push({ label, flows: [flowA, flowB] });
  }

  return { headers, rows: parsedRows };
}

// --- self-test ---
if (import.meta.url === `file://${process.argv[1]}`) {
  const { readFileSync } = await import('node:fs');
  const path = await import('node:path');

  // Minimal local stand-in for parse.mjs's extractSection, kept independent
  // on purpose — this module has no dependencies, including in its tests.
  function extractSection(body, heading) {
    const lines = body.split(/\r?\n/);
    const startIdx = lines.findIndex((line) => line.trim() === `## ${heading}`);
    if (startIdx === -1) return '';
    const rest = lines.slice(startIdx + 1);
    const endIdx = rest.findIndex((line) => /^##\s/.test(line));
    const sectionLines = endIdx === -1 ? rest : rest.slice(0, endIdx);
    return sectionLines.join('\n').trim();
  }

  const labsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'labs');
  const failures = [];
  let passCount = 0;

  function check(label, cond) {
    if (cond) {
      passCount++;
    } else {
      failures.push(label);
    }
  }

  const cases = [
    { file: '0012-guided-learn-mode.md', constraintCount: 5, phaseRows: 8 },
    { file: '0015-export-a-run.md', constraintCount: 5, phaseRows: 9 },
  ];

  for (const { file, constraintCount, phaseRows } of cases) {
    const raw = readFileSync(path.join(labsDir, file), 'utf8');
    const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');

    const constraintsText = extractSection(body, 'Constraints');
    const constraints = parseConstraints(constraintsText);
    check(`${file}: parseConstraints returns an array`, Array.isArray(constraints));
    if (Array.isArray(constraints)) {
      check(`${file}: parseConstraints returns ${constraintCount} entries (got ${constraints.length})`, constraints.length === constraintCount);
      check(
        `${file}: every constraint has non-empty lead + consequence`,
        constraints.every((c) => c.lead && c.lead.trim() && c.consequence && c.consequence.trim()),
      );
    }

    const phasesText = extractSection(body, 'Phases');
    const phases = parseTable(phasesText);
    check(`${file}: parseTable(Phases) returns a table`, phases !== null);
    if (phases) {
      check(`${file}: parseTable(Phases) has ${phaseRows} body rows (got ${phases.rows.length})`, phases.rows.length === phaseRows);
    }

    const risksText = extractSection(body, 'Risks');
    const risks = parseTable(risksText);
    check(`${file}: parseTable(Risks) returns a table`, risks !== null);
  }

  // Junk input: plain prose, no bold leads, no table.
  const junk = `Just some plain prose about the feature.\n\nNo bold leads here, and definitely no pipe tables.\nJust two sentences across two lines.`;
  check('parseConstraints(junk) is null', parseConstraints(junk) === null);
  check('parseTable(junk) is null', parseTable(junk) === null);

  // Edge cases: empty / non-string input.
  check('parseConstraints("") is null', parseConstraints('') === null);
  check('parseTable("") is null', parseTable('') === null);
  check('parseConstraints(null) is null', parseConstraints(null) === null);
  check('parseTable(undefined) is null', parseTable(undefined) === null);

  // --- parseFlows: fixtures are inline strings — no lab has a ## Flows
  // section yet (see 0045's Refinement).

  const wellFormedFlows = [
    '| Path | Today | With this change |',
    '|---|---|---|',
    '| Render | `BarChart` (DOM) → CSS transitions → **screen** | seeded generator → offscreen canvas → **encoder** → `.mp4` |',
    '| Narration | `speechSynthesis.speak()` ╳ `MediaStreamTrack` | burned-in captions + `.srt` |',
  ].join('\n');

  const flows = parseFlows(wellFormedFlows);
  check('parseFlows(well-formed) is non-null', flows !== null);
  if (flows) {
    check('parseFlows: 2 rows', flows.rows.length === 2);

    const renderRow = flows.rows[0];
    check('parseFlows: row 0 label is "Render"', renderRow.label === 'Render');
    check('parseFlows: row 0 flow A has 3 nodes / 2 arrow connectors', renderRow.flows[0].nodes.length === 3 && renderRow.flows[0].connectors.every((c) => c === 'arrow'));
    check('parseFlows: row 0 flow B has 4 nodes / 3 arrow connectors', renderRow.flows[1].nodes.length === 4 && renderRow.flows[1].connectors.every((c) => c === 'arrow'));

    // Emphasis stripped, backticks survive untouched.
    const screenNode = renderRow.flows[0].nodes[2];
    check('parseFlows: "**screen**" node is emphasised with markers stripped', screenNode.emphasis === true && screenNode.text === 'screen');
    const barChartNode = renderRow.flows[0].nodes[0];
    check('parseFlows: backticked node keeps its backticks', barChartNode.emphasis === false && barChartNode.text === '`BarChart` (DOM)');

    const narrationRow = flows.rows[1];
    check('parseFlows: row 1 label is "Narration"', narrationRow.label === 'Narration');
    check('parseFlows: "╳" produces a single "cut" connector', narrationRow.flows[0].connectors.length === 1 && narrationRow.flows[0].connectors[0] === 'cut');
    check('parseFlows: row 1 flow B is a single node, zero connectors', narrationRow.flows[1].nodes.length === 1 && narrationRow.flows[1].connectors.length === 0);
  }

  // ASCII fallbacks: "->" for arrow, whitespace-bounded "X" for cut — but a
  // bare X glued to a word must not split.
  const asciiFlows = [
    '| Step | A | B |',
    '|---|---|---|',
    '| One | start -> middle -> end | left X right |',
    '| Two | MediaStreamTrack works fine | OSXProcess stays one node |',
  ].join('\n');
  const asciiParsed = parseFlows(asciiFlows);
  check('parseFlows: ASCII "->" fallback parses as non-null', asciiParsed !== null);
  if (asciiParsed) {
    check('parseFlows: "->" fallback yields 3 nodes, all arrows', asciiParsed.rows[0].flows[0].nodes.length === 3 && asciiParsed.rows[0].flows[0].connectors.every((c) => c === 'arrow'));
    check('parseFlows: whitespace-bounded "X" fallback yields a cut', asciiParsed.rows[0].flows[1].nodes.length === 2 && asciiParsed.rows[0].flows[1].connectors[0] === 'cut');
    check('parseFlows: bare X glued to a word does not split ("MediaStreamTrack")', asciiParsed.rows[1].flows[0].nodes.length === 1);
    check('parseFlows: bare X glued to a word does not split ("OSXProcess")', asciiParsed.rows[1].flows[1].nodes.length === 1);
  }

  // Wrong column counts must fall back to null.
  const twoColumnFlows = ['| A | B |', '|---|---|', '| x | y |'].join('\n');
  check('parseFlows(2-column table) is null', parseFlows(twoColumnFlows) === null);

  const fourColumnFlows = ['| A | B | C | D |', '|---|---|---|---|', '| w | x | y | z |'].join('\n');
  check('parseFlows(4-column table) is null', parseFlows(fourColumnFlows) === null);

  // Plain prose, no table at all.
  check('parseFlows(junk) is null', parseFlows(junk) === null);

  // Empty / non-string input must not throw.
  check('parseFlows("") is null', parseFlows('') === null);
  check('parseFlows(null) is null', parseFlows(null) === null);
  check('parseFlows(undefined) is null', parseFlows(undefined) === null);

  // Empty label or empty flow cell invalidates the whole table.
  const emptyLabelFlows = ['| Path | A | B |', '|---|---|---|', '|  | one → two | three → four |'].join('\n');
  check('parseFlows(empty label) is null', parseFlows(emptyLabelFlows) === null);

  const emptyCellFlows = ['| Path | A | B |', '|---|---|---|', '| Render |  | three → four |'].join('\n');
  check('parseFlows(empty flow cell) is null', parseFlows(emptyCellFlows) === null);

  console.log(`sections.mjs self-test: ${passCount} passed, ${failures.length} failed`);
  if (failures.length) {
    for (const f of failures) console.log(`  FAIL: ${f}`);
    process.exitCode = 1;
  }
}
