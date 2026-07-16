# ADR 0068: tip jar moves from PayPal to Boosty

Date: 2026-07-16
Status: accepted
Amends ADR 0057 (tip jar).

## Context

PayPal closed the owner's account (Belarusian passport — PayPal does not
serve Belarus residents), so the hosted donate button went dead. Research
across donation platforms available with a Belarusian passport (western
Stripe/PayPal-based platforms are all unavailable; DonationAlerts has
payout-freeze complaints; crypto is passport-independent but clunky for a
kids' game) landed on Boosty: one-off donations, payouts to Belarusian
bank cards, a public donate form.

## Decision

- The tip jar `href` swaps to `https://boosty.to/mmadcat/donate` — verified
  publicly reachable (HTTP 200) before shipping. Pill text, `.tipjar` style,
  and the `ping('donate')` telemetry hook are unchanged (keyed to
  `id="donate"`).
- Release stamps bumped together per the checklist: footer `v57`, beacon
  `v:57`, sw.js `CACHE='dash-v57'`.

## Consequences

- Western players (Warsaw/Dubai in telemetry) currently have no payment
  path — Boosty accepts mostly RU/BY cards. Known follow-up option: a small
  crypto address in the game popup (legal payout in RB via HTP exchanges).
- The `donate` telemetry event stream continues unbroken, so click-through
  can be compared across the PayPal and Boosty eras.
