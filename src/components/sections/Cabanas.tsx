import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cabins, type Cabin } from '../../data/content'
import { GsapReveal, GsapRevealGroup } from '../ui/GsapReveal'
import { WriteReveal } from '../ui/WriteReveal'
import { iconFor } from '../ui/icons'

gsap.registerPlugin(ScrollTrigger)

function CabinCard({ cabin }: { cabin: Cabin }) {
  const Icon = iconFor(cabin.icon)
  const to = `/cabanas/${cabin.id}`
  return (
    <div className="cabin-card w-[82vw] shrink-0 sm:w-[58vw] lg:w-[34vw]">
      <Link
        to={to}
        data-cursor="view"
        data-cursor-label="Ver"
        aria-label={`Ver ${cabin.name}`}
        draggable={false}
        className="block overflow-hidden rounded-[1.75rem] border border-ink/10"
      >
        <img
          src={cabin.image.src}
          alt={cabin.image.alt}
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04] lg:max-h-[30vh]"
          loading="lazy"
          draggable={false}
        />
      </Link>

      <div className="mt-5">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
          <Icon size={13} weight="light" />
          {cabin.capacity}
        </p>
        <h3 className="mt-2 font-display text-3xl leading-tight text-ink lg:text-4xl">{cabin.name}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">{cabin.description}</p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {cabin.highlights.slice(0, 3).map((h) => (
          <li
            key={h}
            className="rounded-full border border-ink/12 px-3 py-1 text-[11px] font-medium text-ink/70"
          >
            {h}
          </li>
        ))}
      </ul>

      <Link
        to={to}
        data-cursor="link"
        className="group mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-gold"
      >
        Ver la cabaña
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

export function Cabanas() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [fancy, setFancy] = useState(false)

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setFancy(mq.matches)
    const onChange = () => setFancy(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Ver nota en About.tsx: el pin de GSAP se limpia en layout-effect cleanup.
  useLayoutEffect(() => {
    if (reduce || !fancy || !sectionRef.current || !wrapRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const wrap = wrapRef.current!
      const track = trackRef.current!
      const maxScroll = () => track.scrollWidth - wrap.clientWidth

      gsap.to(track, {
        x: () => -maxScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${maxScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduce, fancy])

  if (fancy) {
    return (
      <section id="cabanas" ref={sectionRef} className="relative h-screen overflow-hidden bg-pine">
        <div className="flex h-full flex-col justify-center gap-8 py-12">
          <GsapReveal className="mx-auto max-w-xl px-6 text-center">
            <span className="inline-flex items-center rounded-full border border-ink/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70">
              Cabañas
            </span>
            <WriteReveal as="h2" className="mt-5 block font-display text-4xl leading-[1.1] text-ink md:text-5xl">
              Cuatro formas de desconectar
            </WriteReveal>
            <span className="mx-auto mt-5 block h-px w-16 bg-ink/25" aria-hidden="true" />
          </GsapReveal>

          <div ref={wrapRef} className="w-full overflow-hidden">
            <div ref={trackRef} className="flex w-max gap-8 px-6 will-change-transform lg:gap-12 lg:px-10">
              {cabins.map((cabin) => (
                <CabinCard key={cabin.id} cabin={cabin} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="cabanas" className="bg-pine py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <GsapReveal className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center rounded-full border border-ink/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70">
            Cabañas
          </span>
          <WriteReveal as="h2" className="mt-5 block font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            Cuatro formas de desconectar
          </WriteReveal>
          <span className="mx-auto mt-5 block h-px w-16 bg-ink/25" aria-hidden="true" />
        </GsapReveal>

        <GsapRevealGroup
          stagger={0.1}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cabins.map((cabin) => (
            <div key={cabin.id} className="snap-start">
              <CabinCard cabin={cabin} />
            </div>
          ))}
        </GsapRevealGroup>
      </div>
    </section>
  )
}
