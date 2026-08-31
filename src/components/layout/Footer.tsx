import { InstagramLogo } from '@phosphor-icons/react'
import { Logo } from './Logo'
import { nav, contact, location } from '../../data/content'

export function Footer() {
  return (
    <footer className="bg-pine-deep pb-8 pt-20 text-ink/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Logo dark />
              <span className="font-display text-xl italic text-ink">Altas Cumbres</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
              Cabañas de montaña sobre el Camino de las Altas Cumbres, en las Sierras de Córdoba.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/45">Recorrer</p>
            <ul className="mt-4 flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm transition-colors hover:text-gold">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/45">Contacto</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>{location.address}</li>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-gold">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-gold">
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <InstagramLogo size={16} weight="light" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Cabañas Altas Cumbres. Todos los derechos reservados.</span>
          <span>Fotografías y testimonios de referencia, a reemplazar por material propio.</span>
        </div>
      </div>
    </footer>
  )
}
