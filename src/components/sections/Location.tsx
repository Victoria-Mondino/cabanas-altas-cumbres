import { ArrowUpRight, MapPin, NavigationArrow } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { location } from '../../data/content'
import { GsapReveal } from '../ui/GsapReveal'
import { WriteReveal } from '../ui/WriteReveal'

export function Location() {
  return (
    <section id="ubicacion" className="bg-bone-dim py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">
        <div>
          <WriteReveal as="h2" className="block max-w-sm font-display text-5xl italic leading-[1.1] text-ink md:text-6xl">
            El camino de las <span className="text-gold">Altas Cumbres</span>
          </WriteReveal>

          <GsapReveal delay={0.1}>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink/60">
              A 2238 metros sobre el nivel del mar, en pleno corazón de las Sierras de Córdoba,
              con el valle de Traslasierra de un lado y Punilla del otro.
            </p>
          </GsapReveal>

          <GsapReveal delay={0.2} className="mt-8 flex flex-col gap-4 border-t border-ink/10 pt-8">
            <div className="flex items-start gap-3">
              <MapPin size={20} weight="light" className="mt-0.5 shrink-0 text-gold" />
              <span className="text-sm text-ink/60">{location.address}</span>
            </div>
            <div className="flex items-start gap-3">
              <NavigationArrow size={20} weight="light" className="mt-0.5 shrink-0 text-gold" />
              <span className="text-sm text-ink/60">A 1h 15min desde la ciudad de Córdoba por RP34</span>
            </div>
          </GsapReveal>

          <GsapReveal delay={0.3} className="mt-8">
            <a
              href={location.mapLinkHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold underline decoration-gold/40 decoration-2 underline-offset-4 transition-colors hover:text-gold-soft"
            >
              Abrir en Google Maps
              <ArrowUpRight size={16} />
            </a>
          </GsapReveal>
        </div>

        <GsapReveal delay={0.15} y={40} className="relative overflow-hidden rounded-xl border border-ink/10">
          <div className="aspect-[4/3] w-full grayscale-[15%] lg:aspect-[16/11]">
            <iframe
              title="Ubicación de Cabañas Altas Cumbres"
              src={location.mapEmbedSrc}
              className="h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-2.5 rounded-full bg-ink/90 py-2 pl-2.5 pr-4 text-bone shadow-soft backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-gold"
                animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            <span className="text-xs font-medium tracking-wide">{location.elevation}</span>
          </div>
        </GsapReveal>
      </div>
    </section>
  )
}
