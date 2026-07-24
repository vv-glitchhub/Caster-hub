import MotionSurface from '../../components/MotionSurface'
import { buildProductionReadiness } from '../../lib/production-readiness'

export const dynamic = 'force-dynamic'

export default function ProductionReadinessPage() {
  const snapshot = buildProductionReadiness()

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster Production Activation</p>
          <h1 className="home-title">Readiness.</h1>
          <h2 className="home-subtitle">{snapshot.ready}/{snapshot.total} checks ready</h2>
          <p className="home-lead">
            One truthful activation checklist for identity, database, privacy and environment configuration. Missing infrastructure stays visible instead of being marked complete.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="#checks">Open checks</a>
            <a className="secondary-button" href="/release-center">Release Center</a>
            <a className="secondary-button" href="/api/production-readiness">Readiness JSON</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Activation State</p>
          <h2 className="section-title">Production remains blocked until every security gate is verified.</h2>
          <div className="home-highlight-grid">
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.ready}</p>
              <p className="home-card-text">Ready checks</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.blocked}</p>
              <p className="home-card-text">Verification blockers</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.missing}</p>
              <p className="home-card-text">Missing environment values</p>
            </MotionSurface>
            <MotionSurface className="home-highlight-card">
              <p className="home-card-title">{snapshot.status.toUpperCase()}</p>
              <p className="home-card-text">Overall activation state</p>
            </MotionSurface>
          </div>
        </div>
      </section>

      <section id="checks" className="home-section">
        <div className="home-container">
          <p className="section-label">Verified Checklist</p>
          <h2 className="section-title">Every blocker has one concrete next action.</h2>
          <div className="home-module-grid">
            {snapshot.checks.map((check, index) => (
              <MotionSurface key={check.id} className="home-module-card min-h-0">
                <p className="home-module-label">#{index + 1} · {check.area.toUpperCase()} · {check.status.toUpperCase()}</p>
                <h3 className="home-module-title">{check.title}</h3>
                <p className="home-module-text">{check.detail}</p>
                <p className="home-module-text"><strong>Next:</strong> {check.nextAction}</p>
                {check.environmentVariable ? (
                  <p className="home-module-text">Signal: <code>{check.environmentVariable}</code></p>
                ) : null}
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Guardrails</p>
          <h2 className="section-title">Activation tooling reports and verifies; it does not improvise.</h2>
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
