# 0031 — Strawberry Dash: simpler crab, funnier tortoise

**Date:** 2026-07-02
**Status:** Accepted

## Context

Playtest read on [[0029]]: the crab's leap ("air is NOT safe now") inverted the rule kids learn everywhere else in the game, and the tortoise had room to be a proper comedy act.

## Decision

- **Crab simplified to one readable rule.** The leap is gone. He shuffles on the ground (contact hurts, as with everything), and periodically **raises both claws crossed overhead to BLOCK** (🛡 icon above him, claws visibly clamp shut). **Claws down → stomp him. Claws up → your stomp bounces off with a harmless "CLACK!"** — no damage either way, so a mistimed stomp is safe to fail (20-frame re-bounce cooldown). Air stays safe, like the rest of the game.
- **Tortoise is now a granny comedy act:**
  - **Wire spectacles** (she sleeps in them).
  - She randomly **stops for a nap** mid-stroll (~drooped head, ˘ closed eyes, tiny "o" snore mouth, floating `z` pops, 💤 above her). Bouncing on her **startles her awake** (`!? +5 🍓`) — still pays berries.
  - Every bounce **squishes her** (squash-stretch scale, decays over 14 frames) — proper boing-cushion feel.
  - After the 3rd bounce she tucks in and the **shell rolls away spinning like a wheel** with dust puffs and a `wheee!` pop (replaces the shy walk-off).

## Consequences

- Crab collision no longer has an airborne-death branch — strictly friendlier.
- `shy` phase removed (replaced by `zoom`); tortoise counter shows 💤 while napping.
- Debug: `#boss=crab&guard`, `#boss=tortoise&nap`, `#boss=tortoise&zoom`.
