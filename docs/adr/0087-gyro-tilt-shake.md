# ADR 0087 (rocket v15): phone sensors — tilt steers, shake rattles, haptics answer

Date: 2026-08-22
Status: accepted

## Context

Owner picked sensor support from the standalone-rocket menu: the page
should become a toy you HOLD, not one you poke. Touch controls stay.

## Decision

- **Tilt = marble in a tray**: deviceorientation offsets the home-spring
  TARGET (±28° of relative tilt maps to the wall box), so the rocket
  drifts where the phone leans while every spring/boing keeps the v10
  feel. The neutral grip is calibrated from the first sample after
  enabling — and re-calibrated on visibilitychange, so however you hold
  the phone is "level". Landscape remaps beta/gamma via
  screen.orientation.angle.
- **Shake = toy in a box**: devicemotion acceleration spikes (>13 m/s²,
  10-frame cooldown) throw the rocket OPPOSITE the jerk (box goes right,
  toy flies left — the physically correct illusion), clamped ±30.
- **Haptics**: navigator.vibrate on wall boings (∝ impact, ≤40 ms),
  pokes (10), flick release (15), shake (20). Android-only by platform;
  iOS ignores it silently (the dino learned this in ADR 0013).
- **Permission UX**: a 🧭 pill (bottom-left, coarse-pointer devices
  only, 3 gentle pulses on first sight). iOS 13+ requires
  requestPermission inside a tap — the pill IS that tap; Android needs
  none, so tilt auto-enables unless previously switched off
  (localStorage rocketTilt). Toggle anytime; disabling zeroes the
  offsets.

## Consequences

- Desktop/laptops: zero change (no pill, no listeners firing).
- Sensor paths are untestable headless — verification is the owner's
  phone; code paths verified error-free across all three checklist
  viewports (default / lowcam / portrait, 14 s).
