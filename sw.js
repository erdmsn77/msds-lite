const CACHE_NAME = 'msds-lite-v1.5.2';
const APP_SHELL = [
  './',
  './index.html',
  './data/chemicals.json',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon.svg',
  './icons/icon-maskable.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of APP_SHELL) {
      try {
        await cache.add(url);
      } catch (err) {
        console.warn('SW cache.add skipped:', url, err);
      }
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames
      .filter((cacheName) => cacheName !== CACHE_NAME)
      .map((cacheName) => caches.delete(cacheName)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && (event.data === 'SKIP_WAITING' || event.data.type === 'SKIP_WAITING')) {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith((async () => {
    // 1. Navigation requests (HTML document) - Stale-While-Revalidate with instant cache return
    if (event.request.mode === 'navigate') {
      const cached = (await caches.match(event.request)) || (await caches.match('./index.html')) || (await caches.match('./'));
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => null);

      // If cached, return immediately for instant 0ms load; revalidate in background
      if (cached) {
        return cached;
      }
      return (await networkFetch) || (await caches.match('./index.html')) || (await caches.match('./'));
    }

    // 2. Static Assets (Cache-First)
    const cached = await caches.match(event.request);
    if (cached) return cached;

    // 3. Network fallback
    try {
      const response = await fetch(event.request);
      if (response && (response.ok || response.type === 'opaque')) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
      }
      return response;
    } catch (err) {
      return null;
    }
  })());
});

