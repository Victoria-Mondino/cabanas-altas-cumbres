import { useEffect, useRef } from 'react'
import { EnvelopeSimple, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { images } from '../../data/images'
import { contact, RESERVE_LABEL } from '../../data/content'
import { GsapReveal } from '../ui/GsapReveal'
import { WriteReveal } from '../ui/WriteReveal'
import { Button } from '../ui/Button'

gsap.registerPlugin(ScrollTrigger)

export function ReserveCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !sectionRef.current || !imgRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.08 },
        {
          scale: 1.22,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduce])

  return (
    <section id="reservas" ref={sectionRef} className="relative overflow-hidden bg-ink py-32 lg:py-40">
      <img
        ref={imgRef}
        src={images.sierraFire.src}
        alt={images.sierraFire.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        style={{ transform: 'scale(1.08)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
        <WriteReveal as="h2" className="block font-display text-5xl italic leading-[1.1] text-bone md:text-6xl">
          Tu próxima escapada <span className="text-gold">te espera</span>
        </WriteReveal>

        <GsapReveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-bone/80">
            Cupos limitados por temporada. Escribinos y coordinamos fechas, cabaña disponible y
            traslado desde Villa Carlos Paz si lo necesitás.
          </p>
        </GsapReveal>

        <GsapReveal delay={0.24} className="mt-9 flex justify-center">
          <Button href={contact.whatsapp}>{RESERVE_LABEL}</Button>
        </GsapReveal>

        <GsapReveal
          delay={0.32}
          className="mt-12 flex flex-col items-center justify-center gap-5 border-t border-bone/15 pt-8 text-sm text-bone/75 sm:flex-row sm:gap-9"
        >
          <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 transition-colors hover:text-gold">
            <Phone size={17} weight="light" />
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 transition-colors hover:text-gold">
            <EnvelopeSimple size={17} weight="light" />
            {contact.email}
          </a>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-gold">
            <WhatsappLogo size={17} weight="light" />
            WhatsApp
          </a>
        </GsapReveal>
      </div>
    </section>
  )
}
