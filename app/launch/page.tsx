import MotionSurface from '../../components/MotionSurface'

const checklist = [
  ['Product story', 'Home, demo, pitch, business and pricing pages are connected.'],
  ['Core experience', 'Dashboard, agent, system health and modules map are available.'],
  ['Product modules', 'Stockcaster, Scorecaster and Relaxcaster are connected to the shared OS layer.'],
  ['Trust layer', 'Privacy and disclaimer pages are present for responsible launch communication.'],
  ['Technical basics', 'Metadata, manifest, app icon, sitemap, loading screen and 404 page are included.'],
  ['Next production step', 'Connect accounts, Supabase memory, saved layouts and real data sources.'],
]

const releaseNotes = [
  ['Alpha', 'Caster OS is ready for private demo and feedback.'],
  ['Public preview', 'Polish copy, mobile navigation, screenshots and live demo flow.'],
  ['Beta', 'Add accounts, persistence, real agent actions and product integrations.'],
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
          <h1 className="home-title">Ready.</h1>
          <h2 className="home-subtitle">For demo.</h2>
          <p className="home-lead">
            A launch-readiness view for checking that the product, trust, business and technical basics are in place before sharing Caster OS.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/demo">Run Demo Flow</a>
            <a className="secondary-button" href="/pitch">Open Pitch</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Checklist</p>
          <h2 className="section-title">What is now ready for a private launch.</h2>
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
          <h2 className="section-title">The next launch stages are clear.</h2>
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
