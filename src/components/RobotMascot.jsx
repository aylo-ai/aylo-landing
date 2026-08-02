import { motion } from 'framer-motion'

export default function RobotMascot() {
  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center">
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <motion.div
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-8 top-10 h-14 w-4 origin-top rounded-full bg-white shadow-md"
        />
        <motion.div
          animate={{ rotate: [8, -8, 8] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-8 top-10 h-14 w-4 origin-top rounded-full bg-white shadow-md"
        />

        <div className="relative h-32 w-32 rounded-[45%] bg-gradient-to-b from-white to-gray-200 shadow-xl">
          <div className="absolute left-1/2 top-1/2 flex h-16 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-ink">
            <div className="flex gap-3">
              <motion.span
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5 }}
                className="h-3 w-3 rounded-full bg-sky-400"
              />
              <motion.span
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, delay: 0.1 }}
                className="h-3 w-3 rounded-full bg-sky-400"
              />
            </div>
          </div>
          <div className="absolute -top-3 left-1/2 h-4 w-1 -translate-x-1/2 rounded-full bg-gray-300" />
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-500"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="absolute bottom-8 left-4 rounded-2xl rounded-bl-none bg-brand-500 px-4 py-2 text-xs font-medium text-white shadow-lg sm:left-8"
      >
        Hello. How can I help you?
      </motion.div>
    </div>
  )
}
