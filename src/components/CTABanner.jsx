import { motion } from 'framer-motion'
import { Rocket, Bot } from 'lucide-react'
import Button from './ui/Button'
import { useT } from '../i18n'

export default function CTABanner() {
  const t = useT()

  return (
    <section className="bg-white px-6 pb-24 text-ink lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-brand-600/40 bg-ink px-8 py-20 text-center text-white"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(255,60,20,0.35),transparent_70%)]" />
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/50"
            style={{ top: `${(i * 29) % 100}%`, left: `${(i * 43) % 100}%` }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.15 }}
          />
        ))}

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10"
        >
          <Bot size={26} className="text-brand-400" />
        </motion.div>

        <h2 className="relative text-3xl font-extrabold sm:text-4xl">{t('cta.title')}</h2>
        <p className="relative mx-auto mt-3 max-w-md text-white/60">{t('cta.subtitle')}</p>

        <Button
          href="#pricing"
          icon={Rocket}
          shadow="lg"
          className="relative mt-8"
        >
          {t('cta.button')}
        </Button>
      </motion.div>
    </section>
  )
}
