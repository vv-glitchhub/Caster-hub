import LaunchCTA from '../../components/LaunchCTA'

const widgets = [
  ['Goals', 'Track the life targets that matter most and see what needs attention.'],
  ['Projects', 'Turn big ideas into weekly execution with a clean command board.'],
  ['Habits', 'Build routines without making life feel like a spreadsheet.'],
  ['Future Simulator', 'Preview what different choices could lead to before committing.'],
]

const samplePlan = [
  ['Today', 'Ship one visible milestone and keep momentum high.'],
  ['This week', 'Polish the Caster OS launch prototype for public sharing.'],
  ['This month', 'Move memory, widgets and agent flows toward real product use.'],
]

const lifeStats = [
  ['78%', 'Caster OS'],
  ['32%', 'Golf'],
  ['41%', 'Wealth'],
  ['4', 'Projects'],
]

const goals = [
  ['Caster OS Prototype', 'Build a premium AI operating system concept.', '78%'],
  ['Golf Progress', 'Move from current level toward consistent improvement.', '32%'],
  ['Wealth Foundation', 'Create long-term financial clarity and direction.', '41%'],
]

export default function LifePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ee] px-6 py-28 text-[#15120f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,210,230,0.82),transparent_32%),radial-gradient(circle_at_18%_78%,rgba(190,220,255,0.50),transparent_30%),linear-gradient(180deg,#fffaf5,#f7f3ee_55%,#eee7dd)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <a href="/dashboard" className="text-xs uppercase tracking-[0.28em] text-black/45 hover:text-black">← Dashboard</a>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-black/45">Lifecaster</p>
            <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.08em]">
              Build your life like an operating system.
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-8 text-black/60">
              The personal layer of Caster OS for goals, projects, habits, decisions and future planning.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {lifeStats.map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-black/10 bg-white/58 p-5 text-center shadow-xl shadow-black/5 backdrop-blur-xl">
                <p className="text-3xl font-semibold tracking-tight">{value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-black/42">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[2.4rem] border border-black/10 bg-white/68 p-8 shadow-2xl shadow-black/10 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-black/42">AI Coach</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">What should I focus on?</h2>
            <p className="mt-5 text-lg leading-8 text-black/58">
              Focus on one visible milestone per day. Today that means moving the most important life project forward instead of spreading attention everywhere.
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

          <div className="rounded-[2.4rem] border border-black/10 bg-white/54 p-8 shadow-2xl shadow-black/10 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-black/42">Life Dashboard</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">Goals in motion.</h2>
            <div className="mt-6 space-y-4">
              {goals.map(([title, text, progress]) => (
                <div key={title} className="rounded-3xl bg-black/[0.055] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-black/52">{text}</p>
                    </div>
                    <p className="text-sm text-black/45">{progress}</p>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10">
                    <div className="h-full rounded-full bg-black/70" style={{ width: progress }} />
                  </div>
                </div>
              ))}
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

        <LaunchCTA
          eyebrow="Lifecaster"
          title="Turn life direction into a daily system."
          description="Continue to the main Caster OS dashboard and connect goals, widgets and AI recommendations."
          tone="light"
        />
      </div>
    </main>
  )
}
