import MotionSurface from '../../components/MotionSurface'

const demoSteps = [
  ['01', 'Start at Home', 'Show the premium OS identity and explain that Caster is one AI layer for decisions.', '/'],
  ['02', 'Open Dashboard', 'Show daily focus, widgets, memory, intelligence graphs and the command layer.', '/dashboard'],
  ['03', 'Ask Agent', 'Show how Caster AI turns context into next actions instead of acting like a generic chatbot.', '/agent'],
  ['04', 'System Health', 'Show that the platform already has core, memory, widgets, products and analytics status.', '/system'],
  ['05', 'Product Modules', 'Show Stockcaster, Scorecaster and Relaxcaster as connected product surfaces.', '/modules'],
  ['06', 'Roadmap', 'Show the path from prototype to live intelligence and autonomous agent actions.', '/roadmap'],
  ['07', 'Pitch', 'Close with the business story: problem, solution, edge and product pillars.', '/pitch'],
]

const proofPoints = [
  ['Platform', 'One shared OS shell across all pages.'],
  ['Agent', 'A decision interface connected to memory and context.'],
  ['Products', 'Wealth, gaming and health modules connected to shared core.'],
  ['Roadmap', 'Clear path toward accounts, memory, live data and safe actions.'],
]

export default function DemoPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Investor Demo Flow</p>
          <h1 className="home-title">Show.</h1>
          <h2 className="home-subtitle">The system.</h2>
          <p className="home-lead">
            A guided path for presenting Caster OS as a premium AI operating system prototype, not just a collection of pages.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/dashboard">Start Demo</a>
            <a className="secondary-button" href="/pitch">Open Pitch</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Demo Path</p>
          <h2 className="section-title">Present Caster OS in the right order.</h2>
          <div className="home-module-grid">
            {demoSteps.map(([step, title, text, href]) => (
              <MotionSurface key={step} href={href} className="home-module-card min-h-0">
                <p className="home-module-label">Step {step}</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
                <p className="home-module-link">Open →</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Proof Points</p>
          <h2 className="section-title">What the demo should prove.</h2>
          <div className="home-module-grid">
            {proofPoints.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Proof</p>
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
