import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    tagline: 'Ideal for small projects',
    price: 'Free',
    period: '',
    features: [
      'Unlimited personal files',
      'Email support',
      'CSV data export',
      'Basic analytics dashboard',
      '1,000 API calls per month',
    ],
    cta: 'Try for free',
    popular: false,
  },
  {
    name: 'Professional',
    tagline: 'For freelancers and startups',
    price: '$15',
    period: '/per user',
    features: [
      'All starter features +',
      'Up to 5 user accounts',
      'Team collaboration tools',
      'Custom dashboards',
      'Multiple data export formats',
      'Basic custom integrations',
    ],
    cta: 'Select plan',
    popular: true,
  },
  {
    name: 'Organization',
    tagline: 'For fast-growing businesses',
    price: '$30',
    period: '/per user',
    features: [
      'All professional features +',
      'Enterprise security suite',
      'Single Sign-On (SSO)',
      'Custom contract terms',
      'Dedicated phone support',
      'Custom integration support',
      'Compliance tools',
    ],
    cta: 'Select plan',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-28 text-ink">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-100 via-brand-50/60 to-transparent" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl">Regular, use-based pricing</h2>
          <p className="mt-3 text-ink/60">Start for free, then pay only for using</p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: plan.popular ? -10 : -6 }}
              className={`relative flex flex-col rounded-2xl border p-7 shadow-sm transition-shadow hover:shadow-2xl ${
                plan.popular
                  ? 'border-brand-500 bg-white shadow-xl shadow-brand-500/20 sm:scale-105'
                  : 'border-black/5 bg-white'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold text-white shadow-md">
                  MOST POPULAR PLAN
                </span>
              )}

              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className="mt-1 text-xs text-ink/50">{plan.tagline}</p>

              <div className="mt-5 flex items-end gap-1">
                <span className="text-3xl font-extrabold">{plan.price}</span>
                {plan.period && <span className="pb-1 text-sm text-ink/50">{plan.period}</span>}
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-ink/70">
                    <Check size={15} className="mt-0.5 shrink-0 text-brand-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className={`mt-7 rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-400'
                    : 'bg-ink text-white hover:bg-ink/80'
                }`}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
