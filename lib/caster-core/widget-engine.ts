export type WidgetSize = 'wide' | 'medium' | 'small'
export type WidgetArea = 'core' | 'life' | 'wealth' | 'gaming' | 'health' | 'utility'

export type DashboardWidget = {
  id: string
  title: string
  area: WidgetArea
  size: WidgetSize
  href?: string
  description: string
  items: string[]
}

export const dashboardWidgets: DashboardWidget[] = [
  {
    id: 'ai-focus',
    title: 'AI Focus',
    area: 'core',
    size: 'wide',
    href: '/agent',
    description: 'The most important next action across Caster OS.',
    items: ['Time aware', 'Priority aware', 'Connected to focus engine'],
  },
  {
    id: 'goals',
    title: 'Goals',
    area: 'life',
    size: 'medium',
    href: '/life',
    description: 'Personal targets and progress across life areas.',
    items: ['Caster OS Proto', 'Golf Progress', 'Wealth Goal'],
  },
  {
    id: 'projects',
    title: 'Projects',
    area: 'life',
    size: 'medium',
    href: '/life',
    description: 'Active execution board for building and planning.',
    items: ['Caster OS', 'Scorecaster', 'Stockcaster'],
  },
  {
    id: 'calendar',
    title: 'Calendar',
    area: 'utility',
    size: 'medium',
    description: 'Upcoming schedule and daily planning window.',
    items: ['Today overview', 'Next event', 'Focus block'],
  },
  {
    id: 'tasks',
    title: 'Tasks',
    area: 'life',
    size: 'medium',
    description: 'Immediate execution list for the current profile.',
    items: ['Build next feature', 'Validate deploy', 'Write recap'],
  },
  {
    id: 'notes',
    title: 'Notes',
    area: 'utility',
    size: 'small',
    description: 'Quick capture for ideas, decisions and reminders.',
    items: ['Idea inbox', 'Decision notes', 'Later list'],
  },
  {
    id: 'weather',
    title: 'Weather',
    area: 'utility',
    size: 'small',
    description: 'Local planning signal for the day.',
    items: ['Location later', 'Forecast later', 'Plan impact'],
  },
  {
    id: 'wealth',
    title: 'Wealth',
    area: 'wealth',
    size: 'small',
    href: '/wealth/stockcaster',
    description: 'Financial direction and portfolio snapshot.',
    items: ['Net worth', 'Monthly saving', 'Risk balance'],
  },
  {
    id: 'gaming',
    title: 'Gaming',
    area: 'gaming',
    size: 'small',
    href: '/gaming/scorecaster',
    description: 'Scorecaster signals and sports intelligence.',
    items: ['Top edge', 'Confidence', 'Live engine'],
  },
  {
    id: 'health',
    title: 'Health',
    area: 'health',
    size: 'small',
    href: '/health/relaxcaster',
    description: 'Energy, recovery and calm state.',
    items: ['Energy', 'Recovery', 'Reset'],
  },
]

export function getDashboardWidgets() {
  return dashboardWidgets
}

export function getWidgetById(id: string) {
  return dashboardWidgets.find((widget) => widget.id === id)
}
