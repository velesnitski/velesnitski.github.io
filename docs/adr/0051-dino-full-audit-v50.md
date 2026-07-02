# 0051 — Strawberry Dash v50: full-project audit (two adversarial reviews) + fixes

**Date:** 2026-07-03
**Status:** Accepted

## Context

Owner asked for an audit of everything. Two independent adversarial review passes (game code; PWA/telemetry/ops) plus a release-mechanics/economy check. Everything below was verified against the code before being accepted; all confirmed defects are fixed in this commit.

## Findings → fixes

| # | Sev | Finding | Fix |
|---|---|---|---|
| 1 | HIGH | **Telemetry throttle dropped most first-run `over` pings** — every event armed the 60s window, but only `over` checked it; the boot `load` ping suppressed any death in the first minute (and `buy`/`share` reset it). The Sheet has been undercounting runs | Throttle arms/consumes on `over` only |
| 2 | HIGH | **Dashboard world-top formula scored the build version** — `max(C)` (QUERY letters are absolute; C=`v`, score is E) | `max(E)` + cap on E |
| 3 | MED | **Crow daze-expiry instakill** — on the exact tick `dazed→recover`, contact turned lethal with the crow still beside the standing player (0 warning frames); queen's equivalent transition was already harmless | `recover` joined the harmless-bop branch |
| 4 | MED | **Mission progress never persisted** — `saveMissions()` only ran on completion; partial `prog` (e.g. 20/25 berries) vanished on reload | progress changes mark dirty too |
| 5 | MED | **Unguarded `localStorage` could kill the game** — blocked-cookies/private-mode browsers threw at parse time (blank page) or mid-`over()` (run rewards lost) | `LS.get/set` safe wrapper, all 41 call sites |
| 6 | MED | **SW cached non-ok responses** — a 404 during a deploy window became the permanent offline fallback; also cache bloat (one 193 KB copy per `?query` variant, forever) | `r.ok` guard + canonical path key + navigate-only doc fallback |
| 7 | MED | **`doGet` double full-table scan** — 2 passes/3 Dates per row; degrades with sheet growth | single pass, one Date/row; partitioning documented as the ~100k-row plan |
| 8 | LOW | Over-panel overflowed the canvas with a 10-row world board + got-by line (title/footer clipped) | world board capped at 7 rows |
| 9 | LOW | `#bg=constructor` (inherited-property lookup) crashed the render loop permanently — a shareable freeze link | `hasOwnProperty` guard |
| 10 | LOW | `hitFlash` and kiss-heart particles ticked at render rate (half-duration on 120 Hz; hearts piled up unbounded while paused) | moved sim-side |
| 11 | LOW | Share-card cache key missed `worldRank` → stale/missing 🌍 rank on the card | rank added to `cardKey` |
| 12 | LOW | Manifest `"any maskable"` anti-pattern; missing `id` | split purpose entries + `id` |
| 13 | LOW | `push-private.sh` untracked though README references it; aggregate outputs not git-ignored | committed + ignored |

**Noted, intentionally not fixed:** `#rich` debug wallet persists after a purchase (owner's test tool); Apps Script has no LockService (accepted junk-row policy); today's-best had no sanity cap (now capped as part of #7); manifest vs page theme-color differ (standalone vs browser-tab tints, both intended).

**Verified clean:** boss reachability & state machines, reset() coverage, economy (no double-credit; closet totals 5150 🍓 ≈ 60–100 runs), network-name XSS (canvas-only, sanitized), prototype pollution, accumulator clamp/pause safety, SW scoping, beacon size/CORS/redirects, repo (no tracked secrets/dbs; versions aligned local=live).

## Owner action

Re-paste `telemetry/apps-script.gs` → Deploy → Manage deployments → ✏️ → New version, then run `buildDashboard()` once more (formula fix #2).

## Consequences

v50 stamps (footer + beacon + SW cache). Telemetry counts will visibly *increase* after this release — that's the fixed undercounting, not a traffic spike.
