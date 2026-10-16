# ADR 0094 (v68): Plesiosaur Mode & the lake

Date: 2026-10-17
Status: accepted
Builds on ADR 0070/0071 (transforms, pity spawns), 0078 (funny mechanics),
0038 (hurt-box-only rule), 0052 (act structure).

## Context

Owner asked for a third dino — a Plesiosaur with its own berry — and a
water section. A transform with nowhere to shine is dead weight (Rex works
everywhere), so the two were designed as one system: **the lake is the
stage, the Plesiosaur is its specialist**, and each half still has to be fun
without the other.

## Decision

**🌊 The lake** (a biome, not boss-gated). From score 150, then every
15–25 s, a 440–700 px lake replaces the ground band: sandy banks, 1–3 lily
pads (dry footing), 1–3 🪼 jellyfish bobbing on the surface, one 🐟 flying
fish leaping into the jump lane (score > 220), 🦪 pearls on the floor and a
berry trail over the water. A lake never starts within 30 points of a boss
and bosses wait for dry land (`!lake` guard in the spawn check). Ambient
spawns hold while the lake passes — the lake brings its own hazards.

- Plain dino: the ground gives way, he drops to a float line (`restY` 40)
  and the **🦆 duck ring** pops on; jump ×0.85 with spray; a pad restores full
  footing. Far bank: *DRY! +20* — or *DRY FEET! +30* if he never got wet
  (the pad-hopper's skill bonus).
- Rest heights are now a first-class notion: land 0 · ring float 40 · swim
  68 · submerged 86. Gravity lands on `restY`; stepping off a pad or a bank
  is a real fall (splash), climbing out eases `dy` back up.

**🦕 Plesiosaur Mode** — the 🫧 *sea berry* (aqua, three drifting bubbles).
Guaranteed at the first-ever lake's shore (ADR 0071 pity pattern), then 55 %
per lake, plus a rare land window (2.5 %, score > 150, wizard-multiplied).

- Pickup → `plesT = 600`, cancels Tiny/Rex (one transform at a time), ring
  off. In water he rides at the surface; **tap = leap** (×1.08), **tap in
  the air = a real dive**: the landing becomes `subT = 78` under the surface
  (bubble trail, auto-surface with a *pfff*). Underwater is the safe lane
  past jellyfish (*under! +4*) and the only way to the pearls (*+15*).
  Swimming scores ×2 (distance counted twice). **Not immune** — mobility,
  not armour; Rex keeps immunity as his identity.
- The mode lasts the whole lake (`max(plesT, 30)` while water is present or
  ahead) and then at most 90 frames on land as **fish-out-of-water**:
  involuntary flop-hops every 28 f, wide eyes, sweat drop, "flop!" — comedy,
  no penalty (ADR 0078 lineage).
- Eaten on dry land → **THE TIDE**: a lake rushes in from the right at
  +3 px/f under a rolling crest, so the berry is never a dud. If the previous
  lake is still on screen the tide queues (`tidePending`).

**Rules kept.** Hurt interactions only ever shrink: the swimmer's low
posture moves the hurt-box *top* (`hurtTop()`), the lane dodge is y-based
(`subT`), never a window change; boss windows and attack reach untouched;
cosmetics vanish during the transform (early return, like Rex). Jellyfish
can be bounced (*BOING! +6*), flying fish slammed (*SPLAT! +8*), both chomped
by Rex — every hazard keeps a skill answer.

**Rendering.** `drawPles`: swan neck as an outlined thick stroke with a cream
throat, barrel body with belly and spots, four paddles, short tail, kawaii
eye with lashes and dual catch-lights; pitch follows `vel` on the leap and
wobbles when beached. Water is painted twice — `drawLake` inside `bg()`
(banks, body, floor, light rays, pads, reeds) and `lakeOverlay` translucent
*over* the dino and lake creatures — so whatever sits below the waterline
reads as submerged with zero per-sprite clipping. Lake-bound entities carry
`dx` and ride `lake.x` (the tide moves faster than the world).

**Economy.** Stats `lakes / pearls / ples`; achievements *Nessie*, *Pearl
Diver*, *Lake Hopper*; missions "Cross {g} lakes", "Find {g} pearls"; the
`over` beacon carries `lk` / `pr`.

**Debug.** `#lake` (lake under the dino; `&pad` starts on a pad), `#ples`,
`#ples&sub`, `#tide`, `#flop`, `#hold=N` (freeze at frame N, sim state in
the document title), `#rnd=N` (seeded `Math.random` for reproducible
layouts).

## Consequences

- Verification lesson, extending ADR 0078: headless screenshots alone
  cannot prove gameplay (every run has a fresh layout and no input). The
  `#hold` + `#rnd` title probe gives a deterministic frame-by-frame trace
  (rest heights, lake position, transform timers) that was used to confirm
  float / swim / dive / tide / flop before any pixel was judged.
- Placement lesson: "roll a random spot, retry 10×" starved the narrow free
  gaps between pads — half the lakes shipped without a jellyfish and the
  fish almost never appeared in the first probes. Hazards now use a
  free-slot picker (enumerate 12 px slots that clear every taken position by
  the required gap, then choose one), which also makes the pad/jelly spacing
  guarantee hold by construction.
- Water palette (`wa`/`wb`) joins each time-of-day entry in `PAL`.
- Parked for v69: 🤿 snorkel hat (longer breath), Sheet columns for `lk`/`pr`
  (apps-script.gs HEADERS are fixed; unknown fields are dropped today).
- Stamps v68 ×3 (footer, beacon, SW cache).
