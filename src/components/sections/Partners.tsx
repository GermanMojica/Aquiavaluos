'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'

export default function Partners() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const guilds = [
    {
      src: '/images/logos/gremio-1.webp',
      alt: 'Gremio 1',
      width: 200,
      height: 200,
      logoClass: 'max-h-[75px] max-w-[192px] scale-[1.18] md:max-h-[88px] md:max-w-[216px]',
    },
    {
      src: '/images/logos/gremio-2.webp',
      alt: 'Gremio 2',
      width: 200,
      height: 200,
      logoClass: 'max-h-[73px] max-w-[140px] md:max-h-[85px] md:max-w-[154px]',
    },
    {
      src: '/images/logos/gremio-3.webp',
      alt: 'Gremio 3',
      width: 200,
      height: 200,
      logoClass: 'max-h-[75px] max-w-[179px] scale-[1.14] md:max-h-[88px] md:max-w-[200px]',
    },
    {
      src: '/images/logos/gremio-4.webp',
      alt: 'Gremio 4',
      width: 200,
      height: 200,
      logoClass: 'max-h-[75px] max-w-[182px] scale-[1.06] md:max-h-[88px] md:max-w-[205px]',
    },
    {
      src: '/images/logos/gremio-5.webp',
      alt: 'Gremio 5',
      width: 200,
      height: 200,
      logoClass: 'max-h-[81px] max-w-[195px] scale-[1.14] md:max-h-[93px] md:max-w-[218px]',
    }
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
            Gremios y Asociaciones del Sector
          </h3>
          <div className="w-16 h-[2px] bg-brand-secondary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 lg:hidden items-center justify-items-center gap-x-6 gap-y-4 md:gap-x-5 md:gap-y-6 w-full max-w-4xl px-6 sm:px-8">
          {guilds.map((guild, idx) => (
            <div
              key={idx}
              className={`relative h-20 w-full max-w-[192px] px-2 py-1 md:col-span-2 md:h-24 md:max-w-[220px] flex items-center justify-center hover:scale-110 transition-all duration-500 cursor-pointer group ${
                idx === guilds.length - 1 ? 'col-span-2 justify-self-center' : ''
              } ${
                idx === 3 ? 'md:col-start-2' : ''
              }`}
            >
              {/* Decoración en esquinas estilo plano */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />

              <Image 
                src={guild.src} 
                alt={guild.alt}
                width={guild.width}
                height={guild.height}
                sizes="(max-width: 767px) 192px, 220px"
                style={{ width: 'auto', height: 'auto' }}
                className={`object-contain drop-shadow-md ${guild.logoClass}`}
              />
            </div>
          ))}
        </div>

        {/* Carrusel / Marquee Animado */}
        <div className="relative w-full overflow-hidden hidden lg:flex items-center h-56 xl:h-64 mask-image-fade">
          <div
            ref={trackRef}
            className="flex items-center w-max"
          >
            {[...Array(4)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center gap-12 xl:gap-20 px-8 xl:px-12">
                {guilds.map((guild, idx) => (
                  <div
                    key={`${setIdx}-${idx}`}
                    className="relative h-44 w-64 xl:h-52 xl:w-80 flex items-center justify-center shrink-0 hover:scale-110 transition-all duration-500 cursor-pointer group"
                  >
                    {/* Decoración en esquinas estilo plano */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-secondary/0 group-hover:border-brand-secondary/40 transition-colors" />

                    <Image
                      src={guild.src}
                      alt={guild.alt}
                      width={guild.width}
                      height={guild.height}
                      sizes="(max-width: 1279px) 256px, 320px"
                      style={{ width: 'auto', height: 'auto' }}
                      className="object-contain drop-shadow-md max-h-[190px] xl:max-h-[220px] max-w-[95%]"
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
