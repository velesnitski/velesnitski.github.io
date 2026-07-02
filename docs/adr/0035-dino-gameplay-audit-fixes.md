# 0035 — Strawberry Dash: gameplay audit fixes (fairness pass)

**Date:** 2026-07-02
**Status:** Accepted

## Context

Full design audit of the play loop. Five code-verified issues, ranked.

## Findings & decisions

1. **Crow's bombing run was a dud (🔴).** The pebble dropped at `dinoX+40`, but while falling it drifts left with world speed (~`speed×15`px), so it always crossed above/behind the player — it physically could not hit a grounded dino. Now the crow **leads the target** (`aim = dinoX + speed*15`): the pebble crosses the player's column at body height — a real "jump NOW" test (jumping clears it; the pebble passes underneath).
2. **Arena sweep on boss entry (🟠).** On-screen bats/rocks now **flee with a sparkle** when a boss spawns — no more wave-bat squeeze while the crab pins you at your own x. Berries/pickups stay.
3. **Berry drip during boss fights (🟠).** Spawning used to stop entirely (crab fights = up to 35s of empty screen, heat starving, no shield chance in MEGA fights). Now every ~100–140 frames a boss-safe pickup spawns: 64% single berry, 30% berry arc, 6% gold shield — never bats/rocks/magnet.
4. **Post-hit i-frames 0.5s → 0.8s (🟠).** `invuln` 30 → 48 at all four shield-pop sites (bat, rock, pebble, `bossShieldEat`). At top speed the old window ended before a trailing hazard cleared.
5. **Warm-up grace (🟡).** Bats now require score > 30 — a ~6-second berry-only ramp at the start of every run before the first hazard.

## Consequences

- Boss fights keep the heat/combo economy alive and can refill a shield mid-MEGA (deliberate kindness).
- The crow's kit is now fully honest: feint (mind game), real dive (dodge → crash punish), pebble (jump test).
