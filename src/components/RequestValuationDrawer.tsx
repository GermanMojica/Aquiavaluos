'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function RequestValuationDrawer({ isOpen, onClose }: DrawerProps) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoAvaluo: 'urbano',
    ciudad: '',
    detalles: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setFormSubmitted(true)
    }, 1500)
  }

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      tipoAvaluo: 'urbano',
      ciudad: '',
      detalles: ''
    })
    setFormSubmitted(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-50"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white dark:bg-brand-bg-dark border-l border-brand-primary/10 shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Architectural Grid overlay */}
            <div className="absolute inset-0 bg-cad-grid bg-cad-grid-fine pointer-events-none opacity-50" />

            {/* Header */}
            <div className="relative p-6 border-b border-brand-primary/10 flex items-center justify-between bg-white/80 dark:bg-brand-bg-dark/80 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase">
                  [ Formulario R-08 ]
                </span>
                <h3 className="text-xl font-bold text-brand-primary dark:text-white mt-1">
                  Solicitar Avalúo Técnico
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-brand-gray-cool hover:text-brand-primary dark:hover:text-white hover:bg-brand-gray-light dark:hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Cerrar formulario"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content / Scroll Area */}
            <div className="relative flex-1 overflow-y-auto p-6 bg-white/60 dark:bg-transparent">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="text-sm text-brand-gray-cool">
                    Complete los siguientes detalles técnicos de su requerimiento. Un perito especializado del equipo de ARQUIAVALÚOS se pondrá en contacto con usted en menos de 24 horas.
                  </p>

                  {/* Nombre */}
                  <div className="relative border-b border-brand-primary/20 focus-within:border-brand-secondary py-1.5 transition-colors">
                    <label className="block text-[10px] font-mono uppercase text-brand-gray-cool tracking-wider">
                      Nombre Completo / Razón Social
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Ej. Inversiones Bogotá S.A."
                      className="w-full bg-transparent border-0 outline-none text-brand-primary dark:text-white pt-1 text-sm placeholder:text-brand-gray-cool/40"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative border-b border-brand-primary/20 focus-within:border-brand-secondary py-1.5 transition-colors">
                    <label className="block text-[10px] font-mono uppercase text-brand-gray-cool tracking-wider">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contacto@empresa.com"
                      className="w-full bg-transparent border-0 outline-none text-brand-primary dark:text-white pt-1 text-sm placeholder:text-brand-gray-cool/40"
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="relative border-b border-brand-primary/20 focus-within:border-brand-secondary py-1.5 transition-colors">
                    <label className="block text-[10px] font-mono uppercase text-brand-gray-cool tracking-wider">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="+57 300 123 4567"
                      className="w-full bg-transparent border-0 outline-none text-brand-primary dark:text-white pt-1 text-sm placeholder:text-brand-gray-cool/40"
                    />
                  </div>

                  {/* Tipo Avalúo */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase text-brand-gray-cool tracking-wider">
                      Tipo de Valoración Requerida
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'urbano', label: 'Urbano / Residencial' },
                        { id: 'comercial', label: 'Comercial (Locales, Oficinas)' },
                        { id: 'industrial', label: 'Industrial (Bodegas, Plantas)' },
                        { id: 'rural', label: 'Rural (Lotes, Fincas)' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, tipoAvaluo: item.id })}
                          className={`p-3 text-left border text-xs font-mono transition-all ${
                            formData.tipoAvaluo === item.id
                              ? 'border-brand-secondary bg-brand-secondary/5 text-brand-secondary'
                              : 'border-brand-primary/10 hover:border-brand-primary/30 text-brand-gray-cool hover:bg-brand-gray-light dark:hover:bg-slate-800'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ciudad */}
                  <div className="relative border-b border-brand-primary/20 focus-within:border-brand-secondary py-1.5 transition-colors">
                    <label className="block text-[10px] font-mono uppercase text-brand-gray-cool tracking-wider">
                      Ciudad / Ubicación del Inmueble
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ciudad}
                      onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                      placeholder="Bogotá, Medellín, Cali, etc."
                      className="w-full bg-transparent border-0 outline-none text-brand-primary dark:text-white pt-1 text-sm placeholder:text-brand-gray-cool/40"
                    />
                  </div>

                  {/* Detalles */}
                  <div className="relative border border-brand-primary/10 p-3 bg-brand-gray-light/30 dark:bg-slate-900/50">
                    <label className="block text-[10px] font-mono uppercase text-brand-gray-cool tracking-wider mb-2">
                      Detalles del Proyecto / Notas Especiales
                    </label>
                    <textarea
                      value={formData.detalles}
                      onChange={(e) => setFormData({ ...formData, detalles: e.target.value })}
                      rows={3}
                      placeholder="Describa brevemente el activo, área estimada, o finalidad del avalúo (crédito, NIIF, venta)."
                      className="w-full bg-transparent outline-none text-brand-primary dark:text-white text-xs border-0 resize-none placeholder:text-brand-gray-cool/40"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-primary hover:bg-brand-primary-light text-white font-mono text-sm py-4 tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:shadow-lg disabled:opacity-50 group"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>ENVIAR SOLICITUD TÉCNICA</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-brand-secondary animate-bounce" />
                  <h4 className="text-xl font-bold text-brand-primary dark:text-white">
                    ¡Solicitud Recibida Con Éxito!
                  </h4>
                  <p className="text-xs text-brand-gray-cool max-w-xs leading-relaxed">
                    Hemos registrado su solicitud en nuestro sistema. Un perito asignado revisará la información técnica y le contactará en breve.
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 border border-brand-primary text-xs font-mono tracking-wider hover:bg-brand-primary hover:text-white transition-colors mt-6"
                  >
                    NUEVO FORMULARIO
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
