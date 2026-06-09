const launchStats = [
  ['Status', 'Beta'],
  ['Public site', 'Live'],
  ['Analytics', 'Next'],
  ['Console', 'Active'],
]

const checklist = [
  'Review Home layout',
  'Review Dashboard experience',
  'Review Agent page',
  'Review Life, Wealth, Gaming and Health pages',
  'Connect visitor tracking',
  'Prepare launch link',
]

export default function AdminPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />

        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Console</p>
          <h1 className="home-title">Admin.</h1>
          <h2 className="home-subtitle">Launch Control.</h2>
          <p className="home-lead">
            Internal dashboard for launch readiness, visitor tracking status and Caster OS publishing progress.
          </p>

          <div className="home-highlight-grid">
            {launchStats.map(([label, value]) => (
              <div key={label} className="motion-surface home-highlight-card">
                <p className="home-card-title">{value}</p>
                <p className="home-card-text">{label}</p>
              </div>
            ))}
          </div>

          <div className="home-actions">
            <a className="primary-button" href="/">Open Public Site</a>
            <a className="secondary-button" href="/dashboard">Open Dashboard</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Launch Checklist</p>
          <h2 className="section-title">Publish when the public experience feels premium.</h2>
          <p className="home-section-lead">
            Use this console to keep track of what still needs review before sharing the project more widely.
          </p>

          <div className="home-module-grid">
            {checklist.map((item, index) => (
              <div key={item} className="motion-surface home-module-card">
                <p className="home-module-label">Step {index + 1}</p>
                <h3 className="home-module-title">{index < 4 ? 'Review' : 'Connect'}</h3>
                <p className="home-module-text">{item}</p>
                <p className="home-module-link">Launch prep</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
