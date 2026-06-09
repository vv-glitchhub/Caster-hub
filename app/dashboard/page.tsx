const modules = [
  ['Gaming', 'Scorecaster', '/gaming/scorecaster', 'Live sports intelligence and probability signals.'],
  ['Wealth', 'Stockcaster', '/wealth/stockcaster', 'Portfolio, market signals and long-term wealth decisions.'],
  ['Health', 'Relaxcaster', '/health/relaxcaster', 'Zen clarity, recovery and impulse control.'],
  ['Life', 'Lifecaster', '/life', 'Personal goals, projects and daily direction.'],
]

const goals = [
  ['Caster OS Proto', 'Build the first usable command center', '68%'],
  ['Golf Progress', 'Handicap 20 → 15 with weekly practice', '32%'],
  ['Wealth Goal', 'Save and invest toward future freedom', '41%'],
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03040a] px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(96,165,250,0.24),transparent_34%),radial-gradient(circle_at_18%_76%,rgba(220,38,38,0.16),transparent_30%),linear-gradient(180deg,#03040a,#070814_55%,#020207)]" />
      <div className="grid-overlay" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="section-label">Caster OS Proto V1</p>
        <h1 className="section-title">Your life command center.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60">
          A first prototype dashboard for the Caster ecosystem: life, health, wealth, gaming and AI direction in one premium workspace.
        </p>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="dashboard-preview min-h-0">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">AI Agent</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">Good morning, Vikke.</h2>
            <p className="mt-5 text-lg leading-8 text-white/62">
              Today’s best move is to finish the Caster OS prototype structure before migrating deeper Scorecaster features.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="preview-row">Focus: Proto V1</div>
              <div className="preview-row">Risk: Scope creep</div>
              <div className="preview-row">Next: Life page</div>
            </div>
            <a className="primary-button mt-8" href="/agent">Open AI Agent</a>
          </div>

          <div className="dashboard-preview min-h-0">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Today</p>
            <div className="mt-6 space-y-3">
              <div className="preview-row">✓ Build dashboard shell</div>
              <div className="preview-row">✓ Define Lifecaster widgets</div>
              <div className="preview-row">→ Keep Scorecaster modern sports theme</div>
              <div className="preview-row">→ Relaxcaster zen visual direction</div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {goals.map(([title, text, progress]) => (
            <div key={title} className="app-card min-h-0">
              <p className="text-sm uppercase tracking-[0.28em] text-white/45">Goal</p>
              <h3 className="mt-5 text-3xl font-semibold">{title}</h3>
              <p className="mt-4 text-white/60">{text}</p>
              <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-white/80" style={{ width: progress }} />
              </div>
              <p className="mt-3 text-sm text-white/45">{progress} complete</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {modules.map(([category, name, href, description]) => (
            <a key={name} href={href} className="dashboard-preview min-h-0 transition hover:-translate-y-2 hover:border-blue-200/40">
              <p className="text-xs uppercase tracking-[0.32em] text-blue-200/70">{category}</p>
              <h3 className="mt-5 text-3xl font-semibold">{name}</h3>
              <p className="mt-4 min-h-20 text-sm leading-6 text-white/58">{description}</p>
              <p className="mt-8 text-sm uppercase tracking-[0.25em] text-white/70">Open →</p>
            </a>
          ))}
        </section>
      </div>
    </main>
  )
}
