type StockcasterHealth = {
  status?: string
  mode?: string
  deployment?: string
  commit?: string | null
  nextStep?: string
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

const DEFAULT_STOCKCASTER_URL = 'https://stockcaster.vercel.app'

async function loadHealth(baseUrl: string): Promise<StockcasterHealth | null> {
  try {
    const response = await fetch(`${baseUrl}/api/health`, {
      cache: 'no-store',
    })

    if (!response.ok) return null
    return (await response.json()) as StockcasterHealth
  } catch {
    return null
  }
}

function ready(value: boolean | undefined, yes = 'READY', no = 'NEEDS SETUP') {
  return value ? yes : no
}

export default async function StockcasterLiveStatus() {
  const baseUrl = process.env.STOCKCASTER_URL || DEFAULT_STOCKCASTER_URL
  const health = await loadHealth(baseUrl)
  const online = health?.status === 'ok'
  const commit = health?.commit ? health.commit.slice(0, 8) : 'unknown'

  const cards = [
    {
      label: 'Production',
      value: online ? 'ONLINE' : 'CHECK REQUIRED',
      detail: health?.deployment || 'Health endpoint unavailable',
    },
    {
      label: 'Portfolio engine',
      value: ready(health?.services?.portfolioEngine),
      detail: 'Valuation, allocation, P/L and concentration analysis',
    },
    {
      label: 'Local workspace',
      value: health?.services?.localPortfolio && health?.services?.localWatchlist ? 'READY' : 'CHECK REQUIRED',
      detail: 'Browser-local holdings and watchlist',
    },
    {
      label: 'Verified market data',
      value: ready(health?.services?.marketDataConfigured, 'CONFIGURED'),
      detail: `Mode: ${health?.mode || 'unknown'} · Commit: ${commit}`,
    },
  ]

  return (
    <section className="home-section">
      <div className="home-container">
        <p className="section-label">Live Production Control</p>
        <h2 className="section-title">Stockcaster is the second running Caster application.</h2>
        <p className="home-lead">
          This status is loaded from the Stockcaster production health endpoint. Portfolio and watchlist tools remain usable even when verified market data and cloud accounts are not configured.
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
          <a className="primary-button" href={`${baseUrl}/quick-use`} target="_blank" rel="noreferrer">Open Stockcaster</a>
          <a className="secondary-button" href={`${baseUrl}/production-status`} target="_blank" rel="noreferrer">Production Status</a>
          <a className="secondary-button" href={`${baseUrl}/core-status`} target="_blank" rel="noreferrer">Caster Core</a>
          <a className="secondary-button" href={`${baseUrl}/market-brief`} target="_blank" rel="noreferrer">Market Brief</a>
          <a className="secondary-button" href={`${baseUrl}/api/health`} target="_blank" rel="noreferrer">Health JSON</a>
          <a className="secondary-button" href="/apps/stockcaster/setup">Activation Checklist</a>
        </div>

        <article className="home-module-card min-h-0">
          <p className="home-module-label">Next production phase</p>
          <h3 className="home-module-title">{health?.nextStep || 'Verify the Stockcaster production URL and health endpoint.'}</h3>
          <p className="home-module-text">
            Reuse Scorecaster&apos;s validated account, Row Level Security and duplicate-safe local-to-cloud migration pattern. Before any quote is labelled live, show its provider, timestamp, currency, market state and stale-data status.
          </p>
        </article>

        <article className="home-module-card min-h-0">
          <p className="home-module-label">Responsible use</p>
          <h3 className="home-module-title">Analysis and learning, not a promise of returns.</h3>
          <p className="home-module-text">
            {health?.disclaimer || 'Stockcaster must expose uncertainty and must not present generic analysis as personal financial advice.'}
          </p>
        </article>
      </div>
    </section>
  )
}
