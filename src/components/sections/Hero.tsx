import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CaretDown } from '@phosphor-icons/react'
import { GsapReveal } from '../ui/GsapReveal'
import { WriteReveal } from '../ui/WriteReveal'
import { heroLayers, stats } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const HERO_VIDEO = '/12438510_3840_2160_24fps.mp4'
const AVATAR_BG = ['bg-forest', 'bg-gold', 'bg-ink-soft', 'bg-gold-soft'] as const
const AVATAR_INITIALS = ['ML', 'NR', 'JG', 'RA']

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !sectionRef.current || !videoRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { scale: 1 },
        {
          scale: 1.18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduce])

  return (
    <section id="top" ref={sectionRef} className="relative flex h-[100dvh] items-end overflow-hidden bg-ink">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        src={HERO_VIDEO}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/50" />

      <div className="relative z-10 w-full px-6 pb-14 pt-40 lg:px-10 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <GsapReveal>
            <span className="inline-flex items-center rounded-full border border-bone/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-bone/85">
              {heroLayers.kicker}
            </span>
          </GsapReveal>

          <WriteReveal
            as="h1"
            className="mt-6 block max-w-2xl font-sans text-4xl font-light leading-[1.12] text-bone sm:text-5xl lg:text-[3.4rem]"
          >
            {heroLayers.headline}
          </WriteReveal>

          <GsapReveal delay={0.18}>
            <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-bone/75">
              {heroLayers.blurb}
            </p>
          </GsapReveal>

          <GsapReveal delay={0.28} className="mt-12 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {AVATAR_INITIALS.map((initials, i) => (
                <span
                  key={initials}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink text-[11px] font-semibold text-bone ${AVATAR_BG[i % AVATAR_BG.length]}`}
                >
                  {initials}
                </span>
              ))}
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-bone/15 text-[11px] font-semibold text-bone backdrop-blur-sm">
                +{stats[0]?.value.replace('+', '') ?? '12'}
              </span>
            </div>
            <p className="max-w-[13rem] text-sm leading-snug text-bone/80">
              <span className="font-medium text-bone">{heroLayers.reviewText}</span>
            </p>
          </GsapReveal>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 flex justify-center lg:hidden">
        <CaretDown size={20} weight="light" className="animate-bounce text-bone/60" />
      </div>
    </section>
  )
}
