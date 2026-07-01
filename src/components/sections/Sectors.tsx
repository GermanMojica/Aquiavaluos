'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { HardHat, Building, Home, UserCheck } from 'lucide-react'

const sectors = [
  {
    name: 'Propietarios',
    key: 'PART',
    icon: UserCheck,
    image: '/images/sectors/residential.png',
    detail: 'Si eres propietario, tomar decisiones sobre tu inmueble sin un avalúo certificado puede costarte mucho más de lo que crees. Nuestros dictámenes periciales te dan la seguridad técnica y legal que necesitas.',
    bullets: [
      'Avalúo comercial para compraventa de inmuebles',
      'Valoración para procesos de sucesión y herencia',
      'Avalúo para declaración de renta y patrimonio',
      'Dictamen pericial para procesos legales',
    ],
    stats: [
      { value: '5.000+', label: 'Avalúos realizados' },
      { value: '15+', label: 'Años de experiencia' },
    ],
  },
  {
    name: 'Constructoras',
    key: 'CONST',
    icon: HardHat,
    image: '/images/sectors/construction.png',
    detail: 'El éxito de un proyecto depende de cifras reales desde el inicio. Proveemos análisis técnicos rigurosos desde la adquisición del terreno hasta la comercialización.',
    bullets: [
      'Estudios de factibilidad inmobiliaria y de mercado',
      'Avalúos de lotes, terrenos y áreas brutas',
      'Cálculo de plusvalías urbanas y rurales',
      'Avalúos para créditos de construcción y preventas',
    ],
    stats: [
      { value: '120+', label: 'Municipios cubiertos' },
      { value: '40+', label: 'Entidades financieras' },
    ],
  },
  {
    name: 'Empresas Privadas',
    key: 'CORP',
    icon: Building,
    image: '/images/sectors/corporate.png',
    detail: 'Las empresas necesitan cifras confiables para sus estados financieros, fusiones y reestructuraciones. Nuestros avalúos cumplen estándares IVS y NIIF requeridos por auditores internacionales.',
    bullets: [
      'Valoración de activos fijos bajo NIIF / IFRS',
      'Peritajes técnicos para seguros y reclamaciones',
      'Avalúos para fusiones y adquisiciones (M&A)',
      'Dictámenes para estados financieros auditados',
    ],
    stats: [
      { value: 'NIIF', label: 'Estándar internacional' },
      { value: 'IVS', label: 'Metodología aplicada' },
    ],
  },
  {
    name: 'Entidades Públicas',
    key: 'GOB',
    icon: Home,
    image: '/images/sectors/government.png',
    detail: 'El sector público exige transparencia, trazabilidad y cumplimiento normativo. Somos avaluadores certificados RAA/RNA con experiencia en valoraciones estatales y procesos de licitación.',
    bullets: [
      'Avalúos catastrales conforme normativa IGAC',
      'Valoraciones para enajenación voluntaria',
      'Avalúos para procesos de expropiación',
      'Dictámenes para licitaciones y contratos públicos',
    ],
    stats: [
      { value: 'RAA/RNA', label: 'Certificación oficial' },
      { value: 'IGAC', label: 'Normativa cumplida' },
    ],
  },
]

export default function Sectors() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setCurrent(p => (p + 1) % sectors.length), 10000)
    return () => clearInterval(t)
  }, [paused])

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

  const sector = sectors[current]
  const Icon = sector.icon

  return (
    <section
      id="sectores"
      ref={containerRef}
      className="relative overflow-hidden text-white"
    >
      {/* All background images stacked — crossfade via opacity */}
      <div className="absolute inset-0">
        {sectors.map((s, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: i === 0 ? 1 : 0 }}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <Image
              src={s.image}
              alt={s.name}
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-10">

        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-mono text-brand-secondary/80 tracking-widest uppercase block mb-3">
            [ ALCANCE DEL SERVICIO ]
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-mono text-white leading-tight">
            Sectores que <span className="text-brand-secondary">Atendemos</span>
          </h2>
        </div>

        {/* Sector detail — animates on sector change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
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
                  [ {sector.key} ]
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black font-mono text-white leading-tight">
                {sector.name}
              </h3>

              <p className="text-base text-white/80 leading-relaxed max-w-md">
                {sector.detail}
              </p>

              <ul className="space-y-2.5 pt-1">
                {sector.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary mt-[7px] shrink-0" />
                    <span className="text-sm text-white/75">{b}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right column: featured image panel + stats */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-col gap-4"
            >
              {/* Image frame */}
              <div className="relative h-64 xl:h-72 rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                <Image src={sector.image} alt={sector.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-secondary/60" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-secondary/60" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-secondary/60" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-secondary/60" />
                {/* Badge */}
                <div className="absolute top-3 left-3 text-[9px] font-mono text-brand-secondary/90 bg-brand-dark/60 backdrop-blur-sm px-2 py-1 tracking-widest border border-brand-secondary/20 rounded">
                  [ {sector.key} ]
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4">
                {sector.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.4 }}
                    className="relative border border-white/12 bg-white/8 backdrop-blur-md rounded-xl px-5 py-4 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-secondary/30" />
                    <div className="text-2xl xl:text-3xl font-black font-mono text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-mono text-brand-secondary/70 tracking-wider uppercase">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots with progress bar */}
        <div className="flex items-end gap-6 pt-2">
          {sectors.map((s, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPaused(true) }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="flex flex-col gap-1.5 items-start group"
            >
              <span className={`text-[10px] font-mono tracking-wider transition-colors duration-300 ${
                i === current ? 'text-brand-secondary' : 'text-white/35 group-hover:text-white/60'
              }`}>
                {s.name.toUpperCase()}
              </span>
              <div className="relative h-0.5 w-14 bg-white/15 rounded-full overflow-hidden">
                {i === current && (
                  <motion.div
                    key={`bar-${current}`}
                    className="absolute inset-y-0 left-0 bg-brand-secondary rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: paused ? 0 : 10, ease: 'linear' }}
                  />
                )}
                {i < current && (
                  <div className="absolute inset-0 bg-brand-secondary/40 rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
