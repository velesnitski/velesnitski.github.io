# ADR 0074 (v62): revive mechanic — a berry sink with a leaderboard audit

Date: 2026-08-12
Status: accepted

## Context

Owner asked for resurrection mechanics, with a hard constraint added
mid-build: the whole leaderboard pipeline must be re-verified and the
deployed Apps Script must NOT change. Design driver: veteran wallets have
nothing to spend on — revive is the missing berry sink.

## Decision

- **Offer**: after death (past the 52-frame save delay), a gold pill
  "🪽 REVIVE −cost 🍓" shows for 4 s with a draining timer bar. Tap the
  pill (or press R) → run continues; tap anywhere else → normal retry.
  Cost 25 first, 75 second, **hard cap 2 revives per run** (keeps the
  world board skill-dominated). No offer for runs ≤30 points or empty
  wallets. No ads, no payments — ADR 0057 stands.
- **Return without cheese**: 150 frames of invuln, ambient hazards swept
  (boss stays), combo/heat zeroed — death still costs something.
- **Economy correctness**: berries are banked in over(), so revive zeroes
  `runBerries` (no double-pay); XP uses a per-run `runXpBanked` ledger so
  the second over() grants only the delta (no double XP).

## Leaderboard audit (server untouched — verified against deployed doGet/doPost)

| Channel | Verdict |
|---|---|
| World board (hi-based, name-grouped max) | Safe: hi is monotonic; the pre-revive over-row is dominated by the final one. |
| Today's best (over/exit rows) | Fixed client-side: revive resets `lastPing`, so the final over-ping (the higher score) can never be eaten by the 6 s throttle. |
| Local top-5 | Fixed: revive splices out the just-placed entry (`justPlacedIdx`) — no ghost of the unfinished run. |
| Players-today / pings | sid-based, unaffected. |
| Dash QUERYs (deployed) | Best-sellers filters ev='buy' → revive rows excluded; deadliest-causes gets both deaths (both real); world-top uses max(hi). |
| Revive telemetry | Rides EXISTING columns: ev='revive' + item/price — zero schema change, zero redeploy. |

## Consequences

- Two over-pings per revived run is by design (both deaths are real
  events); row counts in `pings` rise slightly.
- If a future mechanic ever needs a new telemetry column, that is the
  moment the Apps Script freeze gets renegotiated — not before.
