import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(root, 'dist')
const template = await readFile(join(root, 'scripts/service-worker.js'), 'utf8')
const files = []

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      await collect(path)
    } else if (/\.(html|js|css|png|webp|svg|ico|webmanifest|pdf)$/i.test(entry.name) && entry.name !== 'sw.js') {
      files.push(path)
    }
  }
}

await collect(output)
files.sort()

const revision = createHash('sha256').update(template)
const urls = []
let bytes = 0
for (const path of files) {
  const name = relative(output, path).split(sep).join('/')
  const content = await readFile(path)
  revision.update(name).update(content)
  bytes += content.length
  // Cache canonical directory URLs. Cloudflare redirects index.html aliases.
  urls.push('/' + name.replace(/(^|\/)index\.html$/, '$1'))
}

const worker = template
  .replace('__PORTFOLIO_CACHE_VERSION__', revision.digest('hex').slice(0, 16))
  .replace('/* __PORTFOLIO_FILES__ */ []', JSON.stringify(urls, null, 2))
await writeFile(join(output, 'sw.js'), worker)
console.log(`Offline shell: ${urls.length} files, ${(bytes / 1024 / 1024).toFixed(2)} MiB`)
