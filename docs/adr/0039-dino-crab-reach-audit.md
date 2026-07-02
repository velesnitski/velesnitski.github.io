# 0039 — Strawberry Dash: crab unreachable at rest + full cast reach-audit

**Date:** 2026-07-02
**Status:** Accepted

## Context

Right after the Queen reach fix ([[0038]]), the owner reported the crab unbeatable too. Same disease: his **home position was `dinoX+58`** while the stomp reach is `|Δx| < 50` — during rest/windup/guard (his entire "stompable" act) he sat **8px out of reach**. The only functioning window was stomping him mid-jab — precisely when he's dangerous.

## Decision

- Crab **home → `dinoX+38`**, stomp radius **50 → 56** (mega 60). Resting/winding/guarding crab is now comfortably stompable (18px margin); hop landings (≤ home+12 = 50) also within reach; jab hurt range (±28, jab phase only) unchanged.
- **Full cast reach-audit** against the pinned `dinoX` (the standing rule from [[0038]]):
  | boss | window | reach | ok |
  |---|---|---|---|
  | crab rest | dinoX+38 | <56 | ✅ (fixed here) |
  | queen dizzy/rise | dinoX+34 | <52 | ✅ |
  | crow dazed | ~dinoX+10–20 | <38 | ✅ |
  | worm head | arcs through dinoX | — | ✅ |
  | bat swoop | dinoX+30 | — | ✅ |
  | tortoise | walks through | <42 | ✅ |

## Consequences

- Every boss in the game now has a verified-reachable damage window.
