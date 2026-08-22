# ADR 0083 (rocket v12): fire exhaust — 30k GPU-animated particles

Date: 2026-08-15
Status: accepted

## Context

The old exhaust was 400 CPU-integrated points. The upgrade target: a
fire plume that reads as fluid, at mobile frame rates, within the
vendored three r147 (whose WebGPURenderer is immature — raw WebGPU would
mean a second canvas and a WGSL boilerplate tax; deferred as a future
progressive enhancement).

## Decision

- **Ring buffer of 30 000 point sprites in one THREE.Points**; the CPU
  only writes spawn attributes (p0, v0, birth, life, seed); ALL motion is
  computed in the vertex shader from uTime: drag-decayed ballistic path,
  seeded sine turbulence, hot-smoke rise, age-driven size.
- **Fragment ramp** white-hot → orange → smoke gray with additive
  blending and soft round falloff; alpha dies as (1−age)^1.4.
- **updateRange uploads**: only the spawned slice is re-uploaded per
  frame (ring wrap → full upload, rare). Emission ∝ speed while the
  engine is on (≤200/step); wall impacts ≥15 fire a 260-particle radial
  burst alongside the existing smoke ring.
- uTime is sim-clocked (simT), honoring the fixed-timestep rule — the
  plume runs identically on 60 and 120 Hz displays.

## Consequences

- Frustum culling is disabled on the points cloud (positions are
  shader-side); the cloud is always drawn — its cost is bounded and flat.
- The WebGPU compute tier (millions of particles, curl noise) remains a
  clean follow-up: same attribute layout, swap the integrator.
