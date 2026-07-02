# 0042 — Strawberry Dash: cape redesign + tail-item animation pass

**Date:** 2026-07-02
**Status:** Accepted

## Context

Owner: the cape is "too big and honestly not so great"; tail bow/spike "look strange". Designer read: the cape was a giant sail fighting the dino's silhouette (covering the signature back plates), and the tail items were static decals — the bow's ribbons didn't flow, and the spike **rotated constantly like a saw blade** (motion without meaning).

## Decision

- **Cape → compact streaming pennant.** ~60% smaller: attaches at the neck, skims the back *under* the plate line, and streams out low past the haunch with a scalloped, wind-waving hem (3 phase-offset sines), a silky top-light stroke and an inner fold shadow. A **gold clasp with strap** is drawn *over* the body at the shoulder so the cape reads as worn, not floating. The plates/freckles stay fully visible.
- **Tail spike → morning star with motion logic.** No constant spin. It **pendulum-swings** with the run (±0.22 rad), **dips on jumps** (anticipation), spikes **breathe** (±1.3 len), iron ball gets a radial gradient + rivets + rim light, and a **periodic ✦ metallic glint** (every ~2.3s). Fixed spike angles — it's a heavy object, not a fan.
- **Tail bow → alive.** The knot **swings** around its anchor (±0.14 rad) with a soft **heartbeat pulse** (±5%), loops get **inner fold** shading + a knot highlight, and the two stubby strokes became **long ribbons streaming behind with traveling waves** (phase-offset quadratics in two pinks).

## Consequences

- Pure art/animation; positions, prices, perks unchanged. All three verified at card scale and in the closet grid.
