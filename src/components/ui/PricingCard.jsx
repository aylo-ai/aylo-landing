import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Badge from './Badge'
import Button from './Button'

/*
  One pricing tier. `featured` is the single switch that makes a tier the
  recommended one: orange border, brand shadow, a slight scale-up from
  `sm:` upward, the "most popular" flag, a deeper hover lift, and an orange
  CTA instead of the near-black one.

  `index` only drives the stagger delay; pass the map index.
*/

export default function PricingCard({
  name,
  tagline,
  price,
  period,
  features = [],
  cta,
  ctaHref = '#contact',
  badgeLabel = 'MOST POPULAR PLAN',
  featured = false,
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: featured ? -10 : -6 }}
      className={`relative flex flex-col rounded-2xl border p-7 shadow-sm transition-shadow hover:shadow-2xl ${
        featured
          ? 'border-brand-500 bg-white shadow-xl shadow-brand-500/20 sm:scale-105'
          : 'border-black/5 bg-white'
      }`}
    >
      {featured && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">{badgeLabel}</Badge>}

      <h3 className="text-lg font-bold">{name}</h3>
      <p className="mt-1 text-xs text-ink/50">{tagline}</p>

      <div className="mt-5 flex items-end gap-1">
        <span className="text-3xl font-extrabold">{price}</span>
        {period && <span className="pb-1 text-sm text-ink/50">{period}</span>}
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {features.map((f, fi) => (
          <li key={fi} className="flex items-start gap-2 text-sm text-ink/70">
            <Check size={15} className="mt-0.5 shrink-0 text-brand-500" />
            {f}
          </li>
        ))}
      </ul>

      <Button
        href={ctaHref}
        variant={featured ? 'primary' : 'dark'}
        fullWidth
        hoverScale={1.03}
        tapScale={0.97}
        className="mt-7"
      >
        {cta}
      </Button>
    </motion.div>
  )
}
