import { motion } from 'framer-motion'
import { CircleDot, Zap, CreditCard } from 'lucide-react'

const brands = [
  { name: 'uzum', icon: CircleDot, color: 'text-violet-400' },
  { name: 'click', icon: Zap, color: 'text-sky-400' },
  { name: 'PayMe', icon: CreditCard, color: 'text-teal-400' },
  { name: 'uzum', icon: CircleDot, color: 'text-violet-400' },
  { name: 'click', icon: Zap, color: 'text-sky-400' },
  { name: 'PayMe', icon: CreditCard, color: 'text-teal-400' },
]

export default function LogoMarquee() {
  const loop = [...brands, ...brands]

  return (
    <section className="relative border-y border-white/5 bg-ink py-10">
      <p className="mb-6 text-center text-sm text-white/40">
        100+ Companies already using Aylo AI
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex w-max items-center gap-16"
        >
          {loop.map((brand, i) => (
            <div key={i} className="flex items-center gap-2 opacity-40 grayscale transition hover:opacity-80 hover:grayscale-0">
              <brand.icon size={20} className={brand.color} />
              <span className="text-lg font-bold">{brand.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
