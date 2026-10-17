# ADR 0097 (v71): the sky & Pterodactyl Mode — flap, clouds, thunder burps, a nest

Date: 2026-10-17
Status: accepted
Completes the biome trilogy: land / Rex (0070), water / Plesiosaur
(0094, 0095), air / Pterodactyl.

## Context

Owner asked for the sky section with a new dino. Design constraints from
the lake work: a transform must own a stage, be a power fantasy (0095),
and teach exactly one new motor skill.

## Decision

**☁️ Cloud berry** (`pterb`, white-blue with wing marks): pity-spawned once
at score > 180 (never over a lake), then a 3 % window. Pickup → `pteroT =
540` (9 s), cancels the other transforms, launches him (`air`, `vel −9`).

**Flight** replaces the whole jump/dive/gravity block while `pteroT > 0`:
tap = flap (`vel −8.8`, `flapT` snaps the wings), gravity 0.5 capped at
6.5 (floaty), ceiling at `dy −186` (*bonk!*), and the ground is a
trampoline — touching it is a *SKIM! +1* bounce, never a landing. Immune
(invuln top-up, peach aura, no blinking), score ×2. Bats in the way are
*CHOMP! +8*. Balloons are not grabbed mid-flight.

**The sky spawner** runs instead of the ground one while he flies:
☁️ fluffy clouds (bounce: `vel ≤ −8.5`, *POOF! +2*), ⛈ storm clouds
(eaten: *ZAP! +8*), berry rainbows. Eating a storm arms a **⚡ thunder
burp** 22 frames later: a lightning bolt from the pterodactyl to the ground
destroys bats / rocks / jellies / fish / storms within 80 px (*+6 each,
combo*), with a screen flash and a drawn zigzag bolt (`boltT`).

**🪺 The nest.** At `pteroT === 100` a nest on a cloud appears ahead; flying
through it is *🥚 EGG! +20* and the egg is carried in the claws
(`eggCarry`, drawn under the body). At landing the egg is banked
(`eggsRun`, toast) — the hook for ADR 0098.

**Ending.** `pteroT` hits 0 → "landing!", normal gravity resumes and he
lands as the dino (or drops into a lake and floats — the water logic is
untouched because flight never calls it). Bosses and new lakes wait while
he is airborne (`pteroT <= 0` guards), same as the lake rule.

**Model.** `drawPtero`: two membrane wings with finger bones (far wing
darker), barrel body with belly, tucked clawed legs, swept crest, long
beak, kawaii eye; pitch follows `vel`. Props: `drawPuff` (sleepy cloud),
`drawStorm` (angry cloud with a flickering bolt), `drawNest`.

Achievements *🦅 Wingspan*, *⚡ Storm Eater*; mission "Eat {g} storm
clouds". Debug: `#ptero` (`&short` = 1 s flight, `&nest`, `&stormy`).

## Consequences

- The jump/dive/gravity block is now `if(pteroT>0){flight} else {…}` —
  the only place where a transform replaces the base physics.
- Verification note: the headless virtual-time harness becomes
  unreliable past ~150 frames on heavy scenes; long sequences are
  verified with short debug variants (`&short`) rather than long holds.
- Stamps v71 ×3.
