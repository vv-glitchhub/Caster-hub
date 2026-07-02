import MotionSurface from '../../components/MotionSurface'

const apps = [
  {
    name: 'Scorecaster',
    repo: 'vv-glitchhub/scorecaster',
    local: 'http://localhost:3000/quick-use',
    route: '/quick-use',
    status: 'Manual bet slip ready',
    canUse: ['Add manual pick', 'Enter odds and stake', 'Test edge and confidence', 'See OK / CAUTION / SKIP', 'Save local slip in browser'],
    command: 'cd scorecaster && npm install && npm run dev'
  },
  {
    name: 'Stockcaster',
    repo: 'vv-glitchhub/Stockcaster-',
    local: 'http://localhost:3000/quick-use',
    route: '/quick-use',
    status: 'Local portfolio ready',
    canUse: ['Add holdings', 'Add watchlist items', 'See portfolio value', 'See P/L', 'See risk and concentration warnings'],
    command: 'cd Stockcaster- && npm install && npm run dev'
  },
  {
    name: 'Carcaster',
    repo: 'vv-glitchhub/Caster-hub',
    local: 'http://localhost:3000/apps/carcaster',
    route: '/apps/carcaster',
    status: 'Local car workspace ready',
    canUse: ['Add fault code', 'Add symptoms', 'Add service item', 'Add repair cost', 'Save locally in browser'],
    command: 'cd Caster-hub && npm install && npm run dev'
  },
  {
    name: 'Travelcaster',
    repo: 'vv-glitchhub/Caster-hub',
    local: 'http://localhost:3000/apps/travelcaster',
    route: '/apps/travelcaster',
    status: 'Local trip workspace ready',
    canUse: ['Add trip budget', 'Add activity or cost', 'Track planned spend', 'Track remaining budget', 'Save locally in browser'],
    command: 'cd Caster-hub && npm install && npm run dev'
  }
]

export default function QuickUseCenterPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster Quick Use Center</p>
          <h1 className="home-title">Use now.</h1>
          <h2 className="home-subtitle">All four apps.</h2>
          <p className="home-lead">
            This is the fastest control page for opening the usable local mode of every Caster app.
          </p>
          <div className="home-actions">
            <a className="primary-button" href="/start">Start</a>
            <a className="secondary-button" href="/modules">Modules</a>
            <a className="secondary-button" href="/dashboard">Dashboard</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Immediate Usage</p>
          <h2 className="section-title">Pick the app, run its repo, open the route.</h2>
          <div className="home-module-grid">
            {apps.map((app) => (
              <MotionSurface key={app.name} className="home-module-card">
                <p className="home-module-label">{app.status}</p>
                <h3 className="home-module-title">{app.name}</h3>
                <p className="home-module-text">Repo: {app.repo}</p>
                <p className="home-module-text">Route: {app.route}</p>
                <p className="home-module-link">{app.local}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">What Works Now</p>
          <h2 className="section-title">No account required yet.</h2>
          <div className="home-module-grid">
            {apps.map((app) => (
              <MotionSurface key={`${app.name}-works`} className="home-module-card">
                <p className="home-module-label">{app.name}</p>
                <h3 className="home-module-title">Usable now</h3>
                <p className="home-module-text">{app.canUse.join(' · ')}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Commands</p>
          <h2 className="section-title">Run locally.</h2>
          <div className="home-module-grid">
            {apps.map((app) => (
              <MotionSurface key={`${app.name}-command`} className="home-module-card min-h-0">
                <p className="home-module-label">{app.name}</p>
                <h3 className="home-module-title">Command</h3>
                <p className="home-module-text">{app.command}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
