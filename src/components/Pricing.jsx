import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, ShieldCheck } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import PricingCard from './ui/PricingCard'
import { effectivePrice, fetchPricingPlans, isFreePlan } from '../lib/pricingApi'
import { useI18n } from '../i18n'

/*
  ============================================================================
  PRICING — rendered from the backend, not from the locale files.
  ----------------------------------------------------------------------------
  Every number on these cards comes from `GET /payment/pricing-packages/`
  (see src/lib/pricingApi.js for why). What stays in the locales is the copy
  around the numbers: the heading, the allowance and period templates, the CTA
  labels, the footnotes. Plan names, descriptions and feature bullets are
  backend fields — they are what the sign-up flow shows, so they must match.

  Consequences worth knowing:

  - The tier count is whatever the API returns, so the grid picks its column
    count from `plans.length` (Tailwind can't see a dynamically built class
    name, hence the lookup table rather than string interpolation).
  - Which tier is featured is the backend's `is_popular` flag, not a constant
    in this file.
  - There is no annual billing. Every package is `duration_days: 30` and the
    only discount the backend models is `discount_price`, a promo price on the
    monthly figure. The monthly/annual switch that used to sit here applied a
    20% discount invented on the client — a price nobody could actually buy.

  A failed request renders an error with a retry, never a fallback price: a
  stale hardcoded number is exactly the failure mode this change removes.
  ============================================================================
*/

// Request budget. Matches the contact form's posture — a slow API should not
// leave skeletons on screen indefinitely.
const TIMEOUT_MS = 10000

// Column counts per tier count. Written out because Tailwind scans source for
// complete class names; `lg:grid-cols-${n}` would never be generated.
const GRID_BY_COUNT = {
  1: 'max-w-sm grid-cols-1',
  2: 'max-w-3xl grid-cols-1 sm:grid-cols-2',
  3: 'max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const LOCALES = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' }

function PlanSkeleton({ index }) {
  return (
    <div
      className="flex flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="animate-pulse">
        <div className="h-5 w-24 rounded bg-black/10" />
        <div className="mt-3 h-3 w-36 rounded bg-black/5" />
        <div className="mt-6 h-8 w-32 rounded bg-black/10" />
        <div className="mt-3 h-4 w-28 rounded bg-brand-500/20" />
        <div className="mt-8 space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-3 w-full rounded bg-black/5" />
          ))}
        </div>
        <div className="mt-8 h-11 w-full rounded-full bg-black/10" />
      </div>
    </div>
  )
}

export default function Pricing() {
  const { lang, t } = useI18n()
  const [plans, setPlans] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  // Bumped by the retry button to re-run the effect.
  const [attempt, setAttempt] = useState(0)

  const nf = useMemo(() => new Intl.NumberFormat(LOCALES[lang] ?? LOCALES.uz), [lang])

  /*
    Refetches on language change so translated plan copy arrives with the
    switch. The backend's `name`/`description` are modeltranslation fields; the
    rows are Uzbek-only today, so today this returns identical data per
    language and simply starts working when translations are filled in.
  */
  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    let active = true

    setStatus((current) => (current === 'ready' ? current : 'loading'))

    fetchPricingPlans(lang, controller.signal)
      .then((result) => {
        if (!active) return
        setPlans(result)
        // An empty list is not a usable pricing section — treat it as a
        // failure rather than rendering an empty grid under the heading.
        setStatus(result.length > 0 ? 'ready' : 'error')
      })
      .catch(() => {
        if (!active) return
        setPlans([])
        setStatus('error')
      })
      .finally(() => clearTimeout(timer))

    return () => {
      active = false
      clearTimeout(timer)
      controller.abort()
    }
  }, [lang, attempt])

  const retry = useCallback(() => {
    setStatus('loading')
    setAttempt((n) => n + 1)
  }, [])

  /* Currency label: the locale spells out som, anything else shows its code. */
  const currencyLabel = useCallback(
    (code) => (code === 'uzs' ? t('pricing.currency') : ` ${code.toUpperCase()}`),
    [t],
  )

  /*
    Billing period. Every package is 30 days today, but the field exists and a
    365-day package would otherwise be advertised as monthly.
  */
  const periodLabel = useCallback(
    (days) => (days === 30 ? t('pricing.perMonth') : t('pricing.perDays', { count: nf.format(days) })),
    [nf, t],
  )

  const gridClass = GRID_BY_COUNT[plans.length] ?? GRID_BY_COUNT[4]

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-28 text-ink">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-100 via-brand-50/60 to-transparent" />

      <div className="section-container relative">
        <SectionHeading
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
          tone="light"
          className="mx-auto mb-12 max-w-2xl text-center"
        />

        {/*
          `aria-busy` + `aria-live` so a screen reader hears the prices arrive
          instead of finding a silently swapped grid. `polite` — this is not an
          interruption, the visitor is reading the heading.
        */}
        <div aria-busy={status === 'loading'} aria-live="polite">
          {status === 'loading' && (
            <div className={`mx-auto grid gap-6 ${GRID_BY_COUNT[3]}`}>
              <span className="sr-only">{t('pricing.loading')}</span>
              {[0, 1, 2].map((i) => (
                <PlanSkeleton key={i} index={i} />
              ))}
            </div>
          )}

          {status === 'error' && (
            <div className="mx-auto max-w-md rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold">{t('pricing.errorTitle')}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{t('pricing.errorBody')}</p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={retry}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-ink/80"
                >
                  <RefreshCw size={15} />
                  {t('pricing.retry')}
                </button>
                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] items-center rounded-full border border-black/10 px-6 text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
                >
                  {t('pricing.errorContact')}
                </a>
              </div>
            </div>
          )}

          {status === 'ready' && (
            <div className={`mx-auto grid gap-6 ${gridClass}`}>
              {plans.map((plan, i) => {
                const free = isFreePlan(plan)
                const suffix = `${currencyLabel(plan.currency)}${periodLabel(plan.durationDays)}`

                /*
                  Three kinds of card, and only the middle one shows a number:

                  - custom  — the "for companies" tier. Its stored price is 0
                    because sales agrees it per customer, so it shows a
                    "negotiated" label and a contact CTA. Never a price, and
                    never the free treatment.
                  - free    — genuinely costs nothing.
                  - priced  — a som figure per billing period.

                  `request_count` is 0 on a custom package too, so the
                  allowance line is dropped rather than promising "0
                  conversations a month".
                */
                const price = plan.isCustom
                  ? t('pricing.customPrice')
                  : free
                    ? t('pricing.freePrice')
                    : nf.format(effectivePrice(plan))

                return (
                  <PricingCard
                    key={plan.id}
                    name={plan.name}
                    tagline={plan.description}
                    price={price}
                    /* Struck-through list price, only when a promo is live. */
                    originalPrice={
                      !plan.isCustom && plan.discountPrice != null
                        ? nf.format(plan.price)
                        : undefined
                    }
                    originalPriceLabel={t('pricing.wasPrice')}
                    period={free || plan.isCustom ? '' : suffix}
                    allowance={
                      plan.requestCount > 0
                        ? t('pricing.allowance', { count: nf.format(plan.requestCount) })
                        : ''
                    }
                    footnote={
                      plan.isCustom
                        ? t('pricing.customFootnote')
                        : free
                          ? t('pricing.noCard')
                          : t('pricing.cancelAnytime')
                    }
                    features={plan.features.map((f) => f.name)}
                    cta={
                      plan.isCustom
                        ? t('pricing.ctaContact')
                        : free
                          ? t('pricing.ctaFree')
                          : t('pricing.ctaSelect')
                    }
                    badgeLabel={t('pricing.popularBadge')}
                    featured={plan.isPopular}
                    index={i}
                  />
                )
              })}
            </div>
          )}
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
