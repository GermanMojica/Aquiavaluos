'use client'

import { ReactNode, useEffect } from 'react'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    ;(async () => {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTriggerModule = await import('gsap/ScrollTrigger')
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default || ScrollTriggerModule
      const Lenis = (await import('lenis')).default
      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      })

      // Synchronize ScrollTrigger with Lenis scrolling
      lenis.on('scroll', ScrollTrigger.update)

      // Bind Lenis scroll tick into GSAP ticker
      const raf = (time: number) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      // Trigger initial refresh
      ScrollTrigger.refresh()

      // Cleanup on unmount
      const cleanup = () => {
        lenis.destroy()
        gsap.ticker.remove(raf)
      }

      // attach cleanup to window to be used by returned function below
      ;(cleanup as any).attached = true
      // store cleanup to closure
      ;(window as any).__lenis_cleanup = cleanup
    })()

    return () => {
      const cl = (window as any).__lenis_cleanup
      if (cl) cl()
    }
  }, [])

  return <>{children}</>
}
