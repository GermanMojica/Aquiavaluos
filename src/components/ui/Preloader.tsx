'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule

      document.body.style.overflow = 'hidden'

      const tl = gsap.timeline({
        onComplete: () => {
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

      // Logo: flotación suave arriba/abajo
      gsap.to('.preloader-logo', {
        y: -8,
        duration: 1.8,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Logo: respiración de escala
      gsap.to('.preloader-logo', {
        scale: 1.07,
        duration: 2.4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.3,
      })

      // Glow: pulso que se expande y desvanece en loop
      gsap.to(glowRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 1.6,
        ease: 'power2.out',
        repeat: -1,
        repeatDelay: 0.3,
      })

      // Contador de progreso
      tl.to({ val: 0 }, {
        val: 100,
        duration: 1.8,
        ease: 'power1.inOut',
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val))
        }
      }, 0)

      // Textos aparecen
      tl.fromTo('.preloader-text',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: 'power2.out' },
        0.5
      )

      tl.to({}, { duration: 0.3 })
    })()
  }, { scope: containerRef })

  if (!loading) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-brand-primary overflow-hidden"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,148,206,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">

        {/* Logo + glow wrapper */}
        <div className="relative flex items-center justify-center w-44 h-44 mb-8">
          {/* Glow pulsante */}
          <div
            ref={glowRef}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,148,206,0.40) 0%, transparent 70%)',
              opacity: 0.8,
            }}
          />

          {/* Corner marks */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-primary/30" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-primary/30" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-primary/30" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-primary/30" />

          {/* Logo — img nativo, animado por GSAP vía clase */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logos/favicon.webp"
            alt="Arquiavalúos"
            width={120}
            height={120}
            className="preloader-logo relative z-10 object-contain drop-shadow-md"
            style={{ display: 'block' }}
          />
        </div>

        {/* Text */}
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

      {/* Decorative labels */}
      <div className="absolute bottom-6 left-6 text-[9px] font-mono text-brand-primary/30 tracking-wider">
        SYS_INIT :: AVALUOS_CORE
      </div>
      <div className="absolute bottom-6 right-6 text-[9px] font-mono text-brand-primary/30 tracking-wider">
        VER 1.0.0
      </div>
    </div>
  )
}
