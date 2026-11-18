import { Route, Routes } from 'react-router-dom'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Grain } from './components/ui/Grain'
import { CustomCursor } from './components/ui/CustomCursor'
import { ScrollManager } from './components/ui/ScrollManager'
import { HomePage } from './pages/HomePage'
import { CabinPage } from './pages/CabinPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <div className="min-h-dvh bg-bone">
      <CustomCursor />
      <Grain />
      <ScrollManager />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cabanas/:id" element={<CabinPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
