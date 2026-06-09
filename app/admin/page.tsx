const launchStats = [
  ['Status', 'Beta'],
  ['Public site', 'Live'],
  ['Analytics', 'Active'],
  ['Console', 'Ready'],
]

const analyticsCards = [
  ['Visitor tracking', 'Vercel Analytics is installed through the root layout.'],
  ['Where to view', 'Open the Vercel project and check Analytics after deployment.'],
  ['Privacy', 'Public visitors do not see this console link in the main experience.'],
  ['Next step', 'Connect Supabase for your own deeper event and memory layer.'],
]

const checklist = [
  'Review Home layout',
  'Review Dashboard experience',
  'Review Agent page',
  'Review Life, Wealth, Gaming and Health pages',
  'Confirm Vercel Analytics is receiving visitors',
  'Prepare launch link and screenshots',
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
            Internal console for launch readiness, analytics status and the next production steps for Caster OS.
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
          <p className="section-label">Analytics</p>
          <h2 className="section-title">Visitor tracking is ready after deploy.</h2>
          <p className="home-section-lead">
            The analytics package is installed and loaded globally. After the next Vercel deployment, visits should appear in the Vercel Analytics dashboard.
          </p>

          <div className="home-module-grid">
            {analyticsCards.map(([title, text]) => (
              <div key={title} className="motion-surface home-module-card">
                <p className="home-module-label">Admin</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
                <p className="home-module-link">Analytics status</p>
              </div>
            ))}
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
                <h3 className="home-module-title">{index < 4 ? 'Review' : 'Launch'}</h3>
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
