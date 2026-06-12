'use client'

import Image from 'next/image'

export default function Partners() {
  const guilds = [
    { src: '/images/logos/gremio-1.webp', alt: 'Gremio 1', width: 80, height: 35 },
    { src: '/images/logos/gremio-2.webp', alt: 'Gremio 2', width: 80, height: 35 },
    { src: '/images/logos/gremio-3.webp', alt: 'Gremio 3', width: 80, height: 35 },
    { src: '/images/logos/gremio-4.webp', alt: 'Gremio 4', width: 80, height: 35 },
    { src: '/images/logos/gremio-5.webp', alt: 'Gremio 5', width: 80, height: 35 }
  ]

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-50 border-t border-brand-primary/10 relative overflow-hidden">
      {/* CAD grids */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-cad-grid-fine opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-6">
        {/* Guilds Sub-section */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-[10px] font-mono text-brand-secondary uppercase tracking-widest">
              [ AFILIACIONES Y VÍNCULOS ]
            </span>
            <h3 className="text-base font-bold font-mono text-brand-primary dark:text-brand-primary uppercase tracking-wider mt-1">
              Gremios y Asociaciones del Sector
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {guilds.map((guild, idx) => (
              <div 
                key={idx} 
                className="relative h-10 w-24 flex items-center justify-center filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              >
                <Image 
                  src={guild.src} 
                  alt={guild.alt}
                  width={guild.width}
                  height={guild.height}
                  style={{ height: 'auto' }}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
