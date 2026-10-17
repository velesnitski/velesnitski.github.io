# ADR 0098 (v72): eggs & baby companions — the thing you come back to check on

Date: 2026-10-17
Status: accepted
Builds on ADR 0078 (duckling fan), 0095 (lake chest), 0097 (sky nest).

## Context

The game had plenty to *do* and nothing to *care about* between sessions.
Owner approved the egg loop: eggs come from the two new biomes, incubate
over runs, hatch into tiny dinos that run with you and grow on what they
eat. Kids come back to check on the egg — that is the retention mechanic.

## Decision

**Sources.** The sky nest (0097) banks an egg at landing; half the lake
chests (0095) hide one. `addEgg()` is the single entry point; the nursery
holds at most **3** eggs+babies — beyond that an egg becomes +25 🍓 with
a "nursery is full" toast, so the cap never feels like a loss.

**Incubation.** Every *real* run (score ≥ 30) warms every egg by one;
after **3** runs the egg hatches on the over screen: confetti, a toast
("IT HATCHED! a baby Rex will run with you!"), kind chosen at hatch from
`bronto / rex / ples / ptero` — the surprise is the point.

**Babies.** Drawn with the grown-up models at scale 0.30 → 0.36 (fed 20)
→ 0.42 (fed 60) via `drawBaby`, trailing the runner in a tight conga line
(`babyX(i) = dinoX − 104 − 22 i`, nearest on top — there are only 168 px
behind the dino), following `dyHist` like the duckling, so they jump late,
float in the lake, and fly behind the pterodactyl (yes, a baby Bronto in
the sky — intentional). They snack on berries the runner missed (+2,
counted as banked, `fed++`, "mine! 🍓" every 7th), sneeze now and then
("achoo! 🤧"), cry "😢" when you fall — and are never lost. A Bronto baby
earns a party hat at fed 60. Baby Rex skips the immunity aura
(`noAura`).

**Surfaces.** Menu panel gains a nursery line ("🥚 egg · hatches in 2
runs   🐣 Nessie · Rex", `headH` +18); the Closet stats tab lists eggs and
babies; achievements *🐣 Hatchling*, *🪺 Full Nest*.

**Persistence.** `dinoNest = {eggs:[{runs,src}], babies:[{kind,fed,born}]}`,
saved on egg events and at every run end (fed counts). Unknown kinds are
dropped on load.

**Debug.** `#egg` (an egg one run from hatching), `#baby=rex,ptero`
(`&fed` = grown), `&chestegg` (every chest hides an egg).

## Consequences

- Companions share one pattern (duckling, babies): position from
  `dyHist`, snack radius, no collision — safe by construction.
- The egg source rate (≈ one sky nest per flight, half the chests) with a
  3-run incubation means a regular player hatches a first baby within a
  few sessions and fills the nest in a week or two — then eggs turn into
  berries, which keeps the lake/sky rewards meaningful.
- Stamps v72 ×3.
