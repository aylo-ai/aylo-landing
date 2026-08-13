import { motion } from 'framer-motion'
import { ShoppingBag, UtensilsCrossed, Stethoscope, GraduationCap, Building2, Truck } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { useT } from '../i18n'

/*
  Who this is for, by industry. Competitors in this market (Zukko, and the
  Tashkent bot-development agencies) all carry an industries section, and it
  does real work: a visitor who cannot place their own business in the product
  leaves, however good the feature list is.

  Each card describes what the agent would handle for that industry — a
  capability framing, not a results claim. No customer counts, no percentages,
  nothing that would need substantiating.

  Icons are positional against `useCases.items[i]` in every locale, same
  convention as FEATURE_ICONS.
*/
const USE_CASE_ICONS = [
  ShoppingBag,
  UtensilsCrossed,
  Stethoscope,
  GraduationCap,
  Building2,
  Truck,
]

export default function UseCases() {
  const t = useT()

  return (
    <section id="use-cases" className="relative overflow-hidden bg-ink py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_40%,transparent_100%)]" />

      <div className="section-container relative">
        <SectionHeading title={t('useCases.title')} subtitle={t('useCases.subtitle')} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t('useCases.items').map((item, i) => {
            const Icon = USE_CASE_ICONS[i]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-brand-500/40 hover:bg-white/[0.06]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-400 transition-colors group-hover:border-brand-500/40 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
