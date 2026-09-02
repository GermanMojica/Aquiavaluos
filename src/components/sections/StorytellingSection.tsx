'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'

interface Props { onOpenDrawer: () => void }

// Every logo is pre-normalized to an identical 640x240 transparent canvas
// (see scripts/normalize-logos.cjs), so no logo reads as bigger than another.
const LOGO_W = 640
const LOGO_H = 240

const clients = [
  { src: '/images/clients/norm/sura.webp',                   alt: 'Grupo Sura' },
  { src: '/images/clients/norm/gases-del-caribe.webp',       alt: 'Gases del Caribe' },
  { src: '/images/clients/norm/dian.webp',                   alt: 'DIAN' },
  { src: '/images/clients/norm/air-e.webp',                  alt: 'Air-e' },
  { src: '/images/clients/norm/camara.webp',                 alt: 'Cámara de Comercio de Barranquilla' },
  { src: '/images/clients/norm/promigas.webp',               alt: 'Promigas' },
  { src: '/images/clients/norm/alcaldia.webp',               alt: 'Alcaldía de Barranquilla' },
  { src: '/images/clients/norm/banco-agrario.webp',          alt: 'Banco Agrario de Colombia' },
  { src: '/images/clients/norm/children-international.webp', alt: 'Children International' },
  { src: '/images/clients/norm/afinia.webp',                 alt: 'Afinia — Grupo EPM' },
  { src: '/images/clients/norm/oleoflores.webp',             alt: 'Grupo Empresarial Oleoflores' },
]

const specialties = [
  {
    heading: 'Experiencia Profesional',
    body: 'Más de 15 años liderando avalúos comerciales, industriales y rurales para entidades financieras, empresas y organismos públicos en todo el país.',
    bullets: ['Avalúos comerciales e industriales', 'Valoración de infraestructura', 'Informes para entidades financieras'],
  },
  {
    heading: 'Consultoría Inmobiliaria',
    body: 'Avaluador certificado RAA/RNA. Experto en estándares IVS y metodologías NIIF para fondos internacionales.',
    bullets: ['Certificación RAA / RNA oficial', 'Estándares IVS y NIIF', 'Consultor fondos inmobiliarios'],
  },
]

export default function StorytellingSection({ onOpenDrawer }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const clientsSectionRef = useRef<HTMLDivElement>(null)
  const trackRef      = useRef<HTMLDivElement>(null)
  const viewportRef   = useRef<HTMLDivElement>(null)
  const marqueeRef    = useRef<unknown>(null)
  const spotlightRef  = useRef<{ tick: () => void; ticker: { remove: (fn: () => void) => void } } | null>(null)

  // Cleanup marquee animation + spotlight ticker
  useEffect(() => {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(marqueeRef.current as any)?.kill?.()
      if (spotlightRef.current) {
        spotlightRef.current.ticker.remove(spotlightRef.current.tick)
        spotlightRef.current = null
      }
    }
  }, [])

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTriggerModule = await import('gsap/ScrollTrigger')
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule
      gsap.registerPlugin(ScrollTrigger)

      // Entrance animation for Sergio Delgado (Executive Profile)
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })
        .from('.executive-mask', { opacity: 0, scale: 0.95, duration: 1, ease: 'power2.out' })
        .from('.screen-2-text', { opacity: 0, x: 30, stagger: 0.12, duration: 0.8, ease: 'power2.out' }, '-=0.6')

      // Entrance animation for Clients section
      gsap.timeline({
        scrollTrigger: {
          trigger: clientsSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })
        .from('.clients-header', { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' })

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Infinite marquee for client logos
      if (trackRef.current && !reduced) {
        const marquee = gsap.to(trackRef.current, {
          xPercent: -25,
          duration: 44,
          ease: 'none',
          repeat: -1,
        })
        marqueeRef.current = marquee
        trackRef.current.addEventListener('mouseenter', () => marquee.pause(), { passive: true })
        trackRef.current.addEventListener('mouseleave', () => marquee.play(),  { passive: true })
      }

      // Spotlight — a logo swells as it reaches the center of the strip
      // and settles back down on its way out.
      if (viewportRef.current && !reduced) {
        const viewport = viewportRef.current
        const slots = Array.from(viewport.querySelectorAll<HTMLElement>('.logo-slot'))

        const tick = () => {
          const vb = viewport.getBoundingClientRect()
          if (!vb.width) return
          const centerX = vb.left + vb.width / 2
          const falloff = Math.max(240, vb.width * 0.28)

          // read every rect first, then write — no layout thrashing
          const rects = slots.map((el) => el.getBoundingClientRect())

          for (let i = 0; i < slots.length; i++) {
            const r = rects[i]
            if (r.right < vb.left - 100 || r.left > vb.right + 100) continue
            const dist = Math.abs(r.left + r.width / 2 - centerX)
            const t = Math.min(1, Math.max(0, 1 - dist / falloff))
            const e = t * t * (3 - 2 * t) // smoothstep

            const el = slots[i]
            el.style.transform = `scale(${(1 + 0.26 * e).toFixed(4)}) translateZ(0)`
            el.style.opacity   = (0.4 + 0.6 * e).toFixed(3)
            el.style.filter    = `grayscale(${((1 - e) * 0.8).toFixed(3)}) saturate(${(0.55 + 0.45 * e).toFixed(3)})`
          }
        }

        gsap.ticker.add(tick)
        spotlightRef.current = { tick, ticker: gsap.ticker }
        tick()
      }
    })()
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      {/* ──────────── PANTALLA 1: PERFIL EJECUTIVO ──────────── */}
      <section
        id="quienes-somos"
        className="relative min-h-screen bg-white flex items-center justify-center py-20 sm:py-28 overflow-hidden text-brand-primary"
      >
        {/* Grid backdrops */}
        <div className="absolute inset-0 bg-cad-grid opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-cad-grid-fine opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 p-6 text-[9px] font-mono text-brand-secondary tracking-widest pointer-events-none">
          [ SECCIÓN: TRAYECTORIA CORPORATIVA ]
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-14 items-center">

            {/* LEFT — Photo */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-none">
                <div className="absolute inset-0 bg-cad-grid-fine opacity-30 z-10 pointer-events-none" />
                <div className="executive-mask">
                  <Image
                    src="/images/Arquiavaluoss-1-1-1.png"
                    alt="Sergio Delgado — Gerente General de ARQUIAVALÚOS"
                    width={420}
                    height={520}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* RIGHT — Profile */}
            <div className="md:col-span-7 flex flex-col gap-5">

              {/* Label with dash */}
              <div className="screen-2-text flex items-center gap-3">
                <div className="w-8 h-[2px] bg-brand-secondary shrink-0" />
                <span className="text-sm font-mono text-brand-secondary tracking-widest uppercase">
                  PERFIL EJECUTIVO
                </span>
              </div>

              {/* Name */}
              <div className="screen-2-text">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono text-brand-primary leading-[1.0]">
                  Sergio Delgado
                </h2>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono text-brand-secondary leading-[1.0]">
                  Pachón
                </h2>
                <p className="text-sm sm:text-base font-mono text-brand-primary/45 tracking-[0.14em] uppercase mt-3">
                  Gerente General &amp; Fundador
                </p>
              </div>

              {/* Bio */}
              <p className="screen-2-text text-base sm:text-lg text-brand-primary/65 leading-relaxed max-w-lg">
                Arquitecto con más de 15 años de trayectoria en el sector valuatorio, respaldado por 40 años de experiencia profesional, garantizando calidad y confiabilidad en cada resultado.
              </p>

              {/* CTA */}
              <button
                onClick={onOpenDrawer}
                className="screen-2-text self-start flex items-center gap-2 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-mono font-bold text-base px-6 py-3 tracking-wider transition-all duration-200 cursor-pointer"
              >
                SOLICITAR AVALÚO <ArrowUpRight className="w-5 h-5" />
              </button>

              {/* 2-col specialties */}
              <div className="screen-2-text grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-brand-primary/12 pt-5">
                {specialties.map((s, i) => (
                  <div key={i} className="flex flex-col gap-2.5">
                    <h4 className="text-base sm:text-lg font-black font-mono text-brand-primary">{s.heading}</h4>
                    <p className="text-sm text-brand-primary/55 leading-relaxed">{s.body}</p>
                    <ul className="space-y-1.5">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-brand-secondary font-bold text-sm mt-0.5 shrink-0">↗</span>
                          <span className="text-sm text-brand-primary/70">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ──────────── PANTALLA 2: CLIENTES ──────────── */}
      <section
        id="clientes"
        ref={clientsSectionRef}
        className="relative bg-white flex items-center justify-center py-20 sm:py-24 overflow-hidden text-brand-primary border-t border-brand-primary/5"
      >
        {/* Grid backdrops */}
        <div className="absolute inset-0 bg-cad-grid opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-cad-grid-fine opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 p-6 text-[9px] font-mono text-brand-secondary tracking-widest pointer-events-none">
          [ SECCIÓN: CLIENTES ]
        </div>

        <div className="relative w-full z-30 overflow-hidden flex flex-col justify-center gap-10">

          {/* Header */}
          <div className="clients-header max-w-6xl w-full mx-auto px-6 sm:px-10 mb-8 shrink-0">
            <span className="text-sm font-mono text-brand-secondary tracking-widest uppercase block mb-2">
              [ NUESTROS CLIENTES ]
            </span>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono text-brand-primary leading-tight">
              Confianza que <span className="text-brand-secondary">respalda resultados.</span>
            </h3>
            <p className="text-base sm:text-lg text-brand-primary/50 mt-3 max-w-2xl font-mono leading-relaxed">
              Empresas del sector financiero, entidades públicas y conglomerados confían en ARQUIAVALÚOS® para sus decisiones de valoración.
            </p>
          </div>

          {/* -- Infinite marquee with center spotlight -- */}
          <div ref={viewportRef} className="relative w-full overflow-hidden flex items-center h-40 sm:h-44">
            <div ref={trackRef} className="flex items-center w-max">
              {[...Array(4)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center gap-14 sm:gap-20 px-7 sm:px-10">
                  {clients.map((client, idx) => (
                    <div
                      key={`${setIdx}-${idx}`}
                      className="logo-slot relative h-[104px] w-[190px] sm:w-[210px] flex items-center justify-center shrink-0"
                      style={{
                        opacity: 0.4,
                        filter: 'grayscale(0.8) saturate(0.55)',
                        willChange: 'transform, opacity, filter',
                      }}
                    >
                      <Image
                        src={client.src}
                        alt={client.alt}
                        width={LOGO_W}
                        height={LOGO_H}
                        sizes="210px"
                        className="h-[58px] sm:h-[64px] w-auto object-contain select-none pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-20" />
            <div className="absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-20" />
          </div>
        </div>
      </section>
    </div>
  )
}
