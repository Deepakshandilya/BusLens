import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { RouteSearch } from '@/components/route-search'
import { MapSection } from '@/components/map-section'
import { Insights } from '@/components/insights'
import { Features } from '@/components/features'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <RouteSearch />
      <MapSection />
      <Insights />
      <Features />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}