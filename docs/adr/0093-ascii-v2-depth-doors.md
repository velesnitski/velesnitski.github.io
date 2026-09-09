# ADR 0093: ascii v2 — depth and doors

Date: 2026-09-03
Status: accepted
Extends ADR 0090.

## Context

The ASCII CITY shop page (checked via the ADR 0091 stealth-headless
recipe) confirmed the market for glyph exploration: 1,308 copies at
£2.50+ for a one-HTML-file walkable city with interiors and
elevations. Its play page is paywalled and its code deliberately
protected — nothing was copied; we implemented our own versions of
the two ideas its store page advertises.

## Decision

- Parallax skyline: a procedural 120-column distant city (dim `#`
  towers, antennas, warm windows flickering at night) scrolls at
  0.45× camera speed behind the village — pseudo-3D from one extra
  layer.
- Doors: each of the 5 houses opens (stand at the door, up/swipe-up).
  Five hand-different interiors: fireplace with live flame chars +
  cat, kitchen, library, bedroom + cat, and a house with a ladder.
- Elevation: the ladder house has an attic with a telescope; standing
  by it says "the strawberry is up there. somewhere." — the in-world
  nod to /space. Hatch down, rug down = exits.
- Interiors are enclosed boxes: FY line is the wall/floor seam,
  the walk band lives inside the room (first cut had the player
  walking outside the bottom border).
- stampOn accepts bare strings (v1's array-only signature broke on
  single-row stamps — caught by the error hook in the first run).

## Verification

Error hook + 14s screenshots 900×650 and portrait 450×900 (skyline
visible both); real-clock CDP walk test per ADR 0091's lesson:
8×Right → door (14,26), Up → interior (22,23), Down → back outdoors,
ladder → attic, telescope speech bubble confirmed on screenshots.
