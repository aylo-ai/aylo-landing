import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Bot, Send, Instagram, Zap, Palette, Play, MessageCircle } from 'lucide-react'
import HeroAgent from './HeroAgent'

const agentCards = [
  {
    title: 'Create a chatbot for',
    subtitle: 'customer support questions',
    icon: Bot,
    from: 'from-brand-500',
    to: 'to-brand-700',
  },
  {
    title: 'Automate your Telegram',
    subtitle: 'auto-reply to every message',
    icon: Send,
    from: 'from-indigo-500',
    to: 'to-violet-700',
  },
  {
    title: 'Improve your Instagram',
    subtitle: 'reply to DMs & comments',
    icon: Instagram,
    from: 'from-fuchsia-500',
    to: 'to-pink-700',
  },
  {
    title: 'Help with anything',
    subtitle: 'ask your agent for help',
    icon: MessageCircle,
    from: 'from-emerald-500',
    to: 'to-teal-700',
  },
]

export default function DashboardMockup() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 })

  // Cursor position inside the card, in px — drives the roaming agent.
  const agentX = useMotionValue(0)
  const agentY = useMotionValue(0)
  const [agentActive, setAgentActive] = useState(false)

  // Where the agent idles when the cursor is elsewhere.
  const parkAgent = () => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    agentX.set(rect.width - 78)
    agentY.set(rect.height - 78)
  }

  useEffect(parkAgent, [])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
    agentX.set(e.clientX - rect.left)
    agentY.set(e.clientY - rect.top)
    if (!agentActive) setAgentActive(true)
  }

  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
    setAgentActive(false)
    parkAgent()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      style={{ perspective: 1600 }}
      className="relative mx-auto mt-16 w-full max-w-4xl"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative rounded-2xl border border-white/10 bg-[#131217] p-2 shadow-2xl shadow-brand-900/40 ring-1 ring-white/5"
      >
        <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-brand-500/40 via-fuchsia-500/20 to-indigo-500/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        <HeroAgent targetX={agentX} targetY={agentY} active={agentActive} />

        <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          <span className="ml-4 text-xs text-white/40">app.aylo.ai/agent/john</span>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[160px_1fr] sm:p-6">
          <div className="hidden flex-col gap-3 sm:flex">
            <div className="text-sm font-bold">
              Aylo A<span className="text-brand-500">I</span>
            </div>
            <div className="mt-2 flex flex-col gap-1 text-xs text-white/40">
              {['Home', 'Agents', 'Knowledge', 'Training', 'Configuration'].map((item, i) => (
                <div
                  key={item}
                  className={`rounded-lg px-3 py-2 ${
                    i === 1 ? 'bg-brand-500/15 text-brand-400' : 'hover:bg-white/5'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-auto rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-3 text-[11px]">
              <p className="font-semibold">Upgrade your plan</p>
              <p className="mt-1 text-white/70">Unlock unlimited agents</p>
              <button className="mt-2 w-full rounded-md bg-white/15 py-1.5 font-semibold">
                Upgrade
              </button>
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">John Agent</p>
                <p className="text-xs text-white/40">Sales manager on Aylo AI</p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/50">
                  Subscription balance
                </span>
                <span className="rounded-full bg-brand-500 px-3 py-1.5 text-[11px] font-semibold">
                  Buy Subscription
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {agentCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`relative flex h-24 flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br ${card.from} ${card.to} p-3 text-[11px] font-medium shadow-lg`}
                >
                  <p className="pr-4 leading-tight">
                    {card.title}
                    <span className="block text-white/70">{card.subtitle}</span>
                  </p>
                  <card.icon size={16} className="opacity-80" />
                </motion.div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px]">
              <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-white/[0.04]">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg"
                >
                  <Play size={16} fill="currentColor" />
                </motion.div>
                <span className="absolute bottom-2 left-2 text-[11px] text-white/50">
                  How to use Aylo.uz?
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/[0.04] p-2 text-[10px] text-white/60">
                  <Zap size={14} className="text-brand-400" />
                  Add keywords
                </div>
                <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/[0.04] p-2 text-[10px] text-white/60">
                  <Palette size={14} className="text-fuchsia-400" />
                  Customize widget
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-6 -top-8 hidden rounded-xl border border-white/10 bg-panel/90 px-4 py-3 text-xs shadow-xl backdrop-blur sm:block"
      >
        <p className="font-semibold text-emerald-400">+40% Sales</p>
        <p className="text-white/40">this month</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-6 -left-6 hidden items-center gap-2 rounded-xl border border-white/10 bg-panel/90 px-4 py-3 text-xs shadow-xl backdrop-blur sm:flex"
      >
        <Bot size={16} className="text-brand-400" />
        Agent replied in 0.4s
      </motion.div>
    </motion.div>
  )
}
