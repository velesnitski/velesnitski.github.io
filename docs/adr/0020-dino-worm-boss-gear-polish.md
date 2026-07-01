# 0020 — Strawberry Dash: worm boss, gear polish, death-restart delay

**Date:** 2026-07-02
**Status:** Accepted

## Decision

- **Second boss is now a WORM (replaces the rock/boulder), with a genuinely interesting hitbox.** It **burrows** — hides underground (a shaking dirt-mound telegraphs where it'll surface), then **erupts in an arc** across the play area as a segmented body. The **head is the only weak point** (it glows): jump and **bop the head** to damage it. The trailing **body segments hurt you** — so it's a *timing/precision* fight (hit the head, not the body), far more interesting than the boulder's "jump on the blob". Funny design: googly eyes, antennae, silly smile. Shares the boss lifecycle/reward via a factored `bossHit`/`bossShieldEat`; alternates with the bat and can be a MEGA.
- **Socks → cute little striped ankle band** (was a full knee-high sock that hid the legs; the user likes the legs visible).
- **Armour → more detailed** knight breastplate: gold belt + buckle, a plate seam, extra rivets with dark rims, a second highlight — on top of the gold trim + 🍓 crest + spiked pauldron.
- **Shield → fancier**: radial-gradient dome, faint hex-grid facets, a double ring, a moving shimmer arc, and 3 orbiting sparkles.
- **Death-restart delay** (~0.85 s): after `over()`, taps are ignored briefly (foot text reads "saving score…", then "Tap to retry") so the **leaderboard/game-over screen is actually readable** before a mashed jump restarts it.

## Consequences

- New boss hitbox model (head vs body) is unique to the worm; keeps one-button play (jump to hit head).
- Debug: `#boss=worm` (live) and `#demo&worm` (frozen for inspection).
