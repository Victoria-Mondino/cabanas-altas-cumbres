import { useRef } from 'react'
import { Quotes, Star } from '@phosphor-icons/react'
import { testimonialsRow1, testimonialsRow2 } from '../../data/content'
import { GsapReveal } from '../ui/GsapReveal'
import { WriteReveal } from '../ui/WriteReveal'

type Testimonial = {
  id: string
  name: string
  origin: string
  quote: string
}

const AVATAR_BG = ['bg-forest', 'bg-gold', 'bg-ink'] as const

function initials(name: string) {
  return name
    .replace('Fam.', '')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  return (
    <div className="mx-3 flex w-[320px] shrink-0 flex-col justify-between rounded-3xl border border-ink/5 bg-gradient-to-br from-white to-[#efe9dc] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md sm:w-[380px] md:p-10">
      <div>
        <Quotes size={36} weight="fill" className="mb-6 text-gold" aria-hidden="true" />
        <p className="text-[1.05rem] font-medium leading-relaxed text-ink/80">{item.quote}</p>
      </div>
      <div className="mt-8 flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white text-sm font-bold text-bone shadow-sm ${AVATAR_BG[index % AVATAR_BG.length]}`}
          aria-hidden="true"
        >
          {initials(item.name)}
        </div>
        <div>
          <p className="text-base font-bold text-ink">{item.name}</p>
          <p className="text-sm font-medium text-ink/50">{item.origin}</p>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'
  }
  const resume = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running'
  }

  const doubled = [...items, ...items]

  return (
    <div className="marquee-row marquee-mask" onTouchStart={pause} onTouchEnd={resume}>
      <div
        ref={trackRef}
        className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={`${item.id}-${i}`} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}

export function Testimonios() {
  return (
    <section id="testimonios" className="overflow-hidden bg-bone py-20 md:py-28">
      <div className="mx-auto mb-16 max-w-4xl px-6 text-center lg:px-10">
        <GsapReveal className="flex justify-center">
          <span className="inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pl-1.5 pr-5 text-sm font-medium text-bone shadow-xl shadow-ink/10 transition-transform duration-300 hover:scale-105 md:text-base">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold shadow-[0_0_10px_rgba(240,169,60,0.6)]">
              <Star size={16} weight="fill" className="text-ink" />
            </span>
            Huéspedes de toda la sierra
          </span>
        </GsapReveal>

        <WriteReveal
          as="h2"
          className="mt-8 block font-display text-4xl italic leading-tight tracking-tight text-ink md:text-5xl lg:text-[3.5rem]"
        >
          Lo que dicen nuestros huéspedes
        </WriteReveal>
      </div>

      <div className="flex flex-col gap-6 pb-2">
        <MarqueeRow items={testimonialsRow1} />
        <MarqueeRow items={testimonialsRow2} reverse />
      </div>
    </section>
  )
}
