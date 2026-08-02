import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

const steps = [
  {
    n: 1,
    title: 'Sign Up & Connect',
    desc: 'Sign up and connect your social media accounts in seconds.',
  },
  {
    n: 2,
    title: 'Create Your AI Agent',
    desc: 'Build your AI agent with no coding required using our smart templates.',
  },
  {
    n: 3,
    title: 'Launch & Engage',
    desc: 'Launch your agent and start chatting with customers automatically.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-28 text-ink">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl">How It Works</h2>
          <p className="mt-3 text-ink/60">Get started in three simple steps</p>
        </motion.div>

        <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-y-14 sm:grid-cols-3">
          <div className="absolute left-[16.5%] right-[16.5%] top-6 hidden h-px sm:block">
            <svg width="100%" height="2" className="overflow-visible">
              <motion.line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="#ff5c1a"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-lg font-bold text-white shadow-lg shadow-brand-500/40"
              >
                {step.n}
              </motion.div>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-2 max-w-[220px] text-sm text-ink/60">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex justify-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href="#pricing"
            className="flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400"
          >
            <Rocket size={16} />
            Create a Agent
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
