# 0033 — Strawberry Dash: crab unreachable + tortoise sink-through (playtest fixes)

**Date:** 2026-07-02
**Status:** Accepted

## Context

Owner playtest of [[0031]]: "could not jump on crab at all, tortoise is strange."

## Root causes

1. **Crab was literally unreachable.** His shuffle anchored at `dinoX+180` and never approached — but the dino can't move forward. The removed leap ([[0031]]) had been the only thing closing the distance; without it the fight was impossible.
2. **Tortoise bounce window anchored ~40px too low** (triggered only when the dino was within ~20px of the ground), so the dino visually sank through her whole shell before the boing fired — the "strange" feel. The crab's stomp window had the same flaw (dino-center distance check vs a short ground target).

## Decision

- **Crab now advances toward you** (~0.95px/f, mega 1.15, wobble kept; stops at `dinoX+26`) — a pressure clock: stomp him or he reaches you and pokes you. On a successful stomp he's **knocked back 80px** and re-approaches, giving the fight a push-pull rhythm. During guard the repeated harmless CLACK bounces off his crossed claws until he drops them.
- **Feet-based collision for both ground characters** (`feet = groundY+dy`):
  - Crab: airborne + falling + feet in `(b.y-54, b.y+10)` → stomp/CLACK right at his shell; grounded overlap (tighter, `r-8`) → shield-or-death.
  - Tortoise: bounce fires at feet in `(b.y-52, b.y+8)` — i.e. **on the shell dome**, ~45px above ground, wide enough that even a full-speed dive can't tunnel through the window. She's now a true trampoline: you can't sink into or stand on her.

## Consequences

- Crab fight is a timing duel (wait out the block while he closes in); tortoise boing feels immediate and physical.
