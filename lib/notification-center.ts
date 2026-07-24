import { buildAutonomySnapshot, type ActionPriority, type AutonomyAction } from './autonomy-engine'

export type NotificationSeverity = 'critical' | 'high' | 'medium' | 'low'
export type NotificationState = 'active' | 'informational'

export type CasterNotification = {
  id: string
  source: string
  title: string
  message: string
  severity: NotificationSeverity
  state: NotificationState
  requiresApproval: boolean
  execution: AutonomyAction['execution']
  href: string
  generatedAt: string
}

export type NotificationSnapshot = {
  generatedAt: string
  total: number
  critical: number
  high: number
  approvalRequired: number
  manual: number
  notifications: CasterNotification[]
  guardrails: string[]
}

const severityWeight: Record<ActionPriority, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

function actionToNotification(action: AutonomyAction, generatedAt: string): CasterNotification {
  const informational = action.execution === 'automatic' && action.priority === 'low'

  return {
    id: action.id,
    source: action.app,
    title: action.title,
    message: action.detail,
    severity: action.priority,
    state: informational ? 'informational' : 'active',
    requiresApproval: action.execution === 'approval_required',
    execution: action.execution,
    href: action.href,
    generatedAt,
  }
}

export async function buildNotificationSnapshot(): Promise<NotificationSnapshot> {
  const autonomy = await buildAutonomySnapshot()
  const notifications = autonomy.actions
    .map((action) => actionToNotification(action, autonomy.generatedAt))
    .sort((a, b) => {
      const severityDifference = severityWeight[b.severity] - severityWeight[a.severity]
      if (severityDifference !== 0) return severityDifference
      if (a.requiresApproval !== b.requiresApproval) return a.requiresApproval ? -1 : 1
      return a.source.localeCompare(b.source)
    })

  return {
    generatedAt: autonomy.generatedAt,
    total: notifications.length,
    critical: notifications.filter((notification) => notification.severity === 'critical').length,
    high: notifications.filter((notification) => notification.severity === 'high').length,
    approvalRequired: notifications.filter((notification) => notification.requiresApproval).length,
    manual: notifications.filter((notification) => notification.execution === 'manual').length,
    notifications,
    guardrails: [
      'Notification Center is read-only and cannot change credentials, databases or external services.',
      'Approval-required items remain recommendations until a user explicitly performs the action.',
      'Unavailable health data is shown as an active warning instead of being treated as healthy.',
      'No financial transaction, purchase, message or destructive operation is executed from this view.',
    ],
  }
}
