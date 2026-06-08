const engine = [
  ['Implied probability', 'Turns market odds into probability so the system can compare price against reality.'],
  ['Model probability', 'Estimates the true chance of an outcome using team strength, form, context and movement.'],
  ['Edge detection', 'Highlights where the model disagrees with the market in a useful way.'],
  ['Kelly staking', 'Suggests stake size based on edge and bankroll risk.'],
]

export default function ScorecasterPage() {
  return (
    <main className="min-h-screen bg-[#03040a] text-white">
      <section className="relative flex min-h-screen items-center px-6 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(59,130,246,0.34),transparent_34%),radial-gradient(circle_at_18%_75%,rgba(220,38,38,0.24),transparent_30%),linear-gradient(180deg,#03040a,#07101f_55%,#020207)]" />
        <div className="grid-overlay" />
        <nav className="absolute left-0 right-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 text-sm uppercase tracking-[0.35em] text-white/70">
          <a href="/">Caster</a>
          <a href="/" className="text-white/55">Back to Hub</a>
        </nav>
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="section-label">Betting Intelligence</p>
          <h1 className="section-title">Beat the market before it moves.</h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-white/65">
            Scorecaster is an AI-powered betting intelligence platform built around value, probability, risk and market movement.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a className="primary-button" href="#engine">View Engine</a>
            <a className="secondary-button" href="/">Open Hub</a>
          </div>
        </div>
      </section>

      <section id="engine" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Scorecaster Engine</p>
          <h2 className="section-title">From odds to decisions.</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {engine.map(([title, text]) => (
              <div className="app-card min-h-0" key={title}>
                <p className="text-2xl font-semibold">{title}</p>
                <p className="mt-4 text-white/60 leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
