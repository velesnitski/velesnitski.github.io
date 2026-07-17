# ADR 0069: rocket footer easter egg + "rocket jump" naming

Date: 2026-07-17
Status: accepted

## Context

The rocket page had no inbound link from anywhere on the site. The owner
asked for a footer link "even more hidden than the dino", plus naming the
experience something like "rocket jump".

## Decision

- **The homepage footer's existing `·` separator becomes the link.** The
  middot between the flaticon credit and the 🦕 egg was pure punctuation;
  it is now `<a href="rocket/" title="rocket jump">·</a>` with
  `color:inherit; text-decoration:none` — a zero-pixel-diff change. The
  dino egg (45 % opacity emoji) is findable by looking; the rocket egg is
  findable only by accident or curiosity-hovering. Hidden-ness hierarchy:
  visible link > dimmed emoji (dino) > disguised punctuation (rocket).
  `aria-label="rocket jump"` keeps it discoverable to screen readers.
- **"rocket jump" naming** on the rocket page: tab title `🚀 rocket jump`,
  meta description "rocket jump — poke it, fling it, spin it.", and the
  `???` popup now leads with **rocket jump**. Stamp → `rocket v10`.

## Consequences

- The homepage now carries two eggs; if a third page ever needs one, the
  next tier down is behavior-based (click count / key sequence), not
  another disguised character — two invisible links in one footer would
  start colliding.
- Verified by screenshot that the footer renders identically to before.
