import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'How to use Repli?',
    a: 'Sign up for a free account, connect your social media channels, and use our no-code builder to design your AI agent. Once configured, launch it and it will start engaging with your customers automatically across every connected channel.',
  },
  {
    q: 'How to change subscription?',
    a: 'Head to your account settings and open the Billing tab. From there you can upgrade, downgrade, or switch your plan at any time — changes apply immediately and billing is prorated.',
  },
  {
    q: 'How to cancel Subscription?',
    a: 'Go to Billing in your dashboard and select "Cancel Subscription". Your plan will remain active until the end of the current billing cycle, with no further charges after that.',
  },
  {
    q: 'How to create Project?',
    a: 'From your dashboard, click "New Project", give it a name, and choose a template or start from scratch. You can then attach agents, data sources, and integrations to that project.',
  },
  {
    q: 'Can I create private Dataset?',
    a: 'Yes. Every workspace supports private datasets that are only accessible to your team. You can upload CSVs, connect a database, or sync from your CRM securely.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="bg-[#f7f7f8] py-28 text-ink">
      <div className="section-container max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-3xl font-extrabold sm:text-4xl"
        >
          FAQs
        </motion.h2>

        <div className="flex flex-col gap-4">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? 'border-brand-500/40 bg-white' : 'border-black/5 bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold">{item.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen ? 'border-brand-500 bg-brand-500 text-white' : 'border-black/10 text-ink/60'
                    }`}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ink/60">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
