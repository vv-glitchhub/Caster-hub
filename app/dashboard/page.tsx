import TimeAwareFocus from '../../components/TimeAwareFocus'
import WidgetCard from '../../components/widgets/WidgetCard'
import { getDashboardWidgets } from '../../lib/caster-core/widget-engine'

const actions = [
  ['Open Agent', '/agent'],
  ['Open Life', '/life'],
  ['Open Wealth', '/wealth/stockcaster'],
  ['Open Gaming', '/gaming/scorecaster'],
  ['Open Health', '/health/relaxcaster'],
]

const agentFeed = [
  'Finish Dashboard 2.0 before adding real APIs.',
  'Keep the prototype visual and easy to understand.',
  'Next technical step: widget engine and shared state.',
  'Do not add Supabase until the UX direction feels right.',
]

const widgets = getDashboardWidgets().filter((widget) => widget.id !== 'ai-focus')
const mediumWidgets = widgets.filter((widget) => widget.size === 'medium')
const smallWidgets = widgets.filter((widget) => widget.size === 'small')

export default function DashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03040a] px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(96,165,250,0.26),transparent_34%),radial-gradient(circle_at_18%_76%,rgba(220,38,38,0.16),transparent_30%),linear-gradient(180deg,#03040a,#070814_55%,#020207)]" />
      <div className="grid-overlay" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="section-label">Caster OS Dashboard 2.0</p>
        <h1 className="section-title">Command center for the day.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60">
          A daily operating view for AI focus, goals, projects, wealth, gaming, health and quick actions.
        </p>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <TimeAwareFocus />

          <div className="dashboard-preview min-h-0">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Today</p>
            <div className="mt-6 space-y-3">
              <div className="preview-row">✓ Home 2.0 created</div>
              <div className="preview-row">✓ Navigation upgraded</div>
              <div className="preview-row">✓ Health module added</div>
              <div className="preview-row">✓ Widget Engine connected</div>
              <div className="preview-row">→ Validate deployment</div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {mediumWidgets.map((widget) => (
            <WidgetCard key={widget.id} widget={widget} />
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {smallWidgets.map((widget) => (
            <WidgetCard key={widget.id} widget={widget} />
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="dashboard-preview min-h-0">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Agent Feed</p>
            <h2 className="mt-5 text-3xl font-semibold">Caster recommendations</h2>
            <div className="mt-8 space-y-3">
              {agentFeed.map((item) => (
                <div key={item} className="preview-row">{item}</div>
              ))}
            </div>
          </div>

          <div className="dashboard-preview min-h-0">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Quick Actions</p>
            <h2 className="mt-5 text-3xl font-semibold">Move through the OS</h2>
            <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {actions.map(([label, href]) => (
                <a key={label} href={href} className="preview-row text-center transition hover:border-blue-200/40 hover:bg-white/[0.08]">
                  {label}
                </a>
              ))}
            </div>
            <a className="primary-button mt-8" href="/agent">Ask Caster AI</a>
          </div>
        </section>
      </div>
    </main>
  )
}
