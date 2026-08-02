import { motion } from 'framer-motion'
import { Zap, MessageSquare, Settings, Users, Globe2, BarChart3, ArrowRight } from 'lucide-react'

const features = [
  {
    title: 'Instant Replies',
    desc: 'Respond to customer queries in milliseconds, not minutes. Our AI processes and answers questions instantly.',
    icon: Zap,
  },
  {
    title: 'Natural Language',
    desc: 'Our AI understands context, jargon, and even emotion, ensuring a human-like interaction experience.',
    icon: MessageSquare,
  },
  {
    title: 'CRM Integration',
    desc: 'Seamlessly connects with your existing customer systems for an integrated help experience.',
    icon: Settings,
  },
  {
    title: 'Human Escalation',
    desc: 'Smart routing to human agents when needed, ensuring complex issues get the right attention.',
    icon: Users,
  },
  {
    title: 'Multilingual',
    desc: 'Engage with customers in over 100 languages, expanding your global support reach.',
    icon: Globe2,
  },
  {
    title: 'Analytics',
    desc: 'Get insights from every customer interaction through comprehensive reports and dashboards.',
    icon: BarChart3,
  },
]

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-ink py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,60,20,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl">Why Choose Aylo AI</h2>
          <p className="mt-3 text-white/60">
            Everything you need to automate customer engagement and boost sales
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white p-6 text-ink shadow-xl transition-shadow hover:shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-700 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <f.icon size={20} />
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{f.desc}</p>
              {/*
                There is no per-feature detail page in this project, so this used
                to be a `href="#"` that jumped to the top of the page. It now
                points at the "How It Works" section — the only place that
                expands on what the features actually do — and the label says so.
                `py-3.5` grows the tap target to 48px; `mt-0.5 / -mb-3.5`
                cancel the added padding out of the layout so the card is
                pixel-identical.
              */}
              <a
                href="#how-it-works"
                className="mt-0.5 -mb-3.5 inline-flex items-center gap-1 py-3.5 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2"
              >
                See how it works <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
