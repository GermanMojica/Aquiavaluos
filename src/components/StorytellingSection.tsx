'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Briefcase, Award, TrendingUp, ShieldAlert } from 'lucide-react'

export default function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Master Timeline linked to scroll progress of the main section container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // Scroll distance of 3 screens
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    })

    // --- SCREEN 1 TO SCREEN 2 TRANSITION ---
    // Fade out screen 1
    tl.to('.screen-1-content', {
      opacity: 0,
      y: -60,
      duration: 1,
      ease: 'power2.inOut'
    })
    
    // Fade in screen 2
    tl.to('.screen-2', {
      opacity: 1,
      pointerEvents: 'all',
      duration: 1,
      ease: 'power2.inOut'
    }, '-=0.5')

    // Reveal Sergio Delgado picture mask (clip-path)
    tl.to('.executive-mask', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 1.2,
      ease: 'power2.inOut'
    }, '-=0.8')

    // Stagger text contents in screen 2
    tl.from('.screen-2-text', {
      opacity: 0,
      x: 30,
      stagger: 0.15,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.6')

    // Hold screen 2 state
    tl.to({}, { duration: 0.8 })

    // --- SCREEN 2 TO SCREEN 3 TRANSITION ---
    // Fade out screen 2
    tl.to('.screen-2', {
      opacity: 0,
      y: -40,
      pointerEvents: 'none',
      duration: 1,
      ease: 'power2.inOut'
    })

    // Fade in screen 3
    tl.to('.screen-3', {
      opacity: 1,
      pointerEvents: 'all',
      duration: 1,
      ease: 'power2.inOut'
    }, '-=0.6')

    // Horizontal scroll of milestones container
    // We scroll it leftward based on the number of panels
    tl.to('.milestones-scroll-wrapper', {
      xPercent: -65, // Moves the timeline to show subsequent items
      ease: 'none',
      duration: 2.5
    })

    // Hold screen 3 state
    tl.to({}, { duration: 0.8 })

    // --- SCREEN 3 TO SCREEN 4 TRANSITION ---
    // Fade out screen 3
    tl.to('.screen-3', {
      opacity: 0,
      pointerEvents: 'none',
      duration: 1,
      ease: 'power2.inOut'
    })

    // Fade in screen 4
    tl.to('.screen-4', {
      opacity: 1,
      pointerEvents: 'all',
      duration: 1,
      ease: 'power2.inOut'
    }, '-=0.6')

    // Stagger characters reveal in Screen 4 text
    tl.to('.char-span', {
      opacity: 1,
      y: 0,
      stagger: 0.02,
      duration: 1.5,
      ease: 'power3.out'
    }, '-=0.4')

    // Hold final screen 4 state
    tl.to({}, { duration: 0.8 })

  }, { scope: containerRef })

  const milestones = [
    { year: '2009', title: 'Inicio de Operaciones', desc: 'Fundación de la empresa con enfoque en avalúos urbanos y consultorías residenciales en Bogotá.', icon: Calendar },
    { year: '2014', title: 'Expansión Regional', desc: 'Apertura de operaciones técnicas en Antioquia, Valle del Cauca y la costa norte del país.', icon: TrendingUp },
    { year: '2018', title: 'Consolidación Empresarial', desc: 'Homologación de nuestra metodología técnica ante la red bancaria y fondos inmobiliarios nacionales.', icon: Briefcase },
    { year: '2022', title: 'Certificaciones y Calidad', desc: 'Certificación del Sistema de Gestión bajo la norma ISO 9001:2015, garantizando rigor normativo y calidad técnica.', icon: Award },
    { year: '2026', title: 'Cobertura Nacional Completa', desc: 'Red consolidada de peritos avaluadores y soluciones tecnológicas avanzadas de valoración en todo el territorio colombiano.', icon: ShieldAlert }
  ]

  const finalMessage = "Hoy ayudamos a empresas, entidades financieras y propietarios a tomar decisiones respaldadas por información confiable."
  const finalMessageChars = Array.from(finalMessage)

  return (
    <section
      id="quienes-somos"
      ref={containerRef}
      className="relative h-screen bg-white dark:bg-white overflow-hidden text-brand-primary dark:text-brand-primary"
    >
      {/* Content Canvas */}
      <div
        className="relative w-full h-full overflow-hidden flex items-center justify-center"
      >
        {/* CAD Grid Backdrop */}
        <div className="absolute inset-0 bg-cad-grid opacity-25 dark:opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-cad-grid-fine opacity-15 dark:opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 p-6 text-[9px] font-mono text-brand-secondary tracking-widest pointer-events-none">
          [ SECCIÓN: TRAYECTORIA CORPORATIVA ]
        </div>

        {/* ----------------- PANTALLA 1 ----------------- */}
        <div className="absolute inset-0 flex items-center justify-center p-6 select-none z-10 pointer-events-none">
          <div className="screen-1-content text-center max-w-4xl space-y-6">
            <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
              [ QUIÉNES SOMOS ]
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-mono tracking-tight leading-tight text-brand-primary dark:text-brand-primary">
              Más de 15 años transformando experiencia y conocimiento en confianza.
            </h2>
            <div className="w-12 h-[1px] bg-brand-secondary mx-auto mt-8 animate-pulse" />
          </div>
        </div>

        {/* ----------------- PANTALLA 2 ----------------- */}
        <div className="screen-2 absolute inset-0 flex items-center justify-center p-6 opacity-0 pointer-events-none z-20">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: Image Reveal */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full aspect-square max-w-[380px] bg-brand-primary/5 dark:bg-brand-primary/5 border border-brand-primary/10 dark:border-brand-primary/10 overflow-hidden shadow-md">
                {/* Fine blueprint details */}
                <div className="absolute top-2 left-2 text-[8px] font-mono text-brand-secondary/40 z-10">[ IMG_REF: SD_08 ]</div>
                <div className="absolute inset-0 bg-cad-grid-fine opacity-30 z-10 pointer-events-none" />
                <div className="executive-mask absolute inset-0 transition-all" style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}>
                  <Image
                    src="/images/founder_portrait.png"
                    alt="Sergio Delgado - Gerente General de ARQUIAVALÚOS"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition-all duration-700"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Profile details */}
            <div className="md:col-span-7 space-y-6 text-left">
              <div className="screen-2-text">
                <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
                  [ PERFIL EJECUTIVO ]
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-mono text-brand-primary dark:text-brand-primary mt-1">
                  Sergio Delgado
                </h3>
                <p className="text-xs font-mono text-brand-gray-cool uppercase tracking-widest">
                  Gerente General & Fundador
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="screen-2-text flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-brand-secondary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-mono text-brand-secondary">01</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-mono font-bold text-brand-primary dark:text-brand-primary uppercase tracking-wider">Experiencia Profesional</h4>
                    <p className="text-xs text-brand-gray-cool mt-1 leading-relaxed">
                      Más de 15 años de trayectoria liderando avalúos comerciales, industriales, rurales e infraestructura estratégica para las principales bancas del país.
                    </p>
                  </div>
                </div>

                <div className="screen-2-text flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-brand-secondary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-mono text-brand-secondary">02</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-mono font-bold text-brand-primary dark:text-brand-primary uppercase tracking-wider">Trayectoria y Liderazgo</h4>
                    <p className="text-xs text-brand-gray-cool mt-1 leading-relaxed">
                      Consultor y asesor en estructuración de activos reales para fondos inmobiliarios internacionales, empresas multinacionales y el sector público en Colombia.
                    </p>
                  </div>
                </div>

                <div className="screen-2-text flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-brand-secondary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-mono text-brand-secondary">03</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-mono font-bold text-brand-primary dark:text-brand-primary uppercase tracking-wider">Especialización Técnica</h4>
                    <p className="text-xs text-brand-gray-cool mt-1 leading-relaxed">
                      Avaluador inscrito y certificado en el RAA y la RNA. Experto en estándares internacionales de valoración IVS y metodologías NIIF aplicadas al sector corporativo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- PANTALLA 3 ----------------- */}
        <div className="screen-3 absolute inset-0 flex flex-col justify-center px-6 md:px-12 opacity-0 pointer-events-none z-30 overflow-hidden">
          <div className="max-w-6xl w-full mx-auto text-left mb-10 shrink-0">
            <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
              [ TIMELINE HISTÓRICO ]
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-mono text-brand-primary dark:text-brand-primary mt-1">
              Hitos de nuestra evolución
            </h3>
            <p className="text-xs text-brand-gray-cool mt-1">Haga scroll para desplazar la línea temporal.</p>
          </div>

          {/* Sliding horizontal container */}
          <div className="w-full relative py-12 flex items-center overflow-x-visible">
            {/* The line behind */}
            <div className="absolute top-1/2 left-0 right-[-100vw] h-[1px] bg-brand-primary/15 dark:bg-brand-primary/15 z-0" />
            
            <div className="milestones-scroll-wrapper flex gap-12 relative z-10 w-[250%] pl-8">
              {milestones.map((milestone, idx) => {
                const IconComponent = milestone.icon
                return (
                  <div 
                    key={idx} 
                    className="w-[300px] shrink-0 bg-white dark:bg-white border border-brand-primary/10 dark:border-brand-primary/10 p-6 relative backdrop-blur-sm shadow-sm"
                  >
                    {/* Technical details on card */}
                    <div className="absolute top-2 right-2 text-[8px] font-mono text-brand-secondary/30">[ STEP_0{idx+1} ]</div>
                    
                    {/* Circle on the timeline line */}
                    <div className="absolute left-1/2 -bottom-[50px] -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-white border-2 border-brand-secondary flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary bg-brand-secondary/5">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-2xl font-bold font-mono text-brand-primary dark:text-brand-primary tracking-wider">
                        {milestone.year}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-mono font-bold text-brand-primary dark:text-brand-primary uppercase tracking-wider mt-4">
                      {milestone.title}
                    </h4>
                    <p className="text-xs text-brand-gray-cool mt-2 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ----------------- PANTALLA 4 ----------------- */}
        <div className="screen-4 absolute inset-0 flex items-center justify-center p-6 opacity-0 pointer-events-none z-40">
          <div className="text-center max-w-4xl space-y-8">
            <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
              [ COMPROMISO ARQUIAVALÚOS ]
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-mono tracking-tight leading-tight text-brand-primary dark:text-brand-primary">
              {finalMessageChars.map((char, index) => (
                <span 
                  key={index} 
                  className="char-span inline-block select-none transform translate-y-12 opacity-0"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
            <div className="w-16 h-[2px] bg-brand-secondary mx-auto mt-6 animate-pulse" />


          </div>
        </div>
      </div>
    </section>
  )
}
