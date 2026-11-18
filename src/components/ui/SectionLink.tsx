import type { ComponentPropsWithoutRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

type SectionLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { href: string }

/**
 * Link a una sección de la home (`#cabanas`, `#reservas`...). En la home usa
 * un ancla normal; en cualquier otra página navega a `/` con ese hash.
 */
export function SectionLink({ href, ...rest }: SectionLinkProps) {
  const { pathname } = useLocation()
  if (pathname === '/') return <a href={href} {...rest} />
  return <Link to={{ pathname: '/', hash: href }} {...rest} />
}
