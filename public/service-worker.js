// service-worker.ts

async function getAssetsFromManifest() {
  const manifest = await fetch('/manifest.json').then((response) => response.json())
  const assets = Object.values(manifest).map((entry) => entry.file)
  return assets
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open('app-cache')
      const assets = await getAssetsFromManifest()
      cache.addAll(['/', '/index.html', ...assets])
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Static resources are cached
  const isStaticResource =
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico')

  const isApiRequest = url.pathname.startsWith('/api/')

  if (isStaticResource && !isApiRequest) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((networkResponse) => {
            return caches.open('static-cache').then((cache) => {
              cache.put(event.request, networkResponse.clone())
              return networkResponse
            })
          })
        )
      }),
    )
  }
})
