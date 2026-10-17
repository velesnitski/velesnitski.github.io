# ADR 0095 (v69): Sea Mode is unstoppable — cannonball, geyser, treasure, fans

Date: 2026-10-17
Status: accepted
Amends ADR 0094 (the "not immune" clause).

## Context

Owner, after playing v68: the Plesiosaur still dies in the water. The v68
rule "mobility, not armour" asked a kid to execute a two-tap dive under
every jellyfish; in practice the swimmer felt like a worse Rex — a
transform with a timer and a new way to lose. Owner's brief: in the water
he should be as much fun as Rex (invincible), then go back to the ordinary
dino.

## Decision

**Immunity.** While `plesT > 0` the sim tops up `invuln` every frame
(the Rex pattern — every damage site honours it with zero new checks).
The aura glows instead of blinking (`flashing` excludes `plesT`). Immunity
covers the whole mode including the beached flop, so leaving the water
never kills him; the flop is shortened to ≤ 60 f and ends with
"back to dino!".

**Hazards become food.** Jellyfish on contact → *GULP! +6* (combo, heat);
a flying fish within 36 px → *SNAP! +8* (the long neck takes it out of the
air). Submerged, he still passes under jellies for *under! +4*.

**Cannonball.** Every landing in the water as the swimmer (`impact > 6`,
or any dive landing) fires `cannonball()`: a splash shockwave that
destroys jellies and fish within 110 px (*SPLASH! xN +6N*, combo). The
dive is now cannonball + submerge. Loop: leap for the berry trail →
cannonball → pearls below → …

**Geyser leap.** Jumping from underwater launches ×1.22 with a water
column (*WHOOSH!*) — the deep is a springboard, not a hiding place.

**💰 Treasure chest.** ~35 % of lakes (always with `#chest`) place a chest
mid-lake on the floor; submerged pickup within 56 px: +30 score and
+10 🍓 to `runBerries` (banked at the end of the run with the usual hat
bonus). Pearls stay +15.

**🐟 Fish fans.** Three small fish trail the swimmer at belly depth
(`drawFFish` gained `sc`/`dir` parameters). Pure joy, zero mechanics.

**Why the Plesiosaur is still not Rex.** Rex plows through land hazards
for points and cannot touch bosses; the swimmer owns a different stage
(water), scores by movement (×2 swim, leap/cannonball/dive loop) and has
treasure only he can reach. Bosses remain untouched — lakes never
coincide with fights.

## Consequences

- ADR 0094's "not immune" clause is superseded; the hurt-box rule is
  moot for the swimmer (he has no hurt box while transformed).
- First swim coaches once: "in the water NOTHING can hurt you — dive for
  pearls & treasure!".
- Stamps v69 ×3 (footer, beacon, SW cache).
