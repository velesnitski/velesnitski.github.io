# 0007 — Strawberry Dash: industry quick wins

**Date:** 2026-07-01
**Status:** Accepted — builds on [[0006]]

## Context

Compared the game to the endless-runner genre (Chrome Dino, Flappy Bird, Subway Surfers, Alto's Odyssey, Jetpack Joyride). We already match or beat most of it (juice, combos, arcs, two power-ups, dive, day/night, share, local board). Five common, cheap features were missing.

## Decision

Added the five gaps, all small and additive:

- **⏸ Pause.** `P` / `Esc` and a Pause button toggle a frozen state with a "Paused — tap to resume" overlay; tapping the canvas resumes (doesn't jump). Practical for kids who get interrupted — every other runner has it.
- **Near-miss bonus.** Clearing a bat closely while airborne (small vertical gap as it crosses you) pops a "NICE!" +3 with a chime. Rewards brave, tight jumps — the Subway/Crazy-Taxi staple — a skill counterpart to the shield's forgiveness.
- **Milestone feedback.** Every 100 points triggers a gold "100!/200!…" pop, a warm screen flash, a two-note ding, and a small speed kick — so progress *feels* rewarded (arcade convention) instead of a silently rising number.
- **Haptics.** `navigator.vibrate` on death (120ms), shield-break (40), and milestones (20) — standard mobile feel; no-ops on desktop; gated by the sound-mute toggle.
- **Medals.** Game-over shows 🥉/🥈/🥇 at 100/250/500 — instant goal-setting, like Flappy Bird's medals.

## Consequences

- Still one self-contained file, zero deps/network; haptics degrade gracefully where unsupported and respect mute.
- Milestone speed kick compounds with the existing ramp — capped at the same 9.2 ceiling so it can't run away.
- Pause freezes by skipping `update()`; the render loop keeps running so the overlay draws.
- Remaining genre ideas left for later (bigger lifts): online leaderboard, daily missions, unlockable characters, parallax foreground, a slam-kill variant of the dive.
