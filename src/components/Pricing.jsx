import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import PricingCard from './ui/PricingCard'
import { useI18n } from '../i18n'

/*
  ============================================================================
  PRICING MODEL — derived from market research, August 2026. Adjustable.
  ----------------------------------------------------------------------------
  Priced in som, as flat monthly tiers metered on CONVERSATIONS.

  Why som: the audience is Uzbek small business, and the direct local
  competitor (Zukko.AI) quotes entirely in som. Asking a Tashkent shop owner to
  reason in dollars adds friction no feature can win back.

  Why conversations, not seats: the previous model charged $15-30 per USER,
  which ignored the actual cost driver. A one-person Instagram shop handling
  5,000 DMs paid for a single seat. Nobody in this category prices per seat —
  ManyChat and Chatfuel meter contacts, Intercom and Zendesk meter resolutions.

  Why conversations, not resolutions: per-resolution billing (Intercom $0.99,
  Zendesk $1.50-2.00) means the bill rises as the agent gets better, which
  buyers have learned to distrust. A conversation allowance is predictable —
  the customer can forecast the bill from volume they already know.

  Anchors used:
    - Zukko.AI: 699,000 / 1,190,000 / 1,990,000 UZS monthly (-20% annual)
    - ManyChat: $17 / $39 / $99 monthly, AI add-on +$29
    - Chatfuel: from $39, no free plan since 2026
    - USD/UZS ~ 11,900-12,000 (Aug 2026)
    - Average salary: 7,091,100 UZS national, 12,013,900 UZS Tashkent

  The result undercuts Zukko at every tier while landing near ManyChat's
  dollar equivalents, and keeps a free tier at a moment when both global
  incumbents have gutted theirs (ManyChat cut its free plan to 25 contacts in
  March 2026).

  NOT verified: unit economics. Whether 199,000 UZS for 500 conversations
  clears inference cost depends on Aylo's model choice and average turns per
  conversation — numbers I do not have. Check the margin before launch.
  ============================================================================
*/

// Which tier is highlighted is a layout decision, not copy, so it lives here
// rather than in the locale files — otherwise three files could disagree.
const FEATURED_PLAN_INDEX = 2

// Discount applied to the monthly figure when billed annually. Matches the
// local competitor's annual discount so the comparison is like for like.
const ANNUAL_DISCOUNT = 0.2

export default function Pricing() {
  const { lang, t } = useI18n()
  const [annual, setAnnual] = useState(false)

  const nf = useMemo(
    () => new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US'),
    [lang],
  )

  const plans = t('pricing.plans')

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-28 text-ink">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-100 via-brand-50/60 to-transparent" />

      <div className="section-container relative">
        <SectionHeading
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
          tone="light"
          className="mx-auto mb-10 max-w-2xl text-center"
        />

        {/*
          Billing switch. Rendered as two real buttons in a group rather than a
          checkbox styled to look like a switch: the state is a choice between
          two named options, screen readers get `aria-pressed` on each, and both
          hit a 44px target without extra markup.
        */}
        <div
          role="group"
          aria-label={t('pricing.billingLabel')}
          className="mx-auto mb-12 inline-flex w-full max-w-xs items-center justify-center rounded-full border border-black/10 bg-[#f7f7f8] p-1 sm:w-auto"
        >
          {[false, true].map((isAnnual) => (
            <button
              key={String(isAnnual)}
              type="button"
              onClick={() => setAnnual(isAnnual)}
              aria-pressed={annual === isAnnual}
              className={`flex min-h-[44px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors sm:flex-none ${
                annual === isAnnual
                  ? 'bg-ink text-white shadow-sm'
                  : 'text-ink/60 hover:text-ink'
              }`}
            >
              {isAnnual ? t('pricing.annual') : t('pricing.monthly')}
              {isAnnual && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    annual ? 'bg-brand-500 text-white' : 'bg-brand-500/15 text-brand-700'
                  }`}
                >
                  {t('pricing.annualSave')}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => {
            const monthly = plan.priceMonthly
            const effective = annual ? Math.round(monthly * (1 - ANNUAL_DISCOUNT)) : monthly
            const isFree = monthly === 0

            return (
              <PricingCard
                key={plan.name}
                name={plan.name}
                tagline={plan.tagline}
                price={isFree ? t('pricing.freePrice') : nf.format(effective)}
                period={isFree ? '' : `${t('pricing.currency')}${t('pricing.perMonth')}`}
                allowance={plan.allowance}
                /*
                  On the annual view, say what the commitment is. Showing a
                  discounted monthly figure without naming the billing period
                  is the oldest dark pattern in SaaS pricing.
                */
                footnote={
                  isFree
                    ? t('pricing.noCard')
                    : annual
                      ? t('pricing.billedAnnually')
                      : t('pricing.cancelAnytime')
                }
                features={plan.features}
                cta={plan.cta}
                badgeLabel={t('pricing.popularBadge')}
                featured={i === FEATURED_PLAN_INDEX}
                index={i}
              />
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-10 flex max-w-2xl items-start justify-center gap-2 text-center text-xs leading-relaxed text-ink/50"
        >
          <ShieldCheck size={15} className="mt-px shrink-0 text-brand-500" />
          <span>{t('pricing.note')}</span>
        </motion.p>
      </div>
    </section>
  )
}
