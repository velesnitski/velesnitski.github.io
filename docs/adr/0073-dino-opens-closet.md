# ADR 0073 (v61): the title-screen dino is a Closet button

Date: 2026-08-12
Status: accepted

## Context

Owner request: opening the closet (clothes/colors) should also work by
clicking the dino himself on the menu screen, not only the Closet button.
Kids poke the character first — that instinct should be rewarded.

## Decision

The stage input handlers gain a coordinate hit-test (`dinoMenuHit`):
on `state==='menu'`, a click/touch inside the dino's bounding box
(canvas coords x 40–285, y 148–305, covering the idle hop) opens the
Closet instead of starting a run; anywhere else keeps the old
tap-to-start. Mouse hover over the box shows a pointer cursor.
Coordinates are mapped through `getBoundingClientRect` (the canvas is
CSS-scaled). `touchstart` keeps its `preventDefault`, so no ghost click
follows. Stamps v61 ×3.

## Consequences

- The bbox is hand-tuned to the menu pose at dinoX=168/SC=1.02; moving
  or rescaling the menu dino means re-tuning these four numbers.
- Closet remains reachable via the button — the dino is an additional
  path, important for keyboard users.
