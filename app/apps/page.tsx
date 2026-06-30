import MotionSurface from '../../components/MotionSurface'

const apps = [
  ['Lifecaster', 'Life OS', 'Goals, projects, habits and daily direction.', '/apps/lifecaster'],
  ['Stockcaster', 'Wealth OS', 'Portfolio clarity, risk and market direction.', '/wealth/stockcaster'],
  ['Scorecaster', 'Gaming OS', 'Edge tracking, signals and responsible analysis.', '/gaming/scorecaster'],
  ['Relaxcaster', 'Health OS', 'Calm, recovery, clarity and control.', '/health/relaxcaster'],
]

export default function AppsPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster App Store</p>
          <h1 className="home-title">Apps.</h1>
          <h2 className="home-subtitle">One intelligence layer.</h2>
          <p className="home-lead">
            Caster apps are focused operating surfaces. Each app solves one area of life, but all connect back to the same dashboard, memory and agent.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/apps/lifecaster">Open Lifecaster</a>
            <a className="secondary-button" href="/dashboard">Open Dashboard</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Applications</p>
          <h2 className="section-title">Start with apps that create daily value.</h2>
          <div className="home-module-grid">
            {apps.map(([name, label, text, href]) => (
              <MotionSurface key={name} href={href} className="home-module-card min-h-0">
                <p className="home-module-label">{label}</p>
                <h3 className="home-module-title">{name}</h3>
                <p className="home-module-text">{text}</p>
                <p className="home-module-link">Open app →</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
