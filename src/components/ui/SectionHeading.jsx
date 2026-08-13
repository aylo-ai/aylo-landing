import { motion } from 'framer-motion'

/*
  The centered heading block that opens most sections: an `h2` plus one
  supporting line, fading up once on scroll.

  `tone` picks the muted subtitle color for the section's background — the
  page alternates dark and white, so this cannot be inferred. `className`
  *replaces* the wrapper classes rather than appending to them, because a
  couple of call sites (Integrations) inherit centering from a parent and
  must not carry `max-w-2xl`.
*/

export default function SectionHeading({
  title,
  subtitle,
  tone = 'dark',
  className = 'mx-auto mb-16 max-w-2xl text-center',
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className={`mt-3 ${tone === 'dark' ? 'text-white/60' : 'text-ink/60'}`}>{subtitle}</p>
      )}
      {children}
    </motion.div>
  )
}
