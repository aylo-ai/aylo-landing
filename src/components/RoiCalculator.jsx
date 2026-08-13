import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Clock, MessageSquare, Wallet } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Button from './ui/Button'
import { useI18n } from '../i18n'

/*
  Savings estimator, placed immediately before Pricing so a visitor arrives at
  the tiers having already built their own case for the cost.

  Every number shown is derived from what the visitor typed — nothing here is
  a claim about results Aylo has produced, and the two modelling assumptions
  are stated on the page rather than buried. That distinction matters: this
  section must never read as a promise.

  Currency is UZS because the audience is Uzbekistan. The pricing tiers are
  still in USD (see the note in Pricing) — worth reconciling.
*/

// Minutes of a manager's time one incoming message consumes end to end:
// reading it, checking stock or price, replying, logging it. Deliberately
// conservative — support benchmarks commonly assume more.
const MINUTES_PER_MESSAGE = 3

// Working hours in a month: 8h x 22 working days. Used to convert a monthly
// salary into an hourly cost.
const WORK_HOURS_PER_MONTH = 176

const DAYS_PER_MONTH = 30

const SLIDERS = [
  { key: 'messagesPerDay', min: 10, max: 1000, step: 10 },
  { key: 'salary', min: 2_000_000, max: 20_000_000, step: 500_000 },
  { key: 'autoShare', min: 30, max: 90, step: 5 },
]

export default function RoiCalculator() {
  const { lang, t } = useI18n()
  const [values, setValues] = useState({
    messagesPerDay: 120,
    salary: 4_000_000,
    autoShare: 70,
  })

  const nf = useMemo(
    () => new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US'),
    [lang],
  )

  const result = useMemo(() => {
    const handled = Math.round(
      values.messagesPerDay * DAYS_PER_MONTH * (values.autoShare / 100),
    )
    const hoursFreed = Math.round((handled * MINUTES_PER_MESSAGE) / 60)
    const saving = Math.round((hoursFreed / WORK_HOURS_PER_MONTH) * values.salary)
    return { handled, hoursFreed, saving }
  }, [values])

  const update = (key) => (e) => setValues((v) => ({ ...v, [key]: Number(e.target.value) }))

  const tiles = [
    { icon: MessageSquare, value: nf.format(result.handled), label: t('roi.outHandled') },
    { icon: Clock, value: nf.format(result.hoursFreed), label: t('roi.outHours') },
    {
      icon: Wallet,
      value: `${nf.format(result.saving)} ${t('roi.currency')}`,
      label: t('roi.outSaving'),
      accent: true,
    },
  ]

  return (
    <section id="roi" className="relative overflow-hidden bg-ink py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(255,92,26,0.22),transparent_70%)]" />

      <div className="section-container relative">
        <SectionHeading title={t('roi.title')} subtitle={t('roi.subtitle')} />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-panel p-6 sm:p-7"
          >
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-white/80">
              <Calculator size={16} className="text-brand-400" />
              {t('roi.inputsTitle')}
            </div>

            <div className="flex flex-col gap-7">
              {SLIDERS.map((s) => (
                <div key={s.key}>
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <label
                      htmlFor={`roi-${s.key}`}
                      className="text-sm text-white/60"
                    >
                      {t(`roi.${s.key}`)}
                    </label>
                    <span className="text-sm font-bold tabular-nums text-white">
                      {s.key === 'autoShare'
                        ? `${values[s.key]}%`
                        : s.key === 'salary'
                          ? `${nf.format(values[s.key])} ${t('roi.currency')}`
                          : nf.format(values[s.key])}
                    </span>
                  </div>
                  {/*
                    A range input rather than a text field: no keyboard on
                    phones, no empty/NaN state to validate, and it is reachable
                    with arrow keys. `accent-brand-500` colours the native
                    track and thumb without a pile of vendor pseudo-elements.
                  */}
                  <input
                    id={`roi-${s.key}`}
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={values[s.key]}
                    onChange={update(s.key)}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brand-500"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {tiles.map((tile) => (
              <div
                key={tile.label}
                className={`flex items-center gap-4 rounded-2xl border p-5 ${
                  tile.accent
                    ? 'border-brand-500/40 bg-brand-500/10'
                    : 'border-white/10 bg-white/[0.04]'
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    tile.accent ? 'bg-brand-500 text-white' : 'bg-white/10 text-brand-400'
                  }`}
                >
                  <tile.icon size={20} />
                </div>
                <div className="min-w-0">
                  {/*
                    `tabular-nums` keeps the digits from reflowing while a
                    slider is dragged; `break-words` stops a long formatted
                    som figure from overflowing the tile on a narrow phone.
                  */}
                  <p className="break-words text-xl font-extrabold tabular-nums sm:text-2xl">
                    {tile.value}
                  </p>
                  <p className="mt-0.5 text-xs text-white/50">{tile.label}</p>
                </div>
              </div>
            ))}

            {/*
              The assumptions are on the page, not in a tooltip. This is an
              estimate built from the visitor's own inputs — saying so plainly
              is what keeps it from reading as a guaranteed result.
            */}
            <p className="mt-1 text-xs leading-relaxed text-white/40">
              {t('roi.disclaimer', {
                minutes: MINUTES_PER_MESSAGE,
                hours: WORK_HOURS_PER_MONTH,
              })}
            </p>

            <Button href="#pricing" icon={Calculator} className="mt-2 self-start">
              {t('roi.cta')}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
