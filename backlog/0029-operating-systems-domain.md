---
id: 0029
title: "New domain: Operating Systems"
status: ready
priority: P2
effort: L
created: 2026-08-09
refined_at: 2026-08-09
---

## Idea
CPU scheduling (FCFS/SJF/RR/priority/MLFQ) as a Gantt chart, page replacement (FIFO/LRU/Clock/Optimal) with live fault counters, memory allocation and fragmentation, Banker's algorithm, disk scheduling. Highest curriculum overlap of any domain researched — every CS program teaches this and most existing tools for it are abandoned student projects.

## Refinement
**Goal:** A new top-level domain (beyond DSA) reusing the generic `useStepPlayer<TStep>` engine with an OS-specific snapshot shape (`{ processes, queues, runningPid, clock }`).
**Zone:** C — New territories
**Effort:** L
**Priority rationale:** High curriculum relevance, but a full new domain — sequenced behind the flagship domain (Concurrency) recommended as the first deep dive.
**Open questions:** Which scheduling/paging algorithms ship first; acceptance criteria not yet defined.

## Notes
- 2026-08-09: Captured in bulk from the AlgoViz Expansion Atlas brainstorm (idea catalog + prioritization pass), alongside 42 sibling items.
