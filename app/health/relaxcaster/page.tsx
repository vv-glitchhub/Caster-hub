const modes = [
  ['Calm', 'Breathing, reset and quiet focus.'],
  ['Clarity', 'Facts, feelings and next steps.'],
  ['Recovery', 'Sleep, rest and energy rhythm.'],
  ['Reflection', 'Small journal prompts and daily review.'],
]

export default function HealthRelaxcasterPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7f8] px-6 py-28 text-[#201719]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(255,190,210,0.72),transparent_34%),radial-gradient(circle_at_18%_82%,rgba(255,255,255,0.90),transparent_32%),linear-gradient(180deg,#fffafb,#fff3f6_52%,#f5eee8)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <a href="/dashboard" className="text-xs uppercase tracking-[0.28em] text-black/42 hover:text-black">Back to Dashboard</a>
        <p className="mt-16 text-xs uppercase tracking-[0.42em] text-pink-700/50">Health / Relaxcaster</p>
        <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.08em]">
          A calm space inside Caster OS.
        </h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-black/56">
          Relaxcaster uses a soft sakura inspired interface for calm, clarity, recovery and better daily rhythm.
        </p>

        <section className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.8rem] border border-pink-900/10 bg-white/66 p-8 shadow-2xl shadow-pink-200/30 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-pink-700/45">Today</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">Slow. Clear. Light.</h2>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-pink-100/70 p-5">Breathing rhythm · 4 / 6</div>
              <div className="rounded-3xl bg-white/80 p-5">Energy · steady</div>
              <div className="rounded-3xl bg-white/80 p-5">Suggestion · short walk and reset</div>
            </div>
          </div>

          <div className="rounded-[2.8rem] border border-pink-900/10 bg-white/54 p-8 shadow-2xl shadow-pink-200/20 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-pink-700/45">Sakura Workspace</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">Health should feel peaceful, not technical.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {modes.map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-pink-900/10 bg-white/72 p-5">
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
