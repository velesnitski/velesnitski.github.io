# 0012 — Strawberry Dash: closet item rarity tiers + legendary items

**Date:** 2026-07-01
**Status:** Accepted — builds on [[0011]]

## Context

The closet items were a flat list. Adding **rarity tiers** gives the collection aspiration and readable value at a glance — the universal loot-color language kids already recognise from every game.

## Decision

- **Four tiers** with the standard colour language: **Common** (grey), **Rare** (blue), **Epic** (purple), **Legendary** (gold). Every skin/hat/accessory now carries a `rarity`; price roughly follows tier.
- **Shop treatment:** each card gets a rarity-coloured border + an uppercase tier label; **legendary** cards get an animated gold **shimmer** (CSS glow pulse) so they feel special.
- **Two new Legendary items** (the "unique" payoff at the top of the economy):
  - **Rainbow** dino (300 🍓) — the body **cycles hue every frame** (`hslHex` from `t`); plates follow, offset. The one animated skin.
  - **Socks** (200 🍓, your example) — white/red-striped socks drawn over the feet.
- New cosmetic flags (`socksOn`, `rainbow`) driven by `applyEquip`; rainbow overrides `bodyHex`/`plateHex` in the render loop (kept as hex so `shade()` still works).

## Consequences

- Still one self-contained offline file; all cosmetics are local.
- Rarity gives the berry economy a clear ladder (common cheap → legendary aspirational at 200–300), which pairs with missions as the long-tail goal.
- Legendary items justify their price by being *special*, not just recoloured — rainbow animates, socks add a distinct silhouette detail. Future legendaries should keep that bar (an effect, not just a palette).
- Debug: `#skin=<id>`, `#wear=<hat>`, `#acc=<id>`.
