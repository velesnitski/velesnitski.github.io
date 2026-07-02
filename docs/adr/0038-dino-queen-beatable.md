# 0038 — Strawberry Dash: the Dark Queen was unbeatable

**Date:** 2026-07-02
**Status:** Accepted

## Context

Owner asked "is queen beatable?" — traced the math: **no, mathematically impossible.**

1. Her **dizzy collapse landed at `dinoX+62`**, but the stomp check required `|Δx| < 44`. The dino is pinned at `dinoX`, so her only damage window sat **18px out of reach, always**.
2. Her hover/taunt phases stay at `W−150` — never within the 40px contact range — so no other damage path existed. She could only hurt the player, then time out and flee.
3. Bonus trap: letting the dizzy expire while standing beside her made her **rise phase lethal on contact** (rise was in the walk-in-kill list).

## Decision

- **Stagger stops at `dinoX+34`** — she collapses *at the player's feet*, inside a widened stomp window (`|Δx|<52`, feet-based band `b.y−58…b.y+26`).
- **Rise is now harmless to touch and stompable** (same rule as dizzy) — a bonus window instead of a death trap.
- **Tornado picked ~50%** of decisions (was 42%) — her weakness comes around reliably — and the **timeout raised 2600 → 3400** so an unlucky pattern can't expire a winnable fight.
- Debug `#boss=queen&dizzy` seeds at the new position.

Fight math check: 4 HP ÷ (~1 dizzy window per ~250-frame cycle at 50% tornado rate) ≈ beatable in 20–30s, comfortably under the timeout.

## Consequences

- LESSON (repeat of the crab bug, now generalized): **every damage-window position must be verified against the fixed `dinoX` reach** — the player cannot walk to the boss.
