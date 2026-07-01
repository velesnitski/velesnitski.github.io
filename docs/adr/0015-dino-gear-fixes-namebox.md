# 0015 — Strawberry Dash: gear design fixes, name box, tail-spike mechanic

**Date:** 2026-07-01
**Status:** Accepted — fixes/polish on [[0014]]

## Context

Reported issues after the gear release: tail items appeared on the wrong side, socks were too plain, armour was bland, the tail-spike perk felt like it did nothing, and the name input didn't match the button row.

## Decision

- **Tail items were on the neck, not the tail** — a coordinate-sign bug: the dino is authored facing left (head at −x, **tail at +x**), so tail accessories at negative x rendered on the head/neck. Moved **Tail Bow** and **Tail Spike** to +x (on the tail, which is screen-left once the sprite is flipped) and redesigned them (bow with ribbon tails; a shinier spiked ball).
- **Socks** got detail: a blue cuff, red stripes, and a gold toe cap.
- **Armour** redesigned into a funny/realistic knight breastplate — silver gradient with **gold trim**, a **🍓 strawberry crest**, gold rivets, a highlight, and a **spiked gold-ringed pauldron**.
- **Tail-spike perk now visibly works**: on a dive-landing it fires a cyan **shockwave ring**, clears bats **and rocks** in a wide radius, and pops "💥 ×N" feedback (before, it silently cleared only very-low bats, so it read as broken).
- **Name box** restyled to match the buttons (same fill/rounding/height) and placed inline in the control row (removed the stacked "Name" label).

## Consequences

- Cosmetic-only art changes + one perk-feel fix; no balance change beyond the shockwave being wider/visible.
- The sign-convention lesson: dino-local +x = tail, −x = head; the game flips the whole sprite for right-facing travel.
