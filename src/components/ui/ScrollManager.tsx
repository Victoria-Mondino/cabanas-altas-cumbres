import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Cada cambio de ruta vuelve arriba (sin animación); si la URL trae un hash
 * (`/#cabanas`) espera a que GSAP recalcule los pins y recién ahí scrollea.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh()
      document.getElementById(id)?.scrollIntoView()
    }, 300)
    return () => window.clearTimeout(t)
  }, [pathname, hash])

  return null
}
