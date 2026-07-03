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
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
        tl.fromTo(
          cards,
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
        tl.fromTo(
          subs,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 },
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

      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center">
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

        {/* Certification Logos */}
        <div className="cert-logos flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24 mt-12 sm:mt-16 w-full">
          {/* IQNet */}
          <div className="cert-logo-card flex flex-col items-center gap-4">
            <Image
              src="/images/logos/Certifiediqnet.png"
              alt="IQNet Certified Management System"
              width={160}
              height={160}
              className="object-contain hover:scale-105 transition-transform duration-300"
            />
            <span className="text-sm font-mono text-brand-primary tracking-widest font-bold">
              CO–SC–2000670
            </span>
          </div>

          {/* ISO 9001 Icontec */}
          <div className="cert-logo-card flex flex-col items-center gap-4">
            <Image
              src="/images/logos/iso9001.png"
              alt="ISO 9001 Icontec Internacional"
              width={150}
              height={150}
              className="object-contain hover:scale-105 transition-transform duration-300"
            />
            <span className="text-sm font-mono text-brand-primary tracking-widest font-bold">
              SC–2000670
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-16 h-[2px] bg-brand-secondary mx-auto mt-12 mb-10" />

        {/* Subtitle */}
        <p className="cert-sub text-lg sm:text-xl font-bold text-brand-primary">
          La garantía de calidad internacional en cada informe que entregamos.
        </p>

        {/* Description */}
        <p className="cert-sub text-base sm:text-lg text-brand-gray-cool mt-4 max-w-3xl mx-auto leading-relaxed">
          La certificación ISO 9001 no es solo un sello: significa que cada avalúo que realizamos
          sigue procesos rigurosos, documentados y auditados internacionalmente. Tu decisión de
          negocio, tu crédito hipotecario o tu proceso legal merece ese nivel de confianza.
        </p>
      </div>
    </section>
  )
}
