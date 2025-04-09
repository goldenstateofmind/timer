import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PUBLIC_DIR = path.resolve(__dirname, '../public')
const MANIFEST_FILE = path.join(PUBLIC_DIR, 'manifest.json')

// Acceptable image extensions (case-insensitive)
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff']

function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return IMAGE_EXTENSIONS.includes(ext)
}

function walk(dir, base = PUBLIC_DIR) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(file => {
    const fullPath = path.join(dir, file)
    const relPath = path.relative(base, fullPath).replace(/\\/g, '/')

    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(walk(fullPath, base))
    } else {
      if (relPath !== 'manifest.json' && isImageFile(fullPath)) {
        results.push(relPath)
      }
    }
  })
  return results
}

const imageFiles = walk(PUBLIC_DIR)

fs.writeFileSync(MANIFEST_FILE, JSON.stringify({ images: imageFiles }, null, 2))
console.log(`✅ Image manifest generated with ${imageFiles.length} image(s).`)
