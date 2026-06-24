import MotionSurface from '../../components/MotionSurface'

const thesis = [
  ['Problem', 'People make decisions across money, health, goals and risk with scattered tools.'],
  ['Solution', 'Caster OS brings personal intelligence, modules, memory and an AI agent into one interface.'],
  ['Edge', 'The system connects data, context and behavior instead of showing disconnected dashboards.'],
]

const pillars = [
  ['Dashboard', 'One command center for daily focus and modules.'],
  ['Agent', 'One AI interface for the next best action.'],
  ['Memory', 'One context layer for preferences, goals and progress.'],
  ['Products', 'Wealth, Gaming, Health and Life connected to one OS.'],
  ['Core', 'Shared probability, risk, behavior and decision engines.'],
  ['Business', 'A premium AI platform that can grow into subscriptions and pro modules.'],
]

export default function PitchPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Pitch</p>
          <h1 className="home-title">Personal AI.</h1>
          <h2 className="home-subtitle">Operating System.</h2>
          <p className="home-lead">
            Caster OS is a premium decision intelligence platform that connects personal context, AI agents and focused modules into one operating layer.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/dashboard">Open Demo</a>
            <a className="secondary-button" href="/roadmap">View Roadmap</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Pitch Summary</p>
          <h2 className="section-title">One AI layer for the decisions that matter.</h2>
          <div className="home-module-grid">
            {thesis.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Caster OS</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Product Pillars</p>
          <h2 className="section-title">The platform is designed as a product ecosystem.</h2>
          <div className="home-module-grid">
            {pillars.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Pillar</p>
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
