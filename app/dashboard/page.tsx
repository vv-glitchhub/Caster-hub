import TimeAwareFocus from '../../components/TimeAwareFocus'

const goals = [
  ['Caster OS Proto', 'Build the first usable command center', '78%'],
  ['Golf Progress', 'Handicap 20 to 15 with weekly practice', '32%'],
  ['Wealth Goal', 'Save and invest toward future freedom', '41%'],
]

const projects = [
  ['Caster OS', 'Dashboard 2.0 in progress', 'Active'],
  ['Scorecaster', 'Live engine connected as Gaming module', 'Live'],
  ['Stockcaster', 'Wealth prototype ready', 'Proto'],
  ['Relaxcaster', 'Sakura health space ready', 'Design'],
]

const actions = [
  ['Open Agent', '/agent'],
  ['Open Life', '/life'],
  ['Open Wealth', '/wealth/stockcaster'],
  ['Open Gaming', '/gaming/scorecaster'],
  ['Open Health', '/health/relaxcaster'],
]

const agentFeed = [
  'Finish Dashboard 2.0 before adding real APIs.',
  'Keep the prototype visual and easy to understand.',
  'Next technical step: widget engine and shared state.',
  'Do not add Supabase until the UX direction feels right.',
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03040a] px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(96,165,250,0.26),transparent_34%),radial-gradient(circle_at_18%_76%,rgba(220,38,38,0.16),transparent_30%),linear-gradient(180deg,#03040a,#070814_55%,#020207)]" />
      <div className="grid-overlay" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="section-label">Caster OS Dashboard 2.0</p>
        <h1 className="section-title">Command center for the day.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60">
          A daily operating view for AI focus, goals, projects, wealth, gaming, health and quick actions.
        </p>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <TimeAwareFocus />

          <div className="dashboard-preview min-h-0">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Today</p>
            <div className="mt-6 space-y-3">
              <div className="preview-row">✓ Home 2.0 created</div>
              <div className="preview-row">✓ Navigation upgraded</div>
              <div className="preview-row">✓ Health module added</div>
              <div className="preview-row">✓ Time-aware focus added</div>
              <div className="preview-row">→ Validate deployment</div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="dashboard-preview min-h-0">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Goals</p>
                <h2 className="mt-4 text-3xl font-semibold">Life targets</h2>
              </div>
              <a className="secondary-button" href="/life">Open Life</a>
            </div>
            <div className="mt-8 space-y-5">
              {goals.map(([title, text, progress]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/52">{text}</p>
                    </div>
                    <p className="text-sm text-white/45">{progress}</p>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-white/80" style={{ width: progress }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-preview min-h-0">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Projects</p>
                <h2 className="mt-4 text-3xl font-semibold">Execution board</h2>
              </div>
              <a className="secondary-button" href="/life">Plan</a>
            </div>
            <div className="mt-8 grid gap-3">
              {projects.map(([name, detail, status]) => (
                <div key={name} className="preview-row flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{name}</p>
                    <p className="mt-1 text-sm text-white/45">{detail}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/65">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <a href="/wealth/stockcaster" className="dashboard-preview min-h-0 transition hover:-translate-y-2 hover:border-yellow-200/40">
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-200/70">Wealth</p>
            <h2 className="mt-5 text-4xl font-semibold">€24,800</h2>
            <p className="mt-3 text-white/50">Prototype net worth</p>
            <div className="mt-8 space-y-3">
              <div className="preview-row">Monthly saving: €350</div>
              <div className="preview-row">Risk: balanced</div>
              <div className="preview-row">AI outlook: positive</div>
            </div>
          </a>

          <a href="/gaming/scorecaster" className="dashboard-preview min-h-0 transition hover:-translate-y-2 hover:border-emerald-200/40">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">Gaming</p>
            <h2 className="mt-5 text-4xl font-semibold">Scorecaster</h2>
            <p className="mt-3 text-white/50">Modern sports intelligence</p>
            <div className="mt-8 space-y-3">
              <div className="preview-row">Top edge: +6.4%</div>
              <div className="preview-row">Confidence: high</div>
              <div className="preview-row">Engine: live portal</div>
            </div>
          </a>

          <a href="/health/relaxcaster" className="dashboard-preview min-h-0 transition hover:-translate-y-2 hover:border-pink-200/40">
            <p className="text-xs uppercase tracking-[0.35em] text-pink-200/70">Health</p>
            <h2 className="mt-5 text-4xl font-semibold">78%</h2>
            <p className="mt-3 text-white/50">Energy and recovery state</p>
            <div className="mt-8 space-y-3">
              <div className="preview-row">Recovery: good</div>
              <div className="preview-row">Stress: low</div>
              <div className="preview-row">Suggestion: short reset</div>
            </div>
          </a>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="dashboard-preview min-h-0">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Agent Feed</p>
            <h2 className="mt-5 text-3xl font-semibold">Caster recommendations</h2>
            <div className="mt-8 space-y-3">
              {agentFeed.map((item) => (
                <div key={item} className="preview-row">{item}</div>
              ))}
            </div>
          </div>

          <div className="dashboard-preview min-h-0">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Quick Actions</p>
            <h2 className="mt-5 text-3xl font-semibold">Move through the OS</h2>
            <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {actions.map(([label, href]) => (
                <a key={label} href={href} className="preview-row text-center transition hover:border-blue-200/40 hover:bg-white/[0.08]">
                  {label}
                </a>
              ))}
            </div>
            <a className="primary-button mt-8" href="/agent">Ask Caster AI</a>
          </div>
        </section>
      </div>
    </main>
  )
}
