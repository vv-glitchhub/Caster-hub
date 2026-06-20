import LaunchCTA from '../../../components/LaunchCTA'
import ProductOSExpansion from '../../../components/ProductOSExpansion'

const signals = [
  ['Portfolio', 'Net worth, allocation and long-term progress.'],
  ['Signals', 'Macro, sectors, news quality and watchlist movement.'],
  ['Risk', 'Concentration, volatility and decision timing.'],
  ['Plan', 'Monthly saving, investing and future scenario planning.'],
]

const financeStats = [
  ['€24.8K', 'Net Worth'],
  ['€350', 'Monthly'],
  ['Balanced', 'Risk'],
  ['Long', 'Horizon'],
]

const holdings = [
  ['Funds', '48%'],
  ['Cash', '32%'],
  ['Stocks', '20%'],
  ['Risk', 'Balanced'],
]

export default function StockcasterWealthPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />

        <div className="home-hero-inner">
          <p className="home-eyebrow">Stockcaster</p>
          <h1 className="home-title">Wealth.</h1>
          <h2 className="home-subtitle">With context.</h2>
          <p className="home-lead">
            Market intelligence for portfolio clarity, risk control, macro signals and long-term financial direction.
          </p>

          <div className="home-highlight-grid">
            {financeStats.map(([value, label]) => (
              <div key={label} className="motion-surface home-highlight-card">
                <p className="home-card-title">{value}</p>
                <p className="home-card-text">{label}</p>
              </div>
            ))}
          </div>

          <div className="home-actions">
            <a className="primary-button" href="/dashboard">Open Dashboard</a>
            <a className="secondary-button" href="/agent">Ask Agent</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Wealth Intelligence</p>
          <h2 className="section-title">Turn market noise into direction.</h2>
          <p className="home-section-lead">
            Stockcaster connects portfolio state, market movement and personal goals into one decision layer.
          </p>

          <div className="home-core-grid" style={{ marginTop: '3.5rem' }}>
            <div className="motion-surface home-core-card">
              <div className="home-core-pill">Portfolio Snapshot</div>
              <div className="home-core-items">
                {holdings.map(([name, value]) => (
                  <div key={name} className="home-core-item">
                    <strong>{value}</strong>
                    <br />
                    {name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="section-label">AI Wealth Desk</p>
              <h2 className="section-title">Protect upside. Control risk.</h2>
            </div>
          </div>

          <div className="home-module-grid">
            {signals.map(([title, text]) => (
              <div key={title} className="motion-surface home-module-card">
                <p className="home-module-label">Stockcaster</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
                <p className="home-module-link">Wealth AI</p>
              </div>
            ))}
          </div>

          <LaunchCTA
            eyebrow="Stockcaster"
            title="Turn market noise into direction."
            description="Continue to the Caster OS dashboard and connect wealth signals with goals, risk and daily decisions."
            tone="gold"
          />
        </div>
      </section>

      <ProductOSExpansion
        label="Stockcaster"
        title="Wealth intelligence now connects to the full Caster OS layer."
        text="The wealth module links market signals, portfolio risk and long-term goals with agent recommendations and shared memory."
      />
    </main>
  )
}
