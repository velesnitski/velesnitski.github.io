# 0005 — Strawberry Dash: shield power-up, berry arcs, homepage link

**Date:** 2026-07-01
**Status:** Accepted — builds on [[0004]]

## Context

After the game-feel pass the game *felt* good but every run played the same (random scatter of berries + bats), and `/dino` was still unreachable from the homepage.

## Decision

Three additive changes to `dino/index.html` plus one to `index.html`:

- **Golden-strawberry shield power-up.** A rare golden strawberry (~8% of spawns, pulsing glow) grants a **shield bubble**. The next bat hit **shatters the shield instead of ending the run** — cyan burst, a brief invincibility flash, a distinct *whoosh* (not the death buzz), light shake. Grabbing gold while shielded banks +15. Adds a rare thing to chase and forgives one mistake — good for young kids. HUD shows a 🛡 while active.
- **Berry-arc patterns.** ~14% of spawns emit a **curved line of 5 strawberries tracing a jump parabola**, so one well-timed hop chains a big combo (×2…×5). This is the classic runner delight — designed collectible moments instead of pure scatter — and it synergises with the existing combo system. `spawn()` now returns the next spawn cadence and adds a gap after an arc so it has room.
- **Homepage discoverability.** A subtle **🦕 easter-egg in the site footer** (`index.html`) linking to `dino/`, at low opacity. Keeps the professional landing page professional while letting the family reach the game from the front page. Trivially removable.
- **Bug fix.** `reset()` did not clear combo / particles / timers between runs (stale confetti/combo could bleed into a new game). Now every restart is clean.

## Consequences

- Still one self-contained file per page, zero deps, zero network; synthesised sound only.
- Spawn mix now ~8% gold / ~44% bat / ~14% berry-arc / ~34% single berry — tune if difficulty drifts.
- All effects bounded (one-hit shield, capped combo, small particle counts) so it stays smooth on phones.
- Homepage now links out to the game; remove the footer 🦕 if the page should stay strictly CV-only. A **magnet** power-up and a local **top-5 leaderboard** remain as cheap follow-ons.
