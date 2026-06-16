'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import StorytellingSection from '@/components/sections/StorytellingSection'
import BlueprintTransition from '@/components/sections/BlueprintTransition'
import Sectors from '@/components/sections/Sectors'
import Partners from '@/components/sections/Partners'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/layout/Footer'
import RequestValuationDrawer from '@/components/features/RequestValuationDrawer'

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden select-none bg-white dark:bg-white text-brand-primary dark:text-brand-primary">
      {/* Sticky Header */}
      <Navbar onOpenDrawer={openDrawer} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero — Primera impresión con background y CTA principal */}
        <Hero onOpenDrawer={openDrawer} />

        {/* Quote Banner */}
        <div className="bg-black py-10 px-6 sm:px-12">
          <div className="max-w-4xl mx-auto flex items-start gap-6">
            <div className="w-8 h-0.5 bg-brand-secondary mt-5 flex-shrink-0" />
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
              "Transformamos conocimiento y experiencia en{' '}
              <span className="text-brand-secondary">confianza</span> para nuestros clientes."
            </p>
          </div>
        </div>

        {/* 2. Quiénes Somos — Storytelling inmersivo: Sergio Delgado + Clientes + Stats */}
        <StorytellingSection />

        {/* 3. Transición Inmersiva CAD — El plano arquitectónico animado */}
        <BlueprintTransition />

        {/* 4. Sectores que Atendemos — A quién servimos */}
        <Sectors />

        {/* 5. Nuestro Proceso Técnico — (sección eliminada por rendimiento) */}

        {/* 6. Aliados y Gremios */}
        <Partners />

        {/* 7. CTA Final — Llamado a la acción */}
        <CTA onOpenDrawer={openDrawer} />
      </main>

      {/* Footer Corporativo */}
      <Footer />

      {/* Slide-over Valuation Form Drawer */}
      <RequestValuationDrawer isOpen={drawerOpen} onClose={closeDrawer} />
    </div>
  )
}
