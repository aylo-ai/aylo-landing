import { motion } from 'framer-motion'

/*
  Small pill label. `whitespace-nowrap` is baked in deliberately — these are
  routinely absolutely positioned (the "most popular" flag on the pricing
  card), and an absolutely-positioned pill that wraps to two lines is a bug
  this page has hit before.

  Rendered as a `motion.span` so call sites can pass entrance animation
  props straight through. `inline-flex` makes it inline-level, so it centers
  from a parent's `text-center`, not from `mx-auto`.
*/

const TONES = {
  // Solid orange flag — draws the eye to a featured item.
  brand: 'bg-brand-500 px-4 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md',
  // Quiet glass chip for an eyebrow above a headline. Dark sections only.
  outline: 'border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70',
}

export default function Badge({
  children,
  icon: Icon,
  iconSize = 14,
  iconClassName = '',
  tone = 'brand',
  className = '',
  ...rest
}) {
  return (
    <motion.span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full ${TONES[tone]} ${className}`}
      {...rest}
    >
      {Icon && <Icon size={iconSize} className={iconClassName} />}
      {children}
    </motion.span>
  )
}
