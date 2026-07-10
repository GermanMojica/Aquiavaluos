# Categorías RAA en Sectores Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 4 audience-based sectors in `src/components/sections/Sectors.tsx` with the 12 official RAA valuation categories, each backed by a real free-license photo, displayed as a clickable grid with a detail modal.

**Architecture:** Single-file component rewrite. A one-off Node script (run from the scratchpad, not committed) downloads and crops 12 stock photos into `public/images/sectors/`. `Sectors.tsx` gets a new `categories` data array (12 entries) rendered as a responsive card grid; clicking a card opens a Framer Motion modal with prev/next navigation between categories, keyboard support (Escape/arrows), and body-scroll lock.

**Tech Stack:** Next.js 16 / React 19, Tailwind CSS v4, Framer Motion, GSAP + `@gsap/react` (`useGSAP`), `lucide-react` icons, `sharp` (already present transitively in `node_modules`, used only by the one-off image script).

## Global Constraints

- Design spec: `docs/superpowers/specs/2026-07-10-categorias-raa-sectores-design.md` — follow it exactly; do not add per-card stats, autoplay, or new routes.
- No test suite exists in this repo (per `CLAUDE.md`). Verification = `npm run lint` + `npm run build` + manual/dev-server check, not unit tests.
- Only `src/components/sections/Sectors.tsx` and files under `public/images/sectors/` change. Do not touch `Navbar.tsx`, `page.tsx`, or any other section.
- Section id stays `sectores`; header copy stays "[ ALCANCE DEL SERVICIO ]" / "Sectores que Atendemos" (user chose to keep it).
- Category 9 and 11 from the source document were identical ("Activos operacionales y establecimientos de comercio") — already merged into a single category in the spec. Final count is 12, numbered 01–12 with no gaps.
- All images must be free-to-use stock photos (Unsplash standard license or Pexels license) — never Unsplash+ / `plus.unsplash.com` premium URLs.

---

### Task 1: Fetch, crop, and swap the 12 category images

**Files:**
- Create (scratchpad, not committed): `C:\Users\xjuan\AppData\Local\Temp\claude\C--Users-xjuan-Documents-GitHub-Aquiavaluos\91b1906d-1b42-494b-b365-44a6ab36abf4\scratchpad\prepare-sector-images.mjs`
- Create: `public/images/sectors/01-inmuebles-urbanos.jpg` … `public/images/sectors/12-intangibles-especiales.jpg` (12 files)
- Delete: `public/images/sectors/banking.png`, `public/images/sectors/construction.png`, `public/images/sectors/corporate.png`, `public/images/sectors/government.png`, `public/images/sectors/investors.png`, `public/images/sectors/residential.png`

**Interfaces:**
- Produces: 12 image files at `public/images/sectors/{NN}-{slug}.jpg`, each 1600×1000px JPEG. Task 2 references these exact paths in the `categories` array.

- [ ] **Step 1: Write the image-processing script**

All 12 source URLs below were verified during planning: each returns HTTP 200 with `content-type: image/jpeg`, and each is confirmed free-to-use (Unsplash standard license or Pexels license — none are `plus.unsplash.com`).

Create the file at the scratchpad path above with this exact content:

```js
import sharp from 'sharp'

const sources = [
  { file: '01-inmuebles-urbanos.jpg', url: 'https://images.unsplash.com/photo-1759162788764-f40075c8857f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { file: '02-inmuebles-rurales.jpg', url: 'https://images.unsplash.com/photo-1633212209509-80d72254399c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { file: '03-recursos-naturales.jpg', url: 'https://images.unsplash.com/photo-1758012561437-5e272eb9e1d1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { file: '04-obras-infraestructura.jpg', url: 'https://images.pexels.com/photos/2621625/pexels-photo-2621625.jpeg?cs=srgb&dl=pexels-tracehudson-2621625.jpg&fm=jpg' },
  { file: '05-monumentos-historicos.jpg', url: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg?cs=srgb&dl=pexels-silvia-trigo-545701-2675266.jpg&fm=jpg' },
  { file: '06-inmuebles-especiales.jpg', url: 'https://images.unsplash.com/photo-1758448501002-8c7bb7a7d9ff?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { file: '07-maquinaria-fija.jpg', url: 'https://images.unsplash.com/photo-1513828646384-e4d8ec30d2bb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { file: '08-maquinaria-especial.jpg', url: 'https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?cs=srgb&dl=pexels-tomfisk-1554646.jpg&fm=jpg' },
  { file: '09-activos-operacionales.jpg', url: 'https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { file: '10-semovientes.jpg', url: 'https://images.pexels.com/photos/5303082/pexels-photo-5303082.jpeg?cs=srgb&dl=pexels-sstoppo-5303082.jpg&fm=jpg' },
  { file: '11-intangibles.jpg', url: 'https://images.unsplash.com/photo-1758951995614-1a223f1512e4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { file: '12-intangibles-especiales.jpg', url: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?cs=srgb&dl=pexels-sora-shimazaki-5668882.jpg&fm=jpg' },
]

const destDir = process.argv[2]
if (!destDir) throw new Error('Usage: node prepare-sector-images.mjs <destDir>')

for (const { file, url } of sources) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${file}: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  await sharp(buffer)
    .resize(1600, 1000, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82 })
    .toFile(`${destDir}/${file}`)
  console.log('wrote', file)
}
```

- [ ] **Step 2: Run the script against the repo's `public/images/sectors/` directory**

Run from the repo root (`C:\Users\xjuan\Documents\GitHub\Aquiavaluos`), passing the destination directory as an argument so the script has no hardcoded repo path:

```bash
node "C:\Users\xjuan\AppData\Local\Temp\claude\C--Users-xjuan-Documents-GitHub-Aquiavaluos\91b1906d-1b42-494b-b365-44a6ab36abf4\scratchpad\prepare-sector-images.mjs" "public/images/sectors"
```

Expected output: 12 lines `wrote 01-inmuebles-urbanos.jpg` … `wrote 12-intangibles-especiales.jpg`, no errors.

- [ ] **Step 3: Verify all 12 files exist with the expected format**

```bash
node -e "
const sharp = require('sharp');
const fs = require('fs');
const files = fs.readdirSync('public/images/sectors').filter(f => /^\d{2}-/.test(f));
console.log('count:', files.length);
(async () => {
  for (const f of files.sort()) {
    const m = await sharp('public/images/sectors/' + f).metadata();
    console.log(f, m.width, m.height, m.format);
  }
})();
"
```

Expected: `count: 12`, and each line shows `1600 1000 jpeg`.

- [ ] **Step 4: Remove the old unused sector images**

These 6 files are only referenced by the `Sectors.tsx` code being replaced in Task 2 (confirmed via repo-wide grep during planning — no other file imports them):

```bash
rm public/images/sectors/banking.png public/images/sectors/construction.png public/images/sectors/corporate.png public/images/sectors/government.png public/images/sectors/investors.png public/images/sectors/residential.png
```

- [ ] **Step 5: Commit**

```bash
git add public/images/sectors
git status
```

Confirm `git status` shows the 6 old files as deleted and the 12 new `NN-*.jpg` files as new, then:

```bash
git commit -m "$(cat <<'EOF'
feat: replace sector images with 12 RAA category photos

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Rewrite Sectors.tsx with the 12-category grid and detail modal

**Files:**
- Modify (full rewrite): `src/components/sections/Sectors.tsx`

**Interfaces:**
- Consumes: image paths produced by Task 1 (`/images/sectors/01-inmuebles-urbanos.jpg` … `/images/sectors/12-intangibles-especiales.jpg`).
- Produces: default-exported `Sectors` component, same import signature as before (`import Sectors from '@/components/sections/Sectors'` — used by `src/app/page.tsx`, unchanged).

- [ ] **Step 1: Replace the full contents of `src/components/sections/Sectors.tsx`**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import {
  Building2,
  Trees,
  Mountain,
  Construction,
  Landmark,
  Building,
  Cog,
  Plane,
  Store,
  PawPrint,
  Lightbulb,
  Scale,
  X,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'

type Category = {
  id: number
  name: string
  icon: LucideIcon
  image: string
  teaser: string
  alcance: string
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Inmuebles Urbanos',
    icon: Building2,
    image: '/images/sectors/01-inmuebles-urbanos.jpg',
    teaser: 'Casas, apartamentos, edificios, oficinas, locales y bodegas en zona urbana.',
    alcance:
      'Casas, apartamentos, edificios, oficinas, locales comerciales, terrenos y bodegas situados total o parcialmente en áreas urbanas, lotes no clasificados en la estructura ecológica principal, lotes en suelo de expansión con plan parcial adoptado.',
  },
  {
    id: 2,
    name: 'Inmuebles Rurales',
    icon: Trees,
    image: '/images/sectors/02-inmuebles-rurales.jpg',
    teaser: 'Fincas, cultivos, viviendas rurales, vías y sistemas de riego.',
    alcance:
      'Terrenos rurales con o sin construcciones, como viviendas, edificios, establos, galpones, cercas, sistemas de riego, drenaje, vías, adecuación de suelos, pozos, cultivos, plantaciones, lotes en suelo de expansión sin plan parcial adoptado, lotes para el aprovechamiento agropecuario y demás infraestructura de explotación situados totalmente en áreas rurales.',
  },
  {
    id: 3,
    name: 'Recursos Naturales y Suelos de Protección',
    icon: Mountain,
    image: '/images/sectors/03-recursos-naturales.jpg',
    teaser: 'Bienes ambientales, minas, yacimientos y áreas de conservación ecológica.',
    alcance:
      'Bienes ambientales, minas, yacimientos y explotaciones minerales. Lotes incluidos en la estructura ecológica principal, lotes definidos o contemplados en el Código de Recursos Naturales Renovables y daños ambientales.',
  },
  {
    id: 4,
    name: 'Obras de Infraestructura',
    icon: Construction,
    image: '/images/sectors/04-obras-infraestructura.jpg',
    teaser: 'Puentes, túneles, acueductos, presas, aeropuertos y muelles.',
    alcance:
      'Estructuras especiales para proceso, puentes, túneles, acueductos y conducciones, presas, aeropuertos, muelles y demás construcciones civiles de infraestructura similar.',
  },
  {
    id: 5,
    name: 'Conservación Arqueológica y Monumentos Históricos',
    icon: Landmark,
    image: '/images/sectors/05-monumentos-historicos.jpg',
    teaser: 'Edificaciones patrimoniales y monumentos de valor histórico.',
    alcance: 'Edificaciones de conservación arquitectónica y monumentos históricos.',
  },
  {
    id: 6,
    name: 'Inmuebles Especiales',
    icon: Building,
    image: '/images/sectors/06-inmuebles-especiales.jpg',
    teaser: 'Centros comerciales, hoteles, colegios, hospitales y clínicas.',
    alcance:
      'Incluye centros comerciales, hoteles, colegios, hospitales, clínicas y avance de obras. Incluye todos los inmuebles que no se clasifiquen dentro de los numerales anteriores.',
  },
  {
    id: 7,
    name: 'Maquinaria Fija, Equipos y Maquinaria Móvil',
    icon: Cog,
    image: '/images/sectors/07-maquinaria-fija.jpg',
    teaser: 'Equipos industriales, de cómputo, telefonía y transporte automotor.',
    alcance:
      'Equipos eléctricos y mecánicos de uso en la industria, motores, subestaciones de planta, tableros eléctricos, equipos de generación, subestaciones de transmisión y distribución, equipos e infraestructura de transmisión y distribución, maquinaria de construcción, movimiento de tierra, y maquinaria para producción y proceso. Equipos de cómputo: microcomputadores, impresoras, monitores, módems y otros accesorios de estos equipos, redes, mainframes, periféricos especiales y otros equipos accesorios de estos. Equipos de telefonía, electromedicina y radiocomunicación. Transporte automotor: vehículos de transporte terrestre como automóviles, camperos, camiones, buses, tractores, camiones y remolques, motocicletas, motociclos, mototriciclos, cuatrimotos, bicicletas y similares.',
  },
  {
    id: 8,
    name: 'Maquinaria y Equipos Especiales',
    icon: Plane,
    image: '/images/sectors/08-maquinaria-especial.jpg',
    teaser: 'Naves, aeronaves, trenes y teleféricos.',
    alcance:
      'Naves, aeronaves, trenes, locomotoras, vagones, teleféricos y cualquier medio de transporte diferente del automotor descrito en la clase anterior.',
  },
  {
    id: 9,
    name: 'Activos Operacionales y Establecimientos de Comercio',
    icon: Store,
    image: '/images/sectors/09-activos-operacionales.jpg',
    teaser: 'Revalorización de activos, inventarios y establecimientos de comercio.',
    alcance:
      'Revalorización de activos, inventarios, materia prima, producto en proceso y producto terminado. Establecimientos de comercio.',
  },
  {
    id: 10,
    name: 'Semovientes y Animales',
    icon: PawPrint,
    image: '/images/sectors/10-semovientes.jpg',
    teaser: 'Semovientes, animales y muebles no clasificados en otra especialidad.',
    alcance: 'Semovientes, animales y muebles no clasificados en otra especialidad.',
  },
  {
    id: 11,
    name: 'Intangibles',
    icon: Lightbulb,
    image: '/images/sectors/11-intangibles.jpg',
    teaser: 'Marcas, patentes, derechos de autor y fondo de comercio.',
    alcance:
      'Marcas, patentes, secretos empresariales, derechos de autor, nombres comerciales, derechos deportivos, espectro radioeléctrico, fondo de comercio, prima comercial y otros similares.',
  },
  {
    id: 12,
    name: 'Intangibles Especiales',
    icon: Scale,
    image: '/images/sectors/12-intangibles-especiales.jpg',
    teaser: 'Daño emergente, lucro cesante y derechos de indemnización.',
    alcance:
      'Daño emergente, lucro cesante, daño moral, servidumbres, derechos herenciales y litigiosos y demás derechos de indemnización o cálculos compensatorios y cualquier otro derecho no contemplado en las clases anteriores.',
  },
]

export default function Sectors() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<number | null>(null)

  const activeIndex = categories.findIndex((c) => c.id === activeId)
  const active = activeIndex >= 0 ? categories[activeIndex] : null
  const ActiveIcon = active?.icon

  const goPrev = () => {
    if (activeIndex < 0) return
    setActiveId(categories[(activeIndex - 1 + categories.length) % categories.length].id)
  }
  const goNext = () => {
    if (activeIndex < 0) return
    setActiveId(categories[(activeIndex + 1) % categories.length].id)
  }

  useEffect(() => {
    if (activeIndex < 0) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null)
      if (e.key === 'ArrowLeft') setActiveId(categories[(activeIndex - 1 + categories.length) % categories.length].id)
      if (e.key === 'ArrowRight') setActiveId(categories[(activeIndex + 1) % categories.length].id)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex])

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTriggerModule = await import('gsap/ScrollTrigger')
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule
      gsap.registerPlugin(ScrollTrigger)
      gsap.from(containerRef.current, {
        opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
      })
    })()
  }, { scope: containerRef })

  return (
    <section id="sectores" ref={containerRef} className="relative overflow-hidden bg-brand-dark text-white">
      <div className="absolute inset-0 bg-cad-grid opacity-[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-10">
        <div className="text-center">
          <span className="text-xs font-mono text-brand-secondary/80 tracking-widest uppercase block mb-3">
            [ ALCANCE DEL SERVICIO ]
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-mono text-white leading-tight">
            Sectores que <span className="text-brand-secondary">Atendemos</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className="group/card relative aspect-[4/3] rounded-xl overflow-hidden border border-white/15 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-brand-dark/10" />
                <div className="absolute inset-0 bg-cad-grid opacity-[0.04]" />

                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-secondary/60" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-secondary/60" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-secondary/60" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-secondary/60" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="w-8 h-8 border border-brand-secondary/60 bg-brand-dark/60 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-brand-secondary" />
                  </div>
                  <span className="text-[10px] font-mono text-brand-secondary/90 bg-brand-dark/60 backdrop-blur-sm px-1.5 py-1 tracking-widest border border-brand-secondary/20 rounded">
                    [ {String(cat.id).padStart(2, '0')} ]
                  </span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h3 className="text-base sm:text-lg font-bold font-mono text-white leading-snug mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed line-clamp-2">{cat.teaser}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && ActiveIcon && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-dark/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-brand-dark border border-white/15 rounded-2xl shadow-2xl"
            >
              <div className="relative h-56 sm:h-72 shrink-0">
                <Image src={active.image} alt={active.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
                <div className="absolute inset-0 bg-cad-grid opacity-[0.04]" />
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-secondary/60" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-secondary/60" />

                <button
                  onClick={() => setActiveId(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-secondary hover:border-brand-secondary transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="w-11 h-11 border-2 border-brand-secondary/60 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <ActiveIcon className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-brand-secondary/70 tracking-widest uppercase block">
                      [ {String(active.id).padStart(2, '0')} / {String(categories.length).padStart(2, '0')} ]
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-mono text-white leading-tight">
                      {active.name}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">{active.alcance}</p>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-secondary hover:border-brand-secondary transition-colors"
                aria-label="Categoría anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-secondary hover:border-brand-secondary transition-colors"
                aria-label="Siguiente categoría"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors (warnings about things unrelated to this file are pre-existing and out of scope).

- [ ] **Step 3: Run the production build**

```bash
npm run build
```

Expected: build succeeds with no type errors. If TypeScript complains about `LucideIcon` or any icon name, re-check the exact icon names against `node_modules/lucide-react/dist/lucide-react.d.ts` — all 14 names used here (`Building2, Trees, Mountain, Construction, Landmark, Building, Cog, Plane, Store, PawPrint, Lightbulb, Scale, X, ChevronLeft, ChevronRight`) and the `LucideIcon` type were confirmed present in the installed version during planning.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Sectors.tsx
git commit -m "$(cat <<'EOF'
feat: replace audience sectors with 12 RAA valuation categories

Grid of 12 official RAA categories (merged the duplicated category 9/11
from the source document) with a click-through detail modal replacing
the old 4-item audience carousel.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Manual verification pass

**Files:** none (verification only).

**Interfaces:**
- Consumes: the running dev server at `http://localhost:3000`.

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Expected: starts on `http://localhost:3000` with no compile errors.

- [ ] **Step 2: Visually verify the Sectores section**

Open `http://localhost:3000/#sectores` in a browser (or use the `run` skill if available in this environment to drive/screenshot it) and confirm:
- 12 cards render in a grid (1 column on narrow width, 2 on tablet width, 3 on desktop width), each with a distinct photo, a `[ NN ]` badge, an icon, a name, and a short teaser.
- No broken images (each of the 12 `public/images/sectors/NN-*.jpg` files loads).
- Clicking any card opens the modal with the full "alcance" paragraph, correct icon/name/number, and a large version of the same photo.
- The modal's left/right chevrons and the arrow keys move to the neighboring category (wrapping from 12 back to 1 and from 1 back to 12).
- `Escape` and clicking the dark backdrop both close the modal; clicking inside the modal card does not close it.
- Header text still reads "[ ALCANCE DEL SERVICIO ]" / "Sectores que Atendemos".

- [ ] **Step 3: Stop the dev server**

Stop the `npm run dev` process (Ctrl+C, or kill the background task if it was launched with `run_in_background`).

- [ ] **Step 4: Final sanity commit check**

```bash
git log --oneline -5
git status
```

Expected: the two feature commits from Task 1 and Task 2 are present, and `git status` is clean (no stray uncommitted files from the scratchpad script — it was never inside the repo, so nothing to clean there).
