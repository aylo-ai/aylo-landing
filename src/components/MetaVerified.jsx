import { motion } from 'framer-motion'
import { CheckCircle2, Rocket } from 'lucide-react'
import Button from './ui/Button'

const points = ['Secure data sharing', 'According to the rules', 'Official Integration']

export default function MetaVerified() {
  return (
    <section id="meta-verified" className="relative overflow-hidden bg-[#0d0d11] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_100%_at_80%_50%,rgba(220,38,38,0.35),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_10%_20%,rgba(255,92,26,0.15),transparent_60%)]" />

      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/60"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
          }}
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="section-container relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl">Verified by Meta</h2>
          <p className="mt-4 max-w-lg text-white/60">
            Aylo AI is officially approved by Meta and provides reliable and secure integration
            with Facebook and Instagram platforms. This confirmation indicates that we maintain a
            high level of safety and compliance standards.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 size={16} className="text-brand-500" />
                {p}
              </li>
            ))}
          </ul>

          <Button href="#pricing" icon={Rocket} className="mt-8">
            Create a Agent
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: 'spring' }}
          className="relative mx-auto flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48"
        >
          <motion.div
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl"
          />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur sm:h-40 sm:w-40">
            <svg viewBox="0 0 36 24" className="h-14 w-20 sm:h-16 sm:w-24" fill="none">
              <path
                d="M6 12c0-4 3-8 6.5-8 3 0 4.5 2 5.5 4.5C19 5.5 20.5 4 23.5 4 27 4 30 8 30 12s-3 8-6.5 8c-3 0-4.5-2-5.5-4.5C17 18.5 15.5 20 12.5 20 9 20 6 16 6 12z"
                stroke="#2563eb"
                strokeWidth="2.4"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
