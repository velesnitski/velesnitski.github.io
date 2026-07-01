# 0010 — Strawberry Dash: location-based dynamic weather

**Date:** 2026-07-01
**Status:** Accepted — builds on [[0009]]

## Context

Wanted the in-game sky to reflect the **player's real local weather** — a delightful "it's raining in the game because it's raining outside" touch. Constraint tension: our page has been fully offline/self-contained, and this needs live data + location.

## Decision

Added optional dynamic weather using **free, no-key, HTTPS APIs**:

- **Location without a permission prompt:** IP geolocation via `ipapi.co/json/` (city-level lat/lon). Avoids the intrusive `navigator.geolocation` prompt on a kids page.
- **Weather:** Open-Meteo `current_weather` by lat/lon (free, no key, CORS). WMO weather code → `clear / clouds / rain / snow / fog / thunder`.
- **In-game effect** (`drawWeather`, layered over the time-of-day sky): rain = blue tint + falling streaks; snow = cool tint + drifting flakes; fog = white haze; thunder = rain + occasional lightning flash; clouds = grey wash. A small weather emoji shows on the menu; a one-time toast announces it.
- **Cached ~90 min** in `localStorage` so it doesn't refetch every load.
- **`#wx=<cat>`** hash forces a category (testing).

## Consequences

- **Graceful degradation preserves the ethos:** any failure (offline, blocked, rate-limited) leaves `weather='clear'` and the game is completely unaffected. Weather is a pure enhancement, never a dependency.
- **New privacy surface (be transparent):** this is the first feature that makes third-party network calls. `ipapi.co` sees the request IP (as any web request does) and returns city-level location; we store only the weather *category* + timestamp locally — no coordinates, no PII, nothing displayed. Acceptable for a kids page, but it's the one thing that isn't purely local. To harden: self-proxy or drop IP-geo for the (prompting) Geolocation API, or gate weather behind an opt-in.
- Effects are bounded (≤64 rain streaks / 52 flakes) and procedural (no particle arrays) — no perf cost.
