import AutonomyRefresh from '../../components/AutonomyRefresh'
import MotionSurface from '../../components/MotionSurface'
import { buildNotificationSnapshot } from '../../lib/notification-center'

export const dynamic = 'force-dynamic'

function formatGeneratedAt(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(value))
}

export default async function NotificationCenterPage() {
  const snapshot = await buildNotificationSnapshot()

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster Shared Intelligence</p>
          <h1 className="home-title">Notifications.</h1>
          <h2 className="home-subtitle">{snapshot.total} current signals · {snapshot.approvalRequired} waiting for approval</h2>
          <p className="home-lead">
            One read-only inbox for health incidents, integration gaps, app-reported next steps and safe autonomous monitoring across the Caster ecosystem.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="#notification-feed">Open notification feed</a>
            <a className="secondary-button" href="/autonomy">Autonomy</a>
            <a className="secondary-button" href="/system">System Mesh</a>
            <a className="secondary-button" href="/api/notifications">Notifications JSON</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Live Notification State</p>
          <h2 className="section-title">Important changes rise above routine monitoring.</h2>
          <p className="home-section-lead">
            Snapshot generated {formatGeneratedAt(snapshot.generatedAt)} UTC. The page refreshes from the same verified health and autonomy sources used by Caster Hub.
          </p>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.critical}</p>
              <p className="home-card-text">Critical incidents</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.high}</p>
              <p className="home-card-text">High-priority signals</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.approvalRequired}</p>
              <p className="home-card-text">Approval-required actions</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.manual}</p>
              <p className="home-card-text">Manual recovery actions</p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Refresh Loop</p>
          <h2 className="section-title">The inbox follows live app readiness.</h2>
          <div className="home-module-grid">
            <AutonomyRefresh />
            <MotionSurface className="home-module-card min-h-0">
              <p className="home-module-label">Read-only by design</p>
              <h3 className="home-module-title">See first. Approve separately.</h3>
              <p className="home-module-text">
                Notifications may explain a problem and link to the correct workspace, but they cannot change credentials, migrations, user data or external systems.
              </p>
            </MotionSurface>
            <MotionSurface className="home-module-card min-h-0">
              <p className="home-module-label">Shared source</p>
              <h3 className="home-module-title">One truth layer.</h3>
              <p className="home-module-text">
                Notification severity comes from the same timeout, freshness, readiness and action-ranking rules used by the Autonomous Command Center.
              </p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section id="notification-feed" className="home-section">
        <div className="home-container">
          <p className="section-label">Notification Feed</p>
          <h2 className="section-title">Critical and approval-required items appear first.</h2>
          <div className="home-module-grid">
            {snapshot.notifications.map((notification, index) => (
              <MotionSurface key={notification.id} className="home-module-card min-h-0">
                <p className="home-module-label">
                  #{index + 1} · {notification.severity.toUpperCase()} · {notification.execution.replace('_', ' ').toUpperCase()}
                </p>
                <h3 className="home-module-title">{notification.title}</h3>
                <p className="home-module-text">{notification.source} · {notification.message}</p>
                <p className="home-module-text">
                  {notification.requiresApproval ? 'Explicit approval required before impact.' : 'Informational or manual follow-up.'}
                </p>
                <a className="secondary-button" href={notification.href}>Open source</a>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Notification Guardrails</p>
          <h2 className="section-title">A shared inbox must not become an execution shortcut.</h2>
          <div className="home-highlight-grid">
            {snapshot.guardrails.map((guardrail, index) => (
              <MotionSurface key={guardrail} className="home-highlight-card">
                <p className="home-card-title">Rule {index + 1}</p>
                <p className="home-card-text">{guardrail}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
