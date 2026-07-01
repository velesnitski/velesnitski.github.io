# 0004 — Strawberry Dash: game feel (juice), combos, and time-of-day sky

**Date:** 2026-07-01
**Status:** Accepted — builds on [[0003]]

## Context

`0003` shipped the playable runner. It worked but felt flat. The cheapest way to make a small game *feel* good is juice + a light scoring hook, not more content.

## Decision

A game-feel pass on `dino/index.html`, all additive:

- **Forgiving jumps.** Added **coyote time** (jump allowed a few frames after leaving the edge) and **input buffering** (a jump pressed just before landing fires on landing). Input now sets a buffer; the update loop decides when to jump. Makes the game feel fair, especially for kids.
- **Juice.** Squash & stretch on take-off/land, a lightweight **particle system** (berry sparkles, landing dust, hit burst, new-best confetti), **score popups** (`+N`), and **screen shake** on death.
- **Combo multiplier.** Chained berries raise a combo (capped ×5) shown in the HUD; each berry scores `5 × min(combo,5)`, plays a rising pitch, and pops a `+N`. Combo lapses after ~3s without a berry, resets on death — rewards steady play.
- **New-best celebration.** Beating the hi-score triggers confetti + a short fanfare and a "NEW BEST!" banner.
- **Time-of-day sky.** Background palette (sky gradient, sun/moon, stars, hills, ground, clouds) is chosen from the **player's local clock**: dawn (5–8), day (8–18), dusk (18–21), night (21–5, with stars + crescent moon). Purely cosmetic, zero config.
- **Crisp rendering.** Canvas backing store scales with `devicePixelRatio` (capped ×2); all drawing stays in logical 760×360 via `setTransform` each frame — sharp on retina/mobile.
- HUD text now has an outline so it reads on both light and dark skies. Debug hooks: `#fx` (spawn effects), `#bg=<phase>` (force a sky).

## Consequences

- Still one self-contained file, zero deps, zero network; sound remains synthesised.
- All effects are bounded (particle counts small, capped combo) so it stays smooth on phones.
- Sky is driven by device time — no timezone/geo lookup, nothing leaves the device.
- If the file keeps growing, split JS/CSS out (noted since 0003). Palette blending across phase boundaries was left out for simplicity; add later if the hard switch is noticeable.
