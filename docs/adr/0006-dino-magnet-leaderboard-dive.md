# 0006 — Strawberry Dash: magnet power-up, local leaderboard, dive move

**Date:** 2026-07-01
**Status:** Accepted — builds on [[0005]]

## Context

Three cheap, high-value additions requested together: a second power-up, on-device competition, and a skill move — while keeping the one-button, no-backend, self-contained constraints.

## Decision

- **🧲 Magnet power-up.** A rare **blue strawberry** (~6% of spawns). Collecting it pulls nearby strawberries (and gold) toward the dino for ~5s (auto-collect), shown by a blue pulse-aura + a 🧲 HUD icon. Sibling of the gold shield; both can be active (HUD shows both).
- **🏆 Local top-5 leaderboard.** Scores are saved to `localStorage` (`dinoBoard`) with the optional player **name**; the menu and game-over screens show the top 5, highlighting the run you just placed. Pure on-device — perfect for siblings competing on one tablet, and it reuses the existing name field. Overlay was rebuilt (`bigPanel`) to fit the list.
- **⬇️ Dive move (one-button, context-sensitive).** On the ground a tap **jumps**; **in the air a tap fast-falls (dives)** — strong downward velocity, a stretch, then a landing **slam**: shockwave ring + dust + screen shake + a *whoomp*. Lets players land fast to chain jumps or drop onto a low berry, adding skill depth **without a second input**, so the youngest kids are unaffected (jumping alone always works).
- Particle system gained a `ring` type for the slam shockwave; added `sfxDive`/`sfxLand`; debug hashes `#demo` (now seeds magnet + shield + arc) and `#seed` (fake leaderboard).

## Consequences

- Spawn mix now ~7% gold / ~6% magnet / ~42% bat / ~14% berry-arc / ~31% berry — tune if it drifts.
- Still one self-contained file, zero deps, zero network, synthesised sound; leaderboard and name never leave the device.
- Dive is discoverable via the subtitle hint; it slightly raises the skill ceiling (less air-time = tighter landings) without punishing non-divers.
- Follow-ons flagged for the industry-comparison pass: near-miss bonus, milestone feedback, haptics, pause, medals.
