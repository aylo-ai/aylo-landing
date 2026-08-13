import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useT } from '../i18n'

export default function FAQ() {
  const t = useT()
  const faqs = t('faq.items')
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
          {t('faq.title')}
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
