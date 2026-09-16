/**
 * Every piece of copy on the landing page lives here.
 *
 * `href: null` renders a non-clickable label instead of a dead link, so nothing
 * on the page pretends to go somewhere that does not exist yet. Fill the value
 * in and it becomes a real link with no other change.
 */

export const site = {
  name: 'ByteFX',
  legalName: 'ByteFX Capital Ltd.',
  email: 'support@bytefx.com',
  phone: '+1-758-572-0353',
  phoneHref: '+17585720353',
  /** Keep public/app-qr.png in sync with this Google Play destination. */
  mobileAppUrl: 'https://play.google.com/store/apps/details?id=com.bytefx.app&hl=en_IN',
  iosAppUrl: null, // Add the supplied App Store URL here when ready.
  registrationNumber: '2025-00893',
  registeredAddress:
    'Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia.',
  physicalAddress: 'Office No. 1, Rodney Quay, Rodney Bay, Gros Islet, Saint Lucia.',
};

/* ---------------------------------------------------------------- navigation */

export const navigation = [
  {
    id: 'trading',
    label: 'Trading',
    width: 'wide',
    groups: [
      {
        heading: 'Accounts & access',
        items: [
          {
            label: 'Account types',
            note: 'Standard, Pro, Raw and demo accounts.',
            href: null,
          },
          {
            label: 'Demo account',
            note: 'Practise with live prices and virtual funds.',
            href: null,
          },
          {
            label: 'Mobile trading',
            note: 'Your account and the markets in one app.',
            href: '#mobile-app',
          },
          {
            label: 'Funding & withdrawals',
            note: 'Review supported account funding methods.',
            href: '#mobile-app',
          },
        ],
      },
      {
        heading: 'Start trading',
        items: [
          {
            label: 'Download centre',
            note: 'Get the platform for every device.',
            href: null,
          },
          {
            label: 'Getting started',
            note: 'Open, verify and prepare your account.',
            href: null,
          },
        ],
      },
    ],
    feature: {
      image: '/assets/generated/apple-platforms.png',
      alt: 'MacBook, iPad and iPhone displaying the ByteFX trading platform',
      title: 'Open a live account',
      note: 'Get started in minutes.',
      href: null,
    },
  },
  {
    id: 'markets',
    label: 'Markets & tools',
    width: 'wide',
    groups: [
      {
        heading: 'Markets',
        items: [
          { label: 'Forex', note: 'Major, minor and exotic currency pairs.', href: '#markets' },
          { label: 'Crypto', note: 'Round-the-clock digital asset markets.', href: '#markets' },
          { label: 'Stocks', note: 'Leading companies across global exchanges.', href: '#markets' },
          { label: 'Commodities', note: 'Metals, agriculture and other essentials.', href: '#markets' },
          { label: 'Indices', note: 'Track major global market benchmarks.', href: '#markets' },
          { label: 'Energy', note: 'WTI, Brent and natural gas markets.', href: '#markets' },
        ],
      },
      {
        heading: 'Trader tools',
        items: [
          { label: 'All trading tools', href: null },
          { label: 'Economic calendar', href: null },
          { label: 'Trading calculators', href: null },
          { label: 'Market news', href: null },
        ],
      },
    ],
    feature: {
      image: '/assets/generated/market-tokens.png',
      alt: 'Glass currency tokens and precious-metal bars with lime edges and soft reflections',
      title: '150+ instruments',
      note: 'One account, five asset classes.',
      href: '#markets',
    },
  },
  {
    id: 'learn',
    label: 'Learn',
    width: 'narrow',
    groups: [
      {
        heading: 'Knowledge hub',
        items: [
          { label: 'ByteFX School', note: 'Practical lessons from first trade onward.', href: null },
          { label: 'Market news', note: 'Stay current with the stories moving markets.', href: null },
          { label: 'Economic calendar', note: 'Plan around important global events.', href: null },
          { label: 'Calculators', note: 'Estimate margin, pip value and outcomes.', href: null },
          { label: 'Demo competition', note: 'Put your strategy to the test risk-free.', href: null },
          { label: 'Help centre', note: 'Clear answers and direct support.', href: null },
        ],
      },
    ],
    feature: {
      image: '/assets/generated/referral-cards.png',
      alt: 'Two crystal referral cards joined by a lime glass link',
      title: 'Demo competition',
      note: 'Trade a live market with virtual funds.',
      href: null,
    },
  },
  {
    id: 'about',
    label: 'About ByteFX',
    width: 'narrow',
    groups: [
      {
        heading: 'Company',
        items: [
          { label: 'About ByteFX', href: null },
          { label: 'Why ByteFX', href: null },
          { label: 'Trust & security', href: null },
          { label: 'Contact us', href: null },
          { label: 'Legal & compliance', href: null },
        ],
      },
    ],
    feature: {
      image: '/assets/generated/partnership.png',
      alt: 'Interlocking crystal glass rings with lime highlights and a mirrored reflection',
      title: 'Built around trust',
      note: 'See how your account is protected.',
      href: null,
    },
  },
  { id: 'partners', label: 'Partners', href: '#partners' },
];

/* --------------------------------------------------------------------- hero */

export const hero = {
  interval: 7000,
  slides: [
    {
      id: 'your-edge', label: 'Your trading edge', eyebrow: 'Your trading partner',
      title: 'Your ambition.', accent: 'Your own pace.',
      body: 'Find your focus. Explore global markets with the tools and flexibility to trade your way.',
      image: '/assets/hero/hero-trading-cat.png',
      primary: { label: 'Explore ByteFX', href: '#broker' },
      secondary: { label: 'Find your platform', href: '#platform-guide' },
      detail: 'FOCUS / STRATEGY / POSSIBILITY',
    },
    {
      id: 'your-platform', label: 'Built around you', eyebrow: 'A world of possibility',
      title: 'Make your', accent: 'next move.',
      body: 'From your first idea to your next trade. Discover platforms that fit the way you see the markets.',
      image: '/assets/hero/hero-green-discs.png',
      primary: { label: 'Explore platforms', href: '#platform-guide' },
      secondary: { label: 'Meet the mobile app', href: '#mobile-app' },
      detail: 'DESKTOP / WEB / MOBILE',
    },
    {
      id: 'your-markets', label: 'Explore the markets', eyebrow: 'Trade global with ByteFX',
      title: 'More markets.', accent: 'More possibilities.',
      body: 'Forex, indices, metals and more. Explore 150+ instruments and find the markets that match your strategy.',
      image: '/assets/hero/hero-gold-markets.png',
      primary: { label: 'Discover markets', href: '#markets' },
      secondary: { label: 'Explore platforms', href: '#platform-guide' },
      detail: 'FOREX / METALS / INDICES / MORE',
    },
  ],
};

/* --------------------------------------------------------- bento / markets  */

export const bento = {
  markets: {
    eyebrow: 'Trade global',
    title: 'Access 150+ tradable instruments',
    body:
      'From Forex and Indices to Crypto, Commodities and Shares — explore global opportunities with ByteFX.',
    image: '/assets/generated/market-tokens.png',
    alt: 'Glass currency tokens and precious-metal bars with lime edges and soft reflections',
    links: [
      { label: 'Forex', href: '#markets' },
      { label: 'Indices', href: '#markets' },
      { label: 'Crypto', href: '#markets' },
      { label: 'Commodities', href: '#markets' },
      { label: 'Shares', href: '#markets' },
    ],
  },
  platforms: {
    eyebrow: 'Trading platforms',
    title: 'Powerful platforms built for you',
    body:
      'Trade on industry-leading platforms with advanced tools, fast execution and complete flexibility across desktop, web and mobile.',
    cta: { label: 'Explore platforms', href: '#platform-guide' },
    image: '/assets/generated/apple-platforms.png',
    alt: 'MacBook, iPad and iPhone displaying dark trading dashboards',
    badge: ['Any device', 'Anywhere'],
  },
  refer: {
    eyebrow: 'ByteFX partners',
    title: 'Refer a trader',
    body: 'Invite traders to ByteFX and unlock greater opportunities together.',
    cta: { label: 'Refer now', href: null },
    image: '/assets/generated/referral-cards.png',
    alt: 'Two crystal referral cards joined by a lime glass link',
  },
  partner: {
    eyebrow: 'Partner with ByteFX',
    title: 'Grow together with a trusted broker',
    body:
      'Start trading in minutes. Partner with a global broker built on transparency, technology and long-term success.',
    cta: { label: 'Become a partner', href: null },
    image: '/assets/generated/partnership.png',
    alt: 'Interlocking crystal glass rings with lime highlights and a mirrored reflection',
  },
};

/* -------------------------------------------------------------- broker rail */

export const broker = {
  label: 'Built for traders',
  title: 'Trade with a global broker',
  lead: 'Powerful conditions. Advanced technology. A better trading experience.',
  cards: [
    {
      id: 'leverage',
      title: 'Max leverage',
      value: '1:2000',
      note: 'Trade bigger opportunities',
      image: '/assets/generated/leverage.png',
      alt: 'A rising bar chart made of glass',
      href: null,
    },
    {
      id: 'spreads',
      title: 'Spreads from',
      value: '0.1 pips',
      note: 'Tighter spreads, lower costs',
      image: '/assets/generated/spreads.png',
      alt: 'Two crystal discs separated by a narrow lime-lit gap',
      href: null,
    },
    {
      id: 'instruments',
      title: 'Tradable instruments',
      value: '150+',
      note: 'Forex, metals, indices, commodities and more',
      image: '/assets/generated/instruments.png',
      alt: 'Five glass cards showing asset class symbols',
      href: '#markets',
    },
    {
      id: 'execution',
      title: 'Average execution',
      value: '~20ms',
      note: 'Ultra-fast execution',
      image: '/assets/generated/execution.png',
      alt: 'A speedometer rendered in glass',
      href: null,
    },
    {
      id: 'support',
      title: 'Dedicated support',
      value: '24/6',
      note: 'Real people. Real support.',
      image: '/assets/generated/support.png',
      alt: 'A glass headset with a chat bubble',
      href: null,
    },
    {
      id: 'accounts',
      title: 'Your account, your way',
      value: 'More choice',
      note: 'Standard, Pro and Raw account options',
      image: '/assets/generated/account-choice.png',
      alt: 'Three smoked glass account cards with lime edges and soft reflections',
      href: null,
    },
    {
      id: 'demo',
      title: 'Practise your strategy',
      value: 'Demo trading',
      note: 'Explore the markets with virtual funds',
      image: '/assets/generated/demo.png',
      alt: 'Crystal shield with a lime play symbol and a soft reflection',
      href: null,
    },
    {
      id: 'mobile',
      title: 'Markets on the move',
      value: 'Any device',
      note: 'Desktop, web and mobile access',
      image: '/assets/generated/mobile.png',
      alt: 'Smoked glass smartphone with a lime candlestick chart and reflection',
      href: '#mobile-app',
    },
  ],
};

/* ------------------------------------------------------------- testimonials */

export const testimonials = {
  label: 'Testimonials',
  title: ['Don’t listen to us,', 'listen to them'],
  lead:
    'Real traders. Real results. Hear what our global community has to say about their experience with ByteFX.',
  items: [
    {
      id: 'pierre',
      heading: 'One of the best broker experiences',
      quote:
        'I tried a few platforms before switching, and this has been the smoothest experience so far. Fast execution, clean interface, and very reliable overall.',
      name: 'Pierre',
      country: 'Canada',
      flag: '🇨🇦',
      rating: 5,
    },
    {
      id: 'pedro',
      heading: 'Excellent trading conditions',
      quote:
        'Very good broker. Orders are processed quickly, the platform feels stable, and the overall trading experience has been consistently strong.',
      name: 'Pedro L.',
      country: 'Brazil',
      flag: '🇧🇷',
      rating: 5,
      featured: true,
    },
    {
      id: 'rezrao',
      heading: 'Fast withdrawals and fair trading',
      quote:
        'What stands out most to me is the withdrawal speed and transparent trading conditions. Everything feels straightforward and dependable.',
      name: 'Rezrao',
      country: 'Cyprus',
      flag: '🇨🇾',
      rating: 5,
    },
  ],
};

/* ------------------------------------------------------------------ closing */

export const cta = {
  eyebrow: 'Get started',
  title: 'Ready to start trading?',
  lead: 'Your next chapter starts with ByteFX.',
  primary: { label: 'Open live account', href: null },
  secondary: { label: 'Try a demo', href: null },
  points: ['Fast setup', 'Powerful platforms', 'Global markets'],
  background: '/assets/generated/closing-market-scene.png',
};

/* ------------------------------------------------------------------- footer */

export const footer = {
  tagline: 'Discover your trading edge.',
  connect: 'Connect with ByteFX',
  marquee: 'Discover your trading edge · Trade with ByteFX · ',
  socials: [
    { id: 'x', label: 'X', href: null },
    { id: 'instagram', label: 'Instagram', href: null },
    { id: 'facebook', label: 'Facebook', href: null },
    { id: 'linkedin', label: 'LinkedIn', href: null },
    { id: 'youtube', label: 'YouTube', href: null },
    { id: 'telegram', label: 'Telegram', href: null },
  ],
  columns: [
    {
      heading: 'Markets',
      links: [
        { label: 'Forex', href: '#markets' },
        { label: 'Crypto', href: '#markets' },
        { label: 'Stocks', href: '#markets' },
        { label: 'Commodities', href: '#markets' },
        { label: 'Indices', href: '#markets' },
      ],
    },
    {
      heading: 'Explore',
      links: [
        { label: 'Account types', href: null },
        { label: 'Competition', href: null },
        { label: 'Partnership', href: '#partners' },
        { label: 'Tools', href: null },
        { label: 'About ByteFX', href: null },
        { label: 'Why ByteFX', href: null },
        { label: 'Trust & security', href: null },
        { label: 'Getting started', href: null },
        { label: 'Support', href: null },
      ],
    },
  ],
  legal: [
    {
      heading: 'Risk warning',
      body:
        'Trading Forex, CFDs, and other leveraged financial instruments involves a high level of risk and may not be suitable for all investors. Fully understand the risks involved and ensure that you can afford to sustain a complete loss of your invested capital.',
    },
    {
      heading: 'Legal disclaimer',
      body:
        'The information on this website is general. ByteFX Capital Ltd. cannot be held liable for its relevance or accuracy. We do not provide investment advice. Review our Terms & Conditions for details.',
    },
    {
      heading: 'Restricted jurisdictions',
      body:
        'Services are not offered to residents of the UAE, India, USA, China, Iran, North Korea, and other sanctioned regions.',
    },
  ],
  policies: [
    { label: 'Terms & Conditions', href: null },
    { label: 'Privacy Policy', href: null },
    { label: 'Risk Disclosure', href: null },
    { label: 'AML Policy', href: null },
    { label: 'Legal & Compliance', href: null },
  ],
  copyright: '© 2021-2026 ByteFX Capital Ltd. Built for the modern trader.',
};
