# 0021 — Strawberry Dash: lifetime stats, dino-showcase share card, quick fixes

**Date:** 2026-07-02
**Status:** Accepted

## Decision

- **Lifetime stats** (persisted in `localStorage.dinoStats`): **runs, best score, berries banked, bosses beaten, best combo, near-misses, jumps, dives** (+ day streak). Counters increment live during play (jumps/dives/near-miss/boss/combo-max) and are flushed on game-over; a run is counted at `start()`.
  - Surfaced two ways: a new **📊 tab in the Closet** shows the full list (full-width rows, gold values), and the **game-over panel** gains a line — `🏃 Run #N · ✨ best combo xC · 📊 stats in Closet`.
- **Share card rewritten to show off the customized dino.** The dino is now the **hero**: big (scale 1.44), **spotlit** with a radial glow tinted by the equipped skin's rarity, on a stage shadow. Beside it: the dino's **name**, **rarity-coloured outfit chips** (skin + hat + every worn gear), the score, best, and CTA. So the shared PNG advertises *your* dino, not just a number.
- **Industry quick fixes:**
  - **Auto-pause on tab blur** (`visibilitychange`) — switching tabs/apps mid-run no longer kills you.
  - **Live "🏆 New best!" toast** (with confetti/ding) the moment your score passes your previous best, instead of only learning at game-over.

## Consequences

- Stats are local-only (no backend), consistent with the rest of the game.
- `bigPanel` auto-sizes to line count, so the extra game-over line needs no layout work.
