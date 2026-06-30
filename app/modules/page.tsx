import MotionSurface from '../../components/MotionSurface'
import { casterApps } from '../../lib/caster-apps'

const systemModules = [
  ['Dashboard', 'Command center for focus, widgets, memory and daily actions.', '/dashboard', 'Control'],
  ['Agent', 'Decision interface for recommendations, context and next actions.', '/agent', 'AI'],
  ['System', 'Health view for core, memory, widgets, products and analytics.', '/system', 'Status'],
  ['Life', 'Goals, projects, habits and future planning.', '/life', 'Planning'],
  ['Relaxcaster', 'Calm, recovery and clarity for human decision control.', '/health/relaxcaster', 'Human'],
]

const layers = [
  ['Shell', 'Navigation, quick rail, OS status bar and AI access.'],
  ['Core', 'Probability, risk, decision and behavior engines.'],
  ['Memory', 'Profile, goals, preferences and activity context.'],
  ['Products', 'Scorecaster, Stockcaster, Carcaster and Travelcaster connected to one layer.'],
]

export default function ModulesPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Map</p>
          <h1 className="home-title">Modules.</h1>
          <h2 className="home-subtitle">One system.</h2>
          <p className="home-lead">
            A full map of the operating system: dashboard, agent, system health, focused apps and shared intelligence layers.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/dashboard">Open Dashboard</a>
            <a className="secondary-button" href="/system">System Health</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Caster Apps</p>
          <h2 className="section-title">The ecosystem starts with four focused products.</h2>
          <div className="home-module-grid">
            {casterApps.map((app) => (
              <MotionSurface key={app.slug} href={app.href} className="home-module-card">
                <p className="home-module-label">{app.status}</p>
                <h3 className="home-module-title">{app.name}</h3>
                <p className="home-module-text">{app.summary}</p>
                <p className="home-module-link">Open {app.name} →</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">System Surfaces</p>
          <h2 className="section-title">Every module has a role in the OS.</h2>
          <div className="home-module-grid">
            {systemModules.map(([name, text, href, label]) => (
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
          <p className="section-label">Shared Layers</p>
          <h2 className="section-title">The platform is bigger than individual pages.</h2>
          <div className="home-module-grid">
            {layers.map(([name, text]) => (
              <MotionSurface key={name} className="home-module-card min-h-0">
                <p className="home-module-label">Caster OS</p>
                <h3 className="home-module-title">{name}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
