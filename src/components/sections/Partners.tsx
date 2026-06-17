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
      logoClass: 'max-h-[58px] max-w-[148px] scale-[1.18] md:max-h-[66px] md:max-w-[166px]',
    },
    {
      src: '/images/logos/gremio-2.webp',
      alt: 'Gremio 2',
      width: 200,
      height: 200,
      logoClass: 'max-h-[56px] max-w-[108px] md:max-h-[64px] md:max-w-[118px]',
    },
    {
      src: '/images/logos/gremio-3.webp',
      alt: 'Gremio 3',
      width: 200,
      height: 200,
      logoClass: 'max-h-[58px] max-w-[138px] scale-[1.14] md:max-h-[66px] md:max-w-[154px]',
    },
    {
      src: '/images/logos/gremio-4.webp',
      alt: 'Gremio 4',
      width: 200,
      height: 200,
      logoClass: 'max-h-[58px] max-w-[140px] scale-[1.06] md:max-h-[66px] md:max-w-[158px]',
    },
    {
      src: '/images/logos/gremio-5.webp',
      alt: 'Gremio 5',
      width: 200,
      height: 200,
      logoClass: 'max-h-[62px] max-w-[150px] scale-[1.14] md:max-h-[70px] md:max-w-[168px]',
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
      className="py-16 md:py-[72px] lg:py-20 bg-slate-50 dark:bg-slate-50 border-t border-b border-brand-primary/10 relative overflow-hidden"
    >
      {/* CAD grids para estética técnica */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,148,206,0.04)_0%,transparent_70%)] pointer-events-none" />
      
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

        <div className="grid grid-cols-2 md:grid-cols-6 lg:hidden items-center justify-items-center gap-x-6 gap-y-2 md:gap-x-5 md:gap-y-3 w-full max-w-3xl px-6 sm:px-8">
          {guilds.map((guild, idx) => (
            <div
              key={idx}
              className={`relative h-16 w-full max-w-[148px] px-2 py-1 md:col-span-2 md:h-20 md:max-w-[176px] flex items-center justify-center hover:scale-110 transition-all duration-500 cursor-pointer group ${
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
                sizes="(max-width: 767px) 148px, 170px"
                style={{ width: 'auto', height: 'auto' }}
                className={`object-contain drop-shadow-md ${guild.logoClass}`}
              />
            </div>
          ))}
        </div>

        {/* Carrusel / Marquee Animado */}
        <div className="relative w-full overflow-hidden hidden lg:flex items-center h-32 md:h-40 mask-image-fade">
          <div 
            ref={trackRef}
            className="flex items-center w-max"
          >
            {[...Array(4)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center gap-12 md:gap-28 px-4 md:px-8">
                {guilds.map((guild, idx) => (
                  <div 
                    key={`${setIdx}-${idx}`} 
                    className="relative h-20 w-36 md:h-28 md:w-52 flex items-center justify-center shrink-0 hover:scale-110 transition-all duration-500 cursor-pointer group"
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
                      style={{ width: 'auto', height: 'auto' }}
                      className="object-contain max-h-full max-w-full drop-shadow-md"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradientes laterales para suavizar la entrada/salida de los logos */}
      <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-20" />
    </section>
  )
}
