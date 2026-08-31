import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import { nav, RESERVE_LABEL } from '../../data/content'
import { Logo } from './Logo'
import { Button } from '../ui/Button'

export function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setSolid(latest > 50)
  })

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'border-b border-ink/8 bg-bone/85 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo dark={solid} />
          <span
            className={`hidden font-display text-lg italic sm:inline ${solid ? 'text-ink' : 'text-bone'}`}
          >
            Altas Cumbres
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="link"
              className={`group relative py-1 text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-300 hover:text-gold ${
                solid ? 'text-ink/80' : 'text-bone/85'
              }`}
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#reservas" className="px-5 py-2.5 text-[11px]">
            {RESERVE_LABEL}
          </Button>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          className={`lg:hidden ${solid ? 'text-ink' : 'text-bone'}`}
          onClick={() => setOpen(true)}
        >
          <List size={24} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-bone px-6 py-6 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo dark />
                <span className="font-display text-2xl italic text-ink">Altas Cumbres</span>
              </div>
              <button type="button" aria-label="Cerrar menú" className="text-ink" onClick={() => setOpen(false)}>
                <X size={26} />
              </button>
            </div>

            <div className="mt-16 flex flex-col gap-7">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl italic text-ink"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto">
              <Button href="#reservas" className="w-full" onClick={() => setOpen(false)}>
                {RESERVE_LABEL}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
