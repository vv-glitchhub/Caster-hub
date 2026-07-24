import { buildAutonomySnapshot, type AutonomyAction } from './autonomy-engine'
import { buildNotificationSnapshot } from './notification-center'

export type DailyBriefItem = {
  rank: number
  app: string
  title: string
  reason: string
  priority: AutonomyAction['priority']
  execution: AutonomyAction['execution']
  href: string
}

export type DailyCasterBrief = {
  generatedAt: string
  headline: string
  summary: string
  systemScore: number
  state: string
  onlineApps: number
  monitoredApps: number
  activeNotifications: number
  approvalRequired: number
  priorities: DailyBriefItem[]
  observations: string[]
  guardrails: string[]
}

function headlineFor(score: number, critical: number, high: number) {
  if (critical > 0) return 'Critical attention is required before expansion work.'
  if (score >= 85 && high === 0) return 'The Caster ecosystem is stable and ready for planned development.'
  if (score >= 65) return 'Core services are usable, with a small number of important follow-ups.'
  return 'The ecosystem needs focused stabilization before the next major release.'
}

export async function buildDailyCasterBrief(): Promise<DailyCasterBrief> {
  const [autonomy, notifications] = await Promise.all([
    buildAutonomySnapshot(),
    buildNotificationSnapshot(),
  ])

  const priorities = autonomy.actions
    .filter((action) => action.execution !== 'automatic' || action.priority !== 'low')
    .slice(0, 5)
    .map((action, index) => ({
      rank: index + 1,
      app: action.app,
      title: action.title,
      reason: action.detail,
      priority: action.priority,
      execution: action.execution,
      href: action.href,
    }))

  const observations = autonomy.apps.map((app) => {
    const readiness = app.totalServices > 0 ? `${app.readyServices}/${app.totalServices} services ready` : 'service readiness unknown'
    return `${app.name}: ${app.state}, ${readiness}. Next: ${app.nextStep}`
  })

  const headline = headlineFor(autonomy.score, notifications.critical, notifications.high)

  return {
    generatedAt: autonomy.generatedAt,
    headline,
    summary: `${autonomy.onlineApps} of ${autonomy.monitoredApps} monitored applications are online. ${notifications.total} operational notifications are visible, including ${notifications.approvalRequired} items that require explicit approval.`,
    systemScore: autonomy.score,
    state: autonomy.state,
    onlineApps: autonomy.onlineApps,
    monitoredApps: autonomy.monitoredApps,
    activeNotifications: notifications.total,
    approvalRequired: notifications.approvalRequired,
    priorities,
    observations,
    guardrails: [
      'The brief summarizes verified health and roadmap evidence; it does not invent external facts.',
      'Recommendations do not execute credentials, purchases, money movement, external messages or destructive changes.',
      'Scorecaster remains analysis, simulation and virtual paper tracking only.',
    ],
  }
}
