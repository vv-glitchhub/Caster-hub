import MotionSurface from '../../components/MotionSurface'

const checklist = [
  ['Product story', 'Home, demo, pitch, business and pricing pages are connected.'],
  ['Core experience', 'Dashboard, agent, system health and modules map are available.'],
  ['Product modules', 'Stockcaster, Scorecaster and Relaxcaster are connected to the shared OS layer.'],
  ['Trust layer', 'Privacy, terms and disclaimer pages are present for responsible public communication.'],
  ['Technical basics', 'Metadata, manifest, app icon, sitemap, robots, loading screen and 404 page are included.'],
  ['Public preview', 'Caster OS is ready to share as an alpha product demo while production accounts and live data are built.'],
]

const releaseNotes = [
  ['Public Alpha', 'Caster OS is ready for public preview, product feedback and early business conversations.'],
  ['Beta', 'Add accounts, persistent memory, saved layouts, real integrations and safer agent actions.'],
  ['Production', 'Connect billing, onboarding, live product data, user settings and fully tested workflows.'],
]

export default function LaunchPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Launch</p>
          <h1 className="home-title">Public.</h1>
          <h2 className="home-subtitle">Alpha.</h2>
          <p className="home-lead">
            Caster OS is ready to share as a public alpha: a premium AI operating system prototype for decisions, markets, personal intelligence and focused action.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/demo">Run Demo Flow</a>
            <a className="secondary-button" href="/pitch">Open Pitch</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Public Launch Checklist</p>
          <h2 className="section-title">The prototype is ready for public preview.</h2>
          <div className="home-module-grid">
            {checklist.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Ready</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Release Notes</p>
          <h2 className="section-title">The launch stage is now public alpha.</h2>
          <div className="home-module-grid">
            {releaseNotes.map(([title, text]) => (
              <MotionSurface key={title} className="home-module-card min-h-0">
                <p className="home-module-label">Stage</p>
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
