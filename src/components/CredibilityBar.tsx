'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function CredibilityBar() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Stat counter animations
    const counters = gsap.utils.toArray('.counter-val') as HTMLElement[]
    
    counters.forEach(counter => {
      const targetVal = parseInt(counter.dataset.target || '0', 10)
      const isDecimal = counter.dataset.decimal === 'true'
      const obj = { val: 0 }
      
      gsap.to(obj, {
        val: targetVal,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          if (isDecimal) {
            counter.textContent = (obj.val / 10).toFixed(1)
          } else {
            counter.textContent = Math.round(obj.val).toLocaleString()
          }
        }
      })
    })

    // Animate divider lines
    gsap.from('.divider-line', {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%'
      }
    })
  }, { scope: containerRef })

  const stats = [
    { value: '15', suffix: '+', label: 'Años de Experiencia', sub: 'Trayectoria sólida', target: '15' },
    { value: '100', suffix: '%', label: 'Cobertura Nacional', sub: 'Operación en toda Colombia', target: '100' },
    { value: '25', suffix: 'K+', label: 'Avalúos Realizados', sub: 'Inmuebles e infraestructura', target: '25000' },
    { value: '9001', suffix: '', label: 'Certificación Calidad', sub: 'Auditoría ISO 9001', target: '9001' },
    { value: '100', suffix: '%', label: 'Registros RAA / RNA', sub: 'Peritos certificados', target: '100' }
  ]

  return (
    <div
      ref={containerRef}
      className="relative bg-brand-primary border-y border-white/10 py-10 z-20 overflow-hidden"
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 items-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col text-center md:text-left relative px-4">
              {/* Vertical technical line dividers on desktop */}
              {idx > 0 && (
                <div className="divider-line hidden md:block absolute left-0 top-2 bottom-2 w-[1px] bg-white/10" />
              )}
              
              <span className="text-[10px] font-mono text-brand-secondary uppercase tracking-widest mb-1">
                [ {stat.label} ]
              </span>
              <div className="text-3xl lg:text-4xl font-mono font-bold text-white flex items-center justify-center md:justify-start">
                <span 
                  className="counter-val" 
                  data-target={stat.target}
                  data-decimal={stat.value.includes('.') ? 'true' : 'false'}
                >
                  0
                </span>
                <span className="text-brand-secondary ml-0.5">{stat.suffix}</span>
              </div>
              <span className="text-xs text-brand-gray-cool/80 mt-1 font-mono">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
