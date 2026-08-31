import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import type { SiteImage } from '../../data/images'

const EASE = [0.16, 1, 0.3, 1] as const

interface LightboxProps {
  images: SiteImage[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null
  const current = open ? images[index] : null

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(((index as number) + 1) % images.length)
      if (e.key === 'ArrowLeft') onNavigate(((index as number) - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, index, images.length, onClose, onNavigate])

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={onClose}
        >
          <motion.button
            type="button"
            aria-label="Cerrar"
            className="absolute right-5 top-5 text-bone/80 transition-colors hover:text-gold"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
          >
            <X size={28} />
          </motion.button>

          <motion.button
            type="button"
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/80 transition-colors hover:text-gold md:left-8"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate(((index as number) - 1 + images.length) % images.length)
            }}
            whileHover={{ scale: 1.15, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <CaretLeft size={32} />
          </motion.button>

          <motion.button
            type="button"
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-bone/80 transition-colors hover:text-gold md:right-8"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate(((index as number) + 1) % images.length)
            }}
            whileHover={{ scale: 1.15, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <CaretRight size={32} />
          </motion.button>

          <motion.div
            className="relative max-h-[82dvh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
            layoutId={`gallery-${current.id}`}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <img
              src={current.full}
              alt={current.alt}
              className="max-h-[82dvh] w-full rounded-lg object-contain"
            />
            <p className="mt-3 text-center text-xs tracking-wide text-bone/60">{current.alt}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
