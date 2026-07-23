import AutonomyRefresh from '../../components/AutonomyRefresh'
import MotionSurface from '../../components/MotionSurface'
import { buildAutonomySnapshot } from '../../lib/autonomy-engine'

export const dynamic = 'force-dynamic'

function formatGeneratedAt(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(value))
}

export default async function AutonomyPage() {
  const snapshot = await buildAutonomySnapshot()

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster Autonomous Command</p>
          <h1 className="home-title">Autonomy.</h1>
          <h2 className="home-subtitle">{snapshot.score}/100 · {snapshot.state.toUpperCase()}</h2>
          <p className="home-lead">
            Caster continuously observes connected apps, detects degraded states, ranks the next work and keeps high-impact actions behind explicit approval.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="#action-queue">Open Action Queue</a>
            <a className="secondary-button" href="/dashboard">Dashboard</a>
            <a className="secondary-button" href="/system">System Mesh</a>
            <a className="secondary-button" href="/api/autonomy">Autonomy JSON</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Live Autonomous State</p>
          <h2 className="section-title">One ranked view instead of four disconnected apps.</h2>
          <p className="home-section-lead">
            Snapshot generated {formatGeneratedAt(snapshot.generatedAt)} UTC. Automatic monitoring remains active even when an external health endpoint is unavailable.
          </p>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.onlineApps}/{snapshot.monitoredApps}</p>
              <p className="home-card-text">Production apps online / all monitored surfaces</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.automaticActions}</p>
              <p className="home-card-text">Safe automatic actions</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.approvalActions}</p>
              <p className="home-card-text">Actions waiting for approval</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.manualActions}</p>
              <p className="home-card-text">Manual recovery actions</p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Control Loop</p>
          <h2 className="section-title">Observe. Verify. Prioritize. Ask before impact.</h2>
          <div className="home-module-grid">
            <AutonomyRefresh />
            <MotionSurface className="home-module-card min-h-0">
              <p className="home-module-label">Decision Engine</p>
              <h3 className="home-module-title">Priority before activity.</h3>
              <p className="home-module-text">
                Critical outages rise first, production next steps come second and optional integrations stay below usable core functions.
              </p>
            </MotionSurface>
            <MotionSurface className="home-module-card min-h-0">
              <p className="home-module-label">Approval Gate</p>
              <h3 className="home-module-title">Autonomous, not reckless.</h3>
              <p className="home-module-text">
                Caster may monitor and organize automatically. Credentials, external writes, money and destructive actions always stay under user control.
              </p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">App Mesh</p>
          <h2 className="section-title">Every Caster product has a visible operating state.</h2>
          <div className="home-module-grid">
            {snapshot.apps.map((app) => (
              <MotionSurface key={app.slug} className="home-module-card min-h-0">
                <p className="home-module-label">{app.state.toUpperCase()} · {app.mode}</p>
                <h3 className="home-module-title">{app.name}</h3>
                <p className="home-module-text">{app.role}</p>
                <p className="home-module-text">
                  Services: {app.readyServices}/{app.totalServices || 'unknown'} · Deployment: {app.deployment} · Commit: {app.commit ? app.commit.slice(0, 8) : 'local / unknown'}
                </p>
                <p className="home-module-text">Next: {app.nextStep}</p>
                <div className="home-actions">
                  <a className="primary-button" href={app.appUrl}>Open {app.name}</a>
                  {app.healthUrl ? <a className="secondary-button" href={app.healthUrl}>Health JSON</a> : null}
                </div>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section id="action-queue" className="home-section">
        <div className="home-container">
          <p className="section-label">Ranked Action Queue</p>
          <h2 className="section-title">The most important work is always first.</h2>
          <div className="home-module-grid">
            {snapshot.actions.map((action, index) => (
              <MotionSurface key={action.id} className="home-module-card min-h-0">
                <p className="home-module-label">
                  #{index + 1} · {action.priority.toUpperCase()} · {action.execution.replace('_', ' ').toUpperCase()}
                </p>
                <h3 className="home-module-title">{action.title}</h3>
                <p className="home-module-text">{action.app} · {action.detail}</p>
                <a className="secondary-button" href={action.href}>Open action</a>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Autonomy Guardrails</p>
          <h2 className="section-title">The best autonomous system knows when not to act.</h2>
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
