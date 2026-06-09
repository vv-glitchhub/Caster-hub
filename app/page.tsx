const modules = [
  ['Dashboard', 'Command Center', 'Profile-aware widgets, memory and daily AI focus.', '/dashboard'],
  ['Agent', 'Caster AI', 'Context-aware recommendations for the next decision.', '/agent'],
  ['Life', 'Lifecaster', 'Goals, projects, habits and future planning.', '/life'],
  ['Wealth', 'Stockcaster', 'Portfolio intelligence, risk and market signals.', '/wealth/stockcaster'],
  ['Gaming', 'Scorecaster', 'AI picks, odds movement and edge analysis.', '/gaming/scorecaster'],
  ['Health', 'Relaxcaster', 'Calm, clarity, recovery and daily rhythm.', '/health/relaxcaster'],
]

const highlights = [
  ['Dashboard 3.0', 'Personal command center'],
  ['Agent V1', 'Context and recommendations'],
  ['Memory Layer', 'Profile and layout state'],
  ['Widget OS', 'Customizable interface'],
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020207] text-white">
      <section className="relative flex min-h-screen items-center justify-center px-6 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(80,130,255,0.28),transparent_34%),radial-gradient(circle_at_50%_88%,rgba(120,20,50,0.16),transparent_32%),linear-gradient(180deg,#020207,#050816_58%,#020207)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.015] blur-sm" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="text-xs uppercase tracking-[0.55em] text-blue-100/60">Caster OS Prototype</p>
          <h1 className="mt-10 text-[clamp(4.4rem,14vw,13.5rem)] font-semibold leading-[0.76] tracking-[-0.12em] text-white drop-shadow-[0_0_45px_rgba(255,255,255,0.18)]">
            One AI.
          </h1>
          <h2 className="mt-8 text-[clamp(2.8rem,7.5vw,7.8rem)] font-semibold leading-none tracking-[-0.09em] text-white/92">
            Every Decision.
          </h2>
          <p className="mx-auto mt-9 max-w-3xl text-lg leading-8 text-white/62 md:text-xl">
            A cinematic AI operating system prototype for life, wealth, health, gaming and personal decision intelligence.
          </p>

          <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-4">
            {highlights.map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-left backdrop-blur-xl">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-2 text-xs leading-5 text-white/45">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a className="primary-button" href="/dashboard">Open Prototype</a>
            <a className="secondary-button" href="/agent">View Agent</a>
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Unified Personal Intelligence</p>
          <h2 className="section-title max-w-5xl">One ecosystem for decisions, goals, money, performance and recovery.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Caster OS is not a collection of disconnected pages. It is a prototype for a personal operating system where every module connects back to the same command layer.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map(([name, label, text, href]) => (
              <a key={name} href={href} className="group rounded-[2.2rem] border border-white/10 bg-white/[0.045] p-7 transition hover:-translate-y-1 hover:border-blue-200/30 hover:bg-white/[0.07]">
                <p className="text-xs uppercase tracking-[0.34em] text-blue-200/65">{label}</p>
                <h3 className="mt-8 text-4xl font-semibold tracking-tight">{name}</h3>
                <p className="mt-5 min-h-16 text-sm leading-6 text-white/56">{text}</p>
                <p className="mt-10 text-xs uppercase tracking-[0.28em] text-white/70">Open {name} →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="section-label">Caster Core</p>
            <h2 className="section-title">The intelligence layer connecting every area of life.</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">
              The prototype already includes profile selection, widget state, layout memory, focus logic and an agent recommendation layer.
            </p>
          </div>
          <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl">
            <div className="rounded-full border border-blue-200/20 bg-blue-400/10 px-6 py-5 text-center text-sm uppercase tracking-[0.35em] text-blue-100/80">
              Caster OS
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {['Dashboard', 'Agent', 'Life', 'Wealth', 'Gaming', 'Health'].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-black/20 p-5 text-white/72">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-[70vh] items-center justify-center px-6 py-32 text-center">
        <div>
          <p className="section-label">Prototype Live</p>
          <h2 className="final-title">The next decision starts here.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Open the dashboard, explore the modules and watch Caster OS evolve from concept into a real personal AI platform.
          </p>
          <a className="primary-button mt-10 inline-flex" href="/dashboard">Launch Caster OS</a>
        </div>
      </section>
    </main>
  )
}
