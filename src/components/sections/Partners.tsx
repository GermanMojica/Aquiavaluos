'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'

export default function Partners() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Los logos vienen recortados y con fondo transparente, así que el alto máximo
  // se ajusta por logo para que todos pesen ópticamente igual (área similar,
  // no altura similar): los apaisados van más bajos, los verticales más altos.
  const guilds = [
    {
      src: '/images/logos/gremio-lonja-barranquilla.webp',
      alt: 'Lonja de Barranquilla — El gremio inmobiliario',
      width: 294,
      height: 266,
      logoClass: 'max-h-[64px] md:max-h-[82px] lg:max-h-[124px] xl:max-h-[145px]',
    },
    {
      src: '/images/logos/gremio-sociedad-arquitectos.webp',
      alt: 'Sociedad Colombiana de Arquitectos',
      width: 200,
      height: 280,
      logoClass: 'max-h-[72px] md:max-h-[92px] lg:max-h-[140px] xl:max-h-[164px]',
    },
    {
      src: '/images/logos/gremio-sociedad-avaluadores.webp',
      alt: 'Sociedad Colombiana de Avaluadores',
      width: 194,
      height: 147,
      logoClass: 'max-h-[58px] md:max-h-[76px] lg:max-h-[115px] xl:max-h-[135px]',
    },
    {
      src: '/images/logos/gremio-upav.webp',
      alt: 'UPAV — Unión Panamericana de Asociaciones de Valuación',
      width: 479,
      height: 480,
      logoClass: 'max-h-[72px] md:max-h-[92px] lg:max-h-[140px] xl:max-h-[164px]',
    },
    {
      src: '/images/logos/gremio-ana.webp',
      alt: 'A.N.A. — Autorregulador Nacional de Avaluadores',
      width: 480,
      height: 347,
      logoClass: 'max-h-[58px] md:max-h-[74px] lg:max-h-[112px] xl:max-h-[132px]',
    },
    {
      src: '/images/logos/gremio-rna.webp',
      alt: 'RNA — Registro Nacional de Avaluadores',
      width: 475,
      height: 303,
      logoClass: 'max-h-[55px] md:max-h-[70px] lg:max-h-[107px] xl:max-h-[126px]',
    },
  ]

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTriggerModule = await import('gsap/ScrollTrigger')
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule
      gsap.registerPlugin(ScrollTrigger)

      // Optimized header animation
      gsap.from('.partners-header', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })

      // Marquee infinito — ultra-optimized
      if (trackRef.current) {
        const tl = gsap.to(trackRef.current, {
          xPercent: -25,
          duration: 30,
          ease: 'none',
          repeat: -1,
        })

        // Pausar animación al hacer hover
        trackRef.current.addEventListener('mouseenter', () => tl.pause(), { passive: true })
        trackRef.current.addEventListener('mouseleave', () => tl.play(), { passive: true })
      }
    })()
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id="respaldo"
      className="py-16 md:py-[72px] lg:py-20 bg-white border-t border-b border-brand-primary/10 relative overflow-hidden"
    >
      {/* CAD grids para estética técnica */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-10 pointer-events-none" />

      <div className="max-w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Header Animado */}
        <div className="partners-header text-center mb-8 md:mb-10 px-6">
          <span className="text-xs font-mono text-brand-secondary uppercase tracking-widest block mb-2">
            [ RESPALDO INSTITUCIONAL ]
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-mono text-brand-primary dark:text-brand-primary uppercase tracking-wider">
            Entidades que nos Respaldan
          </h3>
          <div className="w-16 h-[2px] bg-brand-secondary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:hidden items-center justify-items-center gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10 w-full max-w-4xl px-6 sm:px-8">
          {guilds.map((guild, idx) => (
            <div
              key={idx}
              className="relative h-24 w-full max-w-[192px] px-2 py-1 md:h-28 md:max-w-[220px] flex items-center justify-center hover:scale-110 transition-all duration-500 cursor-pointer"
            >

              <Image 
                src={guild.src} 
                alt={guild.alt}
                width={guild.width}
                height={guild.height}
                sizes="(max-width: 767px) 192px, 220px"
                style={{ width: 'auto', height: 'auto' }}
                className={`object-contain drop-shadow-md max-w-full ${guild.logoClass}`}
              />
            </div>
          ))}
        </div>

        {/* Carrusel / Marquee Animado */}
        <div className="relative w-full overflow-hidden hidden lg:flex items-center h-64 xl:h-72 mask-image-fade">
          <div
            ref={trackRef}
            className="flex items-center w-max"
          >
            {[...Array(4)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center gap-12 xl:gap-20 px-8 xl:px-12">
                {guilds.map((guild, idx) => (
                  <div
                    key={`${setIdx}-${idx}`}
                    className="relative h-52 w-64 xl:h-60 xl:w-80 flex items-center justify-center shrink-0 hover:scale-110 transition-all duration-500 cursor-pointer"
                  >

                    <Image
                      src={guild.src}
                      alt={guild.alt}
                      width={guild.width}
                      height={guild.height}
                      sizes="(max-width: 1279px) 256px, 320px"
                      style={{ width: 'auto', height: 'auto' }}
                      className={`object-contain drop-shadow-md max-w-[95%] ${guild.logoClass}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradientes laterales para suavizar la entrada/salida de los logos */}
      <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />
    </section>
  )
}
