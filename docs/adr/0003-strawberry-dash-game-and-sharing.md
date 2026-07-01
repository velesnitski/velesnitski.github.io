# 0003 — /dino becomes "Strawberry Dash" (endless runner + sharing)

**Date:** 2026-07-01
**Status:** Accepted — supersedes the tap-to-jump interaction from [[0002]]

## Context

`0002` shipped `/dino` as a static, tap-to-jump character. Next step was to make it an actual little game the kids replay, and let them share a result.

Constraints unchanged: self-contained, no backend, no dependencies, touch-first, offline.

## Decision

Turned `dino/index.html` into **Strawberry Dash**, a one-button endless runner:

- **Gameplay.** The dino auto-runs; a single input (tap / click / **space**) jumps. **🍓 strawberries** float at jump height (collect for points), **🦇 bats** swoop low (jump over them — one touch ends the run). Speed ramps up. Score = distance + berries; **hi-score** persists in `localStorage`.
- **Sound.** Effects are **synthesised with the Web Audio API** (jump/berry/hit/start) — no audio files to host, works offline. A **mute** toggle is saved to `localStorage`. Audio is created on first user gesture (autoplay policy).
- **Sharing (no server).**
  - **📤 Share score** builds a result-card PNG on an off-screen canvas (dino in its current outfit + score + best + game URL) and pushes it through the **Web Share API** with the image file where supported; falls back to text+URL share, then to **clipboard copy + PNG download**.
  - **🔗 Game link** shares/copies a clean invite link to the game.
  - **Challenge links**: shares encode the score as `…/dino/#c=<score>`; opening one shows "🔥 Beat N!" on the menu and a "🔥 Passed!" toast when the player crosses it — turns it into a sibling duel.
  - Optional **name** (local only) is printed on the card for the brag factor.
- **Cosmetics.** Shades / panama / body-plate-belly recolour carry into the game and onto the share card.
- Debug hooks: `#demo` (seed props) and `#card` (preview the share card) — inert in normal play.

## Consequences

- `/dino` is now a replayable game, not a static toy. Still a single self-contained file, still zero deps / zero network.
- No personal data leaves the device unless the player explicitly taps Share; the optional name is local and self-entered.
- Web Share file support varies (best on mobile Safari/Chrome); the clipboard + download fallback covers desktops.
- If the single file grows further (levels, more enemies), split JS/CSS out then. Supersede this record if the game moves off the canvas approach.
