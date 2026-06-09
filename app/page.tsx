import AIStatus from '../components/AIStatus'
import HeroMotion from '../components/HeroMotion'
import LiveSignalFeed from '../components/LiveSignalFeed'
import NeuralHero from '../components/NeuralHero'
import Reveal from '../components/Reveal'

const modules = [
  {
    name: 'Dashboard',
    label: 'Command Center',
    headline: 'Your operating view for the day.',
    description: 'A single premium dashboard for goals, modules, AI recommendations and personal direction.',
    href: '/dashboard',
    stats: ['Today', 'Focus', 'Modules'],
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
    description: 'The future intelligence layer connecting Life, Wealth, Gaming and Health into one personal AI system.',
    href: '/agent',
    stats: ['Ask', 'Plan', 'Act'],
  },
]

const previews = [
  {
    title: 'AI Focus',
    tag: 'Caster Agent',
    items: ['Today: finish prototype structure', 'Risk: too many features too early', 'Next: validate visual direction', 'Mode: command center'],
  },
  {
    title: 'Life System',
    tag: 'Lifecaster',
    items: ['Caster OS Proto: 68%', 'Golf progress: 32%', 'Wealth goal: 41%', 'Projects: active'],
  },
  {
    title: 'Module Signals',
    tag: 'Caster Core',
    items: ['Gaming: Scorecaster live', 'Wealth: Stockcaster proto', 'Health: Sakura workspace', 'Agent: ready shell'],
  },
]

const metrics = [
  ['1', 'Unified OS'],
  ['5', 'Life areas'],
  ['AI', 'Command layer'],
  ['V1', 'Prototype live'],
]

const roadmap = [
  ['Now', 'Caster OS Proto V1: Home, Dashboard, Life, Wealth, Gaming, Health and Agent.'],
  ['Next', 'Real widgets, shared state, module navigation and first AI-powered workflows.'],
  ['Later', 'Memory, accounts, live integrations, automations and cross-module decision intelligence.'],
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03040a] text-white">
      <section id="top" className="relative flex min-h-screen items-center justify-center px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(60,120,255,0.38),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(180,20,60,0.22),transparent_30%),linear-gradient(180deg,#03040a_0%,#070814_55%,#020207_100%)]" />
        <NeuralHero />
        <div className="grid-overlay" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="hero-shell">
          <HeroMotion />
          <LiveSignalFeed />
          <AIStatus />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl pt-28 text-center">
          <p className="section-label">Caster OS</p>
          <h1 className="hero-title mt-8">One AI.</h1>
          <h2 className="hero-statement">Every Decision.</h2>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-white/64">
            A premium AI operating system for life, wealth, gaming, health and personal decision intelligence.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a className="primary-button" href="/dashboard">Open Dashboard</a>
            <a className="secondary-button" href="/agent">Ask Caster AI</a>
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
          <p className="section-label">Unified Personal Intelligence</p>
          <h2 className="section-title">Not separate apps. One personal operating system.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Caster OS connects daily planning, long-term wealth, sports intelligence, calm wellbeing and an AI command layer into one premium ecosystem.
          </p>
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
              <a href="/life">Life<span>Goals and projects</span></a>
              <a href="/wealth/stockcaster">Wealth<span>Markets and money</span></a>
              <a href="/health/relaxcaster">Health<span>Calm and recovery</span></a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="px-6 py-28">
        <div id="showcase" className="mx-auto max-w-7xl">
          <p className="section-label">Dashboard Previews</p>
          <h2 className="section-title">Designed to feel like an intelligent command center.</h2>
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
            <p className="section-label">The Product</p>
            <h2 className="section-title">A luxury AI ecosystem that feels personal, not generic.</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">
              Scorecaster can stay modern and sporty. Relaxcaster can feel calm and sakura-inspired. Stockcaster can feel premium and financial. Caster OS keeps them unified.
            </p>
          </div>
          <div className="core-panel">
            <div className="core-row"><span>Daily direction</span><strong>Lifecaster</strong></div>
            <div className="core-row"><span>Long-term wealth</span><strong>Stockcaster</strong></div>
            <div className="core-row"><span>Sports intelligence</span><strong>Scorecaster</strong></div>
            <div className="core-row"><span>Calm wellbeing</span><strong>Relaxcaster</strong></div>
            <div className="mt-8 rounded-3xl border border-blue-300/20 bg-blue-400/10 p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-blue-100/80">Unified Layer</p>
              <p className="mt-3 text-2xl font-semibold">AI agent · widgets · Caster Core · personal dashboard</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="flex min-h-[70vh] items-center justify-center px-6 py-32 text-center">
        <div>
          <p className="section-label">Enter The OS</p>
          <h2 className="final-title">Your next decision starts here.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Open the dashboard, explore the modules and start shaping the first real version of Caster OS.
          </p>
          <a className="primary-button mt-10 inline-flex" href="/dashboard">Launch Caster OS</a>
        </div>
      </Reveal>
    </main>
  )
}
