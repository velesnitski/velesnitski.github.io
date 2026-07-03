# 0054 — Strawberry Dash v53 HOTFIX: LS wrapper self-recursion killed all persistence

**Date:** 2026-07-03
**Status:** Accepted

## Context

Owner: "after first spawn, only dark queens spawning." Empirical repro (instrumented live build, timer-driven sim) confirmed: `crab → queen → queen → …` with `sinceQ` stuck at 0 — the **debut branch fired every encounter** because `dinoQueenMet` never persisted.

## Root cause (introduced by the v50 audit fix, ADR 0051 #5)

The safe-storage migration inserted the `LS` wrapper and THEN ran the mechanical
`localStorage.getItem→LS.get / setItem→LS.set` replace over the whole file —
**including the wrapper's own body**:

```js
get(k,d){ try{ const v=LS.get(k); … }   // called itself
set(k,v){ try{ LS.set(k,v); }catch{} }  // called itself
```

Every read stack-overflowed into its own catch → returned the default; every
write silently no-opped. **All persistence dead since v50**: best/wallet/XP/
streak/missions/purchases/tutorial flags, the queen-met flag (→ infinite
debuts), and the telemetry `sid` regenerated per load (inflating "players
today"). Pre-v50 stored data was untouched and returns with this fix; anything
"earned" today was never written.

## Fixes in this release

1. `LS.get/set` call `window.localStorage` directly (repro re-run: `flag=1`,
   act sequence `crow worm 🐢 crab bat 👑 │ crab crow 🐢 worm bat 👑` ✓).
2. **Granny moved to act slot 3** (was 5 ≈ score 1400 — most runs ended first;
   now ≈ 850): act = `F F 🐢 F F 👑`. Answers "is tortoise even spawning?" —
   she was, but too deep to ever see.
3. **Tortoise leg redesign**: two thin pegs → four chunky rounded legs (far
   pair darker), little feet with toenails, alternating waddle lift + a subtle
   body waddle rock.

## Lessons (standing rules)

- **Never run a mechanical rename over the file that contains the wrapper's own definition** — insert the wrapper *after* the replace, or exclude its lines.
- Silent-catch wrappers hide their own death: a self-recursive no-op passed every error-check because nothing threw to the surface. Persistence needs a smoke test (write→reload→read), not just error-free loads.

## Consequences

- Telemetry "players" counts will *drop* to honest numbers (stable sids again).
- v53 stamps (footer + beacon + SW cache).
