const modules = [
  ['AI Picks', 'Ranked predictions, confidence, decision scoring and learning-ready logic.'],
  ['Live Odds', 'Odds movement, EV, best price and risk warnings in one workspace.'],
  ['Analytics', 'ROI, CLV, model performance and historical tracking.'],
  ['Paper Trading', 'Simulated bankroll, exposure control and responsible testing.'],
]

const liveSignals = [
  ['Top Edge', '+6.4%'],
  ['Confidence', 'High'],
  ['Market', 'Live'],
  ['Mode', 'Paper'],
]

const picks = [
  ['NHL Signal', 'Carolina ML', '+EV · high confidence'],
  ['NBA Signal', 'Totals watch', 'movement detected'],
  ['Risk Engine', 'Stake limited', 'exposure controlled'],
]

export default function ScorecasterGamingPage() {
  return (
    <main className="min-h-screen bg-[#03040a] text-white">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(16,185,129,0.30),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.22),transparent_30%),linear-gradient(180deg,#03040a,#07101f_55%,#020207)]" />
        <div className="grid-overlay" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <a href="/dashboard" className="text-sm uppercase tracking-[0.28em] text-white/45 hover:text-white">
            ← Dashboard
          </a>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="section-label">Gaming & Strategy / Scorecaster</p>
              <h1 className="section-title">Sports intelligence built for edge.</h1>
              <p className="mt-8 max-w-3xl text-xl leading-8 text-white/66">
                The Gaming layer of Caster OS for AI picks, odds movement, EV, risk control and paper trading.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  className="primary-button"
                  href="https://scorecaster.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Live Scorecaster
                </a>
                <a className="secondary-button" href="#embedded-scorecaster">
                  View Live Module
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {liveSignals.map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-emerald-200/10 bg-emerald-300/[0.045] p-5 text-center backdrop-blur-xl">
                  <p className="text-2xl font-semibold tracking-tight text-emerald-100">{value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/42">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="dashboard-preview min-h-0 border-emerald-200/10">
            <p className="text-xs uppercase tracking-[0.32em] text-emerald-200/70">AI Betting Desk</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">Find the signal. Control the risk.</h2>
            <p className="mt-5 text-sm leading-6 text-white/56">
              Scorecaster turns live odds, movement and model probability into a cleaner decision layer.
            </p>
            <div className="mt-8 space-y-3">
              {picks.map(([tag, title, detail]) => (
                <div key={tag} className="preview-row flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/55">{tag}</p>
                    <p className="mt-2 font-semibold text-white">{title}</p>
                  </div>
                  <span className="rounded-full border border-emerald-200/10 bg-emerald-300/[0.06] px-3 py-1 text-xs text-emerald-100/80">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="section-label">Scorecaster Stack</p>
            <h2 className="section-title">The sports intelligence module.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {modules.map(([title, text]) => (
                <div key={title} className="app-card min-h-0 border-emerald-200/10">
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="embedded-scorecaster" className="px-6 pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-label">Live Module</p>
              <h2 className="section-title">Scorecaster live engine.</h2>
            </div>
            <a
              className="secondary-button"
              href="https://scorecaster.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Open Full Screen
            </a>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl shadow-emerald-500/10">
            <iframe
              title="Scorecaster Live App"
              src="https://scorecaster.vercel.app"
              className="h-[82vh] w-full bg-black"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
