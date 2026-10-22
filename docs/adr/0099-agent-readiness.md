# ADR 0099: agent readiness - make the site legible to AI agents

Date: 2026-10-22
Status: accepted

## Context

An AgentReady scan (ora.ai, 2026-10-22) scored the site 38/100. Most of the
missing weight is the "act" layer (API, MCP, OAuth, payments), which a static
personal page does not need. The "read" layer was genuinely weak: no
structured data, an llms.txt from January that still said ".NET/C#/Typesript"
and linked LinkedIn as "case studies", and none of the machine-readable
files reachable by a link from the page. robots.txt disallowed `/assets/`
with a comment about caching, which blocks CSS for rendering crawlers.
sitemap.xml carried an invalid lastmod (`2025-19-08`).

## Decision

- **JSON-LD** in `index.html`: a `@graph` of `Person` (name, title,
  description, `knowsAbout`, `sameAs`), `WebSite` and `WebPage`. Employer is
  described, not named, consistent with the header.
- **One visible summary line** under the subtitle, so the answer to "who is
  this and what does he do" is in the initial HTML, not only in meta tags.
- **llms.txt rewritten** to the current profile (roles, stack, open source,
  talks, contact) with real links; **llms-full.txt** added as the extended
  one-file version; **index.md** added as a Markdown mirror of the page.
- **Links to the files** from the page: `<link rel="canonical">` and
  `<link rel="alternate">` for Markdown and llms.txt in `<head>`. Agents reach
  machine-readable files by following links; the `<head>` links are enough.
  Visible footer links were tried and removed the same day (owner: keep the
  footer clean) - see PR #135.
- **robots.txt** reduced to allow-all plus the sitemap. **sitemap.xml** fixed
  and extended with `/dino/`.

## Consequences

- Expected scan range for a static page: ~55-60. Going higher means an
  "act" surface (an MCP server or CLI for the CV); deferred, tracked as an idea.
- Three files now describe the same facts (index.html, index.md, llms*.txt):
  update them together; the CV repository stays the source of truth.
- Content rule kept: no employer name, no personal data beyond what the page
  already shows.
