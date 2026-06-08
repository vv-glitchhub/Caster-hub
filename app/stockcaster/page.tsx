const features = [
  ['Portfolio Intelligence', 'Allocation, performance, dividends, exposure and concentration risk in one view.'],
  ['Market AI', 'Valuation, momentum, sector rotation, macro pressure and sentiment scoring.'],
  ['News Quality Engine', 'Scans catalysts and separates signal from noise with reliability scoring.'],
  ['Risk Engine', 'Highlights drawdown risk, volatility, portfolio imbalance and emotional decision traps.'],
]

const flow = ['Market data', 'News scan', 'Signal engine', 'Risk layer', 'Portfolio decision']

export default function StockcasterPage() {
  return (
    <main className="min-h-screen bg-[#03040a] text-white">
      <section className="relative flex min-h-screen items-center px-6 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,94,0.18),transparent_32%),radial-gradient(circle_at_20%_70%,rgba(59,130,246,0.24),transparent_34%),linear-gradient(180deg,#03040a,#061018_58%,#020207)]" />
        <div className="grid-overlay" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="section-label">Market Intelligence</p>
          <h1 className="section-title">Intelligence for modern markets.</h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-white/65">
            Stockcaster combines portfolio analysis, market intelligence, macro awareness, sentiment tracking and AI-driven research.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a className="primary-button" href="#features">View Features</a>
            <a className="secondary-button" href="#flow">How It Works</a>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Stockcaster Engine</p>
          <h2 className="section-title">From market noise to investment clarity.</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {features.map(([title, text]) => (
              <div className="app-card min-h-0" key={title}>
                <p className="text-2xl font-semibold">{title}</p>
                <p className="mt-4 text-white/60 leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="flow" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Operating Flow</p>
          <h2 className="section-title">A research desk that never stops scanning.</h2>
          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {flow.map((item, index) => (
              <div key={item} className="dashboard-preview min-h-0">
                <p className="text-sm text-white/45">0{index + 1}</p>
                <h3 className="mt-5 text-2xl font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
