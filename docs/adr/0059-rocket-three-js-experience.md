# ADR 0059: /rocket — scroll-driven three.js journey to Strawberry World

Date: 2026-07-08
Status: accepted

## Context

The site wanted a second flagship sub-URL — a "coolest on the internet" three.js
moment. Two ideas merged: a flying rocket you pilot by scrolling, and a living
planet lit by the game's real players. The result connects to Strawberry Dash
rather than standing apart from it: same palette, the dino in the porthole, and
a planet whose beacons come from live telemetry.

## Decision

Ship `/rocket/` as a single static page plus a vendored three.js:

- **three.min.js r147 (UMD, MIT)** vendored locally — no CDN, consistent with the
  site's zero-external-dependency discipline (and the Pages CSP posture).
- **Scroll = the journey.** A 7000px scroll container drives progress `p` 0→1;
  the canvas is fixed. `?p=` freezes progress for debugging/screenshots.
- **Everything code-modeled** (no asset files): rocket with canvas-texture dino
  porthole and 🍓 decal, gantry launchpad, 34 recycled cloud groups, 900 stars,
  additive-blending point-cloud exhaust.
- **Strawberry planet at journey's end** — canvas-generated strawberry skin,
  leafy pole cap, BackSide atmosphere shell. Beacons are placed via a
  timezone→lat/lon centroid table fed by the telemetry endpoint's new `tzs`
  aggregate (distinct devices per timezone); the world-record holder orbits as
  a crown satellite. Endpoint failure degrades to three fallback beacons.
- **Arrival stops short of the planet** (`ALT = ease(p)·(PLANET_Y−260)`): the
  camera must never enter the sphere or its atmosphere shell — the first build
  flew straight in and rendered a solid green screen at p=1.
- Telemetry gains a `rocket` visit event; `doGet` gains the `tzs` top-40 list
  (requires one Apps Script redeploy; page works without it).

## Consequences

- New release surface: `/rocket/` has its own footer stamp (`rocket v1`) and is
  cached network-first by no service worker (plain page) — updates are instant.
- Verification recipe recorded: headless WebGL needs
  `--headless=new --use-angle=swiftshader --enable-unsafe-swiftshader`;
  block external hosts with `--host-resolver-rules` to keep virtual time moving.
- Not yet linked from the homepage or the game — visuals to be approved first.
