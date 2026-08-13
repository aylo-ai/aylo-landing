import { motion } from 'framer-motion'
import { Instagram, Send, Facebook, Globe, MessageCircle } from 'lucide-react'
import { useT } from '../i18n'

/*
  This band used to run Uzum, Click and PayMe marks under the line "100+
  companies already using Aylo AI". Those are three real Uzbek payment
  companies and none of them is a customer — a live public page naming real
  third parties as customers is a misrepresentation, not a placeholder, so the
  marks are gone.

  What replaced them is the one thing this band can say truthfully today: the
  channels the agent works on. That is already claimed in Integrations further
  down the page, and repeating it directly under the hero is ordinary landing
  page reinforcement rather than a new claim.

  When there ARE real, permissioned customer logos, this is where they belong —
  and only then does the social-proof framing come back.
*/
const CHANNELS = [
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'telegram', label: 'Telegram', icon: Send },
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'website', labelKey: 'integrations.website', icon: Globe },
  { key: 'messenger', label: 'Messenger', icon: MessageCircle },
]

export default function LogoMarquee() {
  const t = useT()
  // Doubled so the -50% translate loops seamlessly.
  const loop = [...CHANNELS, ...CHANNELS, ...CHANNELS, ...CHANNELS]

  return (
    <section className="relative border-y border-white/5 bg-ink py-10">
      <p className="mb-6 text-center text-sm text-white/40">{t('logos.label')}</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="flex w-max items-center gap-16"
        >
          {loop.map((channel, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap text-white/45 transition-colors hover:text-white/80"
            >
              <channel.icon size={20} className="text-brand-400" />
              <span className="text-lg font-semibold">
                {channel.label ?? t(channel.labelKey)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
