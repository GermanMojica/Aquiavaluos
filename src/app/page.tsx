'use client'

import { useState } from 'react'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import StorytellingSection from '@/components/sections/StorytellingSection'
import BlueprintTransition from '@/components/sections/BlueprintTransition'
import Sectors from '@/components/sections/Sectors'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
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
      {/* Premium Interactive Cursor */}
      <CustomCursor />

      {/* Sticky Header */}
      <Navbar onOpenDrawer={openDrawer} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero — Primera impresión con background y CTA principal */}
        <Hero onOpenDrawer={openDrawer} />

        {/* 2. Quiénes Somos — Storytelling inmersivo: Sergio Delgado + Clientes + Stats */}
        <StorytellingSection />

        {/* 3. Transición Inmersiva CAD — El plano arquitectónico animado */}
        <BlueprintTransition />

        {/* 4. Sectores que Atendemos — A quién servimos */}
        <Sectors />

        {/* 5. Nuestro Proceso Técnico — Timeline paso a paso */}
        <ProcessTimeline />

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
