# 0025 — Strawberry Dash: designer cosmetics drop (skins, hats, gear)

**Date:** 2026-07-02
**Status:** Accepted

## Decision

Eight new cosmetics, including the first **special-effect** skins and **cosmetic-only** gear.

### Skins (3)
- **Coral** — rare, 60🍓 (warm coral palette)
- **Lava** — epic, 130🍓, Lv 5 — `glow:true`: a pulsing molten **ember aura** drawn behind the dino
- **Galaxy** — legendary, 320🍓, Lv 8 — `starry:true`: **twinkling white stars** sprinkled across the body (clipped to the silhouette)

### Hats (3)
- **Beanie** — rare, 90🍓, Lv 2 (knit dome + folded brim + pom)
- **Headphones** — epic, 200🍓, Lv 4 (headband arc + red ear cups)
- **Cowboy** — epic, 320🍓, Lv 6 (curved brim + creased crown + band)

### Gear (2, cosmetic-only)
- **Scarf** — rare, 110🍓 (neck scarf with a **fluttering** striped tail)
- **Cape** — legendary, 400🍓, Lv 7 (a flowing **billowing cape** behind the dino)

## Implementation notes

- New skin FX flags (`glow`, `starry`) and gear flags (`scarf`, `cape`) thread through `applyEquip` (globals `skinGlow/skinStarry/scarfOn/capeOn`) and all three `drawDino` call sites (play, closet preview, share card). The closet preview reads the FX from the *previewed* item so locked/other skins still preview correctly.
- Cape + glow draw **behind** the body (right after the shadow); stars draw over the body plates; scarf sits on the neck with the other gear. All motion is driven by `o.t`, so they animate in play and pose cleanly in static previews.
- Cosmetic gear carries `perk:'cosmetic'`, rendered as "✨ just for looks" (no gameplay effect); the perk booleans in `applyEquip` are untouched.
