import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { MouseEvent, ReactNode } from 'react'
import { useRef } from 'react'

interface ButtonProps {
  children: ReactNode
  href: string
  variant?: 'solid' | 'outline'
  className?: string
  onClick?: () => void
}

const SPRING = { type: 'spring', stiffness: 300, damping: 18, mass: 0.4 } as const
const PULL = 0.4

export function Button({ children, href, variant = 'solid', className = '', onClick }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING)
  const springY = useSpring(y, SPRING)

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * PULL)
    y.set((e.clientY - rect.top - rect.height / 2) * PULL)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300'

  const styles =
    variant === 'solid'
      ? 'bg-gold text-ink hover:bg-gold-soft'
      : 'border border-ink/25 text-ink hover:border-ink/60'

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="link"
      className={`${base} ${styles} ${className}`}
      style={reduce ? undefined : { x: springX, y: springY }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={SPRING}
    >
      {children}
    </motion.a>
  )
}
