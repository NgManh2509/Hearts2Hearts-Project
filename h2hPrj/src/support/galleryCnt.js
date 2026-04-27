import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirName = path.dirname(fileURLToPath(import.meta.url))
const prjRoot = path.resolve(dirName, '..')

const folderPath = path.join(prjRoot, 'assets/galleryImg');
const outPut = path.join(prjRoot, 'data/imgCnt.json')

try {
    const files = fs.readdirSync(folderPath)
    const imageFiles = files.filter(file => file.endsWith('.webp'))
    fs.writeFileSync(outPut, JSON.stringify({ count: imageFiles.length }))
    console.log(`Gallery: ${imageFiles.length} ảnh → ${outPut}`)
} catch (error) {
    console.error('galleryCount.js error:', error.message)
}