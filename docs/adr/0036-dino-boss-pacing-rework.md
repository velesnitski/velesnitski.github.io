# 0036 — Strawberry Dash: boss pacing rework (crab jab, piñata granny, visible crow)

**Date:** 2026-07-02
**Status:** Accepted

## Context

Owner playtest: "crab is unkillable, too slow; tortoise no reward, very slow, not funny; never seen the crow."

## Root causes

1. **Crab**: he stopped at `dinoX+26` — *inside* his own walk-in kill radius (30). Standing near him = death, and early jumps landed outside the narrow 38px stomp range → "unkillable". Approach at 0.95px/f = 7s of dead time → "too slow".
2. **Tortoise**: 1.15px/f stroll (6+s to arrive), reward was an invisible `runBerries` counter, naps stalled her further.
3. **Crow**: cadence `400, +520, +480…` put the 5th encounter (crow) at score **~2240** — effectively unreachable content.

## Decision

- **Crab = jab duel.** Fast approach (2.2/f, mega 2.6, enter 5.5) to **arm's length (`dinoX+58`) — a walking crab can never touch you**. From there he cycles: shuffle → **windup ❗ (claws pulled back, wide open)** → **jab** (quick lunge to `dinoX+4` and back; the *only* thing that hurts, grounded ± 34px) → or **guard** (38%; CLACK block as before). Stomp envelope widened (r 46, feet window −64…+14) and works in every phase but guard; each hit knocks him back 90px. Fixed the first-CLACK never firing (`b.bcd<=0` on undefined).
- **Tortoise = berry piñata.** Stroll 2.0/f (enter 3.6), max **one nap** per visit (95f). Every bounce **ejects 3 collectible berries** from her shell (plus +3 banked) with rotating pops (`boing!` → `oho!!` → `tee-hee!`); the hint above her is a bobbing **⬇🍓🍓🍓**; leaving un-bounced teaches: "aww… next time bounce on my shell!". Zoom exit 9/f.
- **Everyone meets the cast.** First boss at **score 220**; gaps `max(200, 300−20×count)`; rotation reordered `crab → crow → worm → bat` (+ tortoise every 3rd). Crow now appears ~score 500 instead of 2240.

## Consequences

- Typical fight length: crab ≈ 10–15s of real action; granny visit ≈ 6–8s.
- MEGA slots unchanged (every 4th encounter, any fight type).
