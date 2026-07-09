# ADR 0067: rocket v9 — fins back to true radial planes (camber removed)

Date: 2026-07-09
Status: accepted
Amends ADR 0066.

## Context

Owner on v8: fins must sit at 90° to the fuselage like the rocket emoji's —
"now they like laying, not staying under the right angle." The v8 camber
term (−.55d²) bent each plate tangentially around the hull; from the front
the fins read as leaning/curling rather than standing perpendicular.

## Decision

Remove the camber term; keep everything else from v8. The vertex pass is
taper-only again (`z' = z·(1−.72d)`), so each fin is a true radial plane
perpendicular to the fuselage — emoji-correct. The triangular-sail outline
and rounded bevel stay; they, not camber, were the fix for the v7
"surfboard" look. Boot offset returns to group-x 0 (the +.45 was
compensating for the camber's tip shift).

Stamp → `rocket v9`.

## Consequences

- LESSON: on a finned rocket, perpendicularity to the hull is part of the
  object's grammar — surface interest must come from outline, bevel, and
  gloss, never from bending the fin plane.
- Verified from both the resting camera and `?lowcam` per the ADR 0066 rule.
