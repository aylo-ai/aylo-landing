import { motion } from 'framer-motion'
import { Rocket, PlayCircle, Sparkles } from 'lucide-react'
import DashboardMockup from './DashboardMockup'

export default function Hero() {
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70"
        >
          <Sparkles size={14} className="text-brand-400" />
          100+ companies already automating sales with Aylo AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          Build AI Agents That
          <br />
          <span className="text-gradient">Sell for You</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base text-white/60 sm:text-lg"
        >
          Aylo AI lets you create powerful AI agents to engage with your customers 24/7 on social
          media. Boost sales, automate conversations, and grow your business effortlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href="#pricing"
            className="flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400"
          >
            <Rocket size={16} />
            Create a Agent
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href="#how-it-works"
            className="flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/5"
          >
            <PlayCircle size={16} />
            See How it Works
          </motion.a>
        </motion.div>

        <DashboardMockup />
      </div>
    </section>
  )
}
