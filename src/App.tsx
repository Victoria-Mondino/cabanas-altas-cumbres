import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Grain } from './components/ui/Grain'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Cabanas } from './components/sections/Cabanas'
import { Gallery } from './components/sections/Gallery'
import { Location } from './components/sections/Location'
import { Activities } from './components/sections/Activities'
import { Testimonios } from './components/sections/Testimonios'
import { ReserveCTA } from './components/sections/ReserveCTA'
import { CustomCursor } from './components/ui/CustomCursor'

function App() {
  return (
    <div className="min-h-dvh bg-bone">
      <CustomCursor />
      <Grain />
      <Nav />
      <main>
        <Hero />
        <About />
        <Cabanas />
        <Gallery />
        <Location />
        <Activities />
        <Testimonios />
        <ReserveCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
