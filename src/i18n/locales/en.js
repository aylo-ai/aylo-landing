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
    badge: 'Automate social media sales — around the clock',
    titleLead: 'Build AI Agents That',
    titleAccent: 'Sell for You',
    subtitle:
      'Aylo AI lets you create powerful AI agents to engage with your customers 24/7 on social media. Boost sales, automate conversations, and grow your business effortlessly.',
    ctaPrimary: 'Create an Agent',
    ctaSecondary: 'See How it Works',
    freeNote: 'Start free — 100 conversations a month, no card required.',
  },

  logos: { label: 'Works where your customers already are' },

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
    subtitle: 'Real customer quotes will appear here before launch',
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

  useCases: {
    title: 'Who Aylo AI is for',
    subtitle: 'Any business where the conversation is part of the sale',
    items: [
      {
        title: 'Online retail and Instagram shops',
        desc: 'Answers questions on price, sizes and availability, takes the order, and explains delivery terms.',
      },
      {
        title: 'Restaurants and cafés',
        desc: 'Shows the menu and prices, books a table, takes delivery orders, and gives opening hours.',
      },
      {
        title: 'Clinics and beauty salons',
        desc: 'Books appointments, explains what each service costs, offers open slots, and sends reminders.',
      },
      {
        title: 'Education centres',
        desc: 'Covers courses, prices and timetables, signs people up for a trial class, and collects their details.',
      },
      {
        title: 'Real estate and services',
        desc: 'Clarifies what the client is looking for, shortlists options, and hands over to a manager for viewings.',
      },
      {
        title: 'Delivery and logistics',
        desc: 'Reports order status, works out the delivery zone and cost, and escalates anything unusual.',
      },
    ],
  },

  roi: {
    title: 'Work out what you would save',
    subtitle: 'Put in your own numbers — the maths happens here, in the open',
    inputsTitle: 'Your numbers',
    messagesPerDay: 'Incoming messages per day',
    salary: 'Manager salary per month',
    autoShare: 'Share the agent handles on its own',
    currency: 'UZS',
    outHandled: 'Messages the agent handles per month',
    outHours: 'Manager hours freed per month',
    outSaving: 'Estimated monthly saving',
    disclaimer:
      'This is an estimate from the numbers you entered, not a guarantee. It assumes one message takes {minutes} minutes of a manager\'s time and that a month holds {hours} working hours. Real results depend on your business and how complex the questions are.',
    cta: 'See the plans',
  },

  pricing: {
    title: 'Priced by conversation, in som',
    subtitle: 'Start free. Pay for the conversations your agent handles, not for seats',
    popularBadge: 'MOST POPULAR PLAN',
    billingLabel: 'Billing period',
    monthly: 'Monthly',
    annual: 'Annual',
    annualSave: '-20%',
    currency: ' UZS',
    perMonth: '/mo',
    freePrice: 'Free',
    noCard: 'No card required',
    cancelAnytime: 'Cancel anytime',
    billedAnnually: 'Billed annually',
    note: 'Prices in som, excluding VAT. A conversation is one customer talking to your agent; it closes after 24 hours of inactivity. Go over your allowance and the agent keeps running — we will suggest the next tier.',
    plans: [
      {
        name: 'Free',
        tagline: 'To try it out',
        priceMonthly: 0,
        allowance: '100 conversations / month',
        cta: 'Start free',
        features: [
          '1 channel',
          'Basic knowledge base',
          'Conversation history',
          'Email support',
        ],
      },
      {
        name: 'Starter',
        tagline: 'For small shops and salons',
        priceMonthly: 199000,
        allowance: '500 conversations / month',
        cta: 'Select plan',
        features: [
          '3 channels',
          'Unlimited knowledge base',
          'Handover to a human',
          'Basic analytics',
          '100+ languages',
        ],
      },
      {
        name: 'Business',
        tagline: 'For a growing business',
        priceMonthly: 499000,
        allowance: '2,500 conversations / month',
        cta: 'Select plan',
        features: [
          'All channels',
          'Everything in Starter +',
          'Up to 5 team members',
          'Detailed reporting',
          'API and webhooks',
        ],
      },
      {
        name: 'Company',
        tagline: 'For high message volume',
        priceMonthly: 1190000,
        allowance: '10,000 conversations / month',
        cta: 'Contact us',
        features: [
          'Everything in Business +',
          'Unlimited team members',
          'Priority support',
          'Custom contract terms',
          'Single Sign-On (SSO)',
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
        q: 'What counts as a conversation?',
        a: 'A conversation is one customer talking to your agent — however many messages they exchange inside it, it counts as one. It closes after 24 hours without activity, so if the same customer writes again next week, that is a new conversation. You pay for the conversations your agent handles, not for messages and not for seats.',
      },
      {
        q: 'What happens if I go over my allowance?',
        a: 'Your agent keeps replying — we do not cut it off in the middle of a conversation, and we do not move you to a more expensive tier on our own. You will see that you have passed the limit and we will suggest the tier that matches your volume; switching is your decision.',
      },
      {
        q: 'Is the Free plan really free?',
        a: 'Yes: 100 conversations a month, one channel, no card required. It is a plan, not a time-limited trial — if you stay within 100 conversations you can stay on it. When you need more volume or more channels, you pick a paid tier yourself.',
      },
      {
        q: 'Can I change tier or cancel?',
        a: 'Both, at any time, from the Billing tab in your account. Upgrades and downgrades take effect immediately and billing is prorated. If you cancel, your plan stays active until the end of the period you have already paid for, with no further charges after that.',
      },
      {
        q: 'What does the annual price mean, and is VAT included?',
        a: 'Annual billing takes 20% off the monthly price and is paid a year at a time — the figure on the card is the effective monthly cost under that commitment. All prices are in som and exclude VAT.',
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
