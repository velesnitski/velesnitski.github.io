# ADR 0086 (rocket v14): the fin mount was 90° off — a systemic bug since v5

Date: 2026-08-22
Status: accepted
Corrects ADR 0063/0066/0067/0085 fin verdicts.

## The owner was right

"Лопасти завалены — они всегда были — возможно системный баг." Confirmed
by his phone screenshots and then by the math: fin groups are positioned
at azimuth `a` from +X (`cos a, sin a`), but rotated `rotation.y = −a`,
which points the fin's sweep along `(−sin a, 0, cos a)` — the TANGENT.
The radial direction is `(cos a, 0, sin a)`; the correct rotation is
`π/2 − a`. Every fin since the v5 four-fin layout swept SIDEWAYS along
the hull with its broad face outward — flat paddles, not knife-edge
radial fins. Desktop verification angles happened to mask it; the
portrait phone view exposed it instantly.

## Fix

One line (`g.rotation.y = Math.PI/2 - a`) plus the jiggle-bone local
frame re-derived for the corrected mount (`ax=sin·x−cos·z,
az=cos·x+sin·z`). Verified with 14 s steady-state runs from THREE
viewpoints — default, ?lowcam, and a new 450×900 PORTRAIT viewport,
now a permanent part of the verification checklist.

## Lessons

- Screenshot verification validates what the chosen cameras can see; a
  90° orientation error survived FIVE fin redesigns because every
  redesign was judged from the same two angles. Add the customer's
  actual viewpoint (portrait mobile) to the loop.
- When the owner says "this was always broken, maybe systemic" — treat
  it as a hypothesis about a COORDINATE-LEVEL invariant and check the
  math directly, not another visual pass. The five prior "fin fixes"
  reshaped the outline; none checked the mount frame.
