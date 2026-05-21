import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Tours } from '@/components/sections/Tours'
import { QuoteSection } from '@/components/sections/QuoteSection'
import { Cities } from '@/components/sections/Cities'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Tours />
        <QuoteSection />
        <Cities />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
