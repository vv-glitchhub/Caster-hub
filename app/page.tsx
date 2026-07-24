import CasterProcess from '../components/CasterProcess'
import CinematicHero from '../components/CinematicHero'
import CinematicReveal from '../components/CinematicReveal'
import CommandCenter from '../components/CommandCenter'
import HomeExpansion from '../components/HomeExpansion'
import MotionSurface from '../components/MotionSurface'
import SignalRibbon from '../components/SignalRibbon'
import { casterApps } from '../lib/caster-apps'

const systemModules = [
  ['Dashboard', 'Command Center', 'Profile-aware widgets, memory and daily AI focus.', '/dashboard'],
  ['Autonomy', 'Autonomous Core', 'Live app health, readiness scoring and a ranked action queue with approval gates.', '/autonomy'],
  ['Agent', 'Caster AI', 'Context-aware recommendations for the next decision.', '/agent'],
  ['System', 'Health Center', 'Core status, product connections, memory and analytics readiness.', '/system'],
  ['Modules', 'OS Map', 'Full map of surfaces, products and shared intelligence layers.', '/modules'],
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
          <h2 className="section-title">One operating layer for sports, markets, cars and travel.</h2>
          <p className="home-section-lead">
            Caster OS is not a set of disconnected pages. It is a premium product experience where every app connects back to the same agent, memory, autonomous control and command layer.
          </p>

          <div className="home-module-grid">
            {systemModules.map(([name, label, text, href]) => (
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

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Caster Apps</p>
          <h2 className="section-title">Four focused products. One shared intelligence core.</h2>
          <div className="home-module-grid">
            {casterApps.map((app) => (
              <MotionSurface key={app.slug} href={app.href} className="home-module-card">
                <p className="home-module-label">{app.label}</p>
                <h3 className="home-module-title">{app.name}</h3>
                <p className="home-module-text">{app.summary}</p>
                <p className="home-module-link">Open {app.name} →</p>
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
              The public alpha includes profile selection, widget state, layout memory, focus logic, agent recommendations and a safe autonomous control loop.
            </p>
          </div>
          <CommandCenter />
        </div>
      </section>

      <section className="home-final">
        <div>
          <p className="section-label">Autonomous Public Alpha</p>
          <h2 className="final-title">Open the live command center.</h2>
          <p className="home-final-text">
            Start with the autonomous view to see app health, the readiness score and the next ranked actions across the Caster ecosystem.
          </p>
          <a className="primary-button home-final-button" href="/autonomy">Open Autonomy</a>
        </div>
      </section>
    </main>
  )
}
