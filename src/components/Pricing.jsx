import SectionHeading from './ui/SectionHeading'
import PricingCard from './ui/PricingCard'

const plans = [
  {
    name: 'Starter',
    tagline: 'Ideal for small projects',
    price: 'Free',
    period: '',
    features: [
      'Unlimited personal files',
      'Email support',
      'CSV data export',
      'Basic analytics dashboard',
      '1,000 API calls per month',
    ],
    cta: 'Try for free',
    popular: false,
  },
  {
    name: 'Professional',
    tagline: 'For freelancers and startups',
    price: '$15',
    period: '/per user',
    features: [
      'All starter features +',
      'Up to 5 user accounts',
      'Team collaboration tools',
      'Custom dashboards',
      'Multiple data export formats',
      'Basic custom integrations',
    ],
    cta: 'Select plan',
    popular: true,
  },
  {
    name: 'Organization',
    tagline: 'For fast-growing businesses',
    price: '$30',
    period: '/per user',
    features: [
      'All professional features +',
      'Enterprise security suite',
      'Single Sign-On (SSO)',
      'Custom contract terms',
      'Dedicated phone support',
      'Custom integration support',
      'Compliance tools',
    ],
    cta: 'Select plan',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-28 text-ink">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-100 via-brand-50/60 to-transparent" />

      <div className="section-container relative">
        <SectionHeading
          title="Regular, use-based pricing"
          subtitle="Start for free, then pay only for using"
          tone="light"
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {plans.map((plan, i) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              tagline={plan.tagline}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              cta={plan.cta}
              featured={plan.popular}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
