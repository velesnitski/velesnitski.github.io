# 0037 — Strawberry Dash: THE DARK QUEEN + crab hop-dance + faster granny roll

**Date:** 2026-07-02
**Status:** Accepted

## Decision

### 👑 The Dark Queen (Battletoads-style arch-villain, funny)
An evil granny sorceress who **owns the MEGA slot** (every 4th encounter, 4 HP) — fight her minions, then face HER. Floats in a purple bell gown with a tiara, grey bun, cat-eye glasses, pearls, and a **knitting-needle scepter**. Kit:
- **Taunt** — hovers and poses ("MWAHAHA!"); bop-able like the bat.
- **Yarn ball** — "knit one, purl two!" → an **angry yarn ball** rolls and hops along the ground trailing thread. Jump it, or dive-slam to **unravel** it (+6).
- **Granny kiss** — "for you, deary! 💋" → a slow **homing kiss** with a heart trail; dodge until it expires (~2.7s).
- **Royal tornado** (the Battletoads signature) — ❗ twirl-up ("WHEE-HEHEHE!") → spins into a purple tornado (only her bun pokes out) and **sweeps across the ground — jump it** → staggers back past you, too dizzy to steer → collapses **dizzy** right in front ("oh, my hip…", ✕ eyes, glasses askew, orbiting stars) → **free stomp** ("OUTRAGEOUS!") → recovers: "ahem! as I was saying…".
New ents: `yarn` (rock-like, slammable), `kiss` (homing, expiring). Debug `#boss=queen[&dizzy|&spin]`.

### 🦀 Crab hop-dance (owner: "still slow, can he jump back and forth?" + "easier")
- Movement is now **bouncy hops** — he skitters in with boing-boing arcs (dust on each landing), and after every jab **springs back out** ~150px and hops back in: a genuine back-and-forth dance. Stomps land **even mid-hop**; a hit sends him **flying back** and he hops right back in.
- **Easier**: always **2 HP** (tutorial boss), a new **rest** beat after hopping in (claws down ~0.5s — clean stomp bait) before the ❗ windup (now longer, 26f), slower jab, **narrower hurt range** (±28px), and an extra-generous stomp envelope. Guard down to 20% chance.

### 🐢 Faster granny roll
Zoom exit 9 → **14 px/f** with faster spin and denser dust — she properly *zooms*.

## Consequences

- Boss cast complete: 4 minions + friendly granny + the Dark Queen arch-villain. MEGA-typed minions no longer exist (the Queen replaced that slot).
