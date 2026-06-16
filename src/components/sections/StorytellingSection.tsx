'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'

export default function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTriggerModule = await import('gsap/ScrollTrigger')
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule
      gsap.registerPlugin(ScrollTrigger)

      // Master Timeline linked to scroll progress of the main section container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=240%', // Scroll distance reduced
          pin: true,
          scrub: 1.2,
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
      
      // Reveal Sergio Delgado picture mask (scale and opacity)
      tl.to('.executive-mask', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out'
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

      // Horizontal scrub for marquee is not needed since marquee will animate infinitely
      // Stagger clients
      tl.from('.client-logo-item', {
        opacity: 0,
        y: 40,
        scale: 0.9,
        stagger: 0.1,
        duration: 1.5,
        ease: 'power2.out'
      }, '-=0.4')

      // Hold screen 3 state
      tl.to({}, { duration: 1.5 })

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

      // Removed the final empty hold so that scrolling immediately unpins here.
    })()
  }, { scope: containerRef })

  const clients = [
    { src: '/images/clients/GRUPO-_SURA.png', alt: 'Grupo Sura', w: 160, h: 60 },
    { src: '/images/clients/camara.webp', alt: 'Cámara de Comercio', w: 150, h: 55 },
    { src: '/images/clients/dian.webp', alt: 'DIAN', w: 120, h: 50 },
    { src: '/images/clients/alcaldia.webp', alt: 'Alcaldía', w: 140, h: 55 },
    { src: '/images/clients/afinia.webp', alt: 'Afinia', w: 140, h: 55 },
  ]

  const finalMessage = "Hoy ayudamos a empresas, entidades financieras y propietarios a tomar decisiones respaldadas por información confiable."
  const finalMessageWords = finalMessage.split(' ')

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
        <div className="screen-2 absolute inset-0 flex items-center justify-center p-4 sm:p-6 opacity-0 pointer-events-none z-20">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 md:gap-12 items-center">
            {/* Left Column: Image Reveal */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full aspect-square max-w-[200px] sm:max-w-[280px] md:max-w-[380px] bg-brand-primary/5 dark:bg-brand-primary/5 border border-brand-primary/10 dark:border-brand-primary/10 overflow-hidden shadow-md">
                {/* Fine blueprint details */}
                <div className="absolute top-2 left-2 text-[8px] font-mono text-brand-secondary/40 z-10">[ IMG_REF: SD_08 ]</div>
                <div className="absolute inset-0 bg-cad-grid-fine opacity-30 z-10 pointer-events-none" />
                <div className="executive-mask absolute inset-0 opacity-0 scale-95 transition-none">
                  <Image
                    src="/images/founder_portrait.png"
                    alt="Sergio Delgado - Gerente General de ARQUIAVALÚOS"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Profile details */}
            <div className="md:col-span-7 space-y-4 sm:space-y-6 text-left">
              <div className="screen-2-text">
                <span className="text-[10px] sm:text-xs font-mono text-brand-secondary tracking-widest uppercase block">
                  [ PERFIL EJECUTIVO ]
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-brand-primary dark:text-brand-primary mt-1">
                  Sergio Delgado
                </h3>
                <p className="text-[10px] sm:text-xs font-mono text-brand-gray-cool uppercase tracking-widest">
                  Gerente General & Fundador
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                <div className="screen-2-text flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-brand-secondary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] sm:text-xs font-mono text-brand-secondary">01</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-mono font-bold text-brand-primary dark:text-brand-primary uppercase tracking-wider">Experiencia Profesional</h4>
                    <p className="text-[10px] sm:text-xs text-brand-gray-cool mt-1 leading-snug sm:leading-relaxed">
                      Más de 15 años de trayectoria liderando avalúos comerciales, industriales, rurales e infraestructura estratégica para las principales bancas del país.
                    </p>
                  </div>
                </div>

                <div className="screen-2-text flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-brand-secondary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] sm:text-xs font-mono text-brand-secondary">02</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-mono font-bold text-brand-primary dark:text-brand-primary uppercase tracking-wider">Trayectoria y Liderazgo</h4>
                    <p className="text-[10px] sm:text-xs text-brand-gray-cool mt-1 leading-snug sm:leading-relaxed">
                      Consultor y asesor en estructuración de activos reales para fondos inmobiliarios internacionales, multinacionales y el sector público.
                    </p>
                  </div>
                </div>

                <div className="screen-2-text flex items-start gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-brand-secondary/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] sm:text-xs font-mono text-brand-secondary">03</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-mono font-bold text-brand-primary dark:text-brand-primary uppercase tracking-wider">Especialización Técnica</h4>
                    <p className="text-[10px] sm:text-xs text-brand-gray-cool mt-1 leading-snug sm:leading-relaxed">
                      Avaluador certificado RAA/RNA. Experto en estándares internacionales IVS y metodologías NIIF corporativas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- PANTALLA 3 (CLIENTES) ----------------- */}
        <div className="screen-3 absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-12 opacity-0 pointer-events-none z-30 overflow-hidden">
          <div className="max-w-6xl w-full mx-auto text-left mb-6 sm:mb-10 shrink-0">
            <span className="text-[10px] sm:text-xs font-mono text-brand-secondary tracking-widest uppercase block">
              [ NUESTROS CLIENTES ]
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-mono text-brand-primary dark:text-brand-primary mt-1">
              Confianza que <span className="text-brand-secondary">respalda resultados.</span>
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray-cool mt-2 sm:mt-3 max-w-2xl font-mono leading-relaxed">
              Empresas del sector financiero, entidades públicas y conglomerados confían en ARQUIAVALÚOS para sus decisiones de valoración.
            </p>
          </div>

          <div className="w-full relative py-4 sm:py-8">
            <div className="clients-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 max-w-6xl mx-auto">
              {clients.map((client, idx) => (
                <div
                  key={idx}
                  className="client-logo-item relative flex items-center justify-center py-4 sm:py-8 px-4 sm:px-6 border border-brand-primary/10 bg-white shadow-sm"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-secondary/30" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-secondary/30" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-secondary/30" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-secondary/30" />

                  <Image
                    src={client.src}
                    alt={client.alt}
                    width={client.w}
                    height={client.h}
                    style={{ height: 'auto' }}
                    className="object-contain max-h-8 sm:max-h-12 max-w-full opacity-80"
                  />
                </div>
              ))}
            </div>
            
            {/* Stats strip inline */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-brand-primary/10 pt-10 mt-12 max-w-6xl mx-auto">
              {[
                { label: 'Avalúos realizados', target: '5000+' },
                { label: 'Entidades financieras', target: '40+' },
                { label: 'Municipios cubiertos', target: '120+' },
                { label: 'Años de experiencia', target: '15+' },
              ].map((stat, idx) => (
                <div key={idx} className="client-logo-item text-center space-y-1">
                  <div className="text-3xl lg:text-4xl font-bold font-mono text-brand-primary dark:text-brand-primary">
                    {stat.target}
                  </div>
                  <span className="text-[10px] font-mono text-brand-secondary uppercase tracking-widest block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ----------------- PANTALLA 4 ----------------- */}
        <div className="screen-4 absolute inset-0 flex items-center justify-center p-6 opacity-0 pointer-events-none z-40">
          <div className="text-center max-w-4xl space-y-8">
            <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
              [ COMPROMISO ARQUIAVALÚOS ]
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-mono tracking-tight leading-tight text-brand-primary dark:text-brand-primary flex flex-wrap justify-center gap-x-[0.25em] gap-y-2">
              {finalMessageWords.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap">
                  {Array.from(word).map((char, cIdx) => (
                    <span 
                      key={`${wIdx}-${cIdx}`} 
                      className="char-span inline-block select-none transform translate-y-12 opacity-0"
                    >
                      {char}
                    </span>
                  ))}
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
