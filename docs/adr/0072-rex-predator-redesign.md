# ADR 0072 (v60): T-Rex predator redesign — power-fantasy pass

Date: 2026-08-12
Status: accepted
Amends ADR 0070.

## Context

Owner on the v58 rex: cute, but wants it "super-cool like in other games."
The first model was an upright green blob — comedy without menace. A
transform power-up must read as a power fantasy.

## Decision

Full drawRex rewrite along three axes:

- **Silhouette** (the pro-game read): whole body leans into the run
  (rotate −0.09), head thrust forward on a long underbite snout, raised
  counterweight tail with whip animation, drumstick thighs with clawed
  two-toe feet — the classic rex geometry.
- **Surface**: two-tone (dark back saddle over light belly), raptor
  stripes down flank and tail, five gold dorsal spikes, dark head crown.
  Face keeps the kawaii grammar (big catchlight eye, cheek blush) but adds
  an ANGRY BROW — cute-fierce is the brand. Tiny arms stay (the joke) and
  gain little claws. Jaw chomps rhythmically while running.
- **Power presentation**: green speed streaks trail him while running;
  footfalls kick dust and micro-shake every 13 ground frames (freight
  train); the transform moment fires an expanding roar shockwave ring
  under the RAWR!! splash.

Stamps v60 ×3.

## Consequences

- Blush placement is coupled to the jaw region — first draft put it on
  the mandible where it read as a glitch pixel; cheek-only from now on.
- The lean rotation wraps all body parts; anything added to drawRex later
  must be drawn inside the rotated context or it will float unrotated.
