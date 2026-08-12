# ADR 0077 (v65): closet cards are the buttons; canvas closet hotspot removed

Date: 2026-08-12
Status: accepted
Supersedes ADR 0073 (title-screen dino as Closet button).

## Context

ADR 0073 was built on a misread request. The owner's "click support in icon
too, not on button" meant the CLOSET: wearing/buying an item by tapping its
preview icon/card, not only the small button under it. The dino/game area
must stay pure gameplay — on mobile the v61 dino hotspot covered exactly
where thumbs tap to start a run, hijacking tap-to-start into the closet
("bug!!" report).

## Decision

- **Canvas closet hotspot fully removed** (both the v61 dino bbox and the
  v65-draft 🎽 tag). Tap/click on the stage = gameplay only: revive pill →
  revive, anything else → action(). The Closet opens via its button.
- **Closet cards are click targets**: tapping anywhere on an item card
  (preview canvas, name, rarity) triggers the same handler as its button —
  wear, buy, or the locked toast. Guard `e.target!==btn` prevents
  double-fire from event bubbling; pointer cursor on cards.
- Kept from the draft: stage handlers ignore input while a modal is open
  (hardening against ghost taps under the closet/share overlays).

## Consequences

- LESSON: when a feature request names UI ("icon", "button"), confirm WHICH
  screen before building — a wrong guess shipped a mobile-breaking hotspot
  that survived two versions.
- Stamps v65 ×3 (set in the draft commit, unchanged).
