import { useState } from 'react'
import { motion } from 'motion/react'
import { MagnifyingGlassPlus } from '@phosphor-icons/react'
import { galleryImages } from '../../data/content'
import { GsapReveal } from '../ui/GsapReveal'
import { WriteReveal } from '../ui/WriteReveal'
import { Lightbox } from './Lightbox'

const DEFAULT_ACTIVE = 0

export function Gallery() {
  const [active, setActive] = useState(DEFAULT_ACTIVE)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section id="galeria" className="bg-pine py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <GsapReveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Galería</p>
          <WriteReveal as="h2" className="mt-4 block font-display text-4xl italic leading-[1.1] text-ink md:text-5xl">
            El paisaje alrededor
          </WriteReveal>
        </GsapReveal>

        <GsapReveal delay={0.1}>
          <div
            className="mt-16 hidden h-[560px] gap-3 lg:flex"
            onMouseLeave={() => setActive(DEFAULT_ACTIVE)}
          >
            {galleryImages.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setLightboxIndex(i)}
                data-cursor="view"
                data-cursor-label="Ver"
                className="group relative h-full min-w-0 overflow-hidden rounded-2xl text-left transition-[flex-grow] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ flexGrow: active === i ? 6 : 1, flexBasis: 0, flexShrink: 1 }}
              >
                <motion.img
                  layoutId={`gallery-${img.id}`}
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    active === i ? 'scale-100 brightness-100' : 'scale-105 brightness-[0.45]'
                  }`}
                />
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-opacity duration-500 ${
                    active === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div
                  className={`absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5 transition-all duration-500 ${
                    active === i ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                  }`}
                >
                  <span className="text-sm text-bone">{img.alt}</span>
                  <MagnifyingGlassPlus size={20} weight="light" className="shrink-0 text-bone" />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-6 lg:hidden">
            {galleryImages.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setLightboxIndex(i)}
                data-cursor="view"
                data-cursor-label="Ver"
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl text-left"
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-active:bg-ink/20 group-active:opacity-100">
                  <MagnifyingGlassPlus size={26} weight="light" className="text-bone" />
                </div>
                <p className="mt-4 text-sm text-ink/60">{img.alt}</p>
              </button>
            ))}
          </div>
        </GsapReveal>
      </div>

      <Lightbox
        images={galleryImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  )
}
