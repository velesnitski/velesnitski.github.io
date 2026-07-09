# ADR 0062: rocket v4 — airfoil fins + character gags

Date: 2026-07-09
Status: accepted

## Context

Owner feedback on v3: fins should look more realistic, and the rocket should
be funnier. A pro-modeller pass on both fronts.

## Decision

**Realistic fins.** The extruded swoosh (constant thickness) becomes an
airfoil: extrude depth raised to .9 at the root, then a vertex pass scales
each vertex's z by `1 − .7·(x/4.4)` — thick where the fin meets the hull,
thin at the tip and trailing edge, with recomputed normals. Real fins taper;
plates don't.

**Character gags**, each earning its place in the physics:
- **Bobble antenna** — stem + gold ball, nested INSIDE the jiggle-boned nose
  group with its own extra-floppy spring (gain .5 vs the nose's .12), so its
  wobble compounds with the nose's. The jiggle system was refactored from a
  positional array to a parts list `{g, k}` to allow arbitrary wiggle parts.
- **Gold belly trim ring** (torus, y −4.6) — classic retro-rocket dress line.
- **Band-aid decal** on the shoulder next to the porthole (canvas-drawn strip
  with pad + pores, tilted) — this toy gets flung into walls for a living.
- **Smoke rings** — a pool of 4 torus meshes; a wall bounce harder than
  |v| > 14 puffs an expanding, fading, sinking ring from the engine bell.

Popup stamp → `rocket v4`.

## Consequences

- The jiggle parts list makes future wobble parts one-liners.
- Band-aid placement is azimuth-tuned to peek at the camera's rest position
  (az −.5, radius 3.36 at y 4.1); moving the porthole means re-checking it.
- Smoke rings read best on hard flings — they are the reward for violence,
  matching the toy's core loop.
