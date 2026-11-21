import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = new URL('../dist/', import.meta.url)
const files = (await readdir(dist, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => relative(fileURLToPath(dist), join(entry.parentPath, entry.name)).split(sep).join('/'))
  .filter((file) => file !== 'sw.js')
  .sort()
const template = await readFile(new URL('./service-worker.js', import.meta.url), 'utf8')
const hash = createHash('sha256').update(template)
for (const file of files) {
  hash.update(file).update(await readFile(new URL(file, dist)))
}

await writeFile(new URL('sw.js', dist), template
  .replace('__VERSION__', hash.digest('hex').slice(0, 16))
  .replace("'__FILES__'", JSON.stringify(files.map((file) => './' + file))))
