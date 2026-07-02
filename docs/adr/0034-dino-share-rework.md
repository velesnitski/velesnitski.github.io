# 0034 — Strawberry Dash: share button rework (gesture-safe pic + link)

**Date:** 2026-07-02
**Status:** Accepted

## Context

Owner: share "works but strange". Three real Web Share API bugs:

1. **Lost user activation** — the PNG was built with an async `canvas.toBlob` *inside* the click handler, and `navigator.share()` ran in its callback. By then the transient activation had often expired (iOS Safari is strict), so the native sheet failed nondeterministically into the fallback.
2. **`files` + `url` passed together** — iOS drops `url` when `files` are present, so recipients got a picture with **no link**.
3. **Ambush fallback** — on desktop (no `navigator.share`), clicking Share instantly force-downloaded a PNG and copied text simultaneously.

## Decision

- **Pre-rendered card cache** (`cardCache` keyed on `lastScore|hi|pName|equip`). The card is rebuilt in the background at game-over, at boot, on closet close, and debounced on name edits — so when Share is tapped, the `File` already exists and `navigator.share()` fires **inside the gesture**.
- **Link rides inside the text** when sharing a file (`text + ' ' + url`), never as a separate `url` next to `files` → iOS recipients always get the challenge link. Text-only native share still uses `{title, text, url}`.
- **Share sheet fallback** (desktop/unsupported): a proper modal with the **card preview** and three deliberate actions — 🔗 Copy link (text+challenge URL), 🖼 Copy image (`ClipboardItem`, hidden when unsupported), ⬇️ Save card. No more surprise downloads.
- Share modal blocks the space-key game input like the closet does; `AbortError` (user closed the sheet) stays silent.

## Consequences

- One canonical share URL: the challenge link `#c=<best>`.
- Debug: `#share` opens the sheet with a seeded card.
