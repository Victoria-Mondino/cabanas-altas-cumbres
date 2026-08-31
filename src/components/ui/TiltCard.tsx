import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import type { MouseEvent, ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
  scale?: number
}

const SPRING = { stiffness: 220, damping: 20, mass: 0.6 } as const

export function TiltCard({ children, className = '', max = 10, scale = 1.02 }: TiltCardProps) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const springX = useSpring(px, SPRING)
  const springY = useSpring(py, SPRING)

  const rotateX = useTransform(springY, [0, 1], [max, -max])
  const rotateY = useTransform(springX, [0, 1], [-max, max])

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      whileHover={reduce ? undefined : { scale }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.div>
  )
}
