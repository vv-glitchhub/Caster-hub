export const casterModules = [
  {
    id: 'scorecaster',
    name: 'Scorecaster',
    category: 'Gaming & Strategy',
    path: '/gaming/scorecaster',
    liveUrl: 'https://scorecaster.vercel.app',
    status: 'integrated-portal',
    description:
      'Sports intelligence, odds analysis, AI picks, paper trading, tracking and risk control.',
    systems: ['Agent V9', 'Betting Workspace', 'Analytics', 'Paper Trading', 'Tracking'],
  },
  {
    id: 'stockcaster',
    name: 'Stockcaster',
    category: 'Wealth',
    path: '/wealth/stockcaster',
    status: 'planned',
    description:
      'Portfolio intelligence, market analysis, watchlists, macro signals and financial decision support.',
    systems: ['Portfolio', 'Market Signals', 'News Quality', 'Risk Engine'],
  },
  {
    id: 'relaxcaster',
    name: 'Relaxcaster',
    category: 'Health',
    path: '/health/relaxcaster',
    status: 'planned',
    description:
      'Stress control, clarity mode, calm decisions, impulse protection and recovery support.',
    systems: ['Calm Mode', 'Clarity Mode', 'Impulse Shield', 'Recovery'],
  },
]

export function getCasterModule(id: string) {
  return casterModules.find((module) => module.id === id)
}
