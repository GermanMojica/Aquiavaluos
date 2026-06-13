'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Phone, Menu, X } from 'lucide-react'

interface NavbarProps {
  onOpenDrawer: () => void
}

export default function Navbar({ onOpenDrawer }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Quiénes Somos', href: '#quienes-somos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Sectores', href: '#sectores' },
    { name: 'Proceso', href: '#proceso' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/95 dark:bg-white/95 backdrop-blur-md border-b border-brand-primary/10 shadow-sm'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group relative z-50">
          <div 
            className={`relative flex items-center transition-all duration-500 ease-in-out ${
              scrolled ? 'w-10 h-10' : 'w-44 h-10'
            }`}
          >
            {/* Full Logo - Visible when NOT scrolled */}
            <div 
              className={`absolute inset-0 transition-all duration-500 ease-in-out origin-left ${
                scrolled ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
              }`}
            >
              <Image
                src="/images/cropped-logo.webp"
                alt="ARQUIAVALÚOS"
                fill
                sizes="176px"
                className="object-contain object-left"
                priority
              />
            </div>

            {/* Icon Logo - Visible when SCROLLED */}
            <div 
              className={`absolute inset-0 transition-all duration-500 ease-in-out origin-left ${
                scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
              }`}
            >
              <Image
                src="/images/logos/favicon.webp"
                alt="AV Icon"
                fill
                sizes="40px"
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono text-brand-primary/70 dark:text-brand-primary/70 hover:text-brand-secondary dark:hover:text-brand-secondary transition-colors py-2 tracking-wider relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-secondary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+573001234567"
            className="flex items-center gap-2 text-xs font-mono text-brand-primary dark:text-brand-primary hover:text-brand-secondary dark:hover:text-brand-secondary transition-colors"
          >
            <Phone className="w-4 h-4 text-brand-secondary" />
            <span>+57 300 123 4567</span>
          </a>
          <button
            onClick={onOpenDrawer}
            className="bg-brand-primary hover:bg-brand-primary-light dark:bg-brand-primary dark:hover:bg-brand-primary-light text-white font-mono text-xs px-5 py-3 tracking-wider transition-all cursor-pointer hover:shadow-lg"
          >
            SOLICITAR AVALÚO
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-brand-primary dark:text-brand-primary hover:text-brand-secondary relative z-50"
          aria-label="Menú de navegación"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-white z-45 md:hidden flex flex-col p-6 pt-24">
          {/* Background Technical Grid */}
          <div className="absolute inset-0 bg-cad-grid bg-cad-grid-fine opacity-40 pointer-events-none" />
          
          <div className="flex flex-col gap-6 relative z-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold font-mono text-brand-primary dark:text-brand-primary border-b border-brand-primary/10 pb-3 hover:text-brand-secondary dark:hover:text-brand-secondary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-4 mt-6">
              <a
                href="tel:+573001234567"
                className="flex items-center gap-2 text-sm font-mono text-brand-primary dark:text-brand-primary"
              >
                <Phone className="w-4 h-4 text-brand-secondary" />
                <span>+57 300 123 4567</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenDrawer()
                }}
                className="w-full bg-brand-primary text-white font-mono text-sm py-4 tracking-wider transition-all"
              >
                SOLICITAR AVALÚO
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
