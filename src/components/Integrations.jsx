import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { useT } from '../i18n'
import { Instagram, Facebook, Globe, Send } from 'lucide-react'

/*
  Instagram, Facebook and Telegram are product names and are never
  translated. Only "Website" is a common noun, so it carries a `labelKey`
  instead of a literal name.
*/
const channels = [
  { name: 'Instagram', icon: Instagram, color: 'from-fuchsia-500 to-pink-600' },
  { name: 'Facebook', icon: Facebook, color: 'from-blue-500 to-blue-700' },
  { labelKey: 'integrations.website', icon: Globe, color: 'from-brand-500 to-brand-700' },
  { name: 'Telegram', icon: Send, color: 'from-sky-400 to-sky-600' },
]

export default function Integrations() {
  const t = useT()

  return (
    <section className="bg-white py-24 text-ink">
      <div className="section-container text-center">
        {/* className="" — this section centers from the parent's `text-center`
            and lets the heading run full width, so no wrapper classes. */}
        <SectionHeading
          title={t('integrations.title')}
          subtitle={t('integrations.subtitle')}
          tone="light"
          className=""
        />

        <div className="mt-14 flex flex-wrap justify-center gap-10 sm:gap-16">
          {channels.map((c, i) => {
            const label = c.name ?? t(c.labelKey)
            return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-lg`}
              >
                <c.icon size={24} />
              </div>
              <span className="text-sm font-medium text-ink/60">{label}</span>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
