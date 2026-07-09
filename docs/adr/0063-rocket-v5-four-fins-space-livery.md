# ADR 0063: rocket v5 — four symmetric fins + space livery + quick wins

Date: 2026-07-09
Status: accepted

## Context

Owner on v4: fins should sit "parallel on board" — the 3-fin 120° layout
always pointed one fin flat at the camera, reading as a plate glued to the
hull, and the rocket's all-berry palette read candy, not space.

## Decision

- **4 fins at 90°, azimuth-offset 45°** from the camera's rest axis: the
  resting view always shows two clean symmetric fin profiles (model-rocket
  stance) and two rear fins in half-perspective; none face flat-on. The
  jiggle parts list absorbed the fourth fin with no code change.
- **Space livery**: nose dome and fins switch berry-red → glossy indigo
  (`#3d5bc0` SPACE_BLUE), engine bell → gunmetal `#3f4756`. The hull stays
  glossy white; gold trim ring/rim and the red strawberry decal remain the
  warm brand accents (the planet carries the red now).
- **Quick wins**, each a few lines:
  - cold blue rim DirectionalLight from behind-left — sci-fi edge highlight;
  - the second star layer tinted warm `#ffe3b8` (real skies are two-tone);
  - engine PointLight flickering on whenever the flame is visible — the
    exhaust now lights the bell and lower hull;
  - a shooting star streaking down-left across the far background every
    11–25 s (additive slash, sim-side timer).

Popup stamp → `rocket v5`.

## Consequences

- The camera rest azimuth is now a design datum: fins (45° offset) and the
  band-aid (az −.5) are both tuned to it; moving the default camera means
  re-checking both.
- Red now lives only in accents + planet; any future part should pick from
  SPACE_BLUE / white / gold / gunmetal.
