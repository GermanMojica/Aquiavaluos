'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Landmark, HardHat, Building, Home, Coins, UserCheck } from 'lucide-react'

export default function Sectors() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    // Fade up cells with GSAP on viewport entrance
    gsap.from('.sector-node', {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  }, { scope: containerRef })

  const sectors = [
    { name: 'Entidades Bancarias', key: 'BANCOS', desc: 'Avalúos homologados para garantías de crédito hipotecario, leasing, comerciales y corporativos.', icon: Landmark },
    { name: 'Constructoras', key: 'CONST', desc: 'Estudios de factibilidad inmobiliaria, plusvalías, avalúos de lotes y lotes urbanizables.', icon: HardHat },
    { name: 'Empresas Privadas', key: 'CORP', desc: 'Valoración técnica de activos bajo NIIF, peritajes para seguros, fusiones y adquisiciones.', icon: Building },
    { name: 'Entidades Públicas', key: 'GOB', desc: 'Avalúos catastrales y comerciales conforme normativas del IGAC para adquisición de predios públicos.', icon: Home },
    { name: 'Inversionistas', key: 'INV', desc: 'Análisis técnicos de rentabilidad, portafolio de activos reales y estructuración inmobiliaria.', icon: Coins },
    { name: 'Propietarios', key: 'PART', desc: 'Valoraciones comerciales justas para procesos de compra-venta, sucesiones e impuestos.', icon: UserCheck }
  ]

  return (
    <section
      id="sectores"
      ref={containerRef}
      className="py-24 bg-slate-50 dark:bg-slate-50 text-brand-primary relative overflow-hidden"
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,148,206,0.08)_0%,transparent_60%)] pointer-events-none" />
      
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

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, idx) => {
            const IconComponent = sector.icon
            return (
              <div
                key={idx}
                className="sector-node group relative border border-brand-primary/10 dark:border-brand-primary/10 p-6 bg-white dark:bg-white hover:border-brand-secondary/40 hover:bg-slate-100/50 dark:hover:bg-slate-100/50 transition-all duration-300 shadow-sm"
              >
                {/* Tech code in corners */}
                <div className="absolute top-2 right-2 text-[8px] font-mono text-brand-secondary/40">
                  [ SYS_{sector.key} ]
                </div>
                
                {/* Visual Line Decorator */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary bg-brand-secondary/5 group-hover:bg-brand-secondary group-hover:text-white transition-all duration-300 shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-2 text-left">
                    <h3 className="text-base font-bold font-mono text-brand-primary dark:text-brand-primary group-hover:text-brand-secondary transition-colors">
                      {sector.name}
                    </h3>
                    <p className="text-xs text-brand-gray-cool leading-relaxed">
                      {sector.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
