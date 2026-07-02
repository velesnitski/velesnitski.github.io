# 0044 — Strawberry Dash: self-hosted telemetry scaffold (no third parties)

**Date:** 2026-07-02
**Status:** Accepted (dormant until an endpoint is deployed)

## Context

Owner wants to measure players — geo, device models, game stats — "without any third-party tools, temp.db in repo". Two hard constraints shaped the design:

1. **GitHub Pages is static.** The browser cannot write to the repo; committing needs a token, and any token in public JS is public (harvested/revoked within minutes). There is no safe client→repo path.
2. **Privacy.** Players include children; raw IPs/geo in a public repo would publish personal data. Raw data must stay private; the repo may only ever hold aggregates.

## Decision

**Architecture:** `browser —sendBeacon→ own server (server.py) → private temp.db —nightly cron→ aggregate.py → temp-agg.db + stats.csv → committed to repo`.

- **Client beacon** (in the game, **dormant**: `TELEMETRY_EP=''` → zero network calls): one ping on load + max one per minute on game-over, carrying build, random per-device id, score/best/runs/level, userAgent, language, timezone, screen. No cookies, no location APIs.
- **`telemetry/server.py`** — Python **stdlib-only** collector (127.0.0.1:8787, CORS-locked to the Pages origin, 2 KB body cap, X-Forwarded-For aware) appending to SQLite `temp.db`. The request IP lands only here and is git-ignored.
- **`telemetry/aggregate.py`** — produces publish-safe `temp-agg.db` + `stats.csv`: daily pings/unique players/runs/avg+max score, device models (UA-parsed: Android exposes models, iOS only "iPhone + iOS version" — platform limit), **regions via browser timezone** (country-level proxy; no IP processing, no geo DB), languages. No IPs, no sids, no raw UAs survive.
- **`telemetry/README.md`** — deploy (systemd + nginx snippet), the cron line that commits aggregates ("temp.db in repo" = the sanitized `temp-agg.db`), and three non-negotiable privacy rules incl. 90-day raw retention.

Smoke-tested end-to-end: 3 beacons → collector → aggregates showing 2 players, SM-S918B + iPhone(iOS 17), Europe/Minsk + Asia/Dubai, avg 217.5 / max 315.

## Consequences

- Shipping this changes nothing for players until the owner deploys `server.py` on his own box and sets `TELEMETRY_EP` (then bump the version stamp).
- The existing ipapi.co weather call remains the game's only third-party request.
