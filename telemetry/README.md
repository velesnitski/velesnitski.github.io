# Strawberry Dash — telemetry

The game ships with a **dormant** beacon: `TELEMETRY_EP` in `dino/index.html` is an
empty string, so **no network call is ever made** until you point it at an endpoint.

## Option A (chosen): Google Sheet as the db — zero servers, zero client tokens

The Sheet's Apps Script web app accepts unauthenticated POSTs and appends rows;
the credential lives inside Google (the script runs as the owner), never in the
public JS. Worst case, accepted: junk rows.

1. Open the Sheet → Extensions → Apps Script → paste **`apps-script.gs`** → save.
2. Deploy → New deployment → **Web app** · Execute as **Me** · access **Anyone**.
3. Set `TELEMETRY_EP='https://script.google.com/macros/s/…/exec'` in `dino/index.html`.
4. Keep the **Sheet itself private** — only the /exec URL is public.

`doGet` on the same URL returns today's aggregates as JSON (future "players today"
in-game display). Analysis = the Sheet: `COUNTUNIQUE`, pivots, charts.

## Option B (alternative): self-hosted collector (no third parties at all)

Python stdlib only — nothing to install.

## How it works

```
browser ──sendBeacon──▶ server.py ──▶ temp.db   (raw, PRIVATE, stays on your box)
                                        │
                        nightly cron ── aggregate.py ──▶ temp-agg.db + stats.csv
                                                          (aggregates only → commit to repo)
```

- Client sends (once on load, max once/min on game-over): build version, a random
  per-device id, score/best/runs/level, userAgent, language, timezone, screen size.
  **No cookies, no names, no location APIs.**
- The server records the request IP into raw `temp.db` (any web server sees IPs) —
  it is **never** exported. Geography in aggregates uses the **timezone** as a
  country-level proxy, so no IP processing or geo database is needed.

## Why the browser can't write to the repo directly

GitHub Pages is static; committing needs a token, and a token in public JS is
public. The repo therefore receives only cron-pushed **aggregates**.

## Deploy (any small box)

```sh
# 1. run the collector (systemd example below)
python3 server.py                      # 127.0.0.1:8787

# 2. TLS reverse proxy (nginx)
location /t { proxy_pass http://127.0.0.1:8787/t; proxy_set_header X-Forwarded-For $remote_addr; }

# 3. flip the game on: set in dino/index.html
const TELEMETRY_EP='https://YOUR-HOST/t';

# 4. nightly aggregates → PRIVATE repo velesnitski/dash-stats
17 3 * * *  /path/to/repo/telemetry/push-private.sh
```

Aggregates live in the **private** `velesnitski/dash-stats` repo (history, diffs,
access control — nothing on the public site). `push-private.sh` needs either
`gh auth login` on the box or a write deploy key (see script header).

> Note: GitHub — private repo or not — cannot *receive* beacons from browsers;
> there is no unauthenticated write, and a token embedded in public JS is
> harvested and auto-revoked within minutes. That's why step 1 exists.

```ini
# /etc/systemd/system/dash-telemetry.service
[Service]
ExecStart=/usr/bin/python3 /opt/dash-telemetry/server.py
Restart=always
[Install]
WantedBy=multi-user.target
```

## Privacy rules (do not bend these)

1. Raw `temp.db` (IPs, device ids, exact UAs) **never** enters the repo — it is
   git-ignored here. Publish only `temp-agg.db` / `stats.csv`.
2. Players include children: keep the payload minimal, delete raw data on a
   schedule (e.g. `DELETE FROM pings WHERE ts < strftime('%s','now','-90 days')`).
3. If you ever add fields, re-read rule 1.
