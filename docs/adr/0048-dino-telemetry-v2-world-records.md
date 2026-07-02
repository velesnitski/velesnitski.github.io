# 0048 — Strawberry Dash v47: telemetry v2 + worldwide high scores

**Date:** 2026-07-03
**Status:** Accepted (requires one Apps Script redeploy by the owner)

## Decision

### Richer signals (game → Sheet)
The `over` ping now carries a full run record: **player name** (sanitized), **death cause** (balance data — which enemy actually kills players), **run duration** (s), berries, **run tier reached**, **boss kills**, best combo, **equipped skin & hat** (cosmetic popularity), wallet, day streak. Two new rare events: **`share`** (virality) and **`buy`** (`item`, `price` — economy analytics). Throttle now applies only to `over` (1/min); rare events always pass.

### 🌍 Worldwide high scores (Sheet → game)
`doGet` now returns, besides today's stats, the **all-time top-10** (best score per device id, with names) computed from `over` rows and **cached 5 min** (`CacheService`) so Sheet scans don't run per-request. The game:
- shows **"🌍 world best N · NAME — you: X"** under the menu XP bar (green **"YOU hold the world record!"** when it's you),
- fires a **🌍 WORLD RECORD!!** toast + confetti the moment a run beats the planet (optimistic client check).
Names are sanitized on both ends (`[\w \-\.]`, ≤10 chars) — stranger-supplied text in a kids' game.

### Schema/compat
`pings` tab grows to 25 columns; the script **extends the v1 header in place** and v1 rows stay valid. Until the owner redeploys, the current deployment simply ignores the extra fields and the game hides the world line (graceful both ways).

## Release

v47 (footer + beacon + SW cache). **Owner action:** Apps Script → replace code with `telemetry/apps-script.gs` → Save → Deploy → **Manage deployments → ✏️ → New version** → Deploy (URL unchanged).
