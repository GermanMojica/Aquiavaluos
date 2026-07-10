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
