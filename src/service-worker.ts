// service-worker.ts

async function getAssetsFromManifest() {
  const manifest = await fetch('/manifest.json').then((response) => response.json());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const assets = Object.values(manifest).map((entry: any) => entry.file);
  return assets;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open('app-cache');
      const assets = await getAssetsFromManifest();
      cache.addAll([
        '/',
        '/index.html',
        ...assets, // Добавляем динамически полученные файлы из манифеста
      ]);
    })(),
  );
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    }),
  );
});
