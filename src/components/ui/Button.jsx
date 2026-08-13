import { motion } from 'framer-motion'

/*
  The page's shared button/CTA.

  Every call site used to be a hand-written `motion.a` with a copied class
  string, and the four primary CTAs (Hero, HowItWorks, MetaVerified,
  CTABanner) had already drifted apart on `text-white` and on shadow opacity.

  Variant classes are *selected* from the maps below rather than merged with
  caller overrides: this project has no `tailwind-merge`, so two competing
  `shadow-brand-500/*` classes in one string would resolve by stylesheet
  order instead of by call site. `className` is for layout only (margins,
  `relative`) — never for restyling the button's surface.
*/

const VARIANTS = {
  // Solid orange — the primary CTA. Legible on both the dark and white sections.
  primary: 'bg-brand-500 text-white hover:bg-brand-400',
  // Hairline outline for a secondary action sitting beside a primary. Dark sections only.
  secondary: 'border border-white/15 text-white/90 hover:bg-white/5',
  // Near-black solid — the non-featured pricing CTA on a white card.
  dark: 'bg-ink text-white hover:bg-ink/80',
}

const SHADOWS = {
  none: '',
  md: 'shadow-lg shadow-brand-500/30',
  lg: 'shadow-lg shadow-brand-500/40',
}

const DEFAULT_SHADOW = { primary: 'md', secondary: 'none', dark: 'none' }

export default function Button({
  href,
  children,
  icon: Icon,
  variant = 'primary',
  shadow,
  fullWidth = false,
  hoverScale = 1.05,
  tapScale = 0.96,
  className = '',
  ...rest
}) {
  /*
    `inline-flex` replaces the `flex` some call sites used. Those buttons are
    all flex items of their parent (Hero's button row, HowItWorks' centering
    wrapper), and a flex item is blockified either way — so this renders
    identically while behaving correctly in the inline contexts too.
  */
  const layout = fullWidth
    ? 'flex w-full items-center justify-center gap-2 py-3'
    : 'inline-flex items-center gap-2 px-7 py-3.5'

  return (
    <motion.a
      href={href}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      className={`${layout} rounded-full text-sm font-semibold transition-colors ${VARIANTS[variant]} ${
        SHADOWS[shadow ?? DEFAULT_SHADOW[variant]]
      } ${className}`}
      {...rest}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.a>
  )
}
