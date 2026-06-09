import TimeAwareFocus from '../../components/TimeAwareFocus'
import ProfileSelector from '../../components/ProfileSelector'
import PersonalDashboardWidgets from '../../components/PersonalDashboardWidgets'
import WidgetManager from '../../components/WidgetManager'
import WidgetOrderControls from '../../components/WidgetOrderControls'
import DragDropLayout from '../../components/DragDropLayout'

const actions = [
  ['Ask Agent', '/agent'],
  ['Plan Life', '/life'],
  ['Open Wealth', '/wealth/stockcaster'],
  ['Open Scorecaster', '/gaming/scorecaster'],
  ['Open Health', '/health/relaxcaster'],
]

const agentFeed = [
  'Profile shapes the dashboard stack.',
  'Widgets, layout and memory are active.',
  'Caster Agent reads the first context layer.',
  'Cloud memory is the next production milestone.',
]

const launchStats = [
  ['10', 'Widgets'],
  ['5', 'Profiles'],
  ['AI', 'Agent'],
  ['V1', 'Memory'],
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03040a] px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(96,165,250,0.28),transparent_34%),radial-gradient(circle_at_18%_76%,rgba(220,38,38,0.12),transparent_30%),linear-gradient(180deg,#03040a,#070814_55%,#020207)]" />
      <div className="grid-overlay" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="section-label">Caster OS Dashboard 4.0</p>
            <h1 className="section-title">Command center for the next decision.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/64">
              A cleaner AI operating view for focus, profile, widgets, memory and next actions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2">
            {launchStats.map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-center backdrop-blur-xl">
                <p className="text-3xl font-semibold tracking-tight">{value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/42">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <TimeAwareFocus />

          <div className="dashboard-preview min-h-0">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">System Status</p>
            <h2 className="mt-5 text-3xl font-semibold">Caster is online.</h2>
            <div className="mt-8 space-y-3">
              <div className="preview-row">Profile-aware dashboard</div>
              <div className="preview-row">Widget marketplace active</div>
              <div className="preview-row">Layout memory enabled</div>
              <div className="preview-row">Agent recommendations ready</div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <ProfileSelector />
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

        <PersonalDashboardWidgets />

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
            <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Product Status</p>
            <h2 className="mt-5 text-3xl font-semibold">Prototype becoming an OS.</h2>
            <p className="mt-5 text-sm leading-6 text-white/52">
              The dashboard now works as the central surface: profile, widgets, agent logic and layout memory connect here first.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              <div className="preview-row">Home cleaned</div>
              <div className="preview-row">Navigation V2</div>
              <div className="preview-row">Typography V2</div>
              <div className="preview-row">Motion V2</div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 md:p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Customize OS</p>
              <h2 className="mt-4 text-3xl font-semibold">Edit the interface.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/45">
              Prototype controls stay below the main command view so the dashboard remains clean and launch-ready.
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <WidgetManager />
            <DragDropLayout />
          </div>
          <div className="mt-6">
            <WidgetOrderControls />
          </div>
        </section>
      </div>
    </main>
  )
}
