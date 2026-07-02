# 0040 — Strawberry Dash: full-cast beatability audit (triple-check)

**Date:** 2026-07-02
**Status:** Accepted

## Context

After the queen ([[0038]]) and crab ([[0039]]) proved unbeatable from unreachable damage windows, the owner asked for a triple-check of every boss. Worked each one through with real numbers (`dinoX=168`, `groundY=286`, jump apex `dy≈−141`, `dcy=feet−58`).

## Findings

| boss | damage path | math | verdict |
|---|---|---|---|
| 🪱 worm | head arcs through `dinoX` at `groundY−98`; bop `dy∈(−64,−11)`, ~15-frame horizontal window | ✅ beatable |
| 🦀 crab | rest at `+38 < r56`; feet window 82px; ~56 frames of bait per cycle | ✅ beatable |
| 🐢 tortoise | walks through the player; `dy∈(−80,−6)` | ✅ |
| 👑 queen | dizzy at `+34 < 52`, feet window 84px; tornado jumpable; kiss/yarn dodgeable; no deadlocks | ✅ beatable |
| 🦇 bat | swoop reaches `dinoX+30`, but bop box `bh=48` at swoop bottom → `dy∈(−26,72)` ≈ **2–4 frame window**, and it's the bat's only damage path | ⚠️ too tight |
| 🐦‍⬛ crow | **crash fired at swoop END — the sine had returned him to his start (~x620). The dazed "punish window" landed 420px away and was NEVER reachable.** Dazed bop box was also center-based → ≈1 frame tall | 🔴 broken |

## Decisions

- **Crow whiff-check moved to the swoop bottom** (`pt === round(dur·0.55)`, s≈0.99): a missed dive now face-plants him **right beside the player** (dazed at ≈`dinoX+23`).
- **Crow dazed bop → feet-based** (`|Δx|<bw+8`, feet ∈ `b.y−60…b.y+20` → dy window 80px falling).
- **Bat bop box widened** (`bw 40→46`, `bh 48→54`; mega values likewise) — roughly doubles the bop presence frames; standing under the swoop still hurts, so dodge-or-bop stays intact.
- State machines checked for deadlocks/stranding (hop targets converge, all phases cycle, defeat/flee paths null the boss): none found.

## Consequences

- Every boss now has a **verified-reachable, ≥4-frame** damage window and completes within its timeout.
- Standing rules (memory): damage windows must come to `dinoX`; vertical hit windows must be feet-anchored, not center-distance.
