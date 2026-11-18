import { useEffect } from 'react'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Cabanas } from '../components/sections/Cabanas'
import { Gallery } from '../components/sections/Gallery'
import { Location } from '../components/sections/Location'
import { Activities } from '../components/sections/Activities'
import { Testimonios } from '../components/sections/Testimonios'
import { ReserveCTA } from '../components/sections/ReserveCTA'

export function HomePage() {
  useEffect(() => {
    document.title = 'Cabañas Altas Cumbres'
  }, [])

  return (
    <>
      <Hero />
      <About />
      <Cabanas />
      <Gallery />
      <Location />
      <Activities />
      <Testimonios />
      <ReserveCTA />
    </>
  )
}
