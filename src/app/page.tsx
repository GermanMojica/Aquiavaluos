'use client'

import { useState } from 'react'
import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StorytellingSection from '@/components/StorytellingSection'
import BlueprintTransition from '@/components/BlueprintTransition'
import Sectors from '@/components/Sectors'
import ProcessTimeline from '@/components/ProcessTimeline'
import Partners from '@/components/Partners'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import RequestValuationDrawer from '@/components/RequestValuationDrawer'

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
