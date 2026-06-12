'use client'

import { useState } from 'react'
import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CredibilityBar from '@/components/CredibilityBar'
import StorytellingSection from '@/components/StorytellingSection'
import ServicesBento from '@/components/ServicesBento'
import BlueprintTransition from '@/components/BlueprintTransition'
import Sectors from '@/components/Sectors'
import ProcessTimeline from '@/components/ProcessTimeline'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
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
        {/* 1. Hero Premium */}
        <Hero onOpenDrawer={openDrawer} />

        {/* 2. Barra de Credibilidad */}
        <CredibilityBar />

        {/* 3. ¿Quiénes Somos? (Storytelling scroll inmersivo & Sergio Delgado & Clientes) */}
        <StorytellingSection />

        {/* 4. Servicios Principales (Bento Grid) */}
        <ServicesBento />

        {/* 4.5 Transición Inmersiva CAD Blueprint */}
        <BlueprintTransition />

        {/* 5. Sectores que Atendemos */}
        <Sectors />

        {/* 6. Nuestro Proceso (Timeline interactivo con scroll-draw) */}
        <ProcessTimeline />

        {/* 7. ¿Por qué elegir ARQUIAVALÚOS? */}
        <WhyChooseUs />

        {/* 8. Testimonios */}
        <Testimonials />

        {/* 8b. Aliados y Gremios */}
        <Partners />

        {/* 10. CTA Final */}
        <CTA onOpenDrawer={openDrawer} />
      </main>

      {/* Footer Corporativo */}
      <Footer />

      {/* Slide-over Valuation Form Drawer */}
      <RequestValuationDrawer isOpen={drawerOpen} onClose={closeDrawer} />
    </div>
  )
}
