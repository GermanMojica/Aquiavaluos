'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0)

  const testimonials = [
    {
      text: 'El rigor técnico y normativo de ARQUIAVALÚOS nos permitió sustentar el valor de nuestros activos fijos corporativos ante nuestra junta directiva y auditores internacionales bajo normas NIIF con total tranquilidad.',
      author: 'Alejandro Restrepo',
      role: 'Director de Infraestructura',
      company: 'Grupo Alianza Logística'
    },
    {
      text: 'Su agilidad en la entrega de avalúos comerciales complejos y el sólido respaldo de su equipo pericial acreditado RAA y RNA aceleraron significativamente los tiempos de aprobación en nuestras operaciones financieras.',
      author: 'Diana Gómez',
      role: 'Gerente de Crédito Constructor',
      company: 'Banca Corporativa Nacional'
    },
    {
      text: 'La consultoría inmobiliaria y de mayor y mejor uso sobre nuestros predios de expansión aportó un sustento clave para la toma de decisiones y viabilidad de nuestros desarrollos multifamiliares.',
      author: 'Sergio Jaramillo',
      role: 'Vicepresidente de Proyectos',
      company: 'Constructora e Inmobiliaria Metropolitana'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-24 bg-white dark:bg-white relative overflow-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
        <div className="text-center">
          <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
            [ CASOS DE RESPALDO ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-brand-primary dark:text-brand-primary mt-1">
            Testimonios Corporativos
          </h2>
        </div>

        {/* Testimonial Box */}
        <div className="relative min-h-[220px] flex items-center justify-center py-6">
          <Quote className="absolute top-0 left-0 w-16 h-16 text-brand-secondary/10 pointer-events-none transform -translate-x-4 -translate-y-4" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <p className="text-base sm:text-lg text-brand-primary/80 dark:text-brand-primary/80 italic font-medium leading-relaxed max-w-2xl mx-auto text-center">
                "{testimonials[activeIdx].text}"
              </p>
              
              <div className="space-y-1">
                <h4 className="text-sm font-bold font-mono text-brand-primary dark:text-brand-primary uppercase tracking-wider">
                  {testimonials[activeIdx].author}
                </h4>
                <p className="text-[11px] font-mono text-brand-secondary uppercase tracking-widest">
                  {testimonials[activeIdx].role} &mdash; {testimonials[activeIdx].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 pt-4">
          <button
            onClick={handlePrev}
            className="p-2 border border-brand-primary/10 hover:border-brand-secondary text-brand-primary dark:text-brand-primary hover:text-brand-secondary rounded-full transition-colors cursor-pointer"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIdx === idx ? 'bg-brand-secondary w-6' : 'bg-brand-primary/20 dark:bg-brand-primary/20'
                }`}
                aria-label={`Ir al testimonio ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 border border-brand-primary/10 hover:border-brand-secondary text-brand-primary dark:text-brand-primary hover:text-brand-secondary rounded-full transition-colors cursor-pointer"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
