'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { FileText, Eye, AreaChart, Inbox, FileCheck } from 'lucide-react'

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGLineElement>(null)

  useGSAP(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTriggerModule = await import('gsap/ScrollTrigger')
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule
      gsap.registerPlugin(ScrollTrigger)

      // Animate the line drawing based on scroll
      gsap.fromTo(lineRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 0.5,
          }
        }
      )

      // Animate each timeline point
      const steps = gsap.utils.toArray('.timeline-step') as HTMLElement[]
      steps.forEach((step, idx) => {
        gsap.from(step, {
          opacity: 0,
          x: -40,
          duration: 0.6,
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        })
      })
    })()
  }, { scope: containerRef })

  const steps = [
    {
      title: '1. Solicitud y Cotización',
      desc: 'El cliente suministra los datos básicos del inmueble y los fines del avalúo. Realizamos una propuesta técnica y económica formal.',
      icon: FileText
    },
    {
      title: '2. Revisión Documental',
      desc: 'Análisis minucioso del certificado de tradición, escrituras públicas, planos arquitectónicos oficiales e impuestos prediales del activo.',
      icon: FileCheck
    },
    {
      title: '3. Inspección Técnica',
      desc: 'Visita presencial por un perito certificado RAA/RNA. Levantamiento físico, registro fotográfico y verificación de acabados e infraestructura.',
      icon: Eye
    },
    {
      title: '4. Análisis y Valoración',
      desc: 'Modelado matemático bajo metodologías normativas: comparación de mercado, capitalización de rentas y costo de reposición.',
      icon: AreaChart
    },
    {
      title: '5. Entrega del Informe Técnico',
      desc: 'Emisión del informe final certificado con firma del perito, radicación digital del expediente y entrega del documento al cliente.',
      icon: Inbox
    }
  ]

  return (
    <section
      id="proceso"
      ref={containerRef}
      className="py-24 bg-white dark:bg-white relative"
    >
      {/* Background technical layout */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-left mb-20 border-b border-brand-primary/10 pb-8">
          <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
            [ METODOLOGÍA NORMATIVA ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-brand-primary dark:text-white mt-1">
            Nuestro Proceso Técnico
          </h2>
          <p className="text-sm text-brand-gray-cool mt-3 max-w-xl leading-relaxed">
            Un flujo estructurado e inspecciones exhaustivas garantizan la idoneidad y aceptación total de nuestros dictámenes periciales ante entes de control y bancos.
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative pl-12 sm:pl-20 py-4">
          {/* Vertical Drawing SVG Line */}
          <div className="absolute left-6 sm:left-[39px] top-0 bottom-0 w-[2px] z-0">
            {/* Background static line */}
            <div className="absolute inset-0 bg-brand-primary/10 dark:bg-brand-primary/10" />
            
            {/* Animated drawing SVG path */}
            <svg className="w-full h-full text-brand-secondary" fill="none">
              <line
                ref={lineRef}
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </svg>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {steps.map((step, idx) => {
              const IconComponent = step.icon
              return (
                <div
                  key={idx}
                  className="timeline-step flex flex-col sm:flex-row gap-4 sm:gap-8 items-start relative z-10"
                >
                  {/* Circle point */}
                  <div className="absolute -left-12 sm:-left-20 top-0.5 w-[26px] h-[26px] rounded-full bg-white dark:bg-white border-2 border-brand-primary/20 flex items-center justify-center group">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary group-hover:bg-brand-secondary transition-colors" />
                  </div>

                  {/* Icon Panel */}
                  <div className="w-12 h-12 border border-brand-primary/10 dark:border-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-brand-primary bg-brand-gray-light dark:bg-brand-primary/10 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2 text-left">
                    <h3 className="text-lg font-bold font-mono text-brand-primary dark:text-brand-primary uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="text-xs text-brand-gray-cool leading-relaxed max-w-xl">
                      {step.desc}
                    </p>
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
