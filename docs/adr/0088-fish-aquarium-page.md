# ADR 0088: /fish — the whole page is an aquarium

Date: 2026-08-28
Status: accepted

## Context

Owner liked the aquarium effect on a joke landing (shuka.site) and asked
for a /fish page. Analysis of their build showed the trick worth taking:
emoji fish swim across the whole page treating real DOM boxes (cards,
headings, paragraphs) as obstacles, with boids-style neighbors and
cursor reaction. The VPN-parody framing was deliberately NOT taken.

## Decision

Third single-serving page of the triptych (dino — play, rocket — throw,
fish — care). Vanilla canvas 2D, no deps:

- 16 kawaii fish drawn in the site's grammar (outline, catchlight,
  blush), five palette variants incl. one strawberry fish with seeds.
- Shuka trick, our way: `[data-fish-obstacle]` rects (the deadpan card,
  the ??? popup) are steering obstacles, refreshed every 2s. With one
  card a MutationObserver would be overkill — kept a simple interval.
- Boids-lite: wander + separation + edge/obstacle steering. At n=16 the
  O(n²) neighbor pass is 256 checks — the spatial hash grid the original
  needs for its fish count is deliberately omitted.
- Cursor: calm pointer intrigues (weak attract), fast pointer scares.
- Tap = crumb: sinks with sway, nearest fish race in, chomp animation +
  bubbles. Feed count and last visit live in localStorage → deadpan
  memory line ("fed N times. the fish missed you. dramatically.").
- prefers-reduced-motion: fewer fish, slower drift, no rays/ambient
  bubbles. Blur/pagehide handled by rAF being tab-throttled; no sim
  clock to pause (stateless steering, dt-clamped at 50ms).
- Telemetry: ev:'fish' load beacon, shared dinoSid.

Homepage gets the third easter egg, behavioral tier per ADR 0069's
hierarchy: triple-click the © line → /fish/. Two invisible footer links
already exist; a third would crowd the line.

## Verification

Steady-state screenshots (14s virtual time) at 900×650 and portrait
450×900 per the ADR 0086 checklist; synthetic pointerdown taps
confirmed crumbs, convergence, and the "fed 3 times." memory line;
error hook clean.
