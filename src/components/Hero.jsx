import { motion } from 'framer-motion'
import { Rocket, PlayCircle, Sparkles } from 'lucide-react'
import DashboardMockup from './DashboardMockup'
import Button from './ui/Button'
import Badge from './ui/Badge'
import { useT } from '../i18n'

export default function Hero() {
  const t = useT()

  return (
    <section
      className="relative overflow-hidden pb-24 pt-0"
      style={{ marginTop: 'clamp(-310px, -42vw, -180px)' }}
    >
      {/*
        The negative margin-top above pulls this section up so the
        badge+headline start inside NeonFaceHero's fade zone (now the
        bottom 60% of the phone, masked to transparent past 40%) instead of
        leaving dead space below the phone. Sized off the same
        clamp(200px, 46vw, 340px) width NeonFaceHero uses for the phone:
        phone height ≈ width * 18.5/9, and this overlaps ~45% of that
        height, landing within/just below the fade rather than on its
        still-opaque top. If NeonFaceHero's phone width formula or fade
        start (currently 40%) changes, update this to match.
      */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 bg-radial-fade" />

      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-brand-600/30 blur-[100px]"
      />
      <motion.div
        animate={{ opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="pointer-events-none absolute -right-32 top-24 h-80 w-80 rounded-full bg-indigo-600/20 blur-[100px]"
      />

      <div className="section-container relative text-center">
        <Badge
          tone="outline"
          icon={Sparkles}
          iconClassName="text-brand-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          {t('hero.badge')}
        </Badge>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          {t('hero.titleLead')}
          <br />
          <span className="text-gradient">{t('hero.titleAccent')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base text-white/60 sm:text-lg"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="#pricing" icon={Rocket}>
            {t('hero.ctaPrimary')}
          </Button>
          <Button href="#how-it-works" icon={PlayCircle} variant="secondary">
            {t('hero.ctaSecondary')}
          </Button>
        </motion.div>

        {/*
          Free-tier reassurance, directly under the CTAs where the visitor
          hesitates. The allowance named here must match the Free tier in
          `pricing.plans[0].allowance` — if the free allowance changes, change
          both. Opacity-led entrance so it is still readable with reduced
          motion (the y offset drops out, the fade does not).
        */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-5 text-xs text-white/45 sm:text-sm"
        >
          {t('hero.freeNote')}
        </motion.p>

        <DashboardMockup />
      </div>
    </section>
  )
}
