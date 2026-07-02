# 0049 — Strawberry Dash v48: fixed-timestep simulation (refresh-rate fairness)

**Date:** 2026-07-03
**Status:** Accepted

## Context

Owner: "speed on desktop too high, mobile Safari ok, iOS Low Power Mode is slower — a cheat." Root cause: **frame-locked physics**. The whole simulation advances per `requestAnimationFrame` tick, and rAF fires at the *display's* refresh rate:

- 120/144 Hz desktop monitor → game runs **2–2.4× the intended speed**
- 60 Hz mobile Safari → intended feel (this is where the game was "ok")
- iOS Low Power Mode (caps rAF ≈30–60) → **slow-motion advantage**

## Decision

**Fixed-timestep accumulator** — simulation always runs at exactly **60 steps/second** of real time; rendering runs at whatever Hz the display offers:

```js
simAcc += min(100, now - simLast);            // clamp: no warp after tab switches
while (simAcc >= 1000/60) { simAcc -= 1000/60; if(!paused) update(); }
```

- 120 Hz: one sim step every other frame → intended speed, **smoother rendering as a bonus**
- 60 Hz: identical to before (this build changes nothing on mobile)
- Low Power / 30 fps: **two steps per frame → full speed — the cheat is gone**
- 100 ms dt clamp (max 6 catch-up steps) prevents time-warps after tab switches / stalls

No physics constants were touched — the 60 Hz mobile tuning is the canonical feel; every frame-count mechanic (`t`, phase timers, buffers, i-frames, blink) is now time-correct on all devices for free. The yo-hoo timers moved from render-side to sim-side (they'd have run 2× fast on 120 Hz).

## Consequences

- Fair scores across devices — leaderboard/world-record integrity now means something.
- v48 (footer + beacon + SW cache).
