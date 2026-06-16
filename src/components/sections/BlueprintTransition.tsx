'use client'

import { useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'

/* ------------------------------------------------------------------ */
/*  BlueprintTransition                                                */
/*  Immersive CAD/blueprint scroll-driven transition Servicios→Sectores*/
/* ------------------------------------------------------------------ */

export default function BlueprintTransition() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const initPaths = useCallback((selector: string, container: HTMLElement) => {
    const paths = container.querySelectorAll<SVGPathElement>(selector)
    paths.forEach(p => {
      if (typeof p.getTotalLength === 'function') {
        const len = p.getTotalLength()
        p.style.strokeDasharray = `${len}`
        p.style.strokeDashoffset = `${len}`
      }
    })
    return paths
  }, [])

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTriggerModule = await import('gsap/ScrollTrigger')
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule
      gsap.registerPlugin(ScrollTrigger)

      const el = sectionRef.current
      if (!el) return

      /* Reduced-motion guard */
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.querySelectorAll<SVGPathElement>('.bp-line, .bp-det').forEach(p => {
          if (typeof p.getTotalLength === 'function') {
            p.style.strokeDasharray = 'none'
            p.style.strokeDashoffset = '0'
          }
        })
        return
      }

      /* Prepare SVG stroke draw */
      const mainPaths = initPaths('.bp-line', el)
      const detPaths  = initPaths('.bp-det', el)

      /* Master pinned timeline — optimized for performance */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=100%',
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      /* ─── Phase 1: Coords + frame corners + badges (0→20%) ─── */
      tl.fromTo(el.querySelectorAll('.bp-coord'), 
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.3, ease: 'none' }
      )
      .fromTo(el.querySelectorAll('.bp-fc'),
        { opacity: 0 },
        { opacity: 1, stagger: 0.02, duration: 0.15, ease: 'none' },
        '-=0.15'
      )
      .fromTo(el.querySelectorAll('.bp-badge'),
        { opacity: 0, y: 8, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.3, ease: 'power2.out' },
        '-=0.08'
      )

      /* ─── Phase 2: SVG walls draw (20→55%) — Simplified ─── */
      .to(mainPaths, {
        strokeDashoffset: 0, stagger: 0.02, duration: 1.2, ease: 'none'
      })
      .to(detPaths, {
        strokeDashoffset: 0, stagger: 0.01, duration: 0.7, ease: 'none'
      }, '-=0.6')
      .fromTo(el.querySelectorAll('.bp-label'),
        { opacity: 0 },
        { opacity: 1, stagger: 0.02, duration: 0.2, ease: 'none' },
        '-=0.3'
      )

      /* ─── Phase 3: Dimensions (55→70%) ─── */
      .fromTo(el.querySelectorAll('.bp-dim'),
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, transformOrigin: 'left center', stagger: 0.03, duration: 0.3, ease: 'none' }
      )
      .fromTo(el.querySelectorAll('.bp-meas'),
        { opacity: 0 },
        { opacity: 1, stagger: 0.03, duration: 0.2, ease: 'none' },
        '-=0.1'
      )

      /* ─── Phase 4: Text (70→85%) ─── */
      .fromTo(el.querySelector('.bp-title'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'none' }
      )
      .fromTo(el.querySelector('.bp-sub'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'none' },
        '-=0.1'
      )
      .fromTo(el.querySelector('.bp-scanl'),
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.7, transformOrigin: 'center', duration: 0.25, ease: 'none' },
        '-=0.08'
      )

      /* ─── Phase 5: Smooth fade out (85→100%) ─── */
      .to(el.querySelector('.bp-wrap'), {
        opacity: 0, duration: 0.5, ease: 'power1.in'
      }, '+=0.1')
    })()

  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#f6f9fc' }}
    >
      <div className="bp-wrap absolute inset-0">

        {/* ═══ BG: Always-visible grid ═══ */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-100" />
        <div className="absolute inset-0 bg-blueprint-grid-fine opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(246,249,252,0.9)_100%)]" />

        {/* ═══ X/Y Axis Labels (always visible, faint) ═══ */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-8 pointer-events-none">
          {['0','2','4','6','8','10','12','14','16'].map((v,i) => (
            <span key={`x${i}`} className="text-[8px] font-mono text-brand-secondary/25 select-none">{v}m</span>
          ))}
        </div>
        <div className="absolute top-0 bottom-0 left-2 flex flex-col justify-between py-8 pointer-events-none">
          {['12','10','8','6','4','2','0'].map((v,i) => (
            <span key={`y${i}`} className="text-[8px] font-mono text-brand-secondary/25 select-none">{v}m</span>
          ))}
        </div>

        {/* ═══ Corner Coordinates ═══ */}
        <div className="bp-coord absolute top-4 left-5 opacity-0">
          <span className="text-[9px] font-mono text-brand-primary/20 tracking-wider block">COORD_SYS::WGS84</span>
          <span className="text-[9px] font-mono text-brand-secondary/35 tracking-wider block">N 4°42&apos;35.2&quot; / W 74°03&apos;12.8&quot;</span>
        </div>
        <div className="bp-coord absolute top-4 right-5 opacity-0 text-right">
          <span className="text-[9px] font-mono text-brand-primary/20 tracking-wider block">REF::AV-2024-0847</span>
          <span className="text-[9px] font-mono text-brand-primary/15 tracking-wider block">ESC 1:200 · FORMATO A1</span>
        </div>
        <div className="bp-coord absolute bottom-4 left-5 opacity-0">
          <span className="text-[9px] font-mono text-brand-primary/15 tracking-wider block">NORMA IGAC · RES. 620/2008</span>
        </div>
        <div className="bp-coord absolute bottom-4 right-5 opacity-0 text-right">
          <span className="text-[9px] font-mono text-brand-secondary/30 tracking-wider block">SYS_CAT::URB_4521 · HOJA 01/01</span>
        </div>

        {/* Frame corners */}
        <div className="bp-fc opacity-0 absolute top-1.5 left-1.5 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-brand-secondary/20" />
        <div className="bp-fc opacity-0 absolute top-1.5 right-1.5 w-4 h-4 border-t-[1.5px] border-r-[1.5px] border-brand-secondary/20" />
        <div className="bp-fc opacity-0 absolute bottom-1.5 left-1.5 w-4 h-4 border-b-[1.5px] border-l-[1.5px] border-brand-secondary/20" />
        <div className="bp-fc opacity-0 absolute bottom-1.5 right-1.5 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-brand-secondary/20" />

        {/* ═══ SVG Architectural Floor Plan ═══ */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            viewBox="0 0 800 500"
            className="w-[82vw] max-w-[860px] h-auto"
            fill="none"
            aria-hidden="true"
          >
            {/* Outer walls */}
            <path className="bp-line" d="M100 80 L700 80" stroke="#0094CE" strokeWidth="2.5" strokeLinecap="square"/>
            <path className="bp-line" d="M700 80 L700 420" stroke="#0094CE" strokeWidth="2.5" strokeLinecap="square"/>
            <path className="bp-line" d="M700 420 L100 420" stroke="#0094CE" strokeWidth="2.5" strokeLinecap="square"/>
            <path className="bp-line" d="M100 420 L100 80" stroke="#0094CE" strokeWidth="2.5" strokeLinecap="square"/>

            {/* Corridor */}
            <path className="bp-line" d="M100 250 L700 250" stroke="#0094CE" strokeWidth="1.5"/>

            {/* Verticals */}
            <path className="bp-line" d="M280 80 L280 250" stroke="#0094CE" strokeWidth="1.5"/>
            <path className="bp-line" d="M280 250 L280 420" stroke="#0094CE" strokeWidth="1.5"/>
            <path className="bp-line" d="M520 80 L520 250" stroke="#0094CE" strokeWidth="1.5"/>
            <path className="bp-line" d="M520 250 L520 420" stroke="#0094CE" strokeWidth="1.5"/>

            {/* Interior walls */}
            <path className="bp-line" d="M400 80 L400 250" stroke="#0094CE" strokeWidth="1"/>
            <path className="bp-line" d="M400 250 L400 420" stroke="#0094CE" strokeWidth="1"/>
            <path className="bp-line" d="M180 250 L180 420" stroke="#0094CE" strokeWidth="1"/>
            <path className="bp-line" d="M610 250 L610 420" stroke="#0094CE" strokeWidth="1"/>

            {/* Door arcs */}
            <path className="bp-det" d="M280 140 A30 30 0 0 1 310 170" stroke="#0094CE" strokeWidth="0.7" opacity="0.5"/>
            <path className="bp-det" d="M520 140 A30 30 0 0 0 490 170" stroke="#0094CE" strokeWidth="0.7" opacity="0.5"/>
            <path className="bp-det" d="M280 310 A30 30 0 0 0 310 340" stroke="#0094CE" strokeWidth="0.7" opacity="0.5"/>
            <path className="bp-det" d="M400 310 A30 30 0 0 1 370 340" stroke="#0094CE" strokeWidth="0.7" opacity="0.5"/>
            <path className="bp-det" d="M180 310 A25 25 0 0 0 205 335" stroke="#0094CE" strokeWidth="0.7" opacity="0.5"/>
            <path className="bp-det" d="M610 310 A25 25 0 0 1 585 335" stroke="#0094CE" strokeWidth="0.7" opacity="0.5"/>

            {/* Window ticks */}
            <path className="bp-det" d="M150 75 L150 85" stroke="#0094CE" strokeWidth="0.5" opacity="0.4"/>
            <path className="bp-det" d="M220 75 L220 85" stroke="#0094CE" strokeWidth="0.5" opacity="0.4"/>
            <path className="bp-det" d="M350 75 L350 85" stroke="#0094CE" strokeWidth="0.5" opacity="0.4"/>
            <path className="bp-det" d="M450 75 L450 85" stroke="#0094CE" strokeWidth="0.5" opacity="0.4"/>
            <path className="bp-det" d="M580 75 L580 85" stroke="#0094CE" strokeWidth="0.5" opacity="0.4"/>
            <path className="bp-det" d="M650 75 L650 85" stroke="#0094CE" strokeWidth="0.5" opacity="0.4"/>
            <path className="bp-det" d="M150 415 L150 425" stroke="#0094CE" strokeWidth="0.5" opacity="0.4"/>
            <path className="bp-det" d="M350 415 L350 425" stroke="#0094CE" strokeWidth="0.5" opacity="0.4"/>
            <path className="bp-det" d="M450 415 L450 425" stroke="#0094CE" strokeWidth="0.5" opacity="0.4"/>
            <path className="bp-det" d="M650 415 L650 425" stroke="#0094CE" strokeWidth="0.5" opacity="0.4"/>

            {/* Staircase */}
            <path className="bp-det" d="M615 105 L655 105 L655 195 L615 195 Z" stroke="#0094CE" strokeWidth="0.7" opacity="0.4"/>
            <path className="bp-det" d="M615 120 L655 120 M615 135 L655 135 M615 150 L655 150 M615 165 L655 165 M615 180 L655 180" stroke="#0094CE" strokeWidth="0.4" opacity="0.3"/>
            <path className="bp-det" d="M635 195 L635 112 M630 122 L635 112 L640 122" stroke="#0094CE" strokeWidth="0.6" opacity="0.4"/>

            {/* Column crosses */}
            <path className="bp-det" d="M280 246 L280 258 M274 252 L286 252" stroke="#0094CE" strokeWidth="1" opacity="0.5"/>
            <path className="bp-det" d="M400 246 L400 258 M394 252 L406 252" stroke="#0094CE" strokeWidth="1" opacity="0.5"/>
            <path className="bp-det" d="M520 246 L520 258 M514 252 L526 252" stroke="#0094CE" strokeWidth="1" opacity="0.5"/>

            {/* Hatch */}
            <path className="bp-det" d="M615 270 L695 270 M615 290 L695 290 M615 310 L695 310 M615 330 L695 330 M615 350 L695 350" stroke="#0094CE" strokeWidth="0.3" opacity="0.2"/>

            {/* Room labels */}
            <text className="bp-label" x="160" y="170" fill="#1A3E70" fontSize="9" fontFamily="monospace" opacity="0">SALA</text>
            <text className="bp-label" x="325" y="170" fill="#1A3E70" fontSize="9" fontFamily="monospace" opacity="0">COMEDOR</text>
            <text className="bp-label" x="565" y="170" fill="#1A3E70" fontSize="9" fontFamily="monospace" opacity="0">COCINA</text>
            <text className="bp-label" x="118" y="345" fill="#1A3E70" fontSize="8" fontFamily="monospace" opacity="0">HAB.1</text>
            <text className="bp-label" x="210" y="345" fill="#1A3E70" fontSize="8" fontFamily="monospace" opacity="0">HAB.2</text>
            <text className="bp-label" x="325" y="345" fill="#1A3E70" fontSize="8" fontFamily="monospace" opacity="0">HAB.3</text>
            <text className="bp-label" x="440" y="345" fill="#1A3E70" fontSize="8" fontFamily="monospace" opacity="0">ESTUDIO</text>
            <text className="bp-label" x="635" y="345" fill="#1A3E70" fontSize="8" fontFamily="monospace" opacity="0">BAÑO</text>
          </svg>
        </div>

        {/* ═══ Dimension Lines ═══ */}
        {/* Top horizontal */}
        <div className="bp-dim absolute top-[12%] left-[14%] right-[14%] h-[1px] bg-brand-primary/15 opacity-0 pointer-events-none">
          <div className="absolute left-0 -top-1 w-[1px] h-2 bg-brand-primary/20"/>
          <div className="absolute right-0 -top-1 w-[1px] h-2 bg-brand-primary/20"/>
        </div>
        <span className="bp-meas absolute top-[10%] left-1/2 -translate-x-1/2 text-[9px] font-mono text-brand-primary/35 opacity-0 pointer-events-none">16.00 m</span>

        {/* Left vertical */}
        <div className="bp-dim absolute left-[8%] top-[17%] w-[1px] h-[66%] bg-brand-primary/15 opacity-0 pointer-events-none" style={{transformOrigin:'center top',transform:'scaleY(0)'}}>
          <div className="absolute top-0 -left-1 w-2 h-[1px] bg-brand-primary/20"/>
          <div className="absolute bottom-0 -left-1 w-2 h-[1px] bg-brand-primary/20"/>
        </div>
        <span className="bp-meas absolute left-[4.5%] top-1/2 -translate-y-1/2 text-[9px] font-mono text-brand-primary/35 opacity-0 [writing-mode:vertical-lr] rotate-180 pointer-events-none">10.50 m</span>

        {/* Interior dims */}
        <div className="bp-dim absolute top-[52%] left-[17%] w-[14%] h-[1px] bg-brand-secondary/25 opacity-0 pointer-events-none"/>
        <span className="bp-meas absolute top-[50%] left-[21%] text-[8px] font-mono text-brand-secondary/40 opacity-0 pointer-events-none">4.80 m</span>

        <div className="bp-dim absolute top-[36%] left-[52%] w-[14%] h-[1px] bg-brand-secondary/25 opacity-0 pointer-events-none"/>
        <span className="bp-meas absolute top-[34%] left-[56%] text-[8px] font-mono text-brand-secondary/40 opacity-0 pointer-events-none">6.40 m</span>

        {/* ═══ Narrative Text ═══ */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <h3 className="bp-title opacity-0 text-2xl sm:text-3xl md:text-[2.8rem] font-mono font-bold text-brand-primary text-center tracking-tight max-w-xl leading-tight drop-shadow-[0_1px_20px_rgba(255,255,255,0.8)]">
            Cada valoración comienza
            <br/>
            <span className="text-brand-secondary">con un plano</span>
          </h3>
          <p className="bp-sub opacity-0 text-[10px] sm:text-xs font-mono text-brand-gray-cool mt-3 tracking-[0.18em] uppercase text-center">
            Precisión milimétrica en cada metro cuadrado
          </p>
          <div className="bp-scanl opacity-0 w-24 h-[1px] bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent mt-4"/>
        </div>

        {/* ═══ Valuation Badges ═══ */}
        <div className="bp-badge opacity-0 absolute top-[18%] right-[5%] sm:right-[10%] z-20 pointer-events-none">
          <div className="bp-badge-card border border-brand-secondary/12 bg-white/80 backdrop-blur-sm px-3 py-2 shadow-sm">
            <span className="text-[7px] font-mono text-brand-secondary/45 tracking-widest block">VALOR CATASTRAL</span>
            <span className="text-xs font-mono font-bold text-brand-primary block mt-0.5">$ 850.000.000</span>
            <span className="text-[7px] font-mono text-brand-gray-cool block">COP · 2024</span>
          </div>
        </div>
        <div className="bp-badge opacity-0 absolute bottom-[18%] left-[5%] sm:left-[10%] z-20 pointer-events-none">
          <div className="bp-badge-card border border-brand-secondary/12 bg-white/80 backdrop-blur-sm px-3 py-2 shadow-sm">
            <span className="text-[7px] font-mono text-brand-secondary/45 tracking-widest block">ÁREA CONSTRUIDA</span>
            <span className="text-xs font-mono font-bold text-brand-primary block mt-0.5">1,240.00 m²</span>
            <span className="text-[7px] font-mono text-brand-gray-cool block">Nivel 1 + Nivel 2</span>
          </div>
        </div>
        <div className="bp-badge opacity-0 absolute bottom-[18%] right-[5%] sm:right-[10%] z-20 pointer-events-none">
          <div className="bp-badge-card border border-brand-secondary/12 bg-white/80 backdrop-blur-sm px-3 py-2 shadow-sm">
            <span className="text-[7px] font-mono text-brand-secondary/45 tracking-widest block">USO DEL SUELO</span>
            <span className="text-xs font-mono font-bold text-brand-primary block mt-0.5">COMERCIAL MIXTO</span>
            <span className="text-[7px] font-mono text-brand-gray-cool block">POT Bogotá 2024</span>
          </div>
        </div>
        <div className="bp-badge opacity-0 absolute top-[18%] left-[5%] sm:left-[10%] z-20 pointer-events-none">
          <div className="bp-badge-card border border-brand-secondary/12 bg-white/80 backdrop-blur-sm px-3 py-2 shadow-sm">
            <span className="text-[7px] font-mono text-brand-secondary/45 tracking-widest block">ESTRATO / ZONA</span>
            <span className="text-xs font-mono font-bold text-brand-primary block mt-0.5">ESTRATO 4</span>
            <span className="text-[7px] font-mono text-brand-gray-cool block">Zona Residencial</span>
          </div>
        </div>

      </div>
    </section>
  )
}
