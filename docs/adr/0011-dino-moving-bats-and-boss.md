# 0011 — Strawberry Dash: moving-bat variety + boss bat

**Date:** 2026-07-01
**Status:** Accepted — builds on [[0010]]

## Context

Bats only flew straight, so the threat pattern never changed. Wanted enemy variety and a marquee **boss** encounter — while keeping one-button play and a fair difficulty ramp for kids.

## Decision

- **Moving-bat variety**, introduced by score so difficulty ramps:
  - **straight** (always) — the classic low flyer.
  - **wave** (score > 150) — bobs up/down on a sine as it crosses.
  - **swoop** (score > 350) — starts high and **dive-bombs toward the dino's lane** as it nears, then climbs out (telegraphed by its height).
  Type + `baseY` stored per bat; collision reads the live `y`.
- **Boss bat** — every 500 pts (`nextBoss` 400, then +500 on resolve): a big (2.3×) bat with angry brows/fangs and **3 HP hearts** flies in and runs a state machine: `enter → hover → wind-up → swoop → hover…`. Normal spawns pause while it's active.
  - **Beat it by dive-slamming** during its swoop (pogo-bounce off it, hit-stop + burst), 3 hits. Brief i-frames + blink between hits.
  - A **shield** absorbs one boss touch; otherwise a hit ends the run.
  - Defeat → **+30 🍓 + 50 score + confetti + fanfare**; it flees (no reward) after a long timeout so it can never soft-lock.

## Consequences

- Still one self-contained offline file. Boss is a single global object (not in the entity list) with its own update/draw.
- Difficulty now escalates in two axes (bat *behaviour* by score, plus periodic boss spikes) without adding inputs — jumping/diving already cover everything.
- Swoop bats raise the skill floor a bit; they're gated to later scores so early play stays gentle.
- Tuning knobs: bat-type thresholds (150/350), `nextBoss` cadence (500), boss HP (3), swoop reach. Debug: `#boss`.
