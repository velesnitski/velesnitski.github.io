# ADR 0084 (rocket v12 reland): the wall box must fit the body

Date: 2026-08-22
Status: accepted
Amends ADR 0082; documents the revert (#119) and reland.

## What broke in production

The v11 jelly switched wall collisions from the CENTER POINT to every
particle — but resize() kept the point-era margins (−7/−8/−9). The
resulting screen box (~16 units tall) was smaller than the rocket
itself (~26 units): the floor permanently crushed the bottom lattice
rows. Symptoms owners saw: rocket tilted, fins "завалены" (the affine
deformation skewed the whole hull), an endless pileup of smoke rings
(every cooldown re-fired an impact), lingering fire bursts. Reverted
live within minutes (#119), fixed on a branch.

## The fixes

1. **Walls = nearly the full frustum** (margins 2–4), with a floor for
   tiny viewports: `wallX=max(6.5, halfW−4), wallTop=halfH−2,
   wallBot=halfH−2.5`. The lattice (±5.5 × −11..11.5 about the cm)
   always fits: fov is vertical, so halfH≈16.6 at every aspect.
2. **Grab de-mudded**: the velocity-pull with a per-step ×.88 damp
   (≈0.0005/s — molasses) became positional closing of 30 % of the gap
   per step + mild 6/s damp — snappy and unconditionally stable.

Verified with 14-second long-run screenshots (the 3.5 s snapshots that
"passed" v11 were too short to reveal a steady-state crush) plus kick
dynamics: upright settle, straight fins, no ring pileup, healthy shear
in flight.

## Lessons

- Changing WHAT a constraint applies to (point → body surface) silently
  invalidates every margin tuned for the old subject. Audit constants
  that encode geometry assumptions when the geometry's meaning changes.
- Long-run verification: steady-state bugs need steady-state screenshots.
  3–4 s budgets show the pose, not the equilibrium.
