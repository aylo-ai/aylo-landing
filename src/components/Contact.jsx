import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react'
import RobotMascot from './RobotMascot'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="bg-white py-28 text-ink">
      <div className="section-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl">Let&apos;s Talk</h2>
          <p className="mt-3 max-w-sm text-ink/60">
            Ready to transform your customer engagement? Get in touch with us.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <input
              required
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border border-black/10 bg-[#f7f7f8] px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
            <input
              required
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-xl border border-black/10 bg-[#f7f7f8] px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
            <textarea
              required
              rows={4}
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="resize-none rounded-xl border border-black/10 bg-[#f7f7f8] px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400"
            >
              {sent ? (
                <>
                  <CheckCircle2 size={16} /> Message Sent
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl bg-[#f7f7f8] p-6"
        >
          <RobotMascot />
        </motion.div>
      </div>
    </section>
  )
}
