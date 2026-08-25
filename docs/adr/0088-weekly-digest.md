# ADR 0088: telemetry digest goes weekly

Date: 2026-08-25
Status: accepted
Amends ADR 0050 (daily digest).

## Context

The daily email on quiet days read as broken ("runs: 0 · best: 0 by ?")
— and most of its "players" were rocket-test pings, not games. Owner:
"давай письмо раз в неделю".

## Decision

dailyDigest → weeklyDigest: Mondays ~09:00, covering the trailing 7
days. Readability fixes ride along: dino opens and rocket visits are
counted separately from runs; a week with zero completed runs says so
in words instead of "best 0 by ?"; revives joined shares/buys; a fully
silent week sends nothing. setupDigest() now uninstalls either old
trigger before installing the weekly one.

DEPLOYMENT NOTE (the Apps Script freeze holds): trigger functions run
the SAVED code — paste + Save + run setupDigest() once. doGet/doPost
and the /exec deployment version are untouched.
