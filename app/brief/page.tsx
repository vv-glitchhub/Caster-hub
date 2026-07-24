import MotionSurface from '../../components/MotionSurface'
import { buildDailyCasterBrief } from '../../lib/daily-brief'

export const dynamic = 'force-dynamic'

function formatGeneratedAt(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(new Date(value))
}

export default async function BriefPage() {
  const brief = await buildDailyCasterBrief()

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster Daily Intelligence</p>
          <h1 className="home-title">Daily Brief.</h1>
          <h2 className="home-subtitle">{brief.systemScore}/100 · {brief.state.toUpperCase()}</h2>
          <p className="home-lead">{brief.headline}</p>
          <div className="home-actions">
            <a className="primary-button" href="#priorities">Open priorities</a>
            <a className="secondary-button" href="/notifications">Notifications</a>
            <a className="secondary-button" href="/autonomy">Autonomy</a>
            <a className="secondary-button" href="/api/brief">Brief JSON</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Today at a glance</p>
          <h2 className="section-title">One summary across the Caster ecosystem.</h2>
          <p className="home-section-lead">
            Generated {formatGeneratedAt(brief.generatedAt)} UTC. {brief.summary}
          </p>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{brief.onlineApps}/{brief.monitoredApps}</p>
              <p className="home-card-text">Applications online</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{brief.activeNotifications}</p>
              <p className="home-card-text">Operational notifications</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{brief.approvalRequired}</p>
              <p className="home-card-text">Items waiting for approval</p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section id="priorities" className="home-section">
        <div className="home-container">
          <p className="section-label">Top priorities</p>
          <h2 className="section-title">Work on the highest-impact issue first.</h2>
          <div className="home-module-grid">
            {brief.priorities.length > 0 ? brief.priorities.map((item) => (
              <MotionSurface key={`${item.rank}-${item.app}-${item.title}`} className="home-module-card min-h-0">
                <p className="home-module-label">
                  #{item.rank} · {item.priority.toUpperCase()} · {item.execution.replace('_', ' ').toUpperCase()}
                </p>
                <h3 className="home-module-title">{item.title}</h3>
                <p className="home-module-text">{item.app} · {item.reason}</p>
                <a className="secondary-button" href={item.href}>Open priority</a>
              </MotionSurface>
            )) : (
              <MotionSurface className="home-module-card min-h-0">
                <p className="home-module-label">NO BLOCKERS</p>
                <h3 className="home-module-title">Continue planned development.</h3>
                <p className="home-module-text">No high-impact manual or approval-required actions were reported.</p>
              </MotionSurface>
            )}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Application observations</p>
          <h2 className="section-title">Current evidence from each product.</h2>
          <div className="home-module-grid">
            {brief.observations.map((observation) => (
              <MotionSurface key={observation} className="home-module-card min-h-0">
                <p className="home-module-text">{observation}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Brief guardrails</p>
          <h2 className="section-title">A useful summary without unsafe execution.</h2>
          <div className="home-highlight-grid">
            {brief.guardrails.map((guardrail, index) => (
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
