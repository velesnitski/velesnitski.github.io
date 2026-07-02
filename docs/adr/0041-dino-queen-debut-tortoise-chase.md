# 0041 — Strawberry Dash: guaranteed Queen debut + tortoise chase redesign

**Date:** 2026-07-02
**Status:** Accepted

## Context

Owner: "never seen the dark queen" + "tortoise: more cute, faster, harder to get strawberries."

Queen math: her slot was encounter 4, and encounters compound (each fight adds ~100–150 score before the next gap) → she appeared at **~score 1340**, beyond realistic runs. Same reachability disease as the crow ([[0036]]), one level up: *the slot existed but the score didn't.*

## Decision

### 👑 Queen visibility
- **Guaranteed debut**: the first time a player ever reaches their **2nd boss slot** (~score 500), the Dark Queen herself appears — "THE DARK QUEEN herself has come!" — persisted via `localStorage.dinoQueenMet`, once per player, ever.
- Permanent slots moved earlier: queen at `bossCount%4===3` (enc 3, 7, …), tortoise at `%3===2` (enc 2, 5, 8, …), with a `lastBoss` guard preventing back-to-back queens/tortoises. First boss at score **200**, gaps `max(150, 240−20n)`.
- Typical sequence, first session: crab → **👑 debut** → crow → worm → 🐢 → bat → 👑 → 🐢 …

### 🐢 Tortoise: cuter, faster, berries you must chase
- **Cuter**: bigger sparkly eye (dual catch-lights), longer lashes, rosier blush, wider smile, a **pink bow on her shell rim**, and she **hums ♪** while strolling.
- **Faster**: enter 4.4, stroll 2.8 — and **+0.9 speed per bounce** (each boing spooks her quicker), so the 2nd/3rd bounces need real timing as she crosses your column. Nap shortened to 70f — napping beside you is the deliberate easy window.
- **Harder berries**: the piñata berries now **scatter ahead and high** (`x+84…+192`, heights ~groundY−102…−166) — you must jump to catch them as they scroll past, instead of hoovering them for free. Banked bonus 3 → 2 per bounce.

## Consequences

- Every player meets the arch-villain within their first good run; regulars see her every ~4th encounter.
- Granny visits are now a 6-second skill vignette instead of a freebie.
