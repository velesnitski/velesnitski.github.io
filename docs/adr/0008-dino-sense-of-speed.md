# 0008 — Strawberry Dash: sense of speed (foreground parallax + speed lines)

**Date:** 2026-07-01
**Status:** Accepted — builds on [[0007]]

## Context

The world scrolls faster as score climbs, but it didn't *feel* faster — raw scroll-speed alone reads flat. Endless runners sell speed with extra motion cues (foreground layers, motion streaks). Cheap to add, purely cosmetic.

## Decision

Two additive cosmetic layers in `dino/index.html`:

- **Foreground parallax grass.** A row of green grass tufts along the very bottom, drawn **after** the dino/particles and scrolling ~1.7× faster than the midground hills. Adds depth and life; sits below the dino's feet so it never occludes the character.
- **Speed lines.** Faint white horizontal streaks that fade in past ~speed 6 and intensify toward the 9.2 cap (alpha scales with speed), scrolling at `t·speed`. Off entirely at low speed and outside play, so the menu stays calm.

`#demo` now sets `speed=8.5` so both are visible for headless verification.

## Consequences

- No gameplay/balance change — purely visual; both are bounded (16 tufts, 7 lines) so no perf cost on phones.
- High-score runs now feel climactic, closing the last "juice" gap vs. the genre.
- Foreground is drawn frontmost at the bottom; if a future foreground needs to overlap the character for stronger depth, layer it explicitly then.
