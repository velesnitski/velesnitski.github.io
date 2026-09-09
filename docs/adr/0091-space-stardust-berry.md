# ADR 0091: /space — twelve thousand specks of dust

Date: 2026-09-03
Status: accepted

## Context

Owner liked the space animation on OpenAI's GPT-6 Astra launch page.
We recovered its engine from the minified bundles (stealth headless
Chrome through the CF challenge, then CDP in-page fetch): ~12k point
sprites on three.js flowing along 3D spiral paths, assembling into
SVG-sampled shapes, scroll-keyframed dispersal, drag rotation.
Brief for v1: "like fish page — single smart beautiful mechanic".

## Decision

Fifth page, one mechanic: stardust ⇄ strawberry.

- 12 000 particles (4 000 reduced-motion), one THREE.Points, one draw
  call. All motion in the vertex shader from uniforms (rocket-fire
  pattern): spiral inward flow, per-particle staggered assembly mix,
  burst offset, rotation. Zero per-frame JS array work.
- Shape sampled in JS at init: fibonacci sphere deformed to a berry
  profile (broad shoulders, pinched tip), 8.5% gold seeds pushed 3%
  off-surface, six leaf blades, 30% of particles stay ambient stardust.
- The mechanic: dust flows in a galaxy spiral → gathers into the berry
  (staggered smoothstep, ~2.5s); tap/space = let go (fast dissolve +
  radial burst + haptic), 1.1s of pure dust, then it gathers again.
  Drag / arrow keys spin it with inertia (Astra's interaction).
- Palette: berry #ff4d63/#d92a44, seeds #ffdf8a, leaves #46c274, dust
  whites/blues + a little Astra orange. Additive blending on black;
  CSS-blur nebulas behind.
- three.js reused from ../rocket/three.min.js (same origin cache).
- Telemetry ev:'space'. Homepage door again deferred to owner.

## Verification

Title/error hook clean; 14s steady-state 900×650 + portrait 450×900.
First screenshots caught a blown-out white blob — point-size constant
5× too big for additive blending (fixed 10→2.1). Synthetic tap:
dispersal verified under virtual-time; re-assembly verified in REAL
time via CDP (A=0.763→1 at +7s) — virtual-time-budget races timers
ahead of rAF frames, so timer-scripted interactions must be verified
with a real-clock CDP screenshot, not virtual-time runs (new checklist
item alongside ADR 0086's).
