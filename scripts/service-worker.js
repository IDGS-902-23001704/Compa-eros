const cachePrefix = 'companeros:' + self.registration.scope + ':'
const cacheName = cachePrefix + '__VERSION__'
const files = '__FILES__'
const home = new URL('index.html', self.registration.scope).href

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(files.map((file) =>
    new Request(new URL(file, self.registration.scope), { cache: 'reload' }),
  ))))
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.filter((key) => key.startsWith(cachePrefix) && key !== cacheName)
      .map((key) => caches.delete(key)))
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET' || !request.url.startsWith(self.registration.scope)) return

  event.respondWith((async () => {
    const cache = await caches.open(cacheName)
    const key = request.mode === 'navigate' ? home : request
    return (await cache.match(key)) ?? fetch(request)
  })())
})
