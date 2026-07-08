# 0058 — Strawberry Dash v56: board ghost fix + legacy-record tooling

**Date:** 2026-07-08
**Status:** Accepted (needs one Apps Script redeploy)

## Context

The hi-recovery ([[0056]]) worked — alex jumped 9674 → 16674 (≈7000 points of
lost scores restored) — and surfaced two artifacts:

1. **Ghost duplicate**: `load`/`exit` pings carried no `name`, so a named
   player's boot pings counted as anonymous — the "dino" line mirrored the top
   player's hi (dino 16674 = alex's own device).
2. **Legacy record**: 16674 is almost certainly the owner's pre-v48 desktop
   best, set when 120 Hz screens ran the game at 2× speed. hi-recovery
   faithfully resurrected it; whether it stays is the owner's call.

## Decisions

- **`name` now rides in every ping** (base payload, not just game-over extras).
- **Server-side ghost-killer**: `doGet` first builds a device→name map from all
  named rows, then attributes anonymous rows from known devices to that name —
  retroactively removes ghost duplicates from historical data too.
- **`#resethi` utility hash**: clears the device's stored best (hi, dinoHi,
  stats.best) — the clean way to purge a legacy unfair-era record if the owner
  chooses fairness over grandfathering.

## Owner actions

Redeploy apps-script (new version). Optional: open the game with `#resethi` on
the old desktop to retire the 2×-era 16674.

## Consequences

- v56 stamps (footer + beacon + SW cache).
