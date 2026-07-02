#!/usr/bin/env python3
"""Strawberry Dash telemetry collector — Python stdlib only, no third-party deps.

Receives sendBeacon POSTs from the game and appends them to a local SQLite
`temp.db`. Raw rows (incl. the request IP) NEVER leave this machine — publish
only the output of aggregate.py.

Run:    python3 server.py                # binds 127.0.0.1:8787
Deploy: put behind your TLS reverse proxy (nginx/caddy), see README.md.
"""
import json, sqlite3, time, os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

DB    = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'temp.db')
BIND  = ('127.0.0.1', 8787)
ORIGIN = 'https://velesnitski.github.io'          # only the game may post
MAX_BODY = 2048

SCHEMA = """CREATE TABLE IF NOT EXISTS pings(
  ts     INTEGER NOT NULL,           -- unix seconds (server clock)
  ip     TEXT,                       -- stays private on this box; never aggregated
  ev     TEXT,  v   INTEGER, sid  TEXT,
  sc     INTEGER, hi INTEGER, runs INTEGER, lvl INTEGER,
  ua     TEXT,  lang TEXT, tz TEXT, scr TEXT);
CREATE INDEX IF NOT EXISTS idx_ts ON pings(ts);"""

con = sqlite3.connect(DB, check_same_thread=False)
con.executescript(SCHEMA); con.commit()

class H(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', ORIGIN)
        self.send_header('Access-Control-Allow-Methods', 'POST')
        self.send_header('Access-Control-Allow-Headers', 'content-type')

    def do_OPTIONS(self):
        self.send_response(204); self._cors(); self.end_headers()

    def do_POST(self):
        if self.path != '/t':
            self.send_response(404); self.end_headers(); return
        n = min(int(self.headers.get('content-length') or 0), MAX_BODY)
        try:
            d = json.loads(self.rfile.read(n).decode('utf-8', 'ignore'))
            ip = self.headers.get('x-forwarded-for', self.client_address[0]).split(',')[0].strip()
            con.execute('INSERT INTO pings VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', (
                int(time.time()), ip,
                str(d.get('ev',''))[:12],   int(d.get('v') or 0),  str(d.get('sid',''))[:16],
                int(d.get('sc') or 0),      int(d.get('hi') or 0), int(d.get('runs') or 0), int(d.get('lvl') or 0),
                str(d.get('ua',''))[:200],  str(d.get('lang',''))[:16], str(d.get('tz',''))[:48], str(d.get('scr',''))[:16]))
            con.commit()
        except Exception:
            pass                                     # never let bad input break the collector
        self.send_response(204); self._cors(); self.end_headers()

    def log_message(self, *a):                        # quiet
        pass

if __name__ == '__main__':
    print(f'collecting on http://{BIND[0]}:{BIND[1]}/t → {DB}')
    ThreadingHTTPServer(BIND, H).serve_forever()
