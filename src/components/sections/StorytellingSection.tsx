'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'

interface Props { onOpenDrawer: () => void }

const clients = [
  { src: '/images/clients/GRUPO-_SURA.png', alt: 'Grupo Sura',         w: 3509, h: 1411, cls: 'max-h-[48px] max-w-[160px]' },
  { src: '/images/clients/camara.webp',      alt: 'Cámara de Comercio', w: 1024, h: 415,  cls: 'max-h-[48px] max-w-[160px]' },
  { src: '/images/clients/dian.webp',        alt: 'DIAN',               w: 194,  h: 51,   cls: 'max-h-[44px] max-w-[140px]' },
  { src: '/images/clients/alcaldia.webp',    alt: 'Alcaldía',           w: 409,  h: 123,  cls: 'max-h-[46px] max-w-[152px]' },
  { src: '/images/clients/afinia.webp',      alt: 'Afinia',             w: 512,  h: 323,  cls: 'max-h-[50px] max-w-[130px]' },
]

const specialties = [
  {
    heading: 'Experiencia Profesional',
    body: 'Más de 15 años liderando avalúos comerciales, industriales y rurales para las principales bancas del país.',
    bullets: ['Avalúos comerciales e industriales', 'Valoración de infraestructura', 'Dictámenes para banca'],
  },
  {
    heading: 'Especialización Técnica',
    body: 'Avaluador certificado RAA/RNA. Experto en estándares IVS y metodologías NIIF para fondos internacionales.',
    bullets: ['Certificación RAA / RNA oficial', 'Estándares IVS y NIIF', 'Consultor fondos inmobiliarios'],
  },
]

export default function StorytellingSection({ onOpenDrawer }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const trackRef      = useRef<HTMLDivElement>(null)
  // Keep hard refs so useEffect cleanup can kill them synchronously before React unmounts the DOM
  const pinSTRef      = useRef<unknown>(null)
  const marqueeRef    = useRef<unknown>(null)

  // Synchronous cleanup — kills GSAP's pin spacer before React removes the DOM node
  useEffect(() => {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(pinSTRef.current as any)?.kill?.()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(marqueeRef.current as any)?.kill?.()
    }
  }, [])

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTriggerModule = await import('gsap/ScrollTrigger')
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule
      gsap.registerPlugin(ScrollTrigger)

      // Entrance — plays once, fully, the moment the profile scrolls into view.
      // Not tied to scroll position, so the profile is always shown complete,
      // never caught half-faded-in.
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      })
        .to('.executive-mask', { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' })
        .from('.screen-2-text', { opacity: 0, x: 30, stagger: 0.15, duration: 0.8, ease: 'power2.out' }, '-=0.6')

      // Pinned crossfade — only toggles between the profile (already fully
      // shown) and the clients screen. Snap has just two valid resting states,
      // so stopping mid-scroll always settles on a complete screen, never blank.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=90%',
          pin: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 'labels',
            duration: { min: 0.3, max: 0.6 },
            ease: 'power1.inOut',
          },
        }
      })
      pinSTRef.current = tl.scrollTrigger

      tl.addLabel('screen2Ready')
      tl.to({}, { duration: 0.4 })
      tl.to('.screen-2', { opacity: 0, y: -40, pointerEvents: 'none', duration: 1, ease: 'power2.inOut' })
      tl.to('.screen-3', { opacity: 1, pointerEvents: 'all', duration: 1, ease: 'power2.inOut' }, '-=0.6')
      tl.addLabel('screen3Ready')
      tl.to({}, { duration: 0.4 })

      // Infinite marquee for client logos
      if (trackRef.current) {
        const marquee = gsap.to(trackRef.current, {
          xPercent: -25,
          duration: 28,
          ease: 'none',
          repeat: -1,
        })
        marqueeRef.current = marquee
        trackRef.current.addEventListener('mouseenter', () => marquee.pause(), { passive: true })
        trackRef.current.addEventListener('mouseleave', () => marquee.play(),  { passive: true })
      }
    })()
  }, { scope: containerRef })

  return (
    <section
      id="quienes-somos"
      ref={containerRef}
      className="relative h-screen bg-white overflow-hidden text-brand-primary"
    >
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        {/* Grid backdrops */}
        <div className="absolute inset-0 bg-cad-grid opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-cad-grid-fine opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 p-6 text-[9px] font-mono text-brand-secondary tracking-widest pointer-events-none">
          [ SECCIÓN: TRAYECTORIA CORPORATIVA ]
        </div>

        {/* ──────────── PANTALLA 2: PERFIL EJECUTIVO ──────────── */}
        <div className="screen-2 absolute inset-0 flex items-center justify-center p-6 sm:p-10 z-20">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-14 items-center">

            {/* LEFT — Photo */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-none">
                <div className="absolute top-2 left-2 text-[8px] font-mono text-brand-secondary/40 z-10">[ IMG_REF: SD_08 ]</div>
                <div className="absolute inset-0 bg-cad-grid-fine opacity-30 z-10 pointer-events-none" />
                <div className="executive-mask opacity-0 scale-95">
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
                Arquitecto con más de 15 años de trayectoria en el sector inmobiliario, respaldado por los 35 años de sólida experiencia, garantizando calidad y confiabilidad en cada resultado.
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

        {/* ──────────── PANTALLA 3: CLIENTES ──────────── */}
        <div className="screen-3 absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-none z-30 overflow-hidden">

          {/* Header */}
          <div className="max-w-6xl w-full mx-auto px-6 sm:px-10 mb-8 shrink-0">
            <span className="text-sm font-mono text-brand-secondary tracking-widest uppercase block mb-2">
              [ NUESTROS CLIENTES ]
            </span>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono text-brand-primary leading-tight">
              Confianza que <span className="text-brand-secondary">respalda resultados.</span>
            </h3>
            <p className="text-base sm:text-lg text-brand-primary/50 mt-3 max-w-2xl font-mono leading-relaxed">
              Empresas del sector financiero, entidades públicas y conglomerados confían en ARQUIAVALÚOS para sus decisiones de valoración.
            </p>
          </div>

          {/* ── Infinite marquee (identical to Partners) ── */}
          <div className="relative w-full overflow-hidden flex items-center h-36">
            <div ref={trackRef} className="flex items-center w-max">
              {[...Array(4)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center gap-10 sm:gap-16 px-5 sm:px-8">
                  {clients.map((client, idx) => (
                    <div
                      key={`${setIdx}-${idx}`}
                      className="client-logo-item relative h-[92px] w-[200px] sm:w-[220px] flex items-center justify-center shrink-0 bg-white border border-brand-primary/10 shadow-sm hover:scale-105 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />
                      <Image
                        src={client.src}
                        alt={client.alt}
                        width={client.w}
                        height={client.h}
                        sizes="220px"
                        style={{ width: 'auto', height: 'auto' }}
                        className={`object-contain px-4 ${client.cls}`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white to-transparent pointer-events-none z-20" />
            <div className="absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />
          </div>

          {/* Stats */}
          <div className="max-w-6xl w-full mx-auto px-6 sm:px-10 mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-brand-primary/10 pt-7">
              {[
                { label: 'Avalúos realizados',    value: '5.000+' },
                { label: 'Entidades financieras', value: '40+'    },
                { label: 'Municipios cubiertos',  value: '120+'   },
                { label: 'Años de experiencia',   value: '15+'    },
              ].map((s, idx) => (
                <div key={idx} className="client-logo-item text-center space-y-1">
                  <div className="text-4xl lg:text-5xl font-bold font-mono text-brand-primary">{s.value}</div>
                  <span className="text-xs font-mono text-brand-secondary uppercase tracking-widest block">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
