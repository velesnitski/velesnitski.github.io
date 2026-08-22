# ADR 0085 (rocket v13): fun first — v10 springs return, fire stays, proud fins

Date: 2026-08-22
Status: accepted
Supersedes ADR 0082 (XPBD core); keeps ADR 0083 (GPU exhaust).

## Context

Owner's verdict on the relanded jelly: "старая физика была гораздо
более веселой" — plus two standing complaints: the screen sides felt
unreachable, and the fins "всегда были завалены" (a silhouette issue
older than the jelly: the swept-sail outline reads as keeled-over).

## Decision

Fun beats tech-novelty:

- **Physics core reverted to the v10 spring rigid body** (pendulum
  grab-at-point, snappy flick, DVD wall boings, scalar squash + jiggle
  bones). The XPBD lattice is retired from production; ADR 0082/0084
  remain as the engineering record and a future orbit-game candidate.
- **The 30k GPU fire exhaust is kept** — grafted onto the v10 core
  (emission from vel/quat, radial burst wired into the v10 bounce, uTime
  sim-clocked). The one objectively-better piece of the upgrade survives.
- **Fins redesigned "proud"**: the leading edge now sweeps OUT more
  than down (tip radial ~7.5, nearly-upright outer edge, foot at −4.7),
  boots follow. Verified from the resting camera and ?lowcam with
  14-second steady-state runs.

## Consequences

- The toy's feel is exactly the loved v10, plus real fire.
- Lesson banked: a physics upgrade that changes game-feel needs the
  owner's hands on it BEFORE shipping — screenshots verify correctness,
  never fun. Next physics experiments go behind a debug flag first
  (?jelly) or into a separate page.
