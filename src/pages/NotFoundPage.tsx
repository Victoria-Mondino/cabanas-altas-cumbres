import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="flex min-h-[70dvh] flex-col items-center justify-center bg-ink px-6 pb-20 pt-40 text-center text-bone">
      <h1 className="font-display text-5xl md:text-6xl">No encontramos esa página</h1>
      <p className="mt-4 max-w-md text-bone/70">
        Puede que la cabaña que buscás haya cambiado de dirección. Volvé al inicio y elegí otra.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-gold-soft"
      >
        Volver al inicio
      </Link>
    </section>
  )
}
