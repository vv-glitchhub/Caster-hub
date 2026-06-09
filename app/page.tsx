import NeuralHero from '../components/NeuralHero'
import Reveal from '../components/Reveal'

const modules = [
  {
    name: 'Dashboard',
    label: 'Command Center',
    headline: 'Your personal OS for the day.',
    description: 'Profile-aware widgets, drag and drop layout, memory, recommendations and a premium AI command view.',
    href: '/dashboard',
    stats: ['Profile', 'Widgets', 'Memory'],
  },
  {
    name: 'Life',
    label: 'Lifecaster',
    headline: 'Build your life like a system.',
    description: 'Goals, projects, habits, future scenarios and personal AI coaching in a customizable life workspace.',
    href: '/life',
    stats: ['Goals', 'Projects', 'Future'],
  },
  {
    name: 'Wealth',
    label: 'Stockcaster',
    headline: 'Long-term market intelligence.',
    description: 'Portfolio views, market signals, risk snapshots and wealth planning under the Caster OS umbrella.',
    href: '/wealth/stockcaster',
    stats: ['Portfolio', 'Risk', 'Signals'],
  },
  {
    name: 'Gaming',
    label: 'Scorecaster',
    headline: 'Modern sports intelligence.',
    description: 'Sports probability, live odds, AI picks and strategy tools in a modern athletic command interface.',
    href: '/gaming/scorecaster',
    stats: ['Odds', 'EV', 'Edge'],
  },
  {
    name: 'Health',
    label: 'Relaxcaster',
    headline: 'A calm space inside the OS.',
    description: 'A sakura inspired wellbeing layer for calm, clarity, recovery and daily rhythm.',
    href: '/health/relaxcaster',
    stats: ['Calm', 'Clarity', 'Recovery'],
  },
  {
    name: 'Agent',
    label: 'Caster AI',
    headline: 'One command layer for decisions.',
    description: 'Context-aware recommendations connecting Life, Wealth, Gaming and Health into one personal AI system.',
    href: '/agent',
    stats: ['Context', 'Reason', 'Act'],
  },
]

const previews = [
  {
    title: 'AI Focus',
    tag: 'Caster Agent',
    items: ['Profile: Entrepreneur', 'Today: ship the prototype', 'Risk: too many features too early', 'Next: validate the landing page'],
  },
  {
    title: 'Personal Dashboard',
    tag: 'Dashboard 3.0',
    items: ['Drag & drop layout', 'Widget marketplace', 'Memory layer active', 'Profile-aware setup'],
  },
  {
    title: 'Agent Context',
    tag: 'Caster Core',
    items: ['Goals connected', 'Projects connected', 'Widgets connected', 'Recommendations generated'],
  },
]

const metrics = [
  ['1', 'AI OS'],
  ['10', 'Widgets'],
  ['5', 'Life areas'],
  ['V1', 'Prototype'],
]

const launchPoints = [
  'Profile-aware dashboard',
  'Widget marketplace',
  'Drag & drop layout',
  'Memory layer',
  'Agent recommendations',
  'Supabase-ready foundation',
]

const roadmap = [
  ['Now', 'Caster OS Proto V1: cinematic home, personal dashboard, widgets, memory, layout editing and agent context.'],
  ['Next', 'Cloud memory, real integrations, deeper agent workflows and module-specific live data.'],
  ['Later', 'Mobile app, automations, accounts and cross-module decision intelligence.'],
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03040a] text-white">
      <section id="top" className="relative flex min-h-screen items-center justify-center px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(60,120,255,0.34),transparent_34%),radial-gradient(circle_at_50%_88%,rgba(180,20,60,0.14),transparent_32%),linear-gradient(180deg,#020207_0%,#050814_56%,#020207_100%)]" />
        <NeuralHero />
        <div className="grid-overlay opacity-35" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.015] blur-sm" />
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="text-xs uppercase tracking-[0.55em] text-blue-100/60">Caster OS Prototype</p>
          <h1 className="mt-10 text-[clamp(4rem,13vw,13rem)] font-semibold leading-[0.78] tracking-[-0.12em] text-white drop-shadow-[0_0_45px_rgba(255,255,255,0.18)]">
            One AI.
          </h1>
          <h2 className="mt-8 text-[clamp(2.4rem,7vw,7.5rem)] font-semibold leading-none tracking-[-0.09em] text-white/92">
            Every Decision.
          </h2>
          <p className="mx-auto mt-9 max-w-3xl text-lg leading-8 text-white/62 md:text-xl">
            A cinematic AI operating system prototype for life, wealth, health, gaming and personal decision intelligence.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-3 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-white/38">Dashboard</p>
              <p className="mt-2 text-lg font-semibold">Command Center</p>
            </div>
            <div className="rounded-3xl border border-blue-200/20 bg-blue-400/10 p-4 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-blue-100/55">Agent</p>
              <p className="mt-2 text-lg font-semibold">Context Aware</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-white/38">Memory</p>
              <p className="mt-2 text-lg font-semibold">Prototype V1</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a className="primary-button" href="/dashboard">Open Prototype</a>
            <a className="secondary-button" href="/agent">View Agent</a>
          </div>
        </div>
      </section>

      <Reveal className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {metrics.map(([value, label]) => (
            <div key={label} className="dashboard-preview min-h-0 text-center">
              <div className="text-5xl font-bold tracking-tight">{value}</div>
              <p className="mt-4 text-sm uppercase tracking-[0.25em] text-white/55">{label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="relative px-6 py-28">
        <div id="ecosystem" className="mx-auto max-w-7xl">
          <p className="section-label">Prototype Launch</p>
          <h2 className="section-title">Not another app. A personal AI command system.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">
            Caster OS connects planning, money, sports intelligence, calm wellbeing and a context-aware AI agent into one premium ecosystem.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {launchPoints.map((point) => (
              <div key={point} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-white/72">✓ {point}</div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="px-6 pb-28">
        <div id="modules" className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {modules.map((module) => (
            <a key={module.name} href={module.href} className="app-card group">
              <div className="card-glow" />
              <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">{module.label}</p>
              <h3 className="mt-8 text-4xl font-semibold tracking-tight">{module.name}</h3>
              <p className="mt-5 text-xl leading-7 text-white/86">{module.headline}</p>
              <p className="mt-5 min-h-28 text-base leading-7 text-white/58">{module.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {module.stats.map((stat) => (
                  <span key={stat} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">{stat}</span>
                ))}
              </div>
              <div className="mt-10 text-sm uppercase tracking-[0.28em] text-white/80">Open {module.name} →</div>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal className="px-6 py-32">
        <div id="core" className="mx-auto max-w-7xl text-center">
          <p className="section-label">Caster Core</p>
          <h2 className="section-title mx-auto">The intelligence layer connecting every area of life.</h2>
          <div className="core-visual">
            <div className="core-node">Caster OS</div>
            <div className="core-branches">
              <a href="/dashboard">Dashboard<span>Profile and widgets</span></a>
              <a href="/agent">Agent<span>Context and recommendations</span></a>
              <a href="/life">Life<span>Goals and projects</span></a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="px-6 py-28">
        <div id="showcase" className="mx-auto max-w-7xl">
          <p className="section-label">Instagram-ready Prototype</p>
          <h2 className="section-title">Built to look like a luxury AI product, not a school demo.</h2>
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
      </Reveal>

      <Reveal className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Build Path</p>
          <h2 className="section-title">From prototype to personal AI platform.</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {roadmap.map(([phase, text]) => (
              <div className="dashboard-preview min-h-0" key={phase}>
                <p className="text-5xl font-semibold tracking-tight">{phase}</p>
                <p className="mt-6 text-white/60 leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="relative px-6 py-32">
        <div id="technology" className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="section-label">The Product Vision</p>
            <h2 className="section-title">Luxury tech, cinematic UI and personal intelligence.</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">
              Scorecaster stays modern and sporty. Relaxcaster feels calm and sakura-inspired. Stockcaster feels premium and financial. Caster OS keeps them unified.
            </p>
          </div>
          <div className="core-panel">
            <div className="core-row"><span>Daily direction</span><strong>Dashboard 3.0</strong></div>
            <div className="core-row"><span>AI reasoning</span><strong>Caster Agent</strong></div>
            <div className="core-row"><span>Custom interface</span><strong>Widget Marketplace</strong></div>
            <div className="core-row"><span>Persistent future</span><strong>Supabase-ready</strong></div>
            <div className="mt-8 rounded-3xl border border-blue-300/20 bg-blue-400/10 p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-blue-100/80">Unified Layer</p>
              <p className="mt-3 text-2xl font-semibold">AI agent · widgets · memory · Caster Core · personal dashboard</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="flex min-h-[70vh] items-center justify-center px-6 py-32 text-center">
        <div>
          <p className="section-label">Prototype Live</p>
          <h2 className="final-title">The next decision starts here.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Open the prototype, explore the dashboard and watch Caster OS evolve from concept into a real personal AI platform.
          </p>
          <a className="primary-button mt-10 inline-flex" href="/dashboard">Launch Caster OS</a>
        </div>
      </Reveal>
    </main>
  )
}
