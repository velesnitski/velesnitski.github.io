# 0017 — Strawberry Dash: bug fixes (double-bank, dead-bat hit)

**Date:** 2026-07-01
**Status:** Accepted

## Context

Bug-hunt pass after the obstacle/boss/gear waves.

## Decision

Two confirmed runtime bugs fixed:

- **`over()` could run twice in one frame → double rewards.** If two threats overlapped the dino on the same tick (two bats, or a bat + rock), `over()` ran once per hit — banking `runBerries` into the wallet twice and calling `recordScore` twice. Guarded with `if(state!=='play') return;`.
- **Dead bats could still kill you.** The tail-spike shockwave (jump/land step) marks nearby bats `e.dead=true`; the bat-collision branch didn't check `e.dead`, so a just-shockwaved bat could still trigger `over()`. Changed to `else if(e.k==='bat' && !e.dead)`.

A background review agent is doing a deeper pass; further findings will follow in a separate change.

## Consequences

- Wallet economy correct (no double berries on a two-hit death); tail-spike shockwave safe at point-blank.
