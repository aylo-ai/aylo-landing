import { Zap, MessageSquare, Settings, Users, Globe2, BarChart3 } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import FeatureCard from './ui/FeatureCard'
import { useT } from '../i18n'

/*
  Icons stay in code and copy lives in the locale files, so this array is
  positional: FEATURE_ICONS[i] pairs with features.items[i] in every locale.
  Adding a feature means adding an icon here AND an entry to all three
  locales, in the same position.
*/
const FEATURE_ICONS = [Zap, MessageSquare, Settings, Users, Globe2, BarChart3]

export default function Features() {
  const t = useT()

  return (
    <section id="features" className="relative overflow-hidden bg-ink py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,60,20,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="section-container relative">
        <SectionHeading title={t('features.title')} subtitle={t('features.subtitle')} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t('features.items').map((f, i) => (
            /*
              There is no per-feature detail page in this project, so the card
              link used to be a `href="#"` that jumped to the top of the page.
              It points at "How It Works" instead — the only place that expands
              on what the features actually do — and the label says so.
            */
            <FeatureCard
              key={f.title}
              icon={FEATURE_ICONS[i]}
              title={f.title}
              desc={f.desc}
              href="#how-it-works"
              linkLabel={t('features.linkLabel')}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
