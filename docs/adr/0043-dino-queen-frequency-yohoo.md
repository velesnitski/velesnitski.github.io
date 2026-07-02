# 0043 — Strawberry Dash: queen frequency + version stamp + the "yo-hoo!" easter egg

**Date:** 2026-07-02
**Status:** Accepted

## Context

Owner reported score **16000 with no Dark Queen sighting**. Simulated the exact rotation logic (node): it is **correct** — queens appear at encounters 2–3, 7, 15, 19 on the current build. Conclusion: the owner is almost certainly playing a **stale browser-cached build** (the queen shipped only hours earlier; single-file pages cache aggressively, iOS Safari especially). There was no way to tell which build is running.

## Decisions

- **Version stamp** `v43` in the page footer — instant stale-cache diagnosis ("what does the corner say?"). Bump on every dino release.
- **Queen a little more often + robust**:
  - Her slot check now runs **before** the tortoise's → conflicts (enc 11, 19, …) resolve in her favor: exactly **every 4th encounter** (3, 7, 11, 15…).
  - Debut hardened: `bossCount===2` → `bossCount>=2` — the first-ever queen cannot be skipped by any state oddity.
- **👋 MK3 "Toasty!" homage** (owner's idea, his own photo): dad's cut-out face **pops from the bottom-right corner at an angle** with a springy ease-out-back bounce, a slight idle wobble, a drop shadow, a comic **"yo-hoo!"** bubble, and a **falsetto two-note "yo-hoo" synth** (sine 1250→1080, then 940→700). Triggers: 12% on each 100-score milestone, 50% on boss defeats; ~40 s cooldown; never in card mode. Asset: owner-approved 170px alpha PNG embedded as a data URI (+53 KB, file total 190 KB, still offline-capable). Debug `#yohoo`.

## Consequences

- The face is the owner's own photo, embedded at his explicit request in his public site.
- Rarity keeps it delightful: roughly once every few runs.
