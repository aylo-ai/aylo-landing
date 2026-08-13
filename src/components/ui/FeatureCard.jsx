import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/*
  White card on a dark section: gradient icon tile, title, description, and
  one text link. The card sets `text-ink` on itself — it sits on `bg-ink`, so
  leaving the color to be inherited would render the heading dark-on-dark.

  `index` only drives the stagger delay; pass the map index.
*/

export default function FeatureCard({ icon: Icon, title, desc, href, linkLabel, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white p-6 text-ink shadow-xl transition-shadow hover:shadow-2xl"
    >
      <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-700 transition-transform duration-300 group-hover:scale-x-100" />
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">{desc}</p>
      {/*
        `py-3.5` grows the tap target to 48px; `mt-0.5 / -mb-3.5` cancel that
        added padding back out of the layout so the card stays the same
        height it was before the target was enlarged.
      */}
      {href && (
        <a
          href={href}
          className="mt-0.5 -mb-3.5 inline-flex items-center gap-1 py-3.5 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2"
        >
          {linkLabel} <ArrowRight size={14} />
        </a>
      )}
    </motion.div>
  )
}
