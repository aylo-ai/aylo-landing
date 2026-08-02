import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'Repli AI boosted our sales by 40% in just two months. The automation is incredible and feels so natural.',
    name: 'Sarah Johnson',
    role: 'CEO, TechStyle',
    initial: 'S',
  },
  {
    quote: 'Finally, an AI that feels natural and helps us scale our customer support effortlessly.',
    name: 'Mike Chen',
    role: 'Founder, GrowthLab',
    initial: 'M',
  },
  {
    quote: 'Repli AI boosted our sales by 40% in just two months. The automation is incredible and feels so natural.',
    name: 'Sarah Johnson',
    role: 'CEO, TechStyle',
    initial: 'S',
  },
  {
    quote: 'Finally, an AI that feels natural and helps us scale our customer support effortlessly.',
    name: 'Mike Chen',
    role: 'Founder, GrowthLab',
    initial: 'M',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#f7f7f8] py-28 text-ink">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl">What Our Customers Say</h2>
          <p className="mt-3 text-ink/60">Join thousands of businesses growing with Repli AI</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px -15px rgba(255,92,26,0.25)' }}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex gap-0.5 text-brand-500">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-ink/70">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-ink/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
