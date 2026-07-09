# ADR 0065: rocket v7 — fins move to the tail

Date: 2026-07-09
Status: accepted

## Context

Owner screenshot of v6: "looks a bit worse now, pay attention to the fins."
Diagnosis: the v6 fins fixed the floating gap by burying a huge root chord —
but they attached high on the belly, where the hull is at max radius. The
leading edge exited the surface at a tangent, painting a jagged blue
"waterline" across the white hull; the two 45° fins showed their inner faces
as a jumbled X; the gold belly ring got chopped into floating dashes where
fins crossed it.

## Decision

Fins mount where real rocket fins live — on the tail taper:

- Fin groups moved from y −2.2 to **y −4.6**, radius 3.0; root edge x −.45
  (just enough burial). At the taper the hull surface drops steeply, so the
  leading edge exits at a steep angle: a clean, short intersection line
  instead of a long graze.
- Fin ~15 % smaller overall (span abs y −3.2..−9.7, tip radius 6.75), bevel
  reduced .3→.2, taper divisor 4.4→3.9. Booties follow to the new tips.
- **Belly ring deleted** — it could not coexist with fin roots at any height;
  the nose collar, porthole rim/bolts, and booties carry the gold trim.

Stamp → `rocket v7`.

## Consequences

- MODELLING RULE for this hull: nothing may attach between y −1 and −4 on
  the belly max — parts there either graze tangent (fins) or get chopped by
  geometry (rings). Attach at the taper (< −4.5) or the shoulder (> 2).
- The strawberry decal (y −2.8) is now the only ornament on the belly band,
  which is why it finally reads cleanly.
