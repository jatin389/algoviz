## Agent & code guidelines

### Delegate to subagents by task complexity
Prefer delegating research and implementation work to subagents rather than
handling everything inline. Match the subagent's model to the task's
complexity:
- **Haiku** — simple, well-scoped work: quick lookups, mechanical edits,
  narrow single-file changes.
- **Sonnet** — medium-complexity work: standard code implementation,
  multi-file changes, typical bug fixes.
- **Opus** — complex work: architectural planning, ambiguous problems,
  cross-cutting design decisions.

### Write modular, reusable code
Favor small, composable units (functions, components, modules) with a
single clear responsibility over large, monolithic ones. Extract shared
logic into reusable utilities instead of duplicating it, and design
interfaces so pieces can be recombined in new contexts without rewriting
them.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
