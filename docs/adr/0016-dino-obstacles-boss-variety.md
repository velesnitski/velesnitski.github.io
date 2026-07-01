# 0016 — Strawberry Dash: rock obstacles, boss variety & endgame

**Date:** 2026-07-01
**Status:** Accepted — builds on [[0014]]

## Context

Wanted more obstacle types, multiple bosses (incl. quick ones), and an interesting endgame.

## Decision

- **Rock / roadblock obstacles.** A ground obstacle (`k:'rock'`, tall variant ~35%) spawns from score > 250. You **jump over** it; being low when it reaches you ends the run (shield absorbs). **Dive onto it to smash** it for points, and the **tail-spike shockwave** clears it too.
- **Boss variety + rotation.** Bosses now have a `type`: the swooping **bat** and a new ground **boulder** (a grumpy rock that rolls in and **charges** along the ground — jump over it, land on it to damage). Types alternate per encounter.
- **Quick + escalating bosses.** `spawnBoss()` scales the fight: encounters **1–2 are "quick" (2 HP)**, 3+ are full (3 HP), and **every 4th is a MEGA** (5 HP, 👑, bigger, faster) — the endgame spike. Rewards scale (boss +30 🍓, MEGA +80 🍓 + "🏆 CHAMPION!").
- **Endgame ramp.** After each boss resolves, the next one arrives **sooner** (`nextBoss` gap shrinks with `bossCount`, floor 320), so late game becomes a boss-gauntlet.
- HP shown as hearts sized to the boss (`hp0`), a ❗ wind-up telegraph, and a 👑 over megas.

## Consequences

- Two new threat axes (ground rocks + a ground boss) without new inputs — jump/dive still cover everything.
- All bosses share one state machine (enter→hover→wind→swoop) with per-type overrides (boulder stays at ground; bat dives from above), keeping it compact.
- Boulder collides via the same "airborne = damage, grounded = hurt" rule as the bat, so the mental model is consistent. Debug: `#boss[=boulder|mega]`, rocks in `#demo`.
