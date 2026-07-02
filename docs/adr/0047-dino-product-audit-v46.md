# 0047 — Strawberry Dash v46: product audit + the six missing pieces

**Date:** 2026-07-03
**Status:** Accepted

## Context

Product-designer audit of v45. Core loop, boss cast, economy, retention and juice are strong; the gaps were around the *edges of the experience*: onboarding, death feedback, self-competition, installability, social proof, and a late-game sink.

## Decisions (all shipped)

1. **First-run coach marks (FTUE).** One-time toasts (`dinoTut` flags): TAP-to-jump on the first run, dive on the 4th-ever jump, and the first spawn of a bat / rock / gold / magnet explains itself. No pauses, no overlay tutorial — teaching happens in the stream of play, once.
2. **"Got by …" death feedback.** Every one of the 12 death paths now names its culprit (a sneaky bat 🦇, the Queen's royal tornado 🌪️, granny's flying kiss 💋, …) on the game-over panel — closes the learning loop for kids.
3. **👑 Best-run flag.** Your record physically exists in the world: a gold pennant planted at `dinoX + (hi−score)×50` (score→pixels is a fixed 50px/pt) scrolls toward you as you approach your best — race yourself, see the record coming.
4. **🌍 Players today.** The menu info line shows the live player count (from the telemetry `doGet`, 10-min localStorage cache, only when >1) — social proof from infrastructure we already had.
5. **💎 Diamond skin** — Lv 12, 800 🍓, `starry+glow` (ice sparkle + aura): the late-game berry sink; the wallet has a purpose after Halo (Lv 9).
6. **PWA.** `manifest.webmanifest` + generated 512/192 icons (kawaii dino-head, drawn in the game's own art style) + apple-touch-icon + **network-first** `sw.js` (fresh copy always wins — deliberately so, per the stale-cache lesson of [[0043]]; cache is only the offline fallback). Kids can now **Add to Home Screen** and play offline like a real app.

## Release checklist addition

Every dino release now bumps **three** version markers: footer stamp, beacon `v`, and `sw.js` CACHE name (all `v46` now).

## Consequences

- First-time experience is taught, deaths are explained, records are visible, and the game installs like an app — the "product shell" now matches the game inside it.
