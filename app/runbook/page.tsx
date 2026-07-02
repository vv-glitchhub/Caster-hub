import MotionSurface from '../../components/MotionSurface'

const apps = [
  {
    name: 'Caster-hub',
    repo: 'vv-glitchhub/Caster-hub',
    command: 'npm install && npm run dev',
    open: 'http://localhost:3000/start',
    ready: ['Start page', 'Quick Use Center', 'Backup page', 'Carcaster local forms', 'Travelcaster local forms'],
    next: ['Supabase auth', 'Shared user profile', 'Cloud sync', 'Production deployment check']
  },
  {
    name: 'Scorecaster',
    repo: 'vv-glitchhub/scorecaster',
    command: 'npm install && npm run dev',
    open: 'http://localhost:3000/quick-use',
    ready: ['Manual pick input', 'Local bet slip', 'Stake and odds fields', 'OK / CAUTION / SKIP risk decision'],
    next: ['Connect live odds', 'Persist bet slip', 'Daily Top 3', 'CLV tracking']
  },
  {
    name: 'Stockcaster',
    repo: 'vv-glitchhub/Stockcaster-',
    command: 'npm install && npm run dev',
    open: 'http://localhost:3000/quick-use',
    ready: ['Local holdings', 'Local watchlist', 'Portfolio value', 'P/L', 'Risk label'],
    next: ['Live market data', 'Persistent portfolio', 'News feed', 'AI market brief']
  },
  {
    name: 'Carcaster',
    repo: 'vv-glitchhub/Caster-hub',
    command: 'npm install && npm run dev',
    open: 'http://localhost:3000/apps/carcaster',
    ready: ['Fault input', 'Service input', 'Cost summary', 'P2177 demo logic', 'Maintenance workspace'],
    next: ['Car profile editor', 'Fault history database', 'Fuel log', 'Reminder system']
  },
  {
    name: 'Travelcaster',
    repo: 'vv-glitchhub/Caster-hub',
    command: 'npm install && npm run dev',
    open: 'http://localhost:3000/apps/travelcaster',
    ready: ['Trip budget', 'Trip item input', 'Planned spend', 'Remaining budget', 'Itinerary workspace'],
    next: ['Trip database', 'Saved places', 'Packing checklist state', 'Route links']
  }
]

const checks = [
  'Run npm install in the repo folder.',
  'Run npm run dev.',
  'Open the listed URL.',
  'Add at least one local item.',
  'Open /backup in Caster-hub and copy a backup JSON.',
  'Refresh browser and confirm saved local data appears again.'
]

export default function RunbookPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster Runbook</p>
          <h1 className="home-title">Runbook</h1>
          <h2 className="home-subtitle">Start, test, backup.</h2>
          <p className="home-lead">A practical local operations page for using the Caster apps during MVP development.</p>
          <div className="home-actions">
            <a className="primary-button" href="/quick-use">Quick Use</a>
            <a className="secondary-button" href="/backup">Backup</a>
            <a className="secondary-button" href="/start">Start</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Apps</p>
          <h2 className="section-title">Local run commands.</h2>
          <div className="home-module-grid">
            {apps.map((app) => (
              <MotionSurface key={app.name} className="home-module-card">
                <p className="home-module-label">{app.repo}</p>
                <h3 className="home-module-title">{app.name}</h3>
                <p className="home-module-text">Command: {app.command}</p>
                <p className="home-module-text">Open: {app.open}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Ready Now</p>
          <h2 className="section-title">What can be used today.</h2>
          <div className="home-module-grid">
            {apps.map((app) => (
              <MotionSurface key={`${app.name}-ready`} className="home-module-card min-h-0">
                <p className="home-module-label">{app.name}</p>
                <h3 className="home-module-title">Ready</h3>
                <p className="home-module-text">{app.ready.join(' · ')}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Next Build</p>
          <h2 className="section-title">What still needs production work.</h2>
          <div className="home-module-grid">
            {apps.map((app) => (
              <MotionSurface key={`${app.name}-next`} className="home-module-card min-h-0">
                <p className="home-module-label">{app.name}</p>
                <h3 className="home-module-title">Next</h3>
                <p className="home-module-text">{app.next.join(' · ')}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Smoke Test</p>
          <h2 className="section-title">Use this checklist after each change.</h2>
          <div className="home-highlight-grid">
            {checks.map((check, index) => (
              <MotionSurface key={check} className="home-highlight-card">
                <p className="home-card-title">Step {index + 1}</p>
                <p className="home-card-text">{check}</p>
              </MotionSurface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
