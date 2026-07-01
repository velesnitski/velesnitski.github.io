# 0009 — Strawberry Dash: berry economy, daily missions, closet, dive slam-kill

**Date:** 2026-07-01
**Status:** Accepted — builds on [[0008]]

## Context

The requested "bigger" features: daily missions, unlockable characters, a dive slam-kill, and an online board. Four of the five are native to our zero-backend page and shipped here; the global online board is deliberately deferred (see Consequences).

## Decision

Built a full **meta-progression loop**, all on-device (`localStorage`), plus a skill move:

- **Berry wallet.** Collectibles grabbed in a run are banked to a persistent wallet on game-over (`dinoWallet`) — berries become a **currency**, not just score.
- **Daily missions.** 3 goals/day chosen **deterministically from the local date** (seeded `mulberry32`), so everyone gets the same set with **no server**. Progress tracked live via a `missionEvent(type,amount)` hook fired from gameplay (berries, score, combo, shield, magnet, dive, near-miss, slam). Each completion pays 20 🍓 + a toast; a **🔥 day-streak** rewards returning. Missions now headline the **menu**.
- **Closet / unlockable characters.** A shop modal (HTML) spends the wallet on **7 dino skins** (palette "characters" over the existing sprite — cheap, no new silhouettes), **hats** (panama/party/crown, new canvas art), and **shades**. Owned/equipped persist; each card shows a live-rendered preview. This replaces the old inline recolor/shade/hat toggles.
- **Dive slam-kill (pogo).** Diving onto a bat now **destroys it** (instead of dying) with a hit-stop, burst, shake, points + combo, and a **pogo-bounce** back up to chain kills / reach high berries. Only during an active downward dive; mistimed, bats are still lethal.
- **Challenge-a-friend.** A ⚔️ button shares the existing `#c=<score>` link as a dare — the ethos-correct async competition, zero server.
- IA: **menu = missions**, **game-over = leaderboard + berries earned**.

## Consequences

- Still one self-contained offline file, zero deps/network; all new state is local, no PII leaves the device.
- **Online global board deferred on purpose:** it needs a serverless backend (Firebase/etc.) the site owner must provision (keys, rules), and for a kids page carries cheating + name-moderation + COPPA cost. The challenge links cover the social loop safely; wire a config-gated Firebase board later if global competition becomes a real goal.
- Economy is first-pass tuned (~1 🍓/collectible, skins 30–120, mission 20); adjust if unlock pacing feels off. Debug hashes: `#closet[&rich]`, `#wear=<hat>`.
