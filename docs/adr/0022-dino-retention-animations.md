# 0022 — Strawberry Dash: retention loop + living-character animations

**Date:** 2026-07-02
**Status:** Accepted

## Decision

Two themes: make players **come back / do one-more-run**, and make the dino feel **alive** (item-aware).

### Return-to-game / addictivity (all local, no backend)
- **Player Level + XP** (`localStorage.dinoXP`). Each run grants `floor(score/2)+berries` XP; levels cost `120 + (lvl-1)*70`. A **level-up** pays `lvl×10 🍓`, fires confetti + a `⭐ LEVEL n!` toast. The menu shows an **⭐ Level + XP progress bar** — a visible long-term goal that pulls "one more run."
- **Daily login reward** (`localStorage.dinoDaily`): first open each calendar day grants an **escalating** bonus (`15 + (day-1)*10`, capped 75), with a gold **menu banner** + toast + confetti. Consecutive days escalate; a gap resets to Day 1. This is the core return hook.
- **"So close — one more!" nudge**: dying within ~12% of your best shows `😤 SO close — N more! Tap for one more` on the game-over foot — a re-engagement loop.
- **Variable "lucky" bonus**: ~22% of runs pay a small random `🎁 lucky` berry bonus at game-over (variable-ratio reward).

### Living-character animations (item-aware)
- **Chomp** — the jaw opens (dark maw + tongue) for a few frames whenever the dino eats a berry/gold/magnet; **excited open mouth** while airborne. Smile otherwise. (Blink already existed and is auto-suppressed under shades.)
- **Sunglasses** — a **glint sweeps** across the lens each frame + a periodic **✦ cool twinkle** (the "deal-with-it" moment).
- **Tail Bow** — bobs and sways with the run.
- **Tail Spike** — the spike crown slowly **spins**.

All item animations are driven by `o.t`, so they animate in-game and sit at a clean pose in static previews (menu/closet/card). Debug: `#chomp` forces the open mouth.

## Consequences

- XP/level and daily are separate localStorage keys from the wallet; no economy double-count.
- Retention surfaces reuse existing panels (menu, game-over toast) — minimal new UI.
