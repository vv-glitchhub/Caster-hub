import CasterProcess from '../components/CasterProcess'
import CinematicHero from '../components/CinematicHero'
import CinematicReveal from '../components/CinematicReveal'
import CommandCenter from '../components/CommandCenter'
import HomeExpansion from '../components/HomeExpansion'
import MotionSurface from '../components/MotionSurface'
import SignalRibbon from '../components/SignalRibbon'

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

export default function Home() {
  return (
    <main className="home-page">
      <CinematicHero />

      <SignalRibbon />
      <CinematicReveal />
      <CasterProcess />

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Unified Intelligence Ecosystem</p>
          <h2 className="section-title">One operating layer for goals, money, performance and recovery.</h2>
          <p className="home-section-lead">
            Caster OS is not a set of disconnected pages. It is a premium product experience where every module connects back to the same agent, memory and command layer.
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
              The public alpha already includes profile selection, widget state, layout memory, focus logic and an agent recommendation layer.
            </p>
          </div>
          <CommandCenter />
        </div>
      </section>

      <section className="home-final">
        <div>
          <p className="section-label">Public Alpha Live</p>
          <h2 className="final-title">Start with the demo flow.</h2>
          <p className="home-final-text">
            The public presentation should move from the story into the dashboard, agent, modules, pitch and business layer.
          </p>
          <a className="primary-button home-final-button" href="/demo">Run Caster Demo</a>
        </div>
      </section>
    </main>
  )
}
