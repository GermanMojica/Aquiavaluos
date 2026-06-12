'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: '¿Qué es un avalúo certificado y qué respaldo legal tiene?',
      answer: 'Es un dictamen pericial del valor real de un activo, elaborado por un avaluador inscrito en el R.A.A. (Registro Abierto de Avaluadores) y miembro del R.N.A. (Registro Nacional de Avaluadores). Cumple estrictamente con la Ley 1674 de 2013 y tiene plena validez legal, comercial, tributaria y bancaria.'
    },
    {
      question: '¿Qué documentación se necesita para solicitar una valoración técnica?',
      answer: 'Para predios urbanos, se solicita copia del Certificado de Tradición y Libertad reciente, copia de la escritura pública del inmueble, y el último recibo del impuesto predial. Para inmuebles industriales o rurales complejos, pueden requerirse planos topográficos, licencias de construcción y estados financieros de activos fijos.'
    },
    {
      question: '¿Cuánto tiempo tarda la inspección y la entrega del informe final?',
      answer: 'La inspección física toma de 1 a 2 horas. La entrega del informe final certificado toma de 3 a 5 días hábiles para bienes residenciales y urbanos. Para avalúos corporativos complejos (bodegas, plantas industriales o grandes extensiones rurales), el plazo oscila entre 8 y 12 días hábiles tras recibir la documentación completa.'
    },
    {
      question: '¿Los avalúos de ARQUIAVALÚOS son aceptados en todos los bancos de Colombia?',
      answer: 'Sí. Nuestros peritos están homologados e inscritos ante las principales entidades bancarias y corporaciones financieras del país. Los dictámenes técnicos sirven plenamente para garantías hipotecarias, créditos constructor y procesos de leasing financiero.'
    },
    {
      question: '¿Con qué frecuencia se debe actualizar el avalúo de activos fijos corporativos?',
      answer: 'Bajo normativas internacionales NIIF / IFRS, es aconsejable actualizar la tasación comercial de activos tangibles e inmobiliarios una vez al año, o bien cada dos años si los índices de mercado no muestran fluctuaciones significativas, para garantizar la consistencia en el balance de la compañía.'
    }
  ]

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-24 bg-brand-primary text-white relative overflow-hidden">
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-left mb-16 border-b border-white/10 pb-8">
          <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
            [ RESOLUCIÓN DE DUDAS ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mt-1">
            Preguntas Frecuentes
          </h2>
          <p className="text-sm text-brand-gray-cool mt-3 leading-relaxed">
            Consulte los términos de referencia e información regulatoria estándar sobre nuestros procesos periciales.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="border-b border-white/10 pb-4 transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left py-4 focus:outline-none group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-sm sm:text-base font-bold text-white group-hover:text-brand-secondary transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-brand-secondary group-hover:border-brand-secondary/40 shrink-0 transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-brand-gray-cool leading-relaxed pt-2 pb-4 pr-12 text-left">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
