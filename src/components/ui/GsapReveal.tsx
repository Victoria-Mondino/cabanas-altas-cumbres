import { useEffect, useRef } from 'react'
import type { ReactNode, Ref } from 'react'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GsapRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function GsapReveal({ children, className = '', delay = 0, y = 32 }: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [reduce, delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface GsapRevealGroupProps {
  children: ReactNode
  className?: string
  stagger?: number
  y?: number
  innerRef?: Ref<HTMLDivElement>
}

export function GsapRevealGroup({ children, className = '', stagger = 0.08, y = 28, innerRef }: GsapRevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const setRefs = (node: HTMLDivElement | null) => {
    ;(ref as { current: HTMLDivElement | null }).current = node
    if (typeof innerRef === 'function') innerRef(node)
    else if (innerRef && 'current' in innerRef) (innerRef as { current: HTMLDivElement | null }).current = node
  }

  useEffect(() => {
    if (reduce || !ref.current) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(ref.current!.children)
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [reduce, stagger, y])

  return (
    <div ref={setRefs} className={className}>
      {children}
    </div>
  )
}
