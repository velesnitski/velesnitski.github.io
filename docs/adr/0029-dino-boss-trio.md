# 0029 — Strawberry Dash: boss trio (crab, tortoise, crow)

**Date:** 2026-07-02
**Status:** Accepted

## Decision

Three new encounters, each with a distinct design job:

- **🦀 Crab — the funny ground boss.** Scuttles in sideways with googly bouncing eyestalks, snapping claws, blowing bubbles. Loop: comedic sidle toward the dino → claws-up ❗ telegraph → **leaps at you claws-first**. The rule inversion is the hook: **stomp him while he's grounded** (any airborne contact = hit), but touching him **mid-leap hurts** — air is no longer automatically safe.
- **🐢 Tortoise — the friendly anti-boss (pacing breather).** Granny Tortoise strolls through on the boss slot every 3rd encounter and **never deals damage**. **Bounce on her shell up to 3×**: each boing pays +5 🍓/+10 score, and the 3rd gifts a **shield**; then she blushes, tucks her head in shyly (^^ eyes, ♡) and toddles off. A 🍓×N counter floats above her instead of hearts. Classic tension-release valve between fights.
- **🐦‍⬛ Crow — the bat's harder cousin.** Adds three layers over the bat: **feint dives** that share the real dive's ❗ telegraph but pull up early (mind games — jumping at a feint wastes your position), **pebble bombing runs** (flies over your head and drops a falling pebble projectile, new `ents` kind), and **enrage** — every hit makes its real swoops ~25% faster. Same jump-bop weak point.

## Mechanics/plumbing

- Rotation: fights cycle `worm → bat → crab → crow` (`fightCount`); **every 3rd encounter slot is the tortoise**; MEGA every 4th encounter applies to whatever fight type is up (MEGA CRAB etc.).
- `makeBoss(type,hp,mega)` factored out; debug hashes `#boss=crab|tortoise|crow` seed each directly.
- Ground bosses got **contact shadows** (crab's shrinks mid-leap) and sit on the dino's true foot line (`groundY-16` baseline).
- Pebble: falls with gravity, dusts on landing, shield-or-death on contact.

## Consequences

- Boss variety: 5 encounter types + mega variants; tortoise adds the game's first purely positive event.
- `stats.bosses` / missions unchanged (tortoise isn't a fight, doesn't count as a boss kill).
