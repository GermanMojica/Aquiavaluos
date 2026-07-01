'use client'

import { useRef, useEffect } from 'react'
import { Award, Globe, MapPin } from 'lucide-react'

const standards = ['IVSC', 'NIIF', 'NIC', 'ICONTEC-RNA®', 'ISO 9001']

export default function BlueprintTransition() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()

        const gsapModule = await import('gsap')
        const gsap = gsapModule.gsap || gsapModule.default || gsapModule

        const tl = gsap.timeline()

        // 1. Header
        tl.fromTo('.why-label',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        )
        tl.fromTo('.why-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
          '-=0.35'
        )

        // 2. Cards arrive together, calmly — no directional slides
        tl.fromTo(['.why-card-exp', '.why-card-normas', '.why-card-cob'],
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.16 },
          '-=0.3'
        )

        // 3. Card 1 — divider draws, then the headline counter arrives
        tl.fromTo('.why-exp-bar',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.3, ease: 'power2.inOut', transformOrigin: 'left' },
          '-=0.55'
        )

        const c15 = { v: 0 }
        tl.to(c15, {
          v: 15, duration: 1.6, ease: 'power1.out',
          onUpdate: () => {
            const el = container.querySelector('#cnt-15')
            if (el) el.textContent = Math.round(c15.v).toString()
          }
        }, '-=1.1')

        const c35 = { v: 0 }
        tl.to(c35, {
          v: 35, duration: 1.3, ease: 'power1.out',
          onUpdate: () => {
            const el = container.querySelector('#cnt-35')
            if (el) el.textContent = Math.round(c35.v).toString()
          }
        }, '-=1.2')

        const c5k = { v: 0 }
        tl.to(c5k, {
          v: 5000, duration: 1.3, ease: 'power1.out',
          onUpdate: () => {
            const el = container.querySelector('#cnt-5k')
            if (el) el.textContent = (Math.round(c5k.v / 100) / 10).toFixed(1) + 'K'
          }
        }, '-=0.9')

        const c40 = { v: 0 }
        tl.to(c40, {
          v: 40, duration: 1.1, ease: 'power1.out',
          onUpdate: () => {
            const el = container.querySelector('#cnt-40')
            if (el) el.textContent = Math.round(c40.v).toString()
          }
        }, '<')

        // 4. Card 2 — standards tags settle in gently, no bounce
        tl.fromTo('.std-tag',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09, ease: 'power2.out' },
          '-=1.0'
        )

        // 5. Card 3 — coverage counter and dot grid
        const c120 = { v: 0 }
        tl.to(c120, {
          v: 120, duration: 1.3, ease: 'power1.out',
          onUpdate: () => {
            const el = container.querySelector('#cnt-120')
            if (el) el.textContent = Math.round(c120.v).toString()
          }
        }, '-=0.9')

        tl.fromTo('.cov-dot',
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.025, ease: 'power2.out' },
          '-=1.0'
        )
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative bg-white py-20 sm:py-28 px-6 overflow-hidden text-brand-primary"
    >
      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-10 sm:gap-14">

        {/* ── Header ── */}
        <div className="text-center">
          <span className="why-label text-[10px] font-mono text-brand-secondary tracking-[0.22em] uppercase block mb-4 opacity-0">
            [ DIFERENCIADORES CLAVE ]
          </span>
          <h2 className="why-title text-4xl sm:text-5xl lg:text-6xl font-black font-mono leading-tight opacity-0 text-brand-primary">
            ¿Por qué elegir{' '}
            <span className="text-brand-secondary">Arquiavalúos?</span>
          </h2>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5">

          {/* ━━━ CARD 1: EXPERIENCIA ━━━ */}
          <div className="why-card-exp relative flex flex-col justify-between bg-gradient-to-br from-brand-secondary/[0.06] to-white border border-brand-primary/10 rounded-2xl overflow-hidden group hover:border-brand-secondary/30 transition-colors duration-500 opacity-0 p-6 sm:p-8 lg:p-10 shadow-md">
            {/* Ambient glow */}
            <div className="absolute -top-28 -left-28 w-96 h-96 bg-brand-secondary/[0.08] rounded-full blur-3xl pointer-events-none" />
            {/* Corner marks */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-secondary/60" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-primary/10" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-brand-primary/10" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-secondary/25" />

            <div>
              {/* Field label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-lg bg-brand-secondary/20 border border-brand-secondary/35 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-brand-secondary" />
                </div>
                <span className="text-[10px] font-mono text-brand-secondary tracking-[0.18em] uppercase">
                  FIELD_01 / EXPERIENCIA & TRAYECTORIA
                </span>
              </div>

              {/* Giant counter */}
              <div className="flex items-start gap-3 mb-3">
                <span
                  id="cnt-15"
                  className="font-black font-mono text-brand-primary leading-none tabular-nums"
                  style={{ fontSize: 'clamp(3.5rem, 14vw, 9rem)' }}
                >
                  0
                </span>
                <div className="flex flex-col mt-3">
                  <span className="text-3xl font-black font-mono text-brand-secondary leading-none">+</span>
                  <span className="text-[10px] font-mono text-brand-primary/55 tracking-[0.18em] uppercase mt-3 leading-loose">
                    AÑOS<br />EN EL<br />SECTOR
                  </span>
                </div>
              </div>

              {/* Animated progress bar */}
              <div className="relative h-[2px] w-full bg-brand-primary/10 rounded-full mb-6 overflow-hidden">
                <div
                  className="why-exp-bar absolute inset-y-0 left-0 w-full rounded-full"
                  style={{
                    background: 'linear-gradient(to right, #0094CE, rgba(0,148,206,0.25))',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                />
              </div>

              <p className="text-sm text-brand-primary/65 leading-relaxed max-w-lg">
                Respaldados por los{' '}
                <span className="text-brand-primary/90 font-bold font-mono">
                  <span id="cnt-35">0</span>+ años
                </span>{' '}
                de trayectoria del arquitecto Sergio Delgado Pachón — calidad y confiabilidad garantizadas en cada resultado.
              </p>
            </div>

            {/* Bottom stat row */}
            <div className="flex gap-6 sm:gap-10 mt-8 sm:mt-10 pt-6 border-t border-brand-primary/10">
              <div>
                <div className="text-2xl font-black font-mono text-brand-secondary tabular-nums">
                  <span id="cnt-5k">0</span>+
                </div>
                <div className="text-[10px] font-mono text-brand-primary/50 uppercase tracking-widest mt-1">Avalúos realizados</div>
              </div>
              <div>
                <div className="text-2xl font-black font-mono text-brand-secondary tabular-nums">
                  <span id="cnt-40">0</span>+
                </div>
                <div className="text-[10px] font-mono text-brand-primary/50 uppercase tracking-widest mt-1">Entidades financieras</div>
              </div>
            </div>
          </div>

          {/* ━━━ Right column ━━━ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">

            {/* CARD 2: NORMAS */}
            <div className="why-card-normas relative flex flex-col gap-5 bg-white border border-brand-primary/10 rounded-2xl overflow-hidden group hover:border-brand-secondary/25 transition-colors duration-500 opacity-0 p-7 shadow-md">
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-brand-secondary/[0.06] rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-brand-secondary/55" />
              <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-brand-secondary/20" />

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-secondary/20 border border-brand-secondary/35 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-brand-secondary" />
                </div>
                <span className="text-[10px] font-mono text-brand-secondary tracking-[0.18em] uppercase">
                  FIELD_02 / NORMAS INTERNACIONALES
                </span>
              </div>

              <div className="h-px bg-gradient-to-r from-brand-secondary/50 to-transparent" />

              <div className="flex flex-wrap gap-2">
                {standards.map((s) => (
                  <span
                    key={s}
                    className="std-tag text-[10px] font-mono font-bold px-3 py-1.5 rounded-md bg-brand-secondary/15 border border-brand-secondary/30 text-brand-secondary tracking-widest opacity-0"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="text-xs text-brand-primary/60 leading-relaxed">
                Avalúos bajo los marcos más rigurosos — auditables y reconocidos internacionalmente en Colombia y el exterior.
              </p>
            </div>

            {/* CARD 3: COBERTURA */}
            <div className="why-card-cob relative flex flex-col gap-5 bg-white border border-brand-primary/10 rounded-2xl overflow-hidden group hover:border-brand-secondary/25 transition-colors duration-500 opacity-0 p-7 shadow-md">
              <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-brand-secondary/[0.06] rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-brand-secondary/55" />
              <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-brand-secondary/20" />

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-secondary/20 border border-brand-secondary/35 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-brand-secondary" />
                </div>
                <span className="text-[10px] font-mono text-brand-secondary tracking-[0.18em] uppercase">
                  FIELD_03 / COBERTURA NACIONAL
                </span>
              </div>

              <div className="h-px bg-gradient-to-r from-brand-secondary/50 to-transparent" />

              <div className="flex items-end gap-3">
                <div className="flex items-start">
                  <span
                    id="cnt-120"
                    className="font-black font-mono text-brand-primary leading-none tabular-nums"
                    style={{ fontSize: 'clamp(2.25rem, 9vw, 4.5rem)' }}
                  >
                    0
                  </span>
                  <span className="text-xl font-black font-mono text-brand-secondary mt-1">+</span>
                </div>
                <span className="text-[10px] font-mono text-brand-primary/55 uppercase tracking-widest mb-1 leading-loose">
                  municipios<br />cubiertos
                </span>
              </div>

              {/* Coverage dot grid */}
              <div className="flex flex-wrap gap-[5px]">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    className="cov-dot w-[7px] h-[7px] rounded-full opacity-0"
                    style={{
                      backgroundColor: i < 14
                        ? 'rgba(0,148,206,0.85)'
                        : i < 22
                          ? 'rgba(0,148,206,0.35)'
                          : 'rgba(26,62,112,0.12)',
                    }}
                  />
                ))}
              </div>

              <p className="text-xs text-brand-primary/60 leading-relaxed">
                Asociados locales en las principales ciudades — servicio directo y eficiente en todo el territorio colombiano.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
