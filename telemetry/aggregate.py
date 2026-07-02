#!/usr/bin/env python3
"""Aggregate raw temp.db into publish-safe stats — stdlib only.

Reads  telemetry/temp.db            (raw, PRIVATE: contains IPs + device ids)
Writes telemetry/temp-agg.db        (aggregates only — safe for the public repo)
       telemetry/stats.csv          (same data, human-friendly)

Nothing identifying survives: no IPs, no sids, no exact UAs. Geography comes
from the browser TIMEZONE (Europe/Minsk, Asia/Dubai, …) — a privacy-friendly
country-level proxy that needs no IP processing and no geo database.
"""
import sqlite3, re, csv, os, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
RAW, AGG, CSV = (os.path.join(HERE, f) for f in ('temp.db', 'temp-agg.db', 'stats.csv'))

def model(ua: str) -> str:
    """Coarse device family from UA. Android exposes models; iOS only 'iPhone'."""
    m = re.search(r'Android [\d.]+; ([^);]{2,24})', ua)
    if m: return m.group(1).split(' Build')[0].strip()
    if 'iPhone' in ua:
        v = re.search(r'iPhone OS (\d+)', ua)
        return f'iPhone (iOS {v.group(1)})' if v else 'iPhone'
    if 'iPad'   in ua: return 'iPad'
    if 'Macintosh' in ua: return 'Mac'
    if 'Windows'   in ua: return 'Windows PC'
    return 'other'

raw = sqlite3.connect(RAW)
raw.create_function('model', 1, model)
raw.create_function('day', 1, lambda ts: datetime.datetime.fromtimestamp(ts, datetime.timezone.utc).strftime('%Y-%m-%d'))

agg = sqlite3.connect(AGG)
agg.executescript("""
DROP TABLE IF EXISTS daily;   CREATE TABLE daily  (day TEXT, pings INT, players INT, runs_ended INT, avg_score REAL, max_score INT);
DROP TABLE IF EXISTS devices; CREATE TABLE devices(day TEXT, model TEXT, players INT);
DROP TABLE IF EXISTS regions; CREATE TABLE regions(day TEXT, tz TEXT, players INT);
DROP TABLE IF EXISTS langs;   CREATE TABLE langs  (day TEXT, lang TEXT, players INT);
""")

agg.executemany('INSERT INTO daily VALUES(?,?,?,?,?,?)', raw.execute(
    "SELECT day(ts), COUNT(*), COUNT(DISTINCT sid), SUM(ev='over'), ROUND(AVG(CASE WHEN ev='over' THEN sc END),1), MAX(sc) FROM pings GROUP BY 1 ORDER BY 1").fetchall())
agg.executemany('INSERT INTO devices VALUES(?,?,?)', raw.execute(
    "SELECT day(ts), model(ua), COUNT(DISTINCT sid) FROM pings GROUP BY 1,2 ORDER BY 1,3 DESC").fetchall())
agg.executemany('INSERT INTO regions VALUES(?,?,?)', raw.execute(
    "SELECT day(ts), tz, COUNT(DISTINCT sid) FROM pings WHERE tz!='' GROUP BY 1,2 ORDER BY 1,3 DESC").fetchall())
agg.executemany('INSERT INTO langs VALUES(?,?,?)', raw.execute(
    "SELECT day(ts), lower(substr(lang,1,2)), COUNT(DISTINCT sid) FROM pings WHERE lang!='' GROUP BY 1,2 ORDER BY 1,3 DESC").fetchall())
agg.commit()

with open(CSV, 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['day', 'pings', 'players', 'runs_ended', 'avg_score', 'max_score'])
    w.writerows(agg.execute('SELECT * FROM daily'))

print('wrote', AGG, 'and', CSV)
