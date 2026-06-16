'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const gsapRef = useRef<any>(null)

  useEffect(() => {
    // Load GSAP once and cache reference
    ;(async () => {
      const gsapModule = await import('gsap')
      gsapRef.current = gsapModule.gsap || gsapModule.default || gsapModule
    })()

    // Disable custom cursor on mobile or touch-only screens
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current

    if (!dot || !ring) return

    // Hide default cursor on desktop when over the window
    document.documentElement.style.cursor = 'none'

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const gsap = gsapRef.current
      if (gsap) {
        gsap.to(dot, {
          x: clientX,
          y: clientY,
          duration: 0.08,
          ease: 'power2.out'
        })

        gsap.to(ring, {
          x: clientX,
          y: clientY,
          duration: 0.25,
          ease: 'power2.out'
        })
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive-hover')

      if (isInteractive) {
        const gsap = gsapRef.current
        if (gsap) {
          gsap.to(ring, {
            scale: 1.6,
            borderColor: '#0094CE',
            backgroundColor: 'rgba(0, 148, 206, 0.08)',
            duration: 0.2,
          })
          gsap.to(dot, {
            scale: 0.5,
            backgroundColor: '#0094CE',
            duration: 0.2,
          })
        }
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive-hover')

      if (isInteractive) {
        const gsap = gsapRef.current
        if (gsap) {
          gsap.to(ring, {
            scale: 1,
            borderColor: 'rgba(0, 148, 206, 0.3)',
            backgroundColor: 'transparent',
            duration: 0.2,
          })
          gsap.to(dot, {
            scale: 1,
            backgroundColor: '#0094CE',
            duration: 0.2,
          })
        }
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
      document.documentElement.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
