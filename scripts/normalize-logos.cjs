/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const CACHE = 'C:/Users/Juan/.claude/image-cache/9d8aaf84-7282-43f5-88a3-bafd22333a03/'
const OUT = 'public/images/clients/norm'

// Uniform canvas — every output file ends up EXACTLY this size,
// so all logos occupy an identical box in the marquee.
const W = 640
const H = 240
const INSET = 0.88 // logo never touches the canvas edge

const sources = [
  { in: 'public/images/clients/GRUPO-_SURA.png', out: 'sura' },
  { in: 'public/images/clients/camara.webp',     out: 'camara' },
  { in: 'public/images/clients/dian.webp',       out: 'dian' },
  { in: 'public/images/clients/alcaldia.webp',   out: 'alcaldia' },
  { in: 'public/images/clients/afinia.webp',     out: 'afinia' },
  { in: CACHE + '3.png', out: 'promigas' },
  { in: CACHE + '4.png', out: 'banco-agrario' },
  { in: 'C:/Users/Juan/AppData/Local/Temp/claude/C--Users-Juan-Documents-GitHub-Aquiavaluos/9d8aaf84-7282-43f5-88a3-bafd22333a03/scratchpad/gases-clean.png', out: 'gases-del-caribe' },
  { in: CACHE + '6.png', out: 'air-e' },
  { in: CACHE + '7.png', out: 'children-international' },
  { in: CACHE + '8.png', out: 'oleoflores' },
]

fs.mkdirSync(OUT, { recursive: true })

;(async () => {
  for (const s of sources) {
    // 1. trim uniform border (white page or transparency)
    const trimmed = await sharp(s.in).trim({ threshold: 12 }).png().toBuffer()
    const m = await sharp(trimmed).metadata()

    // 2. fit inside the inset area, preserving aspect
    const boxW = Math.round(W * INSET)
    const boxH = Math.round(H * INSET)
    const scale = Math.min(boxW / m.width, boxH / m.height)
    const w = Math.max(1, Math.round(m.width * scale))
    const h = Math.max(1, Math.round(m.height * scale))

    const resized = await sharp(trimmed).resize(w, h, { fit: 'fill' }).png().toBuffer()

    // 3. center on the shared transparent canvas
    await sharp({
      create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .composite([{ input: resized, left: Math.round((W - w) / 2), top: Math.round((H - h) / 2) }])
      .webp({ quality: 92, effort: 6 })
      .toFile(path.join(OUT, s.out + '.webp'))

    console.log(s.out.padEnd(24), m.width + 'x' + m.height, '->', w + 'x' + h, 'in', W + 'x' + H)
  }
})()
