# ADR 0064: rocket v6 — realistic-and-funny model rework

Date: 2026-07-09
Status: accepted

## Context

Owner reviewed a live screenshot of v5 and asked for a rework: more realistic
AND funnier. The screenshot exposed five modelling sins: fins floating beside
the hull with a visible gap, the porthole ring sitting on the surface like a
life buoy, a hard seam where the nose cap met the body, the engine bell
rendering hollow (backfaces culled), and the band-aid poking out edge-on like
a rendering artifact.

## Decision

- **Fins root into the hull**: fin groups moved inward (radius 3.15→2.85) and
  the shape's root edge extended to x −.9, burying a long attachment chord
  inside the body. New outline = swept leading edge, rounded outer edge,
  flat-ish bottom tip.
- **Landing booties**: a squashed gold sphere pad on each fin tip (children
  of the fin groups, so they jiggle). Realistic lander feet, funny shoes.
- **Recessed porthole**: open-ended dark sleeve tube into the hull, face
  plate just behind the rim (z 3.54 vs 3.62), rim tube slimmed .34→.26 and
  tilted to the hull slope, 4 gold bolts around it. Two bugs found via
  screenshots: a solid sleeve cylinder's front cap blacked out the window
  (fix: openEnded + DoubleSide), and a too-deep recess let the sleeve swallow
  the face at the camera's downward angle (fix: near-flush plate).
- **Face recomposed** for the window: head r 50 fills the circle, eye/smile/
  blush moved up to canvas-center so the camera's high angle doesn't crop
  the features; all three states (normal/wheee/dizzy) re-laid-out.
- **Nose joint collar**: gold torus over the cap seam — the accidental edge
  becomes an intentional staging line.
- **Bell fixed**: DoubleSide material + dark throat disc — reads as a real
  engine, not paper.
- **Band-aid moved to the nose front** (scraped nose, parented to the jiggling
  nose group) — clearly readable gag instead of an edge-on sliver.
- Antenna stem thickened. Stamp → `rocket v6`.

## Consequences

- Screenshot-driven modelling works: every fix in this pass was found by
  reading rendered frames, not code.
- The porthole is now a 5-piece assembly (sleeve/plate/rim/bolts) centered at
  y 2.6 — move them together or not at all.
