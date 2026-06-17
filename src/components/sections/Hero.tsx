'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react'

interface HeroProps {
  onOpenDrawer: () => void
}

export default function Hero({ onOpenDrawer }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const technicalBgRef = useRef<SVGSVGElement>(null)

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule

      // Reveal text elements on mount
      const tl = gsap.timeline()
      
      tl.from('.hero-badge', {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power3.out'
      })
      
      tl.from('.hero-title-word', {
        opacity: 0,
        y: 60,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      
      tl.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      
      tl.from('.hero-btn', {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')

      tl.from('.hero-card-stat', {
        opacity: 0,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3')

      // Technical SVG blueprint animations (drawing lines)
      gsap.fromTo(technicalBgRef.current?.querySelectorAll('.blueprint-line') || [], 
        { strokeDasharray: '300', strokeDashoffset: '300' },
        { strokeDashoffset: '0', duration: 2.5, stagger: 0.15, ease: 'power2.inOut', delay: 0.2 }
      )

      gsap.to('.blueprint-rotate', {
        rotation: 360,
        transformOrigin: 'center',
        duration: 60,
        repeat: -1,
        ease: 'none'
      })

      // Mouse interactive depth effect (parallax)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 30
        const yPos = (clientY / window.innerHeight - 0.5) * 30

        gsap.to('.parallax-bg-svg', {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: 'power2.out'
        })
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    })()
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-white text-brand-primary flex items-center pt-28 overflow-hidden"
    >
      {/* Background CAD Grids (Light Mode Tailored) */}
      <div className="parallax-bg-svg absolute inset-0 bg-cad-grid opacity-20 pointer-events-none z-0" />
      <div className="parallax-bg-svg absolute inset-0 bg-cad-grid-fine opacity-10 pointer-events-none z-0" />
      
      {/* Full Background Video */}
      <div className="absolute inset-0 bg-white z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-65"
        >
          <source src="/kling_20260613_VIDEO_Cinematic__2931_0.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay to ensure blue text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/10 pointer-events-none" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,148,206,0.06)_0%,transparent_70%)] pointer-events-none z-0" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full pt-20 sm:pt-24 lg:pt-0">
        {/* Content Column */}
        <div 
          className="flex flex-col justify-center text-left w-full max-w-[800px] xl:max-w-[950px]"
          style={{ gap: 'clamp(2rem, 5vh, 4rem)' }}
        >
          {/* Header text group */}
          <div className="flex flex-col" style={{ gap: 'clamp(1rem, 2.5vh, 2rem)' }}>
            {/* Heading */}
            <h1 className="font-black tracking-tight leading-[1.1] sm:leading-[1.1] font-mono text-brand-primary text-[clamp(2.5rem,6vw+1rem,5rem)]">
              {['Avalúos', 'certificados', 'con', 'respaldo', 'técnico,', 'normativo', 'y', 'experiencia.'].map((word, idx) => (
                <span key={idx} className="hero-title-word inline-block mr-3">
                  {word === 'técnico,' || word === 'normativo' ? (
                    <span className="text-brand-secondary">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-brand-gray-cool max-w-[650px] leading-relaxed font-medium text-[clamp(1rem,1.5vw+0.5rem,1.25rem)]">
              Más de 15 años de trayectoria en el mercado inmobiliario, ofreciendo dictámenes periciales precisos para la toma de decisiones estratégicas.
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-wrap"
            style={{ gap: '16px' }}
          >
            <button
              onClick={onOpenDrawer}
              className="hero-btn justify-center bg-brand-primary hover:bg-brand-secondary text-white font-mono text-sm px-8 sm:px-10 py-4 sm:py-5 tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md"
              style={{ minWidth: '220px' }}
            >
              <span className="font-bold">SOLICITAR AVALÚO</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="tel:+573001234567"
              className="hero-btn justify-center flex items-center bg-white border-2 border-brand-primary hover:bg-brand-primary text-brand-primary hover:text-white font-mono font-bold text-sm px-8 sm:px-10 py-4 sm:py-5 tracking-wider transition-colors"
              style={{ minWidth: '220px' }}
            >
              HABLAR CON UN EXPERTO
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
