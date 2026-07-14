const STOCKCASTER_URL = process.env.STOCKCASTER_URL || 'https://stockcaster.vercel.app'
const REPO_URL = 'https://github.com/vv-glitchhub/Stockcaster-'

const steps = [
  {
    title: 'Verify local portfolio persistence',
    detail: 'Add one holding and one watchlist item in Quick Use, refresh the browser and confirm both remain available.',
  },
  {
    title: 'Select a market-data provider',
    detail: 'Confirm instrument coverage, licensing, quote delay, rate limits, currencies and market-status support before paying for a plan.',
  },
  {
    title: 'Build a server-only provider adapter',
    detail: 'Keep provider secrets out of browser code and return source, timestamp, stale state and market-open status with every quote.',
  },
  {
    title: 'Validate data quality',
    detail: 'Test stocks, ETFs, funds, market-closed periods, missing symbols, split-adjusted prices and different currencies separately.',
  },
  {
    title: 'Reuse the Caster account layer',
    detail: 'After Scorecaster user isolation is validated, add user-specific holdings and watchlists with Supabase Row Level Security.',
  },
  {
    title: 'Test two isolated portfolios',
    detail: 'Use two accounts and verify that neither account can read or modify the other user’s holdings, watchlist or notes.',
  },
]

export default function StockcasterSetupPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-hero-inner">
          <p className="home-eyebrow">Stockcaster Activation</p>
          <h1 className="home-title">Move from local portfolio to trusted market intelligence.</h1>
          <h2 className="home-subtitle">Keep the useful local mode while live data and accounts are validated.</h2>
          <p className="home-lead">
            Stockcaster&apos;s production shell, local portfolio tools, health endpoint and Caster Core contract are deployed. The next phase is trustworthy external data followed by isolated cloud portfolios.
          </p>
          <div className="home-actions">
            <a className="primary-button" href={`${STOCKCASTER_URL}/quick-use`} target="_blank" rel="noreferrer">Open Quick Use</a>
            <a className="secondary-button" href={`${STOCKCASTER_URL}/production-status`} target="_blank" rel="noreferrer">Check Production</a>
            <a className="secondary-button" href={`${STOCKCASTER_URL}/core-status`} target="_blank" rel="noreferrer">Caster Core</a>
            <a className="secondary-button" href={`${REPO_URL}/blob/main/docs/PRODUCTION_RUNBOOK.md`} target="_blank" rel="noreferrer">Production Runbook</a>
            <a className="secondary-button" href="/apps/stockcaster">Back to Stockcaster</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Activation Checklist</p>
          <h2 className="section-title">Complete these checks in order.</h2>
          <div className="home-module-grid">
            {steps.map((step, index) => (
              <article key={step.title} className="home-module-card min-h-0">
                <p className="home-module-label">Step {index + 1}</p>
                <h3 className="home-module-title">{step.title}</h3>
                <p className="home-module-text">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Definition of Done</p>
          <h2 className="section-title">Live data is complete only when its source and freshness are visible.</h2>
          <div className="home-highlight-grid">
            <article className="home-highlight-card">
              <p className="home-card-title">Data trust</p>
              <p className="home-card-text">Every displayed quote includes provider, timestamp, currency, market state and stale-data handling.</p>
            </article>
            <article className="home-highlight-card">
              <p className="home-card-title">Account isolation</p>
              <p className="home-card-text">Two users cannot see or alter each other&apos;s portfolio, watchlist, notes or alerts.</p>
            </article>
            <article className="home-highlight-card">
              <p className="home-card-title">Responsible output</p>
              <p className="home-card-text">The app explains uncertainty and risk and never promises a return.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
