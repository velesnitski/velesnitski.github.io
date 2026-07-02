# 0030 — Strawberry Dash: KO animation, idle quirks, run-tier swag

**Date:** 2026-07-02
**Status:** Accepted

## Decision

Three character-life systems, all inside `drawDino` options + tiny game-loop state:

- **KO / game-over animation.** On death the dino now **tips back** (eased `rot` over ~16 frames + an impact squash), shows **✕ eyes** (they beat sunglasses), an open dazed maw with a **lolling wobbling tongue**, and **3 dizzy stars orbiting** his head. Replaces the old "closed eyes" death.
- **Funny idle quirks.** On the title screen he does a little **happy hop** every ~4 s; during a run he briefly **pants with his tongue out** every ~10 s (grounded only).
- **Run-tier swag — the longer the run, the more dino stuff.** Purely visual, resets each run; each tier stacks on the previous, announced with a pop + sparkle + power sfx:
  | Score | Tier | On the dino |
  |---|---|---|
  | 150 | 💨 SPEEDY! | white speed streaks trailing the tail |
  | 300 | 🎽 HEADBAND! | red determination headband w/ fluttering ribbon tails |
  | 500 | ✨ GOLDEN! | pulsing golden champion aura |
  | 800 | 🔥 BLAZING! | flickering flames at his feet |

  The swag persists on the KO pose (you see what you earned), and the thresholds double as visible "how far did I get" feedback for spectating siblings.

## Consequences

- `drawDino` gains `ko`, `rot`, `tier` options; closet/share-card unaffected (tier passed only in play/over).
- Debug: `#demo&tier=N` forces a tier; `#ko` forces the death pose.
