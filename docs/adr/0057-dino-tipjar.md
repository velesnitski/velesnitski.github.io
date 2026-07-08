# 0057 — Strawberry Dash v55: humble tip jar (PayPal donate)

**Date:** 2026-07-08
**Status:** Accepted

## Decision

Monetization for a kids' game done the humble way: a single **tip-jar pill**
below the control panel — `🍓 Feed the dino · support a dad-made game` —
linking to the owner's PayPal donate page (new tab, `rel=noopener`), styled in
the page's own dark-pill language (gold accent, muted subtitle).

Deliberately **not** done: in-game prompts, pay-for-berries, game-over
interstitials, or anything a child can click into a checkout mid-play. The
game stays 100% free and pure; donating is a parent's footer-level action.

Clicks are counted via a `donate` telemetry event (rare event, bypasses the
over-throttle) — conversion will be visible in the Sheet.

## Consequences

- v55 stamps (footer + beacon + SW cache).
