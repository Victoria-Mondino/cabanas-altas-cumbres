import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScaleImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  from?: number
  to?: number
  radiusFrom?: number
  radiusTo?: number
  layoutId?: string
}

/**
 * Signature site effect: the image sits smaller inside its frame and
 * smoothly grows to fill it as the frame scrolls into view, scrubbed
 * directly to scroll position (no easing/inertia beyond the scrub lag).
 */
export function ScaleImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  from = 0.78,
  to = 1,
  radiusFrom = 28,
  radiusTo = 8,
  layoutId,
}: ScaleImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: from, borderRadius: radiusFrom },
        {
          scale: to,
          borderRadius: radiusTo,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 92%',
            end: 'top 30%',
            scrub: 0.6,
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [reduce, from, to, radiusFrom, radiusTo])

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={reduce ? { borderRadius: radiusTo } : { transformOrigin: 'center center' }}
    >
      <motion.img
        layoutId={layoutId}
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
