// Strawberry Dash service worker — NETWORK-FIRST so updates always win
// (a cache-first SW would recreate the stale-version bug of ADR 0043).
// Bump CACHE on every release alongside the footer version stamp.
const CACHE = 'dash-v55';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(['./', 'icon-192.png', 'icon-512.png', 'manifest.webmanifest']))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;   // never intercept beacons/weather
  const key = u.origin + u.pathname;                                        // canonical: one cache entry per path, not per ?query
  e.respondWith(
    fetch(e.request).then(r => {                       // fresh copy wins…
      if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(key, cp)); }   // never cache 404/503 — no poisoned offline fallback
      return r;
    }).catch(() => caches.match(key)                                        // …cache saves you offline
      .then(m => m || (e.request.mode === 'navigate' ? caches.match('./') : undefined)))
  );
});
