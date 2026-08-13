import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Button from './ui/Button'

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
        <SectionHeading
          title="How It Works"
          subtitle="Get started in three simple steps"
          tone="light"
        />

        <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-y-14 sm:grid-cols-3">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ originX: 0 }}
            className="absolute left-[16.5%] right-[16.5%] top-6 hidden border-t-2 border-dashed border-brand-500/70 sm:block"
          />

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
          <Button href="#pricing" icon={Rocket}>
            Create a Agent
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
