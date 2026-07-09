# ADR 0061: rocket v3 — emoji-smooth model (lathes + beveled swooshes + gloss)

Date: 2026-07-09
Status: accepted

## Context

Rocket v2 was assembled from primitives — straight cylinder, hard cone, box
fins — and matte Lambert materials. It read as low-poly, not as the plump
glossy 🚀 emoji the owner asked it to feel like.

## Decision

Rebuild the visual model as continuous curves; physics, jiggle bones, face,
and interaction are untouched.

- **Body = one LatheGeometry profile** (48 segments): a single bullet curve
  from closed tail through a max-radius belly to a tapered shoulder — no
  seams, no collar, no facets.
- **Nose = rounded dome cap lathe** that overlaps the body shoulder, so the
  red/white boundary is a clean color seam on a smooth surface (emoji-style),
  and it still lives in the jiggle-boned nose group.
- **Fins = ExtrudeGeometry of a quadratic swoosh shape** with bevel
  (thickness/size .28, 3 segments) — swept, rounded-edge fins that reach
  below the tail like the emoji's, replacing boxes. Mounted in the same
  jiggle groups (rotated −π/2 so the shape's +x maps to the group's outward +z).
- **Nozzle = flared engine-bell lathe** with a rolled lip.
- **Gloss**: body/nose/fins/rim switched from MeshLambert to **MeshPhong**
  (shininess 30–80, dark slate specular) — the moving specular highlight is
  what sells "smooth" once the thing tumbles.
- Porthole/decal nudged outward to clear the fatter belly (port z 3.66,
  decal z 3.78). Popup stamp bumped to `rocket v3`.

## Consequences

- The silhouette is now curve-only; any future part must follow (lathe or
  beveled extrusion, Phong, no naked boxes).
- Slightly more vertices (lathe 48-seg + beveled extrusions) — trivial for
  one hero object.
- Standing gotcha reaffirmed by the error hook: `Object3D.position` is a
  read-only accessor — set `.position.y`, never `Object.assign` it.
