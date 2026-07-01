# 0019 — Strawberry Dash: bug fixes (round 2, from review agent)

**Date:** 2026-07-01
**Status:** Accepted

## Context

A dedicated review agent read the whole file and surfaced four real bugs.

## Decision

- **HIGH — boss berries double-credited.** On boss defeat, the reward was added to **both** `wallet` and `runBerries`; but `runBerries` is flushed into the wallet again at game-over — so a "+80" mega boss actually paid 160 (non-mega paid 60 for 30). Now adds to `wallet` once + `saveCloset()` (matching the mission-reward pattern), and no longer to `runBerries` — also persists the reward if the tab closes before a game-over.
- **MEDIUM — global keydown ignored focus/modal.** Space/ArrowUp fired even when the **name `<input>`** was focused (blocking spaces in names *and* jumping the game) or when the **closet modal** was open (resuming the game behind it). The handler now early-returns when the event target is an INPUT or the closet modal is open.
- **boss ignored the dino's i-frames.** Bat/rock deaths gate on `invuln<=0`, the boss didn't — so you could die to a boss during the invulnerability granted right after a shield pop. The boss's lethal branch now checks `invuln<=0` too (bopping it mid-i-frames still works).
- **Tail Bow perk skipped bat-slams.** The dive-slam hardcoded `comboTimer=200`; now `tailbowOn?300:200`, consistent with berries/rocks.

Agent also confirmed several non-issues (particle-array shadow is harmless, boss lifecycle/mission/localStorage logic sound, `shareLink` is dead-but-harmless).

## Consequences

- Wallet economy fully correct now (this + [[0017]]). Name entry works. Boss fights fair w.r.t. i-frames. Perk consistent.
