'use client'

import { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule

      // Evitar scroll durante la carga
      document.body.style.overflow = 'hidden'

      const tl = gsap.timeline({
        onComplete: () => {
          // Al finalizar la animación, ocultar el preloader y restaurar el scroll
          gsap.to(containerRef.current, {
            yPercent: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
              setLoading(false)
              document.body.style.overflow = ''
            }
          })
        }
      })

      // Animación del dibujo del SVG (Blueprint house/building)
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path, line, polyline')
        paths.forEach(p => {
          if (typeof (p as SVGGeometryElement).getTotalLength === 'function') {
            const len = (p as SVGGeometryElement).getTotalLength()
            ;(p as SVGGeometryElement).style.strokeDasharray = `${len}`
            ;(p as SVGGeometryElement).style.strokeDashoffset = `${len}`
          }
        })

        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power2.inOut'
        }, 0)
      }

      // Simulador de porcentaje
      tl.to({ val: 0 }, {
        val: 100,
        duration: 1.8,
        ease: 'power1.inOut',
        onUpdate: function() {
          setProgress(Math.round(this.targets()[0].val))
        }
      }, 0)

      // Animación de los textos "Precision..."
      tl.fromTo('.preloader-text', 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: 'power2.out' },
        0.5
      )

      // Pequeño retardo al finalizar al 100%
      tl.to({}, { duration: 0.4 })
    })()
  }, { scope: containerRef })

  if (!loading) return null

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-brand-primary overflow-hidden"
    >
      {/* Background CAD Grids */}
      <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,148,206,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Blueprint AV Monogram */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-8">
          <svg 
            ref={svgRef}
            viewBox="0 0 120 120" 
            className="w-full h-full text-brand-primary"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="square" 
            strokeLinejoin="miter"
          >
            {/* Horizontal architectural guidelines */}
            <line x1="5" y1="20" x2="115" y2="20" stroke="#0094CE" strokeWidth="0.5" opacity="0.4" />
            <line x1="5" y1="100" x2="115" y2="100" stroke="#0094CE" strokeWidth="0.5" opacity="0.4" />
            <line x1="5" y1="60" x2="115" y2="60" stroke="#0094CE" strokeWidth="0.5" opacity="0.4" />

            {/* Letter A */}
            <path d="M 15 100 L 40 20 L 65 100" />
            <path d="M 27 60 L 53 60" />
            
            {/* Letter V */}
            <path d="M 60 20 L 85 100 L 110 20" stroke="#0094CE" />

            {/* Blueprint Nodes / Accents */}
            <circle cx="40" cy="20" r="3" stroke="currentColor" strokeWidth="1" fill="white" />
            <circle cx="85" cy="100" r="3" stroke="#0094CE" strokeWidth="1" fill="white" />
          </svg>

          {/* Coordinate Marks */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-primary/40" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-primary/40" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-primary/40" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-primary/40" />
        </div>

        {/* Text Area */}
        <div className="text-center space-y-2">
          <div className="text-4xl sm:text-5xl font-mono font-bold text-brand-primary tabular-nums">
            {progress}%
          </div>
          <div className="preloader-text text-xs font-mono text-brand-secondary uppercase tracking-widest">
            Calculando valoración...
          </div>
          <div className="preloader-text text-[10px] font-mono text-brand-gray-cool uppercase tracking-[0.2em]">
            Precisión Milimétrica
          </div>
        </div>
      </div>

      {/* Decorative details */}
      <div className="absolute bottom-6 left-6 text-[9px] font-mono text-brand-primary/30 tracking-wider">
        SYS_INIT :: AVALUOS_CORE
      </div>
      <div className="absolute bottom-6 right-6 text-[9px] font-mono text-brand-primary/30 tracking-wider">
        VER 1.0.0
      </div>
    </div>
  )
}
