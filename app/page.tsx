const apps = [
  {
    name: 'Scorecaster',
    label: 'Betting Intelligence',
    headline: 'Find value before the market moves.',
    description:
      'AI-powered sports analysis with odds comparison, edge detection, simulations, Kelly staking and market movement intelligence.',
    href: '/scorecaster',
    stats: ['EV', 'Kelly', 'Live odds'],
  },
  {
    name: 'Stockcaster',
    label: 'Market Intelligence',
    headline: 'Understand markets before the noise does.',
    description:
      'Portfolio intelligence, stock analysis, macro signals, news quality scoring and autonomous market scouting.',
    href: '/stockcaster',
    stats: ['Risk', 'Macro', 'Signals'],
  },
  {
    name: 'Relaxcaster',
    label: 'Human Intelligence',
    headline: 'Clarity under pressure.',
    description:
      'A calm decision system for stress, overthinking, impulses, betting control, trading control and difficult conversations.',
    href: '/relaxcaster',
    stats: ['Calm', 'Clarity', 'Control'],
  },
]

const previews = [
  {
    title: 'Scorecaster Live Edge',
    tag: 'Sports Market AI',
    items: ['Top Pick: NHL moneyline', 'Model probability: 61%', 'Market implied: 54%', 'Suggested stake: 1.8%'],
  },
  {
    title: 'Stockcaster Signal Desk',
    tag: 'Market Intelligence',
    items: ['Portfolio risk: Moderate', 'Macro pressure: Rising', 'News quality: High', 'Trend signal: Watch'],
  },
  {
    title: 'Relaxcaster Control Mode',
    tag: 'Human Intelligence',
    items: ['State: Overloaded', 'Action: Slow decision', 'Impulse shield: Active', 'Next step: 5 minute pause'],
  },
]

const metrics = [
  ['24/7', 'Intelligence layer'],
  ['3', 'Core systems'],
  ['AI', 'Signal analysis'],
  ['∞', 'Decision loops'],
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03040a] text-white">
      <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(60,120,255,0.35),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(180,20,60,0.22),transparent_30%),linear-gradient(180deg,#03040a_0%,#070814_55%,#020207_100%)]" />
        <div className="grid-overlay" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />

        <div id="top" className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.55em] text-blue-200/80">Intelligent Tech · Cinematic UI · AI Ecosystem</p>
          <h1 className="hero-title">CASTER</h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-white/72 md:text-2xl">
            Unified intelligence ecosystem for sports, markets and human decision-making.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a className="primary-button" href="#apps">Explore Ecosystem</a>
            <a className="secondary-button" href="#core">View Intelligence Core</a>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {metrics.map(([value, label]) => (
            <div key={label} className="dashboard-preview min-h-0 text-center">
              <div className="text-5xl font-bold tracking-tight">{value}</div>
              <p className="mt-4 text-sm uppercase tracking-[0.25em] text-white/55">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ecosystem" className="relative px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Unified Intelligence</p>
          <h2 className="section-title">Three systems. One intelligence philosophy.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Scorecaster analyzes sports markets. Stockcaster analyzes financial markets. Relaxcaster analyzes the person making the decision. Together they form one premium AI operating layer.
          </p>
        </div>
      </section>

      <section id="apps" className="px-6 pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {apps.map((app) => (
            <a key={app.name} href={app.href} className="app-card group">
              <div className="card-glow" />
              <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">{app.label}</p>
              <h3 className="mt-8 text-4xl font-semibold tracking-tight">{app.name}</h3>
              <p className="mt-5 text-xl leading-7 text-white/86">{app.headline}</p>
              <p className="mt-5 min-h-28 text-base leading-7 text-white/58">{app.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {app.stats.map((stat) => (
                  <span key={stat} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">{stat}</span>
                ))}
              </div>
              <div className="mt-10 text-sm uppercase tracking-[0.28em] text-white/80">Open {app.name} →</div>
            </a>
          ))}
        </div>
      </section>

      <section id="core" className="px-6 py-32">
        <div className="mx-auto max-w-7xl text-center">
          <p className="section-label">Caster Core AI</p>
          <h2 className="section-title mx-auto">The intelligence layer connecting every decision.</h2>
          <div className="core-visual">
            <div className="core-node">Caster Core</div>
            <div className="core-branches">
              <a href="/scorecaster">Scorecaster<span>Sports probability</span></a>
              <a href="/stockcaster">Stockcaster<span>Market signals</span></a>
              <a href="/relaxcaster">Relaxcaster<span>Human control</span></a>
            </div>
          </div>
        </div>
      </section>

      <section id="showcase" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Dashboard Previews</p>
          <h2 className="section-title">Designed to feel like an intelligent tech command center.</h2>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {previews.map((preview) => (
              <div key={preview.title} className="dashboard-preview">
                <p className="text-xs uppercase tracking-[0.32em] text-blue-200/70">{preview.tag}</p>
                <h3 className="mt-5 text-2xl font-semibold">{preview.title}</h3>
                <div className="mt-8 space-y-3">
                  {preview.items.map((item) => (
                    <div key={item} className="preview-row">{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="relative px-6 py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="section-label">Technology</p>
            <h2 className="section-title">Data intelligence designed for better decisions.</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">
              The ecosystem is built around probability, risk, signal quality, market movement and behavioral control. The result is not just information — it is decision intelligence.
            </p>
          </div>
          <div className="core-panel">
            <div className="core-row"><span>Sports markets</span><strong>Scorecaster</strong></div>
            <div className="core-row"><span>Financial markets</span><strong>Stockcaster</strong></div>
            <div className="core-row"><span>Human pressure</span><strong>Relaxcaster</strong></div>
            <div className="mt-8 rounded-3xl border border-blue-300/20 bg-blue-400/10 p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-blue-100/80">Unified Layer</p>
              <p className="mt-3 text-2xl font-semibold">AI signal engine · risk engine · decision engine</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-[70vh] items-center justify-center px-6 py-32 text-center">
        <div>
          <p className="section-label">The Vision</p>
          <h2 className="final-title">Intelligence is evolving.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Caster is the home for intelligent tech systems that help people understand data, pressure and decisions before the moment passes.
          </p>
          <a className="primary-button mt-10 inline-flex" href="#top">Enter Caster</a>
        </div>
      </section>
    </main>
  )
}
