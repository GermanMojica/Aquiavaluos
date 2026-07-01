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
      className="relative min-h-screen bg-white text-brand-primary flex items-center pt-36 overflow-hidden"
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
          className="object-cover w-full h-full opacity-90"
        >
          <source src="/kling_20260613_VIDEO_Cinematic__2931_0.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark vignette so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,148,206,0.06)_0%,transparent_70%)] pointer-events-none z-0" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full pt-20 sm:pt-24 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 xl:gap-16 items-center">

          {/* Left: text content */}
          <div className="flex flex-col justify-center text-left" style={{ gap: 'clamp(2rem, 5vh, 4rem)' }}>
            <div className="flex flex-col" style={{ gap: 'clamp(1rem, 2.5vh, 2rem)' }}>
              <h1
                className="font-black tracking-tight leading-[1.1] sm:leading-[1.1] font-mono text-white"
                style={{ fontSize: 'clamp(2.5rem, 3vw + 2.6vh, 5rem)' }}
              >
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

              <p
                className="hero-subtitle text-white/80 max-w-[560px] leading-relaxed font-medium"
                style={{ fontSize: 'clamp(1rem, 0.8vw + 0.8vh, 1.2rem)' }}
              >
                Más de 15 años de trayectoria en el mercado inmobiliario, ofreciendo dictámenes periciales precisos para la toma de decisiones estratégicas.
              </p>
            </div>

            <div className="hero-btn flex flex-wrap" style={{ gap: '16px' }}>
              <button
                onClick={onOpenDrawer}
                className="justify-center bg-brand-primary hover:bg-brand-secondary text-white font-mono text-sm px-8 sm:px-10 tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md"
                style={{ minWidth: '220px', paddingBlock: 'clamp(0.9rem, 2.2vh, 1.25rem)' }}
              >
                <span className="font-bold">SOLICITAR AVALÚO</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>
              <a
                href="tel:+573001234567"
                className="justify-center flex items-center bg-transparent border-2 border-white hover:bg-white text-white hover:text-brand-primary font-mono font-bold text-sm px-8 sm:px-10 tracking-wider transition-colors"
                style={{ minWidth: '220px', paddingBlock: 'clamp(0.9rem, 2.2vh, 1.25rem)' }}
              >
                HABLAR CON UN EXPERTO
              </a>
            </div>
          </div>

          {/* Right: certifications — centered, large */}
          <div className="hero-card-stat hidden lg:flex flex-col items-center justify-center gap-5">
            <span className="text-white/60 text-xs font-mono tracking-[0.2em] uppercase">
              Certificado por
            </span>

            {/* IQNet */}
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white/15 backdrop-blur-md border border-white/30 p-5 flex items-center justify-center w-36 h-36 shadow-2xl">
                <Image
                  src="/images/logos/Certifiediqnet.png"
                  alt="IQNet Certified"
                  width={110}
                  height={110}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-white/60 text-[10px] font-mono tracking-widest">CO–SC–2000670</span>
            </div>

            {/* ISO 9001 */}
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white/15 backdrop-blur-md border border-white/30 p-5 flex items-center justify-center w-36 h-36 shadow-2xl">
                <Image
                  src="/images/logos/iso9001.png"
                  alt="ISO 9001 Icontec"
                  width={100}
                  height={100}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-white/60 text-[10px] font-mono tracking-widest">SC–2000670</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
