import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoMarquee from './components/LogoMarquee'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import MetaVerified from './components/MetaVerified'
import Integrations from './components/Integrations'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative overflow-x-hidden bg-ink">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <Features />
      <HowItWorks />
      <Testimonials />
      <MetaVerified />
      <Integrations />
      <Pricing />
      <FAQ />
      <Contact />
      <CTABanner />
      <Footer />
    </div>
  )
}

export default App
