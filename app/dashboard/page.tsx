import AgentPreview from '../../components/AgentPreview'
import CommandCenter from '../../components/CommandCenter'
import DragDropLayout from '../../components/DragDropLayout'
import IntelligenceGraphs from '../../components/IntelligenceGraphs'
import MemoryPanel from '../../components/MemoryPanel'
import PersonalDashboardWidgets from '../../components/PersonalDashboardWidgets'
import ProfileSelector from '../../components/ProfileSelector'
import Spacing from '../../components/Spacing'
import SupabaseStatusCard from '../../components/SupabaseStatusCard'
import TimeAwareFocus from '../../components/TimeAwareFocus'
import WidgetManager from '../../components/WidgetManager'
import WidgetOrderControls from '../../components/WidgetOrderControls'

const actions = [
  ['Ask Agent', '/agent'],
  ['Plan Life', '/life'],
  ['Open Wealth', '/wealth/stockcaster'],
  ['Open Scorecaster', '/gaming/scorecaster'],
  ['Open Health', '/health/relaxcaster'],
]

const launchStats = [
  ['10', 'Widgets'],
  ['5', 'Profiles'],
  ['AI', 'Agent'],
  ['V1', 'Memory'],
]

export default function DashboardPage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-bg" />
        <div className="home-grid" />
        <div className="home-orb" />

        <div className="home-hero-inner">
          <p className="home-eyebrow">Caster OS Dashboard</p>
          <h1 className="home-title">Command.</h1>
          <h2 className="home-subtitle">Control Center.</h2>
          <p className="home-lead">
            A cleaner operating view for focus, profile, widgets, memory and next actions.
          </p>

          <div className="home-highlight-grid">
            {launchStats.map(([value, label]) => (
              <div key={label} className="motion-surface home-highlight-card">
                <p className="home-card-title">{value}</p>
                <p className="home-card-text">{label}</p>
              </div>
            ))}
          </div>

          <div className="home-actions">
            <a className="primary-button" href="/agent">Ask Caster AI</a>
            <a className="secondary-button" href="/">Back Home</a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Today</p>
          <h2 className="section-title">The next decision starts with focus.</h2>
          <p className="home-section-lead">
            The dashboard brings the active profile, daily focus and module actions into one launch-ready surface.
          </p>

          <Spacing>
            <div className="home-core-grid">
              <TimeAwareFocus />
              <AgentPreview />
            </div>
          </Spacing>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Live Intelligence</p>
          <h2 className="section-title">Signals across wealth, gaming and health.</h2>
          <p className="home-section-lead">
            Dashboard 3.0 now surfaces intelligence graphs directly inside the operating view.
          </p>
          <IntelligenceGraphs />
        </div>
      </section>

      <section className="home-section">
        <div className="home-core-grid home-container">
          <div>
            <p className="section-label">System Core</p>
            <h2 className="section-title">The engines behind every widget.</h2>
            <p className="home-section-lead">
              Probability, risk, decision and behavior engines connect the dashboard into one intelligence loop.
            </p>
          </div>
          <CommandCenter />
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Memory</p>
          <h2 className="section-title">Caster OS now has a first memory layer.</h2>
          <p className="home-section-lead">
            This is currently local seed memory. Next it can be connected to Supabase so the system remembers real user goals, projects and preferences.
          </p>
          <Spacing>
            <div className="home-core-grid">
              <MemoryPanel />
              <SupabaseStatusCard />
            </div>
          </Spacing>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Profile & Actions</p>
          <h2 className="section-title">Shape the OS around the current mode.</h2>
          <Spacing>
            <div className="home-core-grid">
              <ProfileSelector />
              <div className="motion-surface home-core-card">
                <div className="home-core-pill">Quick Actions</div>
                <div className="home-core-items">
                  {actions.map(([label, href]) => (
                    <a key={label} href={href} className="home-core-item">{label}</a>
                  ))}
                </div>
              </div>
            </div>
          </Spacing>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Widgets</p>
          <h2 className="section-title">Personal modules in one operating view.</h2>
          <PersonalDashboardWidgets />
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <p className="section-label">Customize</p>
          <h2 className="section-title">Edit the interface when the core experience is ready.</h2>
          <p className="home-section-lead">
            Prototype controls stay below the main view so the dashboard remains clean for publishing.
          </p>
          <Spacing>
            <div className="home-core-grid">
              <WidgetManager />
              <DragDropLayout />
            </div>
          </Spacing>
          <Spacing size="sm">
            <WidgetOrderControls />
          </Spacing>
        </div>
      </section>
    </main>
  )
}
