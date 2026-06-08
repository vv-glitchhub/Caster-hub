const layers = [
  ['Sports Intelligence', 'Probability, market movement, value detection and risk-aware staking for Scorecaster.'],
  ['Market Intelligence', 'Portfolio exposure, macro signals, news quality and trend detection for Stockcaster.'],
  ['Human Intelligence', 'Pressure control, clarity, impulse interruption and decision support for Relaxcaster.'],
]

const roadmap = [
  ['2026', 'Caster Hub, Scorecaster, Stockcaster and Relaxcaster foundations.'],
  ['2027', 'Autonomous agents, shared signal engines and intelligent alerting.'],
  ['2028', 'Unified decision intelligence platform across markets, sports and life.'],
]

export default function CasterCorePage() {
  return (
    <main className="min-h-screen bg-[#03040a] text-white">
      <section className="relative flex min-h-screen items-center px-6 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(96,165,250,0.34),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.22),transparent_32%),linear-gradient(180deg,#03040a,#070814_56%,#020207)]" />
        <div className="grid-overlay" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="section-label">Caster Core AI</p>
          <h1 className="section-title">The operating system for decision intelligence.</h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-white/65">
            Caster Core is the shared intelligence layer behind the ecosystem. It connects sports probability, market signals and human decision control into one premium AI platform.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a className="primary-button" href="#layers">Explore Layers</a>
            <a className="secondary-button" href="/">Back to Hub</a>
          </div>
        </div>
      </section>

      <section id="layers" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Core Layers</p>
          <h2 className="section-title">One intelligence philosophy across every product.</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {layers.map(([title, text]) => (
              <div className="app-card min-h-0" key={title}>
                <p className="text-2xl font-semibold">{title}</p>
                <p className="mt-4 text-white/60 leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Roadmap</p>
          <h2 className="section-title">From hub to autonomous intelligence.</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {roadmap.map(([year, text]) => (
              <div className="dashboard-preview min-h-0" key={year}>
                <p className="text-5xl font-semibold tracking-tight">{year}</p>
                <p className="mt-6 text-white/60 leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
