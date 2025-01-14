const CACHE_NAME = 'app-cache-v1'
const STATIC_CACHE_NAME = 'static-cache-v1'

async function getAssetsFromManifest() {
  try {
    const response = await fetch('/manifest.json')
    if (!response.ok) throw new Error('Failed to fetch manifest')
    const manifest = await response.json()
    return Object.values(manifest).map((entry) => entry.file)
  } catch (error) {
    console.error('Error fetching manifest:', error)
    return []
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      const assets = await getAssetsFromManifest()
      try {
        await cache.addAll(['/', '/index.html', ...assets])
        console.log('Assets cached successfully')
      } catch (error) {
        console.error('Error caching assets:', error)
      }
    })(),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== STATIC_CACHE_NAME)
          .map((name) => caches.delete(name)),
      )
      console.log('Old caches cleared')
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

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
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(event.request)
          .then((networkResponse) => {
            return caches.open(STATIC_CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone())
              return networkResponse
            })
          })
          .catch((error) => {
            console.error('Fetch failed:', error)
            throw error
          })
      }),
    )
  }
})
