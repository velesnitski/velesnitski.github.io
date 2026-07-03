# 0052 — Strawberry Dash v51: boss act structure (the Queen becomes an act finale)

**Date:** 2026-07-03
**Status:** Accepted

## Context

Owner: "queen is too often — minion rotation, then queen; after pets, then queen." Under the organic slots ([[0045]]) she could return with only 1–2 fights between visits, which cheapened the arch-villain.

## Decision

**Deterministic act structure** (`sinceQ` position counter) — one act = 6 encounters:

```
[ minion · minion · minion · minion ] → 🐢 granny → 👑 THE QUEEN → (next act)
   4 fights, per-act shuffled deck,      breather +     act finale
   all four appear once, no repeats      shield gift
```

- The Queen now appears **exactly every 6th encounter** (was every 3–5) and her arrival is *earned* — you clear her minions first, Battletoads-style.
- **Granny is the pre-boss beat**, deliberately: a breather that can hand you a shield right before the climax (resource-before-boss pacing), and her toast foreshadows: *"hurry deary, HER MAJESTY is coming!"*
- **First-ever debut kept** (encounter ≥2, once per player) — it resets the act counter, so a full act passes before her second visit.
- Simulated: veterans get `[4 shuffled minions] 🐢 👑` repeating with different minion orders per act; newcomers get fight → debut → full act → finale.

## Consequences

- `lastQ/lastT` probability plumbing removed; `sinceQ` reset per run.
- v51 stamps (footer + beacon + SW cache).
