'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Landmark, HardHat, Building, Home, Coins, UserCheck } from 'lucide-react'

export default function Sectors() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.from('.sector-card', {
      opacity: 0,
      y: 50,
      scale: 0.95,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    })
  }, { scope: containerRef })

  const sectors = [
    {
      name: 'Entidades Bancarias',
      key: 'BANCOS',
      desc: 'Avalúos homologados para garantías de crédito hipotecario, leasing, comerciales y corporativos.',
      icon: Landmark,
      image: '/images/sectors/banking.png'
    },
    {
      name: 'Constructoras',
      key: 'CONST',
      desc: 'Estudios de factibilidad inmobiliaria, plusvalías, avalúos de lotes y lotes urbanizables.',
      icon: HardHat,
      image: '/images/sectors/construction.png'
    },
    {
      name: 'Empresas Privadas',
      key: 'CORP',
      desc: 'Valoración técnica de activos bajo NIIF, peritajes para seguros, fusiones y adquisiciones.',
      icon: Building,
      image: '/images/sectors/corporate.png'
    },
    {
      name: 'Entidades Públicas',
      key: 'GOB',
      desc: 'Avalúos catastrales y comerciales conforme normativas del IGAC para adquisición de predios públicos.',
      icon: Home,
      image: '/images/sectors/government.png'
    },
    {
      name: 'Inversionistas',
      key: 'INV',
      desc: 'Análisis técnicos de rentabilidad, portafolio de activos reales y estructuración inmobiliaria.',
      icon: Coins,
      image: '/images/sectors/investors.png'
    },
    {
      name: 'Propietarios',
      key: 'PART',
      desc: 'Valoraciones comerciales justas para procesos de compra-venta, sucesiones e impuestos.',
      icon: UserCheck,
      image: '/images/sectors/residential.png'
    }
  ]

  return (
    <section
      id="sectores"
      ref={containerRef}
      className="py-24 bg-slate-50 dark:bg-slate-50 text-brand-primary relative overflow-hidden"
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,148,206,0.06)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-left mb-16 max-w-2xl border-b border-brand-primary/10 pb-8">
          <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
            [ ALCANCE DEL SERVICIO ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-brand-primary dark:text-brand-primary mt-1">
            Sectores que Atendemos
          </h2>
          <p className="text-sm text-brand-gray-cool leading-relaxed mt-3">
            Nuestros informes cumplen con las exigencias regulatorias de diversas industrias, sirviendo como soporte técnico de máxima confiabilidad.
          </p>
        </div>

        {/* Sectors Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, idx) => {
            const IconComponent = sector.icon
            return (
              <div
                key={idx}
                className="sector-card group relative overflow-hidden border border-brand-primary/10 bg-white shadow-sm hover:shadow-xl hover:border-brand-secondary/40 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={sector.image}
                    alt={sector.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/20 to-transparent" />
                  
                  {/* CAD overlay on image */}
                  <div className="absolute inset-0 bg-cad-grid-fine opacity-20 pointer-events-none mix-blend-overlay" />
                  
                  {/* Tech code badge */}
                  <div className="absolute top-3 right-3 text-[8px] font-mono text-white/60 bg-brand-primary/40 backdrop-blur-sm px-2 py-1 tracking-widest">
                    [ SYS_{sector.key} ]
                  </div>

                  {/* Icon floating on image */}
                  <div className="absolute bottom-3 left-4 w-10 h-10 border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-secondary group-hover:border-brand-secondary transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold font-mono text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
                    {sector.name}
                  </h3>
                  <p className="text-xs text-brand-gray-cool leading-relaxed">
                    {sector.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
