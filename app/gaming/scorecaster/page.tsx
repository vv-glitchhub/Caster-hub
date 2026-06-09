const modules = [
  ['AI Picks', 'Ranked predictions, confidence and decision scoring.'],
  ['Live Odds', 'Odds movement, EV, best price and risk warnings.'],
  ['Analytics', 'ROI, CLV, model performance and tracking.'],
  ['Paper Mode', 'Simulated bankroll and responsible testing.'],
]

const liveSignals = [
  ['Top Edge', '+6.4%'],
  ['Confidence', 'High'],
  ['Market', 'Live'],
  ['Mode', 'Paper'],
]

const picks = [
  ['NHL Signal', 'Carolina ML'],
  ['NBA Signal', 'Totals watch'],
  ['Risk Engine', 'Stake limited'],
  ['Market Movement', 'Line shift detected'],
]

export default function ScorecasterGamingPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />

        <div className="home-hero-inner">
          <p className="home-eyebrow">Scorecaster</p>
          <h1 className="home-title">Signal.</h1>
          <h2 className="home-subtitle">Not noise.</h2>
          <p className="home-lead">
            Sports intelligence for AI picks, odds movement, EV, risk control and paper testing.
          </p>

          <div className="home-highlight-grid">
            {liveSignals.map(([label, value]) => (
              <div key={label} className="motion-surface home-highlight-card">
                <p className="home-card-title">{value}</p>
                <p className="home-card-text">{label}</p>
              </div>
            ))}
          </div>

          <div className="home-actions">
            <a className="primary-button" href="https://scorecaster.vercel.app" target="_blank" rel="noreferrer">Open Live App</a>
            <a className="secondary-button" href="/dashboard">Back Dashboard</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Betting Intelligence</p>
          <h2 className="section-title">Find the signal. Control the risk.</h2>
          <p className="home-section-lead">
            Scorecaster turns live odds, movement and model probability into a cleaner decision layer.
          </p>

          <div className="home-core-grid" style={{ marginTop: '3.5rem' }}>
            <div className="motion-surface home-core-card">
              <div className="home-core-pill">AI Betting Desk</div>
              <div className="home-core-items">
                {picks.map(([tag, title]) => (
                  <div key={tag} className="home-core-item">
                    <strong>{tag}</strong>
                    <br />
                    {title}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="section-label">Stack</p>
              <h2 className="section-title">The sports module of Caster OS.</h2>
            </div>
          </div>

          <div className="home-module-grid">
            {modules.map(([title, text]) => (
              <div key={title} className="motion-surface home-module-card">
                <p className="home-module-label">Scorecaster</p>
                <h3 className="home-module-title">{title}</h3>
                <p className="home-module-text">{text}</p>
                <p className="home-module-link">Sports AI</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="embedded-scorecaster" className="home-section">
        <div className="home-container">
          <p className="section-label">Live Module</p>
          <h2 className="section-title">Scorecaster live engine.</h2>
          <p className="home-section-lead">
            The live app opens separately so this Caster OS page stays clean and premium for visitors.
          </p>
          <div className="home-actions" style={{ justifyContent: 'flex-start' }}>
            <a className="primary-button" href="https://scorecaster.vercel.app" target="_blank" rel="noreferrer">Open Scorecaster</a>
          </div>
        </div>
      </section>
    </main>
  )
}
