const CACHE_NAME = 'msds-lite-v1.1.1-language-emergency-fix';
const APP_SHELL = [
  './index.html',
  './data/chemicals.json',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-maskable.svg'
];
const TAILWIND_CDN = 'https://cdn.tailwindcss.com';

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(APP_SHELL.map((url) => cache.add(url)));
    try {
      const response = await fetch(TAILWIND_CDN, { mode: 'no-cors' });
      await cache.put(TAILWIND_CDN, response);
    } catch (error) {
      console.warn('Tailwind CDN önbelleğe alınamadı:', error);
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
    const cached = await caches.match(event.request);
    const network = fetch(event.request).then((response) => {
      if (response && (response.ok || response.type === 'opaque')) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
      }
      return response;
    }).catch(() => null);

    return cached || await network || caches.match('./index.html');
  })());
});
