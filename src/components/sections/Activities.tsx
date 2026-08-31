import { useRef } from 'react'
import { ArrowLeft, ArrowRight, MapPin } from '@phosphor-icons/react'
import { activities } from '../../data/content'
import { GsapReveal, GsapRevealGroup } from '../ui/GsapReveal'
import { WriteReveal } from '../ui/WriteReveal'
import { ScaleImage } from '../ui/ScaleImage'
import { TiltCard } from '../ui/TiltCard'

export function Activities() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' })
  }

  return (
    <section id="actividades" className="bg-bone py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 border-b border-ink/10 pb-8 sm:flex-row sm:items-end">
          <GsapReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Actividades cercanas
            </p>
            <WriteReveal as="h2" className="mt-4 block max-w-md font-display text-4xl italic leading-[1.1] text-ink md:text-5xl">
              La sierra tiene más para dar
            </WriteReveal>
          </GsapReveal>

          <GsapReveal delay={0.15} className="flex gap-3 self-start sm:self-auto">
            <button
              type="button"
              aria-label="Ver anteriores"
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Ver siguientes"
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowRight size={18} />
            </button>
          </GsapReveal>
        </div>

        <GsapRevealGroup
          innerRef={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {activities.map((activity) => (
            <article key={activity.title} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[30%]">
              <TiltCard className="aspect-[4/3] overflow-hidden rounded-xl border border-ink/10" max={8} scale={1.03}>
                <ScaleImage
                  src={activity.image.src}
                  alt={activity.image.alt}
                  className="h-full w-full"
                  radiusFrom={0}
                  radiusTo={0}
                />
              </TiltCard>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-gold">
                <MapPin size={14} weight="light" />
                <span>
                  {activity.place} · {activity.distance}
                </span>
              </div>
              <WriteReveal as="h3" className="mt-2 block font-display text-2xl italic text-ink">
                {activity.title}
              </WriteReveal>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{activity.description}</p>
            </article>
          ))}
        </GsapRevealGroup>
      </div>
    </section>
  )
}
