export const casterWidgets = [
  {
    id: 'ai-focus',
    title: 'AI Focus',
    area: 'core',
    description: 'Shows the most important next action across Caster OS.',
  },
  {
    id: 'goals',
    title: 'Goals',
    area: 'life',
    description: 'Tracks personal goals, project progress and milestones.',
  },
  {
    id: 'wealth-snapshot',
    title: 'Wealth Snapshot',
    area: 'wealth',
    description: 'Shows portfolio, savings and long-term financial direction.',
  },
  {
    id: 'gaming-signals',
    title: 'Gaming Signals',
    area: 'gaming',
    description: 'Summarizes Scorecaster opportunities and market movement.',
  },
  {
    id: 'wellbeing-state',
    title: 'Wellbeing State',
    area: 'health',
    description: 'Shows calm, recovery and clarity status.',
  },
]

export function getWidgetsByArea(area: string) {
  return casterWidgets.filter((widget) => widget.area === area)
}
