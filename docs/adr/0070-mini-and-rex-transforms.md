# ADR 0070 (v58): Tiny Mode & T-Rex Mode — transform power-ups

Date: 2026-08-12
Status: accepted

## Context

Owner requested two transform mechanics: a special berry that shrinks the
dino (same movement, smaller hitbox, limited time) and a second berry that
turns him into a cute invincible tyrannosaurus for a few seconds.

## Decision

Two new special berries join gold (shield) and blue (magnet):

- **🌸 Pink berry → Tiny Mode** (`miniT`, 8 s): model scales to 58 % with
  20-frame ease in/out; movement and jump physics unchanged. **Only the
  HURT-box shrinks** (`HB=0.6` factor on ambient-hazard collision radii:
  bats, rocks, yarn, kiss, pebble). Boss windows are untouched — they share
  one window for both bopping and being hit (`if(air) bossHit else over`),
  so shrinking them would also shrink attack reach and violate the ADR 0038
  reachability rule. Spawns from score 120, also in the boss-fight berry
  drip (dodging aid is fair).
- **🦖 Green berry → T-Rex Mode** (`rexT`, 6 s): full model swap to a chunky
  kawaii rex (big toothy head, tiny wiggling arms — the joke, back plates,
  green immunity aura that glows instead of blinking). **Immunity is
  implemented as an invuln top-up** (`invuln=max(invuln,2)` each frame) so
  every one of the 8 existing damage sites honors it with zero new checks.
  Rex **plows through** ambient hazards for points (CHOMP/CRUNCH; bats +8,
  rocks +6, yarn +6, kiss/pebble destroyed) but does NOT damage bosses —
  boss fights must stay skill-gated. Never spawns during boss fights.
  Spawns from score 200.
- **One transform at a time**: picking one cancels the other.
- End warning pops at 60 frames left; scale-easing formula guards
  `miniT>480` (the debug value 99999 once produced a ×2000 dino — screen
  filled with its insides).
- Debug: `#mini` / `#rex` boot straight into a run with the transform forced.

## Consequences

- STANDING RULE reaffirmed: any player-size change may only scale hurt
  interactions, never windows that double as attack reach.
- Rex model (`drawRex`) is a separate ~45-line draw path sharing the
  kawaii grammar (catchlight eye, blush) but no cosmetics — hats/gear
  vanish during transformation (cheap and reads as intentional).
- Stamps bumped together: footer v58, beacon v:58, sw.js dash-v58.
