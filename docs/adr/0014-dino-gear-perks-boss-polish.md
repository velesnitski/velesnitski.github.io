# 0014 — Strawberry Dash: multi-slot Gear (+ perks) & boss polish

**Date:** 2026-07-01
**Status:** Accepted — builds on [[0012]] and polishes [[0011]]

## Context

Wanted more accessories (socks / tail items / armour), then perks for wearing them, plus the boss was too hard.

## Decision

**Multi-slot Gear.** Replaced the single mutually-exclusive accessory slot with an independent **Gear** set (`equip.gear` = per-id booleans) — you can wear several at once. Old `equip.acc` is migrated on load. New items, spanning rarities:
- 😎 **Shades** (rare), 🎀 **Tail Bow** (rare), 🔩 **Tail Spike** (epic), 🧦 **Socks** (legendary), 🛡 **Armour** (legendary, metallic chest-plate + pauldron).
The Gear tab is a multi-toggle (buy → Wear/Worn); previews render the dino with the item on top of current gear.

**Gear = perks (skins/hats stay cosmetic).** Small, thematic, **stackable** buffs so collecting builds a loadout:
- Armour → **start each run with a shield**; Socks → **higher jump**; Tail Bow → **longer combo window**; Tail Spike → **dive-slam shockwave** clears nearby low bats; Shades → **2× near-miss** bonus.
Each perk is shown on its shop card.

**Boss polish (was too hard).** Root cause: it *required* a precise dive to damage. Now it's a **jump-bop** — any airborne contact damages it (Mario-style), so jumping over its swoop both dodges and hits. Also: a clear **❗ wind-up telegraph**, slower/higher swoops, longer hover between attacks, bigger hit window, and more i-frames after each hit.

## Consequences

- Still one self-contained offline file; all gear/perks local. Perks are minor and free (no pay-to-win — it's a kids' game), and stacking rewards the economy.
- Skins/hats deliberately have **no** perks — keeps "looks vs equipment" a clean mental model and avoids balance creep.
- Boss is now beatable by "jump on it 3×," which reads instantly; tune the telegraph/HP if it swings too easy.
- Fixed a crash: armour used a non-existent `O()` helper (only triggered when armour was drawn). Debug: `#gear=a,b`, `#closet&tab=gear`.
