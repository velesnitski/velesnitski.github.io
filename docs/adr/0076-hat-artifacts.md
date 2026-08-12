# ADR 0076 (v64): hats become artifacts — one blessing per head

Date: 2026-08-12
Status: accepted
Supersedes the "hats stay cosmetic" rule of ADR 0014.

## Context

Owner asked for artifact-like mechanics on hats/gear. Gear already carries
five passive perks; hats were locked cosmetic by ADR 0014 to keep fashion
free of power. The unlock insight: **hats are a single slot** — whatever
power a hat carries, it cannot stack. One hat = one blessing = the player's
"build choice", with zero combinatorial balance debt.

## Decision

Every hat gets ONE thematic, kid-readable effect (magnitudes +10..50 %,
matched to price/rarity; perk lines now render on hat cards):

| Hat | Blessing |
|---|---|
| Panama 20 | warm start: +12 heat |
| Party 35 | lucky end-run bonus 22 %→44 % |
| Beanie 90 | +25 % combo window |
| Flower Crown 130 | Tiny Mode lasts +50 % (miniDur param) |
| Crown 150 | +10 🍓 per boss defeated |
| Headphones 200 | heat decays 0.15→0.09/frame |
| Wizard 260 | special-berry windows ×1.45 |
| Cowboy 320 | slam kills ×2 points |
| Top Hat 340 | +10 % berries at bank |
| Halo 500 | 😇 guardian angel: survive one fatal hit per run |

Halo intercepts over() before state changes (120 f invuln, once per run,
suppressed during rex — immunity already covers it). It deliberately
synergizes with the revive economy as "the free first save".

## The bug this audit caught

The spawn cascade used OVERLAPPING if-windows; adding the transform
berries (v58) shrank the rock window to ~1 % and widening rex (v59) made
it EMPTY — **rocks silently vanished from the game**. Rewritten as
cumulative disjoint windows (gold 7 / mag 6 / mini 4.5 / rex 4 / rock 9 /
bat 33 / arc 14 / berry rest), which also makes the wizard multiplier
safe by construction. LESSON: threshold if-chains over one random roll
must be cumulative, or every insertion silently starves the branches
below it.

## Consequences

- ADR 0014 amended: hats are artifacts; SKINS remain the purely cosmetic
  layer (identity without power stays available).
- Owned hats grandfather in with their new powers — a free gift to
  veterans, deliberate.
- Stamps v64 ×3.
