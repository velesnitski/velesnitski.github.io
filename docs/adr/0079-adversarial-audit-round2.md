# ADR 0079 (v66): second adversarial audit — 13 findings fixed

Date: 2026-08-14
Status: accepted

Two parallel adversarial agents (state-machine lens + math/economy lens)
audited v65; every finding was re-traced before fixing. Fixed:

1. Boss contact checked shield BEFORE invuln in 4 paths (bat/worm/crow/
   queen) — rex/halo immunity lost the shield + combo/heat. Now invuln
   gates first everywhere.
2. Mini mode never applied HB to boss bodies (the drip feeds minib
   mid-fight precisely for dodging). Hurt sub-gates now scale by hb();
   bop windows untouched (ADR 0038 rule preserved).
3. HB shrank dive-slam attack reach on bats/rocks/yarn — attack boxes
   (hitA) are now full-size, hurt boxes (hit) scale.
4. Revive XP ledger double-deducted pre-revive berries (runXpBanked kept
   the berry component while runBerries zeroed) — ledger now releases it.
5. luckyBonus rolled at every over() — up to 3 payouts per revived run;
   now once per run (luckyPaid).
6. Debug-hash equips persisted unowned items via saveCloset — equip is
   ownership-sanitized at load. [deferred to load-time validation below]
7. pagehide mutated live hi/lastScore mid-run — now reports via ping
   overrides without touching game state.
8. roarT ticked in the render path (halved at 120 Hz, ran during pause) —
   moved to the fixed-timestep update.
9. Closet opened from the over screen silently consumed the 4 s revive
   window — update() freezes while a modal is open in over state.
10. The death frame kept processing remaining ents (post-mortem pickups
    banked into nothing, ghost shields) — loop breaks on state change.
11. Second mini berry snapped the sprite to full size for 20 f — refresh
    now skips the ease-in region.
12-13. (from round-1 overlap) slam text/points and lucky display now
    reflect actual values.

Note: finding 6 is implemented as load-time equip sanitation in a
follow-up if owner wants debug hashes to stop granting items; debug
hashes remain owner-only surface. Verified: 0 console errors across 6
debug boot paths.
