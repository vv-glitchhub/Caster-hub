export type CasterApp = {
  slug: string
  name: string
  label: string
  domain: string
  status: string
  href: string
  repo?: string
  summary: string
  promise: string
  metrics: string[]
  features: string[]
  agent: string[]
  next: string[]
}

export const casterApps: CasterApp[] = [
  {
    slug: 'scorecaster',
    name: 'Scorecaster',
    label: 'Sports Intelligence',
    domain: 'Odds, edge, EV and risk control',
    status: 'Production alpha · Auth and cloud layer deployed',
    href: '/apps/scorecaster',
    repo: 'https://github.com/vv-glitchhub/scorecaster',
    summary: 'AI-powered sports intelligence for odds comparison, model probability, edge detection, staking discipline and transparent pick reasoning.',
    promise: 'Find value, explain risk and help the user skip weak bets instead of chasing action.',
    metrics: ['Edge', 'EV', 'Confidence', 'CLV', 'Bankroll risk'],
    features: ['Live odds flow', 'Best odds finder', 'Daily Top 3 picks', 'Local and cloud bet slip', 'Protected user accounts', 'Market movement history'],
    agent: ['Explains why a pick exists', 'Shows the risk before staking', 'Compares model probability against market odds', 'Warns when a bet should be skipped'],
    next: ['Run Supabase auth/RLS migration', 'Test two-user data isolation', 'Validate local-to-cloud sync', 'Connect shared login to Caster Hub', 'Add automatic settlement and CLV']
  },
  {
    slug: 'stockcaster',
    name: 'Stockcaster',
    label: 'Market Intelligence',
    domain: 'Stocks, portfolio, news and market risk',
    status: 'MVP sprint',
    href: '/apps/stockcaster',
    repo: 'https://github.com/vv-glitchhub/Stockcaster-',
    summary: 'AI-powered investing assistant for watchlists, portfolio intelligence, market briefs, stock explanations and news reliability scoring.',
    promise: 'Turn market noise into understandable signals and help the user know what to watch next.',
    metrics: ['Risk rating', 'Sentiment', 'Trend', 'Valuation note', 'News reliability'],
    features: ['Watchlist', 'Portfolio dashboard', 'Stock detail pages', 'Daily market brief', 'Sector trends', 'AI stock analysis'],
    agent: ['Explains why a stock moved', 'Separates signal from noise', 'Summarizes market news', 'Highlights risks and next catalysts'],
    next: ['Add watchlist database', 'Add portfolio database', 'Add stock search', 'Add news provider', 'Add AI analysis endpoint']
  },
  {
    slug: 'carcaster',
    name: 'Carcaster',
    label: 'Car Intelligence',
    domain: 'Diagnostics, maintenance and ownership costs',
    status: 'New MVP module',
    href: '/apps/carcaster',
    summary: 'AI car ownership assistant for fault codes, symptoms, repair notes, maintenance timelines, fuel costs and service communication.',
    promise: 'Help the user understand what is wrong, what to check first and what to tell the repair shop.',
    metrics: ['Fault urgency', 'Repair estimate', 'Maintenance status', 'Fuel cost', 'Inspection readiness'],
    features: ['Car profile', 'Fault code history', 'Symptom log', 'Maintenance timeline', 'CNG calculator', 'Repair message generator'],
    agent: ['Explains OBD fault codes', 'Prioritizes urgent vs non-urgent issues', 'Creates repair shop messages', 'Tracks recurring problems'],
    next: ['Add car profile UI', 'Add fault code schema', 'Add maintenance tracker', 'Add Passat first case', 'Add service reminder logic']
  },
  {
    slug: 'travelcaster',
    name: 'Travelcaster',
    label: 'Travel Intelligence',
    domain: 'Trips, hotels, routes, budgets and daily plans',
    status: 'New MVP module',
    href: '/apps/travelcaster',
    summary: 'AI travel assistant for trip profiles, day plans, routes, hotel notes, restaurant shortlists, budgets and local practical tips.',
    promise: 'Make travel feel organized, personal and easy from booking to the last day of the trip.',
    metrics: ['Budget', 'Distance', 'Time', 'Mood fit', 'Booking readiness'],
    features: ['Trip profile', 'Itinerary builder', 'Budget calculator', 'Packing checklist', 'Route storage', 'AI day planner'],
    agent: ['Builds day-by-day plans', 'Explains how to get from A to B', 'Suggests nearby activities', 'Tracks budget and practical notes'],
    next: ['Add trip profile UI', 'Add itinerary schema', 'Add packing list', 'Add route/link storage', 'Add day planner']
  }
]

export function getCasterApp(slug: string) {
  return casterApps.find((app) => app.slug === slug)
}
