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

const AUTOPLAY_MS = 8000

export default function Sectors() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setCurrent((p) => (p + 1) % categories.length), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused])

  const goPrev = () => {
    setCurrent((p) => (p - 1 + categories.length) % categories.length)
    setPaused(true)
  }
  const goNext = () => {
    setCurrent((p) => (p + 1) % categories.length)
    setPaused(true)
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

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

  const category = categories[current]
  const Icon = category.icon

  return (
    <section
      id="sectores"
      ref={containerRef}
      className="relative overflow-hidden text-white group"
    >
      {/* All background images stacked — crossfade via opacity */}
      <div className="absolute inset-0">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            className="absolute inset-0"
            initial={{ opacity: i === 0 ? 1 : 0 }}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </motion.div>
        ))}
        {/* Dark overlay — left heavier for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/40" />
        <div className="absolute inset-0 bg-cad-grid opacity-[0.04] pointer-events-none" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-mono text-brand-secondary/80 tracking-widest uppercase block mb-3">
            [ ALCANCE DEL SERVICIO ]
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-mono text-white leading-tight">
            Sectores que <span className="text-brand-secondary">Atendemos</span>
          </h2>
        </div>

        {/* Category detail — animates on category change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
          >
            {/* Left column: text */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 border-2 border-brand-secondary/60 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-secondary" />
                </div>
                <span className="text-xs font-mono text-brand-secondary/70 tracking-widest uppercase">
                  [ {String(category.id).padStart(2, '0')} / {String(categories.length).padStart(2, '0')} ]
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black font-mono text-white leading-tight">
                {category.name}
              </h3>

              <p className="text-base font-semibold text-white/90 leading-relaxed max-w-md">
                {category.teaser}
              </p>

              <p className="text-sm text-white/70 leading-relaxed max-w-md">
                {category.alcance}
              </p>
            </div>

            {/* Right column: featured image panel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              <div className="relative h-64 xl:h-80 rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                <Image src={category.image} alt={category.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-secondary/60" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-secondary/60" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-secondary/60" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-secondary/60" />
                {/* Badge */}
                <div className="absolute top-3 left-3 text-[9px] font-mono text-brand-secondary/90 bg-brand-dark/60 backdrop-blur-sm px-2 py-1 tracking-widest border border-brand-secondary/20 rounded">
                  [ {String(category.id).padStart(2, '0')} ]
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation: arrows + scrollable progress tabs (01–12) */}
        <div className="flex items-center gap-4">
          {/* Prev arrow */}
          <button
            onClick={goPrev}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-secondary hover:border-brand-secondary transition-all duration-300 opacity-0 group-hover:opacity-100 shrink-0 shadow-md"
            style={{ opacity: paused ? 1 : undefined }}
            aria-label="Categoría anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Tabs */}
          <div className="flex-1 flex items-end gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => { setCurrent(i); setPaused(true) }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="flex flex-col gap-1.5 items-center shrink-0 group/dot px-0.5"
                aria-label={cat.name}
                title={cat.name}
              >
                <span className={`text-[10px] font-mono tracking-wider transition-colors duration-300 ${
                  i === current ? 'text-brand-secondary' : 'text-white/35 group-hover/dot:text-white/60'
                }`}>
                  {String(cat.id).padStart(2, '0')}
                </span>
                <div className="relative h-0.5 w-8 bg-white/15 rounded-full overflow-hidden">
                  {i === current && (
                    <motion.div
                      key={`bar-${current}`}
                      className="absolute inset-y-0 left-0 bg-brand-secondary rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  )}
                  {i < current && (
                    <div className="absolute inset-0 bg-brand-secondary/40 rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={goNext}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-secondary hover:border-brand-secondary transition-all duration-300 opacity-0 group-hover:opacity-100 shrink-0 shadow-md"
            style={{ opacity: paused ? 1 : undefined }}
            aria-label="Siguiente categoría"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
