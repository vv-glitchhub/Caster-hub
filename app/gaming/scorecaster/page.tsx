const modules = [
  ['Agent V9', 'Ranked AI picks, confidence, decision scoring and learning-ready logic.'],
  ['Betting Workspace', 'Live odds, EV, Kelly staking, market movement and risk warnings.'],
  ['Analytics', 'ROI, CLV, model performance and historical tracking.'],
  ['Paper Trading', 'Simulated bankroll, exposure control and responsible testing.'],
]

export default function ScorecasterGamingPage() {
  return (
    <main className="min-h-screen bg-[#03040a] text-white">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(16,185,129,0.24),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.20),transparent_30%),linear-gradient(180deg,#03040a,#07101f_55%,#020207)]" />
        <div className="grid-overlay" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <a href="/" className="text-sm uppercase tracking-[0.28em] text-white/45 hover:text-white">
            ← Back to Caster OS
          </a>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="section-label">Gaming & Strategy / Scorecaster</p>
              <h1 className="section-title">Scorecaster now lives inside Caster OS.</h1>
              <p className="mt-8 max-w-3xl text-xl leading-8 text-white/65">
                This is the first integrated Caster OS module for sports intelligence, odds analysis,
                AI picks, risk control and paper trading. The existing Scorecaster app is preserved as
                the live engine while Caster OS becomes the main command center.
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
                  View Embedded App
                </a>
              </div>
            </div>

            <div className="dashboard-preview min-h-0">
              <p className="text-xs uppercase tracking-[0.32em] text-emerald-200/70">Integration Status</p>
              <div className="mt-6 space-y-4">
                <div className="preview-row">Caster OS route: /gaming/scorecaster</div>
                <div className="preview-row">Live engine: scorecaster.vercel.app</div>
                <div className="preview-row">Category: Gaming & Strategy</div>
                <div className="preview-row">Next step: migrate API routes and shared engine</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Scorecaster Stack</p>
          <h2 className="section-title">The sports intelligence module.</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {modules.map(([title, text]) => (
              <div key={title} className="app-card min-h-0">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="embedded-scorecaster" className="px-6 pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-label">Live Module</p>
              <h2 className="section-title">Embedded Scorecaster app.</h2>
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
