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
    { name: 'Sectores', href: '#sectores' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        mobileMenuOpen
          ? 'py-3 sm:py-4 bg-black border-transparent'
          : scrolled
          ? 'py-3 sm:py-4 bg-white/95 backdrop-blur-md border-b border-brand-primary/10 shadow-sm'
          : 'py-4 sm:py-6 lg:py-8 bg-white/70 backdrop-blur-md border-b border-brand-primary/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group relative z-50">
          <div
            className={`relative flex items-center transition-all duration-500 ease-in-out ${
              scrolled || mobileMenuOpen ? 'w-11 h-11 sm:w-14 sm:h-14' : 'w-44 h-11 sm:w-56 sm:h-14 lg:w-64 lg:h-16'
            }`}
          >
            {/* Full Logo - Visible when NOT scrolled and menu closed */}
            <div
              className={`absolute inset-0 transition-all duration-500 ease-in-out origin-left ${
                scrolled || mobileMenuOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
              }`}
            >
              <Image
                src="/images/cropped-logo.webp"
                alt="ARQUIAVALÚOS"
                fill
                sizes="(max-width: 639px) 176px, (max-width: 1023px) 224px, 256px"
                className="object-contain object-left"
                priority
              />
            </div>

            {/* Icon Logo - Visible when SCROLLED or menu open */}
            <div 
              className={`absolute inset-0 transition-all duration-500 ease-in-out origin-left ${
                scrolled || mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
              }`}
            >
              <Image
                src="/images/logos/favicon.webp"
                alt="AV Icon"
                fill
                sizes="(max-width: 639px) 44px, 56px"
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 xl:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-base font-mono transition-colors py-2 tracking-wider relative group hover:text-brand-secondary ${
                scrolled ? 'text-brand-primary' : 'text-brand-primary'
              }`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-secondary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+573001234567"
            className={`flex items-center gap-2 text-base font-mono whitespace-nowrap transition-colors hover:text-brand-secondary ${
              scrolled ? 'text-brand-primary' : 'text-brand-primary'
            }`}
          >
            <Phone className="w-4 h-4 text-brand-secondary" />
            <span>+57 300 123 4567</span>
          </a>
          <button
            onClick={onOpenDrawer}
            className="bg-brand-primary hover:bg-brand-primary-light dark:bg-brand-primary dark:hover:bg-brand-primary-light text-white font-mono text-base px-6 py-3.5 tracking-wider whitespace-nowrap transition-all cursor-pointer hover:shadow-lg"
          >
            SOLICITAR AVALÚO
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 hover:text-brand-secondary relative z-50 ${
            mobileMenuOpen ? 'text-white' : 'text-brand-primary dark:text-brand-primary'
          }`}
          aria-label="Menú de navegación"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed inset-0 bg-black z-[45] lg:hidden flex flex-col p-6 pt-24 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Background Technical Grid */}
        <div className="absolute inset-0 bg-cad-grid bg-cad-grid-fine opacity-10 pointer-events-none" />
        
        <div className="flex flex-col gap-6 relative z-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-bold font-mono text-white border-b border-white/10 pb-3 hover:text-brand-secondary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-4 mt-6">
            <a
              href="tel:+573001234567"
              className="flex items-center gap-2 text-sm font-mono text-white/80 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-brand-secondary" />
              <span>+57 300 123 4567</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenDrawer()
              }}
              className="w-full bg-brand-secondary text-white font-mono text-sm py-4 tracking-wider transition-all"
            >
              SOLICITAR AVALÚO
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
