# ADR 0075 (v63): local board — best per name, derived from run history

Date: 2026-08-12
Status: accepted
Amends ADR 0009 (local top-5), 0074 (revive de-ghost).

## Context

Owner: "local top looks buggy, leadership mechanics needs audit." The audit
(500-trial fuzz of the exact v62 code) proved the logic CORRECT — no ghosts,
no lost runs, honest highlight. What looked broken was the semantics: the
board was top-RUNS, so one player's name filled all five rows ("alex 300 /
alex 250 / alex 220…") mixed with legacy 'you' entries. Correct ≠ readable.

## Decision

- **Board v2 = best score per name** — the exact semantics of the world
  board (ADR 0055), now consistent across both views. Family win: on a
  shared device each kid holds one row instead of the top scorer filling
  everything.
- **Architecture: raw run history → derived board.** `dinoRuns` stores the
  top-40 runs ever (append, sort, cap); the board is derived (group by
  name → max → sort with name tie-break → top-5). The revive de-ghost
  becomes trivial and provable: splice the exact appended record
  (`lastRunRec` object identity), no index arithmetic.
- One-time migration: existing `dinoBoard` rows seed the history; old key
  left untouched as a rollback path.
- Panel header 🏆 "Top runs" → "Best scores".

## Verification

800-trial fuzz (3 rotating names, 0–2 revives per run, random scores)
against an independent oracle: derived board ≡ true best-per-name, each
name at most once, highlight always points at the just-finished run's row.
The single initial mismatch was tie-ORDER between different names with
equal scores — made deterministic (localeCompare) rather than left
arbitrary.

## Consequences

- Two kids sharing one name share one row — acceptable and explainable.
- `dinoRuns` (top-40) is the future substrate for "recent runs" or
  per-day stats if ever wanted.
- Stamps v63 ×3.
