const V = 'uchet-v11';
const FILES = ['./', './index.html', './plan.js', './smena.js', './smena/scheme.jpg', './ptw.js', './naryad/rpo.xlsx', './naryad/tour/p1.jpg', './naryad/tour/p3.jpg', './naryad/tour/p6.jpg', './naryad/tour/p7.jpg', './naryad/tour/p8.jpg', './naryad/tour/p9.jpg', './naryad/tour/p10.jpg', './naryad/tour/p12.jpg', './naryad/tour/p17.jpg', './naryad/tour/p36.jpg', './naryad/tour/p37.jpg', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './gallery/gallery.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V && k !== 'uchet-gallery').map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  // gallery list: always try the network first, so new photos are noticed
  if (url.pathname.endsWith('/gallery/gallery.json')) {
    e.respondWith(fetch(e.request).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(V).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true })));
    return;
  }
  // everything else: cache first (works offline), refresh in background
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(cached => {
      const net = fetch(e.request).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          const isGal = url.pathname.includes('/gallery/');
          caches.open(isGal ? 'uchet-gallery' : V).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => cached || caches.match('./index.html'));
      return cached || net;
    })
  );
});

// нажатие на уведомление — открыть приложение
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    return clients.openWindow ? clients.openWindow('./') : null;
  }));
});
