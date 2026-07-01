# 0013 — Strawberry Dash: iOS/Safari audio unlock (+ vibration note)

**Date:** 2026-07-01
**Status:** Accepted — fixes a report of no sound/vibration on iOS Safari

## Context

On iPhone/iPad (Safari), sound and vibration didn't work.

- **Sound:** iOS Safari starts every `AudioContext` suspended and, crucially, does **not** reliably honour a bare `resume()` — it needs an actual buffer played **inside the user gesture** to unlock output. Our `initAudio()` only called `resume()`, so the WebAudio graph stayed muted; the worst hit were the `setTimeout`-scheduled notes (berry/win/start jingles), which fire outside the gesture and never played.
- **Vibration:** iOS Safari does not implement the **Web Vibration API** at all — `navigator.vibrate` is `undefined` on iOS. Our `vibe()` already guards for it, so it silently no-ops. There is no web API to vibrate an iPhone from a page (works only on Android Chrome).

## Decision

- **Audio:** `initAudio()` now, on the first gesture, plays a 1-sample silent `AudioBufferSource` (the standard iOS unlock) in addition to `resume()`, guarded by an `AC._unlocked` flag. `initAudio()` is already called on every tap/jump, so the context also re-resumes if iOS re-suspends it after backgrounding.
- **Vibration:** left as-is (correctly a no-op on iOS); documented as an Apple platform limitation, not a bug.

## Consequences

- Sound should now play on iOS Safari after the first tap — **subject to the device's physical Silent/Ring switch and the in-game 🔊 toggle**, which still apply.
- Vibration remains Android-only by platform; not fixable from the web.
- Could not be reproduced in the local headless (Chromium, not iOS Safari); the fix is the well-established unlock pattern — needs a real device to confirm.
