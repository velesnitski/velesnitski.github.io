# ADR 0078 (v66): five funny mechanics

Date: 2026-08-14
Status: accepted

Owner approved the full menu: 🌶 pepper berry (3 s of involuntary jet
burps every 45 f: micro-hop, flame puffs, kills bats within 115 px behind;
never interrupts a dive), 🐣 duckling fan (joins after a boss win, runs
118 px behind replaying jumps from a 32-frame dy history, scoops leftover
berries +3, lost with a "kvyak" on death), 🍌 banana peel (30 % of crow
drops; grounded step → 22 f spin-slide with i-frames that smashes rocks),
🎈 balloon (rare sky pickup; grab mid-air → 2 s gentle descent, tap to
pop early — the pop branch sits BEFORE the dive branch in input), and
🙃 Queen's TOPSY-TURVY hex (once per fight, 25 % of decisions: 90 f
screen flip via canvas rotate with 10 f ease in/out, clamped progress).
Debug hashes: #pepper #duck #banana #balloon #flip #flipfreeze.

Verification lesson (a day of ghost-hunting): the headless stage crops
the canvas bottom (~y>270) regardless of window height, so ground-line
sprites "vanish" in screenshots while being perfectly visible in real
browsers. The duckling was drawn correctly all along — proven by an
isolated render + an in-game sky-position probe. VERIFY GROUND-LEVEL ART
WITH A SKY-POSITION PROBE, not by trusting the headless stage crop. Also
real: the first draw order put the duck under the dino tail (fixed:
drawn after foreground(), 118 px back).
