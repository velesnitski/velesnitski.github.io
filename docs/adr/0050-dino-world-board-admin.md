# 0050 — Strawberry Dash v49: the database put to work (world board + admin layer)

**Date:** 2026-07-03
**Status:** Accepted (script part needs one redeploy + two one-time runs)

## Context

Telemetry v2 gave us a live Sheet database with per-run records. This ADR builds the features *around* it.

## In-game (v49)

- **🌍 World top-10 on the game-over screen** — the board now **alternates every ~4s** between "🏆 Top runs" (local) and "🌍 WORLD TOP" (names from real players via `doGet`); your own entries are highlighted gold with a ⭐. Zero new UI surface.
- **World-rank toast** — a run that lands in the global top-10 (but isn't the record) toasts `🌍 world #K!`.
- **World rank on the share card** — `Best 1234 · 🌍 world #2` next to the best score: the brag line that makes kids share.

## Admin layer (in `telemetry/apps-script.gs`, run once from the editor)

- **`buildDashboard()`** — creates a `dash` tab of live QUERY formulas: players/runs/best per day (14 d), **💀 deadliest enemies** (death causes), **🎽 most-worn skins**, **🛍 best sellers** (buy events), 🌍 world top-10. Self-updating forever.
- **`setupDigest()`** — installs a daily 09:00 trigger; **`dailyDigest()`** emails the owner yesterday's players/runs/best (+who), deadliest enemy, shares & buys. Quiet days send nothing.
- **Sanity cap** — world-board computation ignores scores > 30000 (junk-row defense for the public write endpoint).

## Owner actions

1. Apps Script: paste updated `telemetry/apps-script.gs` → Deploy → Manage deployments → ✏️ → New version.
2. In the editor, run `buildDashboard()` once, and `setupDigest()` once (grant mail permission).

## Consequences

- The Sheet is now a product surface (world board), an analytics dashboard, and a daily report — one database, three faces.
- v49 stamps (footer + beacon + SW cache).
