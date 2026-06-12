'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Award, GraduationCap, History, Landmark, ShieldCheck, Zap } from 'lucide-react'

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
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
      className="py-24 bg-brand-primary text-white relative overflow-hidden"
    >
      {/* Background CAD layout */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-left mb-16 max-w-2xl border-b border-white/10 pb-8">
          <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
            [ DIFERENCIALES CLAVE ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mt-1">
            ¿Por qué elegir ARQUIAVALÚOS?
          </h2>
          <p className="text-sm text-brand-gray-cool leading-relaxed mt-3">
            Combinamos conocimiento empírico local con rigurosos procesos estandarizados para respaldar con total certeza legal y financiera el valor de su patrimonio.
          </p>
        </div>

        {/* Reasons Grid (Glassmorphism layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => {
            const IconComponent = reason.icon
            return (
              <div
                key={idx}
                className="why-node group relative border border-white/10 p-8 bg-white/5 hover:border-brand-secondary/40 hover:bg-white/10 backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
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
                    <h3 className="text-base font-bold font-mono text-white group-hover:text-brand-secondary transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-xs text-brand-gray-cool/80 leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
