import { useEffect, useRef } from 'react'
import type { ElementType, ReactNode, Ref } from 'react'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface WriteRevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** 'scrub' (default): se escribe según el scroll. 'play': se escribe sola una vez al entrar. */
  mode?: 'scrub' | 'play'
}

/**
 * Signature title effect: text sits behind a clip-path curtain that wipes
 * away left-to-right, scrubbed to scroll position, so headings look like
 * they're "being written" as the reader scrolls them into view.
 */
export function WriteReveal({ children, as: Tag = 'span', className = '', mode = 'scrub' }: WriteRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        mode === 'play'
          ? {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: ref.current, start: 'top 98%', once: true },
            }
          : {
              clipPath: 'inset(0 0% 0 0)',
              ease: 'none',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 92%',
                end: 'top 55%',
                scrub: 0.4,
              },
            },
      )
    }, ref)

    return () => ctx.revert()
  }, [reduce, mode])

  return (
    <Tag ref={ref as Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  )
}
