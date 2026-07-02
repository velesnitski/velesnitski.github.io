# 0046 — Strawberry Dash: telemetry LIVE (v45)

**Date:** 2026-07-03
**Status:** Accepted

## Decision

Owner deployed `telemetry/apps-script.gs` on his private Google Sheet and provided the web-app `/exec` URL. Activated the beacon:

- `TELEMETRY_EP` set to the Apps Script URL (was `''`/dormant since [[0044]]).
- Beacon payload version 43 → 45; footer stamp → **v45**.

Verified end-to-end: headless game load fired a real `sendBeacon` → row appended in the Sheet → `doGet` aggregates went from `pings:0` to `pings:1, players:1`.

## Notes

- The `/exec` URL in public JS is a **write-only mailbox** — by design (accepted worst case: junk rows). The Sheet itself stays private; Apps Script exposes no caller IPs.
- Owner's dashboard = the Sheet (`pings` tab): `COUNTUNIQUE` for players/day, pivots for devices (UA) and regions (timezone).
- Future: the game can `fetch(TELEMETRY_EP)` (GET) to display "🌍 players today".
