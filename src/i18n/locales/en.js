/*
  English. This file is the source of truth for the copy: uz.js and ru.js
  mirror its shape key for key. When adding a key, add it here first, then to
  both other files — a missing key falls back to Uzbek (the default), so an
  English-only addition would silently show Uzbek to English visitors.
*/
export default {
  meta: {
    title: 'Aylo AI — Build AI Agents That Sell for You',
    description:
      'Aylo AI lets you create powerful AI agents to engage with your customers 24/7 on social media. Boost sales, automate conversations, and grow your business effortlessly.',
  },

  language: { label: 'Language' },

  nav: {
    features: 'Features',
    howItWorks: 'How it works',
    pricing: 'Pricing',
    testimonials: 'Testimonials',
    contact: 'Contact',
    signIn: 'Sign in',
    getStarted: 'Get Started',
    toggleMenu: 'Toggle menu',
  },

  hero: {
    badge: '100+ companies already automating sales with Aylo AI',
    titleLead: 'Build AI Agents That',
    titleAccent: 'Sell for You',
    subtitle:
      'Aylo AI lets you create powerful AI agents to engage with your customers 24/7 on social media. Boost sales, automate conversations, and grow your business effortlessly.',
    ctaPrimary: 'Create an Agent',
    ctaSecondary: 'See How it Works',
  },

  logos: { label: '100+ Companies already using Aylo AI' },

  features: {
    title: 'Why Choose Aylo AI',
    subtitle: 'Everything you need to automate customer engagement and boost sales',
    linkLabel: 'See how it works',
    items: [
      {
        title: 'Instant Replies',
        desc: 'Respond to customer queries in milliseconds, not minutes. Our AI processes and answers questions instantly.',
      },
      {
        title: 'Natural Language',
        desc: 'Our AI understands context, jargon, and even emotion, ensuring a human-like interaction experience.',
      },
      {
        title: 'CRM Integration',
        desc: 'Seamlessly connects with your existing customer systems for an integrated help experience.',
      },
      {
        title: 'Human Escalation',
        desc: 'Smart routing to human agents when needed, ensuring complex issues get the right attention.',
      },
      {
        title: 'Multilingual',
        desc: 'Engage with customers in over 100 languages, expanding your global support reach.',
      },
      {
        title: 'Analytics',
        desc: 'Get insights from every customer interaction through comprehensive reports and dashboards.',
      },
    ],
  },

  howItWorks: {
    title: 'How It Works',
    subtitle: 'Get started in three simple steps',
    cta: 'Create an Agent',
    steps: [
      {
        title: 'Sign Up & Connect',
        desc: 'Sign up and connect your social media accounts in seconds.',
      },
      {
        title: 'Create Your AI Agent',
        desc: 'Build your AI agent with no coding required using our smart templates.',
      },
      {
        title: 'Launch & Engage',
        desc: 'Launch your agent and start chatting with customers automatically.',
      },
    ],
  },

  testimonials: {
    title: 'What Our Customers Say',
    // TODO(pre-launch): unsubstantiated claim for an unlaunched product.
    subtitle: 'Join thousands of businesses growing with Aylo AI',
    // PLACEHOLDER — see the banner comment in Testimonials.jsx. Not real quotes.
    items: [
      {
        quote: 'Placeholder testimonial. Nobody has said this — a real quote belongs here.',
        name: 'Customer Name A',
        role: 'Job title, Company A (placeholder)',
      },
      {
        quote:
          'Example copy standing in for a customer story about setup and everyday use. Their own words, with their permission, go here before launch.',
        name: 'Customer Name B',
        role: 'Job title, Company B (placeholder)',
      },
      {
        quote:
          'This is sample text, not an endorsement. Once a customer has agreed to be quoted, this space will carry their own account of what changed for their team, with any figures verified first.',
        name: 'Customer Name C',
        role: 'Job title, Company C (placeholder)',
      },
      {
        quote:
          'Filler quote for layout only. Replace with a real, permissioned customer testimonial.',
        name: 'Customer Name D',
        role: 'Job title, Company D (placeholder)',
      },
    ],
  },

  metaVerified: {
    title: 'Verified by Meta',
    body: 'Aylo AI is officially approved by Meta and provides reliable and secure integration with Facebook and Instagram platforms. This confirmation indicates that we maintain a high level of safety and compliance standards.',
    points: ['Secure data sharing', 'According to the rules', 'Official Integration'],
    cta: 'Create an Agent',
  },

  integrations: {
    title: 'Seamless Social Media Connections',
    subtitle: 'Aylo AI integrates with the platforms your customers already use',
    // Instagram, Facebook and Telegram are product names and stay as-is.
    website: 'Website',
  },

  pricing: {
    title: 'Regular, use-based pricing',
    subtitle: 'Start for free, then pay only for using',
    popularBadge: 'MOST POPULAR PLAN',
    plans: [
      {
        name: 'Starter',
        tagline: 'Ideal for small projects',
        price: 'Free',
        period: '',
        cta: 'Try for free',
        features: [
          'Unlimited personal files',
          'Email support',
          'CSV data export',
          'Basic analytics dashboard',
          '1,000 API calls per month',
        ],
      },
      {
        name: 'Professional',
        tagline: 'For freelancers and startups',
        price: '$15',
        period: '/per user',
        cta: 'Select plan',
        features: [
          'All starter features +',
          'Up to 5 user accounts',
          'Team collaboration tools',
          'Custom dashboards',
          'Multiple data export formats',
          'Basic custom integrations',
        ],
      },
      {
        name: 'Organization',
        tagline: 'For fast-growing businesses',
        price: '$30',
        period: '/per user',
        cta: 'Select plan',
        features: [
          'All professional features +',
          'Enterprise security suite',
          'Single Sign-On (SSO)',
          'Custom contract terms',
          'Dedicated phone support',
          'Custom integration support',
          'Compliance tools',
        ],
      },
    ],
  },

  faq: {
    title: 'FAQs',
    items: [
      {
        q: 'How to use Aylo?',
        a: 'Sign up for a free account, connect your social media channels, and use our no-code builder to design your AI agent. Once configured, launch it and it will start engaging with your customers automatically across every connected channel.',
      },
      {
        q: 'How to change subscription?',
        a: 'Head to your account settings and open the Billing tab. From there you can upgrade, downgrade, or switch your plan at any time — changes apply immediately and billing is prorated.',
      },
      {
        q: 'How to cancel Subscription?',
        a: 'Go to Billing in your dashboard and select "Cancel Subscription". Your plan will remain active until the end of the current billing cycle, with no further charges after that.',
      },
      {
        q: 'How to create Project?',
        a: 'From your dashboard, click "New Project", give it a name, and choose a template or start from scratch. You can then attach agents, data sources, and integrations to that project.',
      },
      {
        q: 'Can I create private Dataset?',
        a: 'Yes. Every workspace supports private datasets that are only accessible to your team. You can upload CSVs, connect a database, or sync from your CRM securely.',
      },
    ],
  },

  contact: {
    title: "Let's Talk",
    subtitle: 'Ready to transform your customer engagement? Get in touch with us.',
    nameLabel: 'Your Name',
    emailLabel: 'Your Email',
    messageLabel: 'Your Message',
    messagePlaceholder: 'Tell us about your project...',
    send: 'Send Message',
    sending: 'Sending…',
    sent: 'Message Sent',
    tryAgain: 'Try Again',
    srSending: 'Sending your message…',
    errors: {
      name: 'Please enter your name.',
      email: 'Please enter your email address.',
      emailInvalid: 'That email address does not look right — check for typos.',
      message: 'Please tell us a little about your project.',
    },
    status: {
      fixFields: 'Please fix the highlighted fields and try again.',
      unconfigured:
        'Message delivery is not set up yet, so this form cannot reach us — your message was NOT sent. Please reach out through one of our other channels in the meantime.',
      success: "Thanks! Your message is on its way — we'll get back to you shortly.",
      timeout: 'That took too long and timed out. Your message was not sent — please try again.',
      generic: 'Something went wrong and your message was not sent. Please try again.',
      server: 'Our server had a problem (error {code}). Please try again in a moment.',
      client: 'We could not send your message (error {code}). Please check your details and try again.',
    },
  },

  cta: {
    title: 'Create Your Agent',
    subtitle:
      'Increase sales, free up managers for more complex tasks, and build customer trust through quick responses.',
    button: 'Create an Agent',
  },

  footer: {
    tagline: 'Get started to up your business with personal AI manager',
    links: {
      features: 'Features',
      testimonials: 'Testimonials',
      howItWorks: 'How it works',
      metaVerified: 'Meta verified',
      pricing: 'Pricing',
      contact: 'Contact us',
    },
    rights: '© {year} Aylo AI. All rights reserved.',
  },

  mockup: {
    upgrade: 'Upgrade',
    upgradeTitle: 'Upgrade your plan',
    upgradeBody: 'Unlock unlimited agents',
    sidebar: ['Home', 'Agents', 'Knowledge', 'Training', 'Configuration'],
    balance: 'Subscription balance',
    buy: 'Buy Subscription',
    howTo: 'How to use Aylo.uz?',
    keywords: 'Add keywords',
    widget: 'Customize widget',
    replied: 'Agent replied in 0.4s',
    agentRole: 'Sales manager on Aylo AI',
    cards: [
      { title: 'Create a chatbot for', subtitle: 'customer support questions' },
      { title: 'Automate your Telegram', subtitle: 'auto-reply to every message' },
      { title: 'Improve your Instagram', subtitle: 'reply to DMs & comments' },
      { title: 'Help with anything', subtitle: 'ask your agent for help' },
    ],
  },
}
