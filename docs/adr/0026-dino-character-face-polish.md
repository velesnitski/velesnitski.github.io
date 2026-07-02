# 0026 — Strawberry Dash: character art polish (face + body form)

**Date:** 2026-07-02
**Status:** Accepted

## Context

Art-director review of the base dino: the eye was too small and single-highlight, there was no cheek blush (the cheapest/strongest "cute" signal), the body read flat (top-light nearly invisible), the skin had no texture, and the eye catch-light floated over the eye mid-blink.

## Decision

- **Eye**: enlarged (5.4×6.2 → 6.3×7.2) with **dual catch-lights** (large + small), the classic kawaii sparkle; catch-lights are now hidden when the eye is more than half-closed (fixes the floating-highlight blink bug).
- **Cheek blush**: soft pink ellipse on the cheek, always drawn (peeks below the sunglasses too).
- **Body form**: top-light strengthened (.10 → .15 and larger), plus a soft **neck top-light** stroke so the neck reads as a cylinder.
- **Haunch freckles**: 4 darker spots on the rear hip, derived via `shade(bodyHex,0.84)` so they harmonize with all 11 skins.

## Consequences

- Pure additive art inside `drawDino` — every call site (play, closet, share card) benefits; no data or gameplay changes.
