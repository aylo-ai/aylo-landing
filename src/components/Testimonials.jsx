import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'

/*
 * ============================================================================
 * PLACEHOLDER COPY — MUST BE REPLACED BEFORE LAUNCH
 * ----------------------------------------------------------------------------
 * These are NOT real customer testimonials. Aylo AI has not launched and no
 * customer has said any of this. The text below is fictional layout filler,
 * written to be obviously fake so it cannot be mistaken for a genuine
 * endorsement if it ships by accident.
 *
 * Before launch, replace every entry with a REAL quote from a REAL customer,
 * with written permission to use their name, title, company and words. Do not
 * "polish" this filler into realistic-sounding names, logos or metrics — that
 * would be a fabricated endorsement, not a placeholder.
 *
 * Delete this comment only when all four entries are real and permissioned.
 * ============================================================================
 */
const testimonials = [
  {
    // Short quote — exercises the minimum card height.
    quote: 'Placeholder testimonial. Nobody has said this — a real quote belongs here.',
    name: 'Customer Name A',
    role: 'Job title, Company A (placeholder)',
    initial: 'A',
  },
  {
    // Medium quote.
    quote:
      'Example copy standing in for a customer story about setup and everyday use. Their own words, with their permission, go here before launch.',
    name: 'Customer Name B',
    role: 'Job title, Company B (placeholder)',
    initial: 'B',
  },
  {
    // Long quote — exercises the tallest card and the bottom-aligned byline.
    quote:
      'This is sample text, not an endorsement. Once a customer has agreed to be quoted, this space will carry their own account of what changed for their team, with any figures verified first.',
    name: 'Customer Name C',
    role: 'Job title, Company C (placeholder)',
    initial: 'C',
  },
  {
    // Medium-short quote.
    quote: 'Filler quote for layout only. Replace with a real, permissioned customer testimonial.',
    name: 'Customer Name D',
    role: 'Job title, Company D (placeholder)',
    initial: 'D',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#f7f7f8] py-28 text-ink">
      <div className="section-container">
        {/* TODO(pre-launch): "thousands of businesses" is an unsubstantiated claim for an
            unlaunched product. Marketing/legal should confirm or reword before launch. */}
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Join thousands of businesses growing with Aylo AI"
          tone="light"
        />

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px -15px rgba(255,92,26,0.25)' }}
              className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex gap-0.5 text-brand-500">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              {/* Quotes vary in length; the byline is pushed to the card bottom so
                  all four cards line up regardless of how tall the text runs. */}
              <p className="text-sm leading-relaxed text-ink/70">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3 pt-5">
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
