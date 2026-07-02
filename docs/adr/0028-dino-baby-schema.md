# 0028 — Strawberry Dash: maximum-cute pass (baby schema)

**Date:** 2026-07-02
**Status:** Accepted

## Context

"It's all about him" — a dedicated cuteness overhaul of the character using kawaii baby-schema principles (bigger head, bigger lower-set eyes, chubbier limbs, micro-details).

## Decision

- **Head +10%** (32×30 → 35×33) with a rounder muzzle (15×13 → 16×14) — bigger head-to-body ratio is the strongest baby-schema signal. All face features re-anchored; **hats ride the bigger head** via a `translate(-1,-5)` wrapper around the whole hat block (no per-hat edits).
- **Eye bigger and lower** (6.3×7.2 → 7×8, moved down 2) — lower eye placement reads younger — plus **three tiny eyelashes** flicking from the top-front lid.
- **Tiny buck tooth** peeking under the smile (white rounded rect) — hidden when the jaw is open (chomp uses the open-jaw art).
- **Blush bigger/softer** (and re-seated on the new cheek).
- **Chubbier legs** (far 22 → 24, near 24 → 26) — stubby limbs; **sock band widened** to match.
- Shades / closed-eye arc / nostril / smile / open-jaw all re-anchored to the new head.

## Consequences

- Silhouette slightly taller/rounder; hitbox unchanged (gameplay untouched).
- All 26 cosmetics verified compatible (hats via the wrapper, face gear re-anchored).
