'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, GraduationCap, History, Landmark, ShieldCheck, Zap } from 'lucide-react'

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    // Fade up items with GSAP stagger
    gsap.from('.why-node', {
      opacity: 0,
      y: 40,
      scale: 0.98,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  }, { scope: containerRef })

  const reasons = [
    {
      title: 'Garantía y Certificaciones',
      desc: 'Procesos auditados bajo la norma internacional de calidad ISO 9001:2015 y firmas autorizadas en el RAA y RNA.',
      icon: Award
    },
    {
      title: 'Trayectoria y Solidez',
      desc: 'Más de 15 años de liderazgo sostenido en la valoración de activos y asesoría inmobiliaria de alta complejidad en Colombia.',
      icon: History
    },
    {
      title: 'Equipo Altamente Técnico',
      desc: 'Staff de ingenieros catastrales, arquitectos y peritos avaluadores con posgrados y credenciales de máximo nivel.',
      icon: GraduationCap
    },
    {
      title: 'Cumplimiento Normativo',
      desc: 'Nuestros informes se ajustan plenamente a la Ley 1674 de 2013, decretos regulatorios y resoluciones del IGAC.',
      icon: ShieldCheck
    },
    {
      title: 'Metodologías Internacionales',
      desc: 'Aplicación de normas IVS (Estándares Internacionales de Valoración) aceptadas a nivel contable, NIIF y corporativo global.',
      icon: Landmark
    },
    {
      title: 'Tiempos de Respuesta Ágiles',
      desc: 'Optimización de procesos de inspección física y documental para entregar dictámenes oportunos sin sacrificar el rigor técnico.',
      icon: Zap
    }
  ]

  return (
    <section
      id="diferenciales"
      ref={containerRef}
      className="py-24 bg-white dark:bg-white text-brand-primary relative overflow-hidden"
    >
      {/* Background CAD layout */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-left mb-16 max-w-2xl border-b border-brand-primary/10 pb-8">
          <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
            [ DIFERENCIALES CLAVE ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-brand-primary dark:text-brand-primary mt-1">
            ¿Por qué elegir ARQUIAVALÚOS?
          </h2>
          <p className="text-sm text-brand-gray-cool leading-relaxed mt-3">
            Combinamos conocimiento empírico local con rigurosos procesos estandarizados para respaldar con total certeza legal y financiera el valor de su patrimonio.
          </p>
        </div>

        {/* Content Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Technical Concept Image */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full aspect-[4/3] border border-brand-primary/10 dark:border-brand-primary/10 overflow-hidden shadow-md group bg-slate-50 dark:bg-brand-primary/10">
              {/* Overlay elements */}
              <div className="absolute top-2 left-2 text-[8px] font-mono text-brand-secondary/50 z-10">[ MODEL_ID: ARQUIA_09 ]</div>
              <div className="absolute inset-0 bg-cad-grid-fine opacity-20 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 via-transparent to-transparent pointer-events-none z-10" />
              
              <Image 
                src="/images/hero_concept.png" 
                alt="ARQUIAVALÚOS Metodología Conceptual"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover opacity-90 hover:opacity-100 group-hover:scale-102 transition-all duration-700"
              />
            </div>
            <p className="text-[10px] font-mono text-brand-gray-cool leading-relaxed">
              * Nuestro modelo de análisis espacial integra capas de georreferenciación, viabilidad jurídica y variables de mercado para estructurar un avalúo certificado inquebrantable.
            </p>
          </div>

          {/* Right Column: Differentials Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, idx) => {
              const IconComponent = reason.icon
              return (
                <div
                  key={idx}
                  className="why-node group relative border border-brand-primary/10 dark:border-brand-primary/10 p-6 bg-slate-50 dark:bg-white hover:border-brand-secondary/40 hover:bg-slate-100/50 dark:hover:bg-slate-100/50 transition-all duration-300 flex flex-col justify-between shadow-sm"
                >
                  {/* Tech blueprint corner details */}
                  <div className="absolute top-2 right-2 text-[8px] font-mono text-brand-secondary/40">[ SYS_DIF_0{idx+1} ]</div>
                  
                  {/* Visual line highlight */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="w-12 h-12 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary bg-brand-secondary/5 group-hover:bg-brand-secondary group-hover:text-white transition-all duration-300 shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Title and details */}
                    <div className="space-y-2 text-left">
                      <h3 className="text-base font-bold font-mono text-brand-primary dark:text-brand-primary group-hover:text-brand-secondary transition-colors">
                        {reason.title}
                      </h3>
                      <p className="text-xs text-brand-gray-cool leading-relaxed">
                        {reason.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
