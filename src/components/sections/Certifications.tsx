'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()

        const gsapModule = await import('gsap')
        const gsap = gsapModule.gsap || gsapModule.default || gsapModule

        const title = container.querySelector('.cert-title')
        const subs = container.querySelectorAll('.cert-sub')
        const cards = container.querySelectorAll('.cert-logo-card')

        const tl = gsap.timeline()
        tl.fromTo(
          title,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
        )
        tl.fromTo(
          subs,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.14 },
          '-=0.5'
        )
        tl.fromTo(
          cards,
          { opacity: 0, scale: 0.88, y: 40 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.2, duration: 0.85, ease: 'power3.out' },
          '-=0.4'
        )
      },
      { threshold: 0.15 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      id="certificaciones"
      className="relative bg-white py-14 sm:py-20 px-6 sm:px-12 overflow-hidden"
    >
      {/* Subtle grid backdrop */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Label */}
        <span className="text-sm font-mono text-brand-secondary tracking-widest uppercase block mb-6">
          [ CERTIFICACIÓN & CALIDAD ]
        </span>

        {/* Main Title */}
        <h2 className="cert-title text-3xl sm:text-5xl lg:text-6xl font-black font-mono text-brand-primary leading-tight tracking-tight">
          Contamos con certificación{' '}
          <span className="text-brand-secondary">ISO 9001-2015</span>{' '}
          para realizar tus avalúos
        </h2>

        {/* Subtitle */}
        <p className="cert-sub text-lg sm:text-xl font-bold text-brand-primary mt-6">
          La garantía de calidad internacional en cada informe que entregamos.
        </p>

        {/* Description */}
        <p className="cert-sub text-base sm:text-lg text-brand-gray-cool mt-4 max-w-3xl mx-auto leading-relaxed">
          La certificación ISO 9001 no es solo un sello: significa que cada avalúo que realizamos
          sigue procesos rigurosos, documentados y auditados internacionalmente. Tu decisión de
          negocio, tu crédito hipotecario o tu proceso legal merece ese nivel de confianza.
        </p>

        {/* Divider */}
        <div className="w-16 h-[2px] bg-brand-secondary mx-auto mt-10 mb-14" />

        {/* Certification Logos */}
        <div className="cert-logos flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24">
          {/* IQNet */}
          <div className="cert-logo-card flex flex-col items-center gap-4">
            <div className="relative w-44 h-44 flex items-center justify-center border border-brand-primary/10 bg-white shadow-md p-4">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-secondary/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-secondary/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-secondary/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-secondary/40" />
              <Image
                src="/images/logos/Certifiediqnet.png"
                alt="IQNet Certified Management System"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-mono text-brand-primary tracking-widest font-bold">
              CO–SC–2000670
            </span>
          </div>

          {/* ISO 9001 Icontec */}
          <div className="cert-logo-card flex flex-col items-center gap-4">
            <div className="relative w-44 h-44 flex items-center justify-center border border-brand-primary/10 bg-white shadow-md p-4">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-secondary/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-secondary/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-secondary/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-secondary/40" />
              <Image
                src="/images/logos/iso9001.png"
                alt="ISO 9001 Icontec Internacional"
                width={130}
                height={130}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-mono text-brand-primary tracking-widest font-bold">
              SC–2000670
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
