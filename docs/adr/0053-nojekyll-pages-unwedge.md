# 0053 — .nojekyll: bypass Jekyll on Pages (deploy pipeline unwedge)

**Date:** 2026-07-03
**Status:** Accepted

## Context

The v51 commit's Pages deploys failed repeatedly: the deploy step returned
"Deployment failed, try again later" (3×, one attempt polling a created
deployment for the full 10-min timeout), a legacy build got wedged in
`building`, and after a forced rebuild the legacy builder reported
**"Page build failed."** The site is pure static output — Jekyll adds nothing
and is one of the two failing stages.

## Decision

Add `.nojekyll` at the repo root: GitHub Pages skips the Jekyll build entirely
and publishes files as-is. Faster builds, one fewer failure mode, and markdown
/code in `docs/adr/` can never break the site build again.

## Consequences

- None for the site: it never relied on Jekyll processing (no front matter,
  no Liquid, no _layouts).
