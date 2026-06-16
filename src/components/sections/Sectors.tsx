'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { HardHat, Building, Home, UserCheck } from 'lucide-react'

export default function Sectors() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTriggerModule = await import('gsap/ScrollTrigger')
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule
      gsap.registerPlugin(ScrollTrigger)

      // Header entrance using direct ref (more efficient than querying selectors)
      const headerEl = headerRef.current
      if (headerEl) {
        gsap.from(headerEl, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play pause resume pause'
          }
        })
      }

      // Batch animations for cards — reduces ScrollTrigger instances and improves scroll performance
      const cards = gsap.utils.toArray('.sector-card') as Element[]
      if (cards.length) {
        ScrollTrigger.batch(cards, {
          onEnter: batch => gsap.fromTo(batch, { opacity: 0, y: 40, scale: 0.97 }, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.06,
            duration: 0.6,
            ease: 'back.out(1.1)'
          }),
          onEnterBack: batch => gsap.fromTo(batch, { opacity: 0, y: -20, scale: 0.98 }, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: 'power2.out'
          }),
          start: 'top 75%',
          once: false
        })
      }

      // Hover effects (passive listeners)
      const cardElements = cardsRef.current.filter(Boolean)
      cardElements.forEach(card => {
        const onEnter = () => gsap.to(card, { y: -8, duration: 0.28, ease: 'power2.out', overwrite: 'auto' })
        const onLeave = () => gsap.to(card, { y: 0, duration: 0.28, ease: 'power2.out', overwrite: 'auto' })
        card.addEventListener('mouseenter', onEnter, { passive: true })
        card.addEventListener('mouseleave', onLeave, { passive: true })
      })
    })()
  }, { scope: containerRef })

  const sectors = [
    {
      name: 'Propietarios',
      key: 'PART',
      desc: 'Valoraciones comerciales justas para compra-venta, sucesiones e impuestos.',
      icon: UserCheck,
      image: '/images/sectors/residential.png'
    },
    {
      name: 'Constructoras',
      key: 'CONST',
      desc: 'Estudios de factibilidad inmobiliaria, plusvalías y avalúos de lotes.',
      icon: HardHat,
      image: '/images/sectors/construction.png'
    },
    {
      name: 'Empresas Privadas',
      key: 'CORP',
      desc: 'Valoración técnica de activos bajo NIIF, peritajes para seguros y M&A.',
      icon: Building,
      image: '/images/sectors/corporate.png'
    },
    {
      name: 'Entidades Públicas',
      key: 'GOB',
      desc: 'Avalúos catastrales y comerciales conforme normativas del IGAC.',
      icon: Home,
      image: '/images/sectors/government.png'
    }
  ]

  return (
    <section
      id="sectores"
      ref={containerRef}
      className="pt-20 pb-32 sm:pb-48 lg:pb-64 bg-gradient-to-b from-brand-primary via-brand-primary to-brand-primary/95 text-white relative overflow-hidden"
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-cad-grid opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header with premium typography */}
        <div ref={headerRef} className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-mono text-brand-secondary/80 tracking-widest uppercase block mb-4">
            [ ALCANCE DEL SERVICIO ]
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono text-white mb-6 leading-tight">
            Sectores que
            <br />
            <span className="text-brand-secondary">Atendemos</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            Soluciones técnicas especializadas para cada vertical industrial. Nuestros avalúos cumplen con normativas regulatorias de máxima exigencia.
          </p>
        </div>

        {/* Sectors Grid — Simplified centered */}
        <div ref={gridRef} className="flex flex-wrap justify-center gap-6 w-full mb-5 sm:mb-8 lg:mb-10">
          {sectors.map((sector, idx) => {
            const IconComponent = sector.icon
            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) cardsRef.current[idx] = el
                }}
                className="sector-card group relative overflow-hidden rounded-xl border border-white/12 bg-white/8 backdrop-blur-xl hover:border-brand-secondary/50 transition-all duration-500 ease-out shadow-xl hover:shadow-2xl w-full sm:w-1/2 md:w-1/3 lg:w-[280px] min-h-[320px] sm:min-h-[380px] flex-shrink-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Premium background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image with premium overlay */}
                <div className="relative h-40 w-full overflow-hidden bg-gradient-to-b from-brand-primary/30 to-brand-primary/60">
                  <Image
                    src={sector.image}
                    alt={sector.name}
                    fill
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  
                  {/* Dynamic overlay — premium gradient */}
                  <div 
                    className="card-image-overlay absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/60 to-transparent transition-opacity duration-500 ease-out"
                    style={{ opacity: 0.4 }}
                  />
                  
                  {/* CAD grid overlay for tech feel */}
                  <div className="absolute inset-0 bg-cad-grid-fine opacity-10 pointer-events-none mix-blend-overlay" />
                  
                  {/* Tech badge — elevated design */}
                  <div className="absolute top-3 right-3 text-[8px] font-mono text-brand-secondary/90 bg-white/15 backdrop-blur-md px-2 py-1 tracking-widest rounded-lg border border-brand-secondary/20 group-hover:bg-brand-secondary/20 group-hover:text-white transition-all duration-300">
                    [ {sector.key} ]
                  </div>

                  {/* Large Icon on image */}
                  <div className="absolute bottom-3 left-3 w-12 h-12 border-2 border-white/30 bg-white/10 backdrop-blur-lg rounded-lg flex items-center justify-center text-white group-hover:bg-brand-secondary group-hover:border-brand-secondary group-hover:text-brand-primary transition-all duration-400 ease-out shadow-lg">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Content section — compact */}
                <div className="card-hover-zone relative p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-mono text-white group-hover:text-brand-secondary transition-colors duration-300 ease-out tracking-wide">
                      {sector.name}
                    </h3>
                    <div className="absolute top-4 right-4 w-0.5 h-6 bg-gradient-to-b from-brand-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  </div>
                  
                  <p className="text-xs text-white/70 leading-snug group-hover:text-white/85 transition-colors duration-300 ease-out">
                    {sector.desc}
                  </p>

                  {/* Interactive CTAs hint */}
                  <div className="pt-2 flex items-center gap-1.5 text-[10px] font-mono text-brand-secondary/60 group-hover:text-brand-secondary opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <span>Saber más</span>
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Bottom accent line — premium animation */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-secondary via-brand-secondary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />

                {/* Corner accent — top right */}
                <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t border-r border-brand-secondary/30 group-hover:border-brand-secondary/70 transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
