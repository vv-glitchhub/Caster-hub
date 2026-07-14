type ScorecasterHealth = {
  status?: string
  mode?: string
  deployment?: string
  commit?: string | null
  nextStep?: string
  timestamp?: string
  services?: {
    authLayer?: boolean
    cloudSyncApi?: boolean
    supabaseConfigured?: boolean
    oddsApiConfigured?: boolean
    openAiConfigured?: boolean
  }
}

const SCORECASTER_URL = 'https://scorecaster.vercel.app'

async function loadHealth(): Promise<ScorecasterHealth | null> {
  try {
    const response = await fetch(`${SCORECASTER_URL}/api/health`, {
      cache: 'no-store',
    })

    if (!response.ok) return null
    return (await response.json()) as ScorecasterHealth
  } catch {
    return null
  }
}

function statusText(value: boolean | undefined, yes = 'READY', no = 'NEEDS SETUP') {
  return value ? yes : no
}

export default async function ScorecasterLiveStatus() {
  const health = await loadHealth()
  const online = health?.status === 'ok'
  const commit = health?.commit ? health.commit.slice(0, 8) : 'unknown'

  const cards = [
    {
      label: 'Production',
      value: online ? 'ONLINE' : 'CHECK REQUIRED',
      detail: health?.deployment || 'Health endpoint unavailable',
    },
    {
      label: 'Account layer',
      value: statusText(health?.services?.authLayer),
      detail: 'Email/password authentication and session handling',
    },
    {
      label: 'Cloud Sync API',
      value: statusText(health?.services?.cloudSyncApi),
      detail: 'Protected user-specific bets endpoint',
    },
    {
      label: 'Supabase',
      value: statusText(health?.services?.supabaseConfigured, 'CONFIGURED'),
      detail: `Mode: ${health?.mode || 'unknown'} · Commit: ${commit}`,
    },
  ]

  return (
    <section className="home-section">
      <div className="home-container">
        <p className="section-label">Live Production Control</p>
        <h2 className="section-title">Scorecaster is the first running Caster application.</h2>
        <p className="home-lead">
          This status is read directly from the production health endpoint. The app can remain useful in local-first mode while account and cloud features are activated.
        </p>

        <div className="home-highlight-grid">
          {cards.map((card) => (
            <article key={card.label} className="home-highlight-card">
              <p className="home-module-label">{card.label}</p>
              <p className="home-card-title">{card.value}</p>
              <p className="home-card-text">{card.detail}</p>
            </article>
          ))}
        </div>

        <div className="home-actions">
          <a className="primary-button" href={`${SCORECASTER_URL}/quick-use`}>Open Scorecaster</a>
          <a className="secondary-button" href={`${SCORECASTER_URL}/login`}>Login / Create Account</a>
          <a className="secondary-button" href={`${SCORECASTER_URL}/cloud-sync`}>Cloud Sync</a>
          <a className="secondary-button" href={`${SCORECASTER_URL}/production-status`}>Production Status</a>
          <a className="secondary-button" href="/apps/scorecaster/setup">Setup Checklist</a>
        </div>

        <article className="home-module-card min-h-0">
          <p className="home-module-label">Next required action</p>
          <h3 className="home-module-title">{health?.nextStep || 'Verify the production health endpoint and Supabase setup.'}</h3>
          <p className="home-module-text">
            The code layer is deployed. Database migration and a real two-user isolation test are the remaining manual activation checks.
          </p>
        </article>
      </div>
    </section>
  )
}
