import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutPanels } from '../../data/content'
import { GsapReveal } from '../ui/GsapReveal'
import { WriteReveal } from '../ui/WriteReveal'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRefs = useRef<(HTMLElement | null)[]>([])
  const reduce = useReducedMotion()
  const count = aboutPanels.length

  useEffect(() => {
    if (reduce || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[]
      const titles = titleRefs.current

      panels.forEach((panel, i) => {
        if (i === 0) return
        gsap.set(panel, { yPercent: 100 })
      })
      titles.forEach((title, i) => {
        if (!title) return
        gsap.set(title, { clipPath: i === 0 ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' })
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * (count - 1)}`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress * (count - 1)
          panels.forEach((panel, i) => {
            if (i === 0) return
            const local = gsap.utils.clamp(0, 1, progress - (i - 1))
            gsap.set(panel, { yPercent: 100 - local * 100 })
            const title = titles[i]
            if (title) {
              const reveal = gsap.utils.clamp(0, 1, (local - 0.15) / 0.7)
              gsap.set(title, { clipPath: `inset(0 ${100 - reveal * 100}% 0 0)` })
            }
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduce, count])

  if (reduce) {
    return (
      <section id="sobre" className="bg-bone py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <GsapReveal className="mx-auto max-w-xl text-center">
            <span className="inline-flex items-center rounded-full border border-ink/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70">
              Sobre el lugar
            </span>
            <WriteReveal as="h2" className="mt-5 block font-display text-4xl italic leading-[1.1] text-ink md:text-5xl">
              Piedra, madera y silencio.
            </WriteReveal>
            <span className="mx-auto mt-5 block h-px w-16 bg-ink/25" aria-hidden="true" />
          </GsapReveal>

          <div className="mt-12 flex flex-col gap-6">
            {aboutPanels.map((panel) => (
              <div key={panel.id} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:aspect-[16/9]">
                <img src={panel.image.src} alt={panel.image.alt} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{panel.kicker}</p>
                  <p className="mt-1 font-display text-3xl italic leading-none text-bone">{panel.title}</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/75">{panel.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="sobre" ref={sectionRef} className="relative h-screen overflow-hidden bg-ink">
      {aboutPanels.map((panel, i) => (
        <div
          key={panel.id}
          ref={(el) => {
            panelRefs.current[i] = el
          }}
          className="absolute inset-0 will-change-transform"
        >
          <img src={panel.image.src} alt={panel.image.alt} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />

          {i === 0 && (
            <div className="absolute inset-x-0 top-0 px-6 pt-40 text-center lg:pt-44">
              <span className="inline-flex items-center rounded-full border border-bone/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-bone/85">
                Sobre el lugar
              </span>
              <p className="mx-auto mt-5 max-w-xl font-display text-4xl italic leading-[1.1] text-bone md:text-5xl">
                Piedra, madera y silencio.
              </p>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 px-6 pb-16 lg:px-10 lg:pb-20">
            <div className="mx-auto max-w-7xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                {panel.index} — {panel.kicker}
              </p>
              <p
                ref={(el) => {
                  titleRefs.current[i] = el
                }}
                className="mt-2 block max-w-lg font-display text-4xl italic leading-[1.05] text-bone md:text-5xl"
              >
                {panel.title}
              </p>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-bone/75">{panel.text}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
