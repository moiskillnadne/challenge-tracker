// service-worker.ts

async function getAssetsFromManifest() {
  const manifest = await fetch('/manifest.json').then((response) => response.json());
  const assets = Object.values(manifest).map((entry) => entry.file);
  return assets;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open('app-cache');
      const assets = await getAssetsFromManifest();
      cache.addAll(['/', '/index.html', ...assets]);
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    }),
  );
});
