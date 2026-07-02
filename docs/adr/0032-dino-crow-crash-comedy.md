# 0032 — Strawberry Dash: crow crash-landing (comedy + whiff-punish)

**Date:** 2026-07-02
**Status:** Accepted

## Context

Mechanics audit of the crow ([[0029]]): movement math is sound (feint/swoop sines return to their start, the feint passes safely above a grounded dino), but **dodging a real dive was unrewarded** — the crow just flew back to hover. That's a missing whiff-punish, and the character wasn't funny yet.

## Decision

One mechanic that fixes both — the **crash-landing**:

- The real swoop records hp at launch; if it **misses** (hp unchanged at the end), ~55% of the time (35% mega) the crow **loses control and face-plants** into the dirt (`crash` → gravity fall, dust, screen shake, `@_@` pop).
- **Dazed** (~75 frames, 55 mega): flopped over on its tail, wobbling, **✕ eye, tongue out, dizzy stars orbiting** — and completely **harmless to touch**. Any airborne bop = a hit (`CAW?!`), after which it flies off to recover. If undisturbed it leaves with an embarrassed **"ahem."** pop.
- **Ruffled crest**: each hit adds a bigger crooked feather to its head — the enrage (faster dives) is now visible as a progressively worse hairdo.

The fight loop becomes: read the ❗ (real or feint?) → dodge the real dive → **stomp the crashed bird**. Skill is rewarded, and the boss is a clown.

## Consequences

- Crow HP can now be depleted entirely via crash-punishes (dodge-focused play), or mixed with direct bops — both remain valid.
- Debug: `#boss=crow&dazed` seeds the dazed state.
