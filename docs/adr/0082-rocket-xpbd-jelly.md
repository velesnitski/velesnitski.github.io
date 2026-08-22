# ADR 0082 (rocket v11): real jelly — XPBD shape matching replaces the rigid body

Date: 2026-08-15
Status: accepted
Supersedes the rigid-body core of ADR 0060.

## Context

Owner direction: keep /rocket as the home and upgrade it with genuinely
cutting-edge browser physics. The v2–v10 toy imitated softness (scalar
squash + jiggle bones on a rigid body); the upgrade makes the rocket an
actual deformable body.

## Decision

- **Particle lattice 3×5×3 (45 particles)** spans the hull in body space.
  Integration is explicit with per-particle damping; a uniform home
  spring and an upright torque (applied about the cm) reproduce the old
  toy's return-and-settle feel.
- **Shape matching (Müller, meshless deformations)**: each step computes
  Apq against the rest pose, extracts the rotation R via the warm-started
  iterative quaternion polar decomposition (Müller 2016, 14 iters), and
  pulls particles toward the rotated rest pose with stiffness .34 —
  jelly wobble with unconditional stability, no constraint graph.
- **Interactions are per-particle now**: walls clamp individual particles
  (the side that hits is the side that squishes), a poke shoves the
  particles under the finger (a real dent), grab holds the handful of
  particles within 5.5 of the touch (pull the nose — the nose stretches
  first), and a flick throws held particles harder than the rest, so
  spin emerges naturally.
- **Rendering = affine deformation mode**: D = Rᵀ·(Apq·Aqq⁻¹) in body
  frame, blended (β .85) and CLAMPED (diag [.6,1.55], shear [±.4] — the
  ADR 0071 out-of-range lesson), applied as the squash group's matrix
  (matrixAutoUpdate=false; idle sway baked in). Face, cosmetics, and the
  jiggle-bone secondary motion ride on top unchanged.
- cm/R still drive the root, so the planet, smoke rings, telemetry, and
  every debug hook (?kick now kicks particles) survive untouched.

## Consequences

- 45 particles × ~6 vector ops = trivial CPU cost; mobile-safe.
- The deformation is the affine mode only — no localized craters; the
  next tier (quadratic modes or per-vertex FFD) is a known upgrade path.
- Physics constants are screenshot-tuned; a feel pass on the owner's
  phone may adjust STIFF/damping by ±20 %.
