import { MotionConfig } from 'framer-motion'
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
    /*
      reducedMotion="user" defers to the OS "reduce motion" setting for every
      framer-motion animation on the page at once. When it is on, transform and
      layout animations are dropped — the marquee, the floating badges, the
      cursor-following agent, the 3D card tilt and the scroll-entrance slides all
      stop — while opacity fades still play, so content continues to appear
      rather than snapping in. Nothing becomes unreachable with motion off.
    */
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  )
}

export default App
