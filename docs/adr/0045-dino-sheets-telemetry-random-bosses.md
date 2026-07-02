# 0045 — Strawberry Dash: Google-Sheet telemetry backend + randomized boss order

**Date:** 2026-07-02
**Status:** Accepted

## Decision

### Telemetry: the "db" is the owner's Google Sheet (Option A, chosen)
GitHub cannot receive browser beacons (writes always need a credential; a credential in public JS is public). A **Google Apps Script web app** solves it: its `/exec` URL accepts unauthenticated POSTs and appends rows to the Sheet, with the credential living inside Google (script executes as the owner) — zero servers, zero client tokens. Accepted worst case: junk rows.

- **`telemetry/apps-script.gs`** (paste into the Sheet's Apps Script, deploy as web app "Execute as Me / access Anyone"): `doPost` appends sanitized pings to a `pings` tab (auto-created with headers, drops `v<43` garbage); `doGet` returns today's aggregates as JSON for a future in-game "players today".
- The Sheet itself stays **private** (it was link-shared; owner advised to restrict) — only the write endpoint is public. Apps Script exposes **no caller IP**, so geography remains the timezone proxy. Analysis = the Sheet (`COUNTUNIQUE`, pivots).
- Client beacon unchanged and still dormant: activation = one line (`TELEMETRY_EP='…/exec'`) once the owner deploys and shares the URL.
- `server.py` kit remains as documented Option B.

### Randomized boss order (owner: "starts crab → tortoise → witch every time")
- **Per-run shuffled fight deck** (`drawFight()`: Fisher-ish shuffle of crab/crow/worm/bat, reshuffled when empty, never the same fight twice in a row) — each run opens with a different boss.
- **Organic special slots** replacing fixed modulo: queen appears when gap ≥ 3 with 45%/encounter (guaranteed by gap 5); tortoise when gap ≥ 2 with 40% (guaranteed by gap 4). Queen debut (first-ever, encounter ≥ 2) unchanged.
- Simulated 6 runs: openings varied (crab/crow/worm/bat), queens every 3–5, grannies every 2–4, no repeats.
- Version stamp → **v44**.

## Consequences

- One manual step remains for telemetry-live: owner deploys apps-script.gs and provides the `/exec` URL → flip `TELEMETRY_EP`, bump stamp.
