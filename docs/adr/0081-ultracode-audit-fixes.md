# ADR 0081 (v67): ultracode workflow audit — 10 confirmed fixes

Date: 2026-08-14
Status: accepted

First ultracode-workflow audit of the game (3 finder lenses → 12 findings
→ 12 adversarial verifiers → 10 confirmed, 2 correctly rejected; ~880k
subagent tokens, 15 agents). Every confirmed finding re-traced before
fixing. Fixed:

1-2. HIGH: death (or revive) during the Queen's TOPSY-TURVY froze flipT —
   the entire game-over screen rendered upside down AND the revive pill
   hit-test used unrotated coordinates: the visible pill was dead while
   its mirrored spot silently charged berries. over()/revive() now clear
   flipT; pausing also clears it (accessibility escape valve).
3. Balloon grab left a stale jumpBuf from a mid-dive tap — popped the
   balloon one frame after grabbing. Grab now clears jumpBuf.
4. Grounded pepper burp set air=true/coyote=0, converting the player's
   next jump tap into an unwanted dive-slam (forgiveness systems
   disabled by the involuntary hop). Ground burps are now squash+flame
   only; air burps keep the boost.
5. Revive telemetry reported the NEXT revive's price (reviveCost() read
   after revives++). Price captured before increment.
6. Rex-berry pickup had a one-frame window where boss contact could
   still kill (invuln top-up ran next frame). Pickup grants it instantly.
7. HB was snapshotted before the ents loop — a mid-frame minib pickup
   left the rest of the frame on stale scale, diverging from the boss
   code's live hb(). All collision sites now call hb() directly.
8. The share card printed the RAW pName, bypassing the new profanity
   filter — a *** name rendered uncensored on the shareable PNG. Routed
   through cleanName.

Rejected by verifiers (correctly): lucky re-roll (already fixed by
luckyPaid in v66), recordScore 'dino'→'you' rename (cosmetic intent).

PROCESS LESSON: a leftover-check regex ran against the whole file and
matched inside the embedded base64 photo, throwing before the patch was
written while a later stamps-block still ran — always make sanity checks
code-scoped, and verify a patch landed by grepping its anchor, not by
the script exiting 0.
