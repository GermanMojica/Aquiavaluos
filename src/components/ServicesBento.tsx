'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Trees, Landmark, Factory, Scale, BookOpen } from 'lucide-react'

export default function ServicesBento() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    // Fade up cells with GSAP on viewport entrance
    gsap.from('.bento-cell', {
      opacity: 0,
      y: 50,
      scale: 0.98,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  }, { scope: containerRef })

  const services = [
    {
      id: '01',
      code: '[ CAT: URB-AV ]',
      title: 'Avalúos Urbanos',
      icon: Building2,
      desc: 'Valoración técnica y comercial de bienes residenciales, apartamentos, casas y edificios de vivienda multifamiliar bajo metodologías de mercado.',
      colSpan: 'md:col-span-8',
      height: 'h-[320px]',
      bgAccent: 'rgba(0, 148, 206, 0.03)'
    },
    {
      id: '02',
      code: '[ CAT: RUR-AV ]',
      title: 'Avalúos Rurales',
      icon: Trees,
      desc: 'Estudio de valor comercial para predios agropecuarios, fincas y tierras de cultivo en todo el territorio nacional.',
      colSpan: 'md:col-span-4',
      height: 'h-[320px]',
      bgAccent: 'rgba(0, 0, 0, 0)'
    },
    {
      id: '03',
      code: '[ CAT: COM-AV ]',
      title: 'Avalúos Comerciales',
      icon: Landmark,
      desc: 'Determinación de valor real para locales, centros comerciales, oficinas corporativas y desarrollos mixtos complejos.',
      colSpan: 'md:col-span-4',
      height: 'h-[340px]',
      bgAccent: 'rgba(0, 0, 0, 0)'
    },
    {
      id: '04',
      code: '[ CAT: IND-AV ]',
      title: 'Avalúos Industriales',
      icon: Factory,
      desc: 'Valoración de plantas industriales, bodegas logísticas, maquinaria pesada y activos de infraestructura corporativa especializada.',
      colSpan: 'md:col-span-8',
      height: 'h-[340px]',
      bgAccent: 'rgba(0, 148, 206, 0.03)'
    },
    {
      id: '05',
      code: '[ CAT: CON-INM ]',
      title: 'Consultoría Inmobiliaria',
      icon: Scale,
      desc: 'Estudios de mayor y mejor uso, asesoría en plusvalía, estructuración técnica de activos y viabilidad de proyectos inmobiliarios.',
      colSpan: 'md:col-span-6',
      height: 'h-[300px]',
      bgAccent: 'rgba(0, 148, 206, 0.03)'
    },
    {
      id: '06',
      code: '[ CAT: FOR-CAP ]',
      title: 'Formación y Capacitación',
      icon: BookOpen,
      desc: 'Programas de capacitación especializada en avalúos, normatividad técnica RAA/RNA y metodologías internacionales de valoración corporativa.',
      colSpan: 'md:col-span-6',
      height: 'h-[300px]',
      bgAccent: 'rgba(0, 0, 0, 0)'
    }
  ]

  return (
    <section
      id="servicios"
      ref={containerRef}
      className="pt-24 pb-4 bg-white dark:bg-white relative"
    >
      {/* Background grids */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-left mb-16 max-w-2xl border-b border-brand-primary/10 pb-8">
          <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
            [ PORTFOLIO TÉCNICO ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-brand-primary dark:text-brand-primary mt-1">
            Servicios de Valoración Integral
          </h2>
          <p className="text-sm text-brand-gray-cool mt-3 leading-relaxed">
            Soluciones de avalúos y consultorías estructuradas bajo estrictos lineamientos normativos nacionales (IGAC, Superfinanciera) y metodologías globales.
          </p>
        </div>

        {/* Bento Grid (Removed as per user request) */}
        <div className="w-full">
          {/* El plano irá debajo de esta sección en page.tsx */}
        </div>
      </div>
    </section>
  )
}
