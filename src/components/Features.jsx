import { Zap, MessageSquare, Settings, Users, Globe2, BarChart3 } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import FeatureCard from './ui/FeatureCard'

const features = [
  {
    title: 'Instant Replies',
    desc: 'Respond to customer queries in milliseconds, not minutes. Our AI processes and answers questions instantly.',
    icon: Zap,
  },
  {
    title: 'Natural Language',
    desc: 'Our AI understands context, jargon, and even emotion, ensuring a human-like interaction experience.',
    icon: MessageSquare,
  },
  {
    title: 'CRM Integration',
    desc: 'Seamlessly connects with your existing customer systems for an integrated help experience.',
    icon: Settings,
  },
  {
    title: 'Human Escalation',
    desc: 'Smart routing to human agents when needed, ensuring complex issues get the right attention.',
    icon: Users,
  },
  {
    title: 'Multilingual',
    desc: 'Engage with customers in over 100 languages, expanding your global support reach.',
    icon: Globe2,
  },
  {
    title: 'Analytics',
    desc: 'Get insights from every customer interaction through comprehensive reports and dashboards.',
    icon: BarChart3,
  },
]

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-ink py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,60,20,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="section-container relative">
        <SectionHeading
          title="Why Choose Aylo AI"
          subtitle="Everything you need to automate customer engagement and boost sales"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            /*
              There is no per-feature detail page in this project, so the card
              link used to be a `href="#"` that jumped to the top of the page.
              It points at "How It Works" instead — the only place that expands
              on what the features actually do — and the label says so.
            */
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              desc={f.desc}
              href="#how-it-works"
              linkLabel="See how it works"
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
