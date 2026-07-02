# 0027 — Strawberry Dash: wardrobe art audit (cape, scarf, shades)

**Date:** 2026-07-02
**Status:** Accepted

## Context

Follow-up to the character polish in [[0026]]: an art audit of all 26 cosmetics at full card scale. Most items read well; three failed.

## Decision

- **Cape (legendary, 400🍓) — was invisible.** The old shape sat mostly inside the body silhouette, so only a small red sliver peeked out behind the haunch. Rebuilt geometry: the cape now **attaches at the shoulder and billows up above the back plates** (top edge ≈ −142, above the plate row) and **sweeps out beyond the tail**, with a wavy hem, an inner shadow fold, and a top sheen. It finally has legendary presence.
- **Scarf (rare, 110🍓) — read as a red tube floating on the chest.** Rebuilt as a proper **wrap: two layered bands crossing the neck** perpendicular to its axis, a **knot** at the front, and a **hanging tail that flutters** with white knit stripes and a fringe.
- **Shades — read as an eye-patch.** The flat near-black lens got a **navy gradient** (sky-reflection top → dark bottom) plus a **top rim light**; the animated glint sweep is unchanged.

Verified passing (no changes): panama, party, flower, crown, beanie, wizard, headphones, cowboy, top hat, halo, bow, spike, socks, armour bib.

## Consequences

- Pure art; positions/perks/prices unchanged. All three items animate via `o.t` as before.
