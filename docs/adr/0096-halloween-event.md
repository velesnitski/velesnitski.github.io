# ADR 0096 (v70): Halloween event — pumpkins, ghosts, candy rain, a free Witch Hat

Date: 2026-10-17
Status: accepted

## Context

Owner asked for a seasonal event ahead of Halloween (two weeks out). The
rule for events in a kids' game: **mood and gifts, never difficulty** — the
same bats, the same windows, new clothes on everything, plus something
that only happens this week.

## Decision

`SPOOKY` is a boot-time constant: Oct 24 – Nov 1 local time, or `#halloween`
/ `#nohalloween` to force. While on:

- **World.** A `spooky` palette (purple dusk, pumpkin moon with a carved
  face — `moon:0` suppresses the crescent mask) replaces time-of-day unless
  `#bg=` forces one. Every fourth foreground tuft is a 🪦 gravestone. The
  menu header reads *🎃 Spooky Dash*.
- **Sprites.** Plain berries draw as 🎃 pumpkins (same value, same
  hit-box); ambient bats draw as 👻 ghosts (boss bats keep their fangs).
  Both are draw-only branches — zero gameplay change.
- **Candy rain.** Every mile (100 points) outside boss fights, seven 🍬
  drift down ahead of the dino, sway, land and wait on the ground; each is
  +3 and counts as a banked berry. Ground pickup uses its own
  (`dinoX`, `groundY+dy−40`, r 60) circle because berries never sit on the
  ground otherwise.
- **BOO!** Near-misses pop *BOO!* with a "wooo" synth instead of *NICE!*.
- **🎩 Witch Hat.** New epic hat (240 🍓, Lv 3, perk *+2 points per
  berry*), drawn in the hat chain (crooked cone, brim, purple band, gold
  buckle). During the event it is **gifted** on first launch (`owned`),
  auto-worn if the head was bare, with a once-a-year toast
  (`dinoSpooky<year>`). After the event it stays owned — a souvenir — and
  remains buyable for latecomers.
- Achievement *🎃 Trick or Treat* (play a run during the event;
  `stats.spooky`).

## Consequences

- Event logic is a single constant plus draw branches; removing it is one
  grep for `SPOOKY`.
- Candy is a new entity kind (`candy`) in the pickup cleanup list.
- Stamps v70 ×3.
