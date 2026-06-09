const prompts = [
  ['Today', 'What should I focus on today?'],
  ['Money', 'How should I plan my next financial goal?'],
  ['Project', 'What is the next step for Caster OS?'],
  ['Health', 'How do I recover and stay consistent?'],
]

const recommendations = [
  'Finish the prototype pages before adding real APIs.',
  'Keep Scorecaster as the live gaming engine for now.',
  'Use Lifecaster as the daily home for goals and projects.',
]

export default function AgentPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020207] px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(96,165,250,0.28),transparent_36%),radial-gradient(circle_at_82%_82%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(180deg,#020207,#06101f_55%,#020207)]" />
      <div className="grid-overlay" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <a href="/dashboard" className="text-xs uppercase tracking-[0.28em] text-white/45 hover:text-white">← Dashboard</a>
        <p className="mt-16 section-label">Caster AI Agent</p>
        <h1 className="section-title">One command layer for every decision.</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-white/62">
          The Agent is the center of Caster OS. In Proto V1 it shows the intended experience before real AI, memory and module tools are connected.
        </p>

        <section className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="dashboard-preview min-h-0">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Ask Caster</p>
            <div className="mt-6 rounded-[2rem] border border-white/10 bg-black/35 p-5">
              <p className="text-sm text-white/45">User</p>
              <p className="mt-2 text-xl">What should I do next?</p>
            </div>
            <div className="mt-4 rounded-[2rem] border border-blue-200/20 bg-blue-400/10 p-5">
              <p className="text-sm text-blue-100/70">Caster Agent</p>
              <p className="mt-2 leading-7 text-white/78">
                Focus on the prototype: connect the main pages, validate the feeling, then migrate real engines one by one.
              </p>
            </div>
          </div>

          <div className="dashboard-preview min-h-0">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Quick Prompts</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {prompts.map(([tag, text]) => (
                <div key={tag} className="preview-row">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/38">{tag}</p>
                  <p className="mt-2">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              {recommendations.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-white/70">{item}</div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
