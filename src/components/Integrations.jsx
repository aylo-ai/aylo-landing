import { motion } from 'framer-motion'
import { Instagram, Facebook, Globe, Send } from 'lucide-react'

const channels = [
  { name: 'Instagram', icon: Instagram, color: 'from-fuchsia-500 to-pink-600' },
  { name: 'Facebook', icon: Facebook, color: 'from-blue-500 to-blue-700' },
  { name: 'Website', icon: Globe, color: 'from-brand-500 to-brand-700' },
  { name: 'Telegram', icon: Send, color: 'from-sky-400 to-sky-600' },
]

export default function Integrations() {
  return (
    <section className="bg-white py-24 text-ink">
      <div className="section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl">Seamless Social Media Connections</h2>
          <p className="mt-3 text-ink/60">Repli AI integrates with the platforms your customers already use</p>
        </motion.div>

        <div className="mt-14 flex flex-wrap justify-center gap-10 sm:gap-16">
          {channels.map((c, i) => (
            <motion.div
              key={c.name}
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
              <span className="text-sm font-medium text-ink/60">{c.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
