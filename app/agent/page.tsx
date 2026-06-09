import AgentContextPanel from '../../components/AgentContextPanel'
import AgentRecommendations from '../../components/AgentRecommendations'

const prompts = [
  ['Today', 'What should I focus on today?'],
  ['Money', 'How should I plan my next financial goal?'],
  ['Project', 'What is the next step for Caster OS?'],
  ['Health', 'How do I recover and stay consistent?'],
]

export default function AgentPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020207] px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(96,165,250,0.28),transparent_36%),radial-gradient(circle_at_82%_82%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(180deg,#020207,#06101f_55%,#020207)]" />
      <div className="grid-overlay" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <a href="/dashboard" className="text-xs uppercase tracking-[0.28em] text-white/45 hover:text-white">← Dashboard</a>
        <p className="mt-16 section-label">Caster AI Agent V1</p>
        <h1 className="section-title">Context-aware command layer.</h1>
        <p className="mt-8 max-w-3xl text-xl leading-8 text-white/62">
          The Agent now reads the first Caster OS context layer and generates dynamic recommendations from profile, memory, widgets, goals and projects.
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
                I now use your profile, selected widgets, active projects and goals to form the first recommendation layer. Real model calls come after persistent memory is connected.
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
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <AgentRecommendations />
          <AgentContextPanel />
        </section>
      </div>
    </main>
  )
}
