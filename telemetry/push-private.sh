#!/bin/sh
# Nightly: aggregate raw temp.db and push publish-safe stats to the PRIVATE repo.
# Cron:  17 3 * * *  /path/to/telemetry/push-private.sh
# Auth:  the box needs write access to velesnitski/dash-stats —
#        either `gh auth login`, or an SSH deploy key (repo → Settings →
#        Deploy keys → add the box's key with write access) with
#        STATS_REMOTE=git@github.com:velesnitski/dash-stats.git
set -eu
HERE=$(cd "$(dirname "$0")" && pwd)
STATS_REMOTE=${STATS_REMOTE:-https://github.com/velesnitski/dash-stats.git}
WORK=${WORK:-"$HOME/.cache/dash-stats"}

python3 "$HERE/aggregate.py"

if [ ! -d "$WORK/.git" ]; then git clone --depth 1 "$STATS_REMOTE" "$WORK"; fi
cd "$WORK"
git pull -q --rebase 2>/dev/null || true   # tolerate an empty just-created remote
cp "$HERE/temp-agg.db" "$HERE/stats.csv" .
git add temp-agg.db stats.csv
git diff --cached --quiet && { echo "no changes"; exit 0; }
git commit -qm "telemetry: aggregates $(date -u +%F)"
git push -q
echo "pushed aggregates for $(date -u +%F)"
