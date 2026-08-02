import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /*
    The logo used to be href="#", which jumps to the top without any scrolling
    and leaves a bare "#" in the URL. href="#top" is the documented fragment for
    "top of document" and keeps this working without JS; the handler takes over
    when JS is available so the scroll animates (html has scroll-behavior:
    smooth) and the URL is left clean.
  */
  const scrollToTop = (e) => {
    e.preventDefault()
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      {/*
        Every tap target below is padded out to >=44px and the padding is then
        cancelled with an equal negative margin, so the nav row is still 40px
        tall and the header keeps its 80px -> 64px scrolled transition.
      */}
      <nav className="section-container flex items-center justify-between">
        <a
          href="#top"
          onClick={scrollToTop}
          className="-my-3 py-3 text-lg font-extrabold tracking-tight"
        >
          Aylo A<span className="text-brand-500">I</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="-my-3.5 inline-block py-3.5 text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#contact"
            className="-my-3.5 py-3.5 text-sm text-white/70 transition-colors hover:text-white"
          >
            Sign in
          </a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href="#pricing"
            className="-my-0.5 flex min-h-[44px] items-center gap-1.5 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400"
          >
            <Sparkles size={14} />
            Get Started
          </motion.a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="-m-2.5 p-2.5 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-lg md:hidden"
          >
            <ul className="section-container flex flex-col gap-4 py-6">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="-my-2.5 block py-2.5 text-white/80"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#pricing"
                  onClick={() => setOpen(false)}
                  className="mt-1.5 -mb-0.5 inline-flex min-h-[44px] items-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
