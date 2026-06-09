const modes = [
  ['Calm', 'Breathing, reset and quiet focus.'],
  ['Clarity', 'Facts, feelings and next steps.'],
  ['Recovery', 'Sleep, rest and energy rhythm.'],
  ['Reflection', 'Small journal prompts and daily review.'],
]

const wellnessStats = [
  ['4 / 6', 'Breathing'],
  ['Steady', 'Energy'],
  ['Low', 'Noise'],
  ['Reset', 'Mode'],
]

const calmPlan = [
  ['Now', 'Slow breathing and reduce input.'],
  ['Next', 'Short walk or light movement.'],
  ['Later', 'Reflect before making decisions.'],
]

export default function HealthRelaxcasterPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7f8] px-6 py-28 text-[#201719]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(255,190,210,0.78),transparent_34%),radial-gradient(circle_at_18%_82%,rgba(255,255,255,0.92),transparent_32%),radial-gradient(circle_at_50%_0%,rgba(250,220,180,0.30),transparent_26%),linear-gradient(180deg,#fffafb,#fff3f6_52%,#f5eee8)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <a href="/dashboard" className="text-xs uppercase tracking-[0.28em] text-black/42 hover:text-black">← Dashboard</a>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-pink-700/50">Health / Relaxcaster</p>
            <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.08em]">
              Calm intelligence for a clearer day.
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-8 text-black/58">
              The wellness layer of Caster OS for calm, clarity, recovery and better daily rhythm.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {wellnessStats.map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-pink-900/10 bg-white/58 p-5 text-center shadow-xl shadow-pink-200/20 backdrop-blur-xl">
                <p className="text-2xl font-semibold tracking-tight">{value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-black/38">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.8rem] border border-pink-900/10 bg-white/68 p-8 shadow-2xl shadow-pink-200/30 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-pink-700/45">Today</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">Slow. Clear. Light.</h2>
            <p className="mt-5 text-sm leading-6 text-black/52">
              Relaxcaster keeps the health interface calm, human and non-technical. The goal is not more data. The goal is control.
            </p>
            <div className="mt-8 space-y-4">
              {calmPlan.map(([phase, text]) => (
                <div key={phase} className="rounded-3xl bg-pink-100/70 p-5">
                  <p className="text-sm font-semibold">{phase}</p>
                  <p className="mt-2 text-sm leading-6 text-black/55">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.8rem] border border-pink-900/10 bg-white/56 p-8 shadow-2xl shadow-pink-200/20 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-pink-700/45">Sakura Workspace</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">Health should feel peaceful, not technical.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {modes.map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-pink-900/10 bg-white/74 p-5">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/52">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
