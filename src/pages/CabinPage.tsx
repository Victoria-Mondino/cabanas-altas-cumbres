import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  Check,
  Drop,
  EnvelopeSimple,
  MagnifyingGlassPlus,
  Phone,
  Ruler,
  Users,
  WhatsappLogo,
} from '@phosphor-icons/react'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cabins, contact, getCabin, RESERVE_LABEL, stayInfo } from '../data/content'
import { GsapReveal, GsapRevealGroup } from '../components/ui/GsapReveal'
import { WriteReveal } from '../components/ui/WriteReveal'
import { Button } from '../components/ui/Button'
import { SectionLink } from '../components/ui/SectionLink'
import { iconFor } from '../components/ui/icons'
import { Lightbox } from '../components/sections/Lightbox'
import { NotFoundPage } from './NotFoundPage'

gsap.registerPlugin(ScrollTrigger)

/** Posiciones del mosaico de 6 fotos (desktop, grilla de 6 columnas). */
const GALLERY_SPANS = [
  'col-span-2 row-span-2 md:col-span-4',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-2',
]

export function CabinPage() {
  const { id } = useParams()
  const cabin = getCabin(id)

  if (!cabin) return <NotFoundPage />
  return <CabinDetail key={cabin.id} cabin={cabin} />
}

function CabinDetail({ cabin }: { cabin: NonNullable<ReturnType<typeof getCabin>> }) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const heroImgRef = useRef<HTMLImageElement>(null)
  const reduce = useReducedMotion()
  const others = cabins.filter((c) => c.id !== cabin.id)
  const whatsappHref = `${contact.whatsapp}?text=${encodeURIComponent(`Hola! Quiero reservar la ${cabin.name}.`)}`

  useEffect(() => {
    document.title = `${cabin.name} | Cabañas Altas Cumbres`
  }, [cabin.name])

  useEffect(() => {
    if (reduce || !heroRef.current || !heroImgRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImgRef.current,
        { scale: 1.02, yPercent: 0 },
        {
          scale: 1.18,
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
        },
      )
    }, heroRef)
    return () => ctx.revert()
  }, [reduce])

  const facts = [
    { Icon: Users, value: String(cabin.guests), label: cabin.guests === 1 ? 'huésped' : 'huéspedes' },
    { Icon: Bed, value: String(cabin.bedrooms), label: cabin.bedrooms === 1 ? 'dormitorio' : 'dormitorios' },
    { Icon: Drop, value: String(cabin.bathrooms), label: cabin.bathrooms === 1 ? 'baño' : 'baños' },
    { Icon: Ruler, value: `${cabin.area} m²`, label: 'cubiertos' },
  ]

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-[560px] items-end overflow-hidden bg-ink h-[88dvh]">
        <img
          ref={heroImgRef}
          src={cabin.image.full}
          alt={cabin.image.alt}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />

        <div className="relative z-10 w-full px-6 pb-14 pt-40 lg:px-10 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <GsapReveal>
              <SectionLink
                href="#cabanas"
                data-cursor="link"
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-bone/80 transition-colors hover:text-gold"
              >
                <ArrowLeft size={14} />
                Todas las cabañas
              </SectionLink>
            </GsapReveal>

            <GsapReveal delay={0.08}>
              <p className="mt-8 inline-flex items-center rounded-full border border-bone/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-bone/85">
                {cabin.capacity}
              </p>
            </GsapReveal>

            <GsapReveal delay={0.14}>
              <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.05] text-bone md:text-6xl lg:text-7xl">
                {cabin.name}
              </h1>
            </GsapReveal>

            <GsapReveal delay={0.22}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-bone/80 md:text-lg">{cabin.tagline}</p>
            </GsapReveal>

            <GsapReveal delay={0.3} className="mt-9 flex flex-wrap items-center gap-4">
              <Button href={whatsappHref}>{RESERVE_LABEL}</Button>
              <Button href="#galeria-cabana" variant="outline">
                Ver las fotos
              </Button>
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* Datos rápidos */}
      <section className="border-b border-ink/10 bg-bone">
        <GsapRevealGroup
          stagger={0.08}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-ink/10 px-0 md:grid-cols-4"
        >
          {facts.map(({ Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4 bg-bone px-6 py-7 lg:px-10">
              <Icon size={26} weight="light" className="shrink-0 text-gold" />
              <div>
                <p className="font-display text-3xl leading-none text-ink">{value}</p>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">{label}</p>
              </div>
            </div>
          ))}
        </GsapRevealGroup>
      </section>

      {/* Historia + puntos fuertes */}
      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:px-10">
          <div>
            <WriteReveal as="h2" className="block max-w-lg font-display text-4xl leading-[1.1] text-ink md:text-5xl">
              Así es la <span className="text-gold">{cabin.name.replace('Cabaña ', '')}</span>
            </WriteReveal>
            <div className="mt-8 flex flex-col gap-5">
              {cabin.story.map((p) => (
                <GsapReveal key={p}>
                  <p className="max-w-xl text-[15px] leading-relaxed text-ink/70 md:text-base">{p}</p>
                </GsapReveal>
              ))}
            </div>
          </div>

          <GsapReveal delay={0.1}>
            <div className="rounded-[1.75rem] border border-ink/10 bg-pine p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">Lo mejor de esta cabaña</p>
              <ul className="mt-6 flex flex-col gap-4">
                {cabin.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[15px] text-ink">
                    <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-gold" />
                    {h}
                  </li>
                ))}
              </ul>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-ink/10 pt-6">
                {stayInfo.map((s) => (
                  <div key={s.label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/50">{s.label}</dt>
                    <dd className="mt-1 text-sm text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria-cabana" className="bg-pine py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <GsapReveal className="mx-auto max-w-xl text-center">
            <WriteReveal as="h2" className="block font-display text-4xl leading-[1.1] text-ink md:text-5xl">
              Conocé la cabaña por dentro y por fuera
            </WriteReveal>
            <span className="mx-auto mt-5 block h-px w-16 bg-ink/25" aria-hidden="true" />
          </GsapReveal>

          <GsapRevealGroup
            stagger={0.08}
            className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-6 md:gap-4"
          >
            {cabin.gallery.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setLightbox(i)}
                data-cursor="view"
                data-cursor-label="Ver"
                aria-label={`Ampliar foto: ${img.alt}`}
                className={`group relative overflow-hidden rounded-2xl border border-ink/10 ${GALLERY_SPANS[i] ?? 'md:col-span-2'}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/25 group-hover:opacity-100">
                  <MagnifyingGlassPlus size={28} className="text-bone" weight="light" />
                </span>
              </button>
            ))}
          </GsapRevealGroup>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <GsapReveal className="max-w-xl">
            <WriteReveal as="h2" className="block font-display text-4xl leading-[1.1] text-ink md:text-5xl">
              Qué incluye
            </WriteReveal>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/60">
              Todo lo que tiene la {cabin.name} para que solo tengas que llegar.
            </p>
          </GsapReveal>

          <GsapRevealGroup
            stagger={0.06}
            className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {cabin.amenities.map((a) => {
              const Icon = iconFor(a.icon)
              return (
                <div key={a.label} className="flex items-start gap-4 bg-bone px-6 py-7">
                  <Icon size={26} weight="light" className="mt-0.5 shrink-0 text-gold" />
                  <p className="text-[15px] leading-snug text-ink">{a.label}</p>
                </div>
              )
            })}
          </GsapRevealGroup>
        </div>
      </section>

      {/* Reservar */}
      <section id="reservas" className="relative overflow-hidden bg-ink py-28 lg:py-36">
        <img
          src={cabin.gallery[1]?.full ?? cabin.image.full}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/50" />

        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <WriteReveal as="h2" className="block font-display text-4xl leading-[1.1] text-bone md:text-6xl">
            Reservá la <span className="text-gold">{cabin.name.replace('Cabaña ', '')}</span>
          </WriteReveal>

          <GsapReveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-bone/80">
              Escribinos con tus fechas y te confirmamos la disponibilidad de la {cabin.name} en el día.
            </p>
          </GsapReveal>

          <GsapReveal delay={0.2} className="mt-9 flex justify-center">
            <Button href={whatsappHref}>{RESERVE_LABEL}</Button>
          </GsapReveal>

          <GsapReveal
            delay={0.28}
            className="mt-12 flex flex-col items-center justify-center gap-5 border-t border-bone/15 pt-8 text-sm text-bone/75 sm:flex-row sm:gap-9"
          >
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 transition-colors hover:text-gold"
            >
              <Phone size={17} weight="light" />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 transition-colors hover:text-gold">
              <EnvelopeSimple size={17} weight="light" />
              {contact.email}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-gold"
            >
              <WhatsappLogo size={17} weight="light" />
              WhatsApp
            </a>
          </GsapReveal>
        </div>
      </section>

      {/* Otras cabañas */}
      <section className="bg-pine py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <GsapReveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <WriteReveal as="h2" className="block font-display text-4xl leading-[1.1] text-ink md:text-5xl">
              Mirá las otras cabañas
            </WriteReveal>
            <SectionLink
              href="#cabanas"
              data-cursor="link"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-gold"
            >
              Ver todas
              <ArrowRight size={14} />
            </SectionLink>
          </GsapReveal>

          <GsapRevealGroup stagger={0.1} className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {others.map((c) => (
              <Link key={c.id} to={`/cabanas/${c.id}`} data-cursor="view" data-cursor-label="Ver" className="group block">
                <div className="overflow-hidden rounded-[1.5rem] border border-ink/10">
                  <img
                    src={c.image.src}
                    alt={c.image.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">{c.capacity}</p>
                <p className="mt-1 font-display text-2xl text-ink">{c.name}</p>
                <p className="mt-1 text-sm text-ink/60">{c.tagline}</p>
              </Link>
            ))}
          </GsapRevealGroup>
        </div>
      </section>

      <Lightbox images={cabin.gallery} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
    </>
  )
}
