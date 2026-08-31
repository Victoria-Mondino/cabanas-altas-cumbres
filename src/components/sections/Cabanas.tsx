import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Bathtub, Fire, Mountains, PawPrint, type IconProps } from '@phosphor-icons/react'
import type { ComponentType } from 'react'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cabins } from '../../data/content'
import { GsapReveal, GsapRevealGroup } from '../ui/GsapReveal'
import { WriteReveal } from '../ui/WriteReveal'

gsap.registerPlugin(ScrollTrigger)

const ICONS: Record<string, ComponentType<IconProps>> = {
  Mountains,
  Fire,
  Bathtub,
  PawPrint,
}

const CABIN_TITLE_CLASS = 'cabin-title mt-1 block whitespace-nowrap font-display text-3xl italic leading-none text-ink lg:text-4xl'

function CabinCard({ cabin, titleRef }: { cabin: (typeof cabins)[number]; titleRef?: (el: HTMLParagraphElement | null) => void }) {
  const Icon = ICONS[cabin.icon]
  return (
    <div className="cabin-card w-[82vw] shrink-0 sm:w-[58vw] lg:w-[40vw]">
      <div className="overflow-hidden rounded-[1.75rem] border border-ink/10">
        <img
          src={cabin.image.src}
          alt={cabin.image.alt}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
            <Icon size={13} weight="light" />
            {cabin.capacity}
          </p>
          {titleRef ? (
            <p ref={titleRef} className={CABIN_TITLE_CLASS}>
              {cabin.name}
            </p>
          ) : (
            <WriteReveal as="p" className={CABIN_TITLE_CLASS}>
              {cabin.name}
            </WriteReveal>
          )}
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-ink/60 sm:text-right">{cabin.description}</p>
      </div>
    </div>
  )
}

export function Cabanas() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const reduce = useReducedMotion()
  const [fancy, setFancy] = useState(false)

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setFancy(mq.matches)
    const onChange = () => setFancy(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduce || !fancy || !sectionRef.current || !wrapRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const wrap = wrapRef.current!
      const track = trackRef.current!
      const maxScroll = () => track.scrollWidth - wrap.clientWidth

      const scrollTween = gsap.to(track, {
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

      titleRefs.current.forEach((title) => {
        if (!title) return
        gsap.set(title, { clipPath: 'inset(0 100% 0 0)' })
        gsap.to(title, {
          clipPath: 'inset(0 0% 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: title,
            containerAnimation: scrollTween,
            start: 'left 82%',
            end: 'left 28%',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduce, fancy])

  if (fancy) {
    return (
      <section id="cabanas" ref={sectionRef} className="relative h-screen overflow-hidden bg-pine">
        <div className="flex h-full flex-col justify-center gap-10 py-16">
          <GsapReveal className="mx-auto max-w-xl px-6 text-center">
            <span className="inline-flex items-center rounded-full border border-ink/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70">
              Cabañas
            </span>
            <WriteReveal as="h2" className="mt-5 block font-display text-4xl italic leading-[1.1] text-ink md:text-5xl">
              Cuatro formas de desconectar
            </WriteReveal>
            <span className="mx-auto mt-5 block h-px w-16 bg-ink/25" aria-hidden="true" />
          </GsapReveal>

          <div ref={wrapRef} className="w-full overflow-hidden">
            <div ref={trackRef} className="flex w-max gap-8 px-6 will-change-transform lg:gap-12 lg:px-10">
              {cabins.map((cabin, i) => (
                <CabinCard
                  key={cabin.id}
                  cabin={cabin}
                  titleRef={(el) => {
                    titleRefs.current[i] = el
                  }}
                />
              ))}
              {/* Trailing spacer: without it the last card can't travel far enough
                  left for its own write-in trigger ('left 28%') to ever be reached —
                  the track runs out of scroll room right as the last card arrives. */}
              <div className="w-[38vw] shrink-0" aria-hidden="true" />
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
          <WriteReveal as="h2" className="mt-5 block font-display text-4xl italic leading-[1.1] text-ink md:text-5xl">
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
