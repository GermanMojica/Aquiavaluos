'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Award, Globe, MapPin } from 'lucide-react'

const standards = ['IVSC', 'NIIF', 'NIC', 'ICONTEC-RNA®', 'ISO 9001']

const reasons = [
  {
    id: 'experiencia',
    icon: Award,
    tag: 'EXPERIENCIA Y TRAYECTORIA',
    title: 'Experiencia y Trayectoria',
    body: 'Contamos con 15 años de experiencia en la industria de la valoración de bienes y consultorías inmobiliarias, respaldados por los 35 años de sólida trayectoria y reconocida experiencia del arquitecto SERGIO DELGADO PACHÓN, lo que garantiza un servicio de calidad y confiabilidad en los resultados.',
    tags: null,
    highlight: [
      { value: '5.0K+', label: 'Avalúos realizados' },
      { value: '40+', label: 'Entidades financieras' },
      { value: '15+', label: 'Años en el sector' },
    ],
    fromLeft: true,
  },
  {
    id: 'normas',
    icon: Globe,
    tag: 'NORMAS INTERNACIONALES',
    title: 'Normas y Estándares Internacionales',
    body: 'Nuestros servicios se basan en Normas Internacionales de Valuación del IVSC, Normas Técnicas Sectoriales de Valuación ICONTEC-RNA®, Normas Internacionales de Información Financiera NIIF, Normas Internacionales de Contabilidad NIC y/o en el marco de las normas y legislación nacional vigente en Colombia. Esto garantiza que nuestros avalúos se realicen bajo los estándares más rigurosos y actualizados.',
    tags: standards,
    highlight: [
      { value: 'NIIF', label: 'Estándar internacional' },
      { value: 'IVS', label: 'Metodología aplicada' },
      { value: 'ISO 9001', label: 'Certificación calidad' },
    ],
    fromLeft: false,
  },
  {
    id: 'cobertura',
    icon: MapPin,
    tag: 'COBERTURA NACIONAL',
    title: 'Cobertura Nacional y Local',
    body: 'Nuestra cobertura se extiende a nivel nacional, gracias a asociados locales en las principales ciudades y regiones del país. Esto asegura que podamos brindar un servicio directo y eficiente en todo el territorio colombiano.',
    tags: null,
    highlight: [
      { value: '120+', label: 'Municipios cubiertos' },
      { value: 'RAA/RNA', label: 'Certificación oficial' },
      { value: 'IGAC', label: 'Normativa cumplida' },
    ],
    fromLeft: true,
  },
]

export default function BlueprintTransition() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTriggerModule = await import('gsap/ScrollTrigger')
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule
      gsap.registerPlugin(ScrollTrigger)

      // Header
      gsap.timeline({
        scrollTrigger: {
          trigger: '.why-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      })
        .from('.why-label', { opacity: 0, y: 18, duration: 0.55, ease: 'power2.out' })
        .from('.why-title', { opacity: 0, y: 26, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .from('.why-subtitle', { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' }, '-=0.35')

      // Each card reveals independently on scroll
      reasons.forEach((r) => {
        const xFrom = r.fromLeft ? -60 : 60
        gsap.fromTo(
          `.why-card-${r.id}`,
          { opacity: 0, x: xFrom, y: 30 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `.why-card-${r.id}`,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        )
        // Stat pills reveal with stagger after card arrives
        gsap.fromTo(
          `.why-stat-${r.id}`,
          { opacity: 0, y: 12, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `.why-card-${r.id}`,
              start: 'top 72%',
              toggleActions: 'play none none none',
            }
          }
        )
        // Tags (normas card)
        if (r.tags) {
          gsap.fromTo(
            `.why-tag-${r.id}`,
            { opacity: 0, y: 8 },
            {
              opacity: 1, y: 0,
              duration: 0.4,
              stagger: 0.07,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: `.why-card-${r.id}`,
                start: 'top 72%',
                toggleActions: 'play none none none',
              }
            }
          )
        }
      })
    })()
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative bg-white py-20 sm:py-28 px-6 overflow-hidden text-brand-primary"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-16 sm:gap-24">

        {/* Header */}
        <div className="why-header text-center">
          <span className="why-label text-[10px] font-mono text-brand-secondary tracking-[0.22em] uppercase block mb-4">
            [ DIFERENCIADORES CLAVE ]
          </span>
          <h2 className="why-title text-4xl sm:text-5xl lg:text-6xl font-black font-mono leading-tight text-brand-primary">
            ¿Por qué elegir{' '}
            <span className="text-brand-secondary">Arquiavalúos?</span>
          </h2>
          <p className="why-subtitle text-base sm:text-lg text-brand-gray-cool mt-4 max-w-2xl mx-auto leading-relaxed">
            Tres razones fundamentales que nos distinguen en el sector de la valoración inmobiliaria en Colombia.
          </p>
        </div>

        {/* Cards — stacked, each appearing on scroll */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon
            const isEven = idx % 2 === 0

            return (
              <div
                key={reason.id}
                className={`why-card-${reason.id} grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center`}
              >
                {/* Number label — alternates sides */}
                <div className={`flex flex-col gap-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Tag */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-secondary/15 border border-brand-secondary/30 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-secondary" />
                    </div>
                    <span className="text-[10px] font-mono text-brand-secondary tracking-[0.18em] uppercase">
                      {reason.tag}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-brand-secondary/50 to-transparent" />

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-brand-primary leading-snug">
                    {reason.title}
                  </h3>

                  {/* Body */}
                  <p className="text-base text-brand-primary/65 leading-relaxed">
                    {reason.body}
                  </p>

                  {/* Standards tags */}
                  {reason.tags && (
                    <div className="flex flex-wrap gap-2">
                      {reason.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`why-tag-${reason.id} text-[10px] font-mono font-bold px-3 py-1.5 rounded-md bg-brand-secondary/15 border border-brand-secondary/30 text-brand-secondary tracking-widest`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stats card — alternates sides */}
                <div className={`relative bg-gradient-to-br from-brand-secondary/[0.06] to-white border border-brand-primary/10 rounded-2xl p-7 sm:p-10 overflow-hidden shadow-md hover:border-brand-secondary/30 transition-colors duration-500 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {/* Corner marks */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-secondary/60" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-secondary/25" />
                  {/* Ambient glow */}
                  <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-secondary/[0.08] rounded-full blur-3xl pointer-events-none" />

                  {/* Big number */}
                  <div className="relative z-10 text-[6rem] sm:text-[8rem] font-black font-mono text-brand-primary/[0.05] leading-none select-none absolute -bottom-4 -right-2">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="relative z-10 flex flex-col gap-6">
                    <span className="text-[10px] font-mono text-brand-secondary/70 tracking-widest uppercase">
                      [ MÉTRICAS CLAVE ]
                    </span>
                    <div className="grid grid-cols-3 gap-4">
                      {reason.highlight.map((h, i) => (
                        <div key={i} className={`why-stat-${reason.id} flex flex-col gap-1`}>
                          <div className="text-xl sm:text-2xl font-black font-mono text-brand-secondary">
                            {h.value}
                          </div>
                          <div className="text-[10px] font-mono text-brand-primary/50 uppercase tracking-widest leading-tight">
                            {h.label}
                          </div>
                        </div>
                      ))}
                    </div>
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
