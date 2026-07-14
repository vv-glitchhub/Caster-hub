export const dynamic = 'force-dynamic'

const SCORECASTER_URL = 'https://scorecaster.vercel.app'

type ScorecasterHealth = {
  app?: string
  status?: string
  mode?: string
  deployment?: string
  commit?: string | null
  services?: Record<string, boolean | string>
  nextStep?: string
  timestamp?: string
}

async function loadHealth(): Promise<{ health: ScorecasterHealth | null; error: string | null }> {
  try {
    const response = await fetch(`${SCORECASTER_URL}/api/health`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    })

    if (!response.ok) {
      return { health: null, error: `Health API returned ${response.status}` }
    }

    return { health: await response.json(), error: null }
  } catch (error) {
    return {
      health: null,
      error: error instanceof Error ? error.message : 'Scorecaster health API could not be reached'
    }
  }
}

export default async function ScorecasterStatusPage() {
  const { health, error } = await loadHealth()
  const services = health?.services ? Object.entries(health.services) : []
  const online = health?.status === 'ok'

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Live Service Connection</p>
          <h1 className="home-title">Scorecaster Status</h1>
          <h2 className="home-subtitle">{online ? 'Production service online' : 'Service requires attention'}</h2>
          <p className="home-lead">
            Caster Hub reads Scorecaster&apos;s production health endpoint directly. This confirms whether the live app, account layer and Cloud Sync code are deployed.
          </p>
          <div className="home-actions">
            <a className="primary-button" href={SCORECASTER_URL} target="_blank" rel="noreferrer">Open Scorecaster</a>
            <a className="secondary-button" href={`${SCORECASTER_URL}/profile`} target="_blank" rel="noreferrer">Account</a>
            <a className="secondary-button" href={`${SCORECASTER_URL}/cloud-sync`} target="_blank" rel="noreferrer">Cloud Sync</a>
            <a className="secondary-button" href={`${SCORECASTER_URL}/api/health`} target="_blank" rel="noreferrer">Raw Health JSON</a>
            <a className="secondary-button" href="/apps/scorecaster">Back to Scorecaster</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Production Snapshot</p>
          <h2 className="section-title">Live state from the deployed Scorecaster service.</h2>

          {error ? (
            <div className="home-module-card">
              <p className="home-module-label">Connection Error</p>
              <h3 className="home-module-title">Health API unavailable</h3>
              <p className="home-module-text">{error}</p>
            </div>
          ) : (
            <div className="home-highlight-grid">
              <StatusCard label="Health" value={health?.status || 'unknown'} />
              <StatusCard label="Mode" value={health?.mode || 'unknown'} />
              <StatusCard label="Deployment" value={health?.deployment || 'unknown'} />
              <StatusCard label="Commit" value={health?.commit?.slice(0, 8) || 'unknown'} />
            </div>
          )}
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Service Layer</p>
          <h2 className="section-title">Scorecaster capabilities reported by the live app.</h2>
          <div className="home-module-grid">
            {services.length ? services.map(([name, value]) => (
              <div key={name} className="home-module-card min-h-0">
                <p className="home-module-label">Service</p>
                <h3 className="home-module-title">{formatName(name)}</h3>
                <p className="home-module-text">{typeof value === 'boolean' ? (value ? 'READY' : 'NOT CONFIGURED') : value}</p>
              </div>
            )) : (
              <div className="home-module-card min-h-0">
                <p className="home-module-label">Service</p>
                <h3 className="home-module-title">No health data</h3>
                <p className="home-module-text">Refresh after the Scorecaster production endpoint is available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {health?.nextStep ? (
        <section className="home-section">
          <div className="home-container">
            <p className="section-label">Next Required Action</p>
            <h2 className="section-title">{health.nextStep}</h2>
            <p className="home-lead">Last health timestamp: {health.timestamp || 'not available'}</p>
          </div>
        </section>
      ) : null}
    </main>
  )
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="home-highlight-card">
      <p className="home-card-title">{label}</p>
      <p className="home-card-text">{value}</p>
    </div>
  )
}

function formatName(value: string) {
  return value.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase())
}
