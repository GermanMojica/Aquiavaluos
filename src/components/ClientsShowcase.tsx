'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const clients = [
  { src: '/images/clients/GRUPO-_SURA.png', alt: 'Grupo Sura', w: 160, h: 60 },
  { src: '/images/clients/camara.webp', alt: 'Cámara de Comercio', w: 150, h: 55 },
  { src: '/images/clients/dian.webp', alt: 'DIAN', w: 120, h: 50 },
  { src: '/images/clients/alcaldia.webp', alt: 'Alcaldía', w: 140, h: 55 },
  { src: '/images/clients/afinia.webp', alt: 'Afinia', w: 140, h: 55 },
]

// duplicate for seamless marquee
const marqueeClients = [...clients, ...clients, ...clients]

export default function ClientsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Fade-in entrance for the entire section
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    })

    // Stagger the big logo items
    gsap.from('.client-logo-item', {
      opacity: 0,
      y: 40,
      scale: 0.92,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.clients-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })

    // Animate stat counters
    const counters = containerRef.current?.querySelectorAll('.stat-counter')
    counters?.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10)
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val).toLocaleString('es-CO') + '+'
            }
          })
        }
      })
    })

    // Marquee infinite scroll
    if (marqueeRef.current) {
      const totalWidth = marqueeRef.current.scrollWidth / 3
      gsap.to(marqueeRef.current, {
        x: -totalWidth,
        duration: 28,
        ease: 'none',
        repeat: -1,
      })
    }

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      id="clientes"
      className="relative py-24 bg-white dark:bg-white overflow-hidden"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-5 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-secondary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono text-brand-secondary tracking-[0.3em] uppercase">
            [ NUESTROS CLIENTES ]
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono tracking-tight text-brand-primary dark:text-brand-primary mt-4 leading-tight">
            Confianza que
            <br />
            <span className="text-brand-secondary">respalda resultados.</span>
          </h2>
          <p className="mt-6 text-sm text-brand-gray-cool max-w-xl mx-auto leading-relaxed font-mono">
            Empresas del sector financiero, entidades públicas y conglomerados privados confían en ARQUIAVALÚOS para sus decisiones de valoración.
          </p>
          <div className="w-16 h-[2px] bg-brand-secondary mx-auto mt-6" />
        </div>

        {/* Big Logo Grid */}
        <div className="clients-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="client-logo-item group relative flex items-center justify-center py-10 px-6 border border-brand-primary/8 dark:border-brand-primary/8 bg-white dark:bg-white hover:border-brand-secondary/30 hover:bg-brand-secondary/3 transition-all duration-400 cursor-pointer"
            >
              {/* corner markers */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />

              <Image
                src={client.src}
                alt={client.alt}
                width={client.w}
                height={client.h}
                style={{ height: 'auto' }}
                className="object-contain max-h-14 max-w-full filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400"
              />
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-brand-primary/8 dark:border-brand-primary/8 pt-14">
          {[
            { label: 'Avalúos realizados', target: 5000, suffix: '' },
            { label: 'Entidades financieras', target: 40, suffix: '' },
            { label: 'Municipios cubiertos', target: 120, suffix: '' },
            { label: 'Años de experiencia', target: 15, suffix: '' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <div className="text-4xl lg:text-5xl font-bold font-mono text-brand-primary dark:text-brand-primary flex items-end justify-center gap-0.5">
                <span
                  className="stat-counter"
                  data-target={stat.target}
                >
                  0+
                </span>
              </div>
              <span className="text-[10px] font-mono text-brand-secondary uppercase tracking-widest block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee strip at the bottom */}
      <div className="mt-20 overflow-hidden border-t border-b border-brand-primary/6 dark:border-brand-primary/6 py-5 bg-brand-primary/2 dark:bg-brand-primary/2">
        <div ref={marqueeRef} className="flex items-center gap-16 whitespace-nowrap will-change-transform">
          {marqueeClients.map((client, idx) => (
            <div key={idx} className="flex-shrink-0 opacity-30 hover:opacity-70 transition-opacity">
              <Image
                src={client.src}
                alt={client.alt}
                width={client.w}
                height={client.h}
                style={{ height: 'auto' }}
                className="object-contain max-h-8 filter grayscale"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-secondary/20 to-transparent" />
    </section>
  )
}
