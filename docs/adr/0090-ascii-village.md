# ADR 0090: /ascii — a village, made of characters

Date: 2026-09-03
Status: accepted

## Context

Owner saw ASCII CITY (a paid browser prototype rendering a whole
explorable city in ASCII glyphs) and asked for something similar,
then approved the "simple version" from the think-piece: a living
diorama with a walkable character, not a city. Fourth page of the
set, and the first aimed at the grown-up developers who visit the CV
(dino/rocket/fish are the kids' wing): play / throw / care / explore.

## Decision

Single-file canvas glyph renderer, zero deps:

- World is a 150×30 character strip composed in code from stamps
  (houses, trees, well, fence, strawberry patches) — no hand-authored
  map file to drift.
- Side-view: the street is a walkable foreground band (rows below the
  ground line), so no tile collision is needed in v1 — the village is
  backdrop, the player walks in front of it.
- Camera follows the player; cell size derives from viewport height,
  so portrait phones see the same 30 rows, narrower.
- Life: chimney smoke particles (`.o°`), tree-crown sway (per-glyph px
  offset, cheaper than cell rewrites), drifting `~` clouds by day,
  twinkling stars and window flicker at night — palette switches on
  the visitor's local hour (day / dusk / night).
- Three NPC villagers (`d`/`b` = facing right/left) wander the street;
  standing near one shows a deadpan speech line ("the fish says hi.").
- Input: arrows/WASD with key-repeat, drag-to-walk on touch.
- prefers-reduced-motion: no sway/smoke/wander, slow clouds.
- Telemetry: ev:'ascii' beacon, shared dinoSid. Homepage link
  deliberately deferred — owner decides the door (footer dots are
  getting crowded: rocket · fish · dino already).

## Verification

ADR 0086 checklist: 14s steady-state at 900×650 + portrait 450×900;
synthetic ArrowRight walk (29 steps → x=35) confirmed movement,
camera follow, NPC facing flip and the speech bubble; error hook
clean.

## Future (if it earns it)

Enterable house interiors; "lit windows = today's players" from
telemetry; in-world signposts that navigate to /dino /rocket /fish.
