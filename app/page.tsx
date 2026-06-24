import CommandCenter from '../components/CommandCenter'
import HomeExpansion from '../components/HomeExpansion'
import MotionSurface from '../components/MotionSurface'

const modules = [
  ['Dashboard', 'Command Center', 'Profile-aware widgets, memory and daily AI focus.', '/dashboard'],
  ['Agent', 'Caster AI', 'Context-aware recommendations for the next decision.', '/agent'],
  ['System', 'Health Center', 'Core status, product connections, memory and analytics readiness.', '/system'],
  ['Modules', 'OS Map', 'Full map of surfaces, products and shared intelligence layers.', '/modules'],
  ['Wealth', 'Stockcaster', 'Portfolio intelligence, risk and market signals.', '/wealth/stockcaster'],
  ['Gaming', 'Scorecaster', 'AI picks, odds movement and edge analysis.', '/gaming/scorecaster'],
  ['Health', 'Relaxcaster', 'Calm, clarity, recovery and daily rhythm.', '/health/relaxcaster'],
  ['Life', 'Lifecaster', 'Goals, projects, habits and future planning.', '/life'],
]

const highlights = [
  ['Dashboard 3.0', 'Personal command center'],
  ['Agent V1', 'Context and recommendations'],
  ['System Health', 'Core status layer'],
  ['Module Map', 'Full OS structure'],
]

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />

        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Prototype</p>
          <h1 className="home-title">One AI.</h1>
          <h2 className="home-subtitle">Every Decision.</h2>
          <p className="home-lead">
            A cinematic AI operating system prototype for life, wealth, health, gaming and personal decision intelligence.
          </p>

          <div className="home-highlight-grid">
            {highlights.map(([title, text]) => (
              <MotionSurface key={title} className="home-highlight-card">
                <p className="home-card-title">{title}</p>
                <p className="home-card-text">{text}</p>
              </MotionSurface>
            ))}
          </div>

          <div className="home-actions">
            <a className="primary-button" href="/dashboard">Open Prototype</a>
            <a className="secondary-button" href="/modules">View OS Map</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Unified Personal Intelligence</p>
          <h2 className="section-title">One ecosystem for decisions, goals, money, performance and recovery.</h2>
          <p className="home-section-lead">
            Caster OS is not a collection of disconnected pages. It is a prototype for a personal operating system where every module connects back to the same command layer.
          </p>

          <div className="home-module-grid">
            {modules.map(([name, label, text, href]) => (
              <MotionSurface key={name} href={href} className="home-module-card">
                <p className="home-module-label">{label}</p>
                <h3 className="home-module-title">{name}</h3>
                <p className="home-module-text">{text}</p>
                <p className="home-module-link">Open {name} →</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <HomeExpansion />

      <section className="home-section">
        <div className="home-core-grid home-container">
          <div>
            <p className="section-label">Caster Core</p>
            <h2 className="section-title">The intelligence layer connecting every area of life.</h2>
            <p className="home-section-lead">
              The prototype already includes profile selection, widget state, layout memory, focus logic and an agent recommendation layer.
            </p>
          </div>
          <CommandCenter />
        </div>
      </section>

      <section className="home-final">
        <div>
          <p className="section-label">Prototype Live</p>
          <h2 className="final-title">The next decision starts here.</h2>
          <p className="home-final-text">
            Open the dashboard, explore the modules and watch Caster OS evolve from concept into a real personal AI platform.
          </p>
          <a className="primary-button home-final-button" href="/dashboard">Launch Caster OS</a>
        </div>
      </section>
    </main>
  )
}
