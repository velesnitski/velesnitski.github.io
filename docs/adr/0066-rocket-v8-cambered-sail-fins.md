# ADR 0066: rocket v8 — cambered triangular-sail fins

Date: 2026-07-09
Status: accepted

## Context

Owner close-up of v7's fin region: "STILL strange rocket." The shot showed
two remaining sins. First, the airfoil taper was linear, so the fins' large
side faces were perfectly planar — one uniform tone under light, reading as
surfboards leaned against the hull. Second, the outline was a tall
rectangle: the sweep happened only near the top, then the outer edge ran
nearly vertical.

## Decision

- **Triangular sail outline**: ONE continuous quadratic leading edge from the
  root top (−.45, 1.6) all the way out and down to the foot (3.7, −4.4) — no
  early bulge, no vertical outer edge — then a rounded foot tip and a bottom
  edge climbing gently back to the root.
- **Camber**: the vertex pass now both thins AND bends the plate —
  `z' = z·(1−.72d) − .55d²` where d = x/3.9. The −.55d² term arcs the whole
  plate like a petal, so the big side faces carry a light gradient from any
  angle. Recomputed normals make the shading follow.
- Booties follow the new tip (group-local (.45, −5.35, 3.4) — note the camber
  shifts the tip in group-x by +.55 after the −π/2 mesh rotation).
- **`?lowcam` debug parameter**: locks the camera to the low fin-inspection
  angle the owner's screenshot was taken from, bypassing pointer parallax.
  Every fin change must now be verified from BOTH the resting camera and
  `?lowcam`.

Stamp → `rocket v8`.

## Consequences

- The fin is no longer a flat prism anywhere; any future outline change must
  keep the single-sweep leading edge (the triangle reads "rocket"; anything
  with a vertical outer edge reads "paddle").
- The camber constant (.55) and the boot offset are coupled — change one,
  re-check the other.
