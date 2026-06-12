'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowUpRight, ShieldCheck, Milestone } from 'lucide-react'

interface HeroProps {
  onOpenDrawer: () => void
}

export default function Hero({ onOpenDrawer }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const technicalBgRef = useRef<SVGSVGElement>(null)

  useGSAP(() => {
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
      const xPos = (clientX / window.innerWidth - 0.5) * 40
      const yPos = (clientY / window.innerHeight - 0.5) * 40

      gsap.to('.parallax-bg-svg', {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-brand-bg-dark text-white flex items-center pt-24 overflow-hidden"
    >
      {/* Background CAD Grids */}
      <div className="absolute inset-0 bg-cad-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,148,206,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Decorative Technical Vector (SVG) */}
      <div className="absolute right-0 bottom-0 top-0 w-full lg:w-1/2 opacity-35 lg:opacity-60 pointer-events-none z-0 flex items-center justify-center select-none parallax-bg-svg">
        <svg
          ref={technicalBgRef}
          viewBox="0 0 800 800"
          className="w-full max-w-[800px] h-auto text-brand-secondary/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {/* Concentric circles */}
          <circle cx="400" cy="400" r="300" className="blueprint-line opacity-30" strokeDasharray="5 5" />
          <circle cx="400" cy="400" r="220" className="blueprint-line opacity-40" />
          <circle cx="400" cy="400" r="140" className="blueprint-line opacity-50" strokeDasharray="10 5" />
          
          {/* Dynamic rotating gear-like technical element */}
          <g className="blueprint-rotate">
            <rect x="300" y="300" width="200" height="200" rx="10" className="blueprint-line opacity-20" />
            <rect x="350" y="350" width="100" height="100" className="blueprint-line opacity-35" />
            <line x1="200" y1="400" x2="600" y2="400" className="blueprint-line opacity-40" />
            <line x1="400" y1="200" x2="400" y2="600" className="blueprint-line opacity-40" />
            <circle cx="400" cy="200" r="6" fill="#0094CE" />
            <circle cx="400" cy="600" r="6" fill="#0094CE" />
            <circle cx="200" cy="400" r="6" fill="#0094CE" />
            <circle cx="600" cy="400" r="6" fill="#0094CE" />
          </g>

          {/* Isometric wireframe grid */}
          <path d="M100 650 L400 450 L700 650 M400 450 L400 150 M100 350 L400 150 L700 350" className="blueprint-line opacity-30" />
          <path d="M100 350 L100 650 M700 350 L700 650" className="blueprint-line opacity-20" />
          <line x1="100" y1="500" x2="400" y2="300" className="blueprint-line opacity-20" />
          <line x1="700" y1="500" x2="400" y2="300" className="blueprint-line opacity-20" />
          
          {/* Coordinates and notes */}
          <text x="50" y="100" className="fill-brand-secondary font-mono text-xs opacity-75">COORD: 4.6243° N, 74.0636° W</text>
          <text x="50" y="120" className="fill-white font-mono text-[10px] opacity-40">ALTITUD: 2.640m (BOGOTÁ, CO)</text>
          <text x="600" y="100" className="fill-brand-secondary font-mono text-xs opacity-75">SCALE: 1:500</text>
          <text x="600" y="120" className="fill-white font-mono text-[10px] opacity-40">SYS: WGS84 - SIRGAS</text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Content Column */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Top Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 bg-brand-primary/40 border border-brand-secondary/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-brand-secondary uppercase">
              Certificación y Rigor Técnico RAA / RNA
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-2xl font-mono">
            {['Avalúos', 'certificados', 'con', 'respaldo', 'técnico,', 'normativo', 'y', 'experiencia.'].map((word, idx) => (
              <span key={idx} className="hero-title-word inline-block mr-3">
                {word === 'respaldo' || word === 'técnico,' ? (
                  <span className="text-brand-secondary">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-base sm:text-lg text-brand-gray-cool/80 max-w-xl leading-relaxed">
            Más de 15 años ayudando a empresas, entidades financieras y propietarios a tomar decisiones informadas y respaldadas por valoraciones de alta precisión en todo el territorio colombiano.
          </p>

          {/* Action Buttons */}
          <div className="hero-btn flex flex-wrap gap-4 pt-2">
            <button
              onClick={onOpenDrawer}
              className="bg-brand-secondary hover:bg-brand-secondary-light text-white font-mono text-sm px-8 py-4.5 tracking-wider flex items-center gap-2 cursor-pointer transition-all hover:shadow-lg hover:shadow-brand-secondary/20 relative group"
            >
              <span>SOLICITAR AVALÚO</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="tel:+573001234567"
              className="border border-white/20 hover:border-white/50 text-white font-mono text-sm px-8 py-4.5 tracking-wider transition-colors"
            >
              HABLAR CON UN EXPERTO
            </a>
          </div>

          {/* Quick Credibility Elements */}
          <div className="hero-btn pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/5 max-w-xl">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono uppercase text-white tracking-wider">Acreditación RAA</h4>
                <p className="text-[10px] text-brand-gray-cool">Registro Abierto de Avaluadores</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono uppercase text-white tracking-wider">Norma ISO 9001</h4>
                <p className="text-[10px] text-brand-gray-cool">Sistema de Gestión Calidad</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Milestone className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono uppercase text-white tracking-wider">Alcance Nacional</h4>
                <p className="text-[10px] text-brand-gray-cool">Cobertura en toda Colombia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Data Sidebar */}
        <div className="lg:col-span-5 hidden lg:block space-y-6 relative z-10">
          <div className="hero-card-stat p-6 bg-brand-primary/10 border border-white/10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-brand-secondary">[ SYSTEM: ACTIVE ]</div>
            <span className="text-xs font-mono text-brand-secondary tracking-widest block mb-1">
              [ VOLUMEN DE VALORACIÓN ]
            </span>
            <div className="text-3xl font-bold font-mono">+$8.5 Billones</div>
            <p className="text-[10px] text-brand-gray-cool mt-1">Activos inmobiliarios e industriales valorados a nivel nacional.</p>
          </div>

          <div className="hero-card-stat p-6 bg-brand-primary/10 border border-white/10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-brand-secondary">[ PRECISION: 99.8% ]</div>
            <span className="text-xs font-mono text-brand-secondary tracking-widest block mb-1">
              [ RESPALDO FINANCIERO ]
            </span>
            <div className="text-3xl font-bold font-mono">100% Bancos</div>
            <p className="text-[10px] text-brand-gray-cool mt-1">Aceptación y homologación en todas las entidades bancarias del país.</p>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[9px] font-mono tracking-widest text-white uppercase">SCROLL PARA EXPLORAR</span>
        <div className="w-[1px] h-8 bg-brand-secondary relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bg-white h-1/2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
