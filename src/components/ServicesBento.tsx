'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Trees, Landmark, Factory, Scale, BookOpen } from 'lucide-react'

export default function ServicesBento() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    // Fade up cells with GSAP on viewport entrance
    gsap.from('.bento-cell', {
      opacity: 0,
      y: 50,
      scale: 0.98,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  }, { scope: containerRef })

  const services = [
    {
      id: '01',
      code: '[ CAT: URB-AV ]',
      title: 'Avalúos Urbanos',
      icon: Building2,
      desc: 'Valoración técnica y comercial de bienes residenciales, apartamentos, casas y edificios de vivienda multifamiliar bajo metodologías de mercado.',
      colSpan: 'md:col-span-8',
      height: 'h-[320px]',
      bgAccent: 'rgba(0, 148, 206, 0.03)'
    },
    {
      id: '02',
      code: '[ CAT: RUR-AV ]',
      title: 'Avalúos Rurales',
      icon: Trees,
      desc: 'Estudio de valor comercial para predios agropecuarios, fincas y tierras de cultivo en todo el territorio nacional.',
      colSpan: 'md:col-span-4',
      height: 'h-[320px]',
      bgAccent: 'rgba(0, 0, 0, 0)'
    },
    {
      id: '03',
      code: '[ CAT: COM-AV ]',
      title: 'Avalúos Comerciales',
      icon: Landmark,
      desc: 'Determinación de valor real para locales, centros comerciales, oficinas corporativas y desarrollos mixtos complejos.',
      colSpan: 'md:col-span-4',
      height: 'h-[340px]',
      bgAccent: 'rgba(0, 0, 0, 0)'
    },
    {
      id: '04',
      code: '[ CAT: IND-AV ]',
      title: 'Avalúos Industriales',
      icon: Factory,
      desc: 'Valoración de plantas industriales, bodegas logísticas, maquinaria pesada y activos de infraestructura corporativa especializada.',
      colSpan: 'md:col-span-8',
      height: 'h-[340px]',
      bgAccent: 'rgba(0, 148, 206, 0.03)'
    },
    {
      id: '05',
      code: '[ CAT: CON-INM ]',
      title: 'Consultoría Inmobiliaria',
      icon: Scale,
      desc: 'Estudios de mayor y mejor uso, asesoría en plusvalía, estructuración técnica de activos y viabilidad de proyectos inmobiliarios.',
      colSpan: 'md:col-span-6',
      height: 'h-[300px]',
      bgAccent: 'rgba(0, 148, 206, 0.03)'
    },
    {
      id: '06',
      code: '[ CAT: FOR-CAP ]',
      title: 'Formación y Capacitación',
      icon: BookOpen,
      desc: 'Programas de capacitación especializada en avalúos, normatividad técnica RAA/RNA y metodologías internacionales de valoración corporativa.',
      colSpan: 'md:col-span-6',
      height: 'h-[300px]',
      bgAccent: 'rgba(0, 0, 0, 0)'
    }
  ]

  return (
    <section
      id="servicios"
      ref={containerRef}
      className="py-24 bg-white dark:bg-white relative"
    >
      {/* Background grids */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-left mb-16 max-w-2xl border-b border-brand-primary/10 pb-8">
          <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
            [ PORTFOLIO TÉCNICO ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-brand-primary dark:text-brand-primary mt-1">
            Servicios de Valoración Integral
          </h2>
          <p className="text-sm text-brand-gray-cool mt-3 leading-relaxed">
            Soluciones de avalúos y consultorías estructuradas bajo estrictos lineamientos normativos nacionales (IGAC, Superfinanciera) y metodologías globales.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((service, idx) => {
            const IconComponent = service.icon
            return (
              <div
                key={idx}
                className={`bento-cell ${service.colSpan} ${service.height} relative group overflow-hidden border border-brand-primary/10 dark:border-brand-primary/10 p-8 flex flex-col justify-between transition-all duration-500 bg-white dark:bg-brand-primary/5 hover:border-brand-secondary/40 hover:shadow-lg`}
                style={{ backgroundColor: service.bgAccent !== 'rgba(0, 0, 0, 0)' ? service.bgAccent : undefined }}
              >
                {/* Architectural Grid fine lines inside Cell */}
                <div className="absolute inset-0 bg-cad-grid-fine opacity-20 pointer-events-none group-hover:scale-[1.03] transition-transform duration-500" />
                
                {/* Coordinates Hover Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(0,148,206,0.03)_0%,transparent_50%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Corner blueprint markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-primary/15 dark:border-brand-primary/15" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-primary/15 dark:border-brand-primary/15" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-primary/15 dark:border-brand-primary/15" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-primary/15 dark:border-brand-primary/15" />

                {/* Top: technical code */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[9px] font-mono text-brand-secondary tracking-widest">
                    {service.code}
                  </span>
                  <span className="text-[10px] font-mono text-brand-gray-cool">
                    REF-0{service.id}
                  </span>
                </div>

                {/* Center / Content */}
                <div className="space-y-4 z-10">
                  <div className="w-12 h-12 border border-brand-secondary/20 flex items-center justify-center text-brand-primary dark:text-brand-primary bg-brand-secondary/5 group-hover:bg-brand-secondary group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-mono text-brand-primary dark:text-brand-primary group-hover:text-brand-secondary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-brand-gray-cool leading-relaxed max-w-md">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom: detailed specs anchor */}
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-secondary hover:text-brand-primary-light z-10 select-none cursor-pointer">
                  <span>[ DETALLES TÉCNICOS ]</span>
                  <span className="w-4 h-[1px] bg-brand-secondary group-hover:w-8 transition-all duration-300" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
