'use client'

import { Mail, Phone, MessageSquare } from 'lucide-react'

interface CTAProps {
  onOpenDrawer: () => void
}

export default function CTA({ onOpenDrawer }: CTAProps) {
  return (
    <section className="py-24 bg-brand-bg-dark text-white relative overflow-hidden">
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,148,206,0.1)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Blueprint fine lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
        <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">
          [ LLAMADO A LA ACCIÓN TÉCNICO ]
        </span>
        
        <h2 className="text-3xl sm:text-5xl font-bold font-mono tracking-tight leading-tight max-w-3xl mx-auto text-white">
          Conozca el valor real de sus activos con respaldo profesional.
        </h2>
        
        <p className="text-sm sm:text-base text-brand-gray-cool max-w-xl mx-auto leading-relaxed">
          Más de 15 años tasando confianza y certidumbre legal para particulares, corporaciones y el sector financiero colombiano.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
          <button
            onClick={onOpenDrawer}
            className="w-full sm:w-auto bg-brand-secondary hover:bg-brand-secondary-light text-white font-mono text-sm px-8 py-4.5 tracking-wider transition-all hover:shadow-lg hover:shadow-brand-secondary/20 cursor-pointer"
          >
            SOLICITAR AVALÚO
          </button>
          
          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-white/20 hover:border-white/50 text-white font-mono text-sm px-8 py-4.5 tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-brand-secondary" />
            <span>HABLAR POR WHATSAPP</span>
          </a>
        </div>

        {/* Quick Contact Footer Strip */}
        <div className="pt-12 flex flex-wrap gap-8 justify-center items-center text-xs font-mono text-brand-gray-cool/60">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-secondary" />
            <span>+57 (601) 456 7890</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-secondary" />
            <span>contacto@arquiavaluos.com.co</span>
          </div>
          <div className="flex items-center gap-2">
            <span>REGISTROS: RAA-90023 / RNA-45091</span>
          </div>
        </div>
      </div>
    </section>
  )
}
