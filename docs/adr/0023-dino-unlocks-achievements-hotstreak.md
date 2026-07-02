# 0023 — Strawberry Dash: level-gated unlocks, achievements, hot-streak multiplier

**Date:** 2026-07-02
**Status:** Accepted

## Decision

Three depth systems that reward the meta-progression from [[0022]] and deepen the moment-to-moment loop.

- **Level-gated unlocks** — premium closet items now carry an `lvl` requirement (Shadow skin Lv 3, Rainbow Lv 6, Crown hat Lv 4, Tail Spike Lv 3, Socks Lv 5, Armour Lv 6). Below the requirement the card is dimmed and its button reads `🔒 Lv N` (buying/wearing is refused with a toast). **Owned items are grandfathered** (always wearable) — only the *purchase* is gated. This gives the XP bar a concrete payoff.
- **Achievements** — a new **🏅 Closet tab** with 12 badges (First Steps, Marathoner, Getting Good, High Roller, Berry Farmer, Boss Slayer, Combo King, Daredevil, Rising Star, Veteran, Springfoot, Slammer). Conditions are checked against lifetime stats/hi/level; earned badges persist in `localStorage.dinoAchv`. Newly-earned ones **toast + confetti** at game-over; already-met badges are backfilled silently at load.
- **Hot-streak "heat" multiplier** — a `heat` meter (0–100) builds on berries (+9), near-misses (+16) and skill kills (slam/smash), and **decays** ~9/s. At heat ≥55 points earn **×1.5**, at 100 **×2** — shown as a flame HUD bar with a `🔥 HOT ×1.5` / `🔥🔥 ON FIRE ×2` label. Taking a hit (shield pop) **resets heat to 0**, so it rewards clean, aggressive chaining.

## Consequences

- Multiplier applies only to berry/near-miss/kill point bonuses (not passive distance), so it can't distort the distance score wildly.
- Achievements are stateless-checkable, so the tab is always correct even if the earned-set is cleared.
- Debug: `#hot` seeds a maxed heat bar.
