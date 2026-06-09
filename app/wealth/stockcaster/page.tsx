import LaunchCTA from '../../../components/LaunchCTA'

const signals = [
  ['Portfolio', 'Net worth, allocation and long-term progress.'],
  ['Market Signals', 'Macro, sectors, news quality and watchlist movement.'],
  ['Risk View', 'Concentration, volatility and decision timing.'],
  ['Wealth Plan', 'Monthly saving, investing and future scenario planning.'],
]

const holdings = [
  ['Funds', '48%', 'Core long-term allocation'],
  ['Cash', '32%', 'Opportunity and safety buffer'],
  ['Stocks', '20%', 'Higher conviction positions'],
]

const financeStats = [
  ['€24.8K', 'Net Worth'],
  ['€350', 'Monthly'],
  ['Balanced', 'Risk'],
  ['Long', 'Horizon'],
]

export default function StockcasterWealthPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(234,179,8,0.30),transparent_32%),radial-gradient(circle_at_18%_82%,rgba(59,130,246,0.22),transparent_30%),linear-gradient(180deg,#030712,#08111f_55%,#020207)]" />
      <div className="grid-overlay" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <a href="/dashboard" className="text-xs uppercase tracking-[0.28em] text-white/45 hover:text-white">← Dashboard</a>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="section-label">Wealth / Stockcaster</p>
            <h1 className="section-title">Premium market intelligence for long-term wealth.</h1>
            <p className="mt-8 max-w-3xl text-xl leading-8 text-white/64">
              The Wealth layer of Caster OS for portfolio intelligence, market signals, risk control and future planning.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {financeStats.map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-yellow-200/10 bg-yellow-200/[0.045] p-5 text-center backdrop-blur-xl">
                <p className="text-2xl font-semibold tracking-tight text-yellow-100">{value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/42">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="dashboard-preview min-h-0 border-yellow-200/10">
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-200/70">Wealth Snapshot</p>
            <h2 className="mt-5 text-6xl font-semibold tracking-tight">€24,800</h2>
            <p className="mt-3 text-white/50">Prototype net worth display</p>
            <div className="mt-8 space-y-3">
              {holdings.map(([name, share, note]) => (
                <div key={name} className="preview-row flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{name}</p>
                    <p className="mt-1 text-sm text-white/45">{note}</p>
                  </div>
                  <span className="rounded-full border border-yellow-200/10 bg-yellow-200/[0.06] px-3 py-1 text-sm text-yellow-100/80">{share}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-preview min-h-0 border-yellow-200/10">
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-200/70">AI Wealth Desk</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">Protect upside. Control risk.</h2>
            <p className="mt-5 text-sm leading-6 text-white/56">
              Stockcaster turns portfolio, market and macro signals into one understandable wealth brief.
            </p>
            <div className="mt-8 space-y-3">
              <div className="preview-row">Macro pressure · moderate</div>
              <div className="preview-row">News quality · high</div>
              <div className="preview-row">Risk level · balanced</div>
              <div className="preview-row">Next action · review allocation</div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {signals.map(([title, text]) => (
            <div key={title} className="app-card min-h-0 border-yellow-200/10">
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/58">{text}</p>
            </div>
          ))}
        </section>

        <LaunchCTA
          eyebrow="Stockcaster"
          title="Turn market noise into direction."
          description="Continue to the Caster OS dashboard and connect wealth signals with goals, risk and daily decisions."
          tone="gold"
        />
      </div>
    </main>
  )
}
