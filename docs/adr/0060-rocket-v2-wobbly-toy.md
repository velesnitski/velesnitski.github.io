# ADR 0060: rocket v2 — from scroll cutscene to wobbly physics toy

Date: 2026-07-08
Status: accepted
Supersedes the interaction model of ADR 0059 (the visual language stays).

## Context

Rocket v1 was a scroll-scrubbed journey: pretty, but a cutscene — the visitor
controlled playback, not the rocket, and there was nothing to replay. The
owner pointed at 🍆🥵.ws as the target feel. Analysis of that reference: one
3D object, one tactile interaction (poke → jiggle-bone physics), zero chrome,
instant response, `???` as the only text. The fun is physical, not narrative.

## Decision

Rewrite `/rocket/` as a toy: the rocket floats mid-screen and answers touch.

- **Rigid-body physics on springs** (fixed-timestep 60 Hz accumulator — the
  display-Hz lesson from the game applies to toys too): position and
  orientation each pulled home by underdamped springs, so everything ends in
  a bouncy settle.
- **Grab applies force at the grab point**, producing torque naturally — grab
  the nose and the rocket pendulums; flick velocity is sampled from the last
  ~110 ms of pointer movement. Pointer-down lands an instant poke impulse
  (squeak + squash) before the grab begins, so the first touch answers in one
  frame.
- **Screen-edge walls** derived from the camera frustum bounce the rocket back
  (restitution 0.62) with boings — flinging it around the screen is the game.
- **Jiggle bones** on the nose and three fins: per-part angular springs driven
  by body acceleration in local space. This secondary motion is what makes it
  read as squishy rather than rigid.
- **Live porthole face** (CanvasTexture): blinks at idle, "wheee" when fast,
  spiral-eyed dizzy after sustained spin. Engine flame + exhaust puffs when
  moving fast. A shy attract wiggle fires if ignored ~13 s (suppressed under
  prefers-reduced-motion).
- **Synth SFX** (squeak/boing/whoosh/wheee), WebAudio unlocked on first
  gesture with the silent-buffer iOS trick from the game.
- **Chrome reduced to `???`** — a popup with credits and the quiet link to
  Strawberry Dash. No title, no hint, no altitude meter, no CTA. The distant
  strawberry planet with live player beacons (tzs) stays as identity.
- Telemetry: `rocket` on load, `rocket_end` with the poke count on pagehide.
- Debug hooks for headless verification: `?kick=vx,vy,spin`, `?face=state`,
  and window.onerror → document.title (caught a real read-only-property bug).

## Consequences

- The page is now replayable and demonstrable in five seconds with zero
  instructions; the journey/CTA of v1 is gone by design.
- Physics constants (spring stiffness, restitution, jiggle gains) are tuned
  by eye from headless screenshots; expect a feel-tuning pass after the owner
  plays it on a phone.
- `?p=` scrubbing no longer exists; screenshots use `?kick`/`?face`.
