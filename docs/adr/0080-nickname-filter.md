# ADR 0080 (v66): nickname hygiene for the school influx

Date: 2026-08-14
Status: accepted

The kid is showing the game at school — an influx of players typing
nicknames into a shared world leaderboard. Two changes, deliberately
basic (this guards a kids' board, not a chat):

1. **Cyrillic un-broken**: cleanName's `\w`-only regex silently deleted
   Russian letters — schoolkids' names would have vanished to 'dino'.
   Now allows а-яёА-ЯЁ.
2. **Profanity → '***'**: compact two-form filter (EN form: cyrillic
   homoglyphs→latin + leet; RU form: latin homoglyphs→cyrillic), repeat
   collapse, substring roots (~14 EN + ~26 RU; bare 'еб' excluded so
   Глеб/хлебушек pass — only explicit composites). Built and fuzz-tested
   in isolation by a parallel agent: 54/54, plus 19/19 in-page smoke.
   Applied in cleanName (world pings, share, display) and recordScore
   (local board). Server untouched — filtering is client-side by design;
   the Apps Script freeze (ADR 0074) holds.
