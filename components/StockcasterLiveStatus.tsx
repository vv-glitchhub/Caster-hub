type StockcasterHealth = {
  status?: string
  mode?: string
  deployment?: string
  commit?: string | null
  nextStep?: string
  timestamp?: string
  disclaimer?: string
  services?: {
    localPortfolio?: boolean
    localWatchlist?: boolean
    portfolioEngine?: boolean
    watchlistEngine?: boolean
    marketBriefEngine?: boolean
    marketDataConfigured?: boolean
    openAiConfigured?: boolean
    supabaseConfigured?: boolean
  }
}

const STOCKCASTER_URL = process.env.STOCKCASTER_URL || 'https://stockcaster.vercel.app'

async function loadHealth(): Promise<StockcasterHealth | null> {
  try {
    const response = await fetch(`${STOCKCASTER_URL}/api/health`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) return null
    return (await response.json()) as StockcasterHealth
  } catch {
    return null
  }
}

function statusText(value: boolean | undefined, yes = 'READY', no = 'NEEDS SETUP') {
  return value ? yes : no
}

export default async function StockcasterLiveStatus() {
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
      label: 'Portfolio tools',
      value: statusText(
        health?.services?.localPortfolio && health?.services?.portfolioEngine,
      ),
      detail: 'Local holdings, value, P/L and concentration analysis',
    },
    {
      label: 'Watchlist',
      value: statusText(
        health?.services?.localWatchlist && health?.services?.watchlistEngine,
      ),
      detail: 'Browser-local watchlist and risk signals',
    },
    {
      label: 'Live market data',
      value: statusText(health?.services?.marketDataConfigured, 'CONFIGURED'),
      detail: `Mode: ${health?.mode || 'unknown'} · Commit: ${commit}`,
    },
  ]

  return (
    <section className="home-section">
      <div className="home-container">
        <p className="section-label">Live Production Control</p>
        <h2 className="section-title">Stockcaster is the second running Caster application.</h2>
        <p className="home-lead">
          This status is read directly from Stockcaster&apos;s production health endpoint. Local portfolio and watchlist tools remain usable before verified market data and account sync are activated.
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
          <a className="primary-button" href={`${STOCKCASTER_URL}/quick-use`} target="_blank" rel="noreferrer">Open Stockcaster</a>
          <a className="secondary-button" href={`${STOCKCASTER_URL}/production-status`} target="_blank" rel="noreferrer">Production Status</a>
          <a className="secondary-button" href={`${STOCKCASTER_URL}/core-status`} target="_blank" rel="noreferrer">Caster Core</a>
          <a className="secondary-button" href={`${STOCKCASTER_URL}/api/health`} target="_blank" rel="noreferrer">Health JSON</a>
          <a className="secondary-button" href="/apps/stockcaster/setup">Activation Checklist</a>
        </div>

        <article className="home-module-card min-h-0">
          <p className="home-module-label">Next required action</p>
          <h3 className="home-module-title">
            {health?.nextStep || 'Verify the production health endpoint and select a trustworthy market-data provider.'}
          </h3>
          <p className="home-module-text">
            Demo or cached values must not be presented as verified live prices. Account sync should reuse the Scorecaster authentication and RLS pattern after its two-user isolation test is complete.
          </p>
        </article>

        <article className="home-module-card min-h-0">
          <p className="home-module-label">Responsible use</p>
          <h3 className="home-module-title">Analysis, not personal financial advice.</h3>
          <p className="home-module-text">
            {health?.disclaimer || 'Stockcaster must not promise returns or hide uncertainty in market data.'}
          </p>
        </article>
      </div>
    </section>
  )
}
