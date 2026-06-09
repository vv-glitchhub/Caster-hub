const widgets = [
  ['Goals', 'Track the life targets that matter most.'],
  ['Projects', 'Turn big ideas into weekly execution.'],
  ['Habits', 'Build routines without making life feel like a spreadsheet.'],
  ['Future Simulator', 'Preview what different choices could lead to.'],
]

const samplePlan = [
  ['Today', 'Finish Caster OS Proto V1 structure.'],
  ['This week', 'Make Life, Health, Wealth and Agent feel like one ecosystem.'],
  ['This month', 'Start moving real data and engines into shared Caster Core.'],
]

export default function LifePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ee] px-6 py-28 text-[#15120f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,210,230,0.80),transparent_32%),radial-gradient(circle_at_18%_78%,rgba(190,220,255,0.46),transparent_30%),linear-gradient(180deg,#fffaf5,#f7f3ee_55%,#eee7dd)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <a href="/dashboard" className="text-xs uppercase tracking-[0.28em] text-black/45 hover:text-black">← Dashboard</a>
        <p className="mt-16 text-xs uppercase tracking-[0.42em] text-black/45">Lifecaster</p>
        <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.08em]">
          Build your life like a premium operating system.
        </h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-black/58">
          Lifecaster is the personal layer of Caster OS: goals, projects, habits, decisions and future planning in one customizable dashboard.
        </p>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[2.4rem] border border-black/10 bg-white/64 p-8 shadow-2xl shadow-black/10 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-black/42">AI Coach</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">What should I focus on?</h2>
            <p className="mt-5 text-lg leading-8 text-black/58">
              The prototype answer: focus on one visible milestone per day. Today that means making Caster OS feel real before adding complex databases.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {samplePlan.map(([phase, text]) => (
                <div key={phase} className="rounded-3xl border border-black/10 bg-white/70 p-5">
                  <p className="text-sm font-semibold">{phase}</p>
                  <p className="mt-3 text-sm leading-6 text-black/55">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-black/10 bg-white/50 p-8 shadow-2xl shadow-black/10 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-black/42">Personal OS</p>
            <div className="mt-6 space-y-3">
              <div className="rounded-3xl bg-black/[0.055] p-5">Caster OS development · 68%</div>
              <div className="rounded-3xl bg-black/[0.055] p-5">Golf progress · 32%</div>
              <div className="rounded-3xl bg-black/[0.055] p-5">Wealth goal · 41%</div>
              <div className="rounded-3xl bg-black/[0.055] p-5">Travel planning · standby</div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {widgets.map(([title, text]) => (
            <div key={title} className="rounded-[2rem] border border-black/10 bg-white/58 p-6 shadow-xl shadow-black/5 backdrop-blur-xl">
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-black/55">{text}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
