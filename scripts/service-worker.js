const CACHE_PREFIX = 'portfolio-shell-'
const CACHE_NAME = CACHE_PREFIX + '__PORTFOLIO_CACHE_VERSION__'
const SHELL_FILES = /* __PORTFOLIO_FILES__ */ []
const shellURLs = new Set(SHELL_FILES.map((path) => new URL(path, self.location.origin).href))
const pageAliases = new Map([
  ['/index.html', '/'],
  ['/bilkin', '/bilkin/'],
  ['/bilkin/index.html', '/bilkin/'],
])

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
    try {
      await cache.addAll([...shellURLs].map((url) => new Request(url, { cache: 'reload', redirect: 'error' })))
    } catch (error) {
      await caches.delete(CACHE_NAME)
      throw error
    }
    // Updates wait for existing tabs to close so HTML and hashed chunks stay together.
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const oldCaches = (await caches.keys()).filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
    await Promise.all(oldCaches.map((name) => caches.delete(name)))
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin) return
  // Anchor links must resolve to the same cached HTML as the page itself.
  url.hash = ''
  url.search = ''
  if (event.request.mode === 'navigate') {
    url.pathname = pageAliases.get(url.pathname) ?? url.pathname
  }
  if (!shellURLs.has(url.href)) return

  event.respondWith(serveShell(event.request, url.href))
})

async function serveShell(request, key) {
  let cached
  try {
    const cache = await caches.open(CACHE_NAME)
    cached = await cache.match(key)
  } catch {
    return fetch(request)
  }
  if (!cached || cached.redirected) return fetch(request)

  const range = request.headers.get('range')
  const ifRange = request.headers.get('if-range')
  if (ifRange && ifRange !== cached.headers.get('etag') && ifRange !== cached.headers.get('last-modified')) return cached
  return range ? partialResponse(cached, range) : cached
}

// PDF viewers may request byte ranges even when the entire export is cached.
async function partialResponse(response, range) {
  const data = await response.arrayBuffer()
  const size = data.byteLength
  const match = /^bytes=(\d*)-(\d*)$/i.exec(range)
  if (match && (match[1] || match[2])) {
    const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]))
    const end = match[1] && match[2] ? Math.min(size - 1, Number(match[2])) : size - 1
    const emptySuffix = !match[1] && Number(match[2]) === 0
    if (!emptySuffix && Number.isSafeInteger(start) && Number.isSafeInteger(end) && start <= end) {
      return new Response(data.slice(start, end + 1), {
        status: 206,
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
          'Accept-Ranges': 'bytes',
          'Content-Range': `bytes ${start}-${end}/${size}`,
          'Content-Length': String(end - start + 1),
        },
      })
    }
  }
  return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } })
}
