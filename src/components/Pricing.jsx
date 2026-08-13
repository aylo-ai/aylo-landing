import SectionHeading from './ui/SectionHeading'
import PricingCard from './ui/PricingCard'
import { useT } from '../i18n'

/*
  Which tier is highlighted is a layout decision, not copy, so it lives here
  rather than in the locale files — otherwise three files could disagree about
  which plan is "most popular". Index 1 is the middle tier.
*/
const FEATURED_PLAN_INDEX = 1

export default function Pricing() {
  const t = useT()

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-28 text-ink">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-100 via-brand-50/60 to-transparent" />

      <div className="section-container relative">
        <SectionHeading
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
          tone="light"
        />

        {/*
          Three columns start at `md` (768px), not `sm` (640px). At 640px each
          card is ~197px wide, and `p-7` takes 56px of that — leaving ~140px
          for a tier name, a price, and up to seven feature rows, which wrap
          into an unreadable column. The featured card's `sm:scale-105` made it
          worse by pushing its neighbours narrower still.
        */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {t('pricing.plans').map((plan, i) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              tagline={plan.tagline}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              cta={plan.cta}
              badgeLabel={t('pricing.popularBadge')}
              featured={i === FEATURED_PLAN_INDEX}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
