/* BrewCraft service worker — offline app shell */
const CACHE = 'brewcraft-v2.174.0';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c) { return c.addAll(ASSETS); })
      .then(function() { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys()
      .then(function(keys) {
        return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
      })
      .then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  /* Navigation: network-first so updates arrive; cached shell when offline */
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(function(r) {
          const copy = r.clone();
          caches.open(CACHE).then(function(c) { c.put('./index.html', copy); });
          return r;
        })
        .catch(function() { return caches.match('./index.html'); })
    );
    return;
  }
  /* Everything else (fonts, QR lib): cache-first, then network + cache */
  e.respondWith(
    caches.match(e.request).then(function(hit) {
      if (hit) return hit;
      return fetch(e.request).then(function(r) {
        if (r && r.status === 200 && (r.type === 'basic' || r.type === 'cors')) {
          const copy = r.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
        }
        return r;
      });
    })
  );
});
