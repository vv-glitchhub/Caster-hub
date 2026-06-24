import MotionSurface from '../../components/MotionSurface'

const revenue = [
  ['Free', 'Public demo, basic dashboard and limited agent previews.'],
  ['Pro', 'Personal dashboards, saved memory, widget customization and advanced recommendations.'],
  ['Premium', 'Live intelligence, alerts, portfolio/risk analysis and deeper agent workflows.'],
  ['Business', 'Custom decision intelligence systems for teams, operators and creators.'],
]

const markets = [
  ['Personal AI', 'People want one intelligent place for life, money, health and planning.'],
  ['Finance', 'Stockcaster can grow into portfolio intelligence and market scouting.'],
  ['Sports', 'Scorecaster can support paper testing, analytics and responsible edge tracking.'],
  ['Wellbeing', 'Relaxcaster adds human state, clarity and control to the ecosystem.'],
]

const moat = [
  ['Context Graph', 'Caster becomes better when memory, profile, modules and actions connect.'],
  ['Product Ecosystem', 'Each module can stand alone but becomes stronger inside the OS.'],
  ['Decision Layer', 'The value is not raw data. The value is what to do next.'],
]

export default function BusinessPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Business</p>
          <h1 className="home-title">Build value.</h1>
          <h2 className="home-subtitle">Then monetize.</h2>
          <p className="home-lead">
            A business model view for turning Caster OS from a prototype into a premium AI decision intelligence platform.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/demo">Open Demo Flow</a>
            <a className="secondary-button" href="/pitch">Open Pitch</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Revenue Layers</p>
          <h2 className="section-title">The platform can grow from demo to subscriptions.</h2>
          <div className="home-module-grid">
            {revenue.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Revenue</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Markets</p>
          <h2 className="section-title">Caster OS starts personal, then expands by module.</h2>
          <div className="home-module-grid">
            {markets.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Market</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Moat</p>
          <h2 className="section-title">The defensibility comes from connected context.</h2>
          <div className="home-module-grid">
            {moat.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Moat</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
