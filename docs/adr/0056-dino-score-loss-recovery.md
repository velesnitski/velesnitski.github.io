# 0056 — Strawberry Dash v54: missing high scores — loss analysis + hi-based recovery

**Date:** 2026-07-08
**Status:** Accepted (needs one Apps Script redeploy)

## Context

Owner: "under the same account not everything pushed to the top scores Sheet."
Analysis found two real loss mechanisms:

1. **The 60s over-throttle dropped consecutive runs.** `ping('over')` refused to
   fire within 60s of the previous death — but retry-loop runs typically last
   20–60s, so a large share of real runs (any ending <60s after the prior one)
   silently never reached the Sheet. The guard was pointless: `over()` fires at
   most once per run by state-machine design.
2. **Abandoned runs never reported.** Closing the tab / iOS killing the PWA
   mid-run sent nothing — that score never existed server-side.

## Decisions

- **Throttle 60s → 6s** (double-fire guard only). Every run gets its row;
  Apps Script quota headroom is enormous at this scale.
- **`pagehide` flush**: leaving mid-run (score > 50) sends an `ev:'exit'` ping
  with the current score (`sendBeacon` is designed to survive unload). `exit`
  rows count as runs for today's-best.
- **hi-based recovery (the smart bit).** Every ping carries the device's
  all-time `hi`, so bests from lost runs already live in the Sheet — the board
  just never looked. `doGet`'s board candidate is now
  `max(run sc, row hi)` (both capped ≤30000), same name-grouping. This
  **retroactively restores every score lost to the throttle, the sid bug era,
  or app-kills** using data already collected. The dash-tab world-top formula
  switched to `max(F)` (hi) accordingly. Today's-best stays sc/exit-based
  (a run that actually happened today).

## Owner actions

Paste `telemetry/apps-script.gs` → Deploy → Manage deployments → ✏️ → New
version; optionally re-run `buildDashboard()`. Empirical check: if runs were
lost, board entries (e.g. alex) jump immediately after redeploy — recovered
from `hi`.

## Consequences

- v54 stamps (footer + beacon + SW cache).
- The Sheet's `runs` counts become complete going forward; historical gaps
  can't be backfilled row-wise, but every player's *best* is fully recovered.
