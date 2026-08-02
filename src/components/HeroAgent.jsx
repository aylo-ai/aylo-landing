import { motion, useSpring, useTransform } from 'framer-motion'

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

/**
 * A little AI agent that chases the cursor around the dashboard mockup.
 * `targetX`/`targetY` are motion values holding the cursor position in
 * pixels, relative to the top-left of the mockup card.
 */
export default function HeroAgent({ targetX, targetY, active }) {
  // The body lags behind the cursor, the glow lags further behind the body.
  const x = useSpring(targetX, { stiffness: 130, damping: 17, mass: 0.7 })
  const y = useSpring(targetY, { stiffness: 130, damping: 17, mass: 0.7 })
  const trailX = useSpring(targetX, { stiffness: 55, damping: 22, mass: 1.1 })
  const trailY = useSpring(targetY, { stiffness: 55, damping: 22, mass: 1.1 })

  // How far the agent still has to travel drives the eyes and the lean.
  const pupilX = useTransform([targetX, x], ([t, c]) => clamp((t - c) / 7, -3.5, 3.5))
  const pupilY = useTransform([targetY, y], ([t, c]) => clamp((t - c) / 7, -2.5, 2.5))
  const lean = useTransform([targetX, x], ([t, c]) => clamp((t - c) / 5, -16, 16))

  return (
    <>
      <motion.div
        style={{ x: trailX, y: trailY }}
        className="pointer-events-none absolute left-0 top-0 z-10"
      >
        <div className="-ml-8 -mt-8 h-16 w-16 rounded-full bg-brand-500/25 blur-2xl" />
      </motion.div>

      <motion.div style={{ x, y }} className="pointer-events-none absolute left-0 top-0 z-20">
        <motion.div
          style={{ rotate: lean }}
          animate={active ? { scale: 1, y: 0 } : { scale: 0.88, y: [0, -6, 0] }}
          transition={
            active
              ? { duration: 0.35, ease: 'easeOut' }
              : {
                  scale: { duration: 0.35 },
                  y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }
          }
          className="relative ml-3 mt-3 h-11 w-11"
        >
          <div className="absolute -top-2 left-1/2 h-2 w-px -translate-x-1/2 bg-white/40" />
          <motion.div
            animate={{ opacity: [1, 0.25, 1], scale: [1, 1.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-400"
          />

          <div className="relative h-11 w-11 rounded-[42%] bg-gradient-to-b from-white to-gray-300 shadow-lg shadow-black/50 ring-1 ring-black/5">
            <div className="absolute left-1/2 top-1/2 flex h-[22px] w-[34px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-[7px] bg-[#0d0d11]">
              {[0, 0.07].map((delay) => (
                <motion.span
                  key={delay}
                  style={{ x: pupilX, y: pupilY }}
                  animate={{ scaleY: [1, 0.12, 1] }}
                  transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.6, delay }}
                  className="h-[5px] w-[5px] rounded-full bg-sky-400 shadow-[0_0_6px_1px_rgba(56,189,248,0.8)]"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
