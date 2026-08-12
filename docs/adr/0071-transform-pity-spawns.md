# ADR 0071 (v59): guaranteed first transform berries (pity spawns)

Date: 2026-08-12
Status: accepted
Amends ADR 0070.

## Context

Owner playtest: never saw the green rex berry. Math agreed — 3.5 % per
spawn tick gated behind score 200, minus the time spent in boss fights
(where normal spawns pause and rex is excluded by design), makes the
game's flashiest mechanic a coin flip even for a good run. A wow-mechanic
must not hide behind RNG.

## Decision

- **Pity spawns**: the first 🌸 pink berry of a run is guaranteed at
  score >140, the first 🦖 green berry at score >250 (`miniSeen`/`rexSeen`
  flags, reset per run). Random spawns thereafter; random spawns also set
  the flags so the pity slot isn't wasted.
- Random rex window widened 0.21→0.23 (3.5 %→5.5 %) for repeat encounters.
- **RAWR!! splash**: rex pickup now fires a 44-frame comic-book splash —
  900-weight 64px text, spring scale-in (0.3→1.25→1), slight tilt, triple
  stroke (dark outline + light inner). Progress factor is clamped to [0,1]:
  an unclamped debug value produced a letter-filling-the-screen frame —
  the same out-of-range failure as the ×2000 mini dino in ADR 0070.
  Debug `#rex&roarfreeze` holds the splash at peak for screenshots.
- Stamps v59 ×3.

## Consequences

- Every run that reaches 250 gets exactly one guaranteed RAWR moment —
  discovery is deterministic, repetition stays lucky.
- LESSON: gate flashy content by score, not by RNG alone — same class of
  bug as the unreachable Dark Queen (ADR 0041), found the same way
  (owner playtest, then math).
