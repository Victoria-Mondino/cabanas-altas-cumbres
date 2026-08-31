import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

type Variant = 'default' | 'link' | 'view'

const SPRING = { stiffness: 420, damping: 32, mass: 0.4 } as const
const SPRING_REDUCED = { stiffness: 1000, damping: 80, mass: 0.2 } as const

const SIZE: Record<Variant, number> = { default: 10, link: 46, view: 88 }

export function CustomCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<Variant>('default')
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, reduce ? SPRING_REDUCED : SPRING)
  const springY = useSpring(y, reduce ? SPRING_REDUCED : SPRING)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches)
    const onChange = () => setEnabled(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]')
      if (el) {
        setVariant((el.dataset.cursor as Variant) || 'link')
        setLabel(el.dataset.cursorLabel || '')
      }
    }
    const out = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('[data-cursor]')
      if (el) {
        setVariant('default')
        setLabel('')
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    document.documentElement.classList.add('custom-cursor-active')

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = SIZE[variant]

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: size,
        height: size,
        backgroundColor: variant === 'default' ? '#F5F4EF' : 'rgba(245,244,239,0.05)',
        borderColor: variant === 'default' ? 'rgba(245,244,239,0)' : 'rgba(245,244,239,0.7)',
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
    >
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-bone">{label}</span>
      )}
    </motion.div>
  )
}
