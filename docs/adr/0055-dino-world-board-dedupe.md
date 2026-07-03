# 0055 — world board dedupe (fallout cleanup from the sid bug)

**Date:** 2026-07-03
**Status:** Accepted

## Context

During v50–v52 the LS recursion bug ([[0054]]) regenerated the telemetry
device-id every page load, so the "best per player" world board became "best
per run": 6 of 10 top slots were anonymous `dino` entries, and `players`
counts were inflated. Historical rows can't be un-polluted, but the board
computation can be.

## Decision

`doGet` grouping key changes from raw `sid` to:
- **named players → lowercase name** (`alex` + `Alex` merge; same kid on any device is one entry),
- **all anonymous runs → a single shared "dino" line** (the best nameless run).

Board becomes kid-readable: one line per name + one line for "someone
anonymous". Players-today self-heals for future days (stable sids since v53);
today's count stays historically inflated.

## Owner action

Paste `telemetry/apps-script.gs` → Deploy → Manage deployments → ✏️ → New version.
