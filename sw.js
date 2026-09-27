const CACHE_NAME = 'msds-lite-v1.5.0';
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
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of APP_SHELL) {
      try {
        await cache.add(url);
      } catch (err) {
        console.warn('SW cache.add skipped:', url, err);
      }
    }
    await self.skipWaiting();
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

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith((async () => {
    // 1. Return from cache immediately if available
    const cached = await caches.match(event.request);
    if (cached) return cached;

    // 2. Fetch from network
    try {
      const response = await fetch(event.request);
      if (response && (response.ok || response.type === 'opaque')) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
      }
      return response;
    } catch (err) {
      // 3. Fallback for navigation requests
      if (event.request.mode === 'navigate') {
        return (await caches.match('./index.html')) || (await caches.match('./'));
      }
      return null;
    }
  })());
});
