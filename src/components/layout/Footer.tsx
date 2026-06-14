'use client'

import { Grid, Mail, Phone, MapPin, Globe } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-primary text-white border-t border-white/10 relative overflow-hidden">
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Logo and Accreditations */}
          <div className="md:col-span-5 space-y-6 text-left">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 border border-white/15 flex items-center justify-center relative overflow-hidden group-hover:border-brand-secondary transition-colors duration-300">
                <div className="absolute inset-0 bg-cad-grid opacity-30" />
                <Grid className="w-5 h-5 text-white group-hover:text-brand-secondary transition-colors duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none tracking-wider uppercase font-mono">
                  ARQUIAVALÚOS
                </span>
                <span className="text-[9px] font-mono tracking-widest text-brand-secondary uppercase mt-0.5">
                  [ Soluciones de Valor ]
                </span>
              </div>
            </a>
            
            <p className="text-xs text-brand-gray-cool leading-relaxed max-w-sm">
              Empresa colombiana homologada y acreditada en la valoración de activos inmobiliarios, agropecuarios, industriales e intangibles. Respaldados por metodologías estandarizadas y peritos certificados.
            </p>

            {/* Accreditation indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="relative h-10 w-24 flex items-center justify-start filter brightness-0 invert opacity-50 hover:opacity-100 transition-all duration-300">
                <Image src="/images/logos/raa.webp" alt="Registro Abierto de Avaluadores (RAA)" width={90} height={35} className="object-contain max-h-full max-w-full" />
              </div>
              <div className="relative h-10 w-24 flex items-center justify-start filter brightness-0 invert opacity-50 hover:opacity-100 transition-all duration-300">
                <Image src="/images/logos/rna.webp" alt="Registro Nacional de Avaluadores (RNA)" width={90} height={35} className="object-contain max-h-full max-w-full" />
              </div>
              <div className="relative h-10 w-24 flex items-center justify-start filter brightness-0 invert opacity-50 hover:opacity-100 transition-all duration-300">
                <Image src="/images/logos/iso9001.png" alt="Certificación ISO 9001" width={100} height={40} className="object-contain max-h-full max-w-full" />
              </div>
              <div className="relative h-10 w-24 flex items-center justify-start filter brightness-0 invert opacity-50 hover:opacity-100 transition-all duration-300">
                <Image src="/images/logos/Certifiediqnet.png" alt="IQNet Certified" width={100} height={40} className="object-contain max-h-full max-w-full" />
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-secondary">
              [ ENLACES RÁPIDOS ]
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Quiénes Somos', href: '#quienes-somos' },
                { name: 'Servicios', href: '#servicios' },
                { name: 'Sectores', href: '#sectores' },
                { name: 'Proceso', href: '#proceso' },
                { name: 'Diferenciales', href: '#diferenciales' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs font-mono text-brand-gray-cool hover:text-white transition-colors"
                  >
                    &raquo; {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Locations */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-secondary">
              [ DATOS DE CONTACTO ]
            </h4>
            <ul className="space-y-3 font-mono text-xs text-brand-gray-cool">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                <span>Calle 93B # 12-45, Of. 402, Bogotá D.C., Colombia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>+57 (601) 456 7890 / +57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>contacto@arquiavaluos.com.co</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>www.arquiavaluos.com.co</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & legal declarations */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-brand-gray-cool/50 gap-4">
          <div className="text-center sm:text-left">
            &copy; {currentYear} ARQUIAVALÚOS. Todos los derechos reservados. Nit: 900.567.891-2
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Política de Datos (Habeas Data)</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Normativa IGAC</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
